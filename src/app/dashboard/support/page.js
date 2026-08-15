"use client";

import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/Navbar";

const supportCategories = [
  {
    icon: "💳",
    title: "Wallet & Funding",
    description:
      "Questions about funding your TEKSUM wallet, balances or bank transfers.",
  },
  {
    icon: "📱",
    title: "Airtime & Data",
    description:
      "Get help with airtime purchases, data bundles or failed transactions.",
  },
  {
    icon: "⚡",
    title: "Bills & Utilities",
    description:
      "Help with electricity, cable TV and other bill payments.",
  },
  {
    icon: "🎓",
    title: "Education Services",
    description:
      "Get help with examination pins, tokens and registration services.",
  },
];

const faqs = [
  {
    question:
      "What happens if my purchase fails?",
    answer:
      "A failed transaction should be reflected in your transaction history. Once the backend is connected, TEKSUM will use the provider transaction status to determine the final outcome and any applicable wallet reversal.",
  },
  {
    question:
      "Where can I see my transaction history?",
    answer:
      "Open your Dashboard and select Transaction History. Your completed, pending and failed transactions will appear there once transaction data is connected to the backend.",
  },
  {
    question:
      "How do I fund my TEKSUM wallet?",
    answer:
      "Use the Fund Wallet option from your dashboard. The available bank transfer and payment methods will be provided by the TEKSUM backend.",
  },
  {
    question:
      "Can I edit my account information?",
    answer:
      "Yes. Open Dashboard, select the three-dot account menu and choose Profile & Account.",
  },
];

