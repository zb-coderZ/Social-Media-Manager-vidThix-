import * as LucideIcons from "lucide-react";
import { PLATFORMS } from "../../utils/dummyData";

const PlatformIcon = ({ platform, connected }) => {
  const Icon = LucideIcons[platform.icon] || LucideIcons.Globe;

  return (
    <div
      className={`relative group ${
        connected ? "cursor-pointer" : "opacity-40"
      }`}
      title={
        connected
          ? `${platform.name} - Connected`
          : `${platform.name} - Not connected`
      }
    >
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 ${
          connected
            ? "bg-gradient-to-br from-indigo-600 to-cyan-500 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-indigo-500/50"
            : "bg-gray-200 dark:bg-navy-700/60"
        }`}
      >
        <Icon
          className={`w-6 h-6 ${connected ? "text-white" : "text-gray-400 dark:text-gray-500"}`}
        />
      </div>

      {connected && (
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white dark:border-navy-950 rounded-full" />
      )}
    </div>
  );
};

const PlatformIcons = ({ connectedPlatforms }) => {
  return (
    <div className="flex items-center gap-3">
      {PLATFORMS.map((platform) => {
        const connected = connectedPlatforms[platform.id]?.connected === true;
        return (
          <PlatformIcon
            key={platform.id}
            platform={platform}
            connected={connected}
          />
        );
      })}
    </div>
  );
};

export default PlatformIcons;
