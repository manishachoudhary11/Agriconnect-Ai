import { createContext, useCallback, useContext, useState } from "react";
import { HiCheckCircle, HiExclamationCircle, HiInformationCircle, HiX } from "react-icons/hi";
import { cn } from "../lib/utils";

const ToastContext = createContext(null);

const VARIANTS = {
  success: {
    icon: HiCheckCircle,
    className: "border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-100",
  },
  error: {
    icon: HiExclamationCircle,
    className: "border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950 dark:text-red-100",
  },
  info: {
    icon: HiInformationCircle,
    className: "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-100",
  },
  warning: {
    icon: HiExclamationCircle,
    className: "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-100",
  },
};

function ToastItem({ toast, onDismiss }) {
  const variant = VARIANTS[toast.type] || VARIANTS.info;
  const Icon = variant.icon;

  return (
    <div
      role="alert"
      className={cn(
        "pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-xl border p-4 shadow-lg animate-slide-up",
        variant.className
      )}
    >
      <Icon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
      <div className="flex-1 text-sm font-medium">{toast.message}</div>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        className="shrink-0 rounded-md p-1 opacity-70 transition hover:opacity-100"
        aria-label="Dismiss notification"
      >
        <HiX className="h-4 w-4" />
      </button>
    </div>
  );
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const toast = useCallback(
    (message, type = "info", duration = 4000) => {
      const id = crypto.randomUUID();
      setToasts((current) => [...current, { id, message, type }]);

      if (duration > 0) {
        window.setTimeout(() => dismiss(id), duration);
      }
    },
    [dismiss]
  );

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed bottom-4 right-4 z-[100] flex flex-col gap-2 sm:bottom-6 sm:right-6"
      >
        {toasts.map((item) => (
          <ToastItem key={item.id} toast={item} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}
