import { useMemo, useState } from "react";
import { Search, X, BookOpen, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/home/Footer";
import BlogHeader from "../components/BlogHeader";
import BlogCard from "../components/BlogCard";
import { getPublishedBlogs, BLOG_CATEGORIES } from "../utils/blogData";
import { usePageMeta } from "../hooks/usePageMeta";

const Blog = () => {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const publishedBlogs = getPublishedBlogs();

  const filteredBlogs = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return publishedBlogs.filter((blog) => {
      const matchesQuery =
        !normalized ||
        blog.title.toLowerCase().includes(normalized) ||
        blog.description.toLowerCase().includes(normalized) ||
        blog.category.toLowerCase().includes(normalized);

      const matchesCategory =
        selectedCategory === "all" || blog.category === selectedCategory;

      return matchesQuery && matchesCategory;
    });
  }, [publishedBlogs, query, selectedCategory]);

  usePageMeta({
    title: "vidThix Insights & Content Growth Guides",
    description:
      "Master YouTube SEO, multi-platform publishing, and content automation with practical strategy guides from vidThix.",
    keywords:
      "social media automation, youtube growth, seo strategy, content marketing, multi platform posting",
    canonical: "/blog",
    ogType: "website",
  });

  return (
    <div className="min-h-screen dark:bg-slate-950 bg-slate-50 flex flex-col justify-between">
      <Navbar isFixed={false} />

      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12 space-y-10 flex-1">
        {/* Header Hero & Category Filter */}
        <BlogHeader
          title="Creator Knowledge Base & Growth Guides"
          subtitle="Explore actionable guides on social media growth, SEO optimization, and automated video workflows."
          categories={BLOG_CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Search Bar Input */}
        <div className="max-w-2xl mx-auto relative">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search articles by topic, keyword, or platform..."
            className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white pl-12 pr-12 py-3.5 shadow-lg shadow-slate-200/50 dark:shadow-none placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none transition-all duration-150 text-sm font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Articles Grid */}
        {filteredBlogs.length === 0 ? (
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-12 text-center shadow-card max-w-xl mx-auto space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-brand-500/10 text-brand-500 mx-auto flex items-center justify-center">
              <BookOpen className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                No Articles Found
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                We couldn't find any articles matching your search criteria.
              </p>
            </div>
            <button
              onClick={() => {
                setQuery("");
                setSelectedCategory("all");
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </section>
        )}

        {/* Bottom Banner Call to Action */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-slate-900 via-brand-950 to-indigo-950 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl border border-brand-500/20">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-extrabold uppercase tracking-wider text-brand-400">
              Ready to Accelerate Content Distribution?
            </span>
            <h3 className="text-2xl sm:text-3xl font-black">
              Publish across YouTube & LinkedIn with vidThix
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Connect your social accounts, schedule posts, and automate video publishing in one unified dashboard.
            </p>
          </div>

          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-slate-900 font-extrabold text-sm shadow-xl hover:bg-slate-100 active:scale-95 transition-all shrink-0"
          >
            <span>Open Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
