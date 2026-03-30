import { getIconByName } from "../../utils/iconMap";
import { formatRelativeTime } from "../../utils/helpers";

const ActivityItem = ({ activity }) => {
  const { type, title, platform, status, date, seoScore } = activity;

  const getStatusColor = (status) => {
    switch (status) {
      case "published":
        return "dark:bg-emerald-500/20 dark:text-emerald-400 dark:border dark:border-emerald-500/30 bg-emerald-50 text-emerald-700 border border-emerald-200";
      case "scheduled":
        return "dark:bg-cyan-500/20 dark:text-cyan-400 dark:border dark:border-cyan-500/30 bg-cyan-50 text-cyan-700 border border-cyan-200";
      case "draft":
        return "dark:bg-navy-700/60 dark:text-gray-400 dark:border dark:border-navy-600 bg-gray-200 text-gray-600 border border-gray-300";
      case "failed":
        return "dark:bg-red-500/20 dark:text-red-400 dark:border dark:border-red-500/30 bg-red-50 text-red-700 border border-red-200";
      default:
        return "dark:bg-navy-700/60 dark:text-gray-400 dark:border dark:border-navy-600 bg-gray-200 text-gray-600 border border-gray-300";
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
    <div className="flex items-start gap-4 p-4 dark:hover:bg-navy-800/40 hover:bg-gray-100 rounded-xl transition-colors duration-200">
      <div className="w-10 h-10 dark:bg-indigo-600/20 dark:border dark:border-indigo-500/30 bg-indigo-100 border border-indigo-200 rounded-lg flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 dark:text-indigo-400 text-indigo-600" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h4 className="text-sm font-semibold dark:text-white text-gray-900 truncate">
            {title}
          </h4>
          {seoScore !== undefined && (
            <span className="text-xs font-medium dark:text-gray-500 text-gray-600 flex-shrink-0">
              SEO: {seoScore}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(status)}`}
          >
            {status}
          </span>
          <span className="text-xs dark:text-gray-500 text-gray-600">
            {platform}
          </span>
          <span className="text-xs dark:text-gray-600 text-gray-500">•</span>
          <span className="text-xs dark:text-gray-500 text-gray-600">
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
      <div className="p-6 dark:bg-navy-800/60 dark:backdrop-blur-xl dark:border dark:border-indigo-600/30 bg-white/60 backdrop-blur-xl border border-gray-200/50 rounded-2xl">
        <h3 className="text-lg font-bold dark:text-white text-gray-900 mb-4">
          {title}
        </h3>
        <div className="text-center py-12">
          <div className="w-16 h-16 dark:bg-navy-700/60 dark:border dark:border-navy-600 bg-gray-200 border border-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
            <InboxIcon className="w-8 h-8 dark:text-gray-600 text-gray-500" />
          </div>
          <p className="dark:text-gray-500 text-gray-600">No activity yet</p>
          <p className="text-sm dark:text-gray-600 text-gray-700 mt-1">
            Your recent uploads will appear here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 dark:bg-navy-800/60 dark:backdrop-blur-xl dark:border dark:border-indigo-600/30 bg-white/60 backdrop-blur-xl border border-gray-200/50 rounded-2xl">
      <h3 className="text-lg font-bold dark:text-white text-gray-900 mb-4">
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
