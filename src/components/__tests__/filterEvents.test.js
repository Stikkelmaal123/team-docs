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
