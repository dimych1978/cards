class LevelNormal {
    constructor(element) {
      if (!(element instanceof HTMLElement)) {
        throw new Error('Это не HTML-элемент');
      }
  
      this.element = element;
      this.renderLevelNormal = this.renderLevelNormal.bind(this);
      this.element.addEventListener('click', this.renderLevelNormal);
    }
    renderLevelNormal() {
      console.log('renderLevelNormal');
      this.levelNormal = templateEngine(LevelNormal.levelTemplate());
      document.body.appendChild(this.levelNormal);
    }
  }
  
  LevelNormal.levelTemplate = () => ({
    tag: 'div',
    cls: 'level-normal',
    content: 'something',
  });
  