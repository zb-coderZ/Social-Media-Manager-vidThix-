import { formatDate } from "./helpers";

const BLOG_STORAGE_KEY = "vidthix_blogs";

export const BLOG_STATUSES = {
  DRAFT: "draft",
  PUBLISHED: "published",
};

export const BLOG_CATEGORIES = [
  "SEO",
  "Content Strategy",
  "Automation",
  "YouTube Growth",
  "Instagram",
  "LinkedIn",
];

export const BLOG_POSTS = [
  {
    id: 1,
    title: "How to Grow Your YouTube Channel in 2026",
    slug: "how-to-grow-youtube-channel",
    description:
      "Learn proven strategies to improve CTR, retention, and discoverability with a repeatable weekly publishing system.",
    seoDescription:
      "Master YouTube growth in 2026 with keyword clustering, thumbnail testing, retention optimization, and consistent posting workflows.",
    keywords:
      "youtube growth, youtube seo, content strategy, social media automation",
    category: "SEO",
    date: "2026-03-30",
    readTime: "5 min",
    status: BLOG_STATUSES.PUBLISHED,
    views: 2451,
    image:
      "https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "YouTube SEO optimization tips shown on analytics dashboard",
    contentSections: [
      {
        type: "paragraph",
        text: "Growing on YouTube in 2026 is less about viral luck and more about systems. Channels that win consistently publish around keyword clusters, package content for clicks, and keep viewers watching longer.",
      },
      { type: "h2", text: "1. Build a Topic Cluster, Not Random Videos" },
      {
        type: "paragraph",
        text: "Pick 3-5 audience problems you can solve repeatedly. Each topic should include beginner, intermediate, and advanced angles. This helps your channel become topically authoritative and easier for YouTube to recommend.",
      },
      { type: "h3", text: "Quick Cluster Example" },
      {
        type: "list",
        items: [
          "Keyword research for creators",
          "Script templates that improve retention",
          "Thumbnail frameworks by niche",
        ],
      },
      { type: "h2", text: "2. Optimize Packaging Before You Publish" },
      {
        type: "paragraph",
        text: "Your title and thumbnail are one conversion unit. Test two title options and one backup thumbnail before scheduling. Even a small CTR lift can compound impressions over time.",
      },
      { type: "h2", text: "3. Use a Weekly Production System" },
      {
        type: "paragraph",
        text: "Batch ideation, scripting, and scheduling to remove decision fatigue. Tools like vidThix make it easier to optimize SEO metadata and publish on a predictable cadence.",
      },
    ],
    internalLinks: [
      {
        label: "Best Time to Post on Instagram",
        to: "/blog/best-time-to-post-instagram",
      },
      {
        label: "Try the SEO Analyzer",
        to: "/seo",
      },
    ],
  },
  {
    id: 2,
    title: "Best Time to Post on Instagram for Maximum Reach",
    slug: "best-time-to-post-instagram",
    description:
      "Use a simple posting matrix by niche, timezone, and audience behavior to improve reach without posting more often.",
    seoDescription:
      "Find the best time to post on Instagram using audience data, testing windows, and a repeatable schedule that improves reach.",
    keywords:
      "best time to post instagram, instagram growth, social media strategy, content scheduling",
    category: "Content Strategy",
    date: "2026-03-24",
    readTime: "6 min",
    status: BLOG_STATUSES.PUBLISHED,
    views: 1832,
    image:
      "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=1400&q=80",
    imageAlt:
      "Instagram content calendar and posting schedule on mobile screen",
    contentSections: [
      {
        type: "paragraph",
        text: "Timing still matters on Instagram, but blanket advice fails. Your best window depends on content format, audience timezone, and posting consistency.",
      },
      { type: "h2", text: "1. Start With a 2-Week Time Test" },
      {
        type: "list",
        items: [
          "Test 3 weekday windows and 2 weekend windows",
          "Post similar content formats in each slot",
          "Track reach, saves, and profile visits",
        ],
      },
      { type: "h2", text: "2. Segment by Content Type" },
      {
        type: "paragraph",
        text: "Reels, carousels, and stories perform differently. Reels may peak later, while educational carousels often perform best during lunch breaks or after work.",
      },
      { type: "h2", text: "3. Convert Winners Into an Automation Schedule" },
      {
        type: "paragraph",
        text: "Once you identify your top windows, schedule content ahead of time and keep at least two weeks of posts queued. This creates consistency and removes manual posting stress.",
      },
    ],
    internalLinks: [
      {
        label: "How to Grow Your YouTube Channel in 2026",
        to: "/blog/how-to-grow-youtube-channel",
      },
      {
        label: "Manage your publishing workflow",
        to: "/dashboard",
      },
    ],
  },
  {
    id: 3,
    title: "Automating Multi-Platform Publishing Without Losing Quality",
    slug: "automating-multi-platform-publishing",
    description:
      "A practical framework for adapting one core content asset into platform-native posts with quality control.",
    seoDescription:
      "Learn how to automate multi-platform publishing while preserving brand voice, quality checks, and SEO consistency.",
    keywords:
      "social media automation, multi platform publishing, content ops, seo workflow",
    category: "Automation",
    date: "2026-03-18",
    readTime: "7 min",
    status: BLOG_STATUSES.DRAFT,
    views: 0,
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80",
    imageAlt:
      "Multi-platform social media publishing workflow on desktop dashboard",
    contentSections: [
      {
        type: "paragraph",
        text: "Automation is only useful when it preserves content quality. The right workflow separates reusable core ideas from platform-specific packaging.",
      },
    ],
    internalLinks: [
      {
        label: "Try vidThix Free",
        to: "/dashboard",
      },
    ],
  },
];

export function slugifyTitle(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function getAllBlogs() {
  if (typeof window === "undefined") return BLOG_POSTS;

  const stored = window.localStorage.getItem(BLOG_STORAGE_KEY);
  if (!stored) return BLOG_POSTS;

  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : BLOG_POSTS;
  } catch {
    return BLOG_POSTS;
  }
}

export function saveBlogs(blogs) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(blogs));
}

export function getPublishedBlogs(blogs = getAllBlogs()) {
  return blogs.filter((blog) => blog.status === BLOG_STATUSES.PUBLISHED);
}

export function getBlogBySlug(slug, blogs = getAllBlogs()) {
  return getPublishedBlogs(blogs).find((blog) => blog.slug === slug);
}

export function getPopularPosts(blogs = getAllBlogs(), limit = 4) {
  return [...getPublishedBlogs(blogs)]
    .sort((a, b) => b.views - a.views)
    .slice(0, limit);
}

export function getCategorySummary(blogs = getAllBlogs()) {
  const summary = {};

  for (const blog of getPublishedBlogs(blogs)) {
    summary[blog.category] = (summary[blog.category] || 0) + 1;
  }

  return Object.entries(summary).map(([name, count]) => ({ name, count }));
}

export function formatBlogDate(date) {
  return formatDate(date, "MMM dd, yyyy");
}
