'use strict';

const doc_select = element => document.querySelector(element);

// Selecting elements
const player0El = doc_select('.player--0');
const player1El = doc_select('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1'); // get element by id removes the need for the # when using query selector
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = doc_select('.dice');
const btnNew = doc_select('.btn--new');
const btnRoll = doc_select('.btn--roll');
const btnHold = doc_select('.btn--hold');

// instantiates the variables. - find out what they are intitialised as.
let scores, currentScore, activePlayer, playing;
// Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  diceEl.classList.add('hidden');
};
init();
const switchPlayer = function () {
  // Change to next player
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  // toggle removes class if part of element, adds it if not.
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6 + 1);

    // 2. Display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // 3. check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      // add the dice to the current score.
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // current0El.textContent = currentScore; // CHANGE LATER
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  // 1. Add current score to score of active player.
  scores[activePlayer] += currentScore;

  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  // 2. Check if score >= 100.
  // Finish the game
  if (scores[activePlayer] >= 100) {
    playing = false;
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');

    diceEl.classList.add('hidden');
  } else {
    // Switch to other player.
    switchPlayer();
  }
});

btnNew.addEventListener('click', init);
