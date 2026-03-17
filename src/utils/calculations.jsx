import { useState, useEffect } from "react";
//Use exchange rates api call
export default function useExchangeRates() {
  //Make an api call and then persistently store in state.
  //React re-renders components when state or props change.
  //If stored in a local varaible, a re-render will not be triggered.
  //can't access app() states since that is localised, so must be declared here.
  //ui components can access app() state via props
  const [exchangeRates, setExchangeRates] = useState(null);

  useEffect(() => {
    fetch("https://api.frankfurter.dev/v1/latest?from=GBP")
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        setExchangeRates(data);
      });
  }, []);

  //run hook. Once I have the data, return it for later use.
  return exchangeRates;
}
