import { Tacticalchanges } from "./Constants";
import { useState } from "react";

const Tactical = ({tactics,onTacticsChange }) => {

    const [openMenu, setOpenMenu] = useState(null);
    const bg_green = "bg-green-700 text-white rounded-2xl px-4 py-4";

    
    const handleselect = (option,type) => () => {
        onTacticsChange({
            ...tactics,
            [type]: option,
        });
        setOpenMenu(null);
    }

    return (
        <div className="bg-base-color overflow-hidden gap-10 flex items-center justify-center">
            <div>
                <h1 className="text-3xl font-bold text-center text-white">Mentality</h1>
                <ul className="mt-4 space-y-2">
                    {openMenu === 'Mentality' ? (Tacticalchanges.Mentality.map((option, idx) => (
                        <li key={idx}>
                            <button className="w-full px-4 py-2 bg-green-700 text-white rounded hover:bg-gray-600 transition" 
                            onClick={handleselect(option,'Mentality')}>
                                {option}
                            </button>
                        </li>
                    ))):(
                        <div className={bg_green}>
                            <h1 className="text-3xl text-center third-color font-bold mb-5">{tactics.Mentality}</h1>
                            <button className="w-full px-2 py-2 bg-green-400 text-white rounded-2xl hover:bg-red-500 transition" 
                            onClick={() => setOpenMenu('Mentality')}>
                                Change
                            </button>
                        </div>
                    )}
                </ul>
            </div>
            <div>
                <h1 className="text-3xl font-bold text-center text-white">Defensive line</h1>
                <ul className="mt-4 space-y-2">
                    {openMenu ==='Defensive' ? (Tacticalchanges.DefensiveLine.map((option, idx) => (
                        <li key={idx}>
                            <button className="w-full px-4 py-2 bg-green-700 text-white rounded hover:bg-gray-600 transition" 
                            onClick={handleselect(option,'DefensiveLine')}>
                                {option}
                            </button>
                        </li>
                    ))):(
                        <div className={bg_green}>
                            <h1 className="text-3xl text-center third-color font-bold mb-5">{tactics.DefensiveLine}</h1>
                            <button className="w-full px-2 py-2 bg-green-400 text-white rounded-2xl hover:bg-red-500 transition" 
                            onClick={() => setOpenMenu('Defensive')}>
                                Change
                            </button>
                        </div>
                    )}
                </ul>
            </div>
            <div>
                <h1 className="text-3xl font-bold text-center text-white">Agressiveness</h1>
                <ul className="mt-4 space-y-2">
                    {openMenu ==='Agressive' ? (Tacticalchanges.Agressiveness.map((option, idx) => (
                        <li key={idx}>
                            <button className="w-full px-4 py-2 bg-green-700 text-white rounded hover:bg-gray-600 transition" 
                            onClick={handleselect(option,'Agressiveness')}>
                                {option}
                            </button>
                        </li>
                    ))):(
                        <div className={bg_green}>
                            <h1 className="text-3xl text-center third-color font-bold mb-5">{tactics.Agressiveness}</h1>
                            <button className="w-full px-2 py-2 bg-green-400 text-white rounded-2xl hover:bg-red-500 transition" 
                            onClick={() => setOpenMenu('Agressive')}>
                                Change
                            </button>
                        </div>
                    )}
                </ul>
            </div>

        </div>
    );

}
export default Tactical;