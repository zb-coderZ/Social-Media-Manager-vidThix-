import { Link } from "react-router-dom";
import { CheckCircle2, Lock, ArrowUpRight } from "lucide-react";

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
      return null;
  }
};

const PLATFORM_STYLES = {
  youtube: {
    iconBg: "bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400",
    btnConnect:
      "bg-gradient-to-r from-red-600 to-red-500 text-white hover:from-red-700 hover:to-red-600 shadow-md shadow-red-500/20",
  },
  linkedin: {
    iconBg: "bg-blue-600/10 border-blue-600/20 text-blue-600 dark:text-blue-400",
    btnConnect:
      "bg-gradient-to-r from-blue-700 to-blue-600 text-white hover:from-blue-800 hover:to-blue-700 shadow-md shadow-blue-500/20",
  },
  instagram: {
    iconBg:
      "bg-gradient-to-tr from-amber-500/10 via-pink-500/10 to-purple-500/10 border-pink-500/20 text-pink-500",
    btnConnect: "bg-pink-600 text-white",
  },
  tiktok: {
    iconBg: "bg-slate-900/10 dark:bg-slate-100/10 border-slate-500/20 text-slate-900 dark:text-slate-100",
    btnConnect: "bg-slate-900 text-white",
  },
  facebook: {
    iconBg: "bg-blue-500/10 border-blue-500/20 text-blue-500",
    btnConnect: "bg-blue-500 text-white",
  },
};

const PlatformCard = ({ platform }) => {
  const { id, name, enabled, description } = platform;
  const style = PLATFORM_STYLES[id] || PLATFORM_STYLES.youtube;

  return (
    <div
      className={`p-6 rounded-3xl bg-white dark:bg-slate-900 border transition-all duration-300 flex flex-col justify-between group ${
        enabled
          ? "border-slate-200/80 dark:border-slate-800 shadow-card hover:shadow-2xl hover:border-brand-500/40"
          : "border-slate-200/60 dark:border-slate-800 opacity-70"
      }`}
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div
            className={`w-14 h-14 p-3.5 rounded-2xl flex items-center justify-center border shadow-sm transition-transform duration-200 group-hover:scale-105 ${style.iconBg}`}
          >
            <PlatformIcon id={id} className="w-7 h-7" />
          </div>

          {enabled ? (
            <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold border bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20">
              <CheckCircle2 className="w-3.5 h-3.5" /> Live Ready
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold border bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700">
              Coming Soon
            </span>
          )}
        </div>

        {/* Content */}
        <div>
          <h3 className="text-xl font-bold dark:text-white text-slate-900 mb-2">
            {name}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Button */}
      <div className="pt-6">
        {enabled ? (
          <Link
            to={`/platforms`}
            className={`w-full py-3.5 px-4 font-bold rounded-2xl text-sm transition-all duration-200 flex items-center justify-center gap-2 ${style.btnConnect}`}
          >
            <span>Connect {name}</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        ) : (
          <button
            disabled
            className="w-full py-3.5 px-4 bg-slate-100 dark:bg-slate-800/60 text-slate-400 dark:text-slate-500 font-semibold text-xs rounded-2xl cursor-not-allowed border border-slate-200/50 dark:border-slate-800 flex items-center justify-center gap-2"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Sandbox Available</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default PlatformCard;
