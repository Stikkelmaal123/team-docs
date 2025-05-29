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
