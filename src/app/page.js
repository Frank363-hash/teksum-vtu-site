import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0d1526]">
      <Navbar />

      <main>

        {/* ── HERO ── */}
        <section className="bg-gradient-to-br from-[#eff6ff] via-[#f0fdf4] to-[#eff6ff] px-4 py-20 sm:px-6 sm:py-28 lg:px-8 dark:from-[#0d1526] dark:via-[#0f2a3f] dark:to-[#0d1526]">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-block rounded-full border border-[#dbeafe] bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#1e40af] dark:border-[#1e3a6e] dark:bg-[#152040] dark:text-[#3b60d4]">
              Wallet-powered VTU platform for Nigeria
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight text-[#0f172a] sm:text-5xl lg:text-6xl dark:text-[#e8eeff]">
              Fast, affordable digital{" "}
              <span className="text-[#1e40af] dark:text-[#3b60d4]">services</span>{" "}
              from one{" "}
              <span className="text-[#10b981] dark:text-[#34d399]">trusted</span>{" "}
              platform.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#475569] sm:text-lg dark:text-[#7b8ebc]">
              Buy airtime, data, internet subscriptions, WAEC pins, NECO tokens,
              NABTEB pins, electricity and cable subscriptions, with a secure wallet experience.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/register"
                className="w-full rounded-xl bg-[#1e40af] px-8 py-3.5 text-center text-base font-semibold text-white transition hover:bg-[#1d3a9e] sm:w-auto dark:bg-[#3b60d4] dark:hover:bg-[#2d50c0]"
              >
                Create free account
              </Link>
              <Link
                href="#services"
                className="w-full rounded-xl border border-[#dbeafe] bg-white px-8 py-3.5 text-center text-base font-semibold text-[#1e40af] transition hover:border-[#1e40af] sm:w-auto dark:border-[#1e3a6e] dark:bg-[#152040] dark:text-[#e8eeff]"
              >
                Explore services
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {["⚡ Instant top-up", "💳 Wallet funding", "🛡️ Refund protection", "📞 24/7 support"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#dbeafe] bg-white px-4 py-1.5 text-sm text-[#475569] dark:border-[#1e3a6e] dark:bg-[#152040] dark:text-[#7b8ebc]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section id="services" className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-widest text-[#10b981] dark:text-[#34d399]">
                  What we offer
                </p>
                <h2 className="mt-2 text-2xl font-bold text-[#0f172a] sm:text-3xl dark:text-[#e8eeff]">
                  Your everyday services, all in one place
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[#475569] dark:text-[#7b8ebc]">
                  Airtime, data, exam services, electricity and TV subscriptions organised so you can find what you need quickly.
                </p>
              </div>
              <Link
                href="/services"
                className="inline-flex shrink-0 items-center justify-center rounded-xl border border-[#1e40af] px-5 py-3 text-sm font-bold text-[#1e40af] transition hover:bg-[#1e40af] hover:text-white dark:border-[#3b60d4] dark:text-[#3b60d4] dark:hover:bg-[#3b60d4] dark:hover:text-white"
              >
                See all services →
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { slug: "airtime", title: "Airtime", icon: "📱", desc: "MTN, Glo, Airtel and 9mobile top-up." },
                { slug: "data", title: "Data", icon: "📶", desc: "Regular and SME data plans across networks." },
                { slug: "jamb", title: "JAMB Services", icon: "🎓", desc: "UTME and Direct Entry PIN options." },
                { slug: "waec-result", title: "WAEC", icon: "📄", desc: "Result checker and registration PIN services." },
                { slug: "neco-result", title: "NECO", icon: "🎫", desc: "Result tokens and supported registration services." },
                { slug: "electricity", title: "Electricity", icon: "⚡", desc: "Prepaid and postpaid electricity payments." },
                {slug: "internet", title: "Internet", icon: "🌐", desc: "Smile and Spectranet broadband subscriptions." },
              ].map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group rounded-2xl border border-[#dbeafe] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#1e40af] hover:shadow-md dark:border-[#1e3a6e] dark:bg-[#152040] dark:hover:border-[#3b60d4]"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f0f4ff] text-2xl dark:bg-[#0d1526]">
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#0f172a] dark:text-[#e8eeff]">{service.title}</h3>
                      <p className="mt-1 text-sm text-[#475569] dark:text-[#7b8ebc]">{service.desc}</p>
                    </div>
                  </div>
                  <span className="mt-5 inline-block text-sm font-semibold text-[#10b981] group-hover:underline dark:text-[#34d399]">
                    Explore service →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section id="about" className="bg-[#f0f4ff] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 dark:bg-[#0a1020]">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-[#10b981] dark:text-[#34d399]">
                Simple process
              </p>
              <h2 className="mt-2 text-2xl font-bold text-[#0f172a] sm:text-3xl dark:text-[#e8eeff]">
                How TEKSUM works
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              {[
                { step: "01", title: "Create your account", desc: "Register quickly and verify your email in a few clicks." },
                { step: "02", title: "Fund your wallet", desc: "Transfer to your unique Wema Bank virtual account credited instantly." },
                { step: "03", title: "Buy and relax", desc: "Select any service, confirm from your wallet, and receive instant delivery." },
              ].map((item) => (
                <div key={item.step} className="rounded-2xl border border-[#dbeafe] bg-white p-6 dark:border-[#1e3a6e] dark:bg-[#152040]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1e40af] text-lg font-bold text-white dark:bg-[#3b60d4]">
                    {item.step}
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-[#0f172a] dark:text-[#e8eeff]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#475569] dark:text-[#7b8ebc]">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRICING ── */}
        <section id="pricing" className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-[#10b981] dark:text-[#34d399]">
                Transparent pricing
              </p>
              <h2 className="mt-2 text-2xl font-bold text-[#0f172a] sm:text-3xl dark:text-[#e8eeff]">
                Competitive rates always
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#475569] dark:text-[#7b8ebc]">
                TEKSUM offers below-market rates on airtime and data, and affordable exam pins with no hidden fees.
              </p>
            </div>
            <div className="mx-auto max-w-2xl overflow-hidden rounded-2xl border border-[#dbeafe] dark:border-[#1e3a6e]">
              <div className="grid grid-cols-2 bg-[#1e40af] px-6 py-3 text-sm font-semibold text-white dark:bg-[#3b60d4]">
                <span>Service</span>
                <span>Typical Price</span>
              </div>
{[
  ["MTN Airtime", "Provider pricing"],
  ["MTN Data 1GB (Regular)", "Dynamic"],
  ["Glo SME Data", "Dynamic"],
  ["WAEC Result Checker", "Dynamic"],
  ["WAEC Registration PIN", "Dynamic"],
  ["NECO Result Checker Token", "Dynamic"],
  ["JAMB UTME PIN", "Dynamic"],
  ["NABTEB Services", "Dynamic"],
  ["NBAIS Services", "Coming soon"],
  ["Electricity", "Provider pricing"],
  ["DSTV / GOtv / StarTimes / Showmax", "Provider pricing"],
].map(([service, price], i) => (
                <div
                  key={service}
                  className={`grid grid-cols-2 border-t border-[#dbeafe] px-6 py-3 text-sm dark:border-[#1e3a6e] ${i % 2 === 0 ? "bg-white dark:bg-[#152040]" : "bg-[#f0f4ff] dark:bg-[#0d1526]"}`}
                >
                  <span className="text-[#0f172a] dark:text-[#e8eeff]">{service}</span>
                  <span className="font-semibold text-[#10b981] dark:text-[#34d399]">{price}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-[#1e40af] px-4 py-16 sm:px-6 lg:px-8 dark:bg-[#152040]">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Ready to get started with TEKSUM?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-blue-100 dark:text-[#7b8ebc]">
              Join thousands of Nigerians who buy airtime, data, and exam pins faster and cheaper with TEKSUM.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/register"
                className="w-full rounded-xl bg-[#10b981] px-8 py-3.5 text-center font-semibold text-white transition hover:bg-[#059669] sm:w-auto"
              >
                Create free account
              </Link>
              <Link
                href="/contact"
                className="w-full rounded-xl border border-white/30 px-8 py-3.5 text-center font-semibold text-white transition hover:border-white sm:w-auto"
              >
                Contact support
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}