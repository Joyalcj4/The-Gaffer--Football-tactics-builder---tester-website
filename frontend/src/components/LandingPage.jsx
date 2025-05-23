import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';


export default function LandingPage() {

    const [LoginStatus, setLoginStatus] = useState(false);
    const navigate = useNavigate();
    const handleclick = () => {
        if(!LoginStatus){
            alert("Please login to play the game");
            navigate('/login');
            return;
        }
        navigate('/formation');
    };
    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token){
            setLoginStatus(true);
        }
    }
    ,[]);
    return (
        <div className="bg-base-color text-white min-h-screen">
            <Header LoginStatus={LoginStatus}/>
            <main className="text-center pt-24 px-4">
                <section className="mb-20 border-b-5 border-white/10 pb-20">
                    <div className="flex flex-col items-center gap-3">
                        <div className="inline-block second-color px-4 pb-3 font-extrabold text-black text-xl">
                            <h2 className="text-5xl md:text-8xl font-extrabold mt-4">Football</h2>
                        </div>
                        <h2 className="text-5xl md:text-6xl font-extrabold mt-4">TACTICS</h2>
                        <h2 className="text-5xl md:text-6xl font-extrabold mt-4">GLORY</h2>
                    </div>
                    <blockquote className="mt-26 mb-30 text-lg text-white/90 font-mono max-w-xl mx-auto">
                        <p>
                            Football is played with the head, your feet are just the tools
                        </p>
                        <footer className="mt-4 text-2xl font-semibold text-white">— Andrea Pirlo</footer>
                    </blockquote>
                </section>
                <div className='flex flex-row '>
                    <div className="text-left max-w-3xl mx-auto mt-20 ml-10 px-4 py-26">
                        <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-20">
                            Showcase your{" "}
                            <span className="bg-second-color text-black px-2">Tactical</span>{" "}
                            Genius
                        </h2>
                        <p className="text-lg text-white/80 mb-4">
                            Master your team's tactics to outsmart rival managers. Select your
                            Captain, tinker with formations and gear up for matchday.
                        </p>
                        <p className="text-lg text-white/80 mb-10">
                            Take over the scouting, complete transfers, and conquer future competitions.
                        </p>
                        <button className="btn-primary" onClick={handleclick}>
                            GO TO THE GAME
                        </button>
                    </div>
                    <img src='/assets/tactics.png' alt="Tactics Illustration" className="mx-auto mt-10 max-w-full h-auto mb-30" />
                </div>
            </main>
        </div>
    );
}
