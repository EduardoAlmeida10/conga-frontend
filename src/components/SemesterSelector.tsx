type Semester = 1 | 2;

interface SemesterFilter {
  year: number;
  semester: Semester;
}

interface SemesterSelectorProps {
  value: SemesterFilter;
  onChange: (value: SemesterFilter) => void;
}

export function SemesterSelector({ value, onChange }: SemesterSelectorProps) {
  const handleSemesterChange = (valueStr: string) => {
    const semester = Number(valueStr);
    if (semester === 1 || semester === 2) {
      onChange({ ...value, semester });
    }
  };

  return (
    <div className="flex gap-2">
      <select
        className="border px-3 py-2 rounded"
        value={value.year}
        onChange={(e) => onChange({ ...value, year: Number(e.target.value) })}
      >
        {[2024, 2025].map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      <select
        className="border px-3 py-2 rounded"
        value={value.semester}
        onChange={(e) => handleSemesterChange(e.target.value)}
      >
        <option value={1}>1º Semestre</option>
        <option value={2}>2º Semestre</option>
      </select>
    </div>
  );
}
