//created function to calculate Tip Amount so that we can potentially unit test this.
//seperating business logic from UI
// This file contains multiple utility functions, so named exports are clearer.
// A file can only have one default export in JavaScript.
export function calculateTipAmount(billValue, tipValue) {
  let calculateTipAmount = billValue * (tipValue / 100);

  return calculateTipAmount;
}

//created function to calculate Final Total so that we can potentially unit test this.
//seperating business logic from UI
export function calculateFinalTotal(billValue, tipAmount, splitBetween) {
  let calculateFinalTotal;

  if (splitBetween > 0) {
    calculateFinalTotal = (billValue + tipAmount) / splitBetween;
  } else {
    calculateFinalTotal = billValue + tipAmount;
  }

  return calculateFinalTotal;
}
