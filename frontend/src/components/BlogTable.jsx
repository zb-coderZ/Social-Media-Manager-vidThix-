const statusClasses = {
  published:
    "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900",
  draft:
    "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900",
};

const BlogTable = ({ blogs, onEdit, onDelete }) => {
  if (blogs.length === 0) {
    return (
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-12 text-center shadow-card">
        <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          No blog posts yet
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900">
      <table className="w-full min-w-[560px] sm:min-w-[680px]">
        <thead>
          <tr className="bg-slate-50 dark:bg-slate-800/50 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
            <th className="text-left px-3 sm:px-4 py-3">Title</th>
            <th className="text-left px-3 sm:px-4 py-3">Category</th>
            <th className="text-left px-3 sm:px-4 py-3">Date</th>
            <th className="text-left px-3 sm:px-4 py-3">Status</th>
            <th className="text-left px-3 sm:px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr
              key={blog.id}
              className="border-t border-slate-200/60 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors duration-150"
            >
              <td className="px-3 sm:px-4 py-3">
                <p className="font-medium text-slate-900 dark:text-slate-100 text-sm sm:text-base">
                  {blog.title}
                </p>
              </td>
              <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm">
                <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium bg-slate-50 text-slate-700 border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700">
                  {blog.category}
                </span>
              </td>
              <td className="px-3 sm:px-4 py-3 text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">
                {blog.date}
              </td>
              <td className="px-3 sm:px-4 py-3">
                <span
                  className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${statusClasses[blog.status] || statusClasses.draft}`}
                >
                  {blog.status === "published" ? "Published" : "Draft"}
                </span>
              </td>
              <td className="px-3 sm:px-4 py-3">
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <button
                    onClick={() => onEdit(blog)}
                    className="text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg p-1.5 transition-colors duration-150"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(blog.id)}
                    className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg p-1.5 transition-colors duration-150"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BlogTable;
