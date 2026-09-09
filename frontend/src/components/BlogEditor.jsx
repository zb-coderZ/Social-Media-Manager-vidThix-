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
    <section className="rounded-2xl bg-white dark:bg-navy-800/70 border border-gray-200/70 dark:border-indigo-600/30 p-6 shadow-sm space-y-5">
      <h2 className="text-xl font-bold dark:text-white text-gray-900">
        {blog ? "Edit Article" : "New Article"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="block space-y-2 md:col-span-2">
          <span className="text-sm font-semibold dark:text-white text-gray-900">
            Title
          </span>
          <input
            type="text"
            value={formData.title}
            onChange={(event) => updateField("title", event.target.value)}
            className="w-full rounded-xl border border-gray-300 dark:border-indigo-600/30 bg-white dark:bg-navy-900/60 px-4 py-3 dark:text-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="How to optimize your social content workflow"
          />
        </label>

        <label className="block space-y-2 md:col-span-2">
          <span className="text-sm font-semibold dark:text-white text-gray-900">
            Slug
          </span>
          <input
            type="text"
            value={formData.slug}
            onChange={(event) => {
              setSlugTouched(true);
              updateField("slug", slugifyTitle(event.target.value));
            }}
            className="w-full rounded-xl border border-gray-300 dark:border-indigo-600/30 bg-white dark:bg-navy-900/60 px-4 py-3 dark:text-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="how-to-optimize-social-content"
          />
        </label>

        <label className="block space-y-2 md:col-span-2">
          <span className="text-sm font-semibold dark:text-white text-gray-900">
            Description
          </span>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(event) => updateField("description", event.target.value)}
            className="w-full rounded-xl border border-gray-300 dark:border-indigo-600/30 bg-white dark:bg-navy-900/60 px-4 py-3 dark:text-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
            placeholder="Short SEO description used in listing and meta tags"
          />
        </label>

        <label className="block space-y-2 md:col-span-2">
          <span className="text-sm font-semibold dark:text-white text-gray-900">
            Content
          </span>
          <textarea
            rows={8}
            value={formData.content}
            onChange={(event) => updateField("content", event.target.value)}
            className="w-full rounded-xl border border-gray-300 dark:border-indigo-600/30 bg-white dark:bg-navy-900/60 px-4 py-3 dark:text-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="Write your article content. Separate paragraphs with blank lines."
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-semibold dark:text-white text-gray-900">
            Category
          </span>
          <select
            value={formData.category}
            onChange={(event) => updateField("category", event.target.value)}
            className="w-full rounded-xl border border-gray-300 dark:border-indigo-600/30 bg-white dark:bg-navy-900/60 px-4 py-3 dark:text-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            <option value="">Select category</option>
            {BLOG_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-semibold dark:text-white text-gray-900">
            Status
          </span>
          <select
            value={formData.status}
            onChange={(event) => updateField("status", event.target.value)}
            className="w-full rounded-xl border border-gray-300 dark:border-indigo-600/30 bg-white dark:bg-navy-900/60 px-4 py-3 dark:text-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            <option value="draft">Draft</option>
            <option value="published">Publish</option>
          </select>
        </label>

        <label className="block space-y-2 md:col-span-2">
          <span className="text-sm font-semibold dark:text-white text-gray-900">
            Thumbnail URL
          </span>
          <input
            type="url"
            value={formData.image}
            onChange={(event) => updateField("image", event.target.value)}
            className="w-full rounded-xl border border-gray-300 dark:border-indigo-600/30 bg-white dark:bg-navy-900/60 px-4 py-3 dark:text-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="https://example.com/thumbnail.jpg"
          />
        </label>

        <label className="block space-y-2 md:col-span-2">
          <span className="text-sm font-semibold dark:text-white text-gray-900">
            Or Upload Thumbnail
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full rounded-xl border border-gray-300 dark:border-indigo-600/30 bg-white dark:bg-navy-900/60 px-4 py-3 dark:text-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </label>

        <label className="block space-y-2 md:col-span-2">
          <span className="text-sm font-semibold dark:text-white text-gray-900">
            Image Alt Text
          </span>
          <input
            type="text"
            value={formData.imageAlt}
            onChange={(event) => updateField("imageAlt", event.target.value)}
            className="w-full rounded-xl border border-gray-300 dark:border-indigo-600/30 bg-white dark:bg-navy-900/60 px-4 py-3 dark:text-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="Describe the featured image for accessibility and SEO"
          />
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-3 pt-2">
        <button
          onClick={() => onSaveDraft(toBlogPayload("draft"))}
          className="px-4 py-2.5 rounded-xl bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-navy-700 dark:text-gray-100 dark:hover:bg-navy-600 font-semibold transition-colors duration-200"
        >
          Save Draft
        </button>
        <button
          onClick={() => onPublish(toBlogPayload("published"))}
          className="px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold transition-colors duration-200"
        >
          Publish
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2.5 rounded-xl border border-gray-300 dark:border-indigo-600/30 dark:text-gray-200 text-gray-700 hover:bg-gray-50 dark:hover:bg-navy-700 transition-colors duration-200"
        >
          Cancel
        </button>
      </div>
    </section>
  );
};

export default BlogEditor;
