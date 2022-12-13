import { templateEngine } from '../lib/template-engine';
import { arrayOfCards } from '../array-card-faces';


export class AllCards {
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
    const cardFace = document.querySelector('.cards__faces');
    console.log(cardFace);

    for (let count = 0; count <= 36; count++) {
      this.faceBack = templateEngine(AllCards.faceBackTemplate(count));
      for (const key in arrayOfCards) {
        if (key === this.faceBack.name) {
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
