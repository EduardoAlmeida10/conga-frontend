export function formatPeriod(dateFrom: string, dateTo: string) {
  if (!dateFrom || !dateTo) return "";

  const format = (d: string) => {
    const safeDate = new Date(d.replace(/-/g, "/"));

    return safeDate.toLocaleDateString("pt-BR", {
      month: "short",
      day: "2-digit",
      year: "numeric"
    })
      .replace(".", "")
      .replace(/^\w/, c => c.toUpperCase());
  };

  return `${format(dateFrom)} - ${format(dateTo)}`;
}
