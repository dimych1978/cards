import './style.css';
import { LevelRender } from './classes/level-render.js';
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
const easyDifficulty = difficulty.querySelector('.level-easy');
const normalDifficulty = difficulty.querySelector('.level-normal');
const hardDifficulty = difficulty.querySelector('.level-hard');

difficulty.addEventListener('click', (event) => {
  event.preventDefault();
  const target = event.target;
  console.log(target);
  if (target.dataset.name == 1) {
    window.application.difficult = 6;
    easyDifficulty.setAttribute('style', 'border: 1px solid red');
    normalDifficulty.removeAttribute('style');
    hardDifficulty.removeAttribute('style');
    buttonPlayGame.addEventListener('click', (event) => {
      event.preventDefault();
      console.log(target.dataset.name);
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
      console.log(target.dataset.name);
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
      console.log(target.dataset.name);
      window.application.screens['hard'] = renderScreen;
      window.application.renderScreen('hard');
    });
  }
  // buttonPlayGame.addEventListener('click', (event) => {
  //   event.preventDefault();
  //   console.log(target.dataset.name);
  //   if (target.dataset.name == 1) {
  //     window.application.screens['easy'] = renderScreen;
  //     window.application.renderScreen('easy');
  //   } else if (target.dataset.name == 2) {
  //     window.application.screens['normal'] = renderScreen;
  //     window.application.renderScreen('normal');
  //   } else if (target.dataset.name == 3) {
  //     window.application.screens['hard'] = renderScreen;
  //     window.application.renderScreen('hard');
  //   }
  //   // window.application.screens['allScreen'] = renderALLScreen;
  //   // window.application.renderScreen('allScreen');
  // });
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
