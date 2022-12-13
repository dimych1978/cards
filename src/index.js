import './style.css';
import { LevelEasy } from './classes/levelEasy.js';
import { LevelHard } from './classes/levelHard.js';
import { LevelNormal } from './classes/levelNormal.js';
import { renderScreen } from './screens/screen.js';
import { templateEngine } from './lib/template-engine.js';
import { renderALLScreen } from './screens/screen.js';
import { arrayOfCards } from './array-card-faces';
import { thistle } from 'color-name';

export let randomCard = [];

export const cards = document.querySelector('.cards');
export const difficulty = document.querySelector('.cards__difficulty');
export const buttonPlayGame = document.querySelector('.cards__start-button');

difficulty.addEventListener('click', (event) => {
  event.preventDefault();
  const target = event.target;
  if (target.dataset.name == 1) {
    window.application.difficult = 12;
    window.application.screens['easy'] = renderScreen;
    window.application.renderScreen('easy');
  } else if (target.dataset.name == 2) {
    window.application.difficult = 24;
    const levelNormal = new LevelNormal(
      document.querySelector('.level-normal')
    );
    window.application.screens['normal'] = renderScreen;
    window.application.renderScreen('normal');
  } else if (target.dataset.name == 3) {
    const levelHard = new LevelHard(document.querySelector('.level-hard'));
    window.application.difficult = 36;
    window.application.screens['hard'] = renderScreen;
    window.application.renderScreen('hard');
  }
});

buttonPlayGame.addEventListener('click', (event) => {
  event.preventDefault();
  const target = event.target;
  window.application.screens['allScreen'] = renderALLScreen;
  window.application.renderScreen('allScreen');
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
