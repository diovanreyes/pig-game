'use strict';

// Storage of variables===========================================================================
let player0El = document.querySelector('.player--0');
let player1El = document.querySelector('.player--1');
let currentScore0El = document.querySelector('#current--0');
let currentScore1El = document.querySelector('#current--1');
let btnRoll = document.querySelector('.btn--roll');
let btnNew = document.querySelector('.btn--new');
let btnHold = document.querySelector('.btn--hold');
let score0El = document.querySelector('#score--0');
let score1El = document.querySelector('#score--1');
let diceEl = document.querySelector('.dice');
let playerActive = document.querySelector('.player--active');
let score = document.querySelector('.score');
//-------------------------------------------------------------------------------------------------
let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let active = true;
//-------------------------------------------------------------------------------------------------
diceEl.classList.toggle('hidden');
// FUNCTIONS=======================================================================================
let funcCurrentPlayer = function (cur) {
  document.querySelector(`#current--${activePlayer}`).textContent = cur;
};
let funcScore = function (scr) {
  document.querySelector(`#score--${activePlayer}`).textContent = scr;
};
let switchPlayer = function () {
  currentScore = 0;
  funcCurrentPlayer(currentScore);
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
// GAME MANIPULATIONS, CONDITIONS, BUTTONS==========================================================
//If the ROLL DICE BUTTON is clicked----------------------------------------------------------------
btnRoll.addEventListener('click', function () {
  if (active) {
    let diceRoll = Math.trunc(Math.random() * 6) + 1;
    diceEl.src = `dice-${diceRoll}.png`;
    diceEl.classList.remove('hidden');

    if (diceRoll !== 1) {
      currentScore = currentScore + diceRoll;
      funcCurrentPlayer(currentScore);
    } else {
      switchPlayer();
    }
  }
});
//If the HOLD BUTTON is clicked---------------------------------------------------------------------
btnHold.addEventListener('click', function () {
  if (active) {
    scores[activePlayer] += currentScore;
    funcCurrentPlayer(scores[activePlayer]);
    funcScore(scores[activePlayer]);

    if (scores[activePlayer] >= 100) {
      active = false;
      funcScore(`WINNER!`);
    } else {
      switchPlayer();
    }
  }
});
//If the NEW GAME BUTTON is clicked-----------------------------------------------------------------
btnNew.addEventListener('click', function () {
  location.reload();
});
