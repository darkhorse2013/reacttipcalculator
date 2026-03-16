//Total Value Component only file
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
