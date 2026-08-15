"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";

const popularActions = [
  {
    label: "Airtime",
    icon: "📱",
    href: "/services/airtime",
  },
  {
    label: "Data",
    icon: "📶",
    href: "/services/data",
  },
  {
    label: "Electricity",
    icon: "⚡",
    href: "/services/electricity",
  },
  {
    label: "Cable TV",
    icon: "📺",
    href: "/services/cable",
  },
  {
    label: "Internet",
    icon: "🌐",
    href: "/services/internet",
  },
];

const educationActions = [
  {
    label: "JAMB",
    icon: "🎓",
    href: "/services/jamb",
  },
  {
    label: "WAEC",
    icon: "📄",
    href: "/services/waec-result",
  },
  {
    label: "NECO",
    icon: "🎫",
    href: "/services/neco-result",
  },
  {
    label: "NABTEB",
    icon: "📋",
    href: "/services/nabteb",
  },
  {
    label: "NBAIS",
    icon: "🏫",
    href: "/services/nbais",
  },
];

/*
 * Temporary frontend transaction structure.
 *
 * These are intentionally kept separate from the UI so the real
 * backend transaction response can replace them later without
 * redesigning the dashboard.
 */
const recentTransactions = [
  {
    id: 1,
    type: "Airtime",
    detail: "MTN — 08012345678",
    amount: "₦500",
    status: "Successful",
    date: "Today, 10:32am",
    credit: false,
  },
  {
    id: 2,
    type: "WAEC Pin",
    detail: "1 Pin purchased",
    amount: "₦3,900",
    status: "Successful",
    date: "Yesterday, 3:15pm",
    credit: false,
  },
  {
    id: 3,
    type: "Wallet Funding",
    detail: "Bank transfer",
    amount: "₦20,000",
    status: "Successful",
    date: "Jul 30, 4:00pm",
    credit: true,
  },
  {
    id: 4,
    type: "Electricity",
    detail: "PHED — Meter 12345678",
    amount: "₦5,000",
    status: "Failed",
    date: "Jul 29, 6:45pm",
    credit: false,
  },
  {
    id: 5,
    type: "Data Bundle",
    detail: "MTN 1GB — 08012345678",
    amount: "₦490",
    status: "Successful",
    date: "Jul 28, 2:10pm",
    credit: false,
  },
];

function getFirstName(user) {
  if (!user) return "there";

  if (user.firstName) {
    return user.firstName;
  }

  if (user.name) {
    return user.name.trim().split(/\s+/)[0];
  }

  if (user.fullName) {
    return user.fullName.trim().split(/\s+/)[0];
  }

  if (user.email) {
    return user.email.split("@")[0];
  }

  return "there";
}

function getInitials(user) {
  if (!user) return "TS";

  const name =
    user.name ||
    user.fullName ||
    user.email ||
    "";

  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }

  if (parts.length === 1) {
    return parts[0]
      .slice(0, 2)
      .toUpperCase();
  }

  return "TS";
}

