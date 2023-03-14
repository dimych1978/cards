import { cards } from '../index.js';
import { LevelRender } from '../classes/level-render.js';
import { ResultRender } from '../classes/result-render.js';

export function reLoad () {
    location.reload();
}

export function renderScreen() {
  cards.textContent = '';
  cards.setAttribute('style', 'display: none');
  const levelRender = new LevelRender(document.querySelector('.cards'));
}

export function renderResultScreen() {
  cards.textContent = '';
  cards.setAttribute('style', 'display: none');

  const resultScreen = new ResultRender(document.querySelector('.cards'));
}
