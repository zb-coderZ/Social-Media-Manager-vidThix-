import { PLATFORMS } from "../../utils/dummyData";
import { getIconByName } from "../../utils/iconMap";

const PlatformSelector = ({ selected, onChange }) => {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
        Select Platform
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {PLATFORMS.map((platform) => {
          const Icon = getIconByName(platform.icon, "Globe");
          const CheckIcon = getIconByName("Check");
          const isSelected = selected === platform.id;
          const isDisabled = !platform.enabled;

          return (
            <button
              key={platform.id}
              type="button"
              onClick={() => !isDisabled && onChange(platform.id)}
              disabled={isDisabled}
              className={`relative rounded-xl border p-3 transition-colors duration-150 ${
                isSelected
                  ? "border-brand-500 bg-brand-50 dark:bg-brand-950/40"
                  : isDisabled
                    ? "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 opacity-50 cursor-not-allowed"
                    : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-600"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isSelected
                      ? "bg-brand-50 dark:bg-brand-950/40"
                      : isDisabled
                        ? "bg-slate-100 dark:bg-slate-800"
                        : "bg-slate-100 dark:bg-slate-800"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      isSelected
                        ? "text-brand-600 dark:text-brand-400"
                        : isDisabled
                          ? "text-slate-400"
                          : "text-slate-600 dark:text-slate-400"
                    }`}
                  />
                </div>
                <div className="flex-1 text-left">
                  <p
                    className={`text-sm font-medium text-slate-900 dark:text-slate-100 ${isDisabled ? "opacity-60" : ""}`}
                  >
                    {platform.name}
                  </p>
                  {isDisabled && (
                    <p className="text-xs text-slate-400">Coming Soon</p>
                  )}
                </div>
                {isSelected && (
                  <div className="w-5 h-5 bg-brand-600 rounded-full flex items-center justify-center">
                    <CheckIcon className="w-3 h-3 text-white" />
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
