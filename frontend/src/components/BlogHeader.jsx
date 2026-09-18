import { Sparkles } from "lucide-react";

const BlogHeader = ({ title, subtitle, categories = [], selectedCategory = "all", onSelectCategory }) => {
  return (
    <header className="text-center max-w-4xl mx-auto space-y-4 py-4 sm:py-6">
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-extrabold bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20 uppercase tracking-wider">
        <Sparkles className="w-3.5 h-3.5 text-brand-500" />
        <span>vidThix Insights & Strategy</span>
      </div>

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
        {title}
      </h1>

      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
        {subtitle}
      </p>

      {/* Category Pills */}
      {categories.length > 0 && onSelectCategory && (
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          <button
            onClick={() => onSelectCategory("all")}
            className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all ${
              selectedCategory === "all"
                ? "bg-brand-600 text-white shadow-md shadow-brand-500/20 scale-105"
                : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200/80 dark:border-slate-800 hover:border-brand-500/50"
            }`}
          >
            All Topics
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all ${
                selectedCategory === cat
                  ? "bg-brand-600 text-white shadow-md shadow-brand-500/20 scale-105"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200/80 dark:border-slate-800 hover:border-brand-500/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

export default BlogHeader;
