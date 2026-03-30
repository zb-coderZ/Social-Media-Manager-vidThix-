import { useEffect } from "react";
import { X, CheckCircle, XCircle, AlertCircle, Info } from "lucide-react";
import { useToast } from "../../context/ToastContext";

const Toast = ({ id, message, type, duration }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        removeToast(id);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [id, duration, removeToast]);

  const getToastStyles = () => {
    switch (type) {
      case "success":
        return {
          bg: "bg-emerald-50 dark:bg-emerald-600/20 border-emerald-200 dark:border-emerald-500/30",
          icon: CheckCircle,
          iconColor: "text-emerald-500 dark:text-emerald-400",
          text: "text-emerald-900 dark:text-emerald-300",
        };
      case "error":
        return {
          bg: "bg-red-50 dark:bg-red-600/20 border-red-200 dark:border-red-500/30",
          icon: XCircle,
          iconColor: "text-red-500 dark:text-red-400",
          text: "text-red-900 dark:text-red-300",
        };
      case "warning":
        return {
          bg: "bg-amber-50 dark:bg-amber-600/20 border-amber-200 dark:border-amber-500/30",
          icon: AlertCircle,
          iconColor: "text-amber-500 dark:text-amber-400",
          text: "text-amber-900 dark:text-amber-300",
        };
      case "info":
      default:
        return {
          bg: "bg-blue-50 dark:bg-blue-600/20 border-blue-200 dark:border-blue-500/30",
          icon: Info,
          iconColor: "text-blue-500 dark:text-blue-400",
          text: "text-blue-900 dark:text-blue-300",
        };
    }
  };

  const styles = getToastStyles();
  const Icon = styles.icon;

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${styles.bg} shadow-lg backdrop-blur-xl transition-all duration-200 hover:shadow-xl w-full sm:min-w-[320px] max-w-[calc(100vw-2rem)] sm:max-w-md`}
    >
      <Icon className={`w-5 h-5 flex-shrink-0 ${styles.iconColor}`} />
      <p className={`flex-1 text-sm font-medium ${styles.text}`}>{message}</p>
      <button
        onClick={() => removeToast(id)}
        className={`flex-shrink-0 p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-200 ${styles.iconColor}`}
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export function ToastContainer() {
  const { toasts } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 left-4 sm:left-auto z-50 flex flex-col gap-3 pointer-events-none">
      <div className="flex flex-col gap-3 pointer-events-auto">
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} />
        ))}
      </div>
    </div>
  );
}

export default Toast;
