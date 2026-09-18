import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sparkles, ChevronRight } from "lucide-react";
import { APP_NAME, SIDEBAR_ITEMS } from "../../utils/constants";
import { useApp } from "../../context/AppContext";
import { getInitials } from "../../utils/helpers";
import { getIconByName } from "../../utils/iconMap";

const Sidebar = () => {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { user, connectedPlatforms } = useApp();
  const isAdmin = user?.isAdmin ?? true;

  const isActive = (href) => {
    if (href === "/dashboard") {
      return location.pathname === "/dashboard";
    }
    return location.pathname.startsWith(href);
  };

  const connectedCount = Object.values(connectedPlatforms || {}).filter(
    (p) => p.connected === true,
  ).length;

  const visibleItems = SIDEBAR_ITEMS.filter(
    (item) => !item.requiredAdmin || isAdmin,
  );

  const SidebarContent = () => (
    <div className="flex flex-col h-full justify-between">
      <div>
        {/* Logo Header */}
        <div className="p-6 border-b border-slate-200/60 dark:border-slate-800/80">
          <Link to="/dashboard" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-600 via-brand-500 to-accent-500 rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-all duration-200 dark:shadow-glow shadow-md">
              <span className="text-white font-extrabold text-xl tracking-wider">V</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold bg-gradient-to-r from-brand-600 via-brand-500 to-accent-500 dark:from-brand-400 dark:to-accent-400 bg-clip-text text-transparent">
                {APP_NAME}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 dark:text-slate-500">
                Publisher Pro
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-1.5 overflow-y-auto">
          {visibleItems.map((item) => {
            const Icon = getIconByName(item.icon, "Square");
            const active = isActive(item.href);

            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMobileOpen(false)}
                className={`relative flex items-center justify-between px-3.5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                  active
                    ? "bg-gradient-to-r from-brand-500/15 via-brand-500/5 to-transparent text-brand-600 dark:text-brand-400 shadow-sm border border-brand-500/20 dark:border-brand-500/30"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100/80 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200"
                }`}
              >
                {/* Active indicator bar */}
                {active && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-gradient-to-b from-brand-600 to-accent-500 rounded-r-full shadow-sm" />
                )}

                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 flex-shrink-0 ${active ? "text-brand-600 dark:text-brand-400" : "text-slate-400 dark:text-slate-500"}`} />
                  <span>{item.name}</span>
                </div>

                {/* Badge Accessories */}
                {item.href === "/platforms" && connectedCount > 0 && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    {connectedCount} Active
                  </span>
                )}

                {item.href === "/dashboard/blog" && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                    Admin
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Profile Section */}
      <div className="p-4 border-t border-slate-200/60 dark:border-slate-800/80">
        <Link
          to="/settings"
          onClick={() => setIsMobileOpen(false)}
          className="flex items-center gap-3 p-3 rounded-2xl dark:bg-slate-800/60 dark:hover:bg-slate-800 bg-slate-50 hover:bg-slate-100 border border-slate-200/60 dark:border-slate-700/60 transition-all duration-200 group"
        >
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-600 via-brand-500 to-accent-500 rounded-xl flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-sm">
                {getInitials(user?.name)}
              </span>
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold dark:text-white text-slate-900 truncate group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
              {user?.name || "User"}
            </p>
            <p className="text-[11px] dark:text-slate-400 text-slate-500 truncate">
              {user?.email || "user@vidthix.com"}
            </p>
          </div>

          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col md:fixed md:inset-y-0 md:w-64 dark:bg-slate-900/95 dark:backdrop-blur-xl border-r border-slate-200/60 dark:border-slate-800/80 bg-white/95 backdrop-blur-xl z-30">
        <SidebarContent />
      </aside>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="md:hidden fixed bottom-5 right-5 z-50 p-4 bg-gradient-to-r from-brand-600 to-accent-500 hover:from-brand-700 hover:to-accent-600 text-white rounded-full shadow-lg shadow-brand-500/30 transition-all duration-200 hover:scale-105"
        aria-label="Toggle sidebar"
      >
        {isMobileOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Mobile Sidebar */}
      {isMobileOpen && (
        <>
          {/* Overlay */}
          <div
            className="md:hidden fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40"
            onClick={() => setIsMobileOpen(false)}
          />

          {/* Sidebar Drawer */}
          <aside className="md:hidden fixed inset-y-0 left-0 w-72 dark:bg-slate-900 bg-white z-50 flex flex-col border-r border-slate-200 dark:border-slate-800 shadow-2xl">
            <SidebarContent />
          </aside>
        </>
      )}
    </>
  );
};

export default Sidebar;
