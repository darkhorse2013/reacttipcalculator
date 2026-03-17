//load React libaries
import "./App.css";
import { useState } from "react";
//import utilities file
import { calculateTipAmount, calculateFinalTotal } from "./utils/calculations";

//IMPORT UI LOGIC. SEPERATE FROM CONTROLLER.
import BillInput from "./components/BillInput";
import TipButtons from "./components/TipButtons";
import TipInput from "./components/TipInput";
import PeopleInput from "./components/PeopleInput";
import TotalTipAmount from "./components/TotalTipAmount";
import CurrencySelector from "./components/CurrencySelector";
import TotalValue from "./components/TotalValue";
import OverallTotal from "./components/OverallTotal";

//api calls
import useExchangeRates from "./hooks/useExchangeRates";

//all functions can access anything within app
//everytime state changes, react re-runs app function
export default function App() {
  // data that we want to persistently store in a react state for later use.
  //state - source data controlled by the user or external inputs e.g. when a user types something in an input box
  const [bill, setBill] = useState("");
  const [tipPercentage, setTipPercentage] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState("");
  //const [exchangeRates, setExchangeRates] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState("GBP");

  let totalLabel = "Total:";

  //derived data -  data values recalculated on every render based on state. These values are not persistedly stored in memory.
  let overallTotal;
  let billError;
  let tipError;
  let peopleError;
  let totalTip;
  let total;
  let tipAmount;
  let finalTotal;

  //for conditional div
  let overallTotalDiv;

  //calculate total, get current parsed numeric values from state for calculations
  // never gets reassigned so const.
  const billValue = parseFloat(bill);
  const tipValue = parseFloat(tipPercentage);
  const splitBetween = parseFloat(numberOfPeople);

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

  //exchange rates api call, return data and store in variable
  const exchangeRates = useExchangeRates();

  //event handler for currency select box

  function handleCurrencySelect(event) {
    //event.target.value
    setSelectedCurrency(event.target.value);
  }

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
    tipAmount = calculateTipAmount(billValue, tipValue);
    finalTotal = calculateFinalTotal(billValue, tipAmount, splitBetween);
    //pass tip given back to UI
    totalTip = tipAmount.toFixed(2);
    //pass bill and tip back to UI

    // get exchange rate for USD and convert
    //amount * rate = target currency
    //get bill and total amount and convert to USD
    //apply exchange rate

    if (exchangeRates == null) {
      total = finalTotal.toFixed(2) + " " + "GBP";
      totalTip = tipAmount.toFixed(2) + " " + "GBP";
    } else {
      //apply exchange rate if loaded
      if (exchangeRates.rates[selectedCurrency] == null) {
        //if GBP (undefined)
        total = finalTotal.toFixed(2) + " " + "GBP";
        overallTotal = billValue + tipAmount + " " + selectedCurrency;

        totalTip = tipAmount.toFixed(2) + " " + "GBP";
      } else {
        const rate = exchangeRates.rates[selectedCurrency];

        finalTotal = finalTotal * rate;
        total = finalTotal.toFixed(2) + " " + selectedCurrency;
        tipAmount = tipAmount * rate;
        totalTip = tipAmount.toFixed(2) + " " + selectedCurrency;
        overallTotal =
          (billValue * rate + tipAmount).toFixed(2) + " " + selectedCurrency;
      }
    }
  }

  // Runs during every render of the component.
  // Uses current state to decide what label the UI should display.

  if (parseFloat(numberOfPeople) > 0) {
    totalLabel = "Total per person:";
    //add overall total

    overallTotalDiv = (
      <div>
        Overall total: <span className="totalValue">{overallTotal}</span>
      </div>
    );
  }

  return (
    <div className="container-properties">
      <div id="title">
        <h1>Tip Calculator</h1>
      </div>
      <BillInput
        bill={bill}
        billError={billError}
        onBillChange={handleBillChange}
      />

      <TipInput
        tipPercentage={tipPercentage}
        tipError={tipError}
        onTipChange={handleTipChange}
      />

      <PeopleInput
        numberOfPeople={numberOfPeople}
        peopleError={peopleError}
        onPeopleChange={setNumberOfPeopleEvent}
      />

      <CurrencySelector
        exchangeRates={exchangeRates}
        selectedCurrency={selectedCurrency}
        onCurrencyChange={handleCurrencySelect}
      />

      <TipButtons onReset={resetValues} onPresetTip={setPresetTip} />

      <TotalTipAmount tipAmount={totalTip} />

      <TotalValue totalLabel={totalLabel} total={total} />

      <OverallTotal overallTotal={overallTotalDiv} />
      {/*
      {overallTotalDiv}
      */}
    </div>
  );
}
