//  * HTML ELEMENT SELECTORS
// #region
  //  * OTHER
  // #region
const quitToMainMenuBtn = document.getElementById('quit-to-main-menu');
  // #endregion
  //  * MAIN MENU
  // #region
const mainMenu = document.getElementById('main-menu');
const newCharacterBtn = document.getElementById('new-character');
const loadCharacterBtn = document.getElementById('load-character');
  // #endregion
  //  * NEW CHARACTER MENU
  // #region
const newCharacterMenu = document.getElementById('new-character-menu');
const classSelectWarrior = document.getElementById('class-select-');
const classSelectRanger = document.getElementById('class-select-ranger');
const classSelectThief = document.getElementById('class-select-thief');
const classSelectBarbarian = document.getElementById('class-select-barbarian');
const classSelectWizard = document.getElementById('class-select-wizard');
const classSelectDruid = document.getElementById('class-select-druid');
const setCharacterName = document.getElementById('set-character-name');
const characterCreationYes = document.getElementById('character-creation-yes');
const characterCreationNo = document.getElementById('character-creation-no');
  // #endregion
  //  * LOAD CHARACTER MENU
  // #region
const loadCharacterMenu = document.getElementById('load-character-menu');
  // #endregion
// #endregion

//  * LISTENERS
// #region
  //  * OTHER
  // #region
quitToMainMenuBtn.addEventListener('click', mainMenuDisplay);
  // #endregion
  //  * MAIN MENU
  // #region
newCharacterBtn.addEventListener('click', newCharacterMenuDisplay);
loadCharacterBtn.addEventListener('click', loadCharacterMenuDisplay);
  // #endregion
  //  * LOAD CHARACTER MENU
  // #region
  // #endregion
  //  * NEW CHARACTER MENU
  // #region
// characterCreationYes.addEventListener('click', gameStart())
characterCreationNo.addEventListener('click', resetCharacterCreation)
  // #endregion

// #endregion

//  * MENU NAVIGATION
// #region
function mainMenuDisplay() {
  location.reload();
}

function newCharacterMenuDisplay() {
  quitToMainMenuBtn.style.display = 'block';
  mainMenu.style.display = 'none';
  newCharacterMenu.style.display = 'block';
  loadCharacterMenu.style.display = 'none';
}

function loadCharacterMenuDisplay() {
  quitToMainMenuBtn.style.display = 'block';
  mainMenu.style.display = 'none';
  newCharacterMenu.style.display = 'none';
  loadCharacterMenu.style.display = 'block';
}
// #endregion

//  * MISC FUNCTIONS
// #region
function resetCharacterCreation() {
// reset condition of character creation menu
}
// #endregion



// Character creation menu can look at the value of the selected button
// once clicking the final button. No need to have a listener on each one