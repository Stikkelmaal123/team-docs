# Unit Testing

## Der er blevet udarbejdet 5 unit test med frameworket vitest. 

#### Tests
De første 4 test er blevet lavet på funktioner som er trukket ud af deres komponenter, og lagt i mappe der hedder "functions-for-testing".
Der er blevet lavet mockdata, samt omskrevet props til variabler så funktionerne udelukkende har kunne få testet deres logik.
Sidste test er i virkeligheden flere test der kører på en fil, men det gav mening at køre test på den, da den rent faktisk var en fil for sig selv i produktion. Alle filer og test filer kan til gå på developerbranchen [her.](https://github.com/Stikkelmaal123/team-docs/developer)

##### filterEvents.js test
###### function script filterEvents
<pre>
export function filteredEvents(events, selectedFilter, selectedValue) {
  if (!selectedFilter || !selectedValue) return events;
  return events.filter((event) => {
    const value = event[selectedFilter];
    if (!value || typeof value !== "string") return false;
    return value.toLowerCase().includes(selectedValue.toLowerCase());
  });
}
</pre>

###### test script filterEvents
<pre>
import { describe, it, expect } from "vitest";
import { filteredEvents } from "@/functions-for-testing/filterEvents.js";

describe("filteredEvents", () => {
  const events = [
    { company: "Acme", user: "Alice" },
    { company: "Beta", user: "Bob" },
    { company: "Acme", user: "Charlie" },
  ];

  it("returns all events if no filter is set", () => {
    expect(filteredEvents(events, "", "")).toEqual(events);
  });

  it("filters by company", () => {
    expect(filteredEvents(events, "company", "acme")).toHaveLength(2);
  });

  it("filters by user", () => {
    expect(filteredEvents(events, "user", "bob")).toEqual([{ company: "Beta", user: "Bob" }]);
  });

  it("is case insensitive", () => {
    expect(filteredEvents(events, "user", "ALICE")).toEqual([{ company: "Acme", user: "Alice" }]);
  });

  it("returns empty if no match", () => {
    expect(filteredEvents(events, "company", "gamma")).toEqual([]);
  });
});
</pre>

##### getMonthName.js test
###### function script getMonthName
<pre>
export function getMonthName(year, month) {
  const date = new Date(year, month);
  const name = date.toLocaleString("default", { month: "long" });
  return name.charAt(0).toUpperCase() + name.slice(1);
}
</pre>

###### test script getMonthName
<pre>
import { describe, it, expect } from "vitest";
import { getMonthName } from "@/functions-for-testing/getMonthName.js";

describe("getMonthName", () => {
  it("returns the correct month name with capital first letter", () => {
    expect(getMonthName(2024, 0)).toBe("Januar");
    expect(getMonthName(2024, 5)).toBe("Juni");
  });
});
</pre>

##### fetchOptions.js test
###### function script fetchOptions
<pre>
export async function fetchOptionsFromFirestore(getDoc, doc, db, options, isLoadingOptions, errorMessage) {
  try {
    isLoadingOptions.value = true;
    const collections = ["schedules", "companies", "locations", "users", "objects"];
    const fetchPromises = collections.map((collectionName) =>
      getDoc(doc(db, "data", collectionName)).then((snapshot) => {
        if (snapshot.exists()) {
          options[collectionName] = Object.values(snapshot.data() || {});
        }
      }),
    );
    await Promise.all(fetchPromises);
  } catch (error) {
    errorMessage.value = `Kunne ikke hente data: ${error.message}`;
  } finally {
    isLoadingOptions.value = false;
  }
}

</pre>

###### test script fetchOptions
<pre>
import { fetchOptionsFromFirestore } from "@/functions-for-testing/fetchOptions.js";
import { describe, it, expect, vi } from "vitest";

describe("fetchOptionsFromFirestore", () => {
  it("fetches and sets options for all collections", async () => {
    const mockSnapshot = (data) => ({
      exists: () => true,
      data: () => data,
    });

    const getDoc = vi.fn((docRef) => {
      const name = docRef.collectionName;
      return Promise.resolve(mockSnapshot({ a: name + "1", b: name + "2" }));
    });

    const doc = (db, path, collectionName) => ({
      db,
      path,
      collectionName,
    });

    const db = {};
    const options = { schedules: [], companies: [], locations: [], users: [], objects: [] };
    const isLoadingOptions = { value: false };
    const errorMessage = { value: "" };

    await fetchOptionsFromFirestore(getDoc, doc, db, options, isLoadingOptions, errorMessage);

    expect(options.schedules).toEqual(["schedules1", "schedules2"]);
    expect(options.companies).toEqual(["companies1", "companies2"]);
    expect(options.locations).toEqual(["locations1", "locations2"]);
    expect(options.users).toEqual(["users1", "users2"]);
    expect(options.objects).toEqual(["objects1", "objects2"]);
    expect(isLoadingOptions.value).toBe(false);
    expect(errorMessage.value).toBe("");
  });
});
</pre>

##### saveEvent.js test
###### function script saveEvent
<pre>
export async function saveEvent({ formData, db, addDoc, collection, handleSaveSuccess }) {
  const eventData = {
    startDate: formData.startDate,
    schedule: formData.schedule,
    company: formData.company,
    location: formData.location,
    user: formData.user,
    object: formData.object,
  };
  handleSaveSuccess();
  await addDoc(collection(db, "events"), eventData);
}

</pre>

###### test script saveEvent
<pre>
import { describe, it, expect, vi } from "vitest";
import { saveEvent } from "@/functions-for-testing/saveEvent.js";

describe("saveEvent", () => {
  it("calls addDoc with correct data and calls handleSaveSuccess", async () => {
    const addDoc = vi.fn(() => Promise.resolve());
    const collection = vi.fn();
    const db = {};
    const handleSaveSuccess = vi.fn();

    const formData = {
      startDate: "2024-05-29",
      schedule: "A",
      company: "B",
      location: "C",
      user: "D",
      object: "E",
    };

    await saveEvent({ formData, db, addDoc, collection, handleSaveSuccess });

    expect(addDoc).toHaveBeenCalledWith(
      collection(db, "events"),
      {
        startDate: "2024-05-29",
        schedule: "A",
        company: "B",
        location: "C",
        user: "D",
        object: "E",
      },
    );
    expect(handleSaveSuccess).toHaveBeenCalled();
  });
});
</pre>


##### useCalendar.js test
Denne test er kørt på filen useCalendar.js. Hele filen er exporteret som en function der bliver brugt flere steder i kalenderen, og der er derfor mange variabler der skal returne det rigtige data 
###### script for test
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
