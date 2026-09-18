import { Link } from "react-router-dom";
import { TrendingUp, Folder, Zap } from "lucide-react";

const BlogSidebar = ({ popularPosts, categories }) => {
  return (
    <aside className="space-y-6 lg:sticky lg:top-28">
      {/* Popular Posts */}
      <section className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-card p-6 space-y-4">
        <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-brand-500" />
          <span>Popular Strategy Guides</span>
        </h2>
        <ul className="space-y-3.5 divide-y divide-slate-100 dark:divide-slate-800/80">
          {popularPosts.map((post, idx) => (
            <li key={post.id} className={idx > 0 ? "pt-3" : ""}>
              <Link
                to={`/blog/${post.slug}`}
                className="group block space-y-1"
              >
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-2 leading-snug">
                  {post.title}
                </p>
                <p className="text-[11px] text-slate-400 font-medium">
                  {post.readTime} read • {post.views} views
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Categories Widget */}
      <section className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-card p-6 space-y-4">
        <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
          <Folder className="w-4 h-4 text-brand-500" />
          <span>Topic Categories</span>
        </h2>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li
              key={category.name}
              className="flex items-center justify-between text-xs"
            >
              <span className="font-bold text-slate-700 dark:text-slate-300">
                {category.name}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                {category.count}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA Box */}
      <section className="rounded-3xl bg-gradient-to-br from-brand-950 via-slate-900 to-indigo-950 text-white p-6 shadow-xl border border-brand-500/20 space-y-3">
        <div className="w-10 h-10 rounded-2xl bg-brand-500/20 border border-brand-500/30 text-brand-400 flex items-center justify-center">
          <Zap className="w-5 h-5" />
        </div>
        <h3 className="text-base font-extrabold">
          Automate YouTube & LinkedIn Posts
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          Create, schedule, and distribute video content effortlessly from vidThix dashboard.
        </p>
        <Link
          to="/dashboard"
          className="inline-flex items-center justify-center w-full bg-white text-slate-900 font-extrabold rounded-2xl px-4 py-2.5 text-xs shadow-md hover:bg-slate-100 active:scale-95 transition-all mt-2"
        >
          Try vidThix Free
        </Link>
      </section>
    </aside>
  );
};

export default BlogSidebar;
