import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  FileText,
  CheckCircle2,
  Eye,
  Trash2,
  AlertTriangle,
  X,
  BookOpen,
} from "lucide-react";
import BlogTable from "../components/BlogTable";
import BlogEditor from "../components/BlogEditor";
import { getAllBlogs, saveBlogs, BLOG_CATEGORIES } from "../utils/blogData";
import { useToast } from "../context/ToastContext";

const BlogAdmin = () => {
  const { success } = useToast();
  const [blogs, setBlogs] = useState(() => getAllBlogs());
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deletingId, setDeletingId] = useState(null);

  const filteredBlogs = useMemo(() => {
    return [...blogs]
      .filter((blog) => {
        const matchesQuery =
          !searchQuery ||
          blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          blog.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory =
          selectedCategory === "all" || blog.category === selectedCategory;
        const matchesStatus =
          statusFilter === "all" || blog.status === statusFilter;
        return matchesQuery && matchesCategory && matchesStatus;
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [blogs, searchQuery, selectedCategory, statusFilter]);

  const stats = useMemo(() => {
    const total = blogs.length;
    const published = blogs.filter((b) => b.status === "published").length;
    const drafts = blogs.filter((b) => b.status === "draft").length;
    const totalViews = blogs.reduce((sum, b) => sum + (b.views || 0), 0);
    return { total, published, drafts, totalViews };
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
    success("Draft article saved successfully.");
  };

  const handlePublish = (payload) => {
    upsertBlog(payload, "published");
    success("Article published live!");
  };

  const handleConfirmDelete = () => {
    if (!deletingId) return;
    setBlogs((prev) => {
      const nextBlogs = prev.filter((blog) => blog.id !== deletingId);
      saveBlogs(nextBlogs);
      return nextBlogs;
    });
    success("Article deleted.");
    setDeletingId(null);
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

  return (
    <div className="w-full min-w-0 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20 uppercase tracking-wider">
              CMS Admin Studio
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Manage Blog & SEO Articles
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Create, publish, and analyze SEO articles for the vidThix audience.
          </p>
        </div>

        <button
          onClick={handleNewArticle}
          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 text-white font-bold rounded-2xl px-4 py-2.5 sm:px-5 sm:py-3 shadow-lg shadow-brand-500/20 hover:shadow-xl active:scale-[0.98] transition-all shrink-0 text-xs sm:text-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Write New Article</span>
        </button>
      </div>

      {/* Summary Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 shadow-card flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
              Total Articles
            </p>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {stats.total}
            </p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-brand-500/10 border border-brand-500/20 text-brand-500 flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 shadow-card flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
              Published Posts
            </p>
            <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
              {stats.published}
            </p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 shadow-card flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
              Draft Manuscripts
            </p>
            <p className="text-2xl font-extrabold text-amber-600 dark:text-amber-400">
              {stats.drafts}
            </p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 shadow-card flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
              Total Reader Views
            </p>
            <p className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">
              {stats.totalViews.toLocaleString()}
            </p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 flex items-center justify-center">
            <Eye className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filters Toolbar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 shadow-sm">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles by title or keywords..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Category Dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3.5 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 focus:outline-none focus:border-brand-500"
          >
            <option value="all">All Categories</option>
            {BLOG_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Status Tabs */}
          <div className="flex items-center p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80">
            {["all", "published", "draft"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                  statusFilter === status
                    ? "bg-white dark:bg-slate-900 text-brand-600 dark:text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Table Section */}
      <BlogTable
        blogs={filteredBlogs}
        onEdit={handleEdit}
        onDelete={(id) => setDeletingId(id)}
      />

      {/* Blog Editor Drawer / Modal */}
      {isEditorOpen && (
        <BlogEditor
          key={editingBlog?.id ?? "new"}
          blog={editingBlog}
          onCancel={handleCancel}
          onSaveDraft={handleSaveDraft}
          onPublish={handlePublish}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Delete Article?
                </h3>
              </div>
              <button
                onClick={() => setDeletingId(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Are you sure you want to delete this article? This action cannot be undone and will remove the post from your live blog catalog.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setDeletingId(null)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm shadow-md shadow-red-600/20 transition-all flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete Post</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogAdmin;
