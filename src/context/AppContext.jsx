import { createContext, useState, useContext, useEffect } from "react";
import { PLATFORM_IDS, STORAGE_KEYS } from "../utils/constants";
import { DEFAULT_USER, INITIAL_STATS } from "../utils/dummyData";

const AppContext = createContext();

export function AppProvider({ children }) {
  // Theme state (dark/light mode)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("vidThix_theme_mode");
    if (saved) {
      return JSON.parse(saved);
    }
    // Default to dark mode, or use system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // User state
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USER);
    return saved ? { ...DEFAULT_USER, ...JSON.parse(saved) } : DEFAULT_USER;
  });

  // Apply theme to DOM and persist to localStorage
  useEffect(() => {
    localStorage.setItem("vidThix_theme_mode", JSON.stringify(isDarkMode));

    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Connected platforms state
  const [connectedPlatforms, setConnectedPlatforms] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PLATFORMS);
    return saved
      ? JSON.parse(saved)
      : {
          [PLATFORM_IDS.YOUTUBE]: {
            connected: false,
            channelName: null,
            subscribers: null,
          },
          [PLATFORM_IDS.INSTAGRAM]: { connected: false, disabled: true },
          [PLATFORM_IDS.TIKTOK]: { connected: false, disabled: true },
          [PLATFORM_IDS.LINKEDIN]: { connected: false, disabled: true },
          [PLATFORM_IDS.FACEBOOK]: { connected: false, disabled: true },
        };
  });

  // Stats state
  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.STATS);
    return saved ? JSON.parse(saved) : INITIAL_STATS;
  });

  // Uploads state
  const [uploads, setUploads] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.UPLOADS);
    return saved ? JSON.parse(saved) : [];
  });

  // Scheduled posts state
  const [scheduledPosts, setScheduledPosts] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SCHEDULED);
    return saved ? JSON.parse(saved) : [];
  });

  // Persist user to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  }, [user]);

  // Persist connected platforms to localStorage
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.PLATFORMS,
      JSON.stringify(connectedPlatforms),
    );

    // Update connected platforms count in stats
    const connectedCount = Object.values(connectedPlatforms).filter(
      (platform) => platform.connected === true,
    ).length;

    setStats((prev) => ({ ...prev, connectedPlatforms: connectedCount }));
  }, [connectedPlatforms]);

  // Persist stats to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
  }, [stats]);

  // Persist uploads to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.UPLOADS, JSON.stringify(uploads));
  }, [uploads]);

  // Persist scheduled posts to localStorage
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.SCHEDULED,
      JSON.stringify(scheduledPosts),
    );
  }, [scheduledPosts]);

  // Update user profile
  const updateUser = (updates) => {
    setUser((prev) => ({ ...prev, ...updates }));
  };

  // Connect/disconnect platform
  const updatePlatform = (platformId, data) => {
    setConnectedPlatforms((prev) => ({
      ...prev,
      [platformId]: { ...prev[platformId], ...data },
    }));
  };

  // Connect a platform
  const connectPlatform = (platformId, connectionData) => {
    updatePlatform(platformId, { ...connectionData, connected: true });
  };

  // Disconnect a platform
  const disconnectPlatform = (platformId) => {
    updatePlatform(platformId, {
      connected: false,
      channelName: null,
      subscribers: null,
    });
  };

  // Add upload
  const addUpload = (upload) => {
    const newUpload = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      ...upload,
    };

    setUploads((prev) => [newUpload, ...prev]);

    // Update stats
    setStats((prev) => ({
      ...prev,
      totalUploads: prev.totalUploads + 1,
      avgSEOScore: calculateAverageSEO([...uploads, newUpload]),
    }));

    return newUpload;
  };

  // Add scheduled post
  const addScheduledPost = (post) => {
    const newPost = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      ...post,
    };

    setScheduledPosts((prev) => [newPost, ...prev]);

    // Update stats
    setStats((prev) => ({
      ...prev,
      scheduledPosts: prev.scheduledPosts + 1,
    }));

    return newPost;
  };

  // Remove scheduled post
  const removeScheduledPost = (postId) => {
    setScheduledPosts((prev) => prev.filter((post) => post.id !== postId));
    setStats((prev) => ({
      ...prev,
      scheduledPosts: Math.max(0, prev.scheduledPosts - 1),
    }));
  };

  // Calculate average SEO score
  const calculateAverageSEO = (uploadsList) => {
    if (uploadsList.length === 0) return 0;
    const total = uploadsList.reduce(
      (sum, upload) => sum + (upload.seoScore || 0),
      0,
    );
    return Math.round(total / uploadsList.length);
  };

  // Update stats
  const updateStats = (updates) => {
    setStats((prev) => ({ ...prev, ...updates }));
  };

  // Toggle theme (dark/light mode)
  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const value = {
    isDarkMode,
    toggleTheme,
    user,
    updateUser,
    connectedPlatforms,
    connectPlatform,
    disconnectPlatform,
    stats,
    updateStats,
    uploads,
    addUpload,
    scheduledPosts,
    addScheduledPost,
    removeScheduledPost,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}

export default AppContext;
