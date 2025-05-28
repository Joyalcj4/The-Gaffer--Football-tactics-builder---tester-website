import { useEffect, useState } from "react";

export default function Score({ score }) {
    const [displayScore, setDisplayScore] = useState(0);
    const normalizedScore = Math.max(0, Math.min(score ?? 50, 100));

    useEffect(() => {
        let start = 0;
        const duration = 800; // ms
        const step = (timestamp) => {
            if (!start) start = timestamp;
            const progressTime = Math.min((timestamp - start) / duration, 1);
            setDisplayScore(Math.floor(progressTime * normalizedScore));
            if (progressTime < 1) {
                requestAnimationFrame(step);
            } else {
                setDisplayScore(normalizedScore);
            }
        };
        requestAnimationFrame(step);
    }, [normalizedScore]);

    // Color based on score
    let barColor = "bg-red-500";
    if (normalizedScore >= 70) barColor = "bg-green-500";
    else if (normalizedScore >= 40) barColor = "bg-yellow-400";

    return (
        <div className="w-full max-w-xs mx-auto my-4">
            <div className="flex justify-between mb-1">
                <span className="text-lg font-bold text-white">Score</span>
                <span className="text-lg font-bold text-white">{displayScore} / 100</span>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-6">
                <div
                    className={`${barColor} h-6 rounded-full transition-all duration-500`}
                    style={{ width: `${displayScore}%` }}
                ></div>
            </div>
        </div>
    );
}