class LevelEasy {
  constructor(element) {
    if (!(element instanceof HTMLElement)) {
        console.log(element);
      throw new Error('Это не HTML-элемент');
    }

    this.element = element;
    this.renderLevelEasy = this.renderLevelEasy.bind(this);
    this.element.addEventListener('click', this.renderLevelEasy);
  }
  renderLevelEasy() {
    console.log('renderLevelEasy');
    this.levelEasy = templateEngine(LevelEasy.levelTemplate());
    document.body.appendChild(this.levelEasy);
  }
}

LevelEasy.levelTemplate = () => ({
  tag: 'div',
  cls: 'level-easy',
  content: 'something',
});
