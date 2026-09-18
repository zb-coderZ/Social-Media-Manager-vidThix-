import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  User,
  Mail,
  Bell,
  Moon,
  Shield,
  Check,
  AlertTriangle,
  Globe,
  Save,
  Key,
  Lock,
  ExternalLink,
} from "lucide-react";
import { useToast } from "../context/ToastContext";
import { useApp } from "../context/AppContext";
import { api } from "../utils/api";
import { getInitials } from "../utils/helpers";
import LoadingSpinner from "../components/common/LoadingSpinner";

const Settings = () => {
  const { success: showSuccess, error: showError } = useToast();
  const { connectedPlatforms } = useApp();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    updates: true,
    scheduledAlerts: true,
  });

  const [securityData, setSecurityData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isSavingSecurity, setIsSavingSecurity] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profile = await api.me();
        setFormData({ name: profile.name, email: profile.email });
      } catch (requestError) {
        if (requestError.status === 401) {
          navigate("/auth", { replace: true });
          return;
        }
        showError(requestError.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [navigate, showError]);

  const handleProfileSave = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      showError("Name cannot be empty");
      return;
    }
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      showSuccess("Profile information updated successfully!");
    }, 600);
  };

  const handleSecuritySave = (e) => {
    e.preventDefault();
    if (!securityData.currentPassword) {
      showError("Please enter your current password.");
      return;
    }
    if (securityData.newPassword.length < 6) {
      showError("New password must be at least 6 characters.");
      return;
    }
    if (securityData.newPassword !== securityData.confirmPassword) {
      showError("New passwords do not match.");
      return;
    }
    setIsSavingSecurity(true);
    setTimeout(() => {
      setIsSavingSecurity(false);
      setSecurityData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      showSuccess("Password updated successfully.");
    }, 600);
  };

  const toggleNotification = (key) => {
    setNotifications((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      showSuccess(`Preference updated.`);
      return next;
    });
  };

  if (isLoading) {
    return (
      <div className="flex-1 p-12 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading settings & profile..." />
      </div>
    );
  }

  const youtubeConnected = connectedPlatforms?.youtube?.connected === true;
  const linkedinConnected = connectedPlatforms?.linkedin?.connected === true;

  return (
    <div className="flex-1 space-y-8 max-w-4xl mx-auto w-full min-w-0">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold dark:text-white text-gray-900 mb-2">
          Account Settings
        </h1>
        <p className="dark:text-gray-400 text-gray-600">
          Manage your account profile, notification preferences, connected platforms, and security options.
        </p>
      </div>

      {/* Profile Section */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 shadow-card p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="w-10 h-10 dark:bg-brand-500/20 dark:border dark:border-brand-500/30 bg-brand-100 border border-brand-200 rounded-xl flex items-center justify-center">
            <User className="w-5 h-5 dark:text-brand-400 text-brand-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold dark:text-white text-gray-900">
              Personal Profile
            </h2>
            <p className="text-xs dark:text-gray-400 text-gray-500">
              Update your workspace identity details
            </p>
          </div>
        </div>

        <form onSubmit={handleProfileSave} className="space-y-6">
          {/* Avatar Header */}
          <div className="flex items-center gap-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-700/50">
            <div className="w-16 h-16 bg-gradient-to-br from-brand-600 via-brand-500 to-accent-500 rounded-2xl flex items-center justify-center shadow-md">
              <span className="text-white font-extrabold text-2xl">
                {getInitials(formData.name)}
              </span>
            </div>
            <div>
              <h3 className="text-sm font-bold dark:text-white text-slate-900">
                {formData.name || "User Avatar"}
              </h3>
              <p className="text-xs dark:text-slate-400 text-slate-500 mb-2">
                {formData.email}
              </p>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20">
                <Check className="w-3 h-3" /> Account Active
              </span>
            </div>
          </div>

          {/* Name & Email Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider dark:text-slate-300 text-slate-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 dark:bg-slate-800 dark:border-slate-700 dark:text-white bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm font-medium transition-all"
                  placeholder="Your Name"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider dark:text-slate-300 text-slate-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  disabled
                  className="w-full pl-10 pr-4 py-2.5 dark:bg-slate-800/50 dark:border-slate-800 dark:text-slate-400 bg-slate-100 border border-slate-200 text-slate-500 rounded-xl text-sm font-medium cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-600 to-accent-500 text-white font-semibold rounded-xl px-5 py-2.5 text-sm shadow-md hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98] transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {isSaving ? "Saving..." : "Save Profile Changes"}
          </button>
        </form>
      </div>

      {/* Connected Social Accounts Overview */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 shadow-card p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 dark:bg-cyan-500/20 dark:border dark:border-cyan-500/30 bg-cyan-100 border border-cyan-200 rounded-xl flex items-center justify-center">
              <Globe className="w-5 h-5 dark:text-cyan-400 text-cyan-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold dark:text-white text-gray-900">
                Connected Social Media Integrations
              </h2>
              <p className="text-xs dark:text-gray-400 text-gray-500">
                Active OAuth platform authorization connections
              </p>
            </div>
          </div>

          <Link
            to="/platforms"
            className="text-xs font-semibold dark:text-cyan-400 text-brand-600 hover:underline inline-flex items-center gap-1"
          >
            Manage Platforms <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center font-bold">
                YT
              </div>
              <div>
                <p className="text-sm font-bold dark:text-white text-slate-900">YouTube Data API</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {youtubeConnected ? connectedPlatforms?.youtube?.account_name || "Account Connected" : "Not connected"}
                </p>
              </div>
            </div>
            <span
              className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                youtubeConnected
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                  : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
              }`}
            >
              {youtubeConnected ? "Connected" : "Disconnected"}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-600/10 text-blue-600 flex items-center justify-center font-bold">
                IN
              </div>
              <div>
                <p className="text-sm font-bold dark:text-white text-slate-900">LinkedIn REST API</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {linkedinConnected ? connectedPlatforms?.linkedin?.account_name || "Account Connected" : "Not connected"}
                </p>
              </div>
            </div>
            <span
              className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                linkedinConnected
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                  : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
              }`}
            >
              {linkedinConnected ? "Connected" : "Disconnected"}
            </span>
          </div>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 shadow-card p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="w-10 h-10 dark:bg-indigo-500/20 dark:border dark:border-indigo-500/30 bg-indigo-100 border border-indigo-200 rounded-xl flex items-center justify-center">
            <Bell className="w-5 h-5 dark:text-indigo-400 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold dark:text-white text-gray-900">
              Notification & Alert Preferences
            </h2>
            <p className="text-xs dark:text-gray-400 text-gray-500">
              Control when and how you receive publishing notifications
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {[
            { key: "email", label: "Email Notifications", desc: "Receive publishing status & video completion reports" },
            { key: "scheduledAlerts", label: "Scheduled Publishing Alerts", desc: "Get notified 15 minutes before scheduled posts go live" },
            { key: "push", label: "Browser Push Alerts", desc: "Show desktop notifications on successful uploads" },
            { key: "updates", label: "Platform Feature Updates", desc: "Receive product changelogs and API feature additions" },
          ].map(({ key, label, desc }) => (
            <div
              key={key}
              className="flex items-center justify-between p-4 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-700/50 rounded-xl"
            >
              <div>
                <p className="text-sm font-semibold dark:text-slate-200 text-slate-900">
                  {label}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{desc}</p>
              </div>

              <button
                type="button"
                onClick={() => toggleNotification(key)}
                className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                  notifications[key] ? "bg-brand-600" : "bg-slate-200 dark:bg-slate-700"
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
                    notifications[key] ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Password & Security Section */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 shadow-card p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="w-10 h-10 dark:bg-amber-500/20 dark:border dark:border-amber-500/30 bg-amber-100 border border-amber-200 rounded-xl flex items-center justify-center">
            <Lock className="w-5 h-5 dark:text-amber-400 text-amber-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold dark:text-white text-gray-900">
              Security & Password
            </h2>
            <p className="text-xs dark:text-gray-400 text-gray-500">
              Update your access password and security preferences
            </p>
          </div>
        </div>

        <form onSubmit={handleSecuritySave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider dark:text-slate-300 text-slate-700 mb-1.5">
              Current Password
            </label>
            <input
              type="password"
              value={securityData.currentPassword}
              onChange={(e) => setSecurityData({ ...securityData, currentPassword: e.target.value })}
              className="w-full px-4 py-2.5 dark:bg-slate-800 dark:border-slate-700 dark:text-white bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              placeholder="••••••••"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider dark:text-slate-300 text-slate-700 mb-1.5">
                New Password
              </label>
              <input
                type="password"
                value={securityData.newPassword}
                onChange={(e) => setSecurityData({ ...securityData, newPassword: e.target.value })}
                className="w-full px-4 py-2.5 dark:bg-slate-800 dark:border-slate-700 dark:text-white bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                placeholder="At least 6 characters"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider dark:text-slate-300 text-slate-700 mb-1.5">
                Confirm New Password
              </label>
              <input
                type="password"
                value={securityData.confirmPassword}
                onChange={(e) => setSecurityData({ ...securityData, confirmPassword: e.target.value })}
                className="w-full px-4 py-2.5 dark:bg-slate-800 dark:border-slate-700 dark:text-white bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                placeholder="Re-enter new password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSavingSecurity}
            className="inline-flex items-center gap-2 bg-slate-900 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-semibold rounded-xl px-4 py-2.5 text-sm transition-all"
          >
            <Key className="w-4 h-4 text-amber-400" />
            {isSavingSecurity ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>

      {/* Danger Zone */}
      <div className="p-6 bg-red-50/50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/60 rounded-2xl">
        <div className="flex items-center gap-2 mb-2 text-red-600 dark:text-red-400">
          <AlertTriangle className="w-5 h-5" />
          <h3 className="text-lg font-bold">Danger Zone</h3>
        </div>
        <p className="text-xs dark:text-red-300/80 text-red-700 mb-4">
          Permanently delete your account and remove all connected platform authorizations, scheduled posts, and media history. This action cannot be undone.
        </p>
        <button
          type="button"
          onClick={() => showError("Account deletion is restricted for demo administrator account.")}
          className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs rounded-xl transition-all shadow-sm"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Settings;
