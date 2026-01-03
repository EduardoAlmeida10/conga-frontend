// getCurrentSemester.ts
import type { SemesterFilter } from "./filterBySemester";

export function getCurrentSemester(): SemesterFilter {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  return {
    year,
    semester: month < 6 ? 1 : 2,
  };
}
