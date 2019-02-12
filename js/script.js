/*----------Flower memory JS file--------------
by Antonia Hommers, February 2019
----------------------------------------------*/

//Variable section

const cards = document.querySelectorAll('.memory-card');
let time = document.querySelector('.time');
let seconds = 0;
let moves = document.querySelector('.moves');
let move = 0;
let redo = document.querySelectorAll('.redo');
let question = document.querySelector('.question');
let about = document.querySelector('.about');
let pairsFound = 0;
let winOverlay = document.querySelector('.winoverlay');
let highscore = {};
let highscoreNumber = document.querySelector('.highscore');
let retrieveHighscore = localStorage.getItem('highscore');
let hasFlippedCard = false;
let twoCardsFlipped = false;
let firstCard, secondCard;

//Gameplay Secion

function flipcard() {
	if (twoCardsFlipped) return;
	if (this === firstCard) return;
	this.classList.toggle('flip');

	if (!hasFlippedCard) {
		hasFlippedCard = true;
		firstCard = this;

		return;
	} else {
		hasFlippedCard = false;
		secondCard = this;
		checkMatch();
	}
}

function checkMatch() {
	let isMatch = firstCard.dataset.name === secondCard.dataset.name;
	isMatch ? itsAMatch() : noMatch();
}

function itsAMatch() {
	firstCard.removeEventListener('click', flipcard);
	secondCard.removeEventListener('click', flipcard);
	countMoves();
	win();
}

function noMatch() {
	twoCardsFlipped = true;
	setTimeout( _ => {
		firstCard.classList.remove('flip');
		secondCard.classList.remove('flip');
		twoCardsFlipped = false;
		countMoves();
		}, 1200);
}

function countMoves() {
	[hasFlippedCard, twoCardsFlipped] = [false, false];
	[firstCard, secondCard] = [null, null];
	move += 1;
	moves.innerText = `${move}`;
}

//Win section

function win() {
	pairsFound += 1;
	if (pairsFound === 10) {
		winOverlay.classList.toggle('hide');
		let finalTime = document.querySelector('.finaltime');
		finalTime.innerText = `${seconds}`;
		let finalMoves = document.querySelector('.finalmoves');
		finalMoves.innerText = `${move}`;
		calcHighscore();
	}
}

function calcHighscore() {
	highscore = Object.assign({ 'moves': `${move}` });
	let movesForHighscore = JSON.parse(retrieveHighscore).moves;
	let highscoreSlogan = document.querySelector('.highscoreslogan');
	if (movesForHighscore < move && movesForHighscore != 0) {
		highscoreSlogan.innerText = `Your current highscore is ${movesForHighscore} moves - try again to beat it.`;
	} else if (movesForHighscore == move) {
		highscoreSlogan.innerText = `That was close, just one move less for a new highscore! Your highscore is still ${movesForHighscore} moves.`;
	} else if (movesForHighscore > move) {
		highscoreSlogan.innerText = `Congratulations, you beat your highscore! Your new highscore is ${move} moves.`;
		setHighscoreCache();
	} else {
		highscoreSlogan.innerText = `You finished your first game! Your new highscore is ${move} moves.`;
		setHighscoreCache();
	}
}

//Functionality and Cache(Highscore)

function setHighscoreCache() {
	highscoreNumber.innerText = `${move}`;
	localStorage.setItem('highscore', JSON.stringify(highscore));
}

(function shuffle() {
	cards.forEach(card => {
		let randomNum = Math.floor(Math.random() * 20);
		card.style.order = randomNum;
	})
})();

(function testCache() {
	if (retrieveHighscore === null) {
		highscore = Object.assign({ moves: 0 });
		setHighscoreCache();
		retrieveHighscore = localStorage.getItem('highscore');
	} else {
		highscoreNumber.innerText = `${JSON.parse(retrieveHighscore).moves}`;
	}
})();

setInterval( () => {
	seconds += 1;
	time.innerText = `${seconds}`;
}, 1000);
redo.forEach(button => button.addEventListener('click', _ => { location.reload(); }));
question.addEventListener('click', _ => { about.classList.toggle('hide')});
cards.forEach(card => card.addEventListener('click', flipcard));