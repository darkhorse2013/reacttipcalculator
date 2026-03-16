import { useState, useEffect } from "react";
//Use exchange rates api call
export default function useExchangeRates() {
  //make an api call and then persistently store in state.
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
