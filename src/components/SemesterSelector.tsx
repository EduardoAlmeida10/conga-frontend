type Semester = 1 | 2;

export interface SemesterFilter {
  year: number;
  semester: Semester;
}

interface SemesterSelectorProps {
  value: SemesterFilter;
  onChange: (value: SemesterFilter) => void;
}

export function SemesterSelector({
  value,
  onChange,
}: SemesterSelectorProps) {
  // Lista dinâmica de anos (2024 até 2029)
  const years = Array.from(
    { length: 2029 - 2024 + 1 },
    (_, i) => 2024 + i
  );

  const handleYearChange = (year: number) => {
    onChange({ ...value, year });
  };

  const handleSemesterChange = (valueStr: string) => {
    onChange({
      ...value,
      semester: Number(valueStr) as Semester,
    });
  };

  return (
    <div className="flex gap-2">
      {/* Seletor de Ano */}
      <select
        className="border px-3 py-2 rounded bg-white shadow-sm focus:ring-2 focus:ring-black outline-none"
        value={value.year}
        onChange={(e) =>
          handleYearChange(Number(e.target.value))
        }
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      {/* Seletor de Semestre */}
      <select
        className="border px-3 py-2 rounded bg-white shadow-sm focus:ring-2 focus:ring-black outline-none"
        value={value.semester}
        onChange={(e) =>
          handleSemesterChange(e.target.value)
        }
      >
        <option value={1}>1º Semestre (Jan - Jun)</option>
        <option value={2}>2º Semestre (Jul - Dez)</option>
      </select>
    </div>
  );
}
