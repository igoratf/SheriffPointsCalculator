var player_board = document.getElementById("player_board");
var players = [];
var playerFormVisibility = false;



function update() {
    var currentPlayers = players.map((p, i) => {
   
    return (`<div class="card-container">
    <div class="card border-dark mb-3">
  <div class="card-header">Player ${i+1}</div>
  <div class="card-body text-dark">
    <h5 class="card-title">${p.name}</h5>
    <p class="card-text">Apples: ${p.apples}<br>
    Bread: ${p.bread}<br>
    Cheese: ${p.cheese}<br>
    Chickens: ${p.chickens}<br>
    Contraband: ${p.contraband}<br>
    Coins: ${p.coins}<br></p>
  </div>
</div>
</div>`)}).join("\n");

    player_board.innerHTML = currentPlayers;
}


function toggleForm () {
    let playerForm = document.getElementById("playerForm");
    let formButton = document.getElementById("formButton");
    playerFormVisibility = !playerFormVisibility;
    if (playerFormVisibility === true) {
        playerForm.style.display = 'block';
        formButton.textContent = 'Hide player form';
    } else {
        playerForm.style.display = 'none';
        formButton.textContent = 'Add new player';
    }
}

function createPlayer() {
    let name = document.getElementById("name");
    let apples = document.getElementById("apples");
    let bread = document.getElementById("bread");
    let cheese = document.getElementById("cheese");
    let chickens = document.getElementById("chickens");
    let contraband = document.getElementById("contraband");
    let coins = document.getElementById("coins");

    players.push({
        name: name.value,
        apples: parseInt(apples.value),
        bread: parseInt(bread.value),
        cheese: parseInt(cheese.value),
        chickens: parseInt(chickens.value),
        contraband: parseInt(contraband.value),
        coins: parseInt(coins.value),
        id: players.length
    });
    resetForm(name, apples, bread, cheese, chickens, contraband, coins);
    update();
}


function resetForm(name, apples, bread, cheese, chickens, contraband, coins) {
    name.value = '';
    apples.value = '';
    bread.value = '';
    cheese.value = '';
    chickens.value = '';
    contraband.value = '';
    coins.value = '';
}

function calculateScore() {
    let appleKQ = [0,0];
    let breadKQ = [0,0];
    let cheeseKQ = [0,0];
    let chickenKQ = [0,0];
    for (let i=0; i<players.length; i++) {
        let player = players[i];
        console.log(player);
        player.score = 2*player.apples + 3*player.bread + 3*player.cheese + 4*player.chickens + player.contraband + player.coins;

        // Set Apple King and Queen
        if (player.apples > players[appleKQ[0]].apples) {
            appleKQ[1] = appleKQ[0];
            appleKQ[0] = i;
        } else if (player.apples > players[appleKQ[1]].apples || appleKQ[0] === appleKQ[1]) {
            appleKQ[1] = i;
        }

        // Set Bread King and Queen
        if (player.bread > players[breadKQ[0]].bread) {
            breadKQ[1] = breadKQ[0];
            breadKQ[0] = i;
        } else if (player.bread > players[breadKQ[1]].bread || breadKQ[0] === breadKQ[1]) {
            breadKQ[1] = i;
        }

        // Set Cheese King and Queen
        if (player.cheese > players[cheeseKQ[0]].cheese) {
            cheeseKQ[1] = cheeseKQ[0];
            cheeseKQ[0] = i;
        } else if (player.cheese > players[cheeseKQ[1]].cheese || cheeseKQ[0] === cheeseKQ[1]) {
            cheeseKQ[1] = i;
        }

        // Set Chicken King and Queen
        if (player.chickens > players[chickenKQ[0]].chickens) {
            chickenKQ[1] = chickenKQ[0];
            chickenKQ[0] = i;
        } else if (player.chickens > players[chickenKQ[1]].chickens || chickenKQ[0] === chickenKQ[1]) {
            chickenKQ[1] = i;
        }

    }
    


    players[appleKQ[0]].score += 20;
    players[breadKQ[0]].score += 15;
    players[cheeseKQ[0]].score += 15;
    players[chickenKQ[0]].score += 10;

   
    
    if (appleKQ[0] !== appleKQ[1]) {
        players[appleKQ[1]].score += 10;
    }

    if (breadKQ[0] !== breadKQ[1]) {
        players[breadKQ[1]].score += 10;
    }

    if (cheeseKQ[0] !== cheeseKQ[1]) {
        players[cheeseKQ[1]].score += 10;
    }

    if (chickenKQ[0] !== chickenKQ[1]) {
        players[chickenKQ[1]].score += 5;
    }

    console.log('Rei das maçãs' + players[appleKQ[0]].name);
    console.log('Rainha das maçãs ' + players[appleKQ[1]].name);
    console.log('Rei dos pães' + players[breadKQ[0]].name);
    console.log('Rainha dos pães ' + players[breadKQ[1]].name);
    console.log('Rei dos queijos' + players[cheeseKQ[0]].name);
    console.log('Rainha dos queijos ' + players[cheeseKQ[1]].name);
    console.log('Rei das galinhas' + players[chickenKQ[0]].name);
    console.log('Rainha das galinhas ' + players[chickenKQ[1]].name);



    for (let i=0; i<players.length; i++) {
        let player = players[i];
        let score = document.createElement("span");
        score.innerHTML = `<strong>Score: ${player.score}</strong>`;
        let card = player_board.getElementsByClassName("card-text")[i];
        card.appendChild(score);    
    }

    calculateAppleKing();

    
}


function calculateAppleKing() {
    let king = [];
    let queen = [];
    let listByApple = players.sort((a, b) => {
        if (a.apples > b.apples) {
            return -1;
        } else if (a.apples < b.apples) {
            return 1;
        } else {
            return 0;
        }
    });

    king.push(listByApple[0]);
    for (let i=1; i<listByApple.length; i++) {
        if (listByApple[i].apples === king[0].apples) {
            king.push(listByApple[i]);
        } else if (queen.length === 0 || listByApple[i].apples === queen[0].apples) {
            queen.push(listByApple[i]);
        }
    }

    console.log(listByApple);
    console.log(king);
    console.log(queen);
}