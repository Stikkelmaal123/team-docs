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
