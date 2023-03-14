import './style.css';
import { renderScreen, renderWinScreen } from './screens/screen.js';

export let randomCard = [];
export const cards = document.querySelector('.cards');
export const difficulty = document.querySelector('.cards__difficulty');
export const buttonPlayGame = document.querySelector('.cards__start-button');

const easyDifficulty = difficulty.querySelector('.level-easy');
const normalDifficulty = difficulty.querySelector('.level-normal');
const hardDifficulty = difficulty.querySelector('.level-hard');

window.application.total = true;

difficulty.addEventListener('click', (event) => {
  event.preventDefault();
  const target = event.target;
  if (target.dataset.name == 1) {
    window.application.difficult = 6;
    easyDifficulty.setAttribute('style', 'border: 1px solid red');
    normalDifficulty.removeAttribute('style');
    hardDifficulty.removeAttribute('style');
    buttonPlayGame.addEventListener('click', (event) => {
      event.preventDefault();
      window.application.screens['easy'] = renderScreen;
      window.application.renderScreen('easy');
    });
  } else if (target.dataset.name == 2) {
    window.application.difficult = 12;
    normalDifficulty.setAttribute('style', 'border: 1px solid red');
    easyDifficulty.removeAttribute('style');
    hardDifficulty.removeAttribute('style');
    buttonPlayGame.addEventListener('click', (event) => {
      event.preventDefault();
      window.application.screens['normal'] = renderScreen;
      window.application.renderScreen('normal');
    });
  } else if (target.dataset.name == 3) {
    window.application.difficult = 18;
    hardDifficulty.setAttribute('style', 'border: 1px solid red');
    normalDifficulty.removeAttribute('style');
    easyDifficulty.removeAttribute('style');
    buttonPlayGame.addEventListener('click', (event) => {
      event.preventDefault();
      window.application.screens['hard'] = renderScreen;
      window.application.renderScreen('hard');
    });
  }
});

export function comparison() {
  function randomCardUniq() {
    const arr = [];
    for (let index = 0; index < window.application.difficult / 2; index++) {
      let renderDifficulty = Math.ceil(Math.random() * 36);
      let desired = renderDifficulty;
      if (!arr.includes(renderDifficulty)) {
        arr.push(renderDifficulty, desired);
      } else {
        index--;
      }
    }
    randomCard = arr;
  }
  randomCardUniq(randomCard);
}
