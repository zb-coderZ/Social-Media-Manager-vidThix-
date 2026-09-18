import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Upload } from "lucide-react";
import { getIconByName } from "../../utils/iconMap";

const PLATFORM_CONFIG = {
  all: { name: "All", icon: "Globe", color: "text-brand-500", bg: "bg-brand-500/10" },
  youtube: { name: "YouTube", icon: "Youtube", color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/20" },
  linkedin: { name: "LinkedIn", icon: "Linkedin", color: "text-blue-600", bg: "bg-blue-600/10", border: "border-blue-600/20" },
  instagram: { name: "Instagram", icon: "Instagram", color: "text-pink-500", bg: "bg-pink-500/10", border: "border-pink-500/20" },
  tiktok: { name: "TikTok", icon: "Music", color: "text-slate-900 dark:text-slate-100", bg: "bg-slate-500/10", border: "border-slate-500/20" },
  facebook: { name: "Facebook", icon: "Facebook", color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
};

const ActivityItem = ({ activity }) => {
  const { title, platform = "youtube", status, date, external_url } = activity;
  const platformKey = (platform || "youtube").toLowerCase();
  const config = PLATFORM_CONFIG[platformKey] || PLATFORM_CONFIG.youtube;

  const PlatformIcon = getIconByName(config.icon, "Globe");

  const getStatusColor = (statusVal) => {
    switch (statusVal) {
      case "published":
        return "dark:bg-emerald-500/20 dark:text-emerald-400 dark:border dark:border-emerald-500/30 bg-emerald-50 text-emerald-700 border border-emerald-200";
      case "scheduled":
        return "dark:bg-accent-500/20 dark:text-accent-400 dark:border dark:border-accent-500/30 bg-accent-50 text-accent-700 border border-accent-200";
      case "draft":
        return "dark:bg-slate-800 dark:text-slate-400 dark:border dark:border-slate-700 bg-slate-100 text-slate-600 border border-slate-200";
      case "failed":
        return "dark:bg-red-500/20 dark:text-red-400 dark:border dark:border-red-500/30 bg-red-50 text-red-700 border border-red-200";
      default:
        return "dark:bg-slate-800 dark:text-slate-400 dark:border dark:border-slate-700 bg-slate-100 text-slate-600 border border-slate-200";
    }
  };

  return (
    <div className="flex items-start gap-4 p-3.5 dark:hover:bg-slate-800/40 hover:bg-slate-50 rounded-xl transition-all duration-200 border border-transparent hover:border-slate-200/50 dark:hover:border-slate-700/50">
      <div className={`w-10 h-10 ${config.bg} rounded-xl flex items-center justify-center flex-shrink-0 border ${config.border || "border-slate-200 dark:border-slate-800"}`}>
        <PlatformIcon className={`w-5 h-5 ${config.color}`} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
            {external_url ? (
              <a
                href={external_url}
                target="_blank"
                rel="noreferrer"
                className="hover:underline inline-flex items-center gap-1.5 text-slate-900 dark:text-slate-100"
              >
                <span>{typeof title === "string" ? title : title}</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 hover:text-brand-500 flex-shrink-0" />
              </a>
            ) : (
              title
            )}
          </h4>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
            {status}
          </span>
          <span className={`text-xs font-semibold capitalize ${config.color}`}>
            {config.name}
          </span>
          {date && (
            <>
              <span className="text-xs text-slate-400 dark:text-slate-500">•</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {date}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const ActivityFeed = ({ activities = [], title = "Recent Activity" }) => {
  const [activeTab, setActiveTab] = useState("all");

  const platformCounts = useMemo(() => {
    const counts = { all: activities.length };
    Object.keys(PLATFORM_CONFIG).forEach((p) => {
      if (p !== "all") counts[p] = 0;
    });
    activities.forEach((act) => {
      const pKey = (act.platform || "youtube").toLowerCase();
      if (counts[pKey] !== undefined) {
        counts[pKey] += 1;
      }
    });
    return counts;
  }, [activities]);

  const filteredActivities = useMemo(() => {
    if (activeTab === "all") return activities;
    return activities.filter(
      (a) => (a.platform || "youtube").toLowerCase() === activeTab
    );
  }, [activities, activeTab]);

  const activePlatformConfig = PLATFORM_CONFIG[activeTab] || PLATFORM_CONFIG.all;
  const ActivePlatformIcon = getIconByName(activePlatformConfig.icon, "Globe");

  return (
    <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl shadow-card flex flex-col justify-between min-w-0">
      <div>
        {/* Header & Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            {title}
            <span className="text-xs font-semibold bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-800 px-2 py-0.5 rounded-full">
              {filteredActivities.length}
            </span>
          </h3>

          {/* Platform Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {Object.entries(PLATFORM_CONFIG).map(([key, cfg]) => {
              const count = platformCounts[key] || 0;
              const isActive = activeTab === key;
              const TabIcon = getIconByName(cfg.icon, "Globe");

              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 whitespace-nowrap ${
                    isActive
                      ? "bg-slate-900 text-white dark:bg-brand-600 dark:text-white shadow-sm font-semibold"
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
        </div>

        {/* Content List or Platform Empty State */}
        {filteredActivities.length === 0 ? (
          <div className="text-center py-10 px-4 my-2 rounded-xl bg-slate-50/50 dark:bg-slate-800/30 border border-dashed border-slate-200 dark:border-slate-800">
            <div className={`w-12 h-12 ${activePlatformConfig.bg} rounded-2xl flex items-center justify-center mx-auto mb-3 border ${activePlatformConfig.border || "border-slate-200 dark:border-slate-700"}`}>
              <ActivePlatformIcon className={`w-6 h-6 ${activePlatformConfig.color}`} />
            </div>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              No {activeTab === "all" ? "" : activePlatformConfig.name} {title.toLowerCase()} yet
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-4">
              {activeTab === "all"
                ? "Your content uploads will appear here when ready."
                : `Connect and publish your video content directly to ${activePlatformConfig.name}.`}
            </p>
            <Link
              to="/upload"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-brand-600 text-white hover:bg-brand-700 transition-colors shadow-sm"
            >
              <Upload className="w-3.5 h-3.5" />
              Upload to {activeTab === "all" ? "Platforms" : activePlatformConfig.name}
            </Link>
          </div>
        ) : (
          <div className="space-y-1">
            {filteredActivities.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityFeed;
