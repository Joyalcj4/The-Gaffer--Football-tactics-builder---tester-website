import { DndContext } from '@dnd-kit/core';
import { useState, useEffect } from 'react';
import DraggablePlayer from './Player';
import Header from './Header';
import Tactical from './Tactical';
import FormationList from './FormationList';
import { useNavigate } from 'react-router-dom';
import { initialTactics, initialPlayers, POSITION_ROLES, POSITION_ZONES } from './Constants';
import { buildTacticJSON } from '../utils/handleConvert';
import { saveFormation } from '../utils/SaveandLoad';
import { evaluateTactics } from '../utils/evaluateTactics';
import AiFeedback from './AiFeedback';
const API_URL = import.meta.env.VITE_API_URL;


export default function FormationLab() {
    const Navigate = useNavigate();
    const GRID_SIZE = 50;
    const GROUND_WIDTH = 450;
    const GROUND_HEIGHT = 600;
    const [LoginStatus, setLoginStatus] = useState(false);
    const [players, setPlayers] = useState(initialPlayers);
    const [tactics, setTactics] = useState(initialTactics);
    const [showList, setShowList] = useState(false);
    const [aiFeedback, setAiFeedback] = useState(null);
    const [aiLoading, setAiLoading] = useState(false);


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setLoginStatus(true);
        } else {
            setLoginStatus(false);
            alert("Please login to play the game");
            Navigate("/");
            return;
        }
    }, []);


    useEffect(() => {
        const fetchFormation = async () => {
            const userId = localStorage.getItem('userId');
            const response = await fetch(`${API_URL}/api/formation/all?userId=${userId}`);
            const data = await response.json();
            if (data.success && data.formation) {
                setPlayers(data.formation.players);
                setTactics(data.formation.tactics);
            }
        };
        fetchFormation();
    }, []);

    const handleLoadFormation = (formation) => {
        setPlayers(formation.players);
        setTactics(formation.tactics);
        setShowList(false);
        alert(`Loaded formation: ${formation.name}`);
    }

    const handleSaveFormation = async () => {
        const name = prompt("Enter a name for your formation:");
        if (!name) {
            alert("Formation name is required to save.");
            return;
        }
        const formation = findFormation(players);
        await saveFormation(name, formation, players, tactics);
    };

    const handleEvaluateTactics = async () => {
        setAiLoading(true);
        setAiFeedback(null);
        try {
            const formation = findFormation(players);
            const tacticsData = buildTacticJSON(players, tactics, formation);
            console.log("Tactics Data:", tacticsData);
            const result = await evaluateTactics(tacticsData);
            setAiFeedback(result);
        } catch (err) {
            setAiFeedback({ feedback: "Failed to get AI feedback." });
        }
        setAiLoading(false);
    };

    const resetFormation = () => {
        localStorage.removeItem('formationData');
        localStorage.removeItem('tacticsData');
        setPlayers(initialPlayers); // Use a constant for the initial players
    };

    const handleRoleChange = (playerId, newRole) => {
        setPlayers(prevPlayers =>
            prevPlayers.map(player =>
                player.id === playerId ? { ...player, role: newRole } : player
            )
        );
    };

    const getPositionFromCoords = (x, y) => {
        const zone = POSITION_ZONES.find(
            (z) => x >= z.xRange[0] && x < z.xRange[1] && y >= z.yRange[0] && y < z.yRange[1]
        );
        return zone ? zone.name : '???';
    };

    const snapToGrid = (x, y) => {
        const snappedX = Math.round(x / GRID_SIZE) * GRID_SIZE;
        const snappedY = Math.round(y / GRID_SIZE) * GRID_SIZE;
        return [snappedX, snappedY];
    };
    const updategk = (player) => {
        return {
            ...player,
            x: player.x,
            y: player.y,
            availableRoles: POSITION_ROLES[player.name] || [],
            role: POSITION_ROLES[player.name]?.[0] || '???',
        }
    };
    const calcpos = (player, delta, scalefactor) => {
        const adjx = delta.x / scalefactor;
        const adjy = delta.y / scalefactor;
        const newX = player.x + adjx;
        const newY = player.y + adjy;
        let [snappedX, snappedY] = snapToGrid(newX, newY);
        snappedX = clamp(snappedX, 0, GROUND_WIDTH - 50);
        snappedY = clamp(snappedY, 0, GROUND_HEIGHT - 50);
        let newPosition = getPositionFromCoords(snappedX, snappedY);
        if (newPosition === '???') {
            snappedY -= 100; // Adjust Y if the position is invalid
            newPosition = getPositionFromCoords(snappedX, snappedY);
        }
        return { newPosition, snappedX, snappedY };
    };

    const handleTactics = (newTactics) => {
        setTactics((prevTactics) => ({
            ...prevTactics,
            ...newTactics,
        }));
    }

    const DEF = ['CB', 'LB', 'RB'];
    const MID = ['CM', 'LM', 'DM', 'RM', 'CAM'];
    const FW = ['ST', 'RW', 'LW'];

    const findFormation = (players) => {
        const counts = { DEF: 0, MID: 0, FW: 0 };
        players.forEach(player => {
            if (DEF.includes(player.name)) counts.DEF += 1;
            else if (MID.includes(player.name)) counts.MID += 1;
            else if (FW.includes(player.name)) counts.FW += 1;
        });
        return `${counts.DEF}-${counts.MID}-${counts.FW}`;
    };



    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
    const handledragend = (event) => {
        const { delta, active } = event;
        const scalefactor = 1.2;

        setPlayers((prevPlayers) =>
            prevPlayers.map((player) => {
                if (player.id === active.id) {

                    if (player.name === 'GK') {
                        return updategk(player);
                    };
                    const { newPosition, snappedX, snappedY } = calcpos(player, delta, scalefactor);


                    return {
                        ...player,
                        name: newPosition,
                        x: snappedX,
                        y: snappedY,
                        availableRoles: POSITION_ROLES[newPosition] || [],
                        role: POSITION_ROLES[newPosition]?.[0] || '???',
                    };
                }
                return player;
            })
        );
    };

    const tacticsdata = buildTacticJSON(initialPlayers, initialTactics);



    return (
        <div className="bg-base-color overflow-hidden">
            <Header LoginStatus={LoginStatus} />
            <section className="pb-20">
                <div className="flex flex-col items-center gap-3 my-20">
                    <div className="inline-block second-color px-4 pb-3 font-extrabold text-black text-xl">
                        <h2 className="text-5xl md:text-8xl font-extrabold mt-4 font-mono">FORMATION</h2>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-extrabold mt-1 font-mono">LAB</h2>
                    <p className="text-2xl md:text-3xl mt-16 font-mono">
                        Create your tactic and test it, incarnate your inner Gaffer.
                    </p>
                    <p className="text-2xl md:text-3xl mt-16 font-mono text-amber-500">
                        Drag to change position
                        Right click to change player roles
                    </p>
                </div>
            </section>
            <Tactical tactics={tactics} onTacticsChange={handleTactics} />
            <div className="flex justify-center my-4">
                <span className="text-2xl font-bold font-mono">
                    Current Formation: {findFormation(players)}
                </span>
            </div>
            <section className='mt-50 min-h-[1000px]' >
                <div className="ground mb-70 scale-120 origin-center">
                    <div className="absolute top-0 left-[150px] w-[150px] h-[50px] border-2 border-white"></div>
                    <div className="absolute left-[200px] top-[48px] w-[50px] h-[25px] border-2 border-white rounded-b-full"></div>
                    <div className="absolute bottom-0 left-[150px] w-[150px] h-[50px] border-2 border-white"></div>
                    <div className="absolute left-[200px] bottom-[48px] w-[50px] h-[25px] border-2 border-white rounded-t-full"></div>
                    <div className="absolute left-0 top-1/2 w-full h-[2px] bg-white"></div>
                    <div className="absolute top-1/2 left-1/2 w-[100px] h-[100px] -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-full"></div>
                    <div className="absolute top-1/2 left-1/2 w-[6px] h-[6px] -translate-x-1/2 -translate-y-1/2 bg-white rounded-full"></div>

                    <DndContext onDragEnd={handledragend}>
                        {players.map((player) => (
                            <DraggablePlayer key={player.id} player={player} onRolechange={handleRoleChange} />
                        ))}
                    </DndContext>
                </div>
                <div className="flex gap-4 justify-center my-4">
                    <button onClick={handleSaveFormation} className="bg-green-500 text-white px-4 py-2 rounded">
                        Save Formation
                    </button>
                    <button onClick={resetFormation} className="bg-red-500 text-white px-4 py-2 rounded">
                        Reset Formation
                    </button>
                </div>
                <div className="flex justify-center mt-4">
                    <button onClick={() => setShowList(true)} className="bg-red-500 text-white px-4 py-2 rounded">
                        Load Your Formations
                    </button>
                </div>
                <div className="flex justify-center mt-4">
                    <button
                        onClick={handleEvaluateTactics}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        disabled={aiLoading}
                    >
                        {aiLoading ? 'Evaluating...' : 'Evaluate Tactics'}
                    </button>
                </div>
                {aiFeedback && (
                    <AiFeedback 
                        aiFeedback={aiFeedback} 
                        onClose={() => setAiFeedback(null)}
                    />
                )}
                {showList && (
                    <FormationList
                        onSelect={handleLoadFormation}
                        onClose={() => setShowList(false)}
                    />
                )}
            </section>
        </div>
    );
}
