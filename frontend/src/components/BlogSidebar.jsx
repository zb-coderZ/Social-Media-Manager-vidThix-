import { Link } from "react-router-dom";

const BlogSidebar = ({ popularPosts, categories }) => {
  return (
    <aside className="space-y-6 lg:sticky lg:top-24">
      <section className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 shadow-card p-5">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
          Popular Posts
        </h2>
        <ul className="space-y-3">
          {popularPosts.map((post) => (
            <li key={post.id}>
              <Link
                to={`/blog/${post.slug}`}
                className="block text-sm text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors duration-150 py-1"
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 shadow-card p-5">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
          Categories
        </h2>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li
              key={category.name}
              className="flex items-center justify-between text-sm"
            >
              <span className="text-sm text-slate-700 dark:text-slate-300">
                {category.name}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium bg-slate-50 text-slate-700 border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700">
                {category.count}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl bg-brand-950 text-white p-5 shadow-card">
        <h2 className="text-lg font-bold mb-2">
          Start publishing smarter with vidThix
        </h2>
        <p className="text-sm text-brand-100 mb-4">
          Plan, optimize, and publish your content pipeline from one dashboard.
        </p>
        <Link
          to="/dashboard"
          className="inline-flex items-center justify-center w-full bg-white text-slate-700 border border-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-800 rounded-xl px-4 py-2.5 hover:bg-slate-50 transition-all duration-150"
        >
          Try vidThix Free
        </Link>
      </section>
    </aside>
  );
};

export default BlogSidebar;
