class AllCards {
  constructor(element) {
    if (!(element instanceof HTMLElement)) {
      console.log(element);
      throw new Error('Это не HTML-элемент');
    }
    this.element = element;
    this.renderAllCards = this.renderAllCards.bind(this);
    this.renderAllCards();
  }
  renderAllCards() {
    this.allCards = templateEngine(AllCards.template());
    document.body.appendChild(this.allCards);
    const arrayOfCards = [
      'src/img/6_Clubs.svg',
      'src/img/7_Clubs.svg',
      'src/img/8_Clubs.svg',
      'src/img/9_Clubs.svg',
      'src/img/10_Clubs.svg',
      'src/img/J_Clubs.svg',
      'src/img/Q_Clubs.svg',
      'src/img/K_Clubs.svg',
      'src/img/A_Clubs.svg',
      'src/img/6_Diamonds.svg',
      'src/img/7_Diamonds.svg',
      'src/img/8_Diamonds.svg',
      'src/img/9_Diamonds.svg',
      'src/img/10_Diamonds.svg',
      'src/img/J_Diamonds.svg',
      'src/img/Q_Diamonds.svg',
      'src/img/K_Diamonds.svg',
      'src/img/A_Diamonds.svg',
      'src/img/6_Hearts.svg',
      'src/img/7_Hearts.svg',
      'src/img/8_Hearts.svg',
      'src/img/9_Hearts.svg',
      'src/img/10_Hearts.svg',
      'src/img/J_Hearts.svg',
      'src/img/Q_Hearts.svg',
      'src/img/A_Hearts.svg',
      'src/img/A_Hearts.svg',
      'src/img/6_Spades.svg',
      'src/img/7_Spades.svg',
      'src/img/8_Spades.svg',
      'src/img/9_Spades.svg',
      'src/img/10_Spades.svg',
      'src/img/J_Spades.svg',
      'src/img/Q_Spades.svg',
      'src/img/K_Spades.svg',
      'src/img/A_Spades.svg',
    ];
    const cardFace = document.querySelector('.cards__faces');
    console.log(cardFace);

    for (let count = 0; count <= 36; count++) {
      this.faceBack = templateEngine(AllCards.faceBackTemplate(count));
      for (const key in arrayOfCards) {
        if (key === this.faceBack.name) {
          console.log(arrayOfCards[count]);
          cardFace.appendChild(this.faceBack);
          this.faceBack.setAttribute(
            'style',
            `background-image: url(${arrayOfCards[count]})`
          );
        }
      }
    }
  }

  showCard() {
    console.log();
  }
}

AllCards.template = () => ({
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
      cls: 'cards__faces',
    },
  ],
});

AllCards.faceBackTemplate = (count) => ({
  tag: 'img',
  cls: 'img-face',
  attrs: {
    style: 'background-repeat: no-repeat;  background-size: contain;',
    name: count,
  },
});
