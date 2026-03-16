//Bill Input Component only file
//create component - have to use PascalCase when naming components PascalCase , upper first and middle letter
//pass parameters from JSX into function and generate UI
export default function BillInput({ bill, billError, onBillChange }) {
  return (
    <>
      <div>Bill amount:*</div>
      <span className="incorrectValue">{billError}</span>
      <div>
        <input id="billAmount" value={bill} onChange={onBillChange} />
      </div>
    </>
  );
}
