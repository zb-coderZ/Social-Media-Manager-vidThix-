import CircularProgress from "./CircularProgress";
import SEOSuggestions from "./SEOSuggestions";
import { getScoreCategory, estimateReach } from "../../utils/seoCalculator";
import { useApp } from "../../context/AppContext";

const SEOScore = ({ score, suggestions, compact = false }) => {
  const { isDarkMode } = useApp();

  if (score === null || score === undefined) {
    return null;
  }

  const category = getScoreCategory(score);
  const reach = estimateReach(score);

  if (compact) {
    return (
      <div className="inline-flex items-center gap-2">
        <div className="relative">
          <svg width={40} height={40} className="transform -rotate-90">
            <circle
              cx={20}
              cy={20}
              r={16}
              stroke={isDarkMode ? "#374151" : "#E5E7EB"}
              strokeWidth={4}
              fill="none"
            />
            <circle
              cx={20}
              cy={20}
              r={16}
              stroke={
                score >= 70 ? "#10B981" : score >= 40 ? "#F59E0B" : "#EF4444"
              }
              strokeWidth={4}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={100.53}
              strokeDashoffset={100.53 - (score / 100) * 100.53}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-900 dark:text-white">
            {score}
          </span>
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">{category}</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">SEO Score</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white/60 dark:bg-navy-800/60 dark:backdrop-blur-xl dark:border dark:border-indigo-600/30 backdrop-blur-xl border border-gray-200/50 rounded-2xl">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Score Display */}
        <div className="flex flex-col items-center justify-center lg:w-1/3">
          <CircularProgress score={score} size={160} strokeWidth={12} isDarkMode={isDarkMode} />
          <div className="mt-4 text-center">
            <p className="text-xl font-bold text-gray-900 dark:text-white mb-1">{category}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{reach}</p>
          </div>
        </div>

        {/* Suggestions */}
        <div className="flex-1">
          <SEOSuggestions suggestions={suggestions} />
        </div>
      </div>
    </div>
  );
};

export default SEOScore;
