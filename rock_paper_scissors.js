const readline = require('readline-sync');
const DISPLAY_VALID_CHOICES = ['rock (r)', 'paper (p)',
  'scissors (s)', "lizard (l)", "spock (sp)"];
const VALID_CHOICES = ['r', 'p', 's', "l", "sp"];
const win = "You win!";
const lose = "Computer wins!";
const tie = "It's a tie!";

function prompt(message) {
  console.log(`=> ${message}`);
}

function Victory(choice, computerChoice) {
  switch (choice) {
    case "r" :
      if (computerChoice === "l" || computerChoice === "s") return true;
      break;
    case "p" :
      if (computerChoice === "r" || computerChoice === "sp") return true;
      break;
    case "s" :
      if (computerChoice === "p" || computerChoice === "l") return true;
      break;
    case "l" :
      if (computerChoice === "p" || computerChoice === "sp") return true;
      break;
    case "sp" :
      if (computerChoice === "r" || computerChoice === "s") return true;
      break;
  }
}

function displayWinner(choice, computerChoice) {
  prompt(`You chose ${choice}, computer chose ${computerChoice}`);
  if (Victory(choice, computerChoice)) {
    prompt(win);
    userVictoryCounter();
  } else if (choice === computerChoice) prompt (tie);
  else {
    prompt(lose);
    computerVictoryCounter();
  }
}
let userVictory = 0;
let computerVictory = 0;

function userVictoryCounter() {
  userVictory += 1;
  if (userVictory === 5) {
    prompt("Congratulations! You are the grandwinner!");
  }
}

function computerVictoryCounter() {
  computerVictory += 1;
  if (computerVictory === 5) {
    prompt("The computer is the grandwinner!");
  }
}


while (true) {
  userVictory = 0;
  computerVictory = 0;
  while (userVictory < 5 && computerVictory < 5) {
    prompt(`Choose one: ${DISPLAY_VALID_CHOICES.join(', ')}. Whoever wins 5 games is the grand winner!`);
    let choice = readline.question();

    while (!VALID_CHOICES.includes(choice)) {
      prompt("That's not a valid choice");
      choice = readline.question();
    }

    let randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
    let computerChoice = VALID_CHOICES[randomIndex];

    displayWinner(choice, computerChoice);
  }
  prompt('Do you want to play again (y/n)?');
  let answer = readline.question().toLowerCase();
  while (answer[0] !== 'n' && answer[0] !== 'y') {
    prompt('Please enter "y" or "n".');
    answer = readline.question().toLowerCase();
  }
  if (answer[0] !== 'y') break;
}