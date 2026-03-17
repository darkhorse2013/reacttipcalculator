//Total Value Component only file. SPLIT UI FROM APP FILE.
//create component (reusable snippet of code)
//pass parameters from JSX into function and generate UI
export default function TotalValue({ totalLabel, total }) {
  return (
    <>
      <div>
        {totalLabel} <span className="totalValue">{total}</span>
      </div>
    </>
  );
}
