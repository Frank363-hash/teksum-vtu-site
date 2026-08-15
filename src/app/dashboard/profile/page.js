"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
  const router = useRouter();

  const {
    user,
    isAuthenticated,
    loading,
  } = useAuth();

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] =
    useState(false);
  const [showNewPassword, setShowNewPassword] =
    useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [deleteModalOpen, setDeleteModalOpen] =
    useState(false);

  const [deleteConfirmation, setDeleteConfirmation] =
    useState("");

  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    newPassword: "",
    confirm: "",
  });

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace(
        `/login?redirect=${encodeURIComponent(
          "/dashboard/profile"
        )}`
      );
    }
  }, [
    loading,
    isAuthenticated,
    router,
  ]);

  /*
   * Populate the form from the authenticated user.
   *
   * This intentionally supports several common property names
   * so the real backend response can be connected later without
   * redesigning this page.
   */
  useEffect(() => {
    if (!user) return;

    setProfile({
      fullName:
        user.name ||
        user.fullName ||
        [user.firstName, user.lastName]
          .filter(Boolean)
          .join(" ") ||
        "",
      email: user.email || "",
      phone:
        user.phone ||
        user.phoneNumber ||
        "",
    });
  }, [user]);

  const initials = useMemo(() => {
    const name =
      profile.fullName ||
      user?.email ||
      "TEKSUM";

    const parts = name
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }

    return (
      parts[0]?.slice(0, 2).toUpperCase() ||
      "TS"
    );
  }, [profile.fullName, user]);

  const accountId =
    user?.id ||
    user?.userId ||
    user?.accountId ||
    "Pending backend";

  const memberSince =
    user?.createdAt
      ? new Date(
          user.createdAt
        ).toLocaleDateString(
          "en-NG",
          {
            month: "long",
            year: "numeric",
          }
        )
      : "Will be provided by backend";

  const accountStatus =
    user?.status ||
    user?.accountStatus ||
    "Active";

  function updateProfileField(
    field,
    value
  ) {
    setProfile((current) => ({
      ...current,
      [field]: value,
    }));

    setSaved(false);
    setError("");
  }

  function updatePasswordField(
    field,
    value
  ) {
    setPasswords((current) => ({
      ...current,
      [field]: value,
    }));

    setError("");
  }

  async function handleSaveProfile(event) {
    event.preventDefault();

    setError("");
    setSaved(false);

    if (!profile.fullName.trim()) {
      setError(
        "Please enter your full name."
      );
      return;
    }

    if (!profile.email.trim()) {
      setError(
        "Please enter your email address."
      );
      return;
    }

    setSaving(true);

    /*
     * FRONTEND-ONLY STATE FOR NOW
     *
     * This is intentionally not pretending to update the
     * database. When the backend is connected, this section
     * will call the real authenticated profile endpoint.
     *
     * Example future flow:
     *
     * PATCH /api/users/me
     *
     * {
     *   fullName,
     *   email,
     *   phone
     * }
     */

    await new Promise((resolve) =>
      setTimeout(resolve, 600)
    );

    setSaving(false);
    setSaved(true);
  }

  async function handleChangePassword(event) {
    event.preventDefault();

    setError("");

    if (!passwords.current) {
      setError(
        "Enter your current password."
      );
      return;
    }

    if (!passwords.newPassword) {
      setError(
        "Enter your new password."
      );
      return;
    }

    if (passwords.newPassword.length < 8) {
      setError(
        "Your new password should be at least 8 characters."
      );
      return;
    }

    if (
      passwords.newPassword !==
      passwords.confirm
    ) {
      setError(
        "The new passwords do not match."
      );
      return;
    }

    setSaving(true);

    /*
     * BACKEND READY
     *
     * This will later become:
     *
     * PATCH /api/auth/password
     *
     * {
     *   currentPassword,
     *   newPassword
     * }
     */

    await new Promise((resolve) =>
      setTimeout(resolve, 600)
    );

    setSaving(false);

    setPasswords({
      current: "",
      newPassword: "",
      confirm: "",
    });

    setSaved(true);
  }

  function handleDeleteAccount() {
    setError("");

    if (
      deleteConfirmation.trim().toUpperCase() !==
      "DELETE"
    ) {
      setError(
        'Type "DELETE" to confirm account deletion.'
      );
      return;
    }

    /*
     * DO NOT delete anything from the frontend.
     *
     * The real backend must perform account deletion,
     * authentication invalidation and any required
     * transaction/account checks.
     *
     * Future endpoint:
     *
     * DELETE /api/users/me
     */

    setDeleteModalOpen(false);
    setDeleteConfirmation("");

    setError(
      "Account deletion will be available when the TEKSUM backend is connected."
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f0f4ff] dark:bg-[#0a1020]">
        <Navbar />

        <main className="flex min-h-[70vh] items-center justify-center px-4">
          <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#dbeafe] border-t-[#1e40af] dark:border-[#294b86] dark:border-t-[#3b60d4]" />

            <p className="mt-4 text-sm font-semibold text-[#475569] dark:text-[#94a3b8]">
              Loading your account...
            </p>
          </div>
        </main>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#f0f4ff] dark:bg-[#0a1020]">
        <Navbar />

        <main className="flex min-h-[70vh] items-center justify-center px-4">
          <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#dbeafe] border-t-[#1e40af]" />

            <p className="mt-4 text-sm text-[#64748b] dark:text-[#94a3b8]">
              Redirecting to login...
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0f4ff] dark:bg-[#0a1020]">
      <Navbar />

      <main className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-5">

          {/* =====================================================
              HEADER
          ====================================================== */}
          <div>
            <Link
              href="/dashboard"
              className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-[#475569] transition hover:text-[#1e40af] dark:text-[#7b8ebc] dark:hover:text-[#3b60d4]"
            >
              ← Back to Dashboard
            </Link>

            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#1e40af] dark:text-[#3b60d4]">
                  Account
                </p>

                <h1 className="mt-1 text-2xl font-bold text-[#0f172a] dark:text-[#e8eeff]">
                  Profile & Settings
                </h1>

                <p className="mt-1 text-sm text-[#64748b] dark:text-[#94a3b8]">
                  Manage your personal information and account security.
                </p>
              </div>
            </div>
          </div>

          {/* =====================================================
              GLOBAL MESSAGE
          ====================================================== */}
          {(error || saved) && (
            <div
              className={`rounded-xl border px-4 py-3 text-sm font-medium ${
                error
                  ? "border-red-200 bg-red-50 text-red-700 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-300"
                  : "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-950/30 dark:text-emerald-300"
              }`}
            >
              {error ||
                "Your changes have been saved locally for this frontend preview. They will be synced with the TEKSUM backend once authentication and profile APIs are connected."}
            </div>
          )}

          {/* =====================================================
              PROFILE SUMMARY
          ====================================================== */}
          <section className="rounded-2xl border border-[#dbeafe] bg-white p-5 shadow-sm dark:border-[#1e3a6e] dark:bg-[#152040] sm:p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#1e40af] text-xl font-bold text-white dark:bg-[#3b60d4]">
                  {initials}
                </div>

                <div className="min-w-0">
                  <h2 className="truncate text-lg font-bold text-[#0f172a] dark:text-[#e8eeff]">
                    {profile.fullName ||
                      "TEKSUM User"}
                  </h2>

                  <p className="truncate text-sm text-[#64748b] dark:text-[#94a3b8]">
                    {profile.email ||
                      "Email not available"}
                  </p>

                  <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#dcfce7] px-3 py-1 text-xs font-bold text-[#15803d] dark:bg-[#052e16] dark:text-[#4ade80]">
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    {accountStatus ===
                    "verified"
                      ? "Verified"
                      : "Active"}
                  </span>
                </div>
              </div>

              <div className="rounded-xl bg-[#f0f4ff] px-4 py-3 dark:bg-[#0d1526]">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#64748b] dark:text-[#7b8ebc]">
                  Account ID
                </p>

                <p className="mt-1 break-all text-xs font-bold text-[#334155] dark:text-[#cbd5e1]">
                  {accountId}
                </p>
              </div>
            </div>
          </section>

          {/* =====================================================
              PERSONAL INFORMATION
          ====================================================== */}
          <section className="rounded-2xl border border-[#dbeafe] bg-white p-5 shadow-sm dark:border-[#1e3a6e] dark:bg-[#152040] sm:p-6">
            <div className="mb-6">
              <h2 className="text-base font-bold text-[#0f172a] dark:text-[#e8eeff]">
                Personal Information
              </h2>

              <p className="mt-1 text-xs leading-relaxed text-[#64748b] dark:text-[#94a3b8]">
                Keep your account information accurate. Changes will be connected to the TEKSUM account service when the backend is live.
              </p>
            </div>

            <form
              onSubmit={handleSaveProfile}
              className="space-y-4"
            >
              <div>
                <label
                  htmlFor="fullName"
                  className="mb-1.5 block text-sm font-semibold text-[#334155] dark:text-[#cbd5e1]"
                >
                  Full Name
                </label>

                <input
                  id="fullName"
                  type="text"
                  value={profile.fullName}
                  onChange={(event) =>
                    updateProfileField(
                      "fullName",
                      event.target.value
                    )
                  }
                  autoComplete="name"
                  className="w-full rounded-xl border border-[#dbeafe] bg-white px-4 py-3 text-sm text-[#0f172a] outline-none transition focus:border-[#1e40af] focus:ring-2 focus:ring-[#1e40af]/20 dark:border-[#1e3a6e] dark:bg-[#0d1526] dark:text-[#e8eeff]"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm font-semibold text-[#334155] dark:text-[#cbd5e1]"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(event) =>
                    updateProfileField(
                      "email",
                      event.target.value
                    )
                  }
                  autoComplete="email"
                  className="w-full rounded-xl border border-[#dbeafe] bg-white px-4 py-3 text-sm text-[#0f172a] outline-none transition focus:border-[#1e40af] focus:ring-2 focus:ring-[#1e40af]/20 dark:border-[#1e3a6e] dark:bg-[#0d1526] dark:text-[#e8eeff]"
                />

                <p className="mt-1.5 text-[11px] text-[#94a3b8]">
                  Email changes may require verification from the backend.
                </p>
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-1.5 block text-sm font-semibold text-[#334155] dark:text-[#cbd5e1]"
                >
                  Phone Number
                </label>

                <input
                  id="phone"
                  type="tel"
                  value={profile.phone}
                  onChange={(event) =>
                    updateProfileField(
                      "phone",
                      event.target.value
                    )
                  }
                  autoComplete="tel"
                  placeholder="08012345678"
                  className="w-full rounded-xl border border-[#dbeafe] bg-white px-4 py-3 text-sm text-[#0f172a] outline-none transition focus:border-[#1e40af] focus:ring-2 focus:ring-[#1e40af]/20 dark:border-[#1e3a6e] dark:bg-[#0d1526] dark:text-[#e8eeff]"
                />
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full rounded-xl bg-[#1e40af] py-3 text-sm font-bold text-white transition hover:bg-[#1d3a9e] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#3b60d4] sm:w-auto sm:px-8"
              >
                {saving
                  ? "Saving..."
                  : "Save Changes"}
              </button>
            </form>
          </section>

          {/* =====================================================
              CHANGE PASSWORD
          ====================================================== */}
          <section className="rounded-2xl border border-[#dbeafe] bg-white p-5 shadow-sm dark:border-[#1e3a6e] dark:bg-[#152040] sm:p-6">
            <div className="mb-6">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f0f4ff] text-sm dark:bg-[#0d1526]">
                  🔐
                </div>

                <div>
                  <h2 className="text-base font-bold text-[#0f172a] dark:text-[#e8eeff]">
                    Change Password
                  </h2>

                  <p className="mt-0.5 text-xs text-[#64748b] dark:text-[#94a3b8]">
                    Keep your TEKSUM account secure.
                  </p>
                </div>
              </div>
            </div>

            <form
              onSubmit={handleChangePassword}
              className="space-y-4"
            >
              {/* Current password */}
              <div>
                <label
                  htmlFor="currentPassword"
                  className="mb-1.5 block text-sm font-semibold text-[#334155] dark:text-[#cbd5e1]"
                >
                  Current Password
                </label>

                <div className="relative">
                  <input
                    id="currentPassword"
                    type={
                      showCurrentPassword
                        ? "text"
                        : "password"
                    }
                    value={passwords.current}
                    onChange={(event) =>
                      updatePasswordField(
                        "current",
                        event.target.value
                      )
                    }
                    autoComplete="current-password"
                    placeholder="Enter current password"
                    className="w-full rounded-xl border border-[#dbeafe] bg-white px-4 py-3 pr-16 text-sm text-[#0f172a] outline-none transition focus:border-[#1e40af] focus:ring-2 focus:ring-[#1e40af]/20 dark:border-[#1e3a6e] dark:bg-[#0d1526] dark:text-[#e8eeff]"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowCurrentPassword(
                        (current) =>
                          !current
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#1e40af] dark:text-[#3b60d4]"
                  >
                    {showCurrentPassword
                      ? "Hide"
                      : "Show"}
                  </button>
                </div>
              </div>

              {/* New password */}
              <div>
                <label
                  htmlFor="newPassword"
                  className="mb-1.5 block text-sm font-semibold text-[#334155] dark:text-[#cbd5e1]"
                >
                  New Password
                </label>

                <div className="relative">
                  <input
                    id="newPassword"
                    type={
                      showNewPassword
                        ? "text"
                        : "password"
                    }
                    value={
                      passwords.newPassword
                    }
                    onChange={(event) =>
                      updatePasswordField(
                        "newPassword",
                        event.target.value
                      )
                    }
                    autoComplete="new-password"
                    placeholder="Enter new password"
                    className="w-full rounded-xl border border-[#dbeafe] bg-white px-4 py-3 pr-16 text-sm text-[#0f172a] outline-none transition focus:border-[#1e40af] focus:ring-2 focus:ring-[#1e40af]/20 dark:border-[#1e3a6e] dark:bg-[#0d1526] dark:text-[#e8eeff]"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowNewPassword(
                        (current) =>
                          !current
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#1e40af] dark:text-[#3b60d4]"
                  >
                    {showNewPassword
                      ? "Hide"
                      : "Show"}
                  </button>
                </div>

                <p className="mt-1.5 text-[11px] text-[#94a3b8]">
                  Use at least 8 characters. The final password policy will be enforced by the backend.
                </p>
              </div>

              {/* Confirm password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-1.5 block text-sm font-semibold text-[#334155] dark:text-[#cbd5e1]"
                >
                  Confirm New Password
                </label>

                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    value={
                      passwords.confirm
                    }
                    onChange={(event) =>
                      updatePasswordField(
                        "confirm",
                        event.target.value
                      )
                    }
                    autoComplete="new-password"
                    placeholder="Repeat new password"
                    className="w-full rounded-xl border border-[#dbeafe] bg-white px-4 py-3 pr-16 text-sm text-[#0f172a] outline-none transition focus:border-[#1e40af] focus:ring-2 focus:ring-[#1e40af]/20 dark:border-[#1e3a6e] dark:bg-[#0d1526] dark:text-[#e8eeff]"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        (current) =>
                          !current
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#1e40af] dark:text-[#3b60d4]"
                  >
                    {showConfirmPassword
                      ? "Hide"
                      : "Show"}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full rounded-xl bg-[#10b981] py-3 text-sm font-bold text-white transition hover:bg-[#059669] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-8"
              >
                {saving
                  ? "Updating..."
                  : "Update Password"}
              </button>
            </form>
          </section>

          {/* =====================================================
              ACCOUNT INFORMATION
          ====================================================== */}
          <section className="rounded-2xl border border-[#dbeafe] bg-white p-5 shadow-sm dark:border-[#1e3a6e] dark:bg-[#152040] sm:p-6">
            <div className="mb-5">
              <h2 className="text-base font-bold text-[#0f172a] dark:text-[#e8eeff]">
                Account Information
              </h2>

              <p className="mt-1 text-xs text-[#64748b] dark:text-[#94a3b8]">
                System information associated with your TEKSUM account.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex flex-col gap-1 rounded-xl bg-[#f0f4ff] px-4 py-3 sm:flex-row sm:items-center sm:justify-between dark:bg-[#0d1526]">
                <span className="text-xs text-[#64748b] dark:text-[#7b8ebc]">
                  Account ID
                </span>

                <span className="break-all text-xs font-bold text-[#334155] dark:text-[#cbd5e1]">
                  {accountId}
                </span>
              </div>

              <div className="flex flex-col gap-1 rounded-xl bg-[#f0f4ff] px-4 py-3 sm:flex-row sm:items-center sm:justify-between dark:bg-[#0d1526]">
                <span className="text-xs text-[#64748b] dark:text-[#7b8ebc]">
                  Member Since
                </span>

                <span className="text-xs font-bold text-[#334155] dark:text-[#cbd5e1]">
                  {memberSince}
                </span>
              </div>

              <div className="flex flex-col gap-1 rounded-xl bg-[#f0f4ff] px-4 py-3 sm:flex-row sm:items-center sm:justify-between dark:bg-[#0d1526]">
                <span className="text-xs text-[#64748b] dark:text-[#7b8ebc]">
                  Account Status
                </span>

                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#10b981]">
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  {accountStatus}
                </span>
              </div>

              <div className="flex flex-col gap-1 rounded-xl bg-[#f0f4ff] px-4 py-3 sm:flex-row sm:items-center sm:justify-between dark:bg-[#0d1526]">
                <span className="text-xs text-[#64748b] dark:text-[#7b8ebc]">
                  Virtual Account
                </span>

                <span className="text-xs font-bold text-[#334155] dark:text-[#cbd5e1]">
                  Available after backend connection
                </span>
              </div>
            </div>
          </section>

          {/* =====================================================
              SECURITY / SESSION NOTICE
          ====================================================== */}
          <section className="rounded-2xl border border-[#dbeafe] bg-white p-5 shadow-sm dark:border-[#1e3a6e] dark:bg-[#152040] sm:p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f0f4ff] text-lg dark:bg-[#0d1526]">
                🛡️
              </div>

              <div>
                <h2 className="text-sm font-bold text-[#0f172a] dark:text-[#e8eeff]">
                  Account Security
                </h2>

                <p className="mt-1 text-xs leading-relaxed text-[#64748b] dark:text-[#94a3b8]">
                  Your authentication session and account security will be managed by the TEKSUM backend. We will connect session management, logout from other devices and additional security controls when the backend is implemented.
                </p>

                <Link
                  href="/dashboard/security"
                  className="mt-3 inline-flex text-xs font-bold text-[#1e40af] hover:underline dark:text-[#3b60d4]"
                >
                  Open security settings →
                </Link>
              </div>
            </div>
          </section>

          {/* =====================================================
              DANGER ZONE
          ====================================================== */}
          <section className="rounded-2xl border border-red-200 bg-white p-5 shadow-sm dark:border-red-900/40 dark:bg-[#152040] sm:p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-lg dark:bg-red-950/30">
                ⚠️
              </div>

              <div className="flex-1">
                <h2 className="text-base font-bold text-red-600 dark:text-red-400">
                  Danger Zone
                </h2>

                <p className="mt-1 text-xs leading-relaxed text-[#64748b] dark:text-[#94a3b8]">
                  Deleting your account is a permanent action. The real backend will need to handle authentication invalidation, account state, transaction records and any applicable retention requirements.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    setDeleteModalOpen(true)
                  }
                  className="mt-4 rounded-xl border border-red-300 px-5 py-2.5 text-xs font-bold text-red-600 transition hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950/30"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </section>

        </div>
      </main>

      {/* =========================================================
          DELETE ACCOUNT CONFIRMATION MODAL
      ========================================================== */}
      {deleteModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-account-title"
        >
          <div className="w-full max-w-md rounded-2xl border border-red-200 bg-white p-6 shadow-2xl dark:border-red-900/50 dark:bg-[#152040]">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-xl dark:bg-red-950/40">
              ⚠️
            </div>

            <h2
              id="delete-account-title"
              className="mt-4 text-lg font-bold text-[#0f172a] dark:text-[#e8eeff]"
            >
              Delete your TEKSUM account?
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-[#64748b] dark:text-[#94a3b8]">
              This action cannot be undone. Your account will be permanently deleted once the backend processes the request.
            </p>

            <div className="mt-5">
              <label
                htmlFor="deleteConfirmation"
                className="mb-1.5 block text-xs font-bold text-[#334155] dark:text-[#cbd5e1]"
              >
                Type DELETE to confirm
              </label>

              <input
                id="deleteConfirmation"
                type="text"
                value={deleteConfirmation}
                onChange={(event) =>
                  setDeleteConfirmation(
                    event.target.value
                  )
                }
                placeholder="DELETE"
                autoComplete="off"
                className="w-full rounded-xl border border-red-200 bg-white px-4 py-3 text-sm font-semibold text-[#0f172a] outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 dark:border-red-900/50 dark:bg-[#0d1526] dark:text-[#e8eeff]"
              />
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => {
                  setDeleteModalOpen(false);
                  setDeleteConfirmation("");
                  setError("");
                }}
                className="rounded-xl border border-[#dbeafe] px-5 py-2.5 text-sm font-bold text-[#475569] transition hover:bg-[#f0f4ff] dark:border-[#1e3a6e] dark:text-[#cbd5e1] dark:hover:bg-[#0d1526]"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDeleteAccount}
                className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-red-700"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}