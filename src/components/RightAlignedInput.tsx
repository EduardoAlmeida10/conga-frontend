import React, { useCallback, useEffect, useRef, useState } from "react";

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
  value,
  onChange,
  error,
  placeholder,
}: InputFieldProps) {
  const hiddenInputRef = useRef<HTMLInputElement | null>(null);
  const [isFocused, setIsFocused] = useState(false);

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

  // Efeito para manter o cursor piscando no final
  useEffect(() => {
    if (isFocused && hiddenInputRef.current) {
      hiddenInputRef.current.focus();
      // Coloca o cursor no final
      setTimeout(() => {
        if (hiddenInputRef.current) {
          const length = hiddenInputRef.current.value.length;
          hiddenInputRef.current.setSelectionRange(length, length);
        }
      }, 0);
    }
  }, [isFocused, value]);

  return (
    <div className="flex flex-col w-full relative">
      <div className="relative">
        {/* Container que simula o input */}
        <div
          className={`relative w-full bg-white px-3 pt-5 pb-2 rounded border transition-all
            ${error ? "border-red-500" : "border-gray-300"}
            ${isFocused ? "ring-2 ring-black" : ""}
            cursor-text min-h-[3.5rem]`}
          onClick={() => {
            hiddenInputRef.current?.focus();
            setIsFocused(true);
          }}
        >
          {/* Texto formatado */}
          <div className="text-left w-full select-none">
            {display}
            {/* Cursor piscante */}
            {isFocused && (
              <span className="inline-block w-[1px] h-5 bg-black ml-[1px] animate-pulse align-middle"></span>
            )}
          </div>

          {/* Label */}
          <label className="absolute left-3 top-1 text-xs text-gray-500 pointer-events-none">
            {label}
          </label>

          {/* Input invisível para capturar teclas */}
          <input
            ref={hiddenInputRef}
            type="text"
            inputMode="numeric"
            className="absolute inset-0 w-full h-full opacity-0 cursor-text"
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            value="" // Sempre vazio, só para capturar entrada
            readOnly={false}
            autoComplete="off"
            style={{
              caretColor: "black",
              fontSize: "16px", // Previne zoom no iOS
            }}
          />
        </div>
      </div>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
