const statusClasses = {
  published:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  draft: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
};

const BlogTable = ({ blogs, onEdit, onDelete }) => {
  if (blogs.length === 0) {
    return (
      <div className="rounded-2xl bg-white dark:bg-navy-800/70 border border-gray-200/70 dark:border-indigo-600/30 p-12 text-center shadow-sm">
        <p className="text-lg font-semibold dark:text-white text-gray-900">
          No blog posts yet
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl bg-white dark:bg-navy-800/70 border border-gray-200/70 dark:border-indigo-600/30 shadow-sm">
      <table className="w-full min-w-[560px] sm:min-w-[680px]">
        <thead>
          <tr className="border-b border-gray-200 dark:border-navy-700">
            <th className="text-left px-3 sm:px-4 py-3 text-xs uppercase tracking-wider dark:text-gray-400 text-gray-500">
              Title
            </th>
            <th className="text-left px-3 sm:px-4 py-3 text-xs uppercase tracking-wider dark:text-gray-400 text-gray-500">
              Category
            </th>
            <th className="text-left px-3 sm:px-4 py-3 text-xs uppercase tracking-wider dark:text-gray-400 text-gray-500">
              Date
            </th>
            <th className="text-left px-3 sm:px-4 py-3 text-xs uppercase tracking-wider dark:text-gray-400 text-gray-500">
              Status
            </th>
            <th className="text-left px-3 sm:px-4 py-3 text-xs uppercase tracking-wider dark:text-gray-400 text-gray-500">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr
              key={blog.id}
              className="border-b border-gray-100 dark:border-navy-700/70 last:border-0"
            >
              <td className="px-3 sm:px-4 py-3">
                <p className="font-semibold dark:text-white text-gray-900 text-sm sm:text-base">
                  {blog.title}
                </p>
              </td>
              <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm dark:text-gray-300 text-gray-700">
                {blog.category}
              </td>
              <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm dark:text-gray-300 text-gray-700 whitespace-nowrap">
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
                    className="px-2.5 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold bg-violet-100 text-violet-700 hover:bg-violet-200 dark:bg-violet-900/40 dark:text-violet-200 dark:hover:bg-violet-900/60 transition-colors duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(blog.id)}
                    className="px-2.5 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50 transition-colors duration-200"
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
