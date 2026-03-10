import { useState } from "react";
import "./App.css";

export default function App() {
  const [bill, setBill] = useState("");
  const [tipPercentage, setTipPercentage] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState("");

  const [billError, setBillError] = useState("");
  const [tipError, setTipError] = useState("");
  const [peopleError, setPeopleError] = useState("");

  function handleBillChange(event) {
    const value = event.target.value;
    setBill(value);

    const billValue = parseFloat(value);

    if (value !== "" && isNaN(billValue)) {
      setBillError("Bill has to be a number");
    } else if (billValue < 0) {
      setBillError("Bill cannot be negative");
    } else {
      setBillError("");
    }
  }

  function handleTipChange(event) {
    const value = event.target.value;
    setTipPercentage(value);

    const tipValue = parseFloat(value);

    if (value !== "" && isNaN(tipValue)) {
      setTipError("Tip has to be a number");
    } else if (tipValue < 0) {
      setTipError("Tip cannot be negative");
    } else {
      setTipError("");
    }
  }

  function handleNumberOfPeopleChange(event) {
    const value = event.target.value;
    setNumberOfPeople(value);

    const peopleValue = parseFloat(value);

    if (value !== "" && isNaN(peopleValue)) {
      setPeopleError("Total number of people has to be a number");
    } else if (peopleValue < 0) {
      setPeopleError("Total number of people cannot be negative");
    } else {
      setPeopleError("");
    }
  }

  function setPresetTip(event) {
    applyPresetTip(event.target.textContent);
  }

  function applyPresetTip(percentage) {
    if (percentage === "10%") {
      setTipPercentage("10");
      setTipError("");
    } else if (percentage === "15%") {
      setTipPercentage("15");
      setTipError("");
    } else if (percentage === "20%") {
      setTipPercentage("20");
      setTipError("");
    }
  }

  function resetValues() {
    setBill("");
    setTipPercentage("");
    setNumberOfPeople("");
    setBillError("");
    setTipError("");
    setPeopleError("");
  }

  const billValue = parseFloat(bill);
  const tipValue = parseFloat(tipPercentage);
  const peopleValue = parseFloat(numberOfPeople);

  let totalLabel = "Total:";
  let tipAmount = "";
  let totalAmount = "";

  const billValid = bill !== "" && !isNaN(billValue) && billValue >= 0;
  const tipValid = tipPercentage !== "" && !isNaN(tipValue) && tipValue >= 0;
  const peopleValid =
    numberOfPeople === "" || (!isNaN(peopleValue) && peopleValue >= 0);

  if (billValid && tipValid && peopleValid) {
    const calculatedTip = billValue * (tipValue / 100);
    let calculatedTotal = billValue + calculatedTip;

    if (peopleValue > 0) {
      calculatedTotal = calculatedTotal / peopleValue;
      totalLabel = "Total per person:";
    }

    tipAmount = calculatedTip.toFixed(2);
    totalAmount = calculatedTotal.toFixed(2);
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
          onChange={handleNumberOfPeopleChange}
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
        Tip amount: £<span className="totalValue">{tipAmount}</span>
      </div>
      <div>
        {totalLabel} £<span className="totalValue">{totalAmount}</span>
      </div>
    </div>
  );
}
