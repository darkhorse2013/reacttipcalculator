//load React libaries
import { useState, useEffect } from "react";
import "./App.css";

//all functions can access anything within app
//everytime state changes, react re-runs app function
export default function App() {
  const [bill, setBill] = useState(""); // bill input value stored in React state
  const [tipPercentage, setTipPercentage] = useState(""); // tip input value stored in React state
  //get value from UI and store in state
  //get component state for number of people
  const [numberOfPeople, setNumberOfPeople] = useState("");
  let totalLabel = "Total:";

  //create an event handler that fires when button is pressed
  //when user types in bill in UI, detect the event
  //take the current text in the input box via event.target.value and store it in React state (bill)
  //we are storing value for bill in react so that we can reference that and calculate total

  function handleBillChange(event) {
    //update react state with what has been typed in the bill input box
    setBill(event.target.value);
  }

  //create an event handler that fires when button is pressed
  function setPresetTip(event) {
    //look for value from event JSON object and get data
    //console.log(event.target.textContent);
    //apply percentage to tip percentage box
    applyPresetTip(event.target.textContent);
  }

  //create an event handler that fires when number of people is specified
  function setNumberOfPeopleEvent(event) {
    //set state with value
    //update state so that the value in the input box updates as someone types.
    setNumberOfPeople(event.target.value);
  }

  //Watch bill
  //Watch tipPercentage
  //If either changes
  //→ run calculateTotal() using useEffect React hook

  /*
  useEffect(
    () => {
      //When tipPercentage OR bill changes
      calculateTotal();
    },
    //check if state has changed for either variables
    [tipPercentage, bill, numberOfPeople],
  );

  */

  function applyPresetTip(percentage) {
    if (percentage === "10%") {
      //update state of setTipPercentage and apply value to tip Percentage box
      setTipPercentage("10");

      //  return;
    } else if (percentage === "15%") {
      //update state of setTipPercentage and apply value to tip Percentage box
      setTipPercentage("15");

      //   return;
    } else if (percentage === "20%") {
      //update state of setTipPercentage and apply value to tip Percentage box
      setTipPercentage("20");

      // return;
    }
  }

  //when user types in tip in UI, detect the event
  //take the current text in the input box via event.target.value and store it in React state (tipPercentage)
  //we are storing value for tip in react so that we can reference that and calculate total

  function handleTipChange(event) {
    //update state with what is typed in the tip input box
    setTipPercentage(event.target.value);
    //console.log(event.target.value);
  }

  //event listener for reset values button
  function resetValues() {
    //update state of components

    //get values from state and reset
    setBill("");
    setNumberOfPeople("");
    setTipPercentage("");
  }

  //calculate total
  let billValue = parseFloat(bill);
  let tipValue = parseFloat(tipPercentage);
  let splitBetween = parseFloat(numberOfPeople);
  let billError;
  let tipError;
  let peopleError;
  let totalTip;
  let total;

  //ADD VALIDATION FOR NEGATIVE NUMBERS
  if (billValue < 0) {
    billError = "Bill cannot be negative";
  }

  if (tipValue < 0) {
    tipError = "Tip cannot be negative";
  }

  if (splitBetween < 0) {
    peopleError = "Total number of People cannot be negative";
  }

  //bill = original state
  //billValue = parsedValue
  //tipPercentage = original state
  //tipValue = parsedValue

  if (bill !== "" && isNaN(billValue)) {
    billError = "Bill has to be a number";
  }

  if (tipPercentage !== "" && isNaN(tipValue)) {
    tipError = "Tip has to be a number";
  }

  if (numberOfPeople !== "" && isNaN(splitBetween)) {
    peopleError = "Total number of people has to be a number";
  }

  // Calculate total if not a NAN, first check if either billValue or TipValue is NAN
  if (isNaN(billValue) || isNaN(tipValue)) {
    //make components blank
    totalTip = "";
    //pass bill given back to UI
    total = "";
  } else {
    //it is NAN, calculate
    let tipAmount = calculateTipAmount(billValue, tipValue);
    let finalTotal = calculateFinalTotal(billValue, tipAmount, splitBetween);
    //pass tip given back to UI
    totalTip = tipAmount.toFixed(2);
    //pass bill and tip back to UI

    total = finalTotal.toFixed(2);
    totalTip = tipAmount.toFixed(2);
  }

  //created function to calculate Tip Amount so that we can potentially unit test this.
  //seperating business logic from UI
  function calculateTipAmount(billValue, tipValue) {
    let calculateTipAmount = billValue * (tipValue / 100);

    return calculateTipAmount;
  }

  //created function to calculate Final Total so that we can potentially unit test this.
  //seperating business logic from UI
  function calculateFinalTotal(billValue, tipAmount, splitBetweenPeople) {
    let calculateFinalTotal;

    if (splitBetweenPeople > 0) {
      calculateFinalTotal = (billValue + tipAmount) / splitBetweenPeople;
    } else {
      calculateFinalTotal = billValue + tipAmount;
    }

    return calculateFinalTotal;
  }

  // Runs during every render of the component.
  // Uses current state to decide what label the UI should display.

  if (parseFloat(numberOfPeople) > 0) {
    totalLabel = "Total per person:";
  }

  return (
    <div className="container-properties">
      <div id="title">
        <h1>Tip Calculator</h1>
      </div>

      <div>Enter the bill amount</div>

      <div>Bill amount:*</div>
      <span className="incorrectValue">{billError}</span>
      <div>
        <input id="billAmount" value={bill} onChange={handleBillChange} />
      </div>

      <div>Tip Percentage:*</div>
      <span className="incorrectValue">{tipError}</span>
      <div>
        <input
          id="tipPercentage"
          value={tipPercentage}
          onChange={handleTipChange}
        />
      </div>
      <div>Total number of People to split bill between:</div>
      <span className="incorrectValue">{peopleError}</span>
      <div>
        <input
          id="numberOfPeople"
          value={numberOfPeople}
          onChange={setNumberOfPeopleEvent}
        />
      </div>

      <div>
        <button type="button" onClick={resetValues}>
          Reset
        </button>
        <button type="button" onClick={setPresetTip}>
          10%
        </button>
        <button type="button" onClick={setPresetTip}>
          15%
        </button>
        <button type="button" onClick={setPresetTip}>
          20%
        </button>
      </div>
      <div>
        Tip amount: £<span className="totalValue">{totalTip}</span>
      </div>
      <div>
        {totalLabel} £<span className="totalValue">{total}</span>
      </div>
    </div>
  );
}
