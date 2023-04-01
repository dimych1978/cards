import { templateEngine } from '../lib/template-engine';
import { reLoad } from '../screens/screen';
import { LevelRender } from './level-render';

type ResultTemplate = () => {
  tag: string;
  cls: string;
  attrs?: Object;
};

export class ResultRender {
  element: HTMLElement;
  scoreBoard: Element | undefined;
  resultRender: Element | undefined;
  static resultTemplate: ResultTemplate;

  constructor(element: HTMLElement) {
    if (!(element instanceof HTMLElement)) {
      throw new Error('Это не HTML-элемент');
    }
    this.element = element;
    this.renderResultRender = this.renderResultRender.bind(this);
    this.renderResultRender();
    const scoreBoard = document.querySelector(
      '.time__self-data-result'
    ) as HTMLElement;
    const levelRender = new LevelRender(
      document.querySelector('.cards') as HTMLElement
    );
    const levelRenderTime: number = window.application.time - 1;
    console.log(levelRenderTime);

    scoreBoard.textContent =
      levelRenderTime > 60
        ? '0' +
          Math.floor(levelRenderTime / 60) +
          ':' +
          (levelRenderTime % 60 > 9
            ? levelRenderTime % 60
            : '0' + (levelRenderTime % 10))
        : '00' +
          ':' +
          (levelRenderTime > 9
            ? levelRenderTime
            : '0' + (levelRenderTime % 10));
    const reStart = document.querySelector('.button__restart');
    reStart?.addEventListener('click', reLoad);
  }
  renderResultRender() {
    this.resultRender = templateEngine(
      ResultRender.resultTemplate()
    ) as HTMLElement;
    document.body.appendChild(this.resultRender);
  }
}
ResultRender.resultTemplate = () => ({
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
