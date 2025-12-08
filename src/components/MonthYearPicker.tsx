import { months, years } from "@/utils/constants";

interface MonthYearPickerProps {
  value?: string;
  onChange: (value: string) => void;
}

export function MonthYearPicker({ value, onChange }: MonthYearPickerProps) {
  const [year, month] = value?.split("-") ?? ["", ""];

  return (
    <div className="flex gap-3">
      <select
        className="
          w-32 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm 
          shadow-sm transition-all cursor-pointer
          hover:bg-gray-50 
          focus:border-black focus:ring-2 focus:ring-black/30
        "
        value={month}
        onChange={(e) => onChange(`${year}-${e.target.value}`)}
      >
        <option className="bg-white text-gray-500" value="">
          Mês
        </option>
        {months.map((m) => (
          <option
            key={m.value}
            value={m.value}
            className="py-2 text-gray-700 hover:bg-gray-200"
          >
            {m.label}
          </option>
        ))}
      </select>
      <select
        className="
          w-28 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm 
          shadow-sm transition-all cursor-pointer
          hover:bg-gray-50
          focus:border-black focus:ring-2 focus:ring-black/30
        "
        value={year}
        onChange={(e) => onChange(`${e.target.value}-${month}`)}
      >
        <option className="bg-white text-gray-500" value="">
          Ano
        </option>
        {years.map((y) => (
          <option
            key={y}
            value={y}
            className="py-2 text-gray-700 hover:bg-gray-200"
          >
            {y}
          </option>
        ))}
      </select>
    </div>
  );
}
