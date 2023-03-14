import { templateEngine } from '../lib/template-engine';
import { reLoad } from '../screens/screen';
import { LevelRender } from './level-render';

export class ResultRender {
  constructor(element) {
    if (!(element instanceof HTMLElement)) {
      throw new Error('Это не HTML-элемент');
    }
    this.element = element;
    this.resultRender = this.resultRender.bind(this);
    this.resultRender();
    const scoreBoard = document.querySelector('.time__self-data-result');
    const levelRender = new LevelRender(document.querySelector('.cards'));
    scoreBoard.textContent =
      levelRender.time > 60
        ? '0' +
          Math.floor(levelRender.time / 60) +
          ':' +
          (levelRender.time % 60 > 9
            ? levelRender.time % 60
            : '0' + (levelRender.time % 10))
        : '00' +
          ':' +
          (levelRender.time > 9
            ? levelRender.time
            : '0' + (levelRender.time % 10));
    const reStart = document.querySelector('.button__restart');
    reStart.addEventListener('click', reLoad);
  }
  resultRender() {
    this.resultRender = templateEngine(ResultRender.template());
    document.body.appendChild(this.resultRender);
  }
}
ResultRender.template = () => ({
  tag: 'section',
  cls: 'cards',
  content: [
    {
      tag: 'div',
      cls: ['result'],
      content: [
        {
          tag: 'img',
          cls: 'img-win',
          attrs: {
            src: window.application.total
              ? `static/img/win-pic.svg`
              : `static/img/lose-pic.svg`,
          },
        },
        {
          tag: 'h1',
          cls: 'cards__header-result',
          content: window.application.total ? 'Вы выиграли!' : 'Вы проиграли',
        },
        {
          tag: 'h3',
          cls: 'time__self-header-result',
          content: [
            'Затраченное время:',
            {
              tag: 'div',
              cls: 'time__self-result',
              content: [
                { tag: 'span', cls: 'time__self-data-result' },
                { tag: 'span', cls: 'time__self-data-result' },
              ],
            },
          ],
        },

        {
          tag: 'button',
          cls: ['button__restart'],
          content: 'Играть снова',
        },
      ],
    },
  ],
});
