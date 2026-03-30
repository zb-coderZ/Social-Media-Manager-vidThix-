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

      <main className="px-4 sm:px-6 lg:px-8 pt-10 pb-20">
        <div className="max-w-7xl mx-auto space-y-10">
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
              className="w-full rounded-xl border border-gray-300 dark:border-indigo-600/30 bg-white dark:bg-navy-900/60 px-4 py-3 dark:text-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          {filteredBlogs.length === 0 ? (
            <div className="rounded-2xl bg-white dark:bg-navy-800/70 border border-gray-200/70 dark:border-indigo-600/30 p-12 text-center shadow-sm">
              <p className="text-lg font-semibold dark:text-white text-gray-900">
                No blog posts yet
              </p>
            </div>
          ) : (
            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
