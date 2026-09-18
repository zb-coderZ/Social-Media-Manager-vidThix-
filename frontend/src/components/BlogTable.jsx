import { Edit3, ExternalLink, Trash2, Eye, Calendar, Clock, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const BlogTable = ({ blogs, onEdit, onDelete }) => {
  if (blogs.length === 0) {
    return (
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-12 text-center shadow-card space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-brand-500/10 text-brand-500 mx-auto flex items-center justify-center">
          <FileText className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            No Articles Found
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
            No blog posts match your current search or status filter. Try clearing filters or create a new article.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-card">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/80 dark:bg-slate-800/60 text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold border-b border-slate-200/60 dark:border-slate-800">
              <th className="px-6 py-4">Article Title & Details</th>
              <th className="px-4 py-4">Category</th>
              <th className="px-4 py-4">Status</th>
              <th className="px-4 py-4">Stats & Views</th>
              <th className="px-4 py-4">Published Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800">
            {blogs.map((blog) => (
              <tr
                key={blog.id}
                className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors duration-150 group"
              >
                {/* Article Info */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4 min-w-[280px]">
                    <img
                      src={
                        blog.image ||
                        "https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&w=400&q=80"
                      }
                      alt={blog.imageAlt || blog.title}
                      className="w-14 h-14 rounded-2xl object-cover border border-slate-200 dark:border-slate-700 shadow-sm shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm line-clamp-1 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                        {blog.title}
                      </h4>
                      <p className="text-xs text-slate-400 font-mono truncate mt-0.5">
                        /blog/{blog.slug}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Category */}
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-extrabold bg-brand-500/10 text-brand-600 dark:text-brand-300 border border-brand-500/20">
                    {blog.category}
                  </span>
                </td>

                {/* Status */}
                <td className="px-4 py-4 whitespace-nowrap">
                  {blog.status === "published" ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold border bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Published
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold border bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      Draft
                    </span>
                  )}
                </td>

                {/* Stats & Views */}
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-300">
                    <div className="flex items-center gap-1 font-semibold" title="Total Reader Views">
                      <Eye className="w-3.5 h-3.5 text-slate-400" />
                      <span>{(blog.views || 0).toLocaleString()}</span>
                    </div>
                    <span className="text-slate-300 dark:text-slate-700">•</span>
                    <div className="flex items-center gap-1 font-medium text-slate-500" title="Estimated Read Time">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{blog.readTime || "5 min"}</span>
                    </div>
                  </div>
                </td>

                {/* Date */}
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{blog.date}</span>
                  </div>
                </td>

                {/* Actions */}
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    {blog.status === "published" && (
                      <Link
                        to={`/blog/${blog.slug}`}
                        target="_blank"
                        className="p-2 rounded-xl text-slate-400 hover:text-brand-600 hover:bg-brand-500/10 dark:hover:bg-brand-500/20 transition-colors"
                        title="Preview Live Post"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    )}

                    <button
                      onClick={() => onEdit(blog)}
                      className="p-2 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-indigo-500/10 dark:hover:bg-indigo-500/20 transition-colors"
                      title="Edit Article"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onDelete(blog.id)}
                      className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-500/10 dark:hover:bg-red-500/20 transition-colors"
                      title="Delete Article"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogTable;
