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
      className={`flex flex-col items-center justify-center gap-3 ${className}`}
    >
      <Loader2
        className={`${sizeClasses[size]} animate-spin text-indigo-600 dark:text-indigo-400`}
      />
      {text && <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
