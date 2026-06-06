import './style.css';

const app = document.querySelector<HTMLDivElement>('#app');

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

const ligamxdata = {

    America:{
    stars:3.5,
    logo:"/logos/america.png"
  },
    Atlas:{
    stars:3,
    logo:"/logos/atlas.png"
  },
    "Atletico San Luis":{
    stars:3,
    logo:"/logos/asanLuis.png"
  },
  Chivas:{
    stars:3,
    logo:"/logos/chivas.png"
  },
  "Cruz Azul":{
    stars:3.5,
    logo:"/logos/cruzazul.png"
  },
  "FC Juarez":{
    stars:3,
    logo:"/logos/juarez.png"
  },
  Leon:{
    stars:3.5,
    logo:"/logos/leon.png"
  },
  Mazatlan:{
    stars:3,
    logo:"/logos/mazatlan.svg"
  },
  Monterrey:{
    stars:3.5,
    logo:"/logos/mty.png"
  },
  Necaxa:{
    stars:2.5,
    logo:"/logos/necaxa.png"
  },
  "Pachuca":{
    stars:3.5,
    logo:"/logos/pachuca.png"
  },
  "Puebla":{
    stars:3,
    logo:"/logos/puebla.png"
  },
  Pumas:{
    stars:3,
    logo:"/logos/pumas.png"
  },
  Queretaro:{
    stars:2,
    logo:"/logos/queretaro.svg"
  },
  "Santos Laguna":{
    stars:3.5,
    logo:"/logos/santos.png"
  },
  Tigres:{
    stars:4,
    logo:"/logos/tigres.png"
  },
  Tijuana:{
    stars:3,
    logo:"/logos/tijuana.png"
  },
  Toluca:{
    stars:3,
    logo:"/logos/toluca.png"
  },
} as Record<string, {stars:number, logo:string}>;

function renderStars(rating:number){

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


if (app) {
  app.innerHTML = `
    <div id="title-container">
    <h1>DRAFT APP</h1>
    <span id="subtitle">Liga MX Draft Generator</span>
    </div>

    <div class="controlscointainer">
    <label for="playerSelect">
        Number of Players:
    </label>
    <select id="playerSelect" text="Select number of players">
      <option value="">Select number of players</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
      <option value="7">7</option>
      <option value="8">8</option>
    </select>
    <button id="generateBtn">
      Generate Draft
    </button>
    </div>

    <div id="playerContainer">

    </div>

    <div id="draftOrderContainer">
      <h2>Draft Order:</h2>
      <li id="draftOrderList"></li>
    </div>

    
    <div id="resultdiv">
      <div id="errorsContainer"></div>
      <div id="cardsContainer"></div>
    
    </div>
    

  `;
}

const pselect= document.getElementById('playerSelect') as HTMLSelectElement;
const button = document.getElementById('generateBtn');
const playerContainer = document.getElementById('playerContainer');
const errorsContainer = document.getElementById('errorsContainer') as HTMLDivElement;
const draftOrderList = document.getElementById('draftOrderList') as HTMLOListElement;


let inputs = '';
inputs += `<input>`;

pselect?.addEventListener('change',() =>{
    const value = pselect?.value;
  if(Number(value)>0){
      playerContainer!.innerHTML = '';
      for(let inputs=0; inputs<Number(value); inputs++){
            playerContainer!.innerHTML += `
                    <div class="playerInputs">
                          <label>Player ${inputs + 1}</label>
                          <input type="text" placeholder="Player ${inputs + 1} Name"></input>
                    </div>
                          `;
              }
    };
});


function shufflePlayers(players:string[])
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


function assignTeams(usedTeams:string[], counterStealTeams:Record<string, number>){
   
    
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

function validatePlayerNames(playerInputs:HTMLCollectionOf<HTMLInputElement>){

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


function renderDraftOrder(draftOrder:string[],draftOrderList:HTMLElement){

  
      draftOrder.forEach((player, index) => {
                  draftOrderList.innerHTML += `
                    <li>
                      Pick #${index + 1} - ${player}
                    </li>
                  `;

          return {
            draftOrder,
              draftOrderList
                };
  
        });   
  

}

function renderPlayerCards(draftOrder:string[], cardsContainer:HTMLElement,
  usedTeams:string[], counterStealTeams:Record<string, number>){

    for(let i=0; i<draftOrder.length; i++){

      const teamsAssigned = assignTeams(usedTeams, counterStealTeams);
      const randomMainTeam = teamsAssigned.mainTeam;
      const randomstealTeam = teamsAssigned.stealTeams[0];
      const randomstealTeam2 = teamsAssigned.stealTeams[1];
      let playerName = draftOrder[i];

        if(playerName){  
          
      cardsContainer.innerHTML += `

        <div class="player-card">
        
          <h3>${playerName}</h3>
            
          <img class="teamLogo" src="${ligamxdata[randomMainTeam].logo}">
          
          <p>
          <strong>Main Team:</strong>
            ${randomMainTeam}
            
          </p>

          <div class="starsCointeiner">
            ${renderStars(ligamxdata[randomMainTeam].stars)}
          </div>

          <p><strong>Steal Teams:</strong></p>

            <ul>
          <li>${randomstealTeam}</li>
          <li>${randomstealTeam2}</li>
            </ul>

        </div>
                    `;
    }


    }
    return {
      draftOrder,
      cardsContainer,
      usedTeams,
      counterStealTeams
    };

}


button?.addEventListener('click',() =>{

const playerInputs = document.getElementById('playerContainer')?.getElementsByTagName('input') as HTMLCollectionOf<HTMLInputElement>;
const cardsContainer = document.getElementById('cardsContainer') as HTMLDivElement;

cardsContainer.innerHTML = '';
draftOrderList.innerHTML = '';
errorsContainer.innerHTML = "";

  
  const usedTeams = [] as string[];
  const counterStealTeams = {} as Record<string, number>;
  const validationResult = validatePlayerNames(playerInputs);
  const playerNames = validationResult.playerNames;
  const errors = validationResult.errors;

  if(errors.length > 0){
      errorsContainer.innerHTML = `
    <h2>Errors:</h2>
    <ul>
      ${errors.map(
        error => `<li>${error}</li>`
      ).join("")}
    </ul>
  `;

  return;

  }

  const draftOrder = shufflePlayers(playerNames);
  renderDraftOrder(draftOrder, draftOrderList);
  renderPlayerCards(draftOrder, cardsContainer, usedTeams, counterStealTeams);

});

