import { templateEngine } from '../lib/template-engine';
import { AllCards } from './all-cards';
import { arrayOfCards } from '../array-card-faces';
import { comparison } from '..';
import { randomCard } from '..';
import { renderScreen } from '../screens/screen';
import { compare } from 'specificity';
import { clearConfigCache } from 'prettier';

export class LevelEasy {
  constructor(element) {
    if (!(element instanceof HTMLElement)) {
      console.log(element);
      throw new Error('Это не HTML-элемент');
    }
    this.element = element;
    this.arrForCompare = [];
    this.renderLevelEasy = this.renderLevelEasy.bind(this);
    this.renderLevelEasy();
    const cards = document.querySelector('.cards__shirts');
    this.showCard = this.showCard.bind(this);
    this.compare = this.compare.bind(this);
    cards.addEventListener('click', this.showCard);
  }
  renderLevelEasy() {
    this.levelEasy = templateEngine(LevelEasy.levelTemplate());
    document.body.appendChild(this.levelEasy);
    const cardShirt = document.querySelector('.cards__shirts');
    comparison();
    for (let count = 0; count < window.application.difficult; count++) {
      this.shirtBack = templateEngine(LevelEasy.ShirtBackTemplate(count));
      cardShirt.appendChild(this.shirtBack);
    }
    const imgBack = cardShirt.querySelectorAll('.img-back');

    function shuffle(array) {
      array.sort(() => Math.random() - 0.5);
    }
    shuffle(randomCard);
    imgBack.forEach((img) => {
      img.setAttribute(
        'style',
        `background-image: url(${arrayOfCards[randomCard[img.name] - 1]})`
      );
    });
    setTimeout(() => {
      imgBack.forEach((img) => {
        img.setAttribute(
          'style',
          'background-image: url(static/img/shirt.svg)'
        );
      });
    }, 5000);
  }
  showCard(event) {
    event.preventDefault();
    const targetOfShowCard = event.target;
    this.arrForCompare.push(randomCard[targetOfShowCard.name]);

    targetOfShowCard.setAttribute(
      'style',
      `background-image: url(${
        arrayOfCards[randomCard[targetOfShowCard.name] - 1]
      })`
    );
    const cards = document.querySelector('.cards__shirts');
    cards.addEventListener('click', (event) => {
      if (event.target.name === targetOfShowCard.name) {
        renderScreen(this);
      } else {
        this.compare(event);
      }
    });
  }

  compare(event) {
    event.preventDefault();
    const target = event.target;
    target.setAttribute(
      'style',
      `background-image: url(${arrayOfCards[randomCard[target.name] - 1]})`
    );
    if (this.arrForCompare[0] === this.arrForCompare[1]) {
      alert('Вы победили');
    } else {
      alert('Вы проиграли');
    }
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
    style: `background-image: url(static/img/shirt.svg);     background-repeat: no-repeat;  background-size: contain;`,
    name: count,
  },
});
