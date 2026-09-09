import { Link } from "react-router-dom";

const BlogSidebar = ({ popularPosts, categories }) => {
  return (
    <aside className="space-y-6 lg:sticky lg:top-24">
      <section className="rounded-2xl bg-white dark:bg-navy-800/70 border border-gray-200/70 dark:border-indigo-600/30 p-5 shadow-sm">
        <h2 className="text-lg font-bold dark:text-white text-gray-900 mb-4">
          Popular Posts
        </h2>
        <ul className="space-y-3">
          {popularPosts.map((post) => (
            <li key={post.id}>
              <Link
                to={`/blog/${post.slug}`}
                className="text-sm font-medium dark:text-gray-300 text-gray-700 hover:text-violet-600 dark:hover:text-violet-300 transition-colors duration-200"
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl bg-white dark:bg-navy-800/70 border border-gray-200/70 dark:border-indigo-600/30 p-5 shadow-sm">
        <h2 className="text-lg font-bold dark:text-white text-gray-900 mb-4">
          Categories
        </h2>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li
              key={category.name}
              className="flex items-center justify-between text-sm"
            >
              <span className="dark:text-gray-300 text-gray-700">
                {category.name}
              </span>
              <span className="text-xs px-2 py-1 rounded-md bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-200">
                {category.count}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl bg-violet-600 text-white p-5 shadow-sm">
        <h2 className="text-lg font-bold mb-2">
          Start publishing smarter with vidThix
        </h2>
        <p className="text-sm text-violet-100 mb-4">
          Plan, optimize, and publish your content pipeline from one dashboard.
        </p>
        <Link
          to="/dashboard"
          className="inline-flex items-center justify-center w-full px-4 py-2.5 rounded-xl bg-white text-violet-700 font-semibold hover:bg-violet-50 transition-colors duration-200"
        >
          Try vidThix Free
        </Link>
      </section>
    </aside>
  );
};

export default BlogSidebar;
