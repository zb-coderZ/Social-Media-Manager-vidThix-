export const FOOTER_PAGE_CONTENT = {
  api: {
    title: "API",
    description:
      "Explore vidThix API capabilities for scheduling, SEO enrichment, and platform publishing workflows.",
  },
  integrations: {
    title: "Integrations",
    description:
      "Connect vidThix with YouTube, LinkedIn, Instagram, and your internal automation stack.",
  },
  about: {
    title: "About vidThix",
    description:
      "vidThix helps teams publish smarter social content with SEO-first workflows and automation.",
  },
  careers: {
    title: "Careers",
    description:
      "Join our team building modern tools for creators, marketers, and social media operators.",
  },
  contact: {
    title: "Contact",
    description:
      "Reach us for sales, product support, or partnership requests.",
  },
  "help-center": {
    title: "Help Center",
    description:
      "Find setup guides, troubleshooting steps, and best practices for daily publishing.",
  },
  documentation: {
    title: "Documentation",
    description:
      "Read detailed implementation docs for platform setup, optimization, and scheduling.",
  },
  community: {
    title: "Community",
    description:
      "Connect with other vidThix users, share ideas, and learn proven growth workflows.",
  },
  status: {
    title: "Status",
    description:
      "Monitor system uptime and incident updates for the vidThix platform.",
  },
  "privacy-policy": {
    title: "Privacy Policy",
    description:
      "Understand how vidThix handles user data, processing, and account-level privacy controls.",
  },
  "terms-of-service": {
    title: "Terms of Service",
    description:
      "Review usage terms, billing policies, and legal conditions for using vidThix.",
  },
  "cookie-policy": {
    title: "Cookie Policy",
    description:
      "Learn how cookies are used for analytics, authentication, and user experience preferences.",
  },
};

export function getFooterPage(slug) {
  return FOOTER_PAGE_CONTENT[slug] || null;
}
