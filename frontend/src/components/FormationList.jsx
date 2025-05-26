import { useEffect, useState } from "react";

export default function FormationList({ onSelect, onClose }) {
    const [formations, setFormations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFormations = async () => {
            const userId = localStorage.getItem('userId');
            const token = localStorage.getItem('token');
            if (!userId) return;
            try {
                const res = await fetch(`http://localhost:5500/api/formation/all?userId=${userId}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await res.json();
                if (data.success) setFormations(data.formations);
            } catch (err) {
                alert("Failed to load formations");
            }
            setLoading(false);
        };
        fetchFormations();
    }, []);

    if (loading) return <div className="text-center">Loading...</div>;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-green-500 p-6 rounded shadow-lg w-[600px] max-h-[180vh] overflow-y-auto">
                <h2 className="text-4xl text-amber-100 font-bold ml-5 mb-4">Saved Formations</h2>
                <button className="absolute top-4 right-4 text-xl" onClick={onClose}>✕</button>
                {formations.length === 0 ? (
                    <div>No formations found.</div>
                ) : (
                    <ul>
                        {formations.map(f => (
                            <li key={f._id} className="mb-2 flex justify-between items-center">
                                <span>{f.name}</span>
                                <button
                                    className="bg-green-200 text-blue-700 px-2 py-1 rounded hover:bg-green-300 transition-colors"
                                    onClick={() => onSelect(f)}
                                >
                                    Load
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}