# Unit Testing

## Der er blevet udarbejdet 5 unit test med frameworket vitest. 

### Tests

**1. useCalendar.js test** 
- Denne test er kørt på filen useCalendar.js. Hele filen er exporteret som en function der bliver brugt flere steder i kalenderen, og der er derfor mange variabler der skal returne det rigtige data 
### script for test 1
<pre>

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

</pre>

### Konsol output for testen

<pre>
 RERUN  src/components/__tests__/useCalendar.test.js x2 

 ✓ src/components/__tests__/useCalendar.test.js (6 tests) 5ms
   ✓ useCalendar > returns current year and month 1ms
   ✓ useCalendar > nextMonth increments the month 0ms
   ✓ useCalendar > prevMonth decrements the month 0ms
   ✓ useCalendar > nextMonth wraps from December to January and increments year 0ms
   ✓ useCalendar > prevMonth wraps from January to December and decrements year 0ms
   ✓ useCalendar > daysInMonth returns 42 days 1ms

 Test Files  1 passed (1)
      Tests  6 passed (6)
   Start at  09:50:18
   Duration  78ms

</pre>

2. [Test Case 2]