import Navbar from "@/components/Navbar";
import Link from "next/link";

export const metadata = {
  title: "Fund Wallet — TEKSUM",
};

export default function FundWalletPage() {
  return (
    <div className="min-h-screen bg-[#f0f4ff] dark:bg-[#0a1020]">
      <Navbar />

      <main className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl space-y-6">

          {/* Header */}
          <div>
            <Link
              href="/dashboard"
              className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-[#475569] hover:text-[#1e40af] dark:text-[#7b8ebc] dark:hover:text-[#3b60d4]"
            >
              ← Back to Dashboard
            </Link>
            <h1 className="text-2xl font-bold text-[#0f172a] dark:text-[#e8eeff]">
              Fund Your Wallet
            </h1>
            <p className="mt-1 text-sm text-[#475569] dark:text-[#7b8ebc]">
              Transfer money to your unique TEKSUM virtual account to top up your wallet instantly.
            </p>
          </div>

          {/* Virtual account card */}
          <div className="rounded-2xl border border-[#dbeafe] bg-white p-6 shadow-sm dark:border-[#1e3a6e] dark:bg-[#152040]">
            <div className="mb-4 flex items-center gap-3">
              <span className="text-2xl">🏦</span>
              <div>
                <p className="font-bold text-[#0f172a] dark:text-[#e8eeff]">
                  Your Dedicated Virtual Account
                </p>
                <p className="text-xs text-[#475569] dark:text-[#7b8ebc]">
                  This account is unique to you, do not share it
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { label: "Bank Name", value: "Wema Bank" },
                { label: "Account Number", value: "012 345 6789" },
                { label: "Account Name", value: "TEKSUM / John Doe" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-xl bg-[#f0f4ff] px-4 py-3 dark:bg-[#0d1526]"
                >
                  <span className="text-sm text-[#475569] dark:text-[#7b8ebc]">
                    {item.label}
                  </span>
                  <span className="font-bold text-[#0f172a] dark:text-[#e8eeff]">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            <button className="mt-4 w-full rounded-xl border border-[#dbeafe] bg-white py-3 text-sm font-semibold text-[#1e40af] transition hover:border-[#1e40af] dark:border-[#1e3a6e] dark:bg-[#0d1526] dark:text-[#3b60d4]">
              📋 Copy Account Number
            </button>
          </div>

          {/* How to fund */}
          <div className="rounded-2xl border border-[#dbeafe] bg-white p-6 shadow-sm dark:border-[#1e3a6e] dark:bg-[#152040]">
            <h2 className="mb-5 font-bold text-[#0f172a] dark:text-[#e8eeff]">
              How to fund your wallet
            </h2>
            <ol className="space-y-4">
              {[
                { step: "01", text: "Open your bank app or USSD on any Nigerian bank" },
                { step: "02", text: "Transfer any amount to the Wema Bank account number above" },
                { step: "03", text: "Your TEKSUM wallet is credited automatically within seconds" },
                { step: "04", text: "You'll receive a confirmation notification on your dashboard" },
              ].map((item) => (
                <li key={item.step} className="flex items-start gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1e40af] text-xs font-bold text-white dark:bg-[#3b60d4]">
                    {item.step}
                  </span>
                  <p className="pt-1 text-sm leading-relaxed text-[#475569] dark:text-[#7b8ebc]">
                    {item.text}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          {/* Important notes */}
          <div className="rounded-2xl border border-[#dbeafe] bg-[#f0f4ff] p-5 dark:border-[#1e3a6e] dark:bg-[#0a1020]">
            <p className="mb-3 text-sm font-bold text-[#0f172a] dark:text-[#e8eeff]">
              ⚠️ Important notes
            </p>
            <ul className="space-y-2">
              {[
                "Minimum funding amount is ₦100",
                "Transfers reflect instantly during banking hours",
                "This virtual account belongs to you only, never share it",
                "Contact support if your wallet is not credited after 10 minutes",
              ].map((note) => (
                <li key={note} className="flex items-start gap-2 text-sm text-[#475569] dark:text-[#7b8ebc]">
                  <span className="mt-0.5 text-[#10b981]">•</span>
                  {note}
                </li>
              ))}
            </ul>
          </div>

          {/* Current balance */}
          <div className="rounded-2xl bg-[#1e40af] p-5 text-white dark:bg-[#152040]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-100 dark:text-[#7b8ebc]">Current Wallet Balance</p>
                <p className="mt-1 text-3xl font-extrabold">₦12,450.00</p>
              </div>
              <Link
                href="/dashboard"
                className="rounded-xl border border-white/30 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}