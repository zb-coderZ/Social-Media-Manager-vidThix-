import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { APP_NAME, SIDEBAR_ITEMS } from "../../utils/constants";
import { useApp } from "../../context/AppContext";
import { getInitials } from "../../utils/helpers";
import { getIconByName } from "../../utils/iconMap";

const Sidebar = () => {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { user } = useApp();
  const isAdmin = user?.isAdmin ?? true;

  const isActive = (href) => location.pathname === href;

  const visibleItems = SIDEBAR_ITEMS.filter(
    (item) => !item.requiredAdmin || isAdmin,
  );

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="p-6 border-b dark:border-navy-800 border-slate-200">
        <Link to="/dashboard" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-gradient-to-br from-brand-600 to-accent-500 rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-transform duration-200 dark:shadow-glow shadow-md">
            <span className="text-white font-bold text-xl">V</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-brand-600 to-accent-600 dark:from-brand-400 dark:to-accent-400 bg-clip-text text-transparent">
            {APP_NAME}
          </span>
        </Link>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {visibleItems.map((item) => {
          const Icon = getIconByName(item.icon, "Square");
          const active = isActive(item.href);

          return (
            <Link
              key={item.name}
              to={item.href}
              onClick={() => setIsMobileOpen(false)}
              className={`relative flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors duration-150 ${
                active
                  ? "bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 before:absolute before:left-0 before:top-0 before:h-full before:w-[3px] before:rounded-r-lg before:bg-brand-600"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60"
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Profile Section */}
      <div className="p-4 border-t border-slate-200/60 dark:border-slate-800">
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl dark:bg-navy-800/60 dark:hover:bg-navy-700/60 bg-slate-100 hover:bg-slate-200 transition-colors duration-200 cursor-pointer">
          <div className="w-10 h-10 bg-gradient-to-br from-brand-600 to-accent-500 dark:from-brand-600 dark:to-accent-500 rounded-full flex items-center justify-center dark:shadow-glow shadow-md">
            <span className="text-white font-semibold text-sm">
              {getInitials(user?.name)}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold dark:text-white text-slate-900 truncate">
              {user?.name || "Demo User"}
            </p>
            <p className="text-xs dark:text-slate-500 text-slate-600 truncate">
              {user?.email || "demo@vidthix.com"}
            </p>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col md:fixed md:inset-y-0 md:w-64 dark:bg-navy-900 dark:border-r dark:border-navy-800 bg-white border-r border-slate-200">
        <SidebarContent />
      </aside>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="md:hidden fixed bottom-4 right-4 z-50 p-4 bg-gradient-to-r from-brand-600 to-accent-500 hover:from-brand-700 hover:to-accent-600 text-white rounded-full transition-all duration-200 hover:scale-105"
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
            className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setIsMobileOpen(false)}
          />

          {/* Sidebar */}
          <aside className="md:hidden fixed inset-y-0 left-0 w-64 dark:bg-navy-900 bg-white z-50 flex flex-col dark:shadow-premium shadow-lg">
            <SidebarContent />
          </aside>
        </>
      )}
    </>
  );
};

export default Sidebar;
