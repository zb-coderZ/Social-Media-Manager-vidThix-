import { CATEGORIES } from "../../utils/dummyData";

const VideoForm = ({ formData, onChange, errors = {} }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...formData, [name]: value });
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
        >
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter a compelling title (50-60 characters recommended)"
          className={`w-full rounded-xl border bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 px-3.5 py-2.5 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-colors duration-150 ${
            errors.title
              ? "border-red-500 focus:ring-red-500/20"
              : "border-slate-200 dark:border-slate-700 focus:border-brand-500 focus:ring-brand-500/20"
          }`}
          maxLength={100}
        />
        <div className="flex justify-between mt-1">
          {errors.title && (
            <p className="text-xs text-red-500 dark:text-red-400">
              {errors.title}
            </p>
          )}
          <p
            className={`text-xs ml-auto ${
              formData.title.length >= 50 && formData.title.length <= 60
                ? "text-green-600 dark:text-emerald-400"
                : formData.title.length > 60
                  ? "text-amber-600 dark:text-amber-400"
                  : "text-gray-500 dark:text-gray-400"
            }`}
          >
            {formData.title.length}/100
          </p>
        </div>
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
        >
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Write a detailed description (150-300 characters recommended)"
          rows={5}
          className={`w-full rounded-xl border bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 px-3.5 py-2.5 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-colors duration-150 resize-none ${
            errors.description
              ? "border-red-500 focus:ring-red-500/20"
              : "border-slate-200 dark:border-slate-700 focus:border-brand-500 focus:ring-brand-500/20"
          }`}
          maxLength={5000}
        />
        <div className="flex justify-between mt-1">
          {errors.description && (
            <p className="text-xs text-red-500 dark:text-red-400">
              {errors.description}
            </p>
          )}
          <p
            className={`text-xs ml-auto ${
              formData.description.length >= 150 &&
              formData.description.length <= 300
                ? "text-green-600 dark:text-emerald-400"
                : formData.description.length > 300
                  ? "text-amber-600 dark:text-amber-400"
                  : "text-gray-500 dark:text-gray-400"
            }`}
          >
            {formData.description.length}/5000
          </p>
        </div>
      </div>

      {/* Tags */}
      <div>
        <label
          htmlFor="tags"
          className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
        >
          Tags{" "}
          <span className="text-gray-500 dark:text-gray-400 text-xs font-normal">
            (comma-separated)
          </span>
        </label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="react, tutorial, web development, javascript (10-15 tags recommended)"
          className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 px-3.5 py-2.5 placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none transition-colors duration-150"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {formData.tags.split(",").filter((t) => t.trim()).length} tags
        </p>
      </div>

      {/* Category */}
      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
        >
          Category <span className="text-red-500">*</span>
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className={`w-full rounded-xl border bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 px-3.5 py-2.5 focus:outline-none focus:ring-2 transition-colors duration-150 ${
            errors.category
              ? "border-red-500 focus:ring-red-500/20"
              : "border-slate-200 dark:border-slate-700 focus:border-brand-500 focus:ring-brand-500/20"
          }`}
        >
          <option value="">Select a category</option>
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-xs text-red-500 dark:text-red-400 mt-1">
            {errors.category}
          </p>
        )}
      </div>
    </div>
  );
};

export default VideoForm;
