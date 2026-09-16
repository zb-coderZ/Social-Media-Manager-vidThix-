import { CalendarDays, Clock3 } from "lucide-react";
import { Link } from "react-router-dom";
import { formatBlogDate } from "../utils/blogData";

const BlogCard = ({ blog }) => {
  return (
    <article className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 shadow-card hover:shadow-cardHover transition-shadow duration-200 overflow-hidden group">
      <Link to={`/blog/${blog.slug}`} className="block">
        <img
          src={blog.image}
          alt={blog.imageAlt}
          loading="lazy"
          className="aspect-video w-full object-cover rounded-t-2xl"
        />
      </Link>

      <div className="p-5 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium bg-brand-50 text-brand-700 border border-brand-200 dark:bg-brand-950/40 dark:text-brand-300 dark:border-brand-900">
            {blog.category}
          </span>
          <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
            <Clock3 className="w-3.5 h-3.5" />
            <span>{blog.readTime}</span>
          </div>
        </div>

        <Link to={`/blog/${blog.slug}`} className="block">
          <h2 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors duration-150 line-clamp-2">
            {blog.title}
          </h2>
        </Link>

        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
          {blog.description}
        </p>

        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-4">
          <CalendarDays className="w-3.5 h-3.5" />
          <span>{formatBlogDate(blog.date)}</span>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
