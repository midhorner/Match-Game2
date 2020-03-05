const CARDS = document.querySelectorAll(".card");

var isFlipped = false;
var boardLock = false;
var firstCard;
var secondCard;

function flipCard() {
  if (boardLock) {return};
  if (this === firstCard) {return};

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
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

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
}

CARDS.forEach(card => card.addEventListener("click", flipCard));
