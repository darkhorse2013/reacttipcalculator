//load React libaries
import { useState, useEffect } from "react";
import "./App.css";

//all functions can access anything within app
//everytime state changes, react re-runs app function
export default function App() {
  const [bill, setBill] = useState(""); // bill input value stored in React state
  const [tipPercentage, setTipPercentage] = useState(""); // tip input value stored in React state
  const [billError, setBillError] = useState(""); // error message for bill input
  const [tipError, setTipError] = useState(""); // error message for tip input
  const [total, setTotal] = useState(""); // total including tip, displayed in the UI
  //get value from UI and store in state
  const [totalTip, setTotalTip] = useState("");

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

  //Watch bill
  //Watch tipPercentage
  //If either changes
  //→ run calculateTotal() using useEffect React hook

  useEffect(
    () => {
      //When tipPercentage OR bill changes
      calculateTotal();
    },
    //check if state has changed for either variables
    [tipPercentage, bill],
  );

  function applyPresetTip(percentage) {
    if (percentage == "10%") {
      //update state of setTipPercentage and apply value to tip Percentage box
      setTipPercentage("10");

      //  return;
    } else if (percentage == "15%") {
      //update state of setTipPercentage and apply value to tip Percentage box
      setTipPercentage("15");

      //   return;
    } else if (percentage == "20%") {
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
    setBill("");
    setTipPercentage("");
    setTotalTip("");
    setTotal("");
    //clear errors on reset
    setBillError("");
    setTipError("");
  }

  //calculate total
  function calculateTotal() {
    var billValue = parseFloat(bill);
    var tipValue = parseFloat(tipPercentage);

    //ADD VALIDATION FOR NEGATIVE NUMBERS
    if (billValue < 0 && tipValue < 0) {
      setBillError("Bill cannot be negative");
      setTipError("Tip cannot be negative");
      return;
    } else if (billValue < 0) {
      setTipError("");
      setBillError("Bill cannot be negative");
      return;
    } else if (tipValue < 0) {
      setBillError("");
      setTipError("Tip cannot be negative");
      return;
    }

    //bill = original state
    //billValue = parsedValue
    //tipPercentage = original state
    //tipValue = parsedValue

    //set flag
    let hasError = false;

    if (bill !== "" && isNaN(billValue)) {
      setBillError("Bill has to be a number");
      hasError = true;
    } else {
      setBillError("");
    }

    if (tipPercentage !== "" && isNaN(tipValue)) {
      setTipError("Tip has to be a number");
      hasError = true;
    } else {
      setTipError("");
    }

    if (hasError) {
      //clear old totals
      setTotalTip("");
      setTotal("");
      //break out of function
      return;
    }

    // Calculate total if not a NAN, first check if either billValue or TipValue is NAN
    if (isNaN(billValue) || isNaN(tipValue)) {
      //make components blank
      setTotalTip("");
      //pass bill given back to UI
      setTotal("");
      return;
    } else {
      //it is NAN, calculate
      var tipAmount = calculateTipAmount(billValue, tipValue);
      var finalTotal = calculateFinalTotal(billValue, tipAmount);
      //pass tip given back to UI
      setTotalTip(tipAmount.toFixed(2));

      //pass bill given back to UI
      setTotal(finalTotal.toFixed(2));
    }
  }

  //created function to calculate Tip Amount so that we can potentially unit test this.
  //seperating business logic from UI
  function calculateTipAmount(billValue, tipValue) {
    var calculateTipAmount = billValue * (tipValue / 100);

    return calculateTipAmount;
  }

  //created function to calculate Final Total so that we can potentially unit test this.
  //seperating business logic from UI
  function calculateFinalTotal(billValue, tipAmount) {
    var calculateFinalTotal = billValue + tipAmount;
    return calculateFinalTotal;
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
        <input
          id="billAmount"
          value={bill}
          //type="number"
          onChange={handleBillChange}
        />
      </div>

      <div>Tip Percentage:*</div>
      <span className="incorrectValue">{tipError}</span>
      <div>
        <input
          id="tipPercentage"
          value={tipPercentage}
          //type="number"
          onChange={handleTipChange}
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
        Tip amount: £<span id="totalValue">{totalTip}</span>
      </div>
      <div>
        Total: £<span id="totalValue">{total}</span>
      </div>
    </div>
  );
}
