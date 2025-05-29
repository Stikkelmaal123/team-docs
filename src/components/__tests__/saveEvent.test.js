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
