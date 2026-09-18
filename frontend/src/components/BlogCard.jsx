import { CalendarDays, Clock3, Eye, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { formatBlogDate } from "../utils/blogData";

const BlogCard = ({ blog }) => {
  return (
    <article className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-card hover:shadow-2xl hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 overflow-hidden group flex flex-col justify-between">
      <div>
        {/* Cover Image Container */}
        <Link to={`/blog/${blog.slug}`} className="block overflow-hidden relative aspect-[16/10]">
          <img
            src={
              blog.image ||
              "https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&w=800&q=80"
            }
            alt={blog.imageAlt || blog.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

          {/* Top Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-extrabold bg-white/90 dark:bg-slate-900/90 text-brand-600 dark:text-brand-400 border border-white/20 backdrop-blur-md shadow-md">
              {blog.category}
            </span>
          </div>

          {/* Top Views Badge */}
          {blog.views > 0 && (
            <div className="absolute top-4 right-4">
              <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold bg-slate-950/70 text-white backdrop-blur-md">
                <Eye className="w-3 h-3 text-brand-400" />
                {(blog.views).toLocaleString()}
              </span>
            </div>
          )}
        </Link>

        {/* Card Content Body */}
        <div className="p-6 space-y-3">
          <div className="flex items-center gap-3 text-xs font-semibold text-slate-400">
            <div className="flex items-center gap-1">
              <CalendarDays className="w-3.5 h-3.5 text-slate-400" />
              <span>{formatBlogDate(blog.date)}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Clock3 className="w-3.5 h-3.5 text-slate-400" />
              <span>{blog.readTime || "5 min read"}</span>
            </div>
          </div>

          <Link to={`/blog/${blog.slug}`} className="block group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white line-clamp-2 leading-snug">
              {blog.title}
            </h2>
          </Link>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {blog.description}
          </p>
        </div>
      </div>

      {/* Card Footer Action */}
      <div className="px-6 pb-6 pt-2">
        <Link
          to={`/blog/${blog.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-extrabold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors group-hover:translate-x-1 duration-200"
        >
          <span>Read Full Article</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;
