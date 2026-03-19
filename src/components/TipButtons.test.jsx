import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TipButtons from "./TipButtons";

it("calls onPresetTip when 10% button is clicked", async () => {
  const user = userEvent.setup();
  const onPresetTip = vi.fn();

  render(<TipButtons onReset={() => {}} onPresetTip={onPresetTip} />);

  await user.click(screen.getByRole("button", { name: /10%/i }));

  expect(onPresetTip).toHaveBeenCalled();
});
