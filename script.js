const CARDS = document.querySelectorAll(".card");
const MATCH = document.querySelector("#match-text");

var isFlipped = false;
var boardLock = false;
var firstCard;
var secondCard;
var matchNumber = 0;

function flipCard() {
  MATCH.innerHTML = "";
  if (boardLock || this === firstCard) {
    return;
  }

  this.classList.add("flip");

  if (!isFlipped) {
    isFlipped = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  boardLock = true;

  isMatch();
}

function isMatch() {
  let isMatched = firstCard.className === secondCard.className;
  isMatched ? yesMatch() : noMatch();
}

function yesMatch() {
  let demon = secondCard.getElementsByClassName("front")[0].src;

  matchNumber++;

  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  if (matchNumber === 6) {
    toggleMatchText("#match-text", demon, "YOU WIN!");
    setTimeout(() => {
      setNewGame();
    }, 1000);
  } else {
    toggleMatchText("#match-text", demon, "MATCH!");
  }

  resetGame();
  setTimeout(() => {
    toggleMatchText("#match-text", "", "");
  }, 1000);
}

function noMatch() {
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetGame();
  }, 1000);
}

function resetGame() {
  [isFlipped, boardLock] = [false, false];
  [firstCard, secondCard] = [null, null];
  console.log("reset ran");
}

function setNewGame() {
  matchNumber = 0;
  CARDS.forEach(card => card.classList.remove("flip"));
  CARDS.forEach(card => card.addEventListener("click", flipCard));
  shuffle();
}

function toggleMatchText(id, image, text) {
  var e = document.querySelector(id);
  if (e.style.display == "flex") {
    e.style.display = "none";
  } else {
    e.style.display = "flex";
    e.style.backgroundImage = "url(" + image + ")";
    e.innerHTML = text;
  }
}

function shuffle() {
  CARDS.forEach(card => {
    let random = Math.floor(Math.random() * 12);
    card.style.order = random;
  });
}
shuffle();

CARDS.forEach(card => card.addEventListener("click", flipCard));
