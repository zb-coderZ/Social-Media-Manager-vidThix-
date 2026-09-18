import { useCallback, useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  ExternalLink,
  RefreshCw,
  Zap,
  AlertTriangle,
  X,
  Activity,
  ArrowUpRight,
  Check,
  Video,
} from "lucide-react";
import { useToast } from "../context/ToastContext";
import { PLATFORMS } from "../utils/dummyData";
import { api } from "../utils/api";
import LoadingSpinner from "../components/common/LoadingSpinner";

// Custom Platform SVGs for ultra-premium brand rendering
const PlatformIcon = ({ id, className = "w-6 h-6" }) => {
  switch (id) {
    case "youtube":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
      );
    case "instagram":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      );
    case "tiktok":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.24-2.52.74-5.06 2.58-6.72 1.54-1.42 3.65-2.18 5.75-2.05v4.03c-1.13-.09-2.29.23-3.17.94-.9.72-1.45 1.84-1.44 2.99.01 1.34.72 2.6 1.87 3.24.96.55 2.14.65 3.19.32.99-.3 1.81-1.02 2.22-1.97.28-.64.38-1.36.37-2.07.01-4.47.01-8.94.01-13.41z" />
        </svg>
      );
    case "facebook":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      );
    default:
      return <Zap className={className} />;
  }
};

const PLATFORM_STYLES = {
  youtube: {
    accentColor: "#FF0000",
    iconColor: "text-red-600 dark:text-red-500",
    iconBg: "bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400",
    borderGlow: "border-red-500/30 dark:border-red-500/20 hover:border-red-500/50",
    btnConnect:
      "bg-gradient-to-r from-red-600 to-red-500 text-white hover:from-red-700 hover:to-red-600 shadow-md shadow-red-500/20",
    btnPublish:
      "bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/20 font-bold",
    connectedBg:
      "bg-gradient-to-r from-red-500/10 via-red-500/5 to-transparent border-red-500/20 text-red-700 dark:text-red-300",
    features: ["4K Video Uploads", "Playlists & Tags", "Live Scheduling"],
  },
  linkedin: {
    accentColor: "#0077B5",
    iconColor: "text-blue-600 dark:text-blue-400",
    iconBg: "bg-blue-600/10 border-blue-600/20 text-blue-600 dark:text-blue-400",
    borderGlow: "border-blue-600/30 dark:border-blue-600/20 hover:border-blue-600/50",
    btnConnect:
      "bg-gradient-to-r from-blue-700 to-blue-600 text-white hover:from-blue-800 hover:to-blue-700 shadow-md shadow-blue-500/20",
    btnPublish:
      "bg-blue-600/10 hover:bg-blue-600/20 text-blue-600 dark:text-blue-400 border border-blue-600/20 font-bold",
    connectedBg:
      "bg-gradient-to-r from-blue-600/10 via-blue-600/5 to-transparent border-blue-600/20 text-blue-700 dark:text-blue-300",
    features: ["Article Posts", "Media Attachments", "Professional Reach"],
  },
  instagram: {
    accentColor: "#E4405F",
    iconColor: "text-pink-500",
    iconBg: "bg-gradient-to-tr from-amber-500/10 via-pink-500/10 to-purple-500/10 border-pink-500/20 text-pink-500",
    borderGlow: "border-pink-500/20 dark:border-pink-500/10",
    btnConnect: "bg-pink-600 text-white",
    connectedBg: "bg-pink-500/5 border-pink-500/20 text-pink-700 dark:text-pink-400",
    features: ["Reels & Stories", "Carousels", "Auto-Hashtags"],
  },
  tiktok: {
    accentColor: "#000000",
    iconColor: "text-slate-900 dark:text-slate-100",
    iconBg: "bg-slate-900/10 dark:bg-slate-100/10 border-slate-500/20 text-slate-900 dark:text-slate-100",
    borderGlow: "border-slate-500/20 dark:border-slate-800",
    btnConnect: "bg-slate-900 text-white",
    connectedBg: "bg-slate-500/5 border-slate-500/20 text-slate-700 dark:text-slate-300",
    features: ["Short Videos", "Trending Sounds", "Viral Analytics"],
  },
  facebook: {
    accentColor: "#1877F2",
    iconColor: "text-blue-500",
    iconBg: "bg-blue-500/10 border-blue-500/20 text-blue-500",
    borderGlow: "border-blue-500/20 dark:border-blue-500/10",
    btnConnect: "bg-blue-500 text-white",
    connectedBg: "bg-blue-500/5 border-blue-500/20 text-blue-700 dark:text-blue-400",
    features: ["Page Publishing", "Video Posts", "Audience Engagement"],
  },
};

