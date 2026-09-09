import { PLATFORMS } from "../../utils/dummyData";
import { getIconByName } from "../../utils/iconMap";

const PlatformSelector = ({ selected, onChange }) => {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-gray-900 dark:text-white">
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
              className={`relative p-4 rounded-xl border-2 transition-all duration-200 ${
                isSelected
                  ? "dark:border-indigo-500/50 dark:bg-indigo-600/10 border-indigo-300 bg-indigo-50"
                  : isDisabled
                    ? "dark:border-navy-700/50 dark:bg-navy-800/30 border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed"
                    : "dark:border-navy-700/50 dark:bg-navy-800/30 dark:hover:border-indigo-500/50 dark:hover:bg-indigo-600/5 border-gray-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/50"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isSelected
                      ? "bg-gradient-to-br from-indigo-600 to-cyan-500"
                      : isDisabled
                        ? "dark:bg-navy-700/60 bg-gray-200"
                        : "dark:bg-navy-700/60 bg-gray-100"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      isSelected
                        ? "text-white"
                        : isDisabled
                          ? "dark:text-gray-600 text-gray-400"
                          : "dark:text-gray-500 text-gray-600"
                    }`}
                  />
                </div>
                <div className="flex-1 text-left">
                  <p
                    className={`font-semibold text-sm ${isDisabled ? "dark:text-gray-600 text-gray-400" : "dark:text-white text-gray-900"}`}
                  >
                    {platform.name}
                  </p>
                  {isDisabled && (
                    <p className="text-xs dark:text-gray-600 text-gray-400">
                      Coming Soon
                    </p>
                  )}
                </div>
                {isSelected && (
                  <div className="w-5 h-5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
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
