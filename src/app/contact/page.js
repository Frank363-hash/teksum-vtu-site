import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Contact TEKSUM",
  description: "Get in touch with the TEKSUM support team.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0d1526]">
      <Navbar />
      <main className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">

          {/* Header */}
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#10b981] dark:text-[#34d399]">
              Get in touch
            </p>
            <h1 className="mt-2 text-3xl font-extrabold text-[#0f172a] sm:text-4xl dark:text-[#e8eeff]">
              We're here to help
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base text-[#475569] dark:text-[#7b8ebc]">
              Have a question or issue? Reach out to us and we'll get back to you as quickly as possible.
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1fr_400px]">

            {/* Contact form */}
            <div className="rounded-2xl border border-[#dbeafe] bg-white p-8 shadow-sm dark:border-[#1e3a6e] dark:bg-[#152040]">
              <h2 className="mb-6 text-lg font-bold text-[#0f172a] dark:text-[#e8eeff]">
                Send us a message
              </h2>
              <div className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-[#0f172a] dark:text-[#e8eeff]">
                      Full name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full rounded-xl border border-[#dbeafe] bg-white px-4 py-3 text-sm text-[#0f172a] placeholder:text-[#94a3b8] outline-none focus:border-[#1e40af] focus:ring-2 focus:ring-[#1e40af]/20 dark:border-[#1e3a6e] dark:bg-[#0d1526] dark:text-[#e8eeff] dark:placeholder:text-[#475569]"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-[#0f172a] dark:text-[#e8eeff]">
                      Email address
                    </label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-[#dbeafe] bg-white px-4 py-3 text-sm text-[#0f172a] placeholder:text-[#94a3b8] outline-none focus:border-[#1e40af] focus:ring-2 focus:ring-[#1e40af]/20 dark:border-[#1e3a6e] dark:bg-[#0d1526] dark:text-[#e8eeff] dark:placeholder:text-[#475569]"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#0f172a] dark:text-[#e8eeff]">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="What is your message about?"
                    className="w-full rounded-xl border border-[#dbeafe] bg-white px-4 py-3 text-sm text-[#0f172a] placeholder:text-[#94a3b8] outline-none focus:border-[#1e40af] focus:ring-2 focus:ring-[#1e40af]/20 dark:border-[#1e3a6e] dark:bg-[#0d1526] dark:text-[#e8eeff] dark:placeholder:text-[#475569]"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#0f172a] dark:text-[#e8eeff]">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Describe your issue or question in detail..."
                    className="w-full rounded-xl border border-[#dbeafe] bg-white px-4 py-3 text-sm text-[#0f172a] placeholder:text-[#94a3b8] outline-none focus:border-[#1e40af] focus:ring-2 focus:ring-[#1e40af]/20 dark:border-[#1e3a6e] dark:bg-[#0d1526] dark:text-[#e8eeff] dark:placeholder:text-[#475569]"
                  />
                </div>
                <button className="w-full rounded-xl bg-[#1e40af] py-3.5 text-sm font-semibold text-white transition hover:bg-[#1d3a9e] dark:bg-[#3b60d4] dark:hover:bg-[#2d50c0]">
                  Send message
                </button>
              </div>
            </div>

            {/* Contact info */}
            <div className="space-y-5">
              {[
                {
                  icon: "📧",
                  title: "Email support",
                  value: "support@teksum.com.ng",
                  note: "We reply within 24 hours",
                },
                {
                  icon: "💬",
                  title: "WhatsApp",
                  value: "+234 800 000 0000",
                  note: "Mon – Sat, 8am – 10pm",
                },
                {
                  icon: "🕐",
                  title: "Business hours",
                  value: "Monday – Saturday",
                  note: "8:00am – 10:00pm WAT",
                },
                {
                  icon: "⚡",
                  title: "Response time",
                  value: "Usually within 2 hours",
                  note: "During business hours",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-[#dbeafe] bg-white p-5 dark:border-[#1e3a6e] dark:bg-[#152040]"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <p className="font-semibold text-[#0f172a] dark:text-[#e8eeff]">
                        {item.title}
                      </p>
                      <p className="mt-1 text-sm font-medium text-[#1e40af] dark:text-[#3b60d4]">
                        {item.value}
                      </p>
                      <p className="mt-0.5 text-xs text-[#475569] dark:text-[#7b8ebc]">
                        {item.note}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* FAQ note */}
              <div className="rounded-2xl border border-[#dbeafe] bg-[#f0f4ff] p-5 dark:border-[#1e3a6e] dark:bg-[#0a1020]">
                <p className="text-sm font-semibold text-[#0f172a] dark:text-[#e8eeff]">
                  Common issues
                </p>
                <ul className="mt-3 space-y-2">
                  {[
                    "I paid but didn't receive airtime",
                    "How do I fund my wallet?",
                    "My WAEC pin is not working",
                    "I need a refund",
                  ].map((q) => (
                    <li key={q} className="flex items-start gap-2 text-sm text-[#475569] dark:text-[#7b8ebc]">
                      <span className="mt-0.5 text-[#10b981]">→</span>
                      {q}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}