import { useState } from "react";
import "./App.css";

export default function App() {
  const [bill, setBill] = useState(""); // bill input value stored in React state
  const [tipPercentage, setTipPercentage] = useState(""); // tip input value stored in React state
  const [billError, setBillError] = useState(""); // error message for bill input
  const [tipError, setTipError] = useState(""); // error message for tip input
  const [total, setTotal] = useState(""); // total including tip, displayed in the UI

  //when user types in bill in UI, detect the event
  //take the current text in the input box via event.target.value and store it in React state (bill)
  //we are storing value for bill in react so that we can reference that and calculate total

  function handleBillChange(event) {
    setBill(event.target.value);
  }

  //when user types in tip in UI, detect the event
  //take the current text in the input box via event.target.value and store it in React state (tipPercentage)
  //we are storing value for tip in react so that we can reference that and calculate total

  function handleTipChange(event) {
    setTipPercentage(event.target.value);
  }

  //calculate total
  function calculateTotal() {
    var billValue = parseFloat(bill);
    var tipValue = parseFloat(tipPercentage);

    // Reset output first (like clearing totalValue)
    setTotal("");

    // Case 1: both invalid
    if (isNaN(billValue) && isNaN(tipValue)) {
      setBillError("Nice try, but only numbers are allowed!");
      setTipError("Nice try, but only numbers are allowed!");
      return;
    }

    // Case 2: bill invalid
    if (isNaN(billValue)) {
      setBillError("Nice try, but only numbers are allowed!");
      setTipError("");
      return;
    }

    // Case 3: tip invalid
    if (isNaN(tipValue)) {
      setTipError("Nice try, but only numbers are allowed!");
      setBillError("");
      return;
    }

    // Case 4: valid inputs - clear errors
    setBillError("");
    setTipError("");

    // Calculate total
    var tipAmount = billValue * (tipValue / 100);
    var finalTotal = billValue + tipAmount;

    setTotal(finalTotal.toFixed(2));
  }

  return (
    <div className="container-properties">
      <div id="title">
        <h1>Tip Calculator</h1>
      </div>

      <div>Enter the bill amount</div>

      <div>Bill amount:</div>
      <span className="incorrectValue">{billError}</span>
      <div>
        <input id="billAmount" value={bill} onChange={handleBillChange} />
      </div>

      <div>Tip Percentage:</div>
      <span className="incorrectValue">{tipError}</span>
      <div>
        <input
          id="tipPercentage"
          value={tipPercentage}
          onChange={handleTipChange}
        />
      </div>

      <div>
        <button type="button" onClick={calculateTotal}>
          Calculate
        </button>
      </div>

      <div>
        Total: £<span id="totalValue">{total}</span>
      </div>
    </div>
  );
}
