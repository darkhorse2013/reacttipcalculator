//Total Tip Amount Component only file
//create component (reusable snippet of code)
//pass parameters from JSX into function and generate UI

export default function TotalTipAmount({ tipAmount }) {
  return (
    <>
      <div>
        Tip amount: <span className="totalValue">{tipAmount}</span>
      </div>
    </>
  );
}
