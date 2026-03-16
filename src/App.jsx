//load React libaries
import { useState, useEffect } from "react";
import "./App.css";
import BillInput from "./components/BillInput";
import TipButtons from "./components/TipButtons";
import TipInput from "./components/TipInput";
import PeopleInput from "./components/PeopleInput";
import TotalTipAmount from "./components/TotalTipAmount";
import CurrencySelector from "./components/CurrencySelector";

//create component (reusable snippet of code)
//pass parameters from JSX into function and generate UI
function TotalValue({ totalLabel, total }) {
  return (
    <>
      <div>
        {totalLabel} <span className="totalValue">{total}</span>
      </div>
    </>
  );
}

//create component (reusable snippet of code)
//pass parameters from JSX into function and generate UI
function OverallTotal({ overallTotal }) {
  return <>{overallTotal}</>;
}

//all functions can access anything within app
//everytime state changes, react re-runs app function
export default function App() {
  // data that we want to persistently store in a react state for later use.
  //state - source data controlled by the user or external inputs e.g. when a user types something in an input box
  const [bill, setBill] = useState("");
  const [tipPercentage, setTipPercentage] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState("");
  const [exchangeRates, setRates] = useState(null);
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

  //make an api call and then persistently store in state.
  useEffect(() => {
    fetch("https://api.frankfurter.dev/v1/latest?from=GBP")
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        setRates(data);
      });
  }, []);

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

  //calculate total
  let billValue = parseFloat(bill);
  let tipValue = parseFloat(tipPercentage);
  let splitBetween = parseFloat(numberOfPeople);

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
    //add overall total

    overallTotalDiv = (
      <div>
        Overall total: <span className="totalValue">{overallTotal}</span>
      </div>
    );
  }

  //all currency selector - old code , replaced with a component, leaving for comparison
  //if JSON object hasn't arrived yet
  //if (exchangeRates === null) {
  //allCurrenciesSelector = (
  // <div>
  //  <b>Fetching exchange rates</b>
  // </div>
  //  );
  //} else {
  // let currencyCode = exchangeRates.rates;

  //we have our list of currencies, now lets add them into a dropdown box

  // allCurrenciesSelector = (
  // <select
  //  name="exchangeRates"
  // id="currency"
  // onChange={handleCurrencySelect}
  // value={selectedCurrency}
  //>
  // {/* add base rate to list too */}
  // <option value={exchangeRates.base}>{exchangeRates.base}</option>
  // {/* add all other currencies to list too */}
  // {Object.keys(currencyCode).map((currencyCode) => (
  // <option key={currencyCode} value={currencyCode}>
  //   {currencyCode}
  // </option>
  // ))}
  // </select>
  // );
  // }

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
