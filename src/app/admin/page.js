"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";


const stats = [
  { label: "Total Users", value: "1,240", icon: "👥", change: "+12 this week" },
  { label: "Total Transactions", value: "8,452", icon: "📊", change: "+134 today" },
  { label: "Revenue This Month", value: "₦284,500", icon: "💰", change: "+₦12,300 today" },
  { label: "Failed Transactions", value: "23", icon: "⚠️", change: "Last 30 days" },
  { label: "VTPass Balance", value: "₦45,200", icon: "🏦", change: "Top up soon" },
  { label: "Active Sessions", value: "87", icon: "🟢", change: "Right now" },
];

const recentTransactions = [
  { id: "TSM-001", user: "frank@example.com", type: "Airtime", amount: "₦500", status: "Successful", date: "Aug 3, 10:32am" },
  { id: "TSM-002", user: "jane@example.com", type: "WAEC Pin", amount: "₦3,900", status: "Successful", date: "Aug 3, 10:15am" },
  { id: "TSM-003", user: "john@example.com", type: "Electricity", amount: "₦5,000", status: "Failed", date: "Aug 3, 9:50am" },
  { id: "TSM-004", user: "ada@example.com", type: "Data", amount: "₦490", status: "Successful", date: "Aug 3, 9:30am" },
  { id: "TSM-005", user: "mike@example.com", type: "Cable TV", amount: "₦19,900", status: "Successful", date: "Aug 3, 9:00am" },
  { id: "TSM-006", user: "sara@example.com", type: "NECO Token", amount: "₦700", status: "Pending", date: "Aug 3, 8:45am" },
];

