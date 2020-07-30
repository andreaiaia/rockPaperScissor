function computerPlay () {
  let computerSelection = "";
  i = Math.floor(Math.random() * (3)) + 1;
  switch (i) {
    case 1:
      computerSelection = "rock";
      break;
    case 2:
      computerSelection = "paper";
      break;
    default:
      computerSelection = "scissor";
      break;
  }
  return computerSelection;
}

function playRound (playerSelection, computerSelection) {
  if (playerSelection == "rock") {
    switch (computerSelection) {
      case "rock":
        return ["Draw!", "x"];
        break;
      case "paper":
        return ["You lose! Paper beats Rock.", "b"];
        break;
      case "scissor":
        return ["You win! Rock beats Scissor.", "a"];
        break;
    }
  } else if (playerSelection == "paper") {
    switch (computerSelection) {
      case "rock":
        return ["You win! Paper beats Rock.", "a"];
        break;
      case "paper":
        return ["Draw!", "x"];
        break;
      case "scissor":
        return ["You lose! Scissor beats Paper.", "b"];
        break;
    }
  } else if (playerSelection == "scissor") {
    switch (computerSelection) {
      case "rock":
        return ["You lose!. Rock beats Scissor.", "b"];
        break;
      case "paper":
        return ["You win! Scissor beats Paper.", "a"];
        break;
      case "scissor":
        return ["Draw", "x"];
        break;
    }
  }
}

// x = draw - a = player won - b = computer won

function runMatch(e) {
  const match = playRound(e.target.name, computerPlay());
  updateScore(match);
  checkScore();
}

function updateScore(match) {
  displayPlay(match);
  if (match[1] === "a") playerScore += 1;
  if (match[1] === "b") computerScore += 1;
  displayScore(playerScore, computerScore);
}

function displayPlay(match) {
  clearBoard();

  const play = document.createElement('h3');
  play.classList.add('play');
  play.textContent = match[0];

  const btn = document.querySelector('.buttons');
  document.body.insertBefore(play, btn);
}

function displayScore(playerScore, computerScore) {
  const divScore = document.createElement('div');
  divScore.classList.add('score');

  const player = document.createElement('p');
  player.classList.add('player');
  player.textContent = playerScore;

  const dash = document.createElement('p');
  dash.classList.add('dash');
  dash.textContent = '-';

  const computer = document.createElement('p');
  computer.classList.add('computer');
  computer.textContent = computerScore;

  divScore.appendChild(player);
  divScore.appendChild(dash);
  divScore.appendChild(computer);

  const btn = document.querySelector('.buttons');
  document.body.insertBefore(divScore, btn);
}

function clearBoard() {
  const scoreDiv = document.querySelector('.score');
  const sentence = document.querySelector('.play');
  if (scoreDiv !== null) {
    document.body.removeChild(scoreDiv);
    document.body.removeChild(sentence);
  }
}

function checkScore() {
  if (playerScore === 5) {
    let result = "You won! Would you like to beat the sh*t out of the pc again and again?";
    closeMatch(result);
  } else if (computerScore === 5) {
    let result = "You lost! Wanna re-match?";
    closeMatch(result);
  }
}

function closeMatch(result) {
  const message = document.createElement('h2');
  message.textContent = result;
  document.body.appendChild(message);

  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => button.classList.toggle('hide'));

  const rePlay = document.createElement('button');
  rePlay.textContent = "YES!";
  rePlay.classList.add('rewindButton');
  document.body.appendChild(rePlay);

  const btn = document.querySelector('.rewindButton');
  btn.addEventListener('click', () => {
    location.reload();
    return false;
  });
}

let playerScore = 0;
let computerScore = 0;

const btn = document.querySelectorAll('.clicked');
btn.forEach(button => button.addEventListener('click', runMatch));