export default function SupportPage() {
  const [openFaq, setOpenFaq] =
    useState(null);

  const [category, setCategory] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [submitted, setSubmitted] =
    useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    if (
      !category ||
      !message.trim()
    ) {
      return;
    }

    /*
     * BACKEND INTEGRATION POINT
     *
     * Future support endpoint:
     *
     * POST /api/support/tickets
     *
     * {
     *   category,
     *   message
     * }
     *
     * The backend should create a support ticket and return
     * a ticket reference that can be shown to the user.
     */

    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-[#f0f4ff] dark:bg-[#0a1020]">
      <Navbar />

      <main className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-5">

          {/* Header */}
          <div>
            <Link
              href="/dashboard"
              className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-[#475569] transition hover:text-[#1e40af] dark:text-[#7b8ebc] dark:hover:text-[#3b60d4]"
            >
              ← Back to Dashboard
            </Link>

            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#1e40af] dark:text-[#3b60d4]">
              TEKSUM Support
            </p>

            <h1 className="mt-1 text-2xl font-bold text-[#0f172a] dark:text-[#e8eeff]">
              How can we help?
            </h1>

            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-[#64748b] dark:text-[#94a3b8]">
              Find answers, get help with a transaction or contact TEKSUM support.
            </p>
          </div>

          {/* Quick help */}
          <section className="rounded-3xl bg-[#1e40af] p-6 text-white shadow-lg dark:bg-[#152040] sm:p-7">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-blue-100 dark:text-[#7b8ebc]">
                  Need assistance?
                </p>

                <h2 className="mt-2 text-xl font-bold">
                  We're here to help.
                </h2>

                <p className="mt-2 max-w-xl text-sm leading-relaxed text-blue-100 dark:text-[#94a3b8]">
                  Tell us what went wrong and the support system can create a ticket for your issue once the backend is connected.
                </p>
              </div>

              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-3xl">
                💬
              </div>
            </div>
          </section>

          {/* Support categories */}
          <section className="rounded-2xl border border-[#dbeafe] bg-white p-5 dark:border-[#1e3a6e] dark:bg-[#152040] sm:p-6">
            <div className="mb-5">
              <h2 className="text-base font-bold text-[#0f172a] dark:text-[#e8eeff]">
                What do you need help with?
              </h2>

              <p className="mt-1 text-xs text-[#64748b] dark:text-[#94a3b8]">
                Choose the area closest to your issue.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {supportCategories.map(
                (item) => (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() =>
                      setCategory(
                        item.title
                      )
                    }
                    className={`rounded-2xl border p-4 text-left transition ${
                      category ===
                      item.title
                        ? "border-[#1e40af] bg-[#eff6ff] shadow-sm dark:border-[#3b60d4] dark:bg-[#0d1526]"
                        : "border-[#dbeafe] bg-[#f8fbff] hover:border-[#1e40af] hover:shadow-sm dark:border-[#1e3a6e] dark:bg-[#0d1526]"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-lg shadow-sm dark:bg-[#152040]">
                        {item.icon}
                      </span>

                      <div>
                        <p className="text-sm font-bold text-[#0f172a] dark:text-[#e8eeff]">
                          {item.title}
                        </p>

                        <p className="mt-1 text-xs leading-relaxed text-[#64748b] dark:text-[#94a3b8]">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </button>
                )
              )}
            </div>
          </section>

          {/* FAQ */}
          <section className="rounded-2xl border border-[#dbeafe] bg-white dark:border-[#1e3a6e] dark:bg-[#152040]">
            <div className="border-b border-[#dbeafe] px-5 py-5 dark:border-[#1e3a6e] sm:px-6">
              <h2 className="text-base font-bold text-[#0f172a] dark:text-[#e8eeff]">
                Frequently asked questions
              </h2>

              <p className="mt-1 text-xs text-[#64748b] dark:text-[#94a3b8]">
                Quick answers to common questions.
              </p>
            </div>

            <div>
              {faqs.map(
                (faq, index) => {
                  const isOpen =
                    openFaq === index;

                  return (
                    <div
                      key={
                        faq.question
                      }
                      className={`${
                        index !==
                        faqs.length - 1
                          ? "border-b border-[#dbeafe] dark:border-[#1e3a6e]"
                          : ""
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setOpenFaq(
                            isOpen
                              ? null
                              : index
                          )
                        }
                        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
                      >
                        <span className="text-sm font-semibold text-[#334155] dark:text-[#cbd5e1]">
                          {faq.question}
                        </span>

                        <span className="shrink-0 text-lg text-[#64748b] dark:text-[#94a3b8]">
                          {isOpen
                            ? "−"
                            : "+"}
                        </span>
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5 sm:px-6">
                          <p className="rounded-xl bg-[#f0f4ff] p-4 text-xs leading-relaxed text-[#64748b] dark:bg-[#0d1526] dark:text-[#94a3b8]">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                }
              )}
            </div>
          </section>

          {/* Contact form */}
          <section className="rounded-2xl border border-[#dbeafe] bg-white p-5 dark:border-[#1e3a6e] dark:bg-[#152040] sm:p-6">
            <div className="mb-5">
              <h2 className="text-base font-bold text-[#0f172a] dark:text-[#e8eeff]">
                Contact support
              </h2>

              <p className="mt-1 text-xs leading-relaxed text-[#64748b] dark:text-[#94a3b8]">
                Describe your issue and we'll prepare it for the TEKSUM support system.
              </p>
            </div>

            {submitted ? (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-900/40 dark:bg-emerald-950/30">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-lg dark:bg-emerald-950/50">
                    ✓
                  </div>

                  <div>
                    <p className="text-sm font-bold text-emerald-800 dark:text-emerald-300">
                      Your message is ready
                    </p>

                    <p className="mt-1 text-xs leading-relaxed text-emerald-700 dark:text-emerald-400">
                      The support ticket API will be connected here when the backend is implemented.
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(
                          false
                        );
                        setMessage("");
                      }}
                      className="mt-3 text-xs font-bold text-emerald-800 underline dark:text-emerald-300"
                    >
                      Send another message
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <div>
                  <label
                    htmlFor="support-category"
                    className="mb-1.5 block text-sm font-semibold text-[#334155] dark:text-[#cbd5e1]"
                  >
                    Issue type
                  </label>

                  <select
                    id="support-category"
                    value={category}
                    onChange={(event) =>
                      setCategory(
                        event.target.value
                      )
                    }
                    className="w-full rounded-xl border border-[#dbeafe] bg-white px-4 py-3 text-sm text-[#0f172a] outline-none focus:border-[#1e40af] focus:ring-2 focus:ring-[#1e40af]/20 dark:border-[#1e3a6e] dark:bg-[#0d1526] dark:text-[#e8eeff]"
                  >
                    <option value="">
                      Select an issue
                    </option>

                    {supportCategories.map(
                      (item) => (
                        <option
                          key={
                            item.title
                          }
                          value={
                            item.title
                          }
                        >
                          {item.title}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="support-message"
                    className="mb-1.5 block text-sm font-semibold text-[#334155] dark:text-[#cbd5e1]"
                  >
                    Message
                  </label>

                  <textarea
                    id="support-message"
                    value={message}
                    onChange={(event) =>
                      setMessage(
                        event.target.value
                      )
                    }
                    rows={5}
                    placeholder="Tell us what happened..."
                    className="w-full resize-none rounded-xl border border-[#dbeafe] bg-white px-4 py-3 text-sm text-[#0f172a] outline-none placeholder:text-[#94a3b8] focus:border-[#1e40af] focus:ring-2 focus:ring-[#1e40af]/20 dark:border-[#1e3a6e] dark:bg-[#0d1526] dark:text-[#e8eeff]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={
                    !category ||
                    !message.trim()
                  }
                  className="w-full rounded-xl bg-[#1e40af] py-3 text-sm font-bold text-white transition hover:bg-[#1d3a9e] disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#3b60d4] sm:w-auto sm:px-8"
                >
                  Submit Support Request
                </button>
              </form>
            )}
          </section>

          {/* Dashboard shortcuts */}
          <section className="rounded-2xl border border-[#dbeafe] bg-white p-5 dark:border-[#1e3a6e] dark:bg-[#152040]">
            <h2 className="text-sm font-bold text-[#0f172a] dark:text-[#e8eeff]">
              Quick links
            </h2>

            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Link
                href="/dashboard"
                className="rounded-xl bg-[#f0f4ff] p-3 text-center text-xs font-bold text-[#334155] transition hover:bg-[#dbeafe] dark:bg-[#0d1526] dark:text-[#cbd5e1] dark:hover:bg-[#1e3a6e]"
              >
                Dashboard
              </Link>

              <Link
                href="/dashboard/profile"
                className="rounded-xl bg-[#f0f4ff] p-3 text-center text-xs font-bold text-[#334155] transition hover:bg-[#dbeafe] dark:bg-[#0d1526] dark:text-[#cbd5e1] dark:hover:bg-[#1e3a6e]"
              >
                Profile
              </Link>

              <Link
                href="/dashboard/transactions"
                className="rounded-xl bg-[#f0f4ff] p-3 text-center text-xs font-bold text-[#334155] transition hover:bg-[#dbeafe] dark:bg-[#0d1526] dark:text-[#cbd5e1] dark:hover:bg-[#1e3a6e]"
              >
                Transactions
              </Link>

              <Link
                href="/dashboard/security"
                className="rounded-xl bg-[#f0f4ff] p-3 text-center text-xs font-bold text-[#334155] transition hover:bg-[#dbeafe] dark:bg-[#0d1526] dark:text-[#cbd5e1] dark:hover:bg-[#1e3a6e]"
              >
                Security
              </Link>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}