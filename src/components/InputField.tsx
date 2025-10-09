interface InputFieldProps {
  label: string;
  type?: string;
  name?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
}

const InputField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  error,
}: InputFieldProps) => {
  return (
    <div className="flex flex-col w-full relative">
      <div className="relative">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
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
};

export default InputField;
