import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar } from "lucide-react";

const DateTimePicker = ({ selectedDate, onDateChange }) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-900 dark:text-white">
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
          className="w-full px-4 py-3 pl-12 bg-white dark:bg-navy-800/60 border border-gray-300 dark:border-indigo-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white dark:placeholder-gray-500"
          placeholderText="Select date and time"
        />
        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500 pointer-events-none" />
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Schedule your content for the optimal posting time
      </p>
    </div>
  );
};

export default DateTimePicker;
