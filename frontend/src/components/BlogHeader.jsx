const BlogHeader = ({ title, subtitle }) => {
  return (
    <header className="text-center max-w-3xl mx-auto space-y-4">
      <h1 className="text-4xl sm:text-5xl font-bold dark:text-white text-gray-900">
        {title}
      </h1>
      <p className="text-lg dark:text-gray-300 text-gray-600">{subtitle}</p>
    </header>
  );
};

export default BlogHeader;
