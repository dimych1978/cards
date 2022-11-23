const cards = document.querySelector('.cards');
const difficulty = document.querySelector('.cards__difficulty');
const buttonPlayGame = document.querySelector('.cards__start-button');

difficulty.addEventListener('click', (event) => {
  event.preventDefault();
  const target = event.target;
    console.log(target);
  if (target.dataset.name == 1) {
    window.application.screens['easy'] = renderEasyScreen;
    window.application.renderScreen('easy');
  } else if (target.dataset.name == 2) {
    const levelNormal = new LevelNormal(
      document.querySelector('.level-normal')
    );
    window.application.screens['normal'] = renderNormalScreen;
    window.application.renderScreen('normal');
} else if (target.dataset.name == 3) {
    const levelHard = new LevelHard(document.querySelector('.level-hard'));
    window.application.screens['hard'] = renderHardScreen;
    window.application.renderScreen('hard');
}
});
console.log(buttonPlayGame);
buttonPlayGame.addEventListener('click', (event) => {
  event.preventDefault();
  const target = event.target;
  window.application.screens['allScreen'] = renderALLScreen;
  window.application.renderScreen('allScreen');
});



