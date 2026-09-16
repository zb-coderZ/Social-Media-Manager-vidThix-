import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar } from "lucide-react";

const DateTimePicker = ({ selectedDate, onDateChange }) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
        Date & Time
      </label>
      <div className="relative">
        <DatePicker
          selected={selectedDate}
          onChange={onDateChange}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="MMMM d, yyyy h:mm aa"
          minDate={new Date()}
          className="w-full px-4 py-3 pl-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none transition-colors duration-150"
          placeholderText="Select date and time"
        />
        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500 pointer-events-none" />
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400">
        Schedule your content for the optimal posting time
      </p>
    </div>
  );
};

export default DateTimePicker;
