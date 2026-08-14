import Navbar from "@/components/Navbar";
import Link from "next/link";

export const metadata = {
  title: "Transaction History — TEKSUM",
};

const transactions = [
  { id: 1, type: "Airtime", detail: "MTN — 08012345678", amount: "₦500", status: "Successful", date: "Aug 3, 2026", time: "10:32am", ref: "TSM-2026080301" },
  { id: 2, type: "WAEC Pin", detail: "1 Pin purchased", amount: "₦3,900", status: "Successful", date: "Aug 2, 2026", time: "3:15pm", ref: "TSM-2026080201" },
  { id: 3, type: "Data", detail: "Airtel 1GB — 08087654321", amount: "₦490", status: "Successful", date: "Jul 30, 2026", time: "9:00am", ref: "TSM-2026073001" },
  { id: 4, type: "Electricity", detail: "PHED — Meter 12345678", amount: "₦5,000", status: "Failed", date: "Jul 29, 2026", time: "6:45pm", ref: "TSM-2026072901" },
  { id: 5, type: "Airtime", detail: "Glo — 08099999999", amount: "₦200", status: "Successful", date: "Jul 28, 2026", time: "2:10pm", ref: "TSM-2026072801" },
  { id: 6, type: "Cable TV", detail: "DSTV Compact", amount: "₦19,900", status: "Successful", date: "Jul 25, 2026", time: "11:00am", ref: "TSM-2026072501" },
  { id: 7, type: "NECO Token", detail: "2 Tokens purchased", amount: "₦1,400", status: "Successful", date: "Jul 22, 2026", time: "8:30am", ref: "TSM-2026072201" },
  { id: 8, type: "Wallet Funding", detail: "Wema Bank transfer", amount: "₦20,000", status: "Successful", date: "Jul 20, 2026", time: "4:00pm", ref: "TSM-2026072001" },
];

export default function TransactionsPage() {
  return (
    <div className="min-h-screen bg-[#f0f4ff] dark:bg-[#0a1020]">
      <Navbar />

      <main className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-6">

          {/* Header */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Link
                href="/dashboard"
                className="mb-2 inline-flex items-center gap-2 text-sm font-medium text-[#475569] hover:text-[#1e40af] dark:text-[#7b8ebc]"
              >
                ← Back to Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-[#0f172a] dark:text-[#e8eeff]">
                Transaction History
              </h1>
              <p className="text-sm text-[#475569] dark:text-[#7b8ebc]">
                All your past purchases and wallet activity
              </p>
            </div>

            {/* Summary stats */}
            <div className="flex gap-3">
              <div className="rounded-xl border border-[#dbeafe] bg-white px-4 py-2 text-center dark:border-[#1e3a6e] dark:bg-[#152040]">
                <p className="text-xs text-[#475569] dark:text-[#7b8ebc]">Total</p>
                <p className="text-lg font-bold text-[#0f172a] dark:text-[#e8eeff]">8</p>
              </div>
              <div className="rounded-xl border border-[#dbeafe] bg-white px-4 py-2 text-center dark:border-[#1e3a6e] dark:bg-[#152040]">
                <p className="text-xs text-[#475569] dark:text-[#7b8ebc]">Successful</p>
                <p className="text-lg font-bold text-[#10b981]">7</p>
              </div>
              <div className="rounded-xl border border-[#dbeafe] bg-white px-4 py-2 text-center dark:border-[#1e3a6e] dark:bg-[#152040]">
                <p className="text-xs text-[#475569] dark:text-[#7b8ebc]">Failed</p>
                <p className="text-lg font-bold text-red-500">1</p>
              </div>
            </div>
          </div>

          {/* Transactions table */}
          <div className="overflow-hidden rounded-2xl border border-[#dbeafe] bg-white dark:border-[#1e3a6e] dark:bg-[#152040]">

            {/* Table header */}
            <div className="grid grid-cols-[1fr_1fr_100px_130px] gap-4 border-b border-[#dbeafe] bg-[#f0f4ff] px-5 py-3 text-xs font-bold uppercase tracking-widest text-[#475569] dark:border-[#1e3a6e] dark:bg-[#0a1020] dark:text-[#7b8ebc]">
              <span>Service</span>
              <span>Details</span>
              <span>Amount</span>
              <span>Status</span>
            </div>

            {/* Rows */}
            {transactions.map((tx, i) => (
              <div
                key={tx.id}
                className={`grid grid-cols-[1fr_1fr_100px_130px] gap-4 px-5 py-4 text-sm transition hover:bg-[#f0f4ff] dark:hover:bg-[#0a1020] ${
                  i !== transactions.length - 1
                    ? "border-b border-[#dbeafe] dark:border-[#1e3a6e]"
                    : ""
                }`}
              >
                <div>
                  <p className="font-semibold text-[#0f172a] dark:text-[#e8eeff]">{tx.type}</p>
                  <p className="text-xs text-[#475569] dark:text-[#7b8ebc]">
                    {tx.date} • {tx.time}
                  </p>
                  <p className="mt-0.5 text-xs text-[#94a3b8] dark:text-[#475569]">{tx.ref}</p>
                </div>
                <p className="self-center text-sm text-[#475569] dark:text-[#7b8ebc]">{tx.detail}</p>
                <p className="self-center font-semibold text-[#0f172a] dark:text-[#e8eeff]">{tx.amount}</p>
                <div className="self-center">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                      tx.status === "Successful"
                        ? "bg-[#10b981]/10 text-[#10b981]"
                        : tx.status === "Failed"
                        ? "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400"
                        : "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400"
                    }`}
                  >
                    {tx.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Empty state note */}
          <p className="text-center text-xs text-[#475569] dark:text-[#7b8ebc]">
            Showing all 8 transactions • Data is for demonstration purposes
          </p>

        </div>
      </main>
    </div>
  );
}