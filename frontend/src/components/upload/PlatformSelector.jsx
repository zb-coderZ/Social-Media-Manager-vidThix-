import { PLATFORMS } from "../../utils/dummyData";
import { getIconByName } from "../../utils/iconMap";
import { useApp } from "../../context/AppContext";

const PLATFORM_STYLES = {
  youtube: {
    activeBorder: "border-red-500 bg-red-500/10 text-red-500 dark:border-red-500/80 dark:bg-red-950/40",
    badgeBg: "bg-red-500 text-white",
    iconColor: "text-red-500",
  },
  linkedin: {
    activeBorder: "border-blue-600 bg-blue-600/10 text-blue-600 dark:border-blue-500/80 dark:bg-blue-950/40",
    badgeBg: "bg-blue-600 text-white",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  instagram: {
    activeBorder: "border-pink-500 bg-pink-500/10 text-pink-500",
    badgeBg: "bg-pink-500 text-white",
    iconColor: "text-pink-500",
  },
  tiktok: {
    activeBorder: "border-slate-800 bg-slate-800/10 dark:border-slate-400 dark:bg-slate-800",
    badgeBg: "bg-slate-900 text-white",
    iconColor: "text-slate-900 dark:text-slate-100",
  },
  facebook: {
    activeBorder: "border-blue-500 bg-blue-500/10 text-blue-500",
    badgeBg: "bg-blue-500 text-white",
    iconColor: "text-blue-500",
  },
};

const PlatformSelector = ({ selected, onChange }) => {
  const { connectedPlatforms } = useApp();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-1.5">
        <label className="block text-sm font-bold text-slate-800 dark:text-slate-200">
          Target Publishing Platform
        </label>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          Select target destination
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3">
        {PLATFORMS.map((platform) => {
          const Icon = getIconByName(platform.icon, "Globe");
          const CheckIcon = getIconByName("Check");
          const isSelected = selected === platform.id;
          const isDisabled = !platform.enabled;
          const style = PLATFORM_STYLES[platform.id] || PLATFORM_STYLES.youtube;
          const isConnected = connectedPlatforms?.[platform.id]?.connected === true;

          return (
            <button
              key={platform.id}
              type="button"
              onClick={() => !isDisabled && onChange(platform.id)}
              disabled={isDisabled}
              className={`relative rounded-2xl border-2 p-4 transition-all duration-200 text-left ${
                isSelected
                  ? `${style.activeBorder} shadow-sm font-semibold scale-[1.01]`
                  : isDisabled
                    ? "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 opacity-40 cursor-not-allowed"
                    : "border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform ${
                    isSelected
                      ? "bg-white/80 dark:bg-slate-800 shadow-sm"
                      : "bg-slate-100 dark:bg-slate-800"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isSelected ? style.iconColor : "text-slate-500 dark:text-slate-400"}`} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">
                      {platform.name}
                    </p>
                    {isConnected && (
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" title="Account Connected" />
                    )}
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                    {isDisabled
                      ? "Coming Soon"
                      : isConnected
                        ? "OAuth Connected"
                        : "Ready to Publish"}
                  </p>
                </div>

                {isSelected && (
                  <div className={`w-5 h-5 ${style.badgeBg} rounded-full flex items-center justify-center shrink-0 shadow-sm`}>
                    <CheckIcon className="w-3.5 h-3.5 text-white" />
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PlatformSelector;
