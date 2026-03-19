import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BillInput from "./BillInput";

it("calls onBillChange when user types", async () => {
  // simulate real user interactions (typing, clicking, etc.)
  const user = userEvent.setup();

  // create a mock function
  // this lets us track whether the component calls onBillChange
  const onBillChange = vi.fn();

  //render the component
  render(<BillInput bill="" billError="" onBillChange={onBillChange} />);

  // find the input element like a user would
  const input = screen.getByRole("textbox");

  // simulate the user typing 100 into the input
  // await is used because user typing happens asynchronously in tests
  await user.type(input, "100");

  // check that the onBillChange function was called
  // this proves the component responded to typing
  expect(onBillChange).toHaveBeenCalled();
});
