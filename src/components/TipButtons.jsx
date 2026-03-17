//Tip Buttons Component only file. SPLIT UI FROM APP FILE.
//create component (reusable snippet of code)
//pass parameters from JSX into function and generate UI
export default function TipButtons({ onReset, onPresetTip }) {
  return (
    <div>
      <button type="button" onClick={onReset}>
        Reset
      </button>
      <button type="button" onClick={onPresetTip}>
        10%
      </button>
      <button type="button" onClick={onPresetTip}>
        15%
      </button>
      <button type="button" onClick={onPresetTip}>
        20%
      </button>
    </div>
  );
}
