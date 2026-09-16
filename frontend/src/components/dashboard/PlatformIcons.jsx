import { getIconByName } from "../../utils/iconMap";
import { PLATFORMS } from "../../utils/dummyData";

const PlatformIcon = ({ platform, connected }) => {
  const Icon = getIconByName(platform.icon, "Globe");

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
            ? "bg-gradient-to-br from-brand-600 to-accent-500 group-hover:scale-110 group-hover:shadow-cardHover"
            : "bg-slate-100 dark:bg-slate-800"
        }`}
      >
        <Icon
          className={`w-6 h-6 ${connected ? "text-white" : "text-slate-400 dark:text-slate-500"}`}
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
