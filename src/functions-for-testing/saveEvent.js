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
