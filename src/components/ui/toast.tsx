import { useToastStore } from "../../store/useToastStore";

export function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {toasts.map((toast) => {
        const typeClasses = {
          success: "bg-green-600 border-green-500",
          error: "bg-red-600 border-red-500",
          info: "bg-gray-800 border-proveup-orange",
        };

        return (
          <div 
            key={toast.id}
            className={`min-w-[250px] p-4 flex justify-between items-center text-white border-l-4 rounded-r-lg shadow-xl animate-in slide-in-from-right-10 fade-in duration-300 ${typeClasses[toast.type]}`}
          >
            <span className="text-sm font-medium">{toast.message}</span>
            <button 
                onClick={() => removeToast(toast.id)} 
                className="ml-4 text-white/70 hover:text-white"
            >
                ✕
            </button>
          </div>
        );
      })}
    </div>
  );
}
