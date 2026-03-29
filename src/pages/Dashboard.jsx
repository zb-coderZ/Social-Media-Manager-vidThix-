import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Upload as UploadIcon,
  TrendingUp,
  Eye,
  Clock,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import StatsCard from "../components/dashboard/StatsCard";
import ActivityFeed from "../components/dashboard/ActivityFeed";
import PlatformIcons from "../components/dashboard/PlatformIcons";
import { RECENT_ACTIVITY } from "../utils/dummyData";

const Dashboard = () => {
  const { user, stats, connectedPlatforms, uploads, scheduledPosts } = useApp();
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    // Combine uploads and scheduled posts for activity feed
    const combined = [
      ...uploads.map((u) => ({ ...u, type: "upload" })),
      ...scheduledPosts.map((s) => ({ ...s, type: "scheduled" })),
    ]
      .sort(
        (a, b) =>
          new Date(b.timestamp || b.createdAt) -
          new Date(a.timestamp || b.createdAt),
      )
      .slice(0, 5);

    // Use dummy data if no real activity
    setRecentActivity(
      combined.length > 0 ? combined : RECENT_ACTIVITY.slice(0, 5),
    );
  }, [uploads, scheduledPosts]);

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold dark:text-white text-gray-900 mb-2">
            Welcome back, {user.name}! 👋
          </h1>
          <p className="dark:text-gray-400 text-gray-600">
            Here's what's happening with your content today.
          </p>
        </div>

        <Link
          to="/upload"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-glow-orange hover:-translate-y-0.5 group transform"
        >
          <UploadIcon className="w-5 h-5" />
          Upload Content
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
        </Link>
      </div>

      {/* Connected Platforms */}
      <div className="p-6 dark:bg-navy-800/60 dark:backdrop-blur-xl dark:border dark:border-indigo-600/30 bg-white/60 backdrop-blur-xl border border-gray-200/50 rounded-2xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold dark:text-white text-gray-900">
            Connected Platforms
          </h2>
          <Link
            to="/platforms"
            className="text-sm dark:text-cyan-400 dark:hover:text-cyan-300 text-indigo-600 hover:text-indigo-700 font-semibold"
          >
            Manage →
          </Link>
        </div>
        <PlatformIcons connectedPlatforms={connectedPlatforms} />
        {stats.connectedPlatforms === 0 && (
          <p className="text-sm dark:text-gray-500 text-gray-600 mt-4">
            No platforms connected yet.{" "}
            <Link
              to="/platforms"
              className="dark:text-cyan-400 dark:hover:text-cyan-300 text-indigo-600 hover:text-indigo-700 font-semibold"
            >
              Connect your first platform
            </Link>
          </p>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          icon="Upload"
          title="Total Uploads"
          value={stats.totalUploads}
          trend={stats.totalUploads > 0 ? "up" : null}
          trendValue={stats.totalUploads > 0 ? "+12%" : null}
        />
        <StatsCard
          icon="Calendar"
          title="Scheduled Posts"
          value={stats.scheduledPosts}
          trend={stats.scheduledPosts > 0 ? "up" : null}
          trendValue={stats.scheduledPosts > 0 ? "+8%" : null}
        />
        <StatsCard
          icon="Target"
          title="Avg SEO Score"
          value={stats.avgSEOScore}
          trend={
            stats.avgSEOScore >= 70
              ? "up"
              : stats.avgSEOScore > 0
                ? "neutral"
                : null
          }
          trendValue={stats.avgSEOScore > 0 ? `${stats.avgSEOScore}/100` : null}
        />
        <StatsCard
          icon="Globe"
          title="Connected Platforms"
          value={stats.connectedPlatforms}
        />
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart Placeholder */}
        <div className="p-6 dark:bg-navy-800/60 dark:backdrop-blur-xl dark:border dark:border-indigo-600/30 bg-white/60 backdrop-blur-xl border border-gray-200/50 rounded-2xl">
          <h3 className="text-lg font-bold dark:text-white text-gray-900 mb-4">
            Upload Trends
          </h3>
          <div className="h-64 dark:bg-gradient-to-br dark:from-indigo-600/10 dark:to-cyan-500/10 dark:border dark:border-indigo-500/20 bg-gradient-to-br from-indigo-100 to-cyan-100 border border-indigo-200 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 dark:text-indigo-400 text-indigo-600 mx-auto mb-3" />
              <p className="dark:text-gray-300 text-gray-700 font-medium">Chart visualization</p>
              <p className="text-sm dark:text-gray-500 text-gray-600 mt-1">
                Your upload trends over time
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-4">
          <div className="p-6 dark:bg-navy-800/60 dark:backdrop-blur-xl dark:border dark:border-indigo-600/30 bg-white/60 backdrop-blur-xl border border-gray-200/50 rounded-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 dark:bg-cyan-500/20 dark:border dark:border-cyan-500/30 bg-cyan-100 border border-cyan-200 rounded-lg flex items-center justify-center">
                  <Eye className="w-5 h-5 dark:text-cyan-400 text-cyan-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold dark:text-white text-gray-900">
                    {stats.totalViews || "0"}
                  </p>
                  <p className="text-sm dark:text-gray-400 text-gray-600">Total Views</p>
                </div>
              </div>
              <span className="px-3 py-1 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border dark:border-emerald-500/30 bg-emerald-50 text-emerald-700 border border-emerald-200 text-sm font-semibold rounded-lg">
                +15%
              </span>
            </div>
          </div>

          <div className="p-6 dark:bg-navy-800/60 dark:backdrop-blur-xl dark:border dark:border-indigo-600/30 bg-white/60 backdrop-blur-xl border border-gray-200/50 rounded-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 dark:bg-indigo-500/20 dark:border dark:border-indigo-500/30 bg-indigo-100 border border-indigo-200 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 dark:text-indigo-400 text-indigo-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold dark:text-white text-gray-900">
                    {stats.engagement || "0"}%
                  </p>
                  <p className="text-sm dark:text-gray-400 text-gray-600">Engagement Rate</p>
                </div>
              </div>
              <span className="px-3 py-1 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border dark:border-emerald-500/30 bg-emerald-50 text-emerald-700 border border-emerald-200 text-sm font-semibold rounded-lg">
                +8%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
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

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link
          to="/upload"
          className="p-6 dark:bg-gradient-to-br dark:from-orange-500 dark:to-orange-600 dark:hover:from-orange-600 dark:hover:to-orange-700 dark:text-white dark:hover:shadow-glow-orange bg-gradient-to-br from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white rounded-2xl hover:shadow-md hover:-translate-y-1 transition-all duration-200 group transform"
        >
          <UploadIcon className="w-8 h-8 mb-3" />
          <h3 className="text-lg font-bold mb-1">Upload New Content</h3>
          <p className="text-sm dark:text-orange-100 text-orange-50 mb-3">
            Upload and optimize your next video
          </p>
          <span className="inline-flex items-center gap-1 text-sm font-semibold">
            Get started
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </span>
        </Link>

        <Link
          to="/seo"
          className="p-6 dark:bg-gradient-to-br dark:from-indigo-600 dark:to-indigo-700 dark:hover:from-indigo-700 dark:hover:to-indigo-800 dark:text-white dark:hover:shadow-glow bg-gradient-to-br from-indigo-400 to-indigo-500 hover:from-indigo-500 hover:to-indigo-600 text-white rounded-2xl hover:shadow-md hover:-translate-y-1 transition-all duration-200 group transform"
        >
          <TrendingUp className="w-8 h-8 mb-3" />
          <h3 className="text-lg font-bold mb-1">SEO Analyzer</h3>
          <p className="text-sm dark:text-indigo-100 text-indigo-50 mb-3">
            Optimize your content for better reach
          </p>
          <span className="inline-flex items-center gap-1 text-sm font-semibold">
            Analyze now
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </span>
        </Link>

        <Link
          to="/platforms"
          className="p-6 dark:bg-navy-800/60 dark:backdrop-blur-xl dark:border dark:border-indigo-600/30 dark:hover:border-cyan-400/50 dark:hover:shadow-glow-cyan dark:text-white dark:hover:-translate-y-1 bg-white/60 backdrop-blur-xl border border-gray-200/50 hover:border-indigo-300/50 hover:shadow-md text-gray-900 hover:-translate-y-1 rounded-2xl transition-all duration-200 group"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-cyan-500 dark:from-indigo-600 dark:to-cyan-500 from-indigo-400 to-cyan-400 rounded-lg flex items-center justify-center mb-3 dark:shadow-glow shadow-md">
            <span className="text-white font-bold">+</span>
          </div>
          <h3 className="text-lg font-bold dark:text-white text-gray-900 mb-1">
            Connect Platforms
          </h3>
          <p className="text-sm dark:text-gray-400 text-gray-600 mb-3">
            Link your social media accounts
          </p>
          <span className="inline-flex items-center gap-1 text-sm font-semibold dark:text-cyan-400 text-indigo-600">
            Connect now
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
