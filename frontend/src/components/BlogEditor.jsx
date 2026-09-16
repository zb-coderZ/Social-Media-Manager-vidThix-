import { useState } from "react";
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

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const localImageUrl = URL.createObjectURL(file);
    updateField("image", localImageUrl);
    if (!formData.imageAlt) {
      updateField("imageAlt", formData.title || "Blog thumbnail image");
    }
  };

  const toBlogPayload = (status) => ({
    ...blog,
    title: formData.title.trim(),
    slug: formData.slug.trim(),
    description: formData.description.trim(),
    category: formData.category,
    image: formData.image.trim(),
    imageAlt: formData.imageAlt.trim(),
    status,
    readTime: `${Math.max(1, Math.ceil(formData.content.split(/\s+/).filter(Boolean).length / 220))} min`,
    contentSections: formData.content
      .split(/\n\n+/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean)
      .map((text) => ({ type: "paragraph", text })),
  });

  return (
    <section className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 shadow-card p-6 space-y-6">
      <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 mb-2">
        {blog ? "Edit Article" : "New Article"}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 sm:col-span-2">
          <span>Title</span>
          <input
            type="text"
            value={formData.title}
            onChange={(event) => updateField("title", event.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 px-3.5 py-2.5 placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none transition-colors duration-150 mt-1.5"
            placeholder="How to optimize your social content workflow"
          />
        </label>

        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 sm:col-span-2">
          <span>Slug</span>
          <input
            type="text"
            value={formData.slug}
            onChange={(event) => {
              setSlugTouched(true);
              updateField("slug", slugifyTitle(event.target.value));
            }}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 px-3.5 py-2.5 placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none transition-colors duration-150 mt-1.5"
            placeholder="how-to-optimize-social-content"
          />
        </label>

        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 sm:col-span-2">
          <span>Description</span>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(event) => updateField("description", event.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 px-3.5 py-2.5 placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none transition-colors duration-150 resize-none mt-1.5"
            placeholder="Short SEO description used in listing and meta tags"
          />
        </label>

        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 sm:col-span-2">
          <span>Content</span>
          <textarea
            rows={8}
            value={formData.content}
            onChange={(event) => updateField("content", event.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 px-3.5 py-2.5 placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none transition-colors duration-150 mt-1.5"
            placeholder="Write your article content. Separate paragraphs with blank lines."
          />
        </label>

        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
          <span>Category</span>
          <select
            value={formData.category}
            onChange={(event) => updateField("category", event.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 px-3.5 py-2.5 placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none transition-colors duration-150 mt-1.5"
          >
            <option value="">Select category</option>
            {BLOG_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
          <span>Status</span>
          <select
            value={formData.status}
            onChange={(event) => updateField("status", event.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 px-3.5 py-2.5 placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none transition-colors duration-150 mt-1.5"
          >
            <option value="draft">Draft</option>
            <option value="published">Publish</option>
          </select>
        </label>

        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 sm:col-span-2">
          <span>Thumbnail URL</span>
          <input
            type="url"
            value={formData.image}
            onChange={(event) => updateField("image", event.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 px-3.5 py-2.5 placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none transition-colors duration-150 mt-1.5"
            placeholder="https://example.com/thumbnail.jpg"
          />
        </label>

        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 sm:col-span-2">
          <span>Or Upload Thumbnail</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 px-3.5 py-2.5 placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none transition-colors duration-150 mt-1.5"
          />
        </label>

        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 sm:col-span-2">
          <span>Image Alt Text</span>
          <input
            type="text"
            value={formData.imageAlt}
            onChange={(event) => updateField("imageAlt", event.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 px-3.5 py-2.5 placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none transition-colors duration-150 mt-1.5"
            placeholder="Describe the featured image for accessibility and SEO"
          />
        </label>
      </div>

      <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-3 pt-4 border-t border-slate-200/60 dark:border-slate-800">
        <button
          onClick={onCancel}
          className="bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-150"
        >
          Cancel
        </button>
        <button
          onClick={() => onSaveDraft(toBlogPayload("draft"))}
          className="bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-150"
        >
          Save Draft
        </button>
        <button
          onClick={() => onPublish(toBlogPayload("published"))}
          className="bg-gradient-to-r from-brand-600 to-accent-500 text-white font-medium rounded-xl px-4 py-2.5 shadow-sm hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98] transition-all duration-150 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-sm"
        >
          Publish
        </button>
      </div>
    </section>
  );
};

export default BlogEditor;
