//Currency Selecto Component only file
//create component - have to use PascalCase when naming components PascalCase , upper first and middle letter
//pass parameters from JSX into function and generate UI
export default function CurrencySelector({
  exchangeRates,
  selectedCurrency,
  onCurrencyChange,
}) {
  if (exchangeRates === null) {
    return (
      <div>
        <b>Fetching exchange rates</b>
      </div>
    );
  }

  const currencyCode = exchangeRates.rates;

  return (
    <select
      name="exchangeRates"
      id="currency"
      onChange={onCurrencyChange}
      value={selectedCurrency}
    >
      <option value={exchangeRates.base}>{exchangeRates.base}</option>
      {Object.keys(currencyCode).map((currencyCode) => (
        <option key={currencyCode} value={currencyCode}>
          {currencyCode}
        </option>
      ))}
    </select>
  );
}
