export function buildTacticJSON(players, tactics, formation = "4-3-3") {
  const mappedPlayers = players.map(player => ({
    position: player.name,            
    role: player.role,        
    x: player.x,                  
    y: player.y                   
  }));

  return {
    formation,
    tacticalStyle: {
      mentality: tactics.Mentality,
      defensiveLine: tactics.DefensiveLine,
      aggressiveness: tactics.Agressiveness
    },
    players: mappedPlayers
  };
}
