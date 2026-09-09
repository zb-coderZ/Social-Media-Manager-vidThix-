import { TIMEZONES } from "../../utils/dummyData";
import { Globe } from "lucide-react";

const TimezoneSelector = ({ selected, onChange }) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-900 dark:text-white">
        Timezone
      </label>
      <div className="relative">
        <select
          value={selected}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 pl-12 bg-white dark:bg-navy-800/60 border border-gray-300 dark:border-indigo-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all duration-200 appearance-none text-gray-900 dark:text-white"
        >
          {TIMEZONES.map((tz) => (
            <option key={tz.value} value={tz.value}>
              {tz.label}
            </option>
          ))}
        </select>
        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500 pointer-events-none" />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400 dark:text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default TimezoneSelector;
