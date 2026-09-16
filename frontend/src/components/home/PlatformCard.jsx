import { getIconByName } from "../../utils/iconMap";

const PlatformCard = ({ platform }) => {
  const { name, icon, enabled, status, description } = platform;
  const Icon = getIconByName(icon, "Globe");

  return (
    <div
      className={`group rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 shadow-card hover:shadow-cardHover transition-shadow duration-200 p-6 ${
        enabled ? "cursor-pointer" : "opacity-60"
      }`}
    >
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div
            className={`rounded-xl p-2.5 shrink-0 transition-transform duration-200 ${
              enabled
                ? "bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400"
                : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 grayscale"
            }`}
          >
            <Icon className="w-6 h-6" />
          </div>

          {/* Status Badge */}
          {status === "active" && (
            <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium border bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900">
              Active
            </span>
          )}
          {status === "coming-soon" && (
            <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium border bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700">
              Coming Soon
            </span>
          )}
        </div>

        {/* Content */}
        <div>
          <h3 className="font-semibold tracking-tight text-slate-900 dark:text-slate-100 mb-2">
            {name}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Button */}
        <button
          disabled={!enabled}
          className={`w-full px-4 py-3 font-semibold rounded-xl transition-all duration-200 ${
            enabled
              ? "bg-gradient-to-r from-brand-600 to-accent-500 text-white font-medium hover:-translate-y-0.5 hover:shadow-md"
              : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed opacity-60"
          }`}
        >
          {enabled ? "Connect Now" : "Coming Soon"}
        </button>
      </div>
    </div>
  );
};

export default PlatformCard;
