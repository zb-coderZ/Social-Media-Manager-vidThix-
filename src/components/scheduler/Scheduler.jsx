import { useState } from "react";
import { X, Calendar as CalendarIcon } from "lucide-react";
import DateTimePicker from "./DateTimePicker";
import TimezoneSelector from "./TimezoneSelector";
import { formatDate } from "../../utils/helpers";

const Scheduler = ({
  isOpen,
  onClose,
  onSchedule,
  defaultDate = new Date(),
}) => {
  const [selectedDate, setSelectedDate] = useState(defaultDate);
  const [timezone, setTimezone] = useState("UTC");

  const handleSchedule = () => {
    onSchedule({
      scheduledTime: selectedDate.toISOString(),
      timezone,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-white dark:bg-navy-800/60 dark:backdrop-blur-xl dark:border dark:border-indigo-600/30 rounded-2xl shadow-2xl transform transition-all">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-indigo-600/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-600/20 dark:border dark:border-indigo-500/30 rounded-xl flex items-center justify-center">
              <CalendarIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Schedule Post</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Choose when to publish your content
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-navy-700/60 rounded-lg transition-colors duration-200"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <DateTimePicker
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
          />

          <TimezoneSelector selected={timezone} onChange={setTimezone} />

          {/* Preview */}
          <div className="p-4 bg-indigo-50 dark:bg-indigo-600/10 dark:border dark:border-indigo-500/30 border border-indigo-200 rounded-xl">
            <p className="text-sm font-semibold text-indigo-900 dark:text-indigo-300 mb-1">
              Your content will be published on:
            </p>
            <p className="text-indigo-700 dark:text-indigo-400">
              {formatDate(selectedDate, "MMMM dd, yyyy")} at{" "}
              {formatDate(selectedDate, "h:mm a")}
            </p>
            <p className="text-xs text-indigo-600 dark:text-indigo-500 mt-1">{timezone}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 p-6 border-t border-gray-200 dark:border-indigo-600/30">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-gray-100 dark:bg-navy-700/60 hover:bg-gray-200 dark:hover:bg-navy-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSchedule}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/30"
          >
            Confirm Schedule
          </button>
        </div>
      </div>
    </div>
  );
};

export default Scheduler;
