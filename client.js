var player_board = document.getElementById("player_board");
var players = [];
var playerFormVisibility = false;




function update() {
    players.sort((a,b) => a.id - b.id);
    var currentPlayers = players.map((p, i) => {
   
    return (`<div class="card-container">
    <div class="card border-dark mb-3">
  <div class="card-header">Player ${i+1}</div>
  <div class="card-body text-dark">
    <h5 class="card-title">${p.name}</h5>
    <p id="${p.id}" class="card-text">Apples: ${p.apples}<br>
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
    if (players.length <= 5) {
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
    } else {
        alert('Invalid number of players');
    }
    
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
    if (players.length > 0) {
        for (let i=0; i<players.length; i++) {
            let player = players[i];
            console.log(player);
            player.score = 2*player.apples + 3*player.bread + 3*player.cheese + 4*player.chickens + player.contraband + player.coins;
        }
    
        calculateAppleKing();
        calculateBreadKing();
        calculateCheeseKing();
        calculateChickenKing();
    
        
        let scoreboard = players.sort((a,b) => b.score - a.score);
        let winner = scoreboard[0];
        for (let i=0; i<scoreboard.length; i++) {
            let player = scoreboard[i];
            let score = document.createElement("span");
            score.innerHTML = `<strong>Score: ${player.score}</strong><br>`;
            console.log(player_board);
            let card = player_board.getElementsByClassName("card-text")[player.id];
            card.appendChild(score);    
        }
    } else {
        alert('Invalid number of players');
    }

   

    
}


function calculateAppleKing() {
    let kings = [];
    let queens = [];
    let listByApple = players.sort((a, b) => a.apples > b.apples ? -1 : 1);

    kings.push(listByApple[0]);
    for (let i=1; i<listByApple.length; i++) {
        if (listByApple[i].apples === kings[0].apples) {
            kings.push(listByApple[i]);
        } else if (queens.length === 0 || listByApple[i].apples === queens[0].apples) {
            queens.push(listByApple[i]);
        }
    }

    console.log(kings);

    let longest_list = Math.max(kings.length, queens.length);

    for (let i=0; i<longest_list; i++) {
        let playerKing = kings[i];
        let playerQueen = queens[i];

        if (playerKing) {playerKing.score += 20;}
        if (playerQueen) {playerQueen.score += 10;}
    }

    console.log('Apple kings\n');
    console.log(kings);
    console.log('Apple queens\n');
    console.log(queens);

}

function calculateBreadKing() {
    let kings = [];
    let queens = [];
    let listByBread = players.sort((a, b) => a.bread > b.bread ? -1 : 1 );

    kings.push(listByBread[0]);
    for (let i=1; i<listByBread.length; i++) {
        if (listByBread[i].bread === kings[0].bread) {
            kings.push(listByBread[i]);
        } else if (queens.length === 0 || listByBread[i].bread === queens[0].bread) {
            queens.push(listByBread[i]);
        }
    }

    let longest_list = Math.max(kings.length, queens.length);

    for (let i=0; i<longest_list; i++) {
        let playerKing = kings[i];
        let playerQueen = queens[i];

        if (playerKing) {playerKing.score += 15;}
        if (playerQueen) {playerQueen.score += 10;}
    }

    console.log('Bread kings\n');
    console.log(kings);
    console.log('Bread queens\n');
    console.log(queens);
}

function calculateCheeseKing() {
    let kings = [];
    let queens = [];
    let listByCheese = players.sort((a, b) => a.cheese > b.cheese ? -1 : 1 );

    kings.push(listByCheese[0]);
    for (let i=1; i<listByCheese.length; i++) {
        if (listByCheese[i].cheese === kings[0].cheese) {
            kings.push(listByCheese[i]);
        } else if (queens.length === 0 || listByCheese[i].cheese === queens[0].cheese) {
            queens.push(listByCheese[i]);
        }
    }

    let longest_list = Math.max(kings.length, queens.length);

    for (let i=0; i<longest_list; i++) {
        let playerKing = kings[i];
        let playerQueen = queens[i];

        if (playerKing) {playerKing.score += 15;}
        if (playerQueen) {playerQueen.score += 10;}
    }

    console.log('Cheese kings\n');
    console.log(kings);
    console.log('Cheese queens\n');
    console.log(queens);
    
}

function calculateChickenKing() {
    let kings = [];
    let queens = [];
    let listByChicken = players.sort((a, b) => a.chickens > b.chickens ? -1 : 1 );

    kings.push(listByChicken[0]);
    for (let i=1; i<listByChicken.length; i++) {
        if (listByChicken[i].chickens === kings[0].chickens) {
            kings.push(listByChicken[i]);
        } else if (queens.length === 0 || listByChicken[i].chickens === queens[0].chickens) {
            queens.push(listByChicken[i]);
        }
    }

    let longest_list = Math.max(kings.length, queens.length);

    for (let i=0; i<longest_list; i++) {
        let playerKing = kings[i];
        let playerQueen = queens[i];

        if (playerKing) {playerKing.score += 10;}
        if (playerQueen) {playerQueen.score += 5;}
    }

    console.log('Chicken kings\n');
    console.log(kings);
    console.log('Chicken queens\n');
    console.log(queens);
    
}