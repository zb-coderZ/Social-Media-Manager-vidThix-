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
          className="block text-sm font-semibold text-gray-900 dark:text-white mb-2"
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
          className={`w-full px-4 py-3 bg-white dark:bg-navy-800/60 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 text-gray-900 dark:text-white dark:placeholder-gray-500 ${
            errors.title
              ? "border-red-500 focus:ring-red-500 dark:border-red-500/50 dark:focus:ring-red-500"
              : "border-gray-300 dark:border-indigo-600/30 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
          }`}
          maxLength={100}
        />
        <div className="flex justify-between mt-1">
          {errors.title && (
            <p className="text-xs text-red-500 dark:text-red-400">{errors.title}</p>
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
          className="block text-sm font-semibold text-gray-900 dark:text-white mb-2"
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
          className={`w-full px-4 py-3 bg-white dark:bg-navy-800/60 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 resize-none text-gray-900 dark:text-white dark:placeholder-gray-500 ${
            errors.description
              ? "border-red-500 focus:ring-red-500 dark:border-red-500/50 dark:focus:ring-red-500"
              : "border-gray-300 dark:border-indigo-600/30 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
          }`}
          maxLength={5000}
        />
        <div className="flex justify-between mt-1">
          {errors.description && (
            <p className="text-xs text-red-500 dark:text-red-400">{errors.description}</p>
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
          className="block text-sm font-semibold text-gray-900 dark:text-white mb-2"
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
          className="w-full px-4 py-3 bg-white dark:bg-navy-800/60 border border-gray-300 dark:border-indigo-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white dark:placeholder-gray-500"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {formData.tags.split(",").filter((t) => t.trim()).length} tags
        </p>
      </div>

      {/* Category */}
      <div>
        <label
          htmlFor="category"
          className="block text-sm font-semibold text-gray-900 dark:text-white mb-2"
        >
          Category <span className="text-red-500">*</span>
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-white dark:bg-navy-800/60 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 text-gray-900 dark:text-white ${
            errors.category
              ? "border-red-500 focus:ring-red-500 dark:border-red-500/50 dark:focus:ring-red-500"
              : "border-gray-300 dark:border-indigo-600/30 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
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
          <p className="text-xs text-red-500 dark:text-red-400 mt-1">{errors.category}</p>
        )}
      </div>
    </div>
  );
};

export default VideoForm;
