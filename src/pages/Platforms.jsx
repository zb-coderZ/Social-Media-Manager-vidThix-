import { useState } from "react";
import * as LucideIcons from "lucide-react";
import { useApp } from "../context/AppContext";
import { useToast } from "../context/ToastContext";
import { PLATFORMS } from "../utils/dummyData";
import { API_DELAYS } from "../utils/constants";
import { sleep } from "../utils/helpers";
import LoadingSpinner from "../components/common/LoadingSpinner";

const PlatformCard = ({
  platform,
  connection,
  onConnect,
  onDisconnect,
  isConnecting,
}) => {
  const Icon = LucideIcons[platform.icon] || LucideIcons.Globe;
  const isConnected = connection?.connected === true;
  const isDisabled = !platform.enabled;

  return (
    <div
      className={`p-6 dark:bg-navy-800/60 dark:backdrop-blur-xl dark:border dark:border-indigo-600/30 dark:hover:border-cyan-400/50 dark:hover:shadow-glow-cyan dark:hover:-translate-y-0.5 bg-white/60 backdrop-blur-xl border border-gray-200/50 hover:border-indigo-300/50 hover:shadow-md rounded-2xl transition-all duration-200 ${
        isDisabled ? "opacity-60" : ""
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${
            isConnected
              ? "dark:bg-gradient-to-br dark:from-indigo-600 dark:to-cyan-500 bg-gradient-to-br from-indigo-400 to-cyan-400 dark:shadow-glow shadow-md"
              : isDisabled
                ? "dark:bg-navy-700 bg-gray-300"
                : "dark:bg-navy-800 dark:border dark:border-navy-700 bg-gray-100"
          }`}
        >
          <Icon
            className={`w-6 h-6 ${
              isConnected
                ? "text-white"
                : isDisabled
                  ? "dark:text-gray-600 text-gray-400"
                  : "dark:text-gray-500 text-gray-600"
            }`}
          />
        </div>

        {isConnected && (
          <span className="px-3 py-1 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border dark:border-emerald-500/30 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full flex items-center gap-1 border border-emerald-200">
            <div className="w-2 h-2 dark:bg-emerald-400 bg-emerald-500 rounded-full" />
            Connected
          </span>
        )}

        {!platform.enabled && (
          <span className="px-3 py-1 dark:bg-navy-700/60 dark:text-gray-400 dark:border dark:border-navy-600 bg-gray-200 text-gray-600 text-xs font-semibold rounded-full border border-gray-300">
            Coming Soon
          </span>
        )}
      </div>

      <h3 className="text-xl font-bold dark:text-white text-gray-900 mb-2">{platform.name}</h3>
      <p className="text-sm dark:text-gray-400 text-gray-600 mb-4">{platform.description}</p>

      {isConnected && (
        <div className="mb-4 p-3 dark:bg-indigo-500/10 dark:border dark:border-indigo-500/30 bg-indigo-50 border border-indigo-200 rounded-lg">
          <p className="text-sm font-semibold dark:text-indigo-400 text-indigo-900 mb-1">
            {connection.channelName || "Account Connected"}
          </p>
          {connection.subscribers && (
            <p className="text-xs dark:text-indigo-300/80 text-indigo-600">
              {connection.subscribers} subscribers
            </p>
          )}
        </div>
      )}

      {platform.enabled ? (
        <button
          onClick={
            isConnected
              ? () => onDisconnect(platform.id)
              : () => onConnect(platform.id)
          }
          disabled={isConnecting}
          className={`w-full px-4 py-3 font-semibold rounded-xl transition-all duration-200 ${
            isConnected
              ? "bg-red-600 dark:hover:bg-red-700 dark:hover:shadow-lg hover:bg-red-700 text-white hover:shadow-lg"
              : "bg-gradient-to-r from-orange-500 to-orange-600 dark:hover:from-orange-600 dark:hover:to-orange-700 dark:hover:shadow-glow-orange hover:from-orange-600 hover:to-orange-700 text-white hover:shadow-glow-orange hover:shadow-orange-500/30"
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isConnecting ? (
            <LoadingSpinner size="sm" />
          ) : isConnected ? (
            "Disconnect"
          ) : (
            "Connect Account"
          )}
        </button>
      ) : (
        <button
          disabled
          className="w-full px-4 py-3 dark:bg-navy-800 dark:text-gray-600 dark:cursor-not-allowed bg-gray-200 text-gray-400 font-semibold rounded-xl cursor-not-allowed"
        >
          Coming Soon
        </button>
      )}
    </div>
  );
};

const Platforms = () => {
  const { connectedPlatforms, connectPlatform, disconnectPlatform } = useApp();
  const { success, error, info } = useToast();
  const [connectingPlatform, setConnectingPlatform] = useState(null);

  const handleConnect = async (platformId) => {
    // Only YouTube is enabled
    if (platformId !== "youtube") {
      info("This platform is coming soon!");
      return;
    }

    setConnectingPlatform(platformId);

    try {
      // Simulate OAuth flow
      await sleep(API_DELAYS.CONNECT_PLATFORM);

      // Simulate successful connection
      const mockData = {
        channelName: "Demo Channel",
        subscribers: "10.5K",
        connected: true,
      };

      connectPlatform(platformId, mockData);
      success("Platform connected successfully!");
    } catch (err) {
      error("Failed to connect platform. Please try again.");
    } finally {
      setConnectingPlatform(null);
    }
  };

  const handleDisconnect = (platformId) => {
    disconnectPlatform(platformId);
    success("Platform disconnected successfully.");
  };

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold dark:text-white text-gray-900 mb-2">
          Connected Platforms
        </h1>
        <p className="dark:text-gray-400 text-gray-600">
          Connect and manage your social media accounts. More platforms coming
          soon!
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 dark:bg-navy-800/60 dark:backdrop-blur-xl dark:border dark:border-indigo-600/30 bg-white/60 backdrop-blur-xl border border-gray-200/50 rounded-2xl">
          <p className="text-sm dark:text-gray-400 text-gray-600 mb-1">Total Platforms</p>
          <p className="text-3xl font-bold dark:text-white text-gray-900">{PLATFORMS.length}</p>
        </div>
        <div className="p-6 dark:bg-navy-800/60 dark:backdrop-blur-xl dark:border dark:border-indigo-600/30 bg-white/60 backdrop-blur-xl border border-gray-200/50 rounded-2xl">
          <p className="text-sm dark:text-gray-400 text-gray-600 mb-1">Connected</p>
          <p className="text-3xl font-bold dark:text-emerald-400 text-emerald-600">
            {
              Object.values(connectedPlatforms).filter((p) => p.connected)
                .length
            }
          </p>
        </div>
        <div className="p-6 dark:bg-navy-800/60 dark:backdrop-blur-xl dark:border dark:border-indigo-600/30 bg-white/60 backdrop-blur-xl border border-gray-200/50 rounded-2xl">
          <p className="text-sm dark:text-gray-400 text-gray-600 mb-1">Coming Soon</p>
          <p className="text-3xl font-bold dark:text-gray-500 text-gray-400">
            {PLATFORMS.filter((p) => !p.enabled).length}
          </p>
        </div>
      </div>

      {/* Platform Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PLATFORMS.map((platform) => (
          <PlatformCard
            key={platform.id}
            platform={platform}
            connection={connectedPlatforms[platform.id]}
            onConnect={handleConnect}
            onDisconnect={handleDisconnect}
            isConnecting={connectingPlatform === platform.id}
          />
        ))}
      </div>

      {/* Info Section */}
      <div className="p-6 dark:bg-indigo-500/10 dark:border dark:border-indigo-500/30 bg-indigo-50 border border-indigo-200 rounded-2xl">
        <h3 className="text-lg font-bold dark:text-indigo-400 text-indigo-900 mb-3">
          🔒 Secure Authentication
        </h3>
        <p className="dark:text-indigo-300/80 text-indigo-700 mb-4">
          We use industry-standard OAuth 2.0 authentication to securely connect
          your accounts. Your credentials are never stored on our servers.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm dark:text-indigo-300/80 text-indigo-600">
          <div>✓ End-to-end encryption</div>
          <div>✓ No password storage</div>
          <div>✓ Revoke access anytime</div>
          <div>✓ Read-only by default</div>
        </div>
      </div>
    </div>
  );
};

export default Platforms;
