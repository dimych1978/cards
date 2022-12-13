import { cards } from '../index.js';
import { LevelEasy } from '../classes/levelEasy.js';
import { LevelHard } from '../classes/levelHard.js';
import { LevelNormal } from '../classes/levelNormal.js';
import { AllCards } from '../classes/all-cards.js';

export function renderScreen(renderType) {
  cards.textContent = '';
  cards.setAttribute('style', 'display: none');
  
  const levelEasy = new LevelEasy(document.querySelector('.cards'));
  const levelNormal = new LevelNormal(document.querySelector('.cards'));
  const levelHard = new LevelHard(document.querySelector('.cards'));
}

// function renderNormalScreen() {
//   cards.textContent = '';
//   const title = document.createElement('div');
//   title.textContent = 'title placeholder';
//   const content = document.createElement('div');
//   content.textContent = 'normal placeholder';

//   cards.appendChild(title);
//   cards.appendChild(content);
// }

// function renderHardScreen() {
//   cards.textContent = '';
//   const title = document.createElement('div');
//   title.textContent = 'title placeholder';
//   const content = document.createElement('div');
//   content.textContent = 'hard placeholder';

//   cards.appendChild(title);
//   cards.appendChild(content);
// }

export function renderALLScreen() {
  console.log(cards);
  cards.textContent = '';
  cards.setAttribute('style', 'display: none');
  const allCards = new AllCards(document.querySelector('.cards'));
}
