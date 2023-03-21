import { cards } from '../index';
import { LevelRender } from '../classes/level-render';
import { ResultRender } from '../classes/result-render';

export function reLoad() {
  location.reload();
}

export function renderScreen() {
  if (cards) {
    cards.textContent = '';
    cards.setAttribute('style', 'display: none');
  }
  const levelRender = new LevelRender(
    document.querySelector('.cards') as HTMLElement
  );
}

export function renderResultScreen() {
  if (cards) {
    cards.textContent = '';
    cards.setAttribute('style', 'display: none');
  }
  const resultScreen = new ResultRender(
    document.querySelector('.cards') as HTMLElement
  );
}
