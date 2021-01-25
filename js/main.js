// -------------------------   Landing Page    -------------------------
let currentGame = {
  players: {},
  gameName: "",
};
let playerChoosingCharacter = 1;

let charactersAvailable = ["robot", "ninja", "ninja2", "knight"];

const newGameClick = () => {
  document.getElementById("new-or-continue").style.display = "none";
  document.getElementById("new-game-name").style.display = "block";
};

const newGameNameSubmit = (event) => {
  event.preventDefault();
  currentGame.gameName = document.getElementById("game-name").value;
  document.getElementById("new-game-name").style.display = "none";
  document.getElementById("new-game-players").style.display = "block";
};

const newGameWithNPlayers = (n) => {
  currentGame.numberOfPlayers = n;
  document.getElementById("new-game-players").style.display = "none";
  document.getElementById("new-game-difficulty").style.display = "block";
};

const newGameWithDifficulty = (difficulty) => {
  currentGame.difficulty = difficulty;
  document.getElementById("new-game-difficulty").style.display = "none";
  document.getElementById("new-game-characters").style.display = "block";
};

const chooseCharacter = (character, alias) => {
  currentPlayer = "player" + playerChoosingCharacter;
  currentGame.players[currentPlayer] = {};
  currentGame.players[currentPlayer].character = character;
  charactersAvailable = charactersAvailable.filter((remaining) => {
    return remaining !== character;
  });
  const characterImages = document.querySelectorAll("#character-options img");
  characterImages.forEach((img) => {
    img.style.display = "none";
  });
  document.getElementById("character-name-div").style.display = "block";
  document.getElementById(
    currentGame.players[currentPlayer].character
  ).style.display = "inline";
  document.getElementById("character-name").value = alias;
};

const completeCharacter = (e) => {
  e.preventDefault();
  const chosenCharacter = currentGame.players[currentPlayer].character;
  currentGame.players[currentPlayer].name = document.getElementById(
    "character-name"
  ).value;
  playerChoosingCharacter++;
  playerChoosingCharacter <= currentGame.numberOfPlayers
    ? prepForNextCharacterChoice(chosenCharacter)
    : goToWorld();
};

const prepForNextCharacterChoice = (chosenCharacter) => {
  document.getElementById(chosenCharacter).style.display = "none";
  charactersAvailable.forEach((name) => {
    document.getElementById(name).style.display = "inline";
  });
  document.getElementById(
    "player-number"
  ).textContent = playerChoosingCharacter;
  document.getElementById("character-name-div").style.display = "none";
};

const continueGameClick = () => {
  document.getElementById("new-or-continue").style.display = "none";
  const continueGameOptions = document.getElementById("continue-game-options");
  continueGameOptions.style.display = "block";
  // localStorage.getItem;
  getAllStoredGames().forEach((game) => {
    const currentGame = document.createElement("p");
    currentGame.setAttribute("id", game.split("=")[0]);
    currentGame.setAttribute(
      "onclick",
      `selectGameToContinue("${game.split("=")[0]}")`
    );
    currentGame.textContent = game.substring(9).split("=")[0];
    continueGameOptions.appendChild(currentGame);
  });
};

const selectGameToContinue = (gameName) => {
  alert(gameName);
  let gameToLoad = localStorage.getItem(gameName);
  currentGame = JSON.parse(gameToLoad);
  console.log(currentGame);
};

const goToWorld = () => {
  document.getElementById("landing").style.display = "none";
  document.getElementById("world").style.display = "block";
  localStorage.setItem(
    "kids-rpg-" + currentGame.gameName,
    JSON.stringify(currentGame)
  );
};
function getAllStoredGames() {
  var storedGames = [],
    keys = Object.keys(localStorage),
    key;
  for (i = 0; (key = keys[i]); i++) {
    if (key.substring(0, 9) == "kids-rpg-")
      storedGames.push(key + "=" + localStorage.getItem(key));
  }

  return storedGames;
}

// -------------------------   World    -------------------------
