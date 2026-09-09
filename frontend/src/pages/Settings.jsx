import { useState } from "react";
import { User, Mail, Bell, Moon } from "lucide-react";
import { useApp } from "../context/AppContext";
import { useToast } from "../context/ToastContext";
import { getInitials } from "../utils/helpers";

const Settings = () => {
  const { user, updateUser } = useApp();
  const { success } = useToast();

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    updates: true,
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSaveProfile = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    updateUser(formData);
    success("Profile updated successfully!");
    setIsSaving(false);
  };

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold dark:text-white text-gray-900 mb-2">Settings</h1>
        <p className="dark:text-gray-400 text-gray-600">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Profile Section */}
      <div className="p-6 dark:bg-navy-800/60 dark:backdrop-blur-xl dark:border dark:border-indigo-600/30 bg-white/60 backdrop-blur-xl border border-gray-200/50 rounded-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 dark:bg-indigo-600/20 dark:border dark:border-indigo-500/30 bg-indigo-100 border border-indigo-300 rounded-xl flex items-center justify-center">
            <User className="w-5 h-5 dark:text-indigo-400 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold dark:text-white text-gray-900">
              Profile Information
            </h2>
            <p className="text-sm dark:text-gray-400 text-gray-600">
              Update your personal details
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Avatar */}
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-gradient-to-br dark:from-indigo-600 dark:to-cyan-500 from-indigo-400 to-cyan-400 rounded-full flex items-center justify-center dark:shadow-glow shadow-md">
              <span className="text-white font-bold text-2xl">
                {getInitials(formData.name)}
              </span>
            </div>
            <button className="px-6 py-3 dark:bg-navy-800 dark:hover:bg-navy-700 dark:text-gray-300 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-200">
              Change Avatar
            </button>
          </div>

          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold dark:text-white text-gray-900 mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-3 dark:bg-navy-900 dark:border dark:border-navy-700 dark:text-white dark:focus:ring-indigo-500 dark:placeholder:text-gray-500 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 rounded-xl"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold dark:text-white text-gray-900 mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-3 dark:bg-navy-900 dark:border dark:border-navy-700 dark:text-white dark:focus:ring-indigo-500 dark:placeholder:text-gray-500 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 rounded-xl"
            />
          </div>

          {/* Save Button */}
          <button
            onClick={handleSaveProfile}
            disabled={isSaving}
            className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 dark:hover:from-orange-600 dark:hover:to-orange-700 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-glow-orange disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="p-6 dark:bg-navy-800/60 dark:backdrop-blur-xl dark:border dark:border-indigo-600/30 bg-white/60 backdrop-blur-xl border border-gray-200/50 rounded-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 dark:bg-cyan-600/20 dark:border dark:border-cyan-500/30 bg-cyan-100 border border-cyan-300 rounded-xl flex items-center justify-center">
            <Bell className="w-5 h-5 dark:text-cyan-400 text-cyan-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold dark:text-white text-gray-900">Notifications</h2>
            <p className="text-sm dark:text-gray-400 text-gray-600">
              Manage your notification preferences
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {Object.entries({
            email: "Email Notifications",
            push: "Push Notifications",
            updates: "Product Updates",
          }).map(([key, label]) => (
            <div
              key={key}
              className="flex items-center justify-between p-4 dark:bg-navy-900/60 dark:border dark:border-navy-700 bg-gray-50 border border-gray-200 rounded-xl"
            >
              <span className="text-sm font-medium dark:text-gray-300 text-gray-900">{label}</span>
              <button
                onClick={() =>
                  setNotifications({
                    ...notifications,
                    [key]: !notifications[key],
                  })
                }
                className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                  notifications[key] ? "dark:bg-indigo-600 bg-indigo-600" : "dark:bg-navy-700 bg-gray-300"
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
                    notifications[key] ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Appearance Section */}
      <div className="p-6 dark:bg-navy-800/60 dark:backdrop-blur-xl dark:border dark:border-indigo-600/30 bg-white/60 backdrop-blur-xl border border-gray-200/50 rounded-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 dark:bg-orange-600/20 dark:border dark:border-orange-500/30 bg-orange-100 border border-orange-300 rounded-xl flex items-center justify-center">
            <Moon className="w-5 h-5 dark:text-orange-400 text-orange-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold dark:text-white text-gray-900">Appearance</h2>
            <p className="text-sm dark:text-gray-400 text-gray-600">Customize your interface</p>
          </div>
        </div>

        <div className="p-4 dark:bg-emerald-500/10 dark:border dark:border-emerald-500/30 bg-emerald-50 border border-emerald-200 rounded-xl">
          <p className="text-sm dark:text-emerald-300/80 text-emerald-700">
            🌙 Dark mode is now available! Enjoy the premium dark theme with enhanced readability and reduced eye strain.
          </p>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="p-6 dark:bg-red-500/10 dark:border dark:border-red-500/30 bg-red-50 border border-red-200 rounded-2xl">
        <h3 className="text-lg font-bold dark:text-red-400 text-red-900 mb-3">Danger Zone</h3>
        <p className="text-sm dark:text-red-300/80 text-red-700 mb-4">
          Once you delete your account, there is no going back. Please be
          certain.
        </p>
        <button className="px-6 py-3 bg-red-600 dark:hover:bg-red-700 hover:bg-red-700 text-white font-semibold rounded-xl transition-all duration-200">
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Settings;
