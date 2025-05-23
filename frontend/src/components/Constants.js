export const Tacticalchanges = {
    Mentality: ['Attacking','Balanced','Defensive'],
    DefensiveLine: ['High','Balanced','Low'],
    Agressiveness:['Agressive','Normal'],
}
export const initialTactics = {
    Mentality: 'balanced',
    DefensiveLine: 'balanced',
    Agressiveness: 'normal',
}

export const initialPlayers = [
    { id: '1', name: 'GK', x: 200, y: 550, role: 'Shot Stopper', availableRoles: ['Sweeper Keeper', 'Shot Stopper'] },        // Centered last row
    { id: '2', name: 'LB', x: 50, y: 400, role: 'Wing Back', availableRoles: ['Inverted Fullback', 'Wing Back'] },       // Left side
    { id: '3', name: 'CB', x: 150, y: 450, role: 'Ball Playing Defender', availableRoles: ['Ball Playing Defender', 'Stopper'] },      // Centered
    { id: '4', name: 'CB', x: 250, y: 450, role: 'Stopper', availableRoles: ['Ball Playing Defender', 'Stopper'] },      // Centered
    { id: '5', name: 'RB', x: 350, y: 400, role: 'Wing Back', availableRoles: ['Inverted Fullback', 'Wing Back'] },      // Right side
    { id: '6', name: 'DM', x: 200, y: 350, role: 'Deep Lying Playmaker', availableRoles: ['Deep Lying Playmaker', 'Anchor Man'] },      // Centered
    { id: '7', name: 'CM', x: 100, y: 250, role: 'Box-to-Box', availableRoles: ['Box-to-Box', 'Advanced Playmaker'] },      // Left side
    { id: '8', name: 'CM', x: 300, y: 250, role: 'Box-to-Box', availableRoles: ['Box-to-Box', 'Advanced Playmaker'] },      // Right side
    { id: '9', name: 'LW', x: 50, y: 150, role: 'Winger', availableRoles: ['Inside Forward', 'Winger'] },       // Left side
    { id: '10', name: 'ST', x: 200, y: 50, role: 'Poacher', availableRoles: ['Poacher', 'False 9'] },       // Centered
    { id: '11', name: 'RW', x: 350, y: 150, role: 'Inside Forward', availableRoles: ['Inside Forward', 'Winger'] },      // Right side
];

export const POSITION_ZONES = [
    { name: 'GK', xRange: [150, 250], yRange: [600, 600] },
    { name: 'LB', xRange: [0, 100], yRange: [375, 475] },
    { name: 'CB', xRange: [100, 350], yRange: [375, 475] },
    { name: 'RB', xRange: [300, 450], yRange: [375, 475] },
    { name: 'DM', xRange: [50, 400], yRange: [275, 375] },
    { name: 'RM', xRange: [400, 450], yRange: [175, 375] },
    { name: 'LM', xRange: [0, 50], yRange: [175, 375] },
    { name: 'CM', xRange: [50, 400], yRange: [175, 275] },
    { name: 'CAM', xRange: [100, 350], yRange: [75, 175] },
    { name: 'LW', xRange: [0, 100], yRange: [0, 175] },
    { name: 'ST', xRange: [100, 350], yRange: [0, 125] },
    { name: 'RW', xRange: [350, 450], yRange: [0, 175] },
];

export const POSITION_ROLES = {
    GK: ['Sweeper Keeper', 'Shot Stopper'],
    CB: ['Ball Playing Defender', 'Stopper'],
    LB: ['Inverted Fullback', 'Wing Back'],
    RB: ['Inverted Fullback', 'Wing Back'],
    RM: ['Inverted Winger(defensive)', 'Winger(defensive)'],
    LM: ['Inverted Winger(defensive)', 'Winger(defensive)'],
    DM: ['Deep Lying Playmaker', 'Anchor Man'],
    CM: ['Box-to-Box', 'Advanced Playmaker'],
    CAM: ['Trequartista', 'Shadow Striker'],
    LW: ['Inside Forward', 'Winger'],
    RW: ['Inside Forward', 'Winger'],
    ST: ['Poacher', 'False 9'],
};