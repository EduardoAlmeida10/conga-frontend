import type { FC } from "react";

interface RadioButtonProps {
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  label?: string;
}

const RadioButton: FC<RadioButtonProps> = ({ name, value, checked, onChange, label }) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="hidden"
      />
      <span
        className={`w-5 h-5 flex items-center justify-center rounded-full border transition-colors ${
          checked ? "border-blue-500" : "border-gray-400"
        }`}
      >
        {checked && <span className="w-3 h-3 bg-blue-500 rounded-full" />}
      </span>
      {label && <span>{label}</span>}
    </label>
  );
};

export default RadioButton;
