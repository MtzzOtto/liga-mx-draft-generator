const teams = [
  'America',
  'Atlas',
  'Atletico San Luis',
  'Cruz Azul',
  'Chivas',
  'FC Juarez',
  'Leon',
  'Mazatlan',
  'Monterrey',
  'Necaxa',
  'Pachuca',
  'Puebla',
  'Pumas',
  'Queretaro',
  'Santos Laguna',
  'Tigres',
  'Tijuana',
  'Toluca',
];



export function shufflePlayers(players:string[])
{
    const shuffledPlayers = [...players];
    for(let i = shuffledPlayers.length-1; i>0; i--)
      {
        const j = Math.floor(Math.random() * (i + 1));
        let temp = shuffledPlayers[i];
        shuffledPlayers[i] = shuffledPlayers[j];
        shuffledPlayers[j] = temp;
      }

      return shuffledPlayers;
}


export function assignTeams(usedTeams:string[], counterStealTeams:Record<string, number>){
   
    
    let randomMainTeam = teams[Math.floor(Math.random() * teams.length)];
    let randomstealTeam = teams[Math.floor(Math.random() * teams.length)];
    let randomstealTeam2 = teams[Math.floor(Math.random() * teams.length)];

    while(usedTeams.includes(randomMainTeam)){
      randomMainTeam = teams[Math.floor(Math.random() * teams.length)];
    }
    while(randomMainTeam===randomstealTeam || counterStealTeams[randomstealTeam]>=2){
      
      randomstealTeam = teams[Math.floor(Math.random() * teams.length)];
          
    }
    while(randomMainTeam===randomstealTeam2 || counterStealTeams[randomstealTeam2]>=2 
      || randomstealTeam2 === randomstealTeam){

      randomstealTeam2 = teams[Math.floor(Math.random() * teams.length)]; 
    
    }

    counterStealTeams[randomstealTeam] = (counterStealTeams[randomstealTeam] || 0) + 1;
    counterStealTeams[randomstealTeam2] = (counterStealTeams[randomstealTeam2] || 0) + 1;
    usedTeams.push(randomMainTeam);

    return {
      mainTeam: randomMainTeam,
      stealTeams: [randomstealTeam, randomstealTeam2]
    };
 

}

export function validatePlayerNames(playerInputs:HTMLCollectionOf<HTMLInputElement>){

  const playerNames = [] as string[];
  const normalizedPlayerNames = [] as string[];
  const errors = [] as string[];

  for(let i=0; i<playerInputs.length; i++){
    
    let playervalName = (playerInputs[i] as HTMLInputElement).value;
    let errormessage = [] as string[];

    let displayName = playervalName.trim();
    let normalizedName = playervalName.trim().toLowerCase();

    if(!playervalName){
      errormessage.push(`Player ${i + 1} name is required.`);
    }
    else if(!normalizedName.match(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/)){
      errormessage.push(`Player ${i + 1} name contains invalid characters. 
        Please use only letters and spaces.`);
    }
    else{
        for(let j=0; j<normalizedPlayerNames.length; j++){
          if(normalizedName === normalizedPlayerNames[j]){
        errormessage.push(`Player ${i + 1} name is duplicated. Please choose a different name.`);
        break;
        }
      } 
    }    
    errors.push(...errormessage);
    playerNames.push((displayName));
    normalizedPlayerNames.push(normalizedName);
  }

return {
  playerNames,
  normalizedPlayerNames,
  errors
};

}

export function renderStars(rating:number){

 let html='';

 const fullStars =
 Math.floor(rating);

 const hasHalf =
 rating % 1 !== 0;

 for(let i=0;i<fullStars;i++){

   html += `
   <img
   src="/stars/fullstar.png"
   class="star"
   >`;

 }
 if(hasHalf){

   html += `
   <img
   src="/stars/halfstar.png"
   class="star"
   >`;

 }
 return html;

}