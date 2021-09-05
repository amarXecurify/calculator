//challenge 1 age in days
function calculateAge() {
    let currentDate, dateOfBirth;

    let userInput= prompt('enter D.O.B. (mm/dd/yyyy): ');
    let currentDateAndTime = new Date();
    currentDate = WithoutTime(currentDateAndTime);
    dateOfBirth = new Date(userInput);

    //calculate days
    let difference = currentDateAndTime.getTime() - dateOfBirth.getTime();

    let days = Math.floor(difference/(1000*60*60*24));

    //document.getElementById("flex-box-result").textContent = "You are "+ days + " days old.";

    let h1 = document.createElement('h1');
    let text = document.createTextNode("You are "+ days + " days old.");
    h1.setAttribute("id","result");
    h1.appendChild(text);
    document.getElementById("flex-box-result").appendChild(h1);
}
/*
function generateCat() {
    let image = document.createElement('img');
    let div = document.getElementById('flex-cat-gen');
    image.setAttribute("id","cat");
    image.src = "http://thecatapi.com/api/images/get?format=src&type=gif&size=small";
    image.width = 150;
    div.appendChild(image);
}
*/
function WithoutTime(dateTime) {
    var date = new Date(dateTime.getTime());
    date.setHours(0, 0, 0, 0);
    return date;
}

