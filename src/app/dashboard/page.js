import Link from "next/link";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Dashboard TEKSUM",
};

const recentTransactions = [
  { id: 1, type: "Airtime", detail: "MTN — 08012345678", amount: "₦500", status: "Successful", date: "Today, 10:32am", credit: false },
  { id: 2, type: "WAEC Pin", detail: "1 Pin purchased", amount: "₦3,900", status: "Successful", date: "Yesterday, 3:15pm", credit: false },
  { id: 3, type: "Wallet Funding", detail: "Wema Bank transfer", amount: "₦20,000", status: "Successful", date: "Jul 30, 4:00pm", credit: true },
  { id: 4, type: "Electricity", detail: "PHED — Meter 12345678", amount: "₦5,000", status: "Failed", date: "Jul 29, 6:45pm", credit: false },
  { id: 5, type: "Data Bundle", detail: "MTN 1GB — 08012345678", amount: "₦490", status: "Successful", date: "Jul 28, 2:10pm", credit: false },
];

const popularActions = [
  { label: "Airtime", icon: "📱", href: "/services/airtime" },
  { label: "Data", icon: "📶", href: "/services/data" },
  { label: "Electricity", icon: "⚡", href: "/services/electricity" },
  { label: "Cable TV", icon: "📺", href: "/services/cable" },
  { label: "Internet", icon: "🌐", href: "/services/internet" },
];

const educationActions = [
  { label: "JAMB", icon: "🎓", href: "/services/jamb" },
  { label: "WAEC", icon: "📄", href: "/services/waec-result" },
  { label: "NECO", icon: "🎫", href: "/services/neco-result" },
  { label: "NABTEB", icon: "📋", href: "/services/nabteb" },
  { label: "NBAIS", icon: "🏫", href: "/services/nbais" },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#f0f4ff] dark:bg-[#0a1020]">
      <Navbar />

      <main className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-5">

          {/* Welcome */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-[#0f172a] dark:text-[#e8eeff]">
                Good morning, Frank 👋
              </h1>
              <p className="text-sm text-[#475569] dark:text-[#7b8ebc]">
                Welcome back to TEKSUM
              </p>
            </div>
            <Link
              href="/dashboard/transactions"
              className="text-sm font-semibold text-[#1e40af] hover:underline dark:text-[#3b60d4]"
            >
              View history →
            </Link>
          </div>

          {/* Wallet Balance Card */}
          <div className="rounded-2xl bg-[#1e40af] p-6 text-white shadow-lg dark:bg-[#152040]">
            <p className="text-sm font-medium text-blue-100 dark:text-[#7b8ebc]">
              Available Balance
            </p>
            <p className="mt-1 text-4xl font-extrabold tracking-tight">
              ₦25,450.00
            </p>
            <p className="mt-2 text-xs text-blue-200 dark:text-[#475569]">
              Virtual Account: Wema Bank • 012 345 6789
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
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

          {/* Quick Actions — Popular */}
          <div className="rounded-2xl border border-[#dbeafe] bg-white p-5 dark:border-[#1e3a6e] dark:bg-[#152040]">
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#475569] dark:text-[#7b8ebc]">
              Popular Services
            </p>
            <div className="grid grid-cols-4 gap-3">
              {popularActions.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className="flex flex-col items-center gap-2 rounded-xl border border-[#dbeafe] bg-[#f0f4ff] p-3 text-center transition hover:-translate-y-0.5 hover:border-[#1e40af] hover:shadow-sm dark:border-[#1e3a6e] dark:bg-[#0d1526] dark:hover:border-[#3b60d4]"
                >
                  <span className="text-2xl">{action.icon}</span>
                  <span className="text-xs font-semibold text-[#0f172a] dark:text-[#e8eeff]">
                    {action.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Actions — Education */}
          <div className="rounded-2xl border border-[#dbeafe] bg-white p-5 dark:border-[#1e3a6e] dark:bg-[#152040]">
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#475569] dark:text-[#7b8ebc]">
              Exam Pins & Registration
            </p>
            <div className="grid grid-cols-5 gap-3">
              {educationActions.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className="flex flex-col items-center gap-2 rounded-xl border border-[#dbeafe] bg-[#f0f4ff] p-3 text-center transition hover:-translate-y-0.5 hover:border-[#1e40af] hover:shadow-sm dark:border-[#1e3a6e] dark:bg-[#0d1526] dark:hover:border-[#3b60d4]"
                >
                  <span className="text-2xl">{action.icon}</span>
                  <span className="text-xs font-semibold text-[#0f172a] dark:text-[#e8eeff]">
                    {action.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="rounded-2xl border border-[#dbeafe] bg-white dark:border-[#1e3a6e] dark:bg-[#152040]">
            <div className="flex items-center justify-between border-b border-[#dbeafe] px-5 py-4 dark:border-[#1e3a6e]">
              <p className="text-sm font-bold text-[#0f172a] dark:text-[#e8eeff]">
                Recent Transactions
              </p>
              <Link
                href="/dashboard/transactions"
                className="text-xs font-semibold text-[#1e40af] hover:underline dark:text-[#3b60d4]"
              >
                View all →
              </Link>
            </div>

            {recentTransactions.map((tx, i) => (
              <div
                key={tx.id}
                className={`flex items-center justify-between px-5 py-4 ${
                  i !== recentTransactions.length - 1
                    ? "border-b border-[#dbeafe] dark:border-[#1e3a6e]"
                    : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm ${
                    tx.credit
                      ? "bg-[#10b981]/10 text-[#10b981]"
                      : "bg-[#f0f4ff] text-[#1e40af] dark:bg-[#0d1526]"
                  }`}>
                    {tx.credit ? "↑" : "↓"}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#0f172a] dark:text-[#e8eeff]">
                      {tx.type}
                    </p>
                    <p className="text-xs text-[#475569] dark:text-[#7b8ebc]">
                      {tx.detail} • {tx.date}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-bold ${
                    tx.credit
                      ? "text-[#10b981]"
                      : tx.status === "Failed"
                      ? "text-red-500"
                      : "text-[#0f172a] dark:text-[#e8eeff]"
                  }`}>
                    {tx.credit ? "+" : "-"}{tx.amount}
                  </p>
                  <span className={`text-xs font-medium ${
                    tx.status === "Successful"
                      ? "text-[#10b981]"
                      : tx.status === "Failed"
                      ? "text-red-500"
                      : "text-yellow-500"
                  }`}>
                    {tx.status === "Successful" ? "✓" : tx.status === "Failed" ? "✗" : "⏳"} {tx.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Spent this month", value: "₦24,350", icon: "💳" },
              { label: "Transactions", value: "18", icon: "📊" },
              { label: "Account status", value: "Verified", icon: "✅" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-[#dbeafe] bg-white p-4 dark:border-[#1e3a6e] dark:bg-[#152040]"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs text-[#475569] dark:text-[#7b8ebc]">{stat.label}</p>
                  <span className="text-lg">{stat.icon}</span>
                </div>
                <p className="mt-2 text-xl font-bold text-[#0f172a] dark:text-[#e8eeff]">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
}