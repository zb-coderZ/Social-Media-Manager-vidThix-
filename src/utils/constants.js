// vidThix - Constants
// App-wide constants and configuration

// App metadata
export const APP_NAME = "vidThix";
export const APP_TAGLINE =
  "Manage All Your Social Media Publishing — From One Dashboard";
export const APP_DESCRIPTION =
  "Upload, optimize, and schedule content across YouTube, LinkedIn, TikTok, and Instagram.";

// Routes
export const ROUTES = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  UPLOAD: "/upload",
  SEO: "/seo",
  PLATFORMS: "/platforms",
  SETTINGS: "/settings",
  SCHEDULED: "/scheduled",
};

// Sidebar navigation items
export const SIDEBAR_ITEMS = [
  { name: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
  { name: "Upload Content", href: "/upload", icon: "Upload" },
  { name: "SEO Analyzer", href: "/seo", icon: "Target" },
  { name: "Scheduled Posts", href: "/scheduled", icon: "Calendar" },
  { name: "Platforms", href: "/platforms", icon: "Globe" },
  { name: "Settings", href: "/settings", icon: "Settings" },
];

// Toast notification durations (ms)
export const TOAST_DURATION = {
  SHORT: 2000,
  NORMAL: 3000,
  LONG: 5000,
};

// Toast types
export const TOAST_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  INFO: "info",
};

// Upload status
export const UPLOAD_STATUS = {
  IDLE: "idle",
  SELECTING: "selecting",
  UPLOADING: "uploading",
  PROCESSING: "processing",
  COMPLETE: "complete",
  ERROR: "error",
};

// Platform connection status
export const CONNECTION_STATUS = {
  CONNECTED: "connected",
  DISCONNECTED: "disconnected",
  CONNECTING: "connecting",
  DISABLED: "disabled",
};

// File upload settings
export const UPLOAD_CONFIG = {
  MAX_FILE_SIZE: 100 * 1024 * 1024, // 100MB
  ACCEPTED_VIDEO_TYPES: {
    "video/mp4": [".mp4"],
    "video/mpeg": [".mpeg", ".mpg"],
    "video/quicktime": [".mov"],
    "video/x-msvideo": [".avi"],
    "video/x-matroska": [".mkv"],
    "video/webm": [".webm"],
  },
  SIMULATION_PROGRESS_INTERVAL: 300, // ms
  SIMULATION_PROGRESS_STEP: 10, // percentage
};

// SEO scoring thresholds
export const SEO_THRESHOLDS = {
  EXCELLENT: 90,
  GOOD: 70,
  FAIR: 40,
  POOR: 0,
};

// Color scheme (matching design system)
export const COLORS = {
  PRIMARY: "#7C3AED", // violet-600
  SECONDARY: "#06B6D4", // cyan-500
  SUCCESS: "#22C55E", // green-500
  WARNING: "#F59E0B", // amber-500
  DANGER: "#EF4444", // red-500
  INFO: "#3B82F6", // blue-500
};

// Animation durations
export const ANIMATION_DURATION = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
};

// Breakpoints (should match Tailwind config)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  "2XL": 1536,
};

// Platform IDs
export const PLATFORM_IDS = {
  YOUTUBE: "youtube",
  INSTAGRAM: "instagram",
  TIKTOK: "tiktok",
  LINKEDIN: "linkedin",
  FACEBOOK: "facebook",
};

// Local storage keys
export const STORAGE_KEYS = {
  USER: "vidthix_user",
  PLATFORMS: "vidthix_connected_platforms",
  STATS: "vidthix_stats",
  UPLOADS: "vidthix_uploads",
  SCHEDULED: "vidthix_scheduled",
};

// API endpoint simulation delays (ms)
export const API_DELAYS = {
  UPLOAD: 3000,
  CONNECT_PLATFORM: 2000,
  SAVE_SETTINGS: 1000,
  CALCULATE_SEO: 500,
};
