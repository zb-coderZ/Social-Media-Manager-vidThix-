import { Loader2 } from "lucide-react";

const LoadingSpinner = ({ size = "md", className = "", text = "" }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12",
  };

  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 p-2 animate-pulse dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 ${className}`}
    >
      <Loader2
        className={`${sizeClasses[size]} animate-spin text-brand-600 dark:text-brand-400`}
      />
      {text && (
        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