const recentUsers = [
  { name: "Frank Doe", email: "frank@example.com", joined: "Aug 3, 2026", status: "Active", balance: "₦12,450" },
  { name: "Jane Smith", email: "jane@example.com", joined: "Aug 2, 2026", status: "Active", balance: "₦5,200" },
  { name: "John Okeke", email: "john@example.com", joined: "Aug 1, 2026", status: "Active", balance: "₦800" },
  { name: "Ada Obi", email: "ada@example.com", joined: "Jul 30, 2026", status: "Active", balance: "₦22,000" },
  { name: "Mike Eze", email: "mike@example.com", joined: "Jul 28, 2026", status: "Suspended", balance: "₦0" },
];

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-[#f0f4ff] dark:bg-[#0a1020]">
      <Navbar />

      <main className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-8">

          {/* Header */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#0f172a] dark:text-[#e8eeff]">
                Admin Dashboard
              </h1>
              <p className="text-sm text-[#475569] dark:text-[#7b8ebc]">
                Full platform overview TEKSUM
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/admin/users"
                className="rounded-xl border border-[#dbeafe] bg-white px-4 py-2.5 text-sm font-semibold text-[#1e40af] transition hover:border-[#1e40af] dark:border-[#1e3a6e] dark:bg-[#152040] dark:text-[#3b60d4]"
              >
                Manage Users
              </Link>
              <Link
                href="/admin/transactions"
                className="rounded-xl bg-[#1e40af] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1d3a9e] dark:bg-[#3b60d4]"
              >
                All Transactions
              </Link>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-[#dbeafe] bg-white p-4 shadow-sm dark:border-[#1e3a6e] dark:bg-[#152040]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xl">{stat.icon}</span>
                </div>
                <p className="mt-3 text-xl font-bold text-[#0f172a] dark:text-[#e8eeff]">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs font-medium text-[#475569] dark:text-[#7b8ebc]">
                  {stat.label}
                </p>
                <p className="mt-1 text-xs text-[#10b981]">{stat.change}</p>
              </div>
            ))}
          </div>

          {/* VTPass alert */}
<div className="flex items-center justify-between rounded-2xl border border-yellow-200 bg-yellow-50 px-5 py-4 dark:border-yellow-800/30 dark:bg-yellow-900/10">
  <div className="flex items-center gap-3">
    <span className="text-xl">⚠️</span>
    <div>
      <p className="text-sm font-bold text-yellow-800 dark:text-yellow-400">
        VTPass wallet balance is low
      </p>
      <p className="text-xs text-yellow-700 dark:text-yellow-500">
        Current balance: ₦45,200, Top up to avoid service interruptions
      </p>
    </div>
  </div>
  
<button
  onClick={() => window.open("https://vtpass.com", "_blank")}
  className="rounded-xl bg-yellow-500 px-4 py-2 text-xs font-semibold text-white hover:bg-yellow-600"
>
  Top Up Now
</button>
</div>

          {/* Recent transactions */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#0f172a] dark:text-[#e8eeff]">
                Recent Transactions
              </h2>
              <Link
                href="/admin/transactions"
                className="text-sm font-semibold text-[#1e40af] hover:underline dark:text-[#3b60d4]"
              >
                View all →
              </Link>
            </div>

            <div className="overflow-hidden rounded-2xl border border-[#dbeafe] bg-white dark:border-[#1e3a6e] dark:bg-[#152040]">
              <div className="grid grid-cols-[1fr_1.2fr_1fr_100px_130px] gap-4 border-b border-[#dbeafe] bg-[#f0f4ff] px-5 py-3 text-xs font-bold uppercase tracking-widest text-[#475569] dark:border-[#1e3a6e] dark:bg-[#0a1020] dark:text-[#7b8ebc]">
                <span>Ref</span>
                <span>User</span>
                <span>Service</span>
                <span>Amount</span>
                <span>Status</span>
              </div>

              {recentTransactions.map((tx, i) => (
                <div
                  key={tx.id}
                  className={`grid grid-cols-[1fr_1.2fr_1fr_100px_130px] gap-4 px-5 py-4 text-sm transition hover:bg-[#f0f4ff] dark:hover:bg-[#0a1020] ${
                    i !== recentTransactions.length - 1
                      ? "border-b border-[#dbeafe] dark:border-[#1e3a6e]"
                      : ""
                  }`}
                >
                  <div>
                    <p className="font-mono text-xs font-semibold text-[#1e40af] dark:text-[#3b60d4]">{tx.id}</p>
                    <p className="text-xs text-[#475569] dark:text-[#7b8ebc]">{tx.date}</p>
                  </div>
                  <p className="self-center truncate text-sm text-[#475569] dark:text-[#7b8ebc]">{tx.user}</p>
                  <p className="self-center text-sm font-medium text-[#0f172a] dark:text-[#e8eeff]">{tx.type}</p>
                  <p className="self-center font-semibold text-[#0f172a] dark:text-[#e8eeff]">{tx.amount}</p>
                  <div className="self-center">
                    <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                      tx.status === "Successful"
                        ? "bg-[#10b981]/10 text-[#10b981]"
                        : tx.status === "Failed"
                        ? "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400"
                        : "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400"
                    }`}>
                      {tx.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent users */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#0f172a] dark:text-[#e8eeff]">
                Recent Users
              </h2>
              <Link
                href="/admin/users"
                className="text-sm font-semibold text-[#1e40af] hover:underline dark:text-[#3b60d4]"
              >
                Manage all →
              </Link>
            </div>

            <div className="overflow-hidden rounded-2xl border border-[#dbeafe] bg-white dark:border-[#1e3a6e] dark:bg-[#152040]">
              <div className="grid grid-cols-[1.2fr_1.5fr_1fr_100px_100px] gap-4 border-b border-[#dbeafe] bg-[#f0f4ff] px-5 py-3 text-xs font-bold uppercase tracking-widest text-[#475569] dark:border-[#1e3a6e] dark:bg-[#0a1020] dark:text-[#7b8ebc]">
                <span>Name</span>
                <span>Email</span>
                <span>Joined</span>
                <span>Balance</span>
                <span>Status</span>
              </div>

              {recentUsers.map((user, i) => (
                <div
                  key={user.email}
                  className={`grid grid-cols-[1.2fr_1.5fr_1fr_100px_100px] gap-4 px-5 py-4 text-sm transition hover:bg-[#f0f4ff] dark:hover:bg-[#0a1020] ${
                    i !== recentUsers.length - 1
                      ? "border-b border-[#dbeafe] dark:border-[#1e3a6e]"
                      : ""
                  }`}
                >
                  <p className="self-center font-semibold text-[#0f172a] dark:text-[#e8eeff]">{user.name}</p>
                  <p className="self-center truncate text-[#475569] dark:text-[#7b8ebc]">{user.email}</p>
                  <p className="self-center text-[#475569] dark:text-[#7b8ebc]">{user.joined}</p>
                  <p className="self-center font-semibold text-[#0f172a] dark:text-[#e8eeff]">{user.balance}</p>
                  <div className="self-center">
                    <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                      user.status === "Active"
                        ? "bg-[#10b981]/10 text-[#10b981]"
                        : "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400"
                    }`}>
                      {user.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick admin actions */}
          <div>
            <h2 className="mb-4 text-lg font-bold text-[#0f172a] dark:text-[#e8eeff]">
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { label: "View All Users", href: "/admin/users", icon: "👥" },
                { label: "All Transactions", href: "/admin/transactions", icon: "📊" },
                { label: "Failed Transactions", href: "/admin/failed", icon: "⚠️" },
                { label: "Update Pricing", href: "/admin/pricing", icon: "💲" },
              ].map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className="flex flex-col items-center gap-2 rounded-2xl border border-[#dbeafe] bg-white p-5 text-center transition hover:-translate-y-1 hover:border-[#1e40af] hover:shadow-md dark:border-[#1e3a6e] dark:bg-[#152040] dark:hover:border-[#3b60d4]"
                >
                  <span className="text-2xl">{action.icon}</span>
                  <span className="text-xs font-semibold text-[#0f172a] dark:text-[#e8eeff]">
                    {action.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}