export type Step = {
  id: string;
  number: string;
  title: string;
  description: string;
};

type StepIndicatorProps = {
  steps: Step[];
  currentStepIndex: number;
};

export function StepIndicator({ steps, currentStepIndex }: StepIndicatorProps) {
  return (
    <div className="flex flex-row gap-4 w-full justify-center">
      {steps.map((step, index) => {
        const isActive = index === currentStepIndex;
        return (
          <div
            key={step.id}
            className={`flex flex-col p-4 rounded-2xl w-60 border-2 transition-all duration-300 ${
              isActive
                ? "border-proveup-orange bg-[#262626]"
                : "border-transparent bg-[#1E1E1E] opacity-50"
            }`}
          >
            <span className={`text-[10px] font-bold mb-1 ${isActive ? "text-proveup-orange" : "text-gray-500"}`}>
              {step.number}
            </span>
            <h3 className="text-sm font-bold text-white mb-1">{step.title}</h3>
            <p className="text-[10px] text-gray-400 leading-tight">
              {step.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}
