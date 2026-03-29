import * as LucideIcons from "lucide-react";

const SuggestionItem = ({ suggestion }) => {
  const Icon = LucideIcons[suggestion.icon] || LucideIcons.Info;

  const getTypeStyles = (type) => {
    switch (type) {
      case "success":
        return "bg-emerald-50 dark:bg-emerald-600/20 border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-300";
      case "error":
        return "bg-red-50 dark:bg-red-600/20 border-red-200 dark:border-red-500/30 text-red-700 dark:text-red-300";
      case "warning":
        return "bg-amber-50 dark:bg-amber-600/20 border-amber-200 dark:border-amber-500/30 text-amber-700 dark:text-amber-300";
      case "info":
      default:
        return "bg-blue-50 dark:bg-blue-600/20 border-blue-200 dark:border-blue-500/30 text-blue-700 dark:text-blue-300";
    }
  };

  const getIconColor = (type) => {
    switch (type) {
      case "success":
        return "text-emerald-600 dark:text-emerald-400";
      case "error":
        return "text-red-600 dark:text-red-400";
      case "warning":
        return "text-amber-600 dark:text-amber-400";
      case "info":
      default:
        return "text-blue-600 dark:text-blue-400";
    }
  };

  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-xl border ${getTypeStyles(suggestion.type)}`}
    >
      <Icon
        className={`w-5 h-5 flex-shrink-0 ${getIconColor(suggestion.type)}`}
      />
      <p className="text-sm leading-relaxed">{suggestion.message}</p>
    </div>
  );
};

const SEOSuggestions = ({ suggestions }) => {
  if (!suggestions || suggestions.length === 0) {
    return (
      <div className="p-8 text-center">
        <div className="w-16 h-16 bg-gray-100 dark:bg-navy-700/60 rounded-full flex items-center justify-center mx-auto mb-4">
          <LucideIcons.Target className="w-8 h-8 text-gray-400 dark:text-gray-500" />
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Fill in your content to get SEO suggestions
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
        Suggestions ({suggestions.length})
      </h3>
      {suggestions.map((suggestion, index) => (
        <SuggestionItem key={index} suggestion={suggestion} />
      ))}
    </div>
  );
};

export default SEOSuggestions;
