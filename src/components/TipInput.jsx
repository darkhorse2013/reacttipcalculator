//Tip Input Component only file. SPLIT UI FROM APP FILE.
//create component (reusable snippet of code)
//pass parameters from JSX into function and generate UI
export default function TipInput({ tipPercentage, tipError, onTipChange }) {
  return (
    <>
      <div>Tip Percentage:*</div>
      <span className="incorrectValue">{tipError}</span>
      <div>
        <input
          id="tipPercentage"
          value={tipPercentage}
          onChange={onTipChange}
        />
      </div>
    </>
  );
}
