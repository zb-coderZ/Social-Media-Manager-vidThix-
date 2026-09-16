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
    <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 shadow-card hover:shadow-cardHover transition-shadow duration-200 p-4 sm:p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 rounded-xl p-2.5 shrink-0">
          <Icon className="w-6 h-6" />
        </div>

        {trend && (
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium border ${
              trend === "up"
                ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900"
                : trend === "down"
                  ? "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-900"
                  : "bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700"
            }`}
          >
            {trendValue}
          </span>
        )}
      </div>

      <div className="min-w-0">
        <p className="text-2xl sm:text-3xl font-semibold tabular-nums text-slate-900 dark:text-slate-100 tracking-tight mb-1">
          {displayValue}
        </p>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          {title}
        </p>
      </div>
    </div>
  );
};

export default StatsCard;
