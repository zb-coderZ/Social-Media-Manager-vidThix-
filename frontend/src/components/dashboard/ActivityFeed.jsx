import { getIconByName } from "../../utils/iconMap";

const ActivityItem = ({ activity }) => {
  const { type, title, platform, status, date } = activity;
  // SEO temporarily disabled. Preserve this field for restoration.
  // const { seoScore } = activity;

  const getStatusColor = (status) => {
    switch (status) {
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

  const getTypeIcon = (type) => {
    switch (type) {
      case "upload":
        return "Upload";
      case "scheduled":
        return "Calendar";
      case "published":
        return "CheckCircle";
      default:
        return "File";
    }
  };

  const Icon = getIconByName(getTypeIcon(type), "File");

  return (
    <div className="flex items-start gap-4 p-4 dark:hover:bg-slate-800/40 hover:bg-slate-50 rounded-xl transition-colors duration-200">
      <div className="w-10 h-10 bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-900 rounded-lg flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-brand-600 dark:text-brand-400" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
            {title}
          </h4>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(status)}`}
          >
            {status}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {platform}
          </span>
          <span className="text-xs text-slate-400 dark:text-slate-500">•</span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {date}
          </span>
        </div>
      </div>
    </div>
  );
};

const ActivityFeed = ({ activities, title = "Recent Activity" }) => {
  const InboxIcon = getIconByName("Inbox", "File");

  if (!activities || activities.length === 0) {
    return (
      <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl shadow-card">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">
          {title}
        </h3>
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <InboxIcon className="w-8 h-8 text-slate-400 dark:text-slate-500" />
          </div>
          <p className="text-slate-500 dark:text-slate-400 font-medium">No activity yet</p>
          <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
            Your recent uploads will appear here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl shadow-card">
      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">
        {title}
      </h3>
      <div className="space-y-2">
        {activities.map((activity) => (
          <ActivityItem key={activity.id} activity={activity} />
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;
