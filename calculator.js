const readline = require('readline-sync');

function prompt(message) {
  console.log(`=> ${message}`);
}

function amountStrToNum (loanAmountStr) {
  if (loanAmountStr[0] === "$") {
    loanAmountStr = loanAmountStr.slice(1);
  }
  for (let index = 0; index < loanAmountStr.length; index++) {
    if (loanAmountStr[index] === ",") {
      loanAmountStr = loanAmountStr.replace(",", "");
    }
  }
  loanAmountStr = parseFloat(loanAmountStr);
  return loanAmountStr;
}

function APRStrToNum (APRStr) {
  for (let index = 0; index < APRStr.length; index++) {
    if (APRStr[index] === "%") {
      APRStr = APRStr.replace("%", "");
    }
  }
  APRStr = parseFloat(APRStr) / 100;
  return APRStr;
}

prompt("Please enter the loan amount");
let loanAmount = readline.question();
loanAmount = amountStrToNum(loanAmount);

prompt("Please enter the loan duration in years");
let loanDurationYears = readline.question();
let loanDurationMonths;
loanDurationMonths = parseFloat(loanDurationYears * 12);

let response = "y";
while (response === "y") {
  prompt("Please enter the annual percentage rate (example: 5%)");
  let APR = readline.question();
  APR = APRStrToNum(APR);
  let monthlyPR = APR / 12;
  if (monthlyPR === 0) {
    prompt("Are you sure that the annual percentage rate is 0? (y/n)");
    response = readline.question();
    if (response !== "n") {
      let monthlyPayment = loanAmount / loanDurationMonths;
      monthlyPayment = (monthlyPayment).toFixed(2);
      console.log(`Your monthly payment is $${monthlyPayment}`);
      break;
    }
  }
  response = "n";
  let monthlyPayment = loanAmount * (monthlyPR /
    (1 - Math.pow(1 + monthlyPR, -loanDurationMonths)));
  monthlyPayment = (monthlyPayment).toFixed(2);
  console.log(`Your monthly payment is $${monthlyPayment}`);
}