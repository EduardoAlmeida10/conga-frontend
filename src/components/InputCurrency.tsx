import { NumericFormat, type NumberFormatValues } from "react-number-format";

interface InputFieldProps {
  label: string;
  name?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
}

export function InputCurrency({
  label,
  name,
  value,
  onChange,
  error,
}: InputFieldProps) {
  const handleValueChange = (values: NumberFormatValues) => {
    const numericStringValue =
      values.floatValue !== undefined && values.floatValue !== null
        ? String(values.floatValue)
        : "";

    onChange(numericStringValue);
  };

  return (
    <div className="flex flex-col w-full relative">
      <div className="relative">
        <NumericFormat
          name={name}
          value={value}
          onValueChange={handleValueChange}
          thousandSeparator="."
          decimalSeparator=","
          prefix="R$ "
          decimalScale={2}
          fixedDecimalScale={true}
          allowNegative={false}
          className={`w-full bg-white px-3 pt-5 pb-2 rounded border transition-all
            ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-black"} 
            focus:outline-none focus:ring-2`}
        />
        <label
          htmlFor={name}
          className="absolute left-3 top-1 text-xs text-gray-500 pointer-events-none"
        >
          {label}
        </label>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
