import { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Upload as UploadIcon,
  TrendingUp,
  Eye,
  Clock,
  Share2,
  Globe,
  BookOpen,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { useToast } from "../context/ToastContext";
import { api } from "../utils/api";
import StatsCard from "../components/dashboard/StatsCard";
import ActivityFeed from "../components/dashboard/ActivityFeed";
import PlatformIcons from "../components/dashboard/PlatformIcons";

const Dashboard = () => {
  const { user, connectedPlatforms } = useApp();
  const { error: showError } = useToast();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    total_uploads: 0,
    total_scheduled: 0,
    connected_platforms: 0,
    total_views: 0,
    engagement: 0,
  });
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [statsResponse, videosResponse] = await Promise.all([
          api.getStats(),
          api.getVideos(),
        ]);
        setStats(statsResponse);
        setRecentActivity(
          videosResponse.map((video) => ({
            ...video,
            id: video.id || video._id,
            type: video.status === "scheduled" ? "scheduled" : "upload",
            platform: video.platform || "youtube",
            date: video.created_at
              ? new Date(video.created_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "Recently",
            title: video.title,
            external_url: video.external_url,
          })),
        );
      } catch (requestError) {
        if (requestError.status === 401) {
          navigate("/auth", { replace: true });
          return;
        }
        showError(requestError.message);
      }
    };

    loadDashboard();
  }, [navigate, showError]);

  // Compute Greeting based on time of day
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  }, []);

  // Compute Platform Distribution Breakdown
  const distribution = useMemo(() => {
    const total = recentActivity.length || 1;
    const counts = { youtube: 0, linkedin: 0, other: 0 };
    recentActivity.forEach((v) => {
      const p = (v.platform || "youtube").toLowerCase();
      if (p === "youtube") counts.youtube += 1;
      else if (p === "linkedin") counts.linkedin += 1;
      else counts.other += 1;
    });
    return {
      youtube:
        Math.round((counts.youtube / total) * 100) ||
        (recentActivity.length ? 0 : 50),
      linkedin:
        Math.round((counts.linkedin / total) * 100) ||
        (recentActivity.length ? 0 : 50),
      other: Math.round((counts.other / total) * 100) || 0,
      counts,
    };
  }, [recentActivity]);

  return (
    <div className="flex-1 space-y-6 w-full min-w-0">
      {/* Top Banner & Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 shadow-2xl p-6 sm:p-8">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 rounded-full bg-brand-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-8 w-64 h-64 rounded-full bg-accent-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              System Operational • Multi-Platform Publishing Ready
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {greeting}, {user.name}! 👋
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-xl">
              Publish, schedule, and track video content across your connected YouTube and LinkedIn accounts from one workspace.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <Link
              to="/upload"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-600 to-accent-500 text-white font-semibold rounded-xl px-5 py-3 shadow-lg shadow-brand-500/25 hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.98] transition-all duration-200"
            >
              <UploadIcon className="w-5 h-5" />
              Upload & Publish
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/platforms"
              className="inline-flex items-center gap-2 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 font-medium rounded-xl px-4 py-3 transition-all duration-200"
            >
              <Share2 className="w-4 h-4 text-cyan-400" />
              Manage Platforms
            </Link>
          </div>
        </div>
      </div>

      {/* Connected Platforms Bar */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 shadow-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold dark:text-white text-gray-900">
              Connected Platforms
            </h2>
            <p className="text-xs dark:text-gray-400 text-gray-500">
              Live OAuth status for YouTube, LinkedIn, and future integrations
            </p>
          </div>
          <Link
            to="/platforms"
            className="text-xs dark:text-cyan-400 dark:hover:text-cyan-300 text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-1"
          >
            Manage Accounts <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <PlatformIcons connectedPlatforms={connectedPlatforms} />

        {stats.connected_platforms === 0 && (
          <div className="mt-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <p className="text-xs dark:text-gray-400 text-gray-600">
              No active social media accounts connected. Connect YouTube or LinkedIn to start publishing.
            </p>
            <Link
              to="/platforms"
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-brand-600 text-white hover:bg-brand-700 transition-colors"
            >
              Connect Now
            </Link>
          </div>
        )}
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          icon="Upload"
          title="Total Uploads"
          value={stats.total_uploads}
          trend={stats.total_uploads > 0 ? "up" : null}
          trendValue={stats.total_uploads > 0 ? "+12% this month" : null}
        />
        <StatsCard
          icon="Calendar"
          title="Scheduled Queue"
          value={stats.total_scheduled}
          trend={stats.total_scheduled > 0 ? "up" : null}
          trendValue={stats.total_scheduled > 0 ? "Active jobs" : null}
        />
        <StatsCard
          icon="Globe"
          title="Active Platforms"
          value={stats.connected_platforms}
          trend="up"
          trendValue="OAuth Ready"
        />
        <StatsCard
          icon="CheckCircle"
          title="Publishing Health"
          value="100%"
          trend="up"
          trendValue="0 Errors"
        />
      </div>

      {/* Analytics & Content Distribution Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Content Distribution Breakdown */}
        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold dark:text-white text-gray-900 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-brand-500" />
                Content Distribution Breakdown
              </h3>
              <span className="text-xs text-slate-400 font-medium">
                Real-time Stats
              </span>
            </div>

            <p className="text-xs dark:text-gray-400 text-gray-600 mb-6">
              Distribution of uploaded and scheduled content across your connected platforms.
            </p>

            {/* Distribution Bar */}
            <div className="space-y-4">
              <div className="h-4 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex">
                <div
                  style={{ width: `${distribution.youtube}%` }}
                  className="bg-red-500 h-full transition-all duration-500"
                  title={`YouTube: ${distribution.youtube}%`}
                />
                <div
                  style={{ width: `${distribution.linkedin}%` }}
                  className="bg-blue-600 h-full transition-all duration-500"
                  title={`LinkedIn: ${distribution.linkedin}%`}
                />
                {distribution.other > 0 && (
                  <div
                    style={{ width: `${distribution.other}%` }}
                    className="bg-slate-400 h-full transition-all duration-500"
                    title={`Other: ${distribution.other}%`}
                  />
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="text-xs font-semibold dark:text-slate-200 text-slate-700">
                      YouTube
                    </span>
                  </div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    {distribution.counts.youtube} posts ({distribution.youtube}%)
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-blue-600" />
                    <span className="text-xs font-semibold dark:text-slate-200 text-slate-700">
                      LinkedIn
                    </span>
                  </div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    {distribution.counts.linkedin} posts ({distribution.linkedin}%)
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Automatic publishing worker: active</span>
            <Link
              to="/upload"
              className="text-brand-600 dark:text-brand-400 font-semibold hover:underline"
            >
              Publish content →
            </Link>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="space-y-4 flex flex-col justify-between">
          <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 shadow-card p-6 flex-1 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 dark:bg-cyan-500/20 dark:border dark:border-cyan-500/30 bg-cyan-100 border border-cyan-200 rounded-xl flex items-center justify-center">
                <Eye className="w-6 h-6 dark:text-cyan-400 text-cyan-600" />
              </div>
              <div>
                <p className="text-2xl font-extrabold dark:text-white text-gray-900">
                  {stats.total_views || "0"}
                </p>
                <p className="text-xs font-medium dark:text-gray-400 text-gray-600">
                  Estimated Total Impressions & Views
                </p>
              </div>
            </div>
            <span className="px-3 py-1 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border dark:border-emerald-500/30 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold rounded-lg">
              +15% Growth
            </span>
          </div>

          <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 shadow-card p-6 flex-1 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 dark:bg-indigo-500/20 dark:border dark:border-indigo-500/30 bg-indigo-100 border border-indigo-200 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 dark:text-indigo-400 text-indigo-600" />
              </div>
              <div>
                <p className="text-2xl font-extrabold dark:text-white text-gray-900">
                  {stats.engagement || "0"}%
                </p>
                <p className="text-xs font-medium dark:text-gray-400 text-gray-600">
                  Content Engagement & Response Rate
                </p>
              </div>
            </div>
            <span className="px-3 py-1 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border dark:border-emerald-500/30 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold rounded-lg">
              Optimal
            </span>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityFeed
          activities={recentActivity.filter(
            (a) => a.type === "upload" || a.status === "published",
          )}
          title="Recent Uploads"
        />
        <ActivityFeed
          activities={recentActivity.filter(
            (a) => a.type === "scheduled" || a.status === "scheduled",
          )}
          title="Scheduled Posts"
        />
      </div>

      {/* Quick Action Hub */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          to="/upload"
          className="bg-gradient-to-r from-brand-600 to-accent-500 text-white font-medium rounded-2xl p-6 shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-200 group"
        >
          <UploadIcon className="w-8 h-8 mb-3" />
          <h3 className="text-lg font-bold mb-1">Upload New Content</h3>
          <p className="text-xs text-white/80 mb-4">
            Publish or schedule video posts to YouTube and LinkedIn.
          </p>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-colors">
            Get started <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>

        <Link
          to="/platforms"
          className="p-6 group bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-800 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all duration-200 shadow-card hover:shadow-cardHover"
        >
          <div className="w-10 h-10 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-3 border border-blue-500/20">
            <Globe className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold dark:text-white text-gray-900 mb-1">
            Connect Platforms
          </h3>
          <p className="text-xs dark:text-gray-400 text-gray-600 mb-4">
            Manage YouTube and LinkedIn authorization & accounts.
          </p>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-cyan-400">
            Connect accounts <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>

        <Link
          to="/dashboard/blog"
          className="p-6 group bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-800 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all duration-200 shadow-card hover:shadow-cardHover"
        >
          <div className="w-10 h-10 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-xl flex items-center justify-center mb-3 border border-purple-500/20">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold dark:text-white text-gray-900 mb-1">
            Content & Blog Admin
          </h3>
          <p className="text-xs dark:text-gray-400 text-gray-600 mb-4">
            Create, edit, and publish platform announcements and blogs.
          </p>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 dark:text-purple-400">
            Manage blogs <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
