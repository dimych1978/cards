/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/array-card-faces.js":
/*!*********************************!*\
  !*** ./src/array-card-faces.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "arrayOfCards": () => (/* binding */ arrayOfCards)
/* harmony export */ });
const arrayOfCards = [
  'static/img/6_Clubs.svg',
  'static/img/7_Clubs.svg',
  'static/img/8_Clubs.svg',
  'static/img/9_Clubs.svg',
  'static/img/10_Clubs.svg',
  'static/img/J_Clubs.svg',
  'static/img/Q_Clubs.svg',
  'static/img/K_Clubs.svg',
  'static/img/A_Clubs.svg',
  'static/img/6_Diamonds.svg',
  'static/img/7_Diamonds.svg',
  'static/img/8_Diamonds.svg',
  'static/img/9_Diamonds.svg',
  'static/img/10_Diamonds.svg',
  'static/img/J_Diamonds.svg',
  'static/img/Q_Diamonds.svg',
  'static/img/K_Diamonds.svg',
  'static/img/A_Diamonds.svg',
  'static/img/6_Hearts.svg',
  'static/img/7_Hearts.svg',
  'static/img/8_Hearts.svg',
  'static/img/9_Hearts.svg',
  'static/img/10_Hearts.svg',
  'static/img/J_Hearts.svg',
  'static/img/Q_Hearts.svg',
  'static/img/K_Hearts.svg',
  'static/img/A_Hearts.svg',
  'static/img/6_Spades.svg',
  'static/img/7_Spades.svg',
  'static/img/8_Spades.svg',
  'static/img/9_Spades.svg',
  'static/img/10_Spades.svg',
  'static/img/J_Spades.svg',
  'static/img/Q_Spades.svg',
  'static/img/K_Spades.svg',
  'static/img/A_Spades.svg',
];


/***/ }),

/***/ "./src/classes/level-render.js":
/*!*************************************!*\
  !*** ./src/classes/level-render.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LevelRender": () => (/* binding */ LevelRender)
/* harmony export */ });
/* harmony import */ var _lib_template_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/template-engine */ "./src/lib/template-engine.js");
/* harmony import */ var _array_card_faces__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../array-card-faces */ "./src/array-card-faces.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! .. */ "./src/index.js");
/* harmony import */ var _screens_screen__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../screens/screen */ "./src/screens/screen.js");







class LevelRender {
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
    reStart.addEventListener('click', _screens_screen__WEBPACK_IMPORTED_MODULE_3__.reLoad);
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
    this.levelRender = (0,_lib_template_engine__WEBPACK_IMPORTED_MODULE_0__.templateEngine)(LevelRender.levelTemplate());
    document.body.appendChild(this.levelRender);
    const cardShirt = document.querySelector('.cards__shirts');
    (0,___WEBPACK_IMPORTED_MODULE_2__.comparison)();
    for (let count = 0; count < window.application.difficult; count++) {
      this.shirtBack = (0,_lib_template_engine__WEBPACK_IMPORTED_MODULE_0__.templateEngine)(LevelRender.ShirtBackTemplate(count));
      cardShirt.appendChild(this.shirtBack);
    }
    const imgBack = cardShirt.querySelectorAll('.img-back');

