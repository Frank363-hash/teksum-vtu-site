import Navbar from "@/components/Navbar";
import Link from "next/link";

export const metadata = {
  title: "Profile — TEKSUM",
};

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#f0f4ff] dark:bg-[#0a1020]">
      <Navbar />

      <main className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl space-y-6">

          <div>
            <Link
              href="/dashboard"
              className="mb-2 inline-flex items-center gap-2 text-sm font-medium text-[#475569] hover:text-[#1e40af] dark:text-[#7b8ebc]"
            >
              ← Back to Dashboard
            </Link>
            <h1 className="text-2xl font-bold text-[#0f172a] dark:text-[#e8eeff]">
              Profile & Settings
            </h1>
          </div>

          {/* Profile info */}
          <div className="rounded-2xl border border-[#dbeafe] bg-white p-6 shadow-sm dark:border-[#1e3a6e] dark:bg-[#152040]">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1e40af] text-2xl font-bold text-white">
                F
              </div>
              <div>
                <p className="text-lg font-bold text-[#0f172a] dark:text-[#e8eeff]">john Doe</p>
                <p className="text-sm text-[#475569] dark:text-[#7b8ebc]">john@example.com</p>
                <span className="mt-1 inline-block rounded-full bg-[#10b981]/10 px-3 py-0.5 text-xs font-semibold text-[#10b981]">
                  Verified
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { label: "Full Name", value: "john Doe", type: "text" },
                { label: "Email Address", value: "john@example.com", type: "email" },
                { label: "Phone Number", value: "08012345678", type: "tel" },
              ].map((field) => (
                <div key={field.label}>
                  <label className="mb-1.5 block text-sm font-medium text-[#0f172a] dark:text-[#e8eeff]">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    defaultValue={field.value}
                    className="w-full rounded-xl border border-[#dbeafe] bg-white px-4 py-3 text-sm text-[#0f172a] outline-none focus:border-[#1e40af] focus:ring-2 focus:ring-[#1e40af]/20 dark:border-[#1e3a6e] dark:bg-[#0d1526] dark:text-[#e8eeff]"
                  />
                </div>
              ))}
              <button className="w-full rounded-xl bg-[#1e40af] py-3 text-sm font-semibold text-white transition hover:bg-[#1d3a9e] dark:bg-[#3b60d4]">
                Save Changes
              </button>
            </div>
          </div>

          {/* Change password */}
          <div className="rounded-2xl border border-[#dbeafe] bg-white p-6 shadow-sm dark:border-[#1e3a6e] dark:bg-[#152040]">
            <h2 className="mb-5 font-bold text-[#0f172a] dark:text-[#e8eeff]">
              Change Password
            </h2>
            <div className="space-y-4">
              {[
                { label: "Current Password", placeholder: "Enter current password" },
                { label: "New Password", placeholder: "Enter new password" },
                { label: "Confirm New Password", placeholder: "Repeat new password" },
              ].map((field) => (
                <div key={field.label}>
                  <label className="mb-1.5 block text-sm font-medium text-[#0f172a] dark:text-[#e8eeff]">
                    {field.label}
                  </label>
                  <input
                    type="password"
                    placeholder={field.placeholder}
                    className="w-full rounded-xl border border-[#dbeafe] bg-white px-4 py-3 text-sm text-[#0f172a] placeholder:text-[#94a3b8] outline-none focus:border-[#1e40af] focus:ring-2 focus:ring-[#1e40af]/20 dark:border-[#1e3a6e] dark:bg-[#0d1526] dark:text-[#e8eeff]"
                  />
                </div>
              ))}
              <button className="w-full rounded-xl bg-[#10b981] py-3 text-sm font-semibold text-white transition hover:bg-[#059669]">
                Update Password
              </button>
            </div>
          </div>

          {/* Account info */}
          <div className="rounded-2xl border border-[#dbeafe] bg-white p-6 shadow-sm dark:border-[#1e3a6e] dark:bg-[#152040]">
            <h2 className="mb-4 font-bold text-[#0f172a] dark:text-[#e8eeff]">
              Account Information
            </h2>
            <div className="space-y-3">
              {[
                { label: "Account ID", value: "TSM-00001234" },
                { label: "Member Since", value: "August 2026" },
                { label: "Account Status", value: "Active & Verified" },
                { label: "Virtual Account", value: "Wema Bank • 012 345 6789" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-xl bg-[#f0f4ff] px-4 py-3 dark:bg-[#0d1526]"
                >
                  <span className="text-sm text-[#475569] dark:text-[#7b8ebc]">{item.label}</span>
                  <span className="text-sm font-semibold text-[#0f172a] dark:text-[#e8eeff]">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Danger zone */}
          <div className="rounded-2xl border border-red-200 bg-white p-6 dark:border-red-900/30 dark:bg-[#152040]">
            <h2 className="mb-2 font-bold text-red-600 dark:text-red-400">Danger Zone</h2>
            <p className="mb-4 text-sm text-[#475569] dark:text-[#7b8ebc]">
              Deleting your account is permanent and cannot be undone. All your data will be lost.
            </p>
            <button className="rounded-xl border border-red-300 px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20">
              Delete Account
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}