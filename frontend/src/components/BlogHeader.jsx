const BlogHeader = ({ title, subtitle }) => {
  return (
    <header className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
      <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
        {title}
      </h1>
      <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-2">
        {subtitle}
      </p>
    </header>
  );
};

export default BlogHeader;
