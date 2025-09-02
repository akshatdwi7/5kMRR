import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import {
  User,
  Bell,
  Shield,
  Palette,
  Database,
  Download,
  Trash2,
  Save,
  Mail,
  Phone,
  Calendar,
} from "lucide-react";

export const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [profileData, setProfileData] = useState({
    name: "Demo User",
    email: "demo@screeno.in",
    phone: "",
    timezone: "Asia/Kolkata",
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    priceAlerts: true,
    weeklyReports: false,
    marketNews: true,
  });

  const tabs = [
    {
      id: "profile",
      label: "Profile",
      icon: <User className="h-4 w-4" />,
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: <Bell className="h-4 w-4" />,
    },
    {
      id: "security",
      label: "Security",
      icon: <Shield className="h-4 w-4" />,
    },
    {
      id: "appearance",
      label: "Appearance",
      icon: <Palette className="h-4 w-4" />,
    },
    {
      id: "data",
      label: "Data & Privacy",
      icon: <Database className="h-4 w-4" />,
    },
  ];

  const handleSaveProfile = () => {
    // TODO: Implement profile update logic
    console.log("Saving profile:", profileData);
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Settings Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Account Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your account preferences and security settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-neutral-800 rounded-xl border border-gray-200 dark:border-neutral-700 p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-neutral-700"
                  }`}
                >
                  {tab.icon}
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-neutral-800 rounded-xl border border-gray-200 dark:border-neutral-700 p-6"
          >
            {activeTab === "profile" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Profile Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name
                      </label>
                      <Input
                        value={profileData.name}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            name: e.target.value,
                          })
                        }
                        placeholder="Enter your full name"
                        icon={<User className="h-4 w-4" />}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address
                      </label>
                      <Input
                        value={profileData.email}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            email: e.target.value,
                          })
                        }
                        placeholder="Enter your email"
                        icon={<Mail className="h-4 w-4" />}
                        disabled
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Phone Number
                      </label>
                      <Input
                        value={profileData.phone}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            phone: e.target.value,
                          })
                        }
                        placeholder="Enter your phone number"
                        icon={<Phone className="h-4 w-4" />}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Timezone
                      </label>
                      <select
                        value={profileData.timezone}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            timezone: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-gray-900 dark:text-white"
                      >
                        <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                        <option value="America/New_York">
                          America/New_York (EST)
                        </option>
                        <option value="Europe/London">
                          Europe/London (GMT)
                        </option>
                        <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end mt-6">
                    <Button
                      onClick={handleSaveProfile}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Notification Preferences
                  </h2>

                  <div className="space-y-4">
                    {Object.entries({
                      emailAlerts: "Email Alerts",
                      priceAlerts: "Price Alerts",
                      weeklyReports: "Weekly Reports",
                      marketNews: "Market News",
                    }).map(([key, label]) => (
                      <div
                        key={key}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {label}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Receive {label.toLowerCase()} notifications
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={
                              notifications[key as keyof typeof notifications]
                            }
                            onChange={(e) =>
                              handleNotificationChange(key, e.target.checked)
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Security Settings
                  </h2>

                  <div className="space-y-4">
                    <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                      <h3 className="font-medium text-yellow-800 dark:text-yellow-300 mb-2">
                        Two-Factor Authentication
                      </h3>
                      <p className="text-sm text-yellow-600 dark:text-yellow-400 mb-3">
                        Add an extra layer of security to your account
                      </p>
                      <Button
                        variant="outline"
                        className="border-yellow-300 text-yellow-600 hover:bg-yellow-100"
                      >
                        Enable 2FA
                      </Button>
                    </div>

                    <div className="p-4 bg-gray-50 dark:bg-neutral-700 rounded-lg">
                      <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                        Change Password
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        Update your password regularly for better security
                      </p>
                      <Button variant="outline">Change Password</Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "appearance" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Appearance Settings
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white mb-3">
                        Theme
                      </p>
                      <div className="grid grid-cols-3 gap-3">
                        {["Light", "Dark", "System"].map((theme) => (
                          <button
                            key={theme}
                            className="p-3 text-center border border-gray-200 dark:border-neutral-600 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors"
                          >
                            {theme}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "data" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Data & Privacy
                  </h2>

                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <h3 className="font-medium text-blue-800 dark:text-blue-300 mb-2">
                        Export Data
                      </h3>
                      <p className="text-sm text-blue-600 dark:text-blue-400 mb-3">
                        Download a copy of your data
                      </p>
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <Download className="h-4 w-4 mr-2" />
                        Export Data
                      </Button>
                    </div>

                    <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                      <h3 className="font-medium text-red-800 dark:text-red-300 mb-2">
                        Delete Account
                      </h3>
                      <p className="text-sm text-red-600 dark:text-red-400 mb-3">
                        Permanently delete your account and all data
                      </p>
                      <Button
                        variant="outline"
                        className="border-red-300 text-red-600 hover:bg-red-100"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
