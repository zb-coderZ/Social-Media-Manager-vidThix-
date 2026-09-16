import { useMemo, useState } from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/home/Footer";
import BlogHeader from "../components/BlogHeader";
import BlogCard from "../components/BlogCard";
import { getPublishedBlogs } from "../utils/blogData";
import { usePageMeta } from "../hooks/usePageMeta";

const Blog = () => {
  const [query, setQuery] = useState("");

  const publishedBlogs = getPublishedBlogs();

  const filteredBlogs = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return publishedBlogs;

    return publishedBlogs.filter((blog) => {
      return (
        blog.title.toLowerCase().includes(normalized) ||
        blog.description.toLowerCase().includes(normalized) ||
        blog.category.toLowerCase().includes(normalized)
      );
    });
  }, [publishedBlogs, query]);

  usePageMeta({
    title: "vidThix Insights | vidThix",
    description:
      "Learn social media growth, SEO strategies, and content automation with practical guides from vidThix.",
    keywords:
      "social media, SEO, content marketing, content automation, growth strategy",
    canonical: "/blog",
    ogType: "website",
  });

  return (
    <div className="min-h-screen dark:bg-navy-950/20 bg-white/20">
      <Navbar isFixed={false} />

      <main className="max-w-7xl mx-auto w-full px-4 py-6 sm:px-6 sm:py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <BlogHeader
            title="vidThix Insights"
            subtitle="Learn social media growth, SEO strategies, and content automation."
          />

          <div className="max-w-xl mx-auto">
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search articles..."
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 px-3.5 py-2.5 placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none transition-colors duration-150"
            />
          </div>

          {filteredBlogs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 rounded-2xl p-4 mb-4" />
              <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                No blog posts yet
              </p>
            </div>
          ) : (
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
