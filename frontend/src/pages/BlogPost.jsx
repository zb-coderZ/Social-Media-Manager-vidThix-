import { Link, useParams } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/home/Footer";
import BlogSidebar from "../components/BlogSidebar";
import {
  formatBlogDate,
  getBlogBySlug,
  getCategorySummary,
  getPopularPosts,
} from "../utils/blogData";
import { usePageMeta } from "../hooks/usePageMeta";

function renderSection(section, index) {
  if (section.type === "h2") {
    return (
      <h2
        key={index}
        className="text-2xl font-bold dark:text-white text-gray-900 mt-8"
      >
        {section.text}
      </h2>
    );
  }

  if (section.type === "h3") {
    return (
      <h3
        key={index}
        className="text-xl font-semibold dark:text-white text-gray-900 mt-6"
      >
        {section.text}
      </h3>
    );
  }

  if (section.type === "list") {
    return (
      <ul
        key={index}
        className="list-disc pl-6 space-y-2 dark:text-gray-200 text-gray-700"
      >
        {section.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }

  return (
    <p key={index} className="leading-8 dark:text-gray-200 text-gray-700">
      {section.text}
    </p>
  );
}

const BlogPost = () => {
  const { slug } = useParams();
  const post = getBlogBySlug(slug || "");
  const popularPosts = getPopularPosts();
  const categories = getCategorySummary();

  usePageMeta({
    title: post ? `${post.title} | vidThix` : "Blog Post | vidThix",
    description: post?.seoDescription || post?.description,
    keywords:
      post?.keywords ||
      "social media, SEO, content marketing, content automation",
    canonical: post ? `/blog/${post.slug}` : "/blog",
    ogType: "article",
    ogImage: post?.image,
  });

  if (!post) {
    return (
      <div className="min-h-screen dark:bg-navy-950/20 bg-white/20">
        <Navbar isFixed={false} />
        <main className="max-w-7xl mx-auto w-full px-4 py-6 sm:px-6 sm:py-8">
          <div className="max-w-2xl mx-auto rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-10 text-center shadow-card">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 mb-3">
              Post not found
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              This article is unavailable or still in draft mode.
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center bg-gradient-to-r from-brand-600 to-accent-500 text-white font-medium rounded-xl px-4 py-2.5 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all duration-150"
            >
              Back to Blog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen dark:bg-navy-950/20 bg-white/20">
      <Navbar isFixed={false} />

      <main className="max-w-7xl mx-auto w-full px-4 py-6 sm:px-6 sm:py-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,700px)_300px] gap-10 items-start">
          <article className="max-w-3xl mx-auto rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-6 sm:p-10 shadow-card space-y-6">
            <header className="space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 mt-4">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mt-4">
                <span>{formatBlogDate(post.date)}</span>
                <span>•</span>
                <span>{post.readTime} read</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium bg-brand-50 text-brand-700 border border-brand-200 dark:bg-brand-950/40 dark:text-brand-300 dark:border-brand-900">
                  {post.category}
                </span>
              </div>
            </header>

            <img
              src={post.image}
              alt={post.imageAlt}
              loading="lazy"
              className="rounded-2xl aspect-video w-full object-cover mb-8"
            />

            <div className="space-y-5">
              {post.contentSections.map((section, index) =>
                renderSection(section, index),
              )}
            </div>

            <section className="rounded-2xl bg-brand-950 text-white p-6 space-y-3">
              <h2 className="text-2xl font-bold">
                Start publishing smarter with vidThix
              </h2>
              <p className="text-brand-100">
                Create once, optimize for SEO, and publish across platforms with
                one workflow.
              </p>
              <Link
                to="/dashboard"
                className="inline-flex items-center bg-white text-slate-700 border border-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-800 rounded-xl px-4 py-2.5 hover:bg-slate-50 transition-all duration-150"
              >
                Try vidThix Free
              </Link>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                Keep Reading
              </h2>
              <ul className="space-y-2">
                {post.internalLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </article>

          <div className="hidden lg:block">
            <BlogSidebar popularPosts={popularPosts} categories={categories} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