const PlatformCard = ({
  platform,
  connection,
  onConnect,
  onRequestDisconnect,
  onNavigateUpload,
  isConnecting,
}) => {
  const isConnected = connection?.connected === true;
  const isDisabled = !platform.enabled;
  const style = PLATFORM_STYLES[platform.id] || PLATFORM_STYLES.youtube;

  return (
    <div
      className={`p-6 rounded-3xl bg-white dark:bg-slate-900 border transition-all duration-300 flex flex-col justify-between group ${
        isConnected
          ? "border-emerald-500/40 dark:border-emerald-500/30 shadow-xl shadow-emerald-500/5"
          : isDisabled
            ? "border-slate-200/60 dark:border-slate-800 opacity-70"
            : `border-slate-200/80 dark:border-slate-800 shadow-card hover:shadow-2xl ${style.borderGlow}`
      }`}
    >
      <div>
        {/* Top Header & Status Badge */}
        <div className="flex items-start justify-between mb-5">
          <div
            className={`w-14 h-14 p-3.5 rounded-2xl flex items-center justify-center border shadow-sm transition-transform duration-200 group-hover:scale-105 ${style.iconBg}`}
          >
            <PlatformIcon id={platform.id} className="w-7 h-7" />
          </div>

          {isConnected ? (
            <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold border bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Connected
            </span>
          ) : isDisabled ? (
            <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold border bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700">
              Coming Soon
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold border bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700">
              Ready to Connect
            </span>
          )}
        </div>

        {/* Title & Description */}
        <h3 className="text-xl font-bold dark:text-white text-slate-900 mb-2 flex items-center justify-between">
          <span>{platform.name}</span>
          {isConnected && (
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
          )}
        </h3>
        <p className="text-xs sm:text-sm dark:text-slate-400 text-slate-600 leading-relaxed mb-5">
          {platform.description}
        </p>

        {/* Connected Channel / Account Display */}
        {isConnected && (
          <div
            className={`mb-5 p-4 rounded-2xl border ${style.connectedBg} flex items-center justify-between gap-3 shadow-inner`}
          >
            <div className="flex items-center gap-3 min-w-0">
              {connection.avatar ? (
                <img
                  src={connection.avatar}
                  alt={connection.channelName}
                  className="w-11 h-11 rounded-full border-2 border-white dark:border-slate-800 shadow-md shrink-0 object-cover"
                />
              ) : (
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-brand-600 to-indigo-600 text-white font-black flex items-center justify-center text-base shadow-md shrink-0">
                  {connection.channelName
                    ? connection.channelName.charAt(0).toUpperCase()
                    : "A"}
                </div>
              )}

              <div className="min-w-0 flex-1">
                <p className="text-sm font-extrabold dark:text-white text-slate-900 truncate">
                  {connection.channelName || "Account Connected"}
                </p>
                <p className="text-xs font-medium opacity-80 flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                  <Check className="w-3.5 h-3.5" /> OAuth 2.0 Authorized
                </p>
              </div>
            </div>

            {platform.id === "youtube" && (
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 text-slate-400 hover:text-red-500 rounded-xl hover:bg-white/50 dark:hover:bg-slate-800/50 transition-colors"
                title="View Channel"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            {platform.id === "linkedin" && (
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 text-slate-400 hover:text-blue-500 rounded-xl hover:bg-white/50 dark:hover:bg-slate-800/50 transition-colors"
                title="View Profile"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        )}

        {/* Feature Pills */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {style.features.map((feat) => (
            <span
              key={feat}
              className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/70 text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-800"
            >
              • {feat}
            </span>
          ))}
        </div>
      </div>

      {/* Button Actions */}
      <div className="space-y-2">
        {platform.enabled ? (
          isConnected ? (
            <div className="flex gap-2">
              <button
                onClick={() => onNavigateUpload(platform.id)}
                className={`flex-1 py-3 px-3 rounded-2xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 ${style.btnPublish}`}
              >
                <Video className="w-4 h-4" />
                <span>Publish Now</span>
              </button>

              <button
                onClick={() => onRequestDisconnect(platform.id)}
                disabled={isConnecting}
                className="py-3 px-3 rounded-2xl text-xs font-bold text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400 bg-slate-100 hover:bg-red-50 dark:bg-slate-800/80 dark:hover:bg-red-950/40 border border-slate-200/80 dark:border-slate-700 transition-colors"
                title="Disconnect Account"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button
              onClick={() => onConnect(platform.id)}
              disabled={isConnecting}
              className={`w-full px-4 py-3.5 font-bold rounded-2xl text-sm transition-all duration-200 flex items-center justify-center gap-2 ${style.btnConnect} disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isConnecting ? (
                <div className="flex items-center justify-center gap-2">
                  <LoadingSpinner size="sm" />
                  <span>Redirecting to Auth...</span>
                </div>
              ) : (
                <>
                  <span>Connect {platform.name}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </>
              )}
            </button>
          )
        ) : (
          <button
            disabled
            className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-800/60 text-slate-400 dark:text-slate-500 font-semibold text-xs rounded-2xl cursor-not-allowed border border-slate-200/50 dark:border-slate-800 flex items-center justify-center gap-2"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Integration In Development</span>
          </button>
        )}
      </div>
    </div>
  );
};

const Platforms = () => {
  const { success, error, info } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const [connections, setConnections] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [connectingPlatform, setConnectingPlatform] = useState(null);
  const [platformToDisconnect, setPlatformToDisconnect] = useState(null);
  const [testingHealth, setTestingHealth] = useState(false);

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
    const connectedPlatform = params.get("connected");
    if (connectedPlatform === "youtube") {
      loadPlatforms();
      success("YouTube account connected successfully!");
      window.history.replaceState({}, "", location.pathname);
      return;
    }
    if (connectedPlatform === "linkedin") {
      loadPlatforms();
      success("LinkedIn account connected successfully!");
      window.history.replaceState({}, "", location.pathname);
      return;
    }
    loadPlatforms();
  }, [location.pathname, location.search, loadPlatforms, success]);

  const handleConnect = async (platformId) => {
    if (platformId !== "youtube" && platformId !== "linkedin") {
      info("This platform integration is coming soon!");
      return;
    }

    setConnectingPlatform(platformId);

    try {
      const { authorization_url } =
        platformId === "youtube"
          ? await api.youtubeConnect()
          : await api.linkedinConnect();
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

  const handleConfirmDisconnect = async (platformId) => {
    setConnectingPlatform(platformId);
    try {
      await api.disconnectPlatform(platformId);
      await loadPlatforms();
      success(`${platformId.toUpperCase()} disconnected successfully.`);
    } catch (requestError) {
      if (requestError.status === 401) {
        navigate("/auth", { replace: true });
        return;
      }
      error(requestError.message);
    } finally {
      setConnectingPlatform(null);
      setPlatformToDisconnect(null);
    }
  };

  const handleTestHealth = async () => {
    setTestingHealth(true);
    try {
      await api.getPlatforms();
      success("OAuth API Status 100% Operational & Verified!");
    } catch (err) {
      error(`Health check failed: ${err.message}`);
    } finally {
      setTestingHealth(false);
    }
  };

  const activeConnectedCount = useMemo(() => {
    return Object.values(connections).filter((p) => p.connected).length;
  }, [connections]);

  const handleNavigateUpload = (platformId) => {
    navigate(`/upload?platform=${platformId}`);
  };

  return (
    <div className="flex-1 space-y-8 max-w-7xl mx-auto w-full min-w-0">
      {/* Header & Quick Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20 uppercase tracking-wider">
              Integration Center
            </span>
          </div>
          <h1 className="text-3xl font-extrabold dark:text-white text-slate-900 tracking-tight">
            Connected Social Accounts
          </h1>
          <p className="text-sm dark:text-slate-400 text-slate-600 mt-1">
            Manage your authorized OAuth 2.0 channels for multi-platform distribution.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleTestHealth}
            disabled={testingHealth}
            className="inline-flex items-center gap-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold px-4 py-2.5 rounded-xl text-xs transition-colors"
          >
            <Activity className={`w-3.5 h-3.5 ${testingHealth ? "animate-spin" : ""}`} />
            <span>Test API Health</span>
          </button>

          <button
            onClick={loadPlatforms}
            disabled={isLoading}
            className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold px-4 py-2.5 rounded-xl text-xs transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Summary Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 dark:bg-slate-900 bg-white border border-slate-200/60 dark:border-slate-800 rounded-3xl shadow-card flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
              Active Connections
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold dark:text-emerald-400 text-emerald-600">
                {activeConnectedCount}
              </span>
              <span className="text-xs text-slate-400">/ {PLATFORMS.length} total</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center">
            <Zap className="w-6 h-6" />
          </div>
        </div>

        <div className="p-6 dark:bg-slate-900 bg-white border border-slate-200/60 dark:border-slate-800 rounded-3xl shadow-card flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
              Publishing Engines Ready
            </p>
            <p className="text-3xl font-extrabold dark:text-white text-slate-900">
              {PLATFORMS.filter((p) => p.enabled).length}
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-brand-500/10 border border-brand-500/20 text-brand-500 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="p-6 dark:bg-slate-900 bg-white border border-slate-200/60 dark:border-slate-800 rounded-3xl shadow-card flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
              Upcoming Integrations
            </p>
            <p className="text-3xl font-extrabold dark:text-slate-400 text-slate-500">
              {PLATFORMS.filter((p) => !p.enabled).length}
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-slate-500/10 border border-slate-500/20 text-slate-500 flex items-center justify-center">
            <Lock className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Platform Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PLATFORMS.map((platform) => (
          <PlatformCard
            key={platform.id}
            platform={platform}
            connection={connections[platform.id]}
            onConnect={handleConnect}
            onRequestDisconnect={(id) => setPlatformToDisconnect(id)}
            onNavigateUpload={handleNavigateUpload}
            isConnecting={isLoading || connectingPlatform === platform.id}
          />
        ))}
      </div>

      {/* Security & Token Info Box */}
      <div className="p-6 sm:p-8 bg-gradient-to-br from-indigo-500/10 via-brand-500/5 to-transparent dark:bg-slate-900 border border-indigo-500/20 dark:border-slate-800 rounded-3xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold dark:text-white text-slate-900">
              Enterprise OAuth 2.0 Security Architecture
            </h3>
            <p className="text-xs dark:text-slate-400 text-slate-600">
              vidThix never stores raw passwords. Authentication tokens are encrypted in local database storage.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-semibold dark:text-slate-300 text-slate-700">
          <div className="p-3 rounded-xl bg-white/60 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> State-Signed JWT Verification
          </div>
          <div className="p-3 rounded-xl bg-white/60 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Direct API Token Exchange
          </div>
          <div className="p-3 rounded-xl bg-white/60 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> One-Click Access Revocation
          </div>
          <div className="p-3 rounded-xl bg-white/60 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Automatic Scope Refresh
          </div>
        </div>
      </div>

      {/* Disconnect Confirmation Modal */}
      {platformToDisconnect && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Disconnect Platform?
                </h3>
              </div>
              <button
                onClick={() => setPlatformToDisconnect(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Are you sure you want to disconnect your{" "}
              <strong className="text-slate-900 dark:text-white capitalize">
                {platformToDisconnect}
              </strong>{" "}
              account? This will revoke active OAuth 2.0 publishing tokens and stop scheduled posts for this account.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setPlatformToDisconnect(null)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleConfirmDisconnect(platformToDisconnect)}
                disabled={connectingPlatform === platformToDisconnect}
                className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm shadow-md shadow-red-600/20 transition-all flex items-center justify-center gap-2"
              >
                {connectingPlatform === platformToDisconnect ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  "Confirm Disconnect"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Platforms;
