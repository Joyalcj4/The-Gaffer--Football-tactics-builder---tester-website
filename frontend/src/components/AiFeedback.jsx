import Score from "./Score";

export default function AiFeedback({ aiFeedback, onClose }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <button
                className="absolute top-2 right-4 text-2xl text-white"
                onClick={onClose}
            >✕</button>
            <div className="bg-third-color rounded shadow p-6 max-w-7xl w-full relative flex flex-col items-center justify-center">
                <div className="font-extrabold text-4xl text-center">AI Feedback</div>
                <div className="my-10 flex justify-center">
                    <Score score={aiFeedback.score} />
                </div>
                <div className="text-center"><b>Feedback</b> {aiFeedback.feedback}</div>
                <div className="mt-4 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full ">
                {aiFeedback.pros && aiFeedback.pros.length > 0 && (
                    <div className=" text-green-500 text-center"> 
                        <b className="font-extrabold text-2xl text-green-300">Pros:</b>
                        <ul className="list-disc ml-6 mb-2 font-mono font-bold text-left">
                            {aiFeedback.pros.map((pro, i) => <li className="mb-3" key={i}>{pro}</li>)}

                        </ul>
                    </div>
                )}
                {aiFeedback.vulnerabilities && aiFeedback.vulnerabilities.length > 0 && (
                    <div className=" text-red-500 text-center">
                        <b className="font-extrabold text-2xl text-red-400">Vulnerabilites:</b>
                        <ul className="list-disc ml-6 mb-2 font-mono font-bold text-left">
                            {aiFeedback.vulnerabilities.map((v, i) => <li className="mb-3" key={i}>{v}</li>)}
                        </ul>
                    </div>
                )}
                {aiFeedback.suggestions && aiFeedback.suggestions.length > 0 && (
                    <div className=" text-amber-500 text-center">
                        <b className="font-extrabold text-2xl text-amber-300">Suggestions:</b>
                        <ul className="list-disc ml-6 mb-2 font-mono font-bold text-left">
                            {aiFeedback.suggestions.map((s, i) => i >= 2 ? <li className="mb-3" key={i}>{s}</li> : null)}
                        </ul>
                    </div>
                )}
                </div>
            </div>
        </div>
    );

}

