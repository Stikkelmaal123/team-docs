import { describe, it, expect } from "vitest";
import { getMonthName } from "@/functions-for-testing/getMonthName.js";

describe("getMonthName", () => {
  it("returns the correct month name with capital first letter", () => {
    expect(getMonthName(2024, 0)).toBe("Januar");
    expect(getMonthName(2024, 5)).toBe("Juni");
  });
});