function reset() {
    document.getElementById("result").remove();
}
/*
function resetCat() {
    document.getElementById("cat").remove();
}

//Challenge 3: Rock Paper Scissor

function rpsGame(yourChoice) {
    console.log(yourChoice);
    let userChoice, botChoice;
    userChoice = yourChoice.id;
    botChoice = randIntToRps();
    console.log("Computer's choice", botChoice);
    let result = decideWinner(userChoice, botChoice);
    message = showMessage(result);
    rpsFrontEnd(yourChoice.id, botChoice, message);    
}


function randIntToRps(){
    return ["rock", "paper", "scissors"][Math.floor(Math.random()*3)];
}

function decideWinner(yourChoice, computerChoice) {
    let rpsDatabase= {
        'rock' : {'scissors':1, 'rock':0.5, 'paper':0},
        'paper' : {'scissors':0, 'rock':1, 'paper':0.5},
        'scissors' : {'scissors':0.5, 'rock':0, 'paper':1}
    }

    let yourScore = rpsDatabase[yourChoice][computerChoice];

    return yourScore;
}

function showMessage(score) {
    if(score===0)
        return {'message':'You Lost😝', 'color':'red'};
    
    else if(score===0.5)
    return {'message':'Draw😐', 'color':'yellow'};

    else if(score===1)
        return {'message':'You Won😎', 'color':'green'};

}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage) {
    imgDatabase = {
        'rock' : document.getElementById('rock').src,
        'paper' : document.getElementById('paper').src,
        'scissors' : document.getElementById('scissors').src
    }

    //remove all images
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    let humanDiv = document.createElement('div');
    let botDiv = document.createElement('div');
    let message = document.createElement('div');

    //Append user selection
    humanDiv.innerHTML = "<img src='"+ imgDatabase[humanImageChoice] +"' height=100 width=100 style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1)'>"
    document.getElementById('rps').appendChild(humanDiv);

    //Append the result text
    message.innerHTML ="<h1 style='color:"+finalMessage['color']+"; font-size: 40px; padding: 30px;'>"+finalMessage['message']+"</h1>"
    document.getElementById('rps').appendChild(message);

    //Append the bot selection
    botDiv.innerHTML = "<img src='"+ imgDatabase[botImageChoice] +"' height=100 width=100 style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1)'>"
    document.getElementById('rps').appendChild(botDiv);

}

//Challenge 4: Change the Color Of All Buttons
let all_buttons = document.getElementsByTagName('button');
console.log(all_buttons);

let copyAllButtons =[];
for(let i=0; i<all_buttons.length; i++)
{
    copyAllButtons.push(all_buttons[i].classList[1]);//classList[1] is to access the 2nd member of class clause
}

console.log(copyAllButtons);

function buttonColorChange(buttonColor){
    if(buttonColor.value === 'red') 
        buttonColorRed();
    else if(buttonColor.value === 'green')
        buttonColorGreen();
    else if(buttonColor.value === 'reset')
        buttonColorReset();
    else if(buttonColor.value === 'random')
        buttonColorRandom();
}

function buttonColorRed() {
    for(let i=0; i< all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
}

function buttonColorGreen() {
    for(let i=0; i< all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}

function buttonColorReset() {
    for(let i=0; i< all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}

function buttonColorRandom() {
    let randomColor = ['btn-danger', 'btn-warning', 'btn-success', 'btn-primary'];
    for(let i=0; i< all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(randomColor[Math.floor(Math.random()*4)]);
    }
}

// challenge 5: blackjack
let blackjackGame = {
    'you': {'scoreSpan':'#your-blackjack-result', 'div':'#your-box', 'score':0},
    'dealer': {'scoreSpan':'#dealer-blackjack-result', 'div':'#dealer-box', 'score':0},
    'cards' : ['2','3','4','5','6','7','8','9','10','J','Q','K','A'],
    'cardsmap' : {'2':2,'3':3,'4':4,'5': 5,'6': 6,'7': 7,'8': 8,'9': 9,'10': 10,'J': 10,'Q': 10,'K': 10,'A':[1,11] },
    'wins':0,
    'losses': 0,
    'draws': 0
}

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

const hitSound = new Audio('sounds/swish.m4a');
const winSound = new Audio('sounds/cash.mp3');
const loseSound = new Audio('sounds/aww.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);

document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);

document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);

function blackjackHit() {
    let card = randomCard();
    
    showCard(card, YOU);
    updateScore(card, YOU);
    showScore(YOU);
}

function randomCard() {
    let randomNumber = Math.floor(Math.random()*13);
    return blackjackGame['cards'][randomNumber];
}

function showCard(card, player) {
    if(player['score']<=21) {
        let cardImage = document.createElement('img');
        cardImage.src = `images/${card}.png`;
        document.querySelector(player['div']).appendChild(cardImage);
        hitSound.play();
    }
}

function updateScore(card, player) {
    if(card === 'A') {
        if(player['score'] + 11 <= 21)
            player['score'] += 11;
        else
            player['score'] += 1;
    }else
        player['score'] += blackjackGame['cardsmap'][card];

}

function showScore(player) {
    if(player['score']>21){
        document.querySelector(player['scoreSpan']).textContent = 'BUST!';
        document.querySelector(player['scoreSpan']).style.color = 'red';
    } else {
        document.querySelector(player['scoreSpan']).textContent = player['score'];
    }
}


function blackjackDeal() {
    let yourImages= document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages= document.querySelector('#dealer-box').querySelectorAll('img');
    
    for(let i = 0; i<yourImages.length; i++)
        yourImages[i].remove();

    for(let i = 0; i<dealerImages.length; i++)
        dealerImages[i].remove();

    updateTable();
    resetScore();
    document.getElementById("blackjack-hit-button").disabled = false;
    document.getElementById("blackjack-stand-button").disabled = false;   
}
function resetScore() {
    // reset score color to white
    document.querySelector(YOU['scoreSpan']).style.color = 'white';
    document.querySelector(DEALER['scoreSpan']).style.color = 'white';

    //reset user's score to 0
    YOU['score'] = 0;
    document.querySelector(YOU['scoreSpan']).textContent = YOU['score'];

    //reset score of dealer to 0
    DEALER['score'] = 0;
    document.querySelector(DEALER['scoreSpan']).textContent = DEALER['score'];

    //reset blackjack result text
    document.getElementById('blackjack-result').textContent = 'Lets Play!';
}

function dealerLogic() {
    document.getElementById("blackjack-hit-button").disabled = true;
    while(DEALER['score']<21 && DEALER['score'] <= YOU['score']) {
        let card = randomCard();
        showCard(card, DEALER);
        updateScore(card, DEALER);
        showScore(DEALER);
    }
    blackjackResult();
    document.getElementById("blackjack-stand-button").disabled = true;
}

function blackjackResult() {
    if(document.querySelector(YOU['scoreSpan']).textContent === 'BUST!' && document.querySelector(DEALER['scoreSpan']).textContent === 'BUST!') {
        document.getElementById('blackjack-result').textContent = 'Draw😑!';   

        blackjackGame['draws']++;

    }else if(document.querySelector(YOU['scoreSpan']).textContent === 'BUST!') {
        document.getElementById('blackjack-result').textContent = 'You Lose😝!';
        loseSound.play();
        blackjackGame['losses']++;

    } else if(document.querySelector(DEALER['scoreSpan']).textContent === 'BUST!') {
        document.getElementById('blackjack-result').textContent = 'You Won🥳!';
        winSound.play();
        blackjackGame['wins']++;

    } else if(YOU['score'] > DEALER['score']) {
        document.getElementById('blackjack-result').textContent = 'You Won🥳!';
        winSound.play();
        blackjackGame['wins']++;

    } else if(YOU['score'] < DEALER['score']) {
        document.getElementById('blackjack-result').textContent = 'You Lose😝!';
        loseSound.play();
        blackjackGame['losses']++;
    } 
    else if(YOU['score'] === DEALER['score']) {
        document.getElementById('blackjack-result').textContent = 'Draw😑!';

        blackjackGame['draws']++;
    } 
}

function updateTable() {
    document.getElementById('wins').textContent = blackjackGame['wins'];
    document.getElementById('losses').textContent = blackjackGame['losses'];
    document.getElementById('draws').textContent = blackjackGame['draws'];
}*/