import { useState } from "react";

type LikertScaleProps = {
  questionId: string;
  onChange?: (value: number) => void;
};

const sizes = [
  "w-12 h-12", // 0: Concordo
  "w-10 h-10", // 1
  "w-8 h-8",   // 2
  "w-6 h-6",   // 3: Neutro
  "w-8 h-8",   // 4
  "w-10 h-10", // 5
  "w-12 h-12", // 6: Discordo
];

export function LikertScale({ questionId, onChange }: LikertScaleProps) {
  const [selectedValue, setSelectedValue] = useState<number | null>(null);

  const handleClick = (val: number) => {
    setSelectedValue(val);
    if (onChange) onChange(val);
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-2xl">
      <div className="flex flex-row items-center justify-between w-full px-4">
        <span className="text-[10px] text-gray-400 font-medium">Concordo</span>
        
        <div className="flex flex-row items-center gap-4 lg:gap-6">
          {sizes.map((sizeClass, index) => (
            <button
              key={`${questionId}-${index}`}
              onClick={() => handleClick(index)}
              className={`rounded-full border-2 transition-all duration-200 cursor-pointer ${sizeClass} ${
                selectedValue === index
                  ? "bg-proveup-orange border-proveup-orange shadow-[0_0_15px_rgba(238,122,47,0.4)]"
                  : "border-gray-700 hover:border-gray-500 bg-transparent"
              }`}
            />
          ))}
        </div>

        <span className="text-[10px] text-gray-400 font-medium">Discordo</span>
      </div>
    </div>
  );
}
