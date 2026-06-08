import './style.css';
import {
  shufflePlayers,
  assignTeams,
  validatePlayerNames
} from './draftUtils';

const app = document.querySelector<HTMLDivElement>('#app');



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
      <ul id="draftOrderList"></ul>
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

