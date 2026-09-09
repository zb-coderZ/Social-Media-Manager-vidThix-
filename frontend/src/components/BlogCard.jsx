import { CalendarDays, Clock3 } from "lucide-react";
import { Link } from "react-router-dom";
import { formatBlogDate } from "../utils/blogData";

const BlogCard = ({ blog }) => {
  return (
    <article className="group rounded-2xl overflow-hidden bg-white dark:bg-navy-800/70 border border-gray-200/70 dark:border-indigo-600/30 shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
      <Link to={`/blog/${blog.slug}`} className="block">
        <img
          src={blog.image}
          alt={blog.imageAlt}
          loading="lazy"
          className="h-52 w-full object-cover"
        />
      </Link>

      <div className="p-5 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-200">
            {blog.category}
          </span>
          <div className="flex items-center gap-1 text-xs dark:text-gray-400 text-gray-500">
            <Clock3 className="w-3.5 h-3.5" />
            <span>{blog.readTime}</span>
          </div>
        </div>

        <Link to={`/blog/${blog.slug}`} className="block">
          <h2 className="text-xl font-bold dark:text-white text-gray-900 group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors duration-200">
            {blog.title}
          </h2>
        </Link>

        <p className="text-sm dark:text-gray-300 text-gray-600 line-clamp-3">
          {blog.description}
        </p>

        <div className="flex items-center gap-2 text-xs dark:text-gray-400 text-gray-500">
          <CalendarDays className="w-3.5 h-3.5" />
          <span>{formatBlogDate(blog.date)}</span>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
