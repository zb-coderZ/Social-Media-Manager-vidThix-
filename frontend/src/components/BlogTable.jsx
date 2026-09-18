import { Edit3, ExternalLink, Trash2, Eye, Calendar, Clock, FileText, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";

const BlogTable = ({ blogs, onEdit, onDelete }) => {
  if (blogs.length === 0) {
    return (
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-10 text-center shadow-card space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-500 mx-auto flex items-center justify-center">
          <FileText className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
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
    <div className="rounded-3xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-card">
      <div className="overflow-x-auto scrollbar-none">
        <table className="w-full text-left border-collapse min-w-[760px] lg:min-w-full">
          <thead>
            <tr className="bg-slate-50/80 dark:bg-slate-800/60 text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold border-b border-slate-200/60 dark:border-slate-800">
              <th className="px-4 py-3.5 sm:px-6">Article Details</th>
              <th className="px-3 py-3.5">Category</th>
              <th className="px-3 py-3.5">Status</th>
              <th className="px-3 py-3.5">Stats & Read Time</th>
              <th className="px-3 py-3.5">Date</th>
              <th className="px-4 py-3.5 sm:px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800">
            {blogs.map((blog) => (
              <tr
                key={blog.id}
                className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors duration-150 group"
              >
                {/* Article Info */}
                <td className="px-4 py-3.5 sm:px-6">
                  <div className="flex items-center gap-3 max-w-[260px] sm:max-w-xs md:max-w-md">
                    <img
                      src={
                        blog.image ||
                        "https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&w=400&q=80"
                      }
                      alt={blog.imageAlt || blog.title}
                      className="w-11 h-11 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shadow-sm shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm line-clamp-1 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                        {blog.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 font-mono truncate">
                        /blog/{blog.slug}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Category */}
                <td className="px-3 py-3.5 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-brand-500/10 text-brand-600 dark:text-brand-300 border border-brand-500/20">
                    {blog.category}
                  </span>
                </td>

                {/* Status */}
                <td className="px-3 py-3.5 whitespace-nowrap">
                  {blog.status === "published" ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold border bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Published
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold border bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      Draft
                    </span>
                  )}
                </td>

                {/* Stats & Views */}
                <td className="px-3 py-3.5 whitespace-nowrap">
                  <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                    <div className="flex items-center gap-1 font-bold text-slate-700 dark:text-slate-200" title="Total Views">
                      <Eye className="w-3.5 h-3.5 text-slate-400" />
                      <span>{(blog.views || 0).toLocaleString()}</span>
                    </div>
                    <span className="text-slate-300 dark:text-slate-700">•</span>
                    <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium" title="Estimated Read Time">
                      <Clock className="w-3 h-3" />
                      <span>{blog.readTime || "5 min"}</span>
                    </div>
                  </div>
                </td>

                {/* Date */}
                <td className="px-3 py-3.5 whitespace-nowrap">
                  <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{blog.date}</span>
                  </div>
                </td>

                {/* Premium Action Buttons */}
                <td className="px-4 py-3.5 sm:px-6 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onEdit(blog)}
                      className="px-2.5 py-1.5 rounded-xl bg-brand-500/10 hover:bg-brand-500/20 text-brand-600 dark:text-brand-300 border border-brand-500/20 text-xs font-bold transition-all flex items-center gap-1 shadow-sm active:scale-95"
                      title="Edit Article"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>

                    {blog.status === "published" && (
                      <Link
                        to={`/blog/${blog.slug}`}
                        target="_blank"
                        className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold border border-slate-200 dark:border-slate-700 transition-all flex items-center gap-1 shadow-sm active:scale-95"
                        title="View Published Post"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>View</span>
                      </Link>
                    )}

                    <button
                      onClick={() => onDelete(blog.id)}
                      className="p-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/20 transition-all shadow-sm active:scale-95"
                      title="Delete Article"
                    >
                      <Trash2Icon className="w-3.5 h-3.5" />
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
