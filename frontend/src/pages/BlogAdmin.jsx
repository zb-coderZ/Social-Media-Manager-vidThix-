import { useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import BlogTable from "../components/BlogTable";
import BlogEditor from "../components/BlogEditor";
import { getAllBlogs, saveBlogs } from "../utils/blogData";
import { useApp } from "../context/AppContext";
import { useToast } from "../context/ToastContext";

const BlogAdmin = () => {
  const { user } = useApp();
  const { success } = useToast();
  const [blogs, setBlogs] = useState(() => getAllBlogs());
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);

  const isAdmin = user?.isAdmin ?? true;

  const sortedBlogs = useMemo(() => {
    return [...blogs].sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [blogs]);

  const upsertBlog = (payload, status) => {
    const date = new Date().toISOString().slice(0, 10);

    setBlogs((prev) => {
      let nextBlogs;

      if (payload.id) {
        nextBlogs = prev.map((blog) =>
          blog.id === payload.id
            ? {
                ...blog,
                ...payload,
                status,
                date,
                keywords:
                  payload.keywords ||
                  "social media, SEO, content marketing, content automation",
                seoDescription: payload.seoDescription || payload.description,
              }
            : blog,
        );
        saveBlogs(nextBlogs);
        return nextBlogs;
      }

      const newId = prev.length
        ? Math.max(...prev.map((blog) => blog.id)) + 1
        : 1;
      nextBlogs = [
        {
          id: newId,
          ...payload,
          status,
          date,
          views: 0,
          keywords:
            payload.keywords ||
            "social media, SEO, content marketing, content automation",
          seoDescription: payload.seoDescription || payload.description,
          internalLinks: payload.internalLinks || [],
        },
        ...prev,
      ];
      saveBlogs(nextBlogs);
      return nextBlogs;
    });

    setIsEditorOpen(false);
    setEditingBlog(null);
  };

  const handleSaveDraft = (payload) => {
    upsertBlog(payload, "draft");
    success("Draft saved");
  };

  const handlePublish = (payload) => {
    upsertBlog(payload, "published");
    success("Blog Published");
  };

  const handleDelete = (id) => {
    setBlogs((prev) => {
      const nextBlogs = prev.filter((blog) => blog.id !== id);
      saveBlogs(nextBlogs);
      return nextBlogs;
    });
    success("Blog Deleted");
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setIsEditorOpen(true);
  };

  const handleNewArticle = () => {
    setEditingBlog(null);
    setIsEditorOpen(true);
  };

  const handleCancel = () => {
    setEditingBlog(null);
    setIsEditorOpen(false);
  };

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold dark:text-white text-gray-900">
            Manage Blog Content
          </h1>
          <p className="dark:text-gray-400 text-gray-600 mt-1">
            Create, edit, and publish SEO-ready articles from your dashboard.
          </p>
        </div>

        <button
          onClick={handleNewArticle}
          className="px-5 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold transition-colors duration-200"
        >
          + New Article
        </button>
      </header>

      <BlogTable
        blogs={sortedBlogs}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {isEditorOpen && (
        <BlogEditor
          key={editingBlog?.id ?? "new"}
          blog={editingBlog}
          onCancel={handleCancel}
          onSaveDraft={handleSaveDraft}
          onPublish={handlePublish}
        />
      )}
    </div>
  );
};

export default BlogAdmin;
