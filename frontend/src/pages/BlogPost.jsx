import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  CalendarDays,
  Clock,
  Eye,
  Share2,
  Check,
  ChevronRight,
  ArrowLeft,
  BookOpen,
} from "lucide-react";
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
import { useToast } from "../context/ToastContext";

function renderSection(section, index) {
  if (section.type === "h2") {
    return (
      <h2
        key={index}
        className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-10 mb-4 tracking-tight"
      >
        {section.text}
      </h2>
    );
  }

  if (section.type === "h3") {
    return (
      <h3
        key={index}
        className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-3"
      >
        {section.text}
      </h3>
    );
  }

  if (section.type === "list") {
    return (
      <ul
        key={index}
        className="list-disc pl-6 space-y-2.5 text-slate-700 dark:text-slate-300 text-sm sm:text-base my-4"
      >
        {section.items.map((item) => (
          <li key={item} className="leading-relaxed">
            {item}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <p
      key={index}
      className="text-base sm:text-lg leading-relaxed text-slate-700 dark:text-slate-300 my-5"
    >
      {section.text}
    </p>
  );
}

const BlogPost = () => {
  const { slug } = useParams();
  const { success } = useToast();
  const [copied, setCopied] = useState(false);
  const post = getBlogBySlug(slug || "");
  const popularPosts = getPopularPosts();
  const categories = getCategorySummary();

  usePageMeta({
    title: post ? `${post.title} | vidThix Insights` : "Article | vidThix",
    description: post?.seoDescription || post?.description,
    keywords:
      post?.keywords ||
      "social media, SEO, content marketing, content automation",
    canonical: post ? `/blog/${post.slug}` : "/blog",
    ogType: "article",
    ogImage: post?.image,
  });

  const handleShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    success("Article link copied to clipboard!");
    setTimeout(() => setCopied(false), 2500);
  };

  if (!post) {
    return (
      <div className="min-h-screen dark:bg-slate-950 bg-slate-50 flex flex-col justify-between">
        <Navbar isFixed={false} />
        <main className="max-w-7xl mx-auto w-full px-4 py-16 flex-1 flex items-center justify-center">
          <div className="max-w-md w-full rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 text-center shadow-card space-y-4">
            <BookOpen className="w-12 h-12 text-brand-500 mx-auto" />
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Article Not Found
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              This article is unavailable, has been moved, or is still in draft mode.
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-2xl px-5 py-3 text-xs shadow-md transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Articles</span>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen dark:bg-slate-950 bg-slate-50 flex flex-col justify-between">
      <Navbar isFixed={false} />

      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12 flex-1">
        {/* Breadcrumb Header */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-8">
          <Link to="/" className="hover:text-slate-900 dark:hover:text-white">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/blog" className="hover:text-slate-900 dark:hover:text-white">
            Blog
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-brand-600 dark:text-brand-400 truncate max-w-xs">
            {post.category}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Article Container */}
          <article className="lg:col-span-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 sm:p-10 shadow-card space-y-8">
            {/* Header Header */}
            <header className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-extrabold bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20">
                  {post.category}
                </span>

                <button
                  onClick={handleShareLink}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Share</span>
                    </>
                  )}
                </button>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-1.5">
                  <CalendarDays className="w-4 h-4 text-slate-400" />
                  <span>{formatBlogDate(post.date)}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>{post.readTime} read</span>
                </div>
                {post.views > 0 && (
                  <>
                    <span>•</span>
                    <div className="flex items-center gap-1.5">
                      <Eye className="w-4 h-4 text-slate-400" />
                      <span>{post.views.toLocaleString()} views</span>
                    </div>
                  </>
                )}
              </div>
            </header>

            {/* Cover Image */}
            <div className="rounded-2xl overflow-hidden aspect-video border border-slate-200/80 dark:border-slate-800 shadow-md">
              <img
                src={post.image}
                alt={post.imageAlt}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Article Content */}
            <div className="prose dark:prose-invert max-w-none">
              {post.contentSections.map((section, index) =>
                renderSection(section, index),
              )}
            </div>

            {/* Author / CTA Banner */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-brand-950 to-indigo-950 text-white space-y-4 shadow-xl border border-brand-500/20">
              <h3 className="text-xl font-bold">
                Accelerate Your Video Publishing Pipeline
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Connect your YouTube and LinkedIn accounts to vidThix. Schedule, publish, and manage all your posts with zero manual hassle.
              </p>
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 bg-white text-slate-900 font-extrabold rounded-2xl px-5 py-3 text-xs shadow-lg hover:bg-slate-100 transition-all"
              >
                <span>Try vidThix Free</span>
              </Link>
            </div>

            {/* Internal Related Links */}
            {post.internalLinks && post.internalLinks.length > 0 && (
              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-3">
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Recommended Next Reads
                </h3>
                <ul className="space-y-2">
                  {post.internalLinks.map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className="text-sm font-bold text-brand-600 dark:text-brand-400 hover:underline inline-flex items-center gap-1.5"
                      >
                        <span>{link.label}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </article>

          {/* Right Sidebar */}
          <div className="lg:col-span-4">
            <BlogSidebar popularPosts={popularPosts} categories={categories} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
