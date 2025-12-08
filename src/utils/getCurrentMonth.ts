export function getCurrentMonthRange() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");

  return {
    dateFrom: `${year}-${month}-01`,
    dateTo: `${year}-${month}-${new Date(year, now.getMonth() + 1, 0).getDate()}`,
  };
}
