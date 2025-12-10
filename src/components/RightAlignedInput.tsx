import React, { useCallback, useRef } from "react";

interface InputFieldProps {
  label: string;
  name?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
}

function formatFromCents(cents: string) {
  const n = Number(cents || "0") / 100;

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

export function RightAlignedInput({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
}: InputFieldProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const pushDigit = useCallback(
    (digit: string) => {
      const next = (value || "") + digit;

      onChange(next.replace(/^0+(?=\d{1,})/, (m) => m));
    },

    [value, onChange],
  );

  const popDigit = useCallback(() => {
    const next = (value || "").slice(0, -1);

    onChange(next);
  }, [value, onChange]);

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key >= "0" && e.key <= "9") {
      e.preventDefault();

      pushDigit(e.key);

      return;
    }

    if (e.key === "Backspace") {
      e.preventDefault();
      popDigit();
      return;
    }

    if (
      e.key === "Tab" ||
      e.key === "ArrowLeft" ||
      e.key === "ArrowRight" ||
      e.key === "Home" ||
      e.key === "End"
    ) {
      return;
    }
    e.preventDefault();
  };

  const handlePaste: React.ClipboardEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();

    const text = e.clipboardData.getData("Text") || "";
    const digits = text.replace(/\D/g, "");

    if (!digits) return;

    const next = (value || "") + digits;

    onChange(next.replace(/^0+(?=\d{1,})/, (m) => m));
  };

  const display = value ? formatFromCents(value) : placeholder || "R$ 0,00";

  return (
    <div className="flex flex-col w-full relative">
      <div className="relative">
        <input
          ref={inputRef}
          name={name}
          value={display}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          onFocus={() => {
            requestAnimationFrame(() => {
              inputRef.current?.setSelectionRange(0, 0);
            });
          }}
          readOnly
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder={placeholder}
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
