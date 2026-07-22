import { useState } from "react";
import {
  HiUser,
  HiLockClosed,
  HiBell,
  HiCheckCircle,
  HiLocationMarker,
  HiMail,
  HiPhone,
  HiPencil,
  HiShieldCheck,
  HiSparkles,
} from "react-icons/hi";
import api from "../lib/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { Badge, Card, Button, Input } from "../components/ui";

export default function Profile() {
  const { user, setUser } = useAuth();
  const [activeTab, setActiveTab] = useState("profile"); // "profile" | "security" | "notifications"

  // Profile Form
  const [profileForm, setProfileForm] = useState({
    full_name: user?.full_name || "",
    phone: user?.phone || "",
    location: user?.location || "",
    bio: user?.bio || "",
    avatar_url: user?.avatar_url || "",
  });
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [profileError, setProfileError] = useState("");

  // Security Form
  const [securityForm, setSecurityForm] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [securitySaving, setSecuritySaving] = useState(false);
  const [securitySuccess, setSecuritySuccess] = useState(false);
  const [securityError, setSecurityError] = useState("");

  // Notifications Toggle
  const [notifPrefs, setNotifPrefs] = useState({
    weather_alerts: true,
    marketplace_inquiries: true,
    ai_recommendations: true,
    price_alerts: false,
  });
  const [notifSuccess, setNotifSuccess] = useState(false);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setProfileSaving(true);
    setProfileSuccess(false);
    setProfileError("");

    try {
      const res = await api.put("/api/auth/profile", profileForm);
      if (setUser) setUser(res.data);
      setProfileSuccess(true);
      setTimeout(() => setProfileSuccess(false), 3000);
    } catch (err) {
      setProfileError(err.response?.data?.detail || err.message || "Failed to update profile");
    } finally {
      setProfileSaving(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setSecurityError("");
    setSecuritySuccess(false);

    if (securityForm.new_password !== securityForm.confirm_password) {
      setSecurityError("New passwords do not match.");
      return;
    }

    if (securityForm.new_password.length < 6) {
      setSecurityError("Password must be at least 6 characters.");
      return;
    }

    setSecuritySaving(true);
    try {
      await api.post("/api/auth/change-password", {
        current_password: securityForm.current_password,
        new_password: securityForm.new_password,
      });
      setSecuritySuccess(true);
      setSecurityForm({ current_password: "", new_password: "", confirm_password: "" });
      setTimeout(() => setSecuritySuccess(false), 3000);
    } catch (err) {
      setSecurityError(err.response?.data?.detail || err.message || "Failed to change password");
    } finally {
      setSecuritySaving(false);
    }
  };

  const handleSaveNotifs = (e) => {
    e.preventDefault();
    setNotifSuccess(true);
    setTimeout(() => setNotifSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />

      <main className="flex-1 mx-auto max-w-7xl w-full px-4 py-8 sm:px-6 lg:px-8">
        <div className="animate-fade-in space-y-8">
          {/* Header */}
          <div className="border-b border-border pb-6">
            <Badge variant="primary">Account & Preferences</Badge>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              User Profile & Settings
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage your personal credentials, contact details, security keys, and notification channels.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar User Identity Card */}
            <div className="space-y-6">
              <Card className="p-6 text-center space-y-4">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-500/10 text-emerald-500 font-extrabold text-2xl border border-emerald-500/20">
                  {user?.full_name?.charAt(0) || "U"}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{user?.full_name}</h3>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                  <div className="mt-2 flex justify-center">
                    <Badge variant="primary" className="capitalize">
                      Role: {user?.role}
                    </Badge>
                  </div>
                </div>

                <div className="border-t border-border/60 pt-4 text-xs text-muted-foreground space-y-2 text-left">
                  <div className="flex items-center gap-2">
                    <HiLocationMarker className="h-4 w-4 text-emerald-500" />
                    <span>{user?.location || "Location not set"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <HiPhone className="h-4 w-4 text-blue-500" />
                    <span>{user?.phone || "Phone not set"}</span>
                  </div>
                </div>
              </Card>

              {/* Navigation Menu */}
              <Card className="p-2 space-y-1">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full flex items-center gap-3 rounded-xl p-3 text-xs font-semibold transition ${
                    activeTab === "profile"
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                      : "hover:bg-muted text-muted-foreground"
                  }`}
                >
                  <HiUser className="h-4 w-4" /> Personal Profile
                </button>
                <button
                  onClick={() => setActiveTab("security")}
                  className={`w-full flex items-center gap-3 rounded-xl p-3 text-xs font-semibold transition ${
                    activeTab === "security"
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                      : "hover:bg-muted text-muted-foreground"
                  }`}
                >
                  <HiLockClosed className="h-4 w-4" /> Security & Password
                </button>
                <button
                  onClick={() => setActiveTab("notifications")}
                  className={`w-full flex items-center gap-3 rounded-xl p-3 text-xs font-semibold transition ${
                    activeTab === "notifications"
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                      : "hover:bg-muted text-muted-foreground"
                  }`}
                >
                  <HiBell className="h-4 w-4" /> Notification Preferences
                </button>
              </Card>
            </div>

            {/* Main Form Tab Panel */}
            <div className="lg:col-span-3">
              {/* TAB 1: PERSONAL PROFILE */}
              {activeTab === "profile" && (
                <Card className="p-6 space-y-6">
                  <h2 className="text-xl font-bold border-b border-border pb-4">Personal Details</h2>

                  {profileSuccess && (
                    <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-2">
                      <HiCheckCircle className="h-5 w-5" /> Profile updated successfully!
                    </div>
                  )}

                  {profileError && (
                    <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-500 font-semibold">
                      {profileError}
                    </div>
                  )}

                  <form onSubmit={handleSaveProfile} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-muted-foreground mb-1">
                          Full Name *
                        </label>
                        <Input
                          type="text"
                          value={profileForm.full_name}
                          onChange={(e) => setProfileForm({ ...profileForm, full_name: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-muted-foreground mb-1">
                          Phone Number
                        </label>
                        <Input
                          type="text"
                          placeholder="+91 98765 43210"
                          value={profileForm.phone}
                          onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground mb-1">
                        Location / District
                      </label>
                      <Input
                        type="text"
                        placeholder="e.g. Nashik, Maharashtra"
                        value={profileForm.location}
                        onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground mb-1">
                        Avatar Image URL
                      </label>
                      <Input
                        type="url"
                        placeholder="https://..."
                        value={profileForm.avatar_url}
                        onChange={(e) => setProfileForm({ ...profileForm, avatar_url: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground mb-1">
                        Bio / Farm Overview
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Describe your agricultural specialties or farm details..."
                        value={profileForm.bio}
                        onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                        className="w-full rounded-xl border border-border bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                      />
                    </div>

                    <div className="flex justify-end pt-4 border-t border-border">
                      <Button type="submit" variant="primary" disabled={profileSaving}>
                        {profileSaving ? "Saving..." : "Save Profile Changes"}
                      </Button>
                    </div>
                  </form>
                </Card>
              )}

              {/* TAB 2: SECURITY & PASSWORD */}
              {activeTab === "security" && (
                <Card className="p-6 space-y-6">
                  <h2 className="text-xl font-bold border-b border-border pb-4">Security & Password</h2>

                  {securitySuccess && (
                    <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-2">
                      <HiCheckCircle className="h-5 w-5" /> Password updated successfully!
                    </div>
                  )}

                  {securityError && (
                    <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-500 font-semibold">
                      {securityError}
                    </div>
                  )}

                  <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground mb-1">
                        Current Password *
                      </label>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        value={securityForm.current_password}
                        onChange={(e) => setSecurityForm({ ...securityForm, current_password: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground mb-1">
                        New Password *
                      </label>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        value={securityForm.new_password}
                        onChange={(e) => setSecurityForm({ ...securityForm, new_password: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground mb-1">
                        Confirm New Password *
                      </label>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        value={securityForm.confirm_password}
                        onChange={(e) => setSecurityForm({ ...securityForm, confirm_password: e.target.value })}
                        required
                      />
                    </div>

                    <div className="pt-4 border-t border-border">
                      <Button type="submit" variant="primary" disabled={securitySaving}>
                        {securitySaving ? "Updating..." : "Update Password"}
                      </Button>
                    </div>
                  </form>
                </Card>
              )}

              {/* TAB 3: NOTIFICATIONS */}
              {activeTab === "notifications" && (
                <Card className="p-6 space-y-6">
                  <h2 className="text-xl font-bold border-b border-border pb-4">Notification Channels</h2>

                  {notifSuccess && (
                    <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-2">
                      <HiCheckCircle className="h-5 w-5" /> Preferences saved!
                    </div>
                  )}

                  <form onSubmit={handleSaveNotifs} className="space-y-4">
                    <div className="space-y-3">
                      <label className="flex items-center justify-between p-4 rounded-xl border border-border bg-card">
                        <div>
                          <p className="font-semibold text-sm">Weather Risk & Storm Alerts</p>
                          <p className="text-xs text-muted-foreground">Receive real-time notifications for sudden rain or temperature spikes.</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={notifPrefs.weather_alerts}
                          onChange={(e) => setNotifPrefs({ ...notifPrefs, weather_alerts: e.target.checked })}
                          className="h-5 w-5 rounded border-border text-emerald-600 focus:ring-emerald-500"
                        />
                      </label>

                      <label className="flex items-center justify-between p-4 rounded-xl border border-border bg-card">
                        <div>
                          <p className="font-semibold text-sm">Marketplace Purchase Inquiries</p>
                          <p className="text-xs text-muted-foreground">Get notified when a buyer contacts you about your produce listing.</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={notifPrefs.marketplace_inquiries}
                          onChange={(e) => setNotifPrefs({ ...notifPrefs, marketplace_inquiries: e.target.checked })}
                          className="h-5 w-5 rounded border-border text-emerald-600 focus:ring-emerald-500"
                        />
                      </label>

                      <label className="flex items-center justify-between p-4 rounded-xl border border-border bg-card">
                        <div>
                          <p className="font-semibold text-sm">AI Farming Advice Summaries</p>
                          <p className="text-xs text-muted-foreground">Receive weekly crop health and fertilizer recommendations.</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={notifPrefs.ai_recommendations}
                          onChange={(e) => setNotifPrefs({ ...notifPrefs, ai_recommendations: e.target.checked })}
                          className="h-5 w-5 rounded border-border text-emerald-600 focus:ring-emerald-500"
                        />
                      </label>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-border">
                      <Button type="submit" variant="primary">
                        Save Preferences
                      </Button>
                    </div>
                  </form>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