function StatusBadge({ status }) {
  const styles = {
    Successful:
      "bg-[#dcfce7] text-[#15803d] dark:bg-[#052e16] dark:text-[#4ade80]",
    Failed:
      "bg-[#fee2e2] text-[#dc2626] dark:bg-[#450a0a] dark:text-[#f87171]",
    Pending:
      "bg-[#fef3c7] text-[#b45309] dark:bg-[#451a03] dark:text-[#fbbf24]",
  };

  const icons = {
    Successful: "✓",
    Failed: "✕",
    Pending: "⏳",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold ${
        styles[status] ||
        "bg-[#f1f5f9] text-[#64748b]"
      }`}
    >
      <span>{icons[status] || "•"}</span>
      {status}
    </span>
  );
}

function EmptyTransactions() {
  return (
    <div className="px-5 py-10 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#f0f4ff] text-xl dark:bg-[#0d1526]">
        📊
      </div>

      <p className="mt-3 text-sm font-bold text-[#334155] dark:text-[#cbd5e1]">
        No transactions yet
      </p>

      <p className="mx-auto mt-1 max-w-sm text-xs leading-relaxed text-[#64748b] dark:text-[#94a3b8]">
        Your airtime, data, bills and education purchases will appear here after you make a transaction.
      </p>

      <Link
        href="/services"
        className="mt-4 inline-flex rounded-xl bg-[#1e40af] px-4 py-2.5 text-xs font-bold text-white dark:bg-[#3b60d4]"
      >
        Browse services
      </Link>
    </div>
  );
}

export default function DashboardPage() {
  const router = useRouter();

  const {
    user,
    isAuthenticated,
    loading,
    logout,
  } = useAuth();

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [loggingOut, setLoggingOut] =
    useState(false);

  const menuRef = useRef(null);

  /*
   * Authentication guard.
   *
   * This is intentionally frontend-only for now.
   * Once the real backend is connected, AuthContext becomes
   * the source of truth for the authenticated session.
   */
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace(
        `/login?redirect=${encodeURIComponent(
          "/dashboard"
        )}`
      );
    }
  }, [
    loading,
    isAuthenticated,
    router,
  ]);

  /*
   * Close the three-dot menu when clicking outside it.
   */
  useEffect(() => {
    function handleOutsideClick(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(
          event.target
        )
      ) {
        setMenuOpen(false);
      }
    }

    if (menuOpen) {
      document.addEventListener(
        "mousedown",
        handleOutsideClick
      );
    }

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, [menuOpen]);

  const firstName = useMemo(
    () => getFirstName(user),
    [user]
  );

  const initials = useMemo(
    () => getInitials(user),
    [user]
  );

  async function handleLogout() {
    if (loggingOut) return;

    setLoggingOut(true);
    setMenuOpen(false);

    try {
      await logout();
    } finally {
      router.replace("/login");
    }
  }

  /*
   * Avoid rendering the dashboard while authentication is
   * being restored. This prevents a brief flash of protected
   * content before the redirect.
   */
  if (loading) {
    return (
      <div className="min-h-screen bg-[#f0f4ff] dark:bg-[#0a1020]">
        <Navbar />

        <main className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-2xl border border-[#dbeafe] bg-white p-8 text-center dark:border-[#1e3a6e] dark:bg-[#152040]">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#dbeafe] border-t-[#1e40af] dark:border-[#294b86] dark:border-t-[#3b60d4]" />

              <p className="mt-4 text-sm font-semibold text-[#334155] dark:text-[#cbd5e1]">
                Loading your dashboard...
              </p>
            </div>
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
        <div className="mx-auto max-w-5xl space-y-5">

          {/* =====================================================
              DASHBOARD HEADER
          ====================================================== */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1e40af] dark:text-[#3b60d4]">
                TEKSUM Dashboard
              </p>

              <h1 className="mt-1 text-xl font-bold text-[#0f172a] dark:text-[#e8eeff] sm:text-2xl">
                Good morning, {firstName} 👋
              </h1>

              <p className="mt-1 text-sm text-[#475569] dark:text-[#7b8ebc]">
                Manage your services, wallet and transactions from one place.
              </p>
            </div>

            {/* Three-dot account menu */}
            <div
              ref={menuRef}
              className="relative shrink-0"
            >
              <button
                type="button"
                onClick={() =>
                  setMenuOpen(
                    (current) => !current
                  )
                }
                aria-label="Open account menu"
                aria-expanded={menuOpen}
                className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-[#dbeafe] bg-white text-lg font-bold text-[#475569] shadow-sm transition hover:border-[#1e40af] hover:text-[#1e40af] dark:border-[#1e3a6e] dark:bg-[#152040] dark:text-[#cbd5e1] dark:hover:border-[#3b60d4]"
              >
                ⋮
              </button>

              {menuOpen && (
                <div className="absolute right-0 top-14 z-50 w-60 overflow-hidden rounded-2xl border border-[#dbeafe] bg-white shadow-xl dark:border-[#1e3a6e] dark:bg-[#152040]">
                  {/* Account identity */}
                  <div className="border-b border-[#e2e8f0] px-4 py-4 dark:border-[#1e3a6e]">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1e40af] text-xs font-bold text-white dark:bg-[#3b60d4]">
                        {initials}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-[#0f172a] dark:text-[#e8eeff]">
                          {user?.name ||
                            user?.fullName ||
                            firstName}
                        </p>

                        <p className="truncate text-[11px] text-[#64748b] dark:text-[#94a3b8]">
                          {user?.email ||
                            "TEKSUM account"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-2">
                    <Link
                      href="/dashboard/profile"
                      onClick={() =>
                        setMenuOpen(false)
                      }
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-[#334155] transition hover:bg-[#f0f4ff] dark:text-[#cbd5e1] dark:hover:bg-[#0d1526]"
                    >
                      <span>👤</span>
                      <span>Profile & Account</span>
                    </Link>

                    <Link
                      href="/dashboard/transactions"
                      onClick={() =>
                        setMenuOpen(false)
                      }
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-[#334155] transition hover:bg-[#f0f4ff] dark:text-[#cbd5e1] dark:hover:bg-[#0d1526]"
                    >
                      <span>📋</span>
                      <span>Transactions</span>
                    </Link>

                    <Link
                      href="/dashboard/fund-wallet"
                      onClick={() =>
                        setMenuOpen(false)
                      }
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-[#334155] transition hover:bg-[#f0f4ff] dark:text-[#cbd5e1] dark:hover:bg-[#0d1526]"
                    >
                      <span>💳</span>
                      <span>Wallet</span>
                    </Link>

                    <Link
                      href="/dashboard/security"
                      onClick={() =>
                        setMenuOpen(false)
                      }
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-[#334155] transition hover:bg-[#f0f4ff] dark:text-[#cbd5e1] dark:hover:bg-[#0d1526]"
                    >
                      <span>🔐</span>
                      <span>Security</span>
                    </Link>

                    <Link
                      href="/dashboard/support"
                      onClick={() =>
                        setMenuOpen(false)
                      }
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-[#334155] transition hover:bg-[#f0f4ff] dark:text-[#cbd5e1] dark:hover:bg-[#0d1526]"
                    >
                      <span>💬</span>
                      <span>Help & Support</span>
                    </Link>

                    <div className="my-2 border-t border-[#e2e8f0] dark:border-[#1e3a6e]" />

                    <button
                      type="button"
                      onClick={handleLogout}
                      disabled={loggingOut}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-[#dc2626] transition hover:bg-[#fef2f2] disabled:opacity-50 dark:hover:bg-[#450a0a]"
                    >
                      <span>↪</span>
                      <span>
                        {loggingOut
                          ? "Signing out..."
                          : "Logout"}
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* =====================================================
              WALLET
          ====================================================== */}
          <div className="overflow-hidden rounded-3xl bg-[#1e40af] shadow-lg dark:bg-[#152040]">
            <div className="p-6 sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-blue-100 dark:text-[#7b8ebc]">
                    Available Balance
                  </p>

                  {/*
                   * Temporary frontend value.
                   * Replace with backend wallet balance later.
                   */}
                  <p className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                    ₦25,450.00
                  </p>

                  <p className="mt-2 text-xs text-blue-100 dark:text-[#7b8ebc]">
                    Wallet balance will be loaded from your TEKSUM account.
                  </p>
                </div>

                <div className="hidden rounded-2xl bg-white/10 px-4 py-3 text-right sm:block">
                  <p className="text-[10px] uppercase tracking-wide text-blue-100 dark:text-[#7b8ebc]">
                    Account
                  </p>

                  <p className="mt-1 text-xs font-bold text-white">
                    {user?.email ||
                      "Verified account"}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/dashboard/fund-wallet"
                  className="rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-[#1e40af] transition hover:bg-blue-50"
                >
                  + Fund Wallet
                </Link>

                <Link
                  href="/dashboard/transactions"
                  className="rounded-xl border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Transaction History
                </Link>
              </div>
            </div>

            <div className="border-t border-white/10 px-6 py-3">
              <p className="text-[10px] leading-relaxed text-blue-100 dark:text-[#7b8ebc]">
                Your wallet and virtual account details will be securely connected to the TEKSUM backend.
              </p>
            </div>
          </div>

          {/* =====================================================
              QUICK SERVICES
          ====================================================== */}
          <div className="rounded-2xl border border-[#dbeafe] bg-white p-5 dark:border-[#1e3a6e] dark:bg-[#152040]">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#475569] dark:text-[#7b8ebc]">
                  Popular Services
                </p>

                <p className="mt-1 text-xs text-[#64748b] dark:text-[#94a3b8]">
                  Start a new purchase quickly.
                </p>
              </div>

              <Link
                href="/services"
                className="text-xs font-semibold text-[#1e40af] hover:underline dark:text-[#3b60d4]"
              >
                All services →
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
              {popularActions.map(
                (action) => (
                  <Link
                    key={action.href}
                    href={action.href}
                    className="group flex flex-col items-center gap-2 rounded-2xl border border-[#dbeafe] bg-[#f0f4ff] p-4 text-center transition hover:-translate-y-0.5 hover:border-[#1e40af] hover:shadow-sm dark:border-[#1e3a6e] dark:bg-[#0d1526] dark:hover:border-[#3b60d4]"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-xl shadow-sm dark:bg-[#152040]">
                      {action.icon}
                    </span>

                    <span className="text-xs font-semibold text-[#0f172a] dark:text-[#e8eeff]">
                      {action.label}
                    </span>
                  </Link>
                )
              )}
            </div>
          </div>

          {/* =====================================================
              EDUCATION SERVICES
          ====================================================== */}
          <div className="rounded-2xl border border-[#dbeafe] bg-white p-5 dark:border-[#1e3a6e] dark:bg-[#152040]">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#475569] dark:text-[#7b8ebc]">
                  Exam Pins & Registration
                </p>

                <p className="mt-1 text-xs text-[#64748b] dark:text-[#94a3b8]">
                  Education services and examination products.
                </p>
              </div>

              <Link
                href="/services"
                className="text-xs font-semibold text-[#1e40af] hover:underline dark:text-[#3b60d4]"
              >
                View all →
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
              {educationActions.map(
                (action) => (
                  <Link
                    key={action.href}
                    href={action.href}
                    className="group flex flex-col items-center gap-2 rounded-2xl border border-[#dbeafe] bg-[#f0f4ff] p-4 text-center transition hover:-translate-y-0.5 hover:border-[#1e40af] hover:shadow-sm dark:border-[#1e3a6e] dark:bg-[#0d1526] dark:hover:border-[#3b60d4]"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-xl shadow-sm dark:bg-[#152040]">
                      {action.icon}
                    </span>

                    <span className="text-xs font-semibold text-[#0f172a] dark:text-[#e8eeff]">
                      {action.label}
                    </span>
                  </Link>
                )
              )}
            </div>
          </div>

          {/* =====================================================
              RECENT TRANSACTIONS
          ====================================================== */}
          <div className="overflow-hidden rounded-2xl border border-[#dbeafe] bg-white dark:border-[#1e3a6e] dark:bg-[#152040]">
            <div className="flex items-center justify-between gap-4 border-b border-[#dbeafe] px-5 py-4 dark:border-[#1e3a6e]">
              <div>
                <p className="text-sm font-bold text-[#0f172a] dark:text-[#e8eeff]">
                  Recent Transactions
                </p>

                <p className="mt-1 text-xs text-[#64748b] dark:text-[#94a3b8]">
                  Your latest account activity.
                </p>
              </div>

              <Link
                href="/dashboard/transactions"
                className="shrink-0 text-xs font-semibold text-[#1e40af] hover:underline dark:text-[#3b60d4]"
              >
                View all →
              </Link>
            </div>

            {recentTransactions.length ===
            0 ? (
              <EmptyTransactions />
            ) : (
              recentTransactions.map(
                (tx, index) => (
                  <div
                    key={tx.id}
                    className={`flex items-center justify-between gap-4 px-5 py-4 ${
                      index !==
                      recentTransactions.length -
                        1
                        ? "border-b border-[#dbeafe] dark:border-[#1e3a6e]"
                        : ""
                    }`}
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm ${
                          tx.credit
                            ? "bg-[#10b981]/10 text-[#10b981]"
                            : "bg-[#f0f4ff] text-[#1e40af] dark:bg-[#0d1526] dark:text-[#3b60d4]"
                        }`}
                      >
                        {tx.credit
                          ? "↑"
                          : "↓"}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-[#0f172a] dark:text-[#e8eeff]">
                          {tx.type}
                        </p>

                        <p className="truncate text-xs text-[#475569] dark:text-[#7b8ebc]">
                          {tx.detail}
                        </p>

                        <p className="mt-0.5 text-[10px] text-[#94a3b8]">
                          {tx.date}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      <p
                        className={`text-sm font-bold ${
                          tx.credit
                            ? "text-[#10b981]"
                            : tx.status ===
                                "Failed"
                              ? "text-[#dc2626]"
                              : "text-[#0f172a] dark:text-[#e8eeff]"
                        }`}
                      >
                        {tx.credit
                          ? "+"
                          : "-"}
                        {tx.amount}
                      </p>

                      <div className="mt-1">
                        <StatusBadge
                          status={
                            tx.status
                          }
                        />
                      </div>
                    </div>
                  </div>
                )
              )
            )}
          </div>

          {/* =====================================================
              ACCOUNT OVERVIEW
          ====================================================== */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-[#dbeafe] bg-white p-5 dark:border-[#1e3a6e] dark:bg-[#152040]">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-[#475569] dark:text-[#7b8ebc]">
                  Spent this month
                </p>

                <span className="text-lg">
                  💳
                </span>
              </div>

              <p className="mt-2 text-xl font-bold text-[#0f172a] dark:text-[#e8eeff]">
                ₦24,350
              </p>

              <p className="mt-1 text-[10px] text-[#94a3b8]">
                Backend analytics will replace this temporary value.
              </p>
            </div>

            <div className="rounded-2xl border border-[#dbeafe] bg-white p-5 dark:border-[#1e3a6e] dark:bg-[#152040]">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-[#475569] dark:text-[#7b8ebc]">
                  Transactions
                </p>

                <span className="text-lg">
                  📊
                </span>
              </div>

              <p className="mt-2 text-xl font-bold text-[#0f172a] dark:text-[#e8eeff]">
                18
              </p>

              <p className="mt-1 text-[10px] text-[#94a3b8]">
                Total account activity for the current period.
              </p>
            </div>

            <div className="rounded-2xl border border-[#dbeafe] bg-white p-5 dark:border-[#1e3a6e] dark:bg-[#152040]">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-[#475569] dark:text-[#7b8ebc]">
                  Account status
                </p>

                <span className="text-lg">
                  ✅
                </span>
              </div>

              <p className="mt-2 text-xl font-bold text-[#10b981]">
                Verified
              </p>

              <p className="mt-1 text-[10px] text-[#94a3b8]">
                Final verification status will come from the backend.
              </p>
            </div>
          </div>

          {/* =====================================================
              ACCOUNT / SUPPORT SHORTCUT
          ====================================================== */}
          <div className="rounded-2xl border border-[#dbeafe] bg-white p-5 dark:border-[#1e3a6e] dark:bg-[#152040]">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm font-bold text-[#0f172a] dark:text-[#e8eeff]">
                  Need to manage your account?
                </p>

                <p className="mt-1 text-xs leading-relaxed text-[#64748b] dark:text-[#94a3b8]">
                  Update your profile, review transactions, manage security or get help from TEKSUM support.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Link
                  href="/dashboard/profile"
                  className="rounded-xl border border-[#dbeafe] bg-white px-4 py-2.5 text-xs font-bold text-[#334155] transition hover:border-[#1e40af] hover:text-[#1e40af] dark:border-[#1e3a6e] dark:bg-[#152040] dark:text-[#cbd5e1] dark:hover:border-[#3b60d4]"
                >
                  Profile
                </Link>

                <Link
                  href="/support"
                  className="rounded-xl bg-[#1e40af] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#1d3a9e] dark:bg-[#3b60d4]"
                >
                  Get Help
                </Link>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}