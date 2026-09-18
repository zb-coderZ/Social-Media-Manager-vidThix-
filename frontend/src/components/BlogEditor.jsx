import { useState } from "react";
import {
  X,
  Sparkles,
  Globe,
  Image as ImageIcon,
  FileText,
  CheckCircle2,
  Wand2,
  Eye,
  Check,
} from "lucide-react";
import { BLOG_CATEGORIES, slugifyTitle } from "../utils/blogData";

const emptyForm = {
  title: "",
  slug: "",
  description: "",
  content: "",
  category: "",
  image: "",
  imageAlt: "",
  status: "draft",
};

function buildFormState(blog) {
  if (!blog) {
    return emptyForm;
  }

  return {
    title: blog.title || "",
    slug: blog.slug || "",
    description: blog.description || "",
    content:
      blog.contentSections
        ?.filter((section) => section.type === "paragraph")
        .map((section) => section.text)
        .join("\n\n") || "",
    category: blog.category || "",
    image: blog.image || "",
    imageAlt: blog.imageAlt || "",
    status: blog.status || "draft",
  };
}

const BlogEditor = ({ blog, onCancel, onSaveDraft, onPublish }) => {
  const [formData, setFormData] = useState(() => buildFormState(blog));
  const [slugTouched, setSlugTouched] = useState(Boolean(blog));

  const updateField = (field, value) => {
    setFormData((prev) => {
      const next = { ...prev, [field]: value };

      if (field === "title" && !slugTouched) {
        next.slug = slugifyTitle(value);
      }

      return next;
    });
  };

  const handleGenerateSlug = () => {
    if (formData.title) {
      updateField("slug", slugifyTitle(formData.title));
      setSlugTouched(true);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const localImageUrl = URL.createObjectURL(file);
    updateField("image", localImageUrl);
    if (!formData.imageAlt) {
      updateField("imageAlt", formData.title || "Blog thumbnail image");
    }
  };

  const wordCount = formData.content.split(/\s+/).filter(Boolean).length;
  const estimatedReadTime = Math.max(1, Math.ceil(wordCount / 220));

  const toBlogPayload = (status) => ({
    ...blog,
    title: formData.title.trim(),
    slug: formData.slug.trim() || slugifyTitle(formData.title),
    description: formData.description.trim(),
    category: formData.category || "General",
    image:
      formData.image.trim() ||
      "https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&w=1400&q=80",
    imageAlt: formData.imageAlt.trim() || formData.title,
    status,
    readTime: `${estimatedReadTime} min`,
    contentSections: formData.content
      .split(/\n\n+/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean)
      .map((text) => ({ type: "paragraph", text })),
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto">
        {/* Editor Top Bar */}
        <div className="p-5 sm:p-6 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-500/10 border border-brand-500/20 text-brand-500 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <span>{blog ? "Edit Article" : "Write New Article"}</span>
                {formData.status === "published" ? (
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                    Live Status
                  </span>
                ) : (
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-amber-500/10 text-amber-600 border border-amber-500/20">
                    Drafting Mode
                  </span>
                )}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {wordCount} words • ~{estimatedReadTime} min read time
              </p>
            </div>
          </div>

          <button
            onClick={onCancel}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-2 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Editor Form Body (Scrollable dual-column) */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area (Left 2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                Article Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => updateField("title", e.target.value)}
                placeholder="e.g., How to Automate Social Media Content in 2026"
                className="w-full text-lg sm:text-xl font-bold rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white px-4 py-3 placeholder:text-slate-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
              />
            </div>

            {/* Slug */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  URL Slug
                </label>
                <button
                  type="button"
                  onClick={handleGenerateSlug}
                  className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
                >
                  <Wand2 className="w-3 h-3" /> Auto-Generate Slug
                </button>
              </div>
              <div className="flex rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 overflow-hidden">
                <span className="px-3.5 py-3 text-xs font-mono text-slate-400 bg-slate-100 dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex items-center">
                  /blog/
                </span>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => {
                    setSlugTouched(true);
                    updateField("slug", slugifyTitle(e.target.value));
                  }}
                  placeholder="how-to-automate-social-media"
                  className="w-full font-mono text-xs bg-transparent text-slate-900 dark:text-white px-3.5 py-3 focus:outline-none"
                />
              </div>
            </div>

            {/* Excerpt / Description */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                Excerpt & SEO Meta Description
              </label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => updateField("description", e.target.value)}
                placeholder="A compelling summary for search results and social media cards..."
                className="w-full text-xs sm:text-sm rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white px-4 py-3 placeholder:text-slate-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 leading-relaxed"
              />
            </div>

            {/* Content Body */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Article Body Content
                </label>
                <span className="text-xs text-slate-400 font-medium">
                  Separate paragraphs with blank lines
                </span>
              </div>
              <textarea
                rows={10}
                value={formData.content}
                onChange={(e) => updateField("content", e.target.value)}
                placeholder="Write your article here in plain text or Markdown style paragraphs..."
                className="w-full text-sm rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-white p-4 placeholder:text-slate-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 leading-relaxed"
              />
            </div>
          </div>

          {/* Right Settings & Preview Column */}
          <div className="space-y-6">
            {/* Category & Status */}
            <div className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-4">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-500" /> Publishing Settings
              </h3>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => updateField("category", e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
                >
                  <option value="">Select category...</option>
                  {BLOG_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => updateField("status", e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
                >
                  <option value="draft">Save as Draft</option>
                  <option value="published">Publish Live</option>
                </select>
              </div>
            </div>

            {/* Thumbnail Cover Image */}
            <div className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-3">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-brand-500" /> Featured Image
              </h3>

              {formData.image ? (
                <div className="relative rounded-2xl overflow-hidden aspect-video border border-slate-200 dark:border-slate-700 group">
                  <img
                    src={formData.image}
                    alt={formData.imageAlt || "Cover preview"}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => updateField("image", "")}
                    className="absolute top-2 right-2 p-1.5 bg-slate-950/70 text-white rounded-xl hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="p-6 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl text-center space-y-2">
                  <ImageIcon className="w-8 h-8 text-slate-400 mx-auto" />
                  <p className="text-xs text-slate-500">No cover image uploaded</p>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => updateField("image", e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  Or Upload Local File
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-brand-500/10 file:text-brand-600 dark:file:text-brand-400 hover:file:bg-brand-500/20 cursor-pointer"
                />
              </div>
            </div>

            {/* Google Search Live SEO Snippet Preview */}
            <div className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-3">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                <Globe className="w-4 h-4 text-emerald-500" /> Google Search SEO Preview
              </h3>

              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-1 shadow-inner">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                  <span className="w-4 h-4 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold text-[9px]">
                    v
                  </span>
                  <span className="truncate">vidthix.com › blog › {formData.slug || "slug"}</span>
                </div>
                <h4 className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline line-clamp-1 cursor-pointer">
                  {formData.title || "Untitled Article Title - vidThix Blog"}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {formData.description || "Enter an SEO excerpt to preview how your article appears in search engine results."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Editor Action Footer */}
        <div className="p-5 sm:p-6 border-t border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col-reverse sm:flex-row items-center justify-between gap-3 shrink-0">
          <button
            onClick={onCancel}
            className="w-full sm:w-auto px-5 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => onSaveDraft(toBlogPayload("draft"))}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
            >
              Save as Draft
            </button>
            <button
              onClick={() => onPublish(toBlogPayload("published"))}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-2xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 text-white font-bold text-xs shadow-lg shadow-brand-500/20 hover:shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>Publish Live</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogEditor;
