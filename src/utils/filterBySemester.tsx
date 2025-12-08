type Semester = 1 | 2;

export interface SemesterFilter {
  year: number;
  semester: Semester;
}

export function filterBySemester<T extends { month: string }>(
  data: T[],
  filter: SemesterFilter,
): T[] {
  const { year, semester } = filter;

  return data.filter((item) => {
    const [itemYear, itemMonth] = item.month.split("-").map(Number);

    if (itemYear !== year) return false;

    if (semester === 1) {
      return itemMonth >= 1 && itemMonth <= 6;
    }

    return itemMonth >= 7 && itemMonth <= 12;
  });
}
