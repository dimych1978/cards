class LevelEasy {
  constructor(element) {
    if (!(element instanceof HTMLElement)) {
      console.log(element);
      throw new Error('Это не HTML-элемент');
    }
    this.element = element;
    this.renderLevelEasy = this.renderLevelEasy.bind(this);
    this.renderLevelEasy();
    this.showCard = this.showCard.bind(this);
    const cards = document.querySelector('.cards__shirts');
    cards.addEventListener('click', (event) => {
      event.preventDefault();
      const target = event.target;
      console.log(target);
      this.showCard();
    });
  }
  renderLevelEasy() {
    this.levelEasy = templateEngine(LevelEasy.levelTemplate());
    document.body.appendChild(this.levelEasy);
    const cardShirt = document.querySelector('.cards__shirts');
    console.log(cardShirt);
    for (let count = 1; count <= 36; count++) {
      this.shirtBack = templateEngine(LevelEasy.ShirtBackTemplate(count));
      cardShirt.appendChild(this.shirtBack);
    }
  }

  showCard(name) {
    console.log(target);
  }
}

LevelEasy.levelTemplate = () => ({
  tag: 'section',
  cls: 'level__easy-screen',
  content: [
    {
      tag: 'div',
      cls: ['time__bar', 'level-easy'],
      content: [
        {
          tag: 'div',
          cls: 'time__self',
          content: [
            { tag: 'span', cls: 'time__self-label', content: 'min' },
            { tag: 'span', cls: 'time__self-label', content: 'sec' },
            { tag: 'span', cls: 'time__self-data', content: '00.' },
            { tag: 'span', cls: 'time__self-data', content: '00' },
          ],
        },
        {
          tag: 'button',
          cls: 'button__restart',
          content: 'Начать заново',
        },
      ],
    },
    {
      tag: 'div',
      cls: 'cards__shirts',
    },
  ],
});
LevelEasy.ShirtBackTemplate = (count) => ({
  tag: 'img',
  cls: 'img-back',
  attrs: {
    style: `background-image: url(src/img/shirt.svg);     background-repeat: no-repeat;  background-size: contain;`,
    name: count,
  },
});
