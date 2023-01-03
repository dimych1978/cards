import { cards } from '../index.js';
import { LevelRender } from '../classes/level-render.js';
// import { LevelHard } from '../classes/levelHard.js';
// import { LevelNormal } from '../classes/levelNormal.js';
import { AllCards } from '../classes/all-cards.js';

export function renderScreen() {
  cards.textContent = '';
  cards.setAttribute('style', 'display: none');

  const levelRender = new LevelRender(document.querySelector('.cards'));
}

export function renderALLScreen() {
  console.log(cards);
  cards.textContent = '';
  cards.setAttribute('style', 'display: none');
  const allCards = new AllCards(document.querySelector('.cards'));
}