    function shuffle(array) {
      array.sort(() => Math.random() - 0.5);
    }
    shuffle(___WEBPACK_IMPORTED_MODULE_2__.randomCard);
    imgBack.forEach((img) => {
      img.setAttribute(
        'style',
        `background-image: url(${_array_card_faces__WEBPACK_IMPORTED_MODULE_1__.arrayOfCards[___WEBPACK_IMPORTED_MODULE_2__.randomCard[img.name] - 1]})`
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
        _array_card_faces__WEBPACK_IMPORTED_MODULE_1__.arrayOfCards[___WEBPACK_IMPORTED_MODULE_2__.randomCard[targetOfShowCard.name] - 1]
      })`
    );
    const cardsNext = document.querySelector('.cards__shirts');
    this.arrForCompare.push(___WEBPACK_IMPORTED_MODULE_2__.randomCard[targetOfShowCard.name]);

    cardsNext.addEventListener('click', (event) => {
      if (event.target.name === targetOfShowCard.name) {
        const scoreboard = document.querySelector('.level__easy-screen');
        cards.remove();
        scoreboard.remove();
        (0,_screens_screen__WEBPACK_IMPORTED_MODULE_3__.renderScreen)();
      }
    });
    this.compare(event);
  }

  compare(event) {
    event.preventDefault();
    const target = event.target;
    target.setAttribute(
      'style',
      `background-image: url(${_array_card_faces__WEBPACK_IMPORTED_MODULE_1__.arrayOfCards[___WEBPACK_IMPORTED_MODULE_2__.randomCard[target.name] - 1]})`
    );

    if (this.arrForCompare.length % 2 === 1) {
      return;
    } else {
      let index = this.arrForCompare.length;
      if (this.arrForCompare[index - 2] !== ___WEBPACK_IMPORTED_MODULE_2__.randomCard[target.name]) {
        window.application.total = false;
        clearTimeout(this.time);
        document.querySelector('.level__easy-screen').remove();
        (0,_screens_screen__WEBPACK_IMPORTED_MODULE_3__.renderResultScreen)();
      }
    }

    if (this.arrForCompare.length === window.application.difficult) {
      clearTimeout(this.time);
      document.querySelector('.level__easy-screen').remove();
      (0,_screens_screen__WEBPACK_IMPORTED_MODULE_3__.renderResultScreen)();

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


/***/ }),

/***/ "./src/classes/result-render.js":
/*!**************************************!*\
  !*** ./src/classes/result-render.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ResultRender": () => (/* binding */ ResultRender)
/* harmony export */ });
/* harmony import */ var _lib_template_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/template-engine */ "./src/lib/template-engine.js");
/* harmony import */ var _screens_screen__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../screens/screen */ "./src/screens/screen.js");
/* harmony import */ var _level_render__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./level-render */ "./src/classes/level-render.js");




class ResultRender {
  constructor(element) {
    if (!(element instanceof HTMLElement)) {
      throw new Error('Это не HTML-элемент');
    }
    this.element = element;
    this.resultRender = this.resultRender.bind(this);
    this.resultRender();
    const scoreBoard = document.querySelector('.time__self-data-result');
    const levelRender = new _level_render__WEBPACK_IMPORTED_MODULE_2__.LevelRender(document.querySelector('.cards'));
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
    reStart.addEventListener('click', _screens_screen__WEBPACK_IMPORTED_MODULE_1__.reLoad);
  }
  resultRender() {
    this.resultRender = (0,_lib_template_engine__WEBPACK_IMPORTED_MODULE_0__.templateEngine)(ResultRender.template());
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


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "buttonPlayGame": () => (/* binding */ buttonPlayGame),
/* harmony export */   "cards": () => (/* binding */ cards),
/* harmony export */   "comparison": () => (/* binding */ comparison),
/* harmony export */   "difficulty": () => (/* binding */ difficulty),
/* harmony export */   "randomCard": () => (/* binding */ randomCard)
/* harmony export */ });
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _screens_screen_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./screens/screen.js */ "./src/screens/screen.js");



let randomCard = [];
const cards = document.querySelector('.cards');
const difficulty = document.querySelector('.cards__difficulty');
const buttonPlayGame = document.querySelector('.cards__start-button');

const easyDifficulty = difficulty.querySelector('.level-easy');
const normalDifficulty = difficulty.querySelector('.level-normal');
const hardDifficulty = difficulty.querySelector('.level-hard');

window.application.total = true;

difficulty.addEventListener('click', (event) => {
  event.preventDefault();
  const target = event.target;
  if (target.dataset.name == 1) {
    window.application.difficult = 6;
    easyDifficulty.setAttribute('style', 'border: 1px solid red');
    normalDifficulty.removeAttribute('style');
    hardDifficulty.removeAttribute('style');
    buttonPlayGame.addEventListener('click', (event) => {
      event.preventDefault();
      window.application.screens['easy'] = _screens_screen_js__WEBPACK_IMPORTED_MODULE_1__.renderScreen;
      window.application.renderScreen('easy');
    });
  } else if (target.dataset.name == 2) {
    window.application.difficult = 12;
    normalDifficulty.setAttribute('style', 'border: 1px solid red');
    easyDifficulty.removeAttribute('style');
    hardDifficulty.removeAttribute('style');
    buttonPlayGame.addEventListener('click', (event) => {
      event.preventDefault();
      window.application.screens['normal'] = _screens_screen_js__WEBPACK_IMPORTED_MODULE_1__.renderScreen;
      window.application.renderScreen('normal');
    });
  } else if (target.dataset.name == 3) {
    window.application.difficult = 18;
    hardDifficulty.setAttribute('style', 'border: 1px solid red');
    normalDifficulty.removeAttribute('style');
    easyDifficulty.removeAttribute('style');
    buttonPlayGame.addEventListener('click', (event) => {
      event.preventDefault();
      window.application.screens['hard'] = _screens_screen_js__WEBPACK_IMPORTED_MODULE_1__.renderScreen;
      window.application.renderScreen('hard');
    });
  }
});

function comparison() {
  function randomCardUniq() {
    const arr = [];
    for (let index = 0; index < window.application.difficult / 2; index++) {
      let renderDifficulty = Math.ceil(Math.random() * 36);
      let desired = renderDifficulty;
      if (!arr.includes(renderDifficulty)) {
        arr.push(renderDifficulty, desired);
      } else {
        index--;
      }
    }
    randomCard = arr;
  }
  randomCardUniq(randomCard);
}


/***/ }),

/***/ "./src/lib/template-engine.js":
/*!************************************!*\
  !*** ./src/lib/template-engine.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "templateEngine": () => (/* binding */ templateEngine)
/* harmony export */ });
function templateEngine( block )
{
    if ( block === undefined || block === null || block === false )
    { return document.createTextNode( '' ) };
    if ( typeof block === 'string' || typeof block === 'number' || typeof block === true )
    { return document.createTextNode( block ) };
    if ( Array.isArray( block ) )
    {
        const fragment = document.createDocumentFragment( block )
        block.forEach( element =>
        {
            const el = templateEngine( element );
            fragment.appendChild( el )
        } )
        return fragment;
    }
    const element = document.createElement( block.tag );

    if(block.cls) {
        element.classList.add( ...[].concat(block.cls).filter(Boolean));
 
    }


    if(block.attrs) {
        const keys = Object.keys(block.attrs);
        keys.forEach(key => 
            element.setAttribute(key, block.attrs[key]))
    }
    
    const content = templateEngine( block.content );
    element.appendChild( content );
    return element;

};


/***/ }),

/***/ "./src/screens/screen.js":
/*!*******************************!*\
  !*** ./src/screens/screen.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "reLoad": () => (/* binding */ reLoad),
/* harmony export */   "renderResultScreen": () => (/* binding */ renderResultScreen),
/* harmony export */   "renderScreen": () => (/* binding */ renderScreen)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index.js */ "./src/index.js");
/* harmony import */ var _classes_level_render_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../classes/level-render.js */ "./src/classes/level-render.js");
/* harmony import */ var _classes_result_render_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../classes/result-render.js */ "./src/classes/result-render.js");




function reLoad () {
    location.reload();
}

function renderScreen() {
  _index_js__WEBPACK_IMPORTED_MODULE_0__.cards.textContent = '';
  _index_js__WEBPACK_IMPORTED_MODULE_0__.cards.setAttribute('style', 'display: none');
  const levelRender = new _classes_level_render_js__WEBPACK_IMPORTED_MODULE_1__.LevelRender(document.querySelector('.cards'));
}

function renderResultScreen() {
  _index_js__WEBPACK_IMPORTED_MODULE_0__.cards.textContent = '';
  _index_js__WEBPACK_IMPORTED_MODULE_0__.cards.setAttribute('style', 'display: none');

  const resultScreen = new _classes_result_render_js__WEBPACK_IMPORTED_MODULE_2__.ResultRender(document.querySelector('.cards'));
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle.js.map