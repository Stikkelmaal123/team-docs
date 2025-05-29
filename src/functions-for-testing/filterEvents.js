export function filteredEvents(events, selectedFilter, selectedValue) {
  if (!selectedFilter || !selectedValue) return events;
  return events.filter((event) => {
    const value = event[selectedFilter];
    if (!value || typeof value !== "string") return false;
    return value.toLowerCase().includes(selectedValue.toLowerCase());
  });
}
