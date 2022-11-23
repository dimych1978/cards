function renderEasyScreen() {
  cards.textContent = '';
  cards.setAttribute('style', 'display: none');
  const levelEasy = new LevelEasy(document.querySelector('.cards'));
}

function renderNormalScreen() {
  cards.textContent = '';
  const title = document.createElement('div');
  title.textContent = 'title placeholder';
  const content = document.createElement('div');
  content.textContent = 'normal placeholder';

  cards.appendChild(title);
  cards.appendChild(content);
}

function renderHardScreen() {
  cards.textContent = '';
  const title = document.createElement('div');
  title.textContent = 'title placeholder';
  const content = document.createElement('div');
  content.textContent = 'hard placeholder';

  cards.appendChild(title);
  cards.appendChild(content);
}

function renderALLScreen() {
  cards.textContent = '';
  cards.setAttribute('style', 'display: none');
  const allCards = new AllCards(document.querySelector('.cards'));
}
