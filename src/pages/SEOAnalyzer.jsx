import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import SEOScore from "../components/seo/SEOScore";
import { calculateSEOScore } from "../utils/seoCalculator";
import { debounce } from "../utils/helpers";

const SEOAnalyzer = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
  });
  const [seoResult, setSeoResult] = useState(null);

  const analyzeSEO = () => {
    if (!formData.title && !formData.description && !formData.tags) {
      setSeoResult(null);
      return;
    }

    const result = calculateSEOScore(formData);
    setSeoResult(result);
  };

  // Debounced SEO analysis
  useEffect(() => {
    const debouncedAnalyze = debounce(analyzeSEO, 500);
    debouncedAnalyze();
  }, [formData]);

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold dark:text-white text-gray-900 mb-2">SEO Analyzer</h1>
        <p className="dark:text-gray-400 text-gray-600">
          Analyze and optimize your content for maximum discoverability and
          engagement.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="space-y-6">
          <div className="p-6 dark:bg-navy-800/60 dark:backdrop-blur-xl dark:border dark:border-indigo-600/30 bg-white/60 backdrop-blur-xl border border-gray-200/50 rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 dark:bg-indigo-600/20 dark:border dark:border-indigo-500/30 bg-indigo-100 border border-indigo-300 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 dark:text-indigo-400 text-indigo-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold dark:text-white text-gray-900">
                  Content Details
                </h2>
                <p className="text-sm dark:text-gray-400 text-gray-600">
                  Enter your content to analyze
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-semibold dark:text-white text-gray-900 mb-2"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Enter your video title..."
                  className="w-full px-4 py-3 dark:bg-navy-900 dark:border dark:border-navy-700 dark:text-white dark:focus:ring-indigo-500 dark:placeholder:text-gray-500 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 rounded-xl"
                  maxLength={100}
                />
                <p
                  className={`text-xs mt-1 ${
                    formData.title.length >= 50 && formData.title.length <= 60
                      ? "dark:text-emerald-400 text-emerald-600"
                      : formData.title.length > 60
                        ? "dark:text-amber-400 text-amber-600"
                        : "dark:text-gray-500 text-gray-500"
                  }`}
                >
                  {formData.title.length}/100 characters
                </p>
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-semibold dark:text-white text-gray-900 mb-2"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Write a detailed description..."
                  rows={6}
                  className="w-full px-4 py-3 dark:bg-navy-900 dark:border dark:border-navy-700 dark:text-white dark:focus:ring-indigo-500 dark:placeholder:text-gray-500 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 rounded-xl resize-none"
                  maxLength={5000}
                />
                <p
                  className={`text-xs mt-1 ${
                    formData.description.length >= 150 &&
                    formData.description.length <= 300
                      ? "dark:text-emerald-400 text-emerald-600"
                      : formData.description.length > 300
                        ? "dark:text-amber-400 text-amber-600"
                        : "dark:text-gray-500 text-gray-500"
                  }`}
                >
                  {formData.description.length}/5000 characters
                </p>
              </div>

              {/* Tags */}
              <div>
                <label
                  htmlFor="tags"
                  className="block text-sm font-semibold dark:text-white text-gray-900 mb-2"
                >
                  Tags{" "}
                  <span className="dark:text-gray-500 text-gray-500 text-xs font-normal">
                    (comma-separated)
                  </span>
                </label>
                <input
                  type="text"
                  id="tags"
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData({ ...formData, tags: e.target.value })
                  }
                  placeholder="react, tutorial, web development..."
                  className="w-full px-4 py-3 dark:bg-navy-900 dark:border dark:border-navy-700 dark:text-white dark:focus:ring-indigo-500 dark:placeholder:text-gray-500 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 rounded-xl"
                />
                <p className="text-xs dark:text-gray-500 text-gray-500 mt-1">
                  {formData.tags.split(",").filter((t) => t.trim()).length} tags
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Result */}
        <div>
          {seoResult ? (
            <SEOScore
              score={seoResult.score}
              suggestions={seoResult.suggestions}
            />
          ) : (
            <div className="p-6 dark:bg-navy-800/60 dark:backdrop-blur-xl dark:border dark:border-indigo-600/30 bg-white/60 backdrop-blur-xl border border-gray-200/50 rounded-2xl">
              <div className="text-center py-12">
                <div className="w-24 h-24 dark:bg-indigo-600/20 dark:border dark:border-indigo-500/30 bg-indigo-100 border border-indigo-300 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-12 h-12 dark:text-indigo-400 text-indigo-600" />
                </div>
                <h3 className="text-lg font-bold dark:text-white text-gray-900 mb-2">
                  Start Analyzing
                </h3>
                <p className="dark:text-gray-400 text-gray-600 mb-6">
                  Enter your content details to get a real-time SEO analysis
                </p>
                <div className="space-y-2 text-sm dark:text-gray-500 text-gray-600">
                  <p>✓ Instant scoring as you type</p>
                  <p>✓ Actionable suggestions</p>
                  <p>✓ SEO best practices</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tips Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 dark:bg-emerald-500/10 dark:border dark:border-emerald-500/30 bg-emerald-50 border border-emerald-200 rounded-2xl">
          <h3 className="font-bold dark:text-emerald-400 text-emerald-900 mb-2">Title Optimization</h3>
          <p className="text-sm dark:text-emerald-300/80 text-emerald-700">
            Keep it between 50-60 characters and include your main keywords at
            the beginning.
          </p>
        </div>

        <div className="p-6 dark:bg-cyan-500/10 dark:border dark:border-cyan-500/30 bg-cyan-50 border border-cyan-200 rounded-2xl">
          <h3 className="font-bold dark:text-cyan-400 text-cyan-900 mb-2">Description Power</h3>
          <p className="text-sm dark:text-cyan-300/80 text-cyan-700">
            Use 150-300 characters. Include relevant keywords naturally without
            stuffing.
          </p>
        </div>

        <div className="p-6 dark:bg-indigo-500/10 dark:border dark:border-indigo-500/30 bg-indigo-50 border border-indigo-200 rounded-2xl">
          <h3 className="font-bold dark:text-indigo-400 text-indigo-900 mb-2">Tag Strategy</h3>
          <p className="text-sm dark:text-indigo-300/80 text-indigo-700">
            Add 10-15 specific, relevant tags. Mix broad and niche terms for
            better reach.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SEOAnalyzer;
