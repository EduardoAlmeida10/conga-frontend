import { months, years } from "@/utils/constants";

interface MonthYearPickerProps {
  value?: string;
  onChange: (value: string) => void;
}

export function MonthYearPicker({ value, onChange }: MonthYearPickerProps) {
  const [year, month] = value?.split("-") ?? ["", ""];

  return (
    <div className="flex gap-2">
      <select
        className="w-24 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm
                   outline-none transition focus:border-black focus:ring-1 focus:ring-black w-30"
        value={month}
        onChange={(e) => onChange(`${year}-${e.target.value}`)}
      >
        <option value="">Mês</option>
        {months.map((m) => (
          <option key={m.value} value={m.value}>
            {m.label}
          </option>
        ))}
      </select>

      <select
        className="w-24 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm
                   outline-none transition focus:border-black focus:ring-1 focus:ring-black"
        value={year}
        onChange={(e) => onChange(`${e.target.value}-${month}`)}
      >
        <option value="">Ano</option>
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
    </div>
  );
}
