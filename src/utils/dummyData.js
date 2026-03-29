// vidThix - Dummy Data
// All static data for the application

export const PLATFORMS = [
  {
    id: "youtube",
    name: "YouTube",
    icon: "Youtube",
    color: "#FF0000",
    enabled: true,
    status: "active",
    description: "Upload and optimize videos for YouTube",
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: "Instagram",
    color: "#E4405F",
    enabled: false,
    status: "coming-soon",
    description: "Share short-form content on Instagram",
  },
  {
    id: "tiktok",
    name: "TikTok",
    icon: "Music",
    color: "#000000",
    enabled: false,
    status: "coming-soon",
    description: "Create viral short videos for TikTok",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: "Linkedin",
    color: "#0077B5",
    enabled: false,
    status: "coming-soon",
    description: "Share professional content on LinkedIn",
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: "Facebook",
    color: "#1877F2",
    enabled: false,
    status: "coming-soon",
    description: "Post and engage on Facebook",
  },
];

export const FEATURES = [
  {
    icon: "Target",
    title: "SEO Optimization Engine",
    description:
      "Intelligent algorithm analyzes your content and provides actionable suggestions to improve discoverability and ranking.",
  },
  {
    icon: "Calendar",
    title: "Smart Scheduling",
    description:
      "Schedule your content for optimal posting times across different platforms with timezone support.",
  },
  {
    icon: "Globe",
    title: "Multi-platform Publishing",
    description:
      "Manage all your social media accounts from a single unified dashboard without switching between apps.",
  },
  {
    icon: "Shield",
    title: "Secure OAuth Integration",
    description:
      "Connect your accounts safely with industry-standard OAuth 2.0 authentication for maximum security.",
  },
  {
    icon: "BarChart3",
    title: "Performance Insights",
    description:
      "Track engagement metrics, views, and performance across all platforms with comprehensive analytics.",
  },
];

export const WORKFLOW_STEPS = [
  {
    step: 1,
    title: "Connect Platform",
    description:
      "Securely connect your social media accounts using OAuth authentication.",
    icon: "Link",
  },
  {
    step: 2,
    title: "Upload Content",
    description:
      "Drag and drop your videos with instant preview and file validation.",
    icon: "Upload",
  },
  {
    step: 3,
    title: "Optimize SEO",
    description:
      "Get intelligent suggestions to improve your content visibility and ranking.",
    icon: "Sparkles",
  },
  {
    step: 4,
    title: "Schedule Post",
    description:
      "Choose the perfect time to publish with timezone-aware scheduling.",
    icon: "Clock",
  },
  {
    step: 5,
    title: "Auto Publish",
    description:
      "Sit back while vidThix automatically publishes your content at the scheduled time.",
    icon: "CheckCircle",
  },
];

export const RECENT_ACTIVITY = [
  {
    id: 1,
    type: "upload",
    title: "React Tutorial - Building Modern UIs",
    platform: "youtube",
    status: "published",
    date: "2 hours ago",
    seoScore: 85,
    thumbnail: null,
  },
  {
    id: 2,
    type: "scheduled",
    title: "JavaScript ES2024 Features Explained",
    platform: "youtube",
    status: "scheduled",
    scheduledTime: "2026-03-30T14:00:00Z",
    date: "Scheduled for tomorrow",
    seoScore: 92,
    thumbnail: null,
  },
  {
    id: 3,
    type: "upload",
    title: "CSS Grid vs Flexbox - Complete Guide",
    platform: "youtube",
    status: "published",
    date: "1 day ago",
    seoScore: 78,
    thumbnail: null,
  },
  {
    id: 4,
    type: "scheduled",
    title: "Next.js 15 - What's New?",
    platform: "youtube",
    status: "scheduled",
    scheduledTime: "2026-04-01T10:00:00Z",
    date: "Scheduled for next week",
    seoScore: 88,
    thumbnail: null,
  },
  {
    id: 5,
    type: "upload",
    title: "Web Performance Optimization Tips",
    platform: "youtube",
    status: "published",
    date: "3 days ago",
    seoScore: 95,
    thumbnail: null,
  },
];

export const CATEGORIES = [
  "Education",
  "Entertainment",
  "Gaming",
  "Technology",
  "Music",
  "Sports",
  "Lifestyle",
  "Business",
  "Health & Fitness",
  "Travel",
  "Other",
];

export const TIMEZONES = [
  { value: "UTC", label: "UTC (GMT+0)" },
  { value: "America/New_York", label: "Eastern Time (GMT-5)" },
  { value: "America/Chicago", label: "Central Time (GMT-6)" },
  { value: "America/Denver", label: "Mountain Time (GMT-7)" },
  { value: "America/Los_Angeles", label: "Pacific Time (GMT-8)" },
  { value: "Europe/London", label: "London (GMT+0)" },
  { value: "Europe/Paris", label: "Paris (GMT+1)" },
  { value: "Europe/Berlin", label: "Berlin (GMT+1)" },
  { value: "Asia/Dubai", label: "Dubai (GMT+4)" },
  { value: "Asia/Kolkata", label: "India (GMT+5:30)" },
  { value: "Asia/Singapore", label: "Singapore (GMT+8)" },
  { value: "Asia/Tokyo", label: "Tokyo (GMT+9)" },
  { value: "Australia/Sydney", label: "Sydney (GMT+11)" },
];

export const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Features", href: "/#features" },
  { name: "Platforms", href: "/#platforms" },
  { name: "Pricing", href: "/#pricing" },
];

export const FOOTER_LINKS = {
  product: [
    { name: "Features", href: "#" },
    { name: "Pricing", href: "#" },
    { name: "API", href: "#" },
    { name: "Integrations", href: "#" },
  ],
  company: [
    { name: "About", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Contact", href: "#" },
  ],
  support: [
    { name: "Help Center", href: "#" },
    { name: "Documentation", href: "#" },
    { name: "Community", href: "#" },
    { name: "Status", href: "#" },
  ],
};

export const SOCIAL_LINKS = [
  { name: "Twitter", icon: "Twitter", href: "#" },
  { name: "GitHub", icon: "Github", href: "#" },
  { name: "LinkedIn", icon: "Linkedin", href: "#" },
  { name: "YouTube", icon: "Youtube", href: "#" },
];

// Initial user data
export const DEFAULT_USER = {
  name: "Demo User",
  email: "demo@vidthix.com",
  avatar: null,
};

// Initial stats
export const INITIAL_STATS = {
  totalUploads: 0,
  scheduledPosts: 0,
  avgSEOScore: 0,
  connectedPlatforms: 0,
  totalViews: 0,
  engagement: 0,
};
