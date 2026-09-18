import { useCallback, useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Calendar,
  XCircle,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  Search,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useToast } from "../context/ToastContext";
import { api } from "../utils/api";
import { getIconByName } from "../utils/iconMap";

const PLATFORM_CONFIG = {
  all: { name: "All Platforms", icon: "Globe", color: "text-brand-500", bg: "bg-brand-500/10" },
  youtube: { name: "YouTube", icon: "Youtube", color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/20" },
  linkedin: { name: "LinkedIn", icon: "Linkedin", color: "text-blue-600", bg: "bg-blue-600/10", border: "border-blue-600/20" },
  instagram: { name: "Instagram", icon: "Instagram", color: "text-pink-500", bg: "bg-pink-500/10", border: "border-pink-500/20" },
  tiktok: { name: "TikTok", icon: "Music", color: "text-slate-900 dark:text-slate-100", bg: "bg-slate-500/10", border: "border-slate-500/20" },
  facebook: { name: "Facebook", icon: "Facebook", color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
};

const formatScheduledTime = (value) => {
  if (!value) return "Scheduled";
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
};

const getRelativeTime = (value) => {
  if (!value) return "";
  const diffMs = new Date(value) - new Date();
  if (diffMs <= 0) return "Completed / Due";

  const diffMins = Math.round(diffMs / 60000);
  if (diffMins < 60) return `In ${diffMins} min${diffMins > 1 ? "s" : ""}`;

  const diffHours = Math.round(diffMins / 60);
  if (diffHours < 24) return `In ${diffHours} hour${diffHours > 1 ? "s" : ""}`;

  const diffDays = Math.round(diffHours / 24);
  return `In ${diffDays} day${diffDays > 1 ? "s" : ""}`;
};

const Scheduled = () => {
  const navigate = useNavigate();
  const { success, error: showError } = useToast();
  const [scheduledPosts, setScheduledPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);
  const [activePlatform, setActivePlatform] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const loadScheduled = useCallback(async () => {
    setIsLoading(true);
    try {
      setScheduledPosts(await api.getScheduled());
    } catch (requestError) {
      if (requestError.status === 401) {
        navigate("/auth", { replace: true });
        return;
      }
      showError(requestError.message);
    } finally {
      setIsLoading(false);
    }
  }, [navigate, showError]);

  useEffect(() => {
    loadScheduled();
  }, [loadScheduled]);

  const handleCancel = async (postId) => {
    setCancellingId(postId);
    try {
      await api.deleteScheduled(postId);
      await loadScheduled();
      success("Scheduled post cancelled successfully.");
    } catch (requestError) {
      if (requestError.status === 401) {
        navigate("/auth", { replace: true });
        return;
      }
      showError(requestError.message);
    } finally {
      setCancellingId(null);
    }
  };

  // Platform Counts
  const platformCounts = useMemo(() => {
    const counts = { all: scheduledPosts.length };
    Object.keys(PLATFORM_CONFIG).forEach((p) => {
      if (p !== "all") counts[p] = 0;
    });
    scheduledPosts.forEach((post) => {
      const pKey = (post.platform || "youtube").toLowerCase();
      if (counts[pKey] !== undefined) {
        counts[pKey] += 1;
      }
    });
    return counts;
  }, [scheduledPosts]);

  // Filtered Posts
  const filteredPosts = useMemo(() => {
    return scheduledPosts.filter((post) => {
      const pKey = (post.platform || "youtube").toLowerCase();
      const matchesPlatform = activePlatform === "all" || pKey === activePlatform;
      const matchesStatus =
        statusFilter === "all" || post.status === statusFilter;
      const title = post.video_title || `${post.platform} video`;
      const matchesSearch =
        !searchQuery.trim() ||
        title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pKey.includes(searchQuery.toLowerCase());

      return matchesPlatform && matchesStatus && matchesSearch;
    });
  }, [scheduledPosts, activePlatform, statusFilter, searchQuery]);

  // Stats Summary
  const stats = useMemo(() => {
    const pending = scheduledPosts.filter((p) => p.status === "pending").length;
    const completed = scheduledPosts.filter((p) => p.status === "completed").length;
    return { pending, completed, total: scheduledPosts.length };
  }, [scheduledPosts]);

  return (
    <div className="flex-1 space-y-6 max-w-5xl mx-auto w-full min-w-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold dark:text-white text-gray-900 mb-2">
            Scheduled Post Queue
          </h1>
          <p className="dark:text-gray-400 text-gray-600">
            Automated multi-platform publishing timeline for YouTube & LinkedIn.
          </p>
        </div>

        <Link
          to="/upload"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-600 to-accent-500 text-white font-semibold rounded-xl px-4 py-2.5 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 shrink-0"
        >
          <Plus className="w-5 h-5" />
          Schedule New Content
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl shadow-card flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-bold dark:text-white text-slate-900">{stats.pending}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Pending Queue</p>
            </div>
          </div>
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            Active
          </span>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl shadow-card flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-xl flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-bold dark:text-white text-slate-900">{stats.completed}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Published / Done</p>
            </div>
          </div>
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            Automated
          </span>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl shadow-card flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-500/10 border border-brand-500/20 text-brand-500 rounded-xl flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-bold dark:text-white text-slate-900">APScheduler</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Background Worker</p>
            </div>
          </div>
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Running
          </span>
        </div>
      </div>

      {/* Main Container */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 shadow-card p-6 w-full min-w-0 space-y-6">
        {/* Controls Bar: Platform Tabs & Search */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          {/* Platform Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            {Object.entries(PLATFORM_CONFIG).map(([key, cfg]) => {
              const count = platformCounts[key] || 0;
              const isActive = activePlatform === key;
              const TabIcon = getIconByName(cfg.icon, "Globe");

              return (
                <button
                  key={key}
                  onClick={() => setActivePlatform(key)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 whitespace-nowrap ${
                    isActive
                      ? "bg-slate-900 text-white dark:bg-brand-600 dark:text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200"
                  }`}
                >
                  <TabIcon className={`w-3.5 h-3.5 ${isActive ? "text-white" : cfg.color}`} />
                  <span>{cfg.name}</span>
                  {count > 0 && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Search & Filter */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search scheduled posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs font-medium dark:bg-slate-800 dark:border-slate-700 dark:text-white bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 text-xs font-semibold dark:bg-slate-800 dark:border-slate-700 dark:text-white bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending Queue</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Content Area */}
        {isLoading ? (
          <div className="py-12">
            <LoadingSpinner size="lg" text="Loading scheduled post queue..." />
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="py-16 text-center dark:text-gray-400 text-gray-600 bg-slate-50/50 dark:bg-slate-800/30 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
            <div className="w-14 h-14 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-7 h-7 text-slate-400 dark:text-slate-500" />
            </div>
            <p className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">
              No scheduled posts found
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-4">
              {activePlatform === "all"
                ? "You don't have any upcoming posts scheduled in your queue."
                : `No scheduled posts currently lined up for ${PLATFORM_CONFIG[activePlatform]?.name}.`}
            </p>
            <Link
              to="/upload"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2.5 rounded-xl bg-brand-600 text-white hover:bg-brand-700 transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" /> Schedule Content Now
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredPosts.map((post) => {
              const postId = post.id || post._id;
              const pKey = (post.platform || "youtube").toLowerCase();
              const cfg = PLATFORM_CONFIG[pKey] || PLATFORM_CONFIG.youtube;
              const PlatformIcon = getIconByName(cfg.icon, "Globe");
              const postTitle = post.video_title || `${cfg.name} Content`;
              const relativeTimeStr = getRelativeTime(post.scheduled_time);

              const getStatusBadge = (statusVal) => {
                switch (statusVal) {
                  case "completed":
                    return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
                  case "pending":
                    return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
                  case "cancelled":
                    return "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700";
                  case "failed":
                    return "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20";
                  default:
                    return "bg-slate-100 text-slate-600 border-slate-200";
                }
              };

              return (
                <div
                  key={postId}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 shadow-card hover:shadow-cardHover hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200"
                >
                  <div className="flex items-start gap-4 min-w-0">
                    <div className={`w-11 h-11 ${cfg.bg} rounded-xl flex items-center justify-center flex-shrink-0 border ${cfg.border || "border-slate-200 dark:border-slate-800"}`}>
                      <PlatformIcon className={`w-5 h-5 ${cfg.color}`} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate mb-1">
                        {postTitle}
                      </h4>

                      <div className="flex items-center gap-2 flex-wrap text-xs text-slate-500 dark:text-slate-400">
                        <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {formatScheduledTime(post.scheduled_time)}
                        </span>
                        <span>•</span>
                        <span className="capitalize font-medium">{post.privacy_status} privacy</span>
                        {relativeTimeStr && (
                          <>
                            <span>•</span>
                            <span className="text-brand-600 dark:text-brand-400 font-semibold">
                              {relativeTimeStr}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border capitalize ${getStatusBadge(post.status)}`}>
                      {post.status}
                    </span>

                    {post.status === "pending" && (
                      <button
                        onClick={() => handleCancel(postId)}
                        disabled={cancellingId === postId}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40 border border-red-200 dark:border-red-900/60 rounded-xl px-3 py-1.5 transition-all disabled:opacity-50"
                      >
                        <XCircle className="w-4 h-4" />
                        {cancellingId === postId ? "Cancelling..." : "Cancel"}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Scheduled;
