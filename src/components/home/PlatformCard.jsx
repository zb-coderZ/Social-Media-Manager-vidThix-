import * as LucideIcons from "lucide-react";

const PlatformCard = ({ platform }) => {
  const { name, icon, color, enabled, status, description } = platform;
  const Icon = LucideIcons[icon] || LucideIcons.Globe;

  return (
    <div
      className={`group p-6 backdrop-blur-xl rounded-2xl transition-all duration-200 ${
        enabled
          ? "dark:bg-navy-800/45 dark:border dark:border-indigo-600/30 dark:hover:border-cyan-400/50 dark:hover:shadow-glow-cyan dark:hover:-translate-y-1 bg-white/45 border border-gray-200/50 hover:border-indigo-300/50 hover:shadow-md hover:-translate-y-1 cursor-pointer"
          : "dark:bg-navy-800/30 dark:border dark:border-navy-700/30 dark:opacity-60 bg-gray-100/60 border border-gray-200 opacity-60"
      }`}
    >
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-200 ${
              enabled
                ? "dark:bg-gradient-to-br dark:from-indigo-600 dark:to-cyan-500 dark:group-hover:scale-110 dark:shadow-glow bg-gradient-to-br from-indigo-400 to-cyan-400 group-hover:scale-110 shadow-md"
                : "dark:bg-navy-700 bg-gray-300"
            }`}
          >
            <Icon
              className={`w-6 h-6 ${enabled ? "text-white" : "dark:text-gray-600 text-gray-400"}`}
            />
          </div>

          {/* Status Badge */}
          {status === "active" && (
            <span className="px-3 py-1 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border dark:border-emerald-500/30 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200">
              Active
            </span>
          )}
          {status === "coming-soon" && (
            <span className="px-3 py-1 dark:bg-navy-700/60 dark:text-gray-400 dark:border dark:border-navy-600 bg-gray-200 text-gray-600 text-xs font-semibold rounded-full border border-gray-300">
              Coming Soon
            </span>
          )}
        </div>

        {/* Content */}
        <div>
          <h3 className="text-xl font-bold dark:text-white text-gray-900 mb-2">
            {name}
          </h3>
          <p className="text-sm dark:text-gray-400 text-gray-600">
            {description}
          </p>
        </div>

        {/* Button */}
        <button
          disabled={!enabled}
          className={`w-full px-4 py-3 font-semibold rounded-xl transition-all duration-200 ${
            enabled
              ? "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white hover:shadow-glow-orange"
              : "dark:bg-navy-700 dark:text-gray-600 dark:cursor-not-allowed bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {enabled ? "Connect Now" : "Coming Soon"}
        </button>
      </div>
    </div>
  );
};

export default PlatformCard;
