import { createContext, useState, useContext, useCallback } from "react";
import { generateId } from "../utils/helpers";
import { TOAST_DURATION, TOAST_TYPES } from "../utils/constants";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  // Add a toast notification
  const addToast = useCallback(
    (message, type = TOAST_TYPES.INFO, duration = TOAST_DURATION.NORMAL) => {
      const id = generateId();
      const toast = {
        id,
        message,
        type,
        duration,
      };

      setToasts((prev) => [...prev, toast]);

      // Auto-remove after duration
      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }

      return id;
    },
    [],
  );

  // Remove a toast by ID
  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  // Success toast
  const success = useCallback(
    (message, duration) => {
      return addToast(message, TOAST_TYPES.SUCCESS, duration);
    },
    [addToast],
  );

  // Error toast
  const error = useCallback(
    (message, duration) => {
      return addToast(message, TOAST_TYPES.ERROR, duration);
    },
    [addToast],
  );

  // Warning toast
  const warning = useCallback(
    (message, duration) => {
      return addToast(message, TOAST_TYPES.WARNING, duration);
    },
    [addToast],
  );

  // Info toast
  const info = useCallback(
    (message, duration) => {
      return addToast(message, TOAST_TYPES.INFO, duration);
    },
    [addToast],
  );

  // Clear all toasts
  const clearAll = useCallback(() => {
    setToasts([]);
  }, []);

  const value = {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    warning,
    info,
    clearAll,
  };

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}

export default ToastContext;
