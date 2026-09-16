import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import { PLATFORMS } from "../utils/dummyData";
import { api } from "../utils/api";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { getIconByName } from "../utils/iconMap";

/* eslint-disable react-hooks/static-components */
const PlatformCard = ({
  platform,
  connection,
  onConnect,
  onDisconnect,
  isConnecting,
}) => {
  const Icon = getIconByName(platform.icon, "Globe");
  const isConnected = connection?.connected === true;
  const isDisabled = !platform.enabled;

  return (
    <div
      className={`p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 shadow-card hover:shadow-cardHover transition-shadow duration-200 ${
        isDisabled ? "opacity-60" : ""
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${
            isConnected
              ? "bg-brand-50 dark:bg-brand-950/40"
              : isDisabled
                ? "dark:bg-navy-700 bg-gray-300"
                : "bg-slate-100 dark:bg-slate-800"
          }`}
        >
          <Icon
            className={`w-6 h-6 ${
              isConnected
                ? "text-brand-600 dark:text-brand-400"
                : isDisabled
                  ? "dark:text-gray-600 text-gray-400"
                  : "dark:text-gray-500 text-gray-600"
            }`}
          />
        </div>

        {isConnected && (
          <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium border bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            Connected
          </span>
        )}

        {!platform.enabled && (
          <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium border bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700">
            Coming Soon
          </span>
        )}
      </div>

      <h3 className="text-xl font-bold dark:text-white text-gray-900 mb-2">
        {platform.name}
      </h3>
      <p className="text-sm dark:text-gray-400 text-gray-600 mb-4">
        {platform.description}
      </p>

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
              ? "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-150"
              : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-150"
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
          className="w-full px-4 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 font-medium rounded-xl cursor-not-allowed opacity-60 grayscale"
        >
          Coming Soon
        </button>
      )}
    </div>
  );
};

/* eslint-enable react-hooks/static-components */

const Platforms = () => {
  const { success, error, info } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const [connections, setConnections] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [connectingPlatform, setConnectingPlatform] = useState(null);

  const loadPlatforms = useCallback(async () => {
    setIsLoading(true);
    try {
      const platformConnections = await api.getPlatforms();
      setConnections(
        Object.fromEntries(
          platformConnections.map((connection) => [
            connection.platform,
            {
              connected: connection.status === "connected",
              channelName: connection.account_name,
              avatar: connection.account_avatar,
              subscribers: connection.subscriber_count,
              status: connection.status,
            },
          ]),
        ),
      );
    } catch (requestError) {
      if (requestError.status === 401) {
        navigate("/auth", { replace: true });
        return;
      }
      error(requestError.message);
    } finally {
      setIsLoading(false);
    }
  }, [error, navigate]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("connected") === "youtube") {
      loadPlatforms();
      success("YouTube connected successfully!");
      window.history.replaceState({}, "", location.pathname);
      return;
    }
    loadPlatforms();
  }, [location.pathname, location.search, loadPlatforms, success]);

  const handleConnect = async (platformId) => {
    // Only YouTube is enabled
    if (platformId !== "youtube") {
      info("This platform is coming soon!");
      return;
    }

    setConnectingPlatform(platformId);

    try {
      const { authorization_url } = await api.youtubeConnect();
      window.location.assign(authorization_url);
    } catch (requestError) {
      if (requestError.status === 401) {
        navigate("/auth", { replace: true });
        return;
      }
      error(requestError.message);
      setConnectingPlatform(null);
    }
  };

  const handleDisconnect = async (platformId) => {
    setConnectingPlatform(platformId);
    try {
      await api.disconnectPlatform(platformId);
      await loadPlatforms();
      success("Platform disconnected successfully.");
    } catch (requestError) {
      if (requestError.status === 401) {
        navigate("/auth", { replace: true });
        return;
      }
      error(requestError.message);
    } finally {
      setConnectingPlatform(null);
    }
  };

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto w-full">
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
          <p className="text-sm dark:text-gray-400 text-gray-600 mb-1">
            Total Platforms
          </p>
          <p className="text-3xl font-bold dark:text-white text-gray-900">
            {PLATFORMS.length}
          </p>
        </div>
        <div className="p-6 dark:bg-navy-800/60 dark:backdrop-blur-xl dark:border dark:border-indigo-600/30 bg-white/60 backdrop-blur-xl border border-gray-200/50 rounded-2xl">
          <p className="text-sm dark:text-gray-400 text-gray-600 mb-1">
            Connected
          </p>
          <p className="text-3xl font-bold dark:text-emerald-400 text-emerald-600">
            {Object.values(connections).filter((p) => p.connected).length}
          </p>
        </div>
        <div className="p-6 dark:bg-navy-800/60 dark:backdrop-blur-xl dark:border dark:border-indigo-600/30 bg-white/60 backdrop-blur-xl border border-gray-200/50 rounded-2xl">
          <p className="text-sm dark:text-gray-400 text-gray-600 mb-1">
            Coming Soon
          </p>
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
            connection={connections[platform.id]}
            onConnect={handleConnect}
            onDisconnect={handleDisconnect}
            isConnecting={isLoading || connectingPlatform === platform.id}
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
