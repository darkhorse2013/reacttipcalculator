//People Input Component only file. SPLIT UI FROM APP FILE.
//create component (reusable snippet of code)
//pass parameters from JSX into function and generate UI
export default function PeopleInput({
  numberOfPeople,
  peopleError,
  onPeopleChange,
}) {
  return (
    <>
      <div>Total number of People to split bill between:</div>
      <span className="incorrectValue">{peopleError}</span>
      <div>
        <input
          id="numberOfPeople"
          value={numberOfPeople}
          onChange={onPeopleChange}
        />
      </div>
    </>
  );
}
