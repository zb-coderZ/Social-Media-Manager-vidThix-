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
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl shadow-card transform transition-all">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200/60 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-900 rounded-xl flex items-center justify-center">
              <CalendarIcon className="w-5 h-5 text-brand-600 dark:text-brand-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Schedule Post</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Choose when to publish your content
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors duration-200"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-slate-500 dark:text-slate-400" />
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
          <div className="p-4 bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-900 rounded-xl">
            <p className="text-sm font-semibold text-brand-900 dark:text-brand-300 mb-1">
              Your content will be published on:
            </p>
            <p className="text-brand-700 dark:text-brand-400">
              {formatDate(selectedDate, "MMMM dd, yyyy")} at{" "}
              {formatDate(selectedDate, "h:mm a")}
            </p>
            <p className="text-xs text-brand-600 dark:text-brand-400 mt-1">{timezone}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 p-6 border-t border-slate-200/60 dark:border-slate-800">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-xl transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSchedule}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-brand-600 to-accent-500 text-white font-medium rounded-xl shadow-sm hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98] transition-all duration-150"
          >
            Confirm Schedule
          </button>
        </div>
      </div>
    </div>
  );
};

export default Scheduler;
