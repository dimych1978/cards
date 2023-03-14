import { templateEngine } from '../lib/template-engine';

export class LevelHard {
  constructor(element) {
    if (!(element instanceof HTMLElement)) {
      throw new Error('Это не HTML-элемент');
    }

    this.element = element;
    this.renderLevelHard = this.renderLevelHard.bind(this);
    this.element.addEventListener('click', this.renderLevelHard);
  }
  renderLevelHard() {
    this.levelHard = templateEngine(LevelHard.levelTemplate());
    document.body.appendChild(this.levelHard);
  }
}

LevelHard.levelTemplate = () => ({
  tag: 'div',
  cls: 'level-hard',
  content: 'something',
});
