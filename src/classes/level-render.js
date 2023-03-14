import { templateEngine } from '../lib/template-engine';
import { arrayOfCards } from '../array-card-faces';
import { comparison } from '..';
import { randomCard } from '..';
import { renderScreen, renderResultScreen } from '../screens/screen';
import { reLoad } from '../screens/screen';

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
    this.scoreBoard = document.querySelector('.time__self-data');
    cards.addEventListener('click', this.showCard);
    const reStart = document.querySelector('.button__restart');
    reStart.addEventListener('click', reLoad);
    this.sec = 0;
    this.min = 0;
    this.time;
    this.add = this.add.bind(this);
    this.tick = this.tick.bind(this);
    this.add();
  }

  add() {
    this.tick();
    this.scoreBoard.textContent =
      (this.min > 9 ? this.min : '0' + this.min) +
      ':' +
      (this.sec > 9 ? this.sec : '0' + this.sec);
    this.timer();
  }

  timer() {
    this.time = setTimeout(this.add, 1000);
  }

  tick() {
    this.sec++;
    if (this.sec >= 60) {
      this.sec = 0;
      this.min++;
    }
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
        window.application.total = false;
        clearTimeout(this.time);
        document.querySelector('.level__easy-screen').remove();
        renderResultScreen();
      }
    }

    if (this.arrForCompare.length === window.application.difficult) {
      clearTimeout(this.time);
      document.querySelector('.level__easy-screen').remove();
      renderResultScreen();

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
            { tag: 'span', cls: 'time__self-data' },
            { tag: 'span', cls: 'time__self-data' },
          ],
        },
        {
          tag: 'button',
          cls: ['button__restart'],
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
    style: `background-image: url(static/img/shirt.svg); background-repeat: no-repeat;  background-size: contain;`,
    name: count,
  },
});
