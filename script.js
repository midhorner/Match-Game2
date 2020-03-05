const CARDS = document.querySelectorAll(".card");

var isFlipped = false;
var boardLock = false;
var firstCard;
var secondCard;
var matchNumber = 0;

function flipCard() {
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
  isMatched ? cardLock() : unFlip();
}

function cardLock() {
  matchNumber++;
  console.log("number of matches = " + matchNumber);
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  if (matchNumber === 6) {
    setTimeout(() => {
      setNewGame();
    }, 1000);
  }

  resetGame();
}

function unFlip() {
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

function shuffle() {
  CARDS.forEach(card => {
    let random = Math.floor(Math.random() * 12);
    card.style.order = random;
  });
}
shuffle();

CARDS.forEach(card => card.addEventListener("click", flipCard));
