import { useState } from "react";

type LikertScaleProps = {
  questionId: string;
  disabled?: boolean;
  onChange?: (value: number) => void;
  value?: number | null;
};

const labels = ['Concordo totalmente', 'Concordo', 'Nem concordo, nem discordo', 'Discordo', 'Discordo totalmente'];

export function LikertScale({ questionId, onChange, value, disabled = false }: LikertScaleProps) {
  const [internalValue, setInternalValue] = useState<number | null>(null);

  const selectedValue = value !== undefined ? value : internalValue;

  const handleClick = (val: number) => {
    if (value === undefined) {
      setInternalValue(val);
    }
    if (onChange) onChange(val);
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-2xl">
      <div role="group" aria-labelledby={`${questionId}-label`} className="flex flex-wrap items-center justify-center gap-3 w-full px-2">
        <span className="text-[10px] text-gray-400 font-medium">Concordo totalmente</span>
        
        <div className="flex flex-row items-center gap-3 sm:gap-8">
          {labels.map((label, index) => (
            <button
              key={questionId + '-' + index}
              type="button"
              disabled={disabled}
              aria-label={label}
              aria-pressed={selectedValue === index}
              title={label}
              onClick={() => handleClick(index)}
              className={`w-10 h-10 shrink-0 rounded-full border-2 transition-colors duration-200 cursor-pointer ${
                selectedValue === index
                  ? "bg-proveup-orange border-proveup-orange shadow-[0_0_15px_rgba(238,122,47,0.4)]"
                  : "border-gray-700 hover:border-gray-500 bg-transparent"
              }`}
            />
          ))}
        </div>

        <span className="text-[10px] text-gray-400 font-medium">Discordo totalmente</span>
      </div>
    </div>
  );
}
