import { createContext, useCallback, useContext, useState } from "react";
import type { Toast } from "../../types";

export interface ToastContextProps {
  toasts: Toast[];
  showToast: (toast: Partial<Toast>) => void;
}

const ToastContext = createContext<ToastContextProps>({
  toasts: [],
  showToast: () => {},
});

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((toast: Partial<Toast>) => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts((prev) => [...prev, { id, ...toast } as Toast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, toast?.timeout || 3000);
  }, []);

  const closeToast = (id: string) => {
      setToasts((prev) => prev.filter((t) => t.id !== id));

  }

  return (
    <ToastContext.Provider value={{ toasts, showToast }}>
      {children}
      <div className="fixed top-5 right-5  z-50   ">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            onClick={() => {
                if(!toast.onClick) return;
                toast.onClick(toast.id, closeToast.bind(this, toast.id))
            }}
            className={` shadow-md slide-in-left cursor-pointer
              ${
                toast.type === 'success'
                  ? 'bg-green-600'
                  : toast.type === 'error'
                  ? 'bg-red-600'
                  : ' bg-white text-black  dark:bg-gray-950 dark:text-white'
              } ${toast.className || 'rounded px-4 py-2'}`}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
