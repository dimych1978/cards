import { templateEngine } from '../lib/template-engine';
import { arrayOfCards } from '../array-card-faces';
import { comparison } from '..';
import { randomCard } from '..';
import { renderScreen } from '../screens/screen';
import { compare } from 'specificity';
import { clearConfigCache } from 'prettier';
import { count } from 'rxjs';

export class LevelRender {
  constructor(element) {
    if (!(element instanceof HTMLElement)) {
      console.log(element);
      throw new Error('Это не HTML-элемент');
    }
    this.element = element;
    this.arrForCompare = [];
    this.renderLevelRender = this.renderLevelRender.bind(this);
    this.renderLevelRender();
    const cards = document.querySelector('.cards__shirts');
    this.showCard = this.showCard.bind(this);
    this.compare = this.compare.bind(this);
    cards.addEventListener('click', this.showCard);
  }
  renderLevelRender() {
    this.levelRender = templateEngine(LevelRender.levelTemplate());
    document.body.appendChild(this.levelRender);
    const cardShirt = document.querySelector('.cards__shirts');
    comparison();
    for (let count = 0; count < window.application.difficult; count++) {
      this.shirtBack = templateEngine(LevelRender.ShirtBackTemplate(count));
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

    targetOfShowCard.setAttribute(
      'style',
      `background-image: url(${
        arrayOfCards[randomCard[targetOfShowCard.name] - 1]
      })`
    );
    const cardsNext = document.querySelector('.cards__shirts');
    this.arrForCompare.push(randomCard[targetOfShowCard.name]);

    cardsNext.addEventListener('click', (event) => {
      if (event.target.name === targetOfShowCard.name) {
        const scoreboard = document.querySelector('.level__easy-screen');
        cards.remove();
        scoreboard.remove();
        renderScreen();
      }
    });
    this.compare(event);
  }

  compare(event) {
    event.preventDefault();
    const target = event.target;
    target.setAttribute(
      'style',
      `background-image: url(${arrayOfCards[randomCard[target.name] - 1]})`
    );

    if (this.arrForCompare.length % 2 === 1) {
      return;
    } else {
      let index = this.arrForCompare.length;
      if (this.arrForCompare[index - 2] !== randomCard[target.name]) {
        alert('Вы проиграли');
      }
    }

    if (this.arrForCompare.length === window.application.difficult) {
      alert('Вы победили');
      return;
    }
  }
}

LevelRender.levelTemplate = () => ({
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
LevelRender.ShirtBackTemplate = (count) => ({
  tag: 'img',
  cls: 'img-back',
  attrs: {
    style: `background-image: url(static/img/shirt.svg);     background-repeat: no-repeat;  background-size: contain;`,
    name: count,
  },
});
