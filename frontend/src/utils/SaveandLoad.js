export async function saveFormation(name, formation, players, tactics) {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    if (!userId) {
        alert('You must be logged in to save a formation.');
        return;
    }
    try {
        const formationName = `${name} ${formation}`;
        const res = await fetch('http://localhost:5500/api/formation/save', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
            name: formationName,
            userId,
            players,
            tactics,
            }),
        });
        const data = await res.json();
        if (data.success) {
            alert('Formation saved successfully!');
        } else {
            alert('Failed to save formation: ' + data.message);
        }
    } catch (error) {
        console.error('Error saving formation:', error);
        alert('An error occurred while saving the formation.');
    }
}
