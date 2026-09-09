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
        <main className="px-4 sm:px-6 lg:px-8 pt-10 pb-20">
          <div className="max-w-2xl mx-auto rounded-2xl bg-white dark:bg-navy-800/70 border border-gray-200/70 dark:border-indigo-600/30 p-10 text-center shadow-sm">
            <h1 className="text-3xl font-bold dark:text-white text-gray-900 mb-3">
              Post not found
            </h1>
            <p className="dark:text-gray-300 text-gray-600 mb-6">
              This article is unavailable or still in draft mode.
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center px-5 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold transition-colors duration-200"
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

      <main className="px-4 sm:px-6 lg:px-8 pt-10 pb-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,700px)_300px] gap-10 items-start">
          <article className="rounded-2xl bg-white dark:bg-navy-800/70 border border-gray-200/70 dark:border-indigo-600/30 p-6 sm:p-10 shadow-sm space-y-6">
            <header className="space-y-4">
              <h1 className="text-3xl sm:text-4xl font-bold dark:text-white text-gray-900">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-3 text-sm dark:text-gray-400 text-gray-600">
                <span>{formatBlogDate(post.date)}</span>
                <span>•</span>
                <span>{post.readTime} read</span>
                <span>•</span>
                <span className="px-2 py-1 rounded-md bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-200 text-xs font-semibold">
                  {post.category}
                </span>
              </div>
            </header>

            <img
              src={post.image}
              alt={post.imageAlt}
              loading="lazy"
              className="w-full h-72 sm:h-96 object-cover rounded-xl"
            />

            <div className="space-y-5">
              {post.contentSections.map((section, index) =>
                renderSection(section, index),
              )}
            </div>

            <section className="rounded-xl bg-violet-600 text-white p-6 space-y-3">
              <h2 className="text-2xl font-bold">
                Start publishing smarter with vidThix
              </h2>
              <p className="text-violet-100">
                Create once, optimize for SEO, and publish across platforms with
                one workflow.
              </p>
              <Link
                to="/dashboard"
                className="inline-flex items-center px-4 py-2.5 rounded-xl bg-white text-violet-700 font-semibold hover:bg-violet-50 transition-colors duration-200"
              >
                Try vidThix Free
              </Link>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold dark:text-white text-gray-900">
                Keep Reading
              </h2>
              <ul className="space-y-2">
                {post.internalLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-violet-700 dark:text-violet-300 hover:text-violet-800 dark:hover:text-violet-200 font-medium"
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
