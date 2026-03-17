import { describe, it, expect } from "vitest";
import { calculateTipAmount, calculateFinalTotal } from "./calculations";

//UNIT TESTS
//formula calculateTipAmount = billValue * (tipValue / 100);
describe("calculateTipAmount", () => {
  it("calculates 10% tip on 100", () => {
    expect(calculateTipAmount(100, 10)).toBe(10);
  });

  it("calculates 20% tip on 50", () => {
    expect(calculateTipAmount(50, 20)).toBe(10);
  });

  it("returns 0 when bill is 0", () => {
    expect(calculateTipAmount(0, 15)).toBe(0);
  });

  it("handles decimal tip correctly", () => {

    expect(calculateTipAmount(99.99, 10)).toBe(9.999);
  })


});

describe("calculateFinalTotal", () => {
  it("returns bill + tip when not splitting", () => {
    expect(calculateFinalTotal(100, 10, 0)).toBe(110);
  });

  it("splits total between people", () => {
    expect(calculateFinalTotal(100, 20, 2)).toBe(60);
  });

  it("handles negative split as no split", () => {
    expect(calculateFinalTotal(100, 20, -1)).toBe(120);
  });
});