const gameContainer = document.getElementById("game");
let cardsFlipped = [];
let cardMoves = 0; 
let currentMatches = 0;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "brown",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "brown"
];
// here is a helper function to shuffle an array
// it returns the same array with values shuffled
function shuffle(array) {
  let counter = array.length;
  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);
    // Decrease counter by 1
    counter--;
    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}
let shuffledColors = shuffle(COLORS);
getBestScore();
// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  let i = 1;
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");
    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    newDiv.id = "card" + i;
    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);
    // append the div to the element with an id of game
    gameContainer.append(newDiv);
    i++;
  }
}
function handleCardClick(event) {
  // you can use event.target to see which element was clicked   
  updateFlippedCards(event.target);
}
function updateFlippedCards(target){
  if(cardsFlipped.length < 2 && !checkCardId(target)){
    cardsFlipped.push(target);
    target.style.backgroundColor = target.classList;
    cardCounter();
  }
  if(cardsFlipped.length == 2){
    if(cardsFlipped[0].className == cardsFlipped[1].className){
      cardsFlipped = [];
      currentMatches++;
      if(currentMatches == COLORS.length / 2){
        updateBestScore(cardMoves);
        // resetBoard();
        alert("YOU WON! Click the 'Start Game' button to Play Again!")
      }
    }
    else{
      refresh();
  }
  }
}
function cardCounter(){
  cardMoves++;
  let moveCounter = document.getElementById("card-moves");
  moveCounter.innerText = cardMoves;
}
function cardCountReset(){
  cardMoves = 0;
  let moveCounter = document.getElementById("card-moves");
  moveCounter.innerText = cardMoves;
}
function checkCardId(card){
  for(let i = 0; i < cardsFlipped.length; i++){
    if(cardsFlipped[i].id == card.id){
      return true;
    }

  }
  return false;

}
function refresh(){
  setTimeout(function(){ cardsFlipped.forEach(element => resetFlipped(element));
    cardsFlipped = []; }, 1500);
}
function resetFlipped(element){
  element.style.backgroundColor = "rgba(131, 57, 23, 0.582)";
}
function getBestScore(){

let bestScore = JSON.parse(localStorage.getItem("best-game"));
if (bestScore == undefined){
  const bestGame = {
    score: "none"
  }
  let scoreEl = document.getElementById("best-game");
  scoreEl.innerText = bestGame.score;
  localStorage.setItem("best-game", JSON.stringify(bestGame));
}
else {
  let scoreEl = document.getElementById("best-game");
  scoreEl.innerText = bestScore.score;
}
}
function updateBestScore(score){
  let bestScore = JSON.parse(localStorage.getItem("best-game"));
  if(bestScore.score == "none"){
    const bestGame = {
      score: score
    }
  localStorage.setItem("best-game", JSON.stringify(bestGame));
  }
  else if(bestScore.score > score){
     const bestGame = {
      score: score
    }
  localStorage.setItem("best-game", JSON.stringify(bestGame));
  }
}
function resetBoard(){
  while (gameContainer.firstChild){
    gameContainer.removeChild(gameContainer.firstChild);  
  }
  shuffle(COLORS);
  createDivsForColors(COLORS);
  cardsFlipped = [];
  currentMatches = 0; 
  cardCountReset();
  getBestScore();
}
// when the DOM loads
// createDivsForColors(shuffledColors);