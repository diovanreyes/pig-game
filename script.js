'use strict';
//STORAGE OF VARIABLES ==========================================================================================
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');
const currentScoreEl0 = document.querySelector('#current--0');
const currentScoreEl1 = document.querySelector('#current--1');
const scoreEl0 = document.querySelector('#score--0');
const scoreEl1 = document.querySelector('#score--1');
const playerEl0 = document.querySelector(`.player--0`);
const playerEl1 = document.querySelector(`.player--1`);
//---------------------------------------------------------------------------------------------------------------
let currentScore = 0;
let activePlayer = 0;
let scores = [0, 0];
let active = true;
//---------------------------------------------------------------------------------------------------------------
diceEl.classList.add('hidden'); //hide dice at the beginning
//===============================================================================================================
//FUNCTIONS STORAGE==============================================================================================
let funcScore = scr =>
  (document.querySelector(`#score--${activePlayer}`).textContent = scr);

let funcCurrentPlayerScore = function (curr) {
  document.querySelector(`#current--${activePlayer}`).textContent = curr;
};
const playerToggleActive = function (player) {
  player.classList.toggle('player--active');
};
let funcSwitch = function () {
  currentScore = 0;
  funcCurrentPlayerScore(currentScore);
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerToggleActive(playerEl0);
  playerToggleActive(playerEl1);
};
//BUTTONS AND GAME CONDITIONS ===================================================================================
// When ROLL THE DICE BUTTON is clicked--------------------------------------------------------------------------
btnRoll.addEventListener('click', function () {
  if (active) {
    let diceRoll = Math.trunc(Math.random() * 6) + 1;
    diceEl.src = `dice-${diceRoll}.png`;
    diceEl.classList.remove('hidden');

    diceRoll === 1
      ? funcSwitch()
      : ((currentScore += diceRoll), funcCurrentPlayerScore(currentScore));
  }
});
// When HOLD BUTTON is clicked ----------------------------------------------------------------------------------
btnHold.addEventListener('click', function () {
  if (active) {
    scores[activePlayer] += currentScore;
    funcScore(scores[activePlayer]);

    scores[activePlayer] >= 100
      ? (funcScore(`WINNER!`), (active = false))
      : funcSwitch();
  }
});
// When NEW GAME BUTTON is clicked ---------------------------------------------------------------------------
btnNew.addEventListener('click', () => location.reload());
