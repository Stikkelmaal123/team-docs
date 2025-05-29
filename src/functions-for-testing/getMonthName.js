export function getMonthName(year, month) {
  const date = new Date(year, month);
  const name = date.toLocaleString("default", { month: "long" });
  return name.charAt(0).toUpperCase() + name.slice(1);
}
