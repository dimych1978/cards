const cards = document.querySelector('.cards');
const difficulty = document.querySelector('.cards__difficulty');

difficulty.addEventListener('click', (event) => {
  event.preventDefault();
  const target = event.target;
    console.log(target);
  if (target.dataset.name == 1) {
    const levelEasy = new LevelEasy(document.querySelector('.level-easy'));
    console.log(levelEasy);
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

