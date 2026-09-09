import { getIconByName } from "../../utils/iconMap";
import { formatNumber, formatCompactNumber } from "../../utils/helpers";

const StatsCard = ({
  icon,
  title,
  value,
  trend,
  trendValue,
  compact = false,
}) => {
  const Icon = getIconByName(icon, "Activity");
  const displayValue = compact
    ? formatCompactNumber(value)
    : formatNumber(value);

  return (
    <div className="p-6 dark:bg-navy-800/60 dark:backdrop-blur-xl dark:border dark:border-indigo-600/30 dark:hover:border-cyan-400/50 dark:hover:shadow-glow-cyan bg-white/60 backdrop-blur-xl border border-gray-200/50 hover:border-indigo-300/50 hover:shadow-md rounded-2xl transition-all duration-200 hover:-translate-y-0.5">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 dark:bg-gradient-to-br dark:from-indigo-600 dark:to-cyan-500 dark:shadow-glow bg-gradient-to-br from-indigo-400 to-cyan-400 shadow-md rounded-xl flex items-center justify-center">
          <Icon className="w-6 h-6 text-white" />
        </div>

        {trend && (
          <span
            className={`px-2 py-1 rounded-lg text-xs font-semibold ${
              trend === "up"
                ? "dark:bg-emerald-500/20 dark:text-emerald-400 dark:border dark:border-emerald-500/30 bg-emerald-50 text-emerald-700 border border-emerald-200"
                : trend === "down"
                  ? "dark:bg-red-500/20 dark:text-red-400 dark:border dark:border-red-500/30 bg-red-50 text-red-700 border border-red-200"
                  : "dark:bg-navy-700/60 dark:text-gray-400 dark:border dark:border-navy-600 bg-gray-200 text-gray-600 border border-gray-300"
            }`}
          >
            {trendValue}
          </span>
        )}
      </div>

      <div>
        <p className="text-3xl font-bold dark:text-white text-gray-900 mb-1">
          {displayValue}
        </p>
        <p className="text-sm dark:text-gray-400 text-gray-600 font-medium">
          {title}
        </p>
      </div>
    </div>
  );
};

export default StatsCard;
