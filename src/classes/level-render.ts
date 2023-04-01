import { templateEngine } from '../lib/template-engine';
import { arrayOfCards } from '../array-card-faces';
import { comparison } from '..';
import { randomCard } from '..';
import { renderScreen, renderResultScreen } from '../screens/screen';
import { reLoad } from '../screens/screen';
import { cards } from '..';
type LevelTemplate = () => {
  tag: string;
  cls: string;
  attrs?: Object;
  content?: string | LevelTemplate | Object[];
};
type ShirtBackTemplate = (count: number) => {
  tag: string;
  cls: string;
  attrs?: Object;
};

export class LevelRender {
  element: HTMLElement;
  arrForCompare: number[];
  scoreBoard: Element;
  sec: number;
  min: number;
  time: number;
  levelRender: Element | undefined;
  shirtBack: Element | undefined;
  static levelTemplate: LevelTemplate;
  static shirtBackTemplate: ShirtBackTemplate;

  constructor(element: HTMLElement) {
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
    this.scoreBoard = document.querySelector('.time__self-data') as HTMLElement;
    cards?.addEventListener('click', this.showCard);
    const reStart = document.querySelector('.button__restart');
    reStart?.addEventListener('click', reLoad);
    this.sec = 0;
    this.min = 0;
    this.time = 0;
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
    this.time = window.setTimeout(this.add, 1000);
    console.log(this.time);
  }

  tick() {
    this.sec++;
    if (this.sec >= 60) {
      this.sec = 0;
      this.min++;
    }
  }

  renderLevelRender() {
    this.levelRender = templateEngine(
      LevelRender.levelTemplate()
    ) as HTMLElement;
    document.body.appendChild(this.levelRender);
    const cardShirt = document.querySelector(
      '.cards__shirts'
    ) as HTMLDivElement;
    comparison();
    for (let count = 0; count < window.application.difficult; count++) {
      this.shirtBack = templateEngine(
        LevelRender.shirtBackTemplate(count)
      ) as HTMLElement;
      cardShirt?.appendChild(this.shirtBack);
    }
    const imgBack = cardShirt.querySelectorAll('.img-back');

    function shuffle(array: number[]) {
      array.sort(() => Math.random() - 0.5);
    }
    shuffle(randomCard);
    imgBack.forEach((img) => {
      if (img instanceof HTMLElement) {
        if (img.dataset.count) {
          let numberOfCount: number = Number(img.dataset.count);
          img.setAttribute(
            'style',
            `background-image: url(${
              arrayOfCards[randomCard[numberOfCount] - 1]
            })`
          );
        }
      }
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
  showCard(event: Event) {
    event.preventDefault();
    const targetOfShowCard = event.target;

    if (targetOfShowCard instanceof HTMLDivElement) {
      targetOfShowCard.setAttribute(
        'style',
        `background-image: url(${
          arrayOfCards[randomCard[Number(targetOfShowCard.dataset.count)] - 1]
        })`
      );
    }
    const cardsNext = document.querySelector('.cards__shirts');
    if (targetOfShowCard instanceof HTMLElement) {
      if (targetOfShowCard) {
        this.arrForCompare.push(
          randomCard[Number(targetOfShowCard.dataset.count)]
        );
      }
    }

    cardsNext?.addEventListener('click', (event: Event) => {
      if (
        targetOfShowCard instanceof HTMLElement &&
        event.target instanceof HTMLElement
      )
        if (event.target.dataset.count === targetOfShowCard.dataset.count) {
          const scoreboard = document.querySelector('.level__easy-screen');
          cards?.remove();
          scoreboard?.remove();
          renderScreen();
        }
    });
    this.compare(event);
  }

  compare(event: Event) {
    event.preventDefault();
    const target = event.target;

    if (target instanceof HTMLElement) {
      target?.setAttribute(
        'style',
        `background-image: url(${
          arrayOfCards[randomCard[Number(target.dataset.count)] - 1]
        })`
      );
    }

    if (this.arrForCompare.length % 2 === 1) {
      return;
    } else {
      let index = this.arrForCompare.length;
      if (target instanceof HTMLElement) {
        if (
          this.arrForCompare[index - 2] !==
          randomCard[Number(target.dataset.count)]
        ) {
          window.application.total = false;
          clearTimeout(this.time);
                window.application.time = this.time as number;

          console.log(this.time);
          const levelEasyScreen = document.querySelector(
            '.level__easy-screen'
          ) as HTMLElement;
          levelEasyScreen.remove();
          renderResultScreen();
        }
      }
    }

    if (this.arrForCompare.length === window.application.difficult) {
      clearTimeout(this.time);
      console.log(this.time);
      window.application.time = this.time as number;
      const levelEasyScreen = document.querySelector(
        '.level__easy-screen'
      ) as HTMLElement;
      levelEasyScreen.remove();
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
LevelRender.shirtBackTemplate = (count: number) => ({
  tag: 'img',
  cls: 'img-back',
  attrs: {
    style: `background-image: url(static/img/shirt.svg); background-repeat: no-repeat;  background-size: contain;`,
    'data-count': count,
  },
});
