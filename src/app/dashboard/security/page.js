"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";

export default function SecurityPage() {
  const router = useRouter();

  const {
    user,
    isAuthenticated,
    loading,
  } = useAuth();

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [showSessions, setShowSessions] =
    useState(false);

  const [passwords, setPasswords] = useState({
    current: "",
    newPassword: "",
    confirm: "",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] =
    useState("");

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace(
        `/login?redirect=${encodeURIComponent(
          "/dashboard/security"
        )}`
      );
    }
  }, [
    loading,
    isAuthenticated,
    router,
  ]);

  function updatePassword(
    field,
    value
  ) {
    setPasswords((current) => ({
      ...current,
      [field]: value,
    }));

    setMessage("");
  }

  async function handlePasswordUpdate(
    event
  ) {
    event.preventDefault();

    setMessage("");

    if (!passwords.current) {
      setMessage(
        "Enter your current password."
      );
      setMessageType("error");
      return;
    }

    if (!passwords.newPassword) {
      setMessage(
        "Enter your new password."
      );
      setMessageType("error");
      return;
    }

    if (passwords.newPassword.length < 8) {
      setMessage(
        "Your new password should be at least 8 characters."
      );
      setMessageType("error");
      return;
    }

    if (
      passwords.newPassword !==
      passwords.confirm
    ) {
      setMessage(
        "The new passwords do not match."
      );
      setMessageType("error");
      return;
    }

    setSaving(true);

    /*
     * BACKEND INTEGRATION POINT
     *
     * Future endpoint:
     *
     * PATCH /api/auth/password
     *
     * {
     *   currentPassword,
     *   newPassword
     * }
     *
     * The backend should validate the current password,
     * apply the password policy and invalidate/revoke
     * sessions according to the security policy.
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

    setMessage(
      "Password update is ready for backend integration."
    );

    setMessageType("success");
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f0f4ff] dark:bg-[#0a1020]">
        <Navbar />

        <main className="flex min-h-[70vh] items-center justify-center px-4">
          <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#dbeafe] border-t-[#1e40af] dark:border-[#294b86] dark:border-t-[#3b60d4]" />

            <p className="mt-4 text-sm font-semibold text-[#475569] dark:text-[#94a3b8]">
              Loading security settings...
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
          <p className="text-sm text-[#64748b] dark:text-[#94a3b8]">
            Redirecting to login...
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0f4ff] dark:bg-[#0a1020]">
      <Navbar />

      <main className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-5">

          {/* Header */}
          <div>
            <Link
              href="/dashboard"
              className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-[#475569] transition hover:text-[#1e40af] dark:text-[#7b8ebc] dark:hover:text-[#3b60d4]"
            >
              ← Back to Dashboard
            </Link>

            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#1e40af] dark:text-[#3b60d4]">
              Account Security
            </p>

            <h1 className="mt-1 text-2xl font-bold text-[#0f172a] dark:text-[#e8eeff]">
              Security Settings
            </h1>

            <p className="mt-1 text-sm text-[#64748b] dark:text-[#94a3b8]">
              Protect your TEKSUM account and manage your login security.
            </p>
          </div>

          {/* Security status */}
          <section className="rounded-2xl border border-[#dbeafe] bg-white p-5 shadow-sm dark:border-[#1e3a6e] dark:bg-[#152040] sm:p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#dcfce7] text-xl dark:bg-[#052e16]">
                🛡️
              </div>

              <div className="flex-1">
                <div className="flex flex-col justify-between gap-2 sm:flex-row">
                  <div>
                    <h2 className="text-base font-bold text-[#0f172a] dark:text-[#e8eeff]">
                      Your account is protected
                    </h2>

                    <p className="mt-1 text-xs leading-relaxed text-[#64748b] dark:text-[#94a3b8]">
                      Keep your password private and use a strong, unique password for your TEKSUM account.
                    </p>
                  </div>

                  <span className="inline-flex h-fit w-fit items-center gap-1.5 rounded-full bg-[#dcfce7] px-3 py-1 text-xs font-bold text-[#15803d] dark:bg-[#052e16] dark:text-[#4ade80]">
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    Protected
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Change password */}
          <section className="rounded-2xl border border-[#dbeafe] bg-white p-5 shadow-sm dark:border-[#1e3a6e] dark:bg-[#152040] sm:p-6">
            <div className="mb-6">
              <h2 className="text-base font-bold text-[#0f172a] dark:text-[#e8eeff]">
                Change Password
              </h2>

              <p className="mt-1 text-xs text-[#64748b] dark:text-[#94a3b8]">
                Change your password regularly and avoid reusing passwords from other services.
              </p>
            </div>

            {message && (
              <div
                className={`mb-5 rounded-xl border px-4 py-3 text-sm ${
                  messageType === "success"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-950/30 dark:text-emerald-300"
                    : "border-red-200 bg-red-50 text-red-700 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-300"
                }`}
              >
                {message}
              </div>
            )}

            <form
              onSubmit={handlePasswordUpdate}
              className="space-y-4"
            >
              {/* Current */}
              <div>
                <label
                  htmlFor="security-current-password"
                  className="mb-1.5 block text-sm font-semibold text-[#334155] dark:text-[#cbd5e1]"
                >
                  Current Password
                </label>

                <div className="relative">
                  <input
                    id="security-current-password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={
                      passwords.current
                    }
                    onChange={(event) =>
                      updatePassword(
                        "current",
                        event.target.value
                      )
                    }
                    autoComplete="current-password"
                    placeholder="Enter current password"
                    className="w-full rounded-xl border border-[#dbeafe] bg-white px-4 py-3 pr-16 text-sm text-[#0f172a] outline-none focus:border-[#1e40af] focus:ring-2 focus:ring-[#1e40af]/20 dark:border-[#1e3a6e] dark:bg-[#0d1526] dark:text-[#e8eeff]"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (current) =>
                          !current
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#1e40af] dark:text-[#3b60d4]"
                  >
                    {showPassword
                      ? "Hide"
                      : "Show"}
                  </button>
                </div>
              </div>

              {/* New */}
              <div>
                <label
                  htmlFor="security-new-password"
                  className="mb-1.5 block text-sm font-semibold text-[#334155] dark:text-[#cbd5e1]"
                >
                  New Password
                </label>

                <input
                  id="security-new-password"
                  type="password"
                  value={
                    passwords.newPassword
                  }
                  onChange={(event) =>
                    updatePassword(
                      "newPassword",
                      event.target.value
                    )
                  }
                  autoComplete="new-password"
                  placeholder="Enter new password"
                  className="w-full rounded-xl border border-[#dbeafe] bg-white px-4 py-3 text-sm text-[#0f172a] outline-none focus:border-[#1e40af] focus:ring-2 focus:ring-[#1e40af]/20 dark:border-[#1e3a6e] dark:bg-[#0d1526] dark:text-[#e8eeff]"
                />

                <p className="mt-1.5 text-[11px] text-[#94a3b8]">
                  Use at least 8 characters.
                </p>
              </div>

              {/* Confirm */}
              <div>
                <label
                  htmlFor="security-confirm-password"
                  className="mb-1.5 block text-sm font-semibold text-[#334155] dark:text-[#cbd5e1]"
                >
                  Confirm New Password
                </label>

                <div className="relative">
                  <input
                    id="security-confirm-password"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    value={
                      passwords.confirm
                    }
                    onChange={(event) =>
                      updatePassword(
                        "confirm",
                        event.target.value
                      )
                    }
                    autoComplete="new-password"
                    placeholder="Repeat new password"
                    className="w-full rounded-xl border border-[#dbeafe] bg-white px-4 py-3 pr-16 text-sm text-[#0f172a] outline-none focus:border-[#1e40af] focus:ring-2 focus:ring-[#1e40af]/20 dark:border-[#1e3a6e] dark:bg-[#0d1526] dark:text-[#e8eeff]"
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
                className="w-full rounded-xl bg-[#1e40af] py-3 text-sm font-bold text-white transition hover:bg-[#1d3a9e] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#3b60d4] sm:w-auto sm:px-8"
              >
                {saving
                  ? "Updating..."
                  : "Update Password"}
              </button>
            </form>
          </section>

          {/* Two-factor authentication */}
          <section className="rounded-2xl border border-[#dbeafe] bg-white p-5 shadow-sm dark:border-[#1e3a6e] dark:bg-[#152040] sm:p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f0f4ff] text-lg dark:bg-[#0d1526]">
                🔐
              </div>

              <div className="flex-1">
                <div className="flex flex-col justify-between gap-3 sm:flex-row">
                  <div>
                    <h2 className="text-base font-bold text-[#0f172a] dark:text-[#e8eeff]">
                      Two-factor authentication
                    </h2>

                    <p className="mt-1 text-xs leading-relaxed text-[#64748b] dark:text-[#94a3b8]">
                      Add an extra layer of protection to your TEKSUM account.
                    </p>
                  </div>

                  <span className="inline-flex h-fit w-fit rounded-full bg-[#fef3c7] px-3 py-1 text-xs font-bold text-[#b45309] dark:bg-[#451a03] dark:text-[#fbbf24]">
                    Coming soon
                  </span>
                </div>

                <div className="mt-4 rounded-xl bg-[#f0f4ff] p-4 dark:bg-[#0d1526]">
                  <p className="text-xs leading-relaxed text-[#475569] dark:text-[#94a3b8]">
                    Two-factor authentication will be connected to the backend security system. The final implementation can support an authenticator app or another verified second factor.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Sessions */}
          <section className="rounded-2xl border border-[#dbeafe] bg-white shadow-sm dark:border-[#1e3a6e] dark:bg-[#152040]">
            <button
              type="button"
              onClick={() =>
                setShowSessions(
                  (current) =>
                    !current
                )
              }
              className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f0f4ff] text-lg dark:bg-[#0d1526]">
                  💻
                </div>

                <div>
                  <h2 className="text-base font-bold text-[#0f172a] dark:text-[#e8eeff]">
                    Active sessions
                  </h2>

                  <p className="mt-1 text-xs text-[#64748b] dark:text-[#94a3b8]">
                    Review where your TEKSUM account is signed in.
                  </p>
                </div>
              </div>

              <span className="text-lg text-[#64748b] dark:text-[#94a3b8]">
                {showSessions
                  ? "⌃"
                  : "⌄"}
              </span>
            </button>

            {showSessions && (
              <div className="border-t border-[#dbeafe] px-5 py-5 dark:border-[#1e3a6e] sm:px-6">
                <div className="rounded-xl bg-[#f0f4ff] p-4 dark:bg-[#0d1526]">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-bold text-[#334155] dark:text-[#cbd5e1]">
                        Current browser session
                      </p>

                      <p className="mt-1 text-xs text-[#64748b] dark:text-[#94a3b8]">
                        This device • Active now
                      </p>
                    </div>

                    <span className="rounded-full bg-[#dcfce7] px-2.5 py-1 text-[10px] font-bold text-[#15803d] dark:bg-[#052e16] dark:text-[#4ade80]">
                      Current
                    </span>
                  </div>
                </div>

                <p className="mt-3 text-[11px] leading-relaxed text-[#94a3b8]">
                  Full session management will be populated by the backend, including device information, login timestamps and the ability to revoke other sessions.
                </p>
              </div>
            )}
          </section>

          {/* Security tips */}
          <section className="rounded-2xl border border-[#dbeafe] bg-white p-5 shadow-sm dark:border-[#1e3a6e] dark:bg-[#152040] sm:p-6">
            <h2 className="text-base font-bold text-[#0f172a] dark:text-[#e8eeff]">
              Security tips
            </h2>

            <div className="mt-4 space-y-3">
              {[
                "Never share your TEKSUM password or authentication details with anyone.",
                "Use a strong password that you do not reuse on other websites.",
                "Always check your transaction details before confirming a purchase.",
                "Contact TEKSUM support if you notice activity you do not recognise.",
              ].map((tip) => (
                <div
                  key={tip}
                  className="flex items-start gap-3 rounded-xl bg-[#f0f4ff] p-3 dark:bg-[#0d1526]"
                >
                  <span className="mt-0.5 text-sm">
                    ✓
                  </span>

                  <p className="text-xs leading-relaxed text-[#475569] dark:text-[#94a3b8]">
                    {tip}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Account shortcut */}
          <section className="rounded-2xl border border-[#dbeafe] bg-white p-5 shadow-sm dark:border-[#1e3a6e] dark:bg-[#152040]">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-sm font-bold text-[#0f172a] dark:text-[#e8eeff]">
                  Need to update your account?
                </h2>

                <p className="mt-1 text-xs text-[#64748b] dark:text-[#94a3b8]">
                  Manage your name, email and phone number from your profile.
                </p>
              </div>

              <Link
                href="/dashboard/profile"
                className="inline-flex w-fit rounded-xl border border-[#dbeafe] px-4 py-2.5 text-xs font-bold text-[#334155] transition hover:border-[#1e40af] hover:text-[#1e40af] dark:border-[#1e3a6e] dark:text-[#cbd5e1] dark:hover:border-[#3b60d4]"
              >
                Profile & Account
              </Link>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}