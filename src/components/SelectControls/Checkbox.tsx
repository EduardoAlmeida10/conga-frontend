import type { FC } from "react";
import check from "../../assets/iconCheck.svg";

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

const Checkbox: FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  disabled,
}) => {
  return (
    <label
      className={`flex items-center gap-2 cursor-pointer ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        className="hidden"
      />
      <span
        className={`w-5 h-5 flex items-center justify-center rounded border transition-colors ${
          checked ? "bg-blue-500 border-blue-500" : "border-gray-400"
        }`}
      >
        {checked && (
          <span className="text-white font-bold">
            <img src={check} alt="" />
          </span>
        )}
      </span>
      {label && <span>{label}</span>}
    </label>
  );
};

export default Checkbox;
