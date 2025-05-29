import { describe, it, expect } from "vitest";
import { useCalendar } from "@/composables/useCalendar.js";

describe("useCalendar", () => {
  it("returns current year and month", () => {
    const { currentYear, currentMonth } = useCalendar();
    const now = new Date();
    expect(currentYear.value).toBe(now.getFullYear());
    expect(currentMonth.value).toBe(now.getMonth());
  });

  it("nextMonth increments the month", () => {
    const { currentMonth, nextMonth } = useCalendar();
    currentMonth.value = 5;
    nextMonth();
    expect(currentMonth.value).toBe(6);
  });

  it("prevMonth decrements the month", () => {
    const { currentMonth, prevMonth } = useCalendar();
    currentMonth.value = 5;
    prevMonth();
    expect(currentMonth.value).toBe(4);
  });

  it("nextMonth wraps from December to January and increments year", () => {
    const { currentMonth, currentYear, nextMonth } = useCalendar();
    currentMonth.value = 11;
    currentYear.value = 2024;
    nextMonth();
    expect(currentMonth.value).toBe(0);
    expect(currentYear.value).toBe(2025);
  });

  it("prevMonth wraps from January to December and decrements year", () => {
    const { currentMonth, currentYear, prevMonth } = useCalendar();
    currentMonth.value = 0;
    currentYear.value = 2024;
    prevMonth();
    expect(currentMonth.value).toBe(11);
    expect(currentYear.value).toBe(2023);
  });

  it("daysInMonth returns 42 days", () => {
    const { daysInMonth } = useCalendar();
    expect(daysInMonth.value.length).toBe(42);
  });
});
