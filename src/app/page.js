import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RevealOnScroll from "@/components/RevealOnScroll";

const serviceCards = [
  {
    slug: "airtime",
    title: "Airtime",
    image: "/services/airtime.png",
    desc: "Top up MTN, Glo, Airtel and 9mobile lines quickly and securely.",
  },
  {
    slug: "data",
    title: "Data",
    image: "/services/data.png",
    desc: "Choose a data plan that suits your needs across major networks.",
  },
  {
    slug: "jamb",
    title: "JAMB Services",
    image: "/education/jamb.png",
    desc: "Find the JAMB services and PIN options available on TEKSUM.",
  },
  {
    slug: "waec-result",
    title: "WAEC",
    image: "/education/Waec_logo.png",
    desc: "Check results and access WAEC services from one place.",
  },
  {
    slug: "neco-result",
    title: "NECO",
    image: "/education/neco.png",
    desc: "Access NECO result-checking and other available services.",
  },
  {
    slug: "nabteb",
    title: "NABTEB",
    image: "/education/nabteb.png",
    desc: "Find the NABTEB result and registration services available on TEKSUM.",
  },
  {
    slug: "nbais",
    title: "NBAIS",
    image: "/education/nbais.png",
    desc: "Access available NBAIS examination services in one place.",
  },
  {
    slug: "internet",
    title: "Internet",
    image: "/services/internet.png",
    desc: "Get internet and broadband services without the usual hassle.",
  },
  {
    slug: "electricity",
    title: "Electricity",
    image: "/services/electricity.png",
    desc: "Pay your electricity bill quickly and keep your service running.",
  },
  {
    slug: "cable",
    title: "Cable TV",
    image: "/services/cable.png",
    desc: "Renew your TV subscription and stay connected to your favourite channels.",
  },
];

function ServiceImage({ src, alt }) {
  return (
    <div className="teksum-image-hover flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#f0f4ff] p-1 dark:bg-[#0d1526]">
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-contain"
      />
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen w-full min-w-0 overflow-x-clip bg-white dark:bg-[#0d1526]">
      <Navbar />

      <main className="w-full min-w-0 overflow-x-clip">
        {/* ── HERO ── */}
        <section className="w-full overflow-hidden bg-gradient-to-br from-[#eff6ff] via-[#f0fdf4] to-[#eff6ff] px-4 py-20 sm:px-6 sm:py-28 lg:px-8 dark:from-[#0d1526] dark:via-[#0f2a3f] dark:to-[#0d1526]">
          <div className="mx-auto w-full max-w-4xl text-center">
            <span className="teksum-fade-in inline-block max-w-full rounded-full border border-[#dbeafe] bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#1e40af] dark:border-[#1e3a6e] dark:bg-[#152040] dark:text-[#3b60d4]">
              Digital services made simple
            </span>

            <h1 className="teksum-slide-up teksum-delay-1 mt-6 break-words text-4xl font-extrabold leading-tight text-[#0f172a] sm:text-5xl lg:text-6xl dark:text-[#e8eeff]">
              Fast, affordable digital{" "}
              <span className="text-[#1e40af] dark:text-[#3b60d4]">
                services
              </span>{" "}
              from one{" "}
              <span className="text-[#10b981] dark:text-[#34d399]">
                trusted
              </span>{" "}
              platform.
            </h1>

            <p className="teksum-slide-up teksum-delay-2 mx-auto mt-6 w-full max-w-2xl text-base leading-relaxed text-[#475569] sm:text-lg dark:text-[#7b8ebc]">
              Buy airtime, data, internet subscriptions, exam services,
              electricity and cable subscriptions from one simple and secure
              platform.
            </p>

            <div className="teksum-slide-up teksum-delay-3 mt-8 flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/register"
                className="teksum-interactive w-full rounded-xl bg-[#1e40af] px-8 py-3.5 text-center text-base font-semibold text-white shadow-sm transition hover:bg-[#1d3a9e] hover:shadow-md sm:w-auto"
              >
                Create free account
              </Link>

              <Link
                href="#services"
                className="teksum-interactive w-full rounded-xl border border-[#dbeafe] bg-white px-8 py-3.5 text-center text-base font-semibold text-[#1e40af] transition hover:border-[#1e40af] hover:shadow-sm sm:w-auto dark:border-[#1e3a6e] dark:bg-[#152040] dark:text-[#e8eeff]"
              >
                Explore services
              </Link>
            </div>

            <div className="teksum-fade-in teksum-delay-4 mt-8 flex w-full flex-wrap justify-center gap-3">
              {[
                "⚡ Fast service",
                "💳 Easy wallet funding",
                "🔒 Secure payments",
                "📞 Customer support",
              ].map((tag) => (
                <span
                  key={tag}
                  className="teksum-interactive max-w-full rounded-full border border-[#dbeafe] bg-white px-4 py-1.5 text-sm text-[#475569] dark:border-[#1e3a6e] dark:bg-[#152040] dark:text-[#7b8ebc]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section
          id="services"
          className="w-full min-w-0 overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
        >
          <div className="mx-auto w-full max-w-7xl min-w-0">
            <RevealOnScroll>
              <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div className="min-w-0 max-w-2xl">
                  <p className="text-sm font-semibold uppercase tracking-widest text-[#10b981] dark:text-[#34d399]">
                    What we offer
                  </p>

                  <h2 className="mt-2 break-words text-2xl font-bold text-[#0f172a] sm:text-3xl dark:text-[#e8eeff]">
                    Your everyday services, all in one place
                  </h2>

                  <p className="mt-3 text-sm leading-relaxed text-[#475569] dark:text-[#7b8ebc]">
                    Choose what you need, check the details and complete your
                    purchase with confidence.
                  </p>
                </div>

                <Link
                  href="/services"
                  className="teksum-interactive inline-flex shrink-0 items-center justify-center rounded-xl border border-[#1e40af] px-5 py-3 text-sm font-bold text-[#1e40af] transition hover:bg-[#1e40af] hover:text-white dark:border-[#3b60d4] dark:text-[#3b60d4] dark:hover:bg-[#3b60d4] dark:hover:text-white"
                >
                  See all services →
                </Link>
              </div>
            </RevealOnScroll>

            <div className="mt-10 grid w-full min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {serviceCards.map((service, index) => (
                <RevealOnScroll
                  key={service.slug}
                  delay={index * 60}
                >
                  <Link
                    href={`/services/${service.slug}`}
                    className="teksum-card-hover group block min-w-0 rounded-2xl border border-[#dbeafe] bg-white p-6 shadow-sm transition duration-300 hover:border-[#1e40af] dark:border-[#1e3a6e] dark:bg-[#152040] dark:hover:border-[#3b60d4]"
                  >
                    <div className="flex min-w-0 items-center gap-4">
                      <ServiceImage
                        src={service.image}
                        alt={`${service.title} logo`}
                      />

                      <div className="min-w-0">
                        <h3 className="break-words text-lg font-bold text-[#0f172a] dark:text-[#e8eeff]">
                          {service.title}
                        </h3>

                        <p className="mt-1 break-words text-sm text-[#475569] dark:text-[#7b8ebc]">
                          {service.desc}
                        </p>
                      </div>
                    </div>

                    <span className="mt-5 inline-block text-sm font-semibold text-[#10b981] transition-transform duration-200 group-hover:translate-x-1 group-hover:underline dark:text-[#34d399]">
                      Explore service →
                    </span>
                  </Link>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* ── TRUSTED SERVICES / PARTNERS ── */}
        <section className="w-full min-w-0 overflow-hidden border-y border-[#dbeafe] bg-[#f8fbff] px-4 py-12 sm:px-6 lg:px-8 dark:border-[#1e3a6e] dark:bg-[#0d1526]">
          <div className="mx-auto w-full max-w-7xl min-w-0">
            <RevealOnScroll>
              <div className="mx-auto w-full max-w-2xl text-center">
                <p className="text-sm font-semibold uppercase tracking-widest text-[#10b981] dark:text-[#34d399]">
                  Services you can rely on
                </p>

                <h2 className="mt-2 break-words text-2xl font-bold text-[#0f172a] sm:text-3xl dark:text-[#e8eeff]">
                  The services you need, all in one place
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-[#475569] dark:text-[#7b8ebc]">
                  From airtime and data to internet, entertainment and exam
                  services, TEKSUM keeps everyday payments simple.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={100}>
              <div
                className="relative mt-8 w-full min-w-0 overflow-x-clip overflow-y-hidden rounded-2xl border border-[#dbeafe] bg-white py-4 shadow-sm isolation-isolate dark:border-[#1e3a6e] dark:bg-[#152040]"
                style={{
                  clipPath: "inset(0)",
                }}
              >
                <div className="teksum-partner-track flex w-max items-center gap-6 px-6">
                  <img
                    src="/partners/teksumpartner.jpg"
                    alt="TEKSUM services"
                    className="teksum-image-hover h-32 w-auto max-w-none shrink-0 rounded-xl object-contain sm:h-40"
                  />

                  <img
                    src="/partners/teksumpartner.jpg"
                    alt=""
                    aria-hidden="true"
                    className="teksum-image-hover h-32 w-auto max-w-none shrink-0 rounded-xl object-contain sm:h-40"
                  />
                </div>
              </div>
            </RevealOnScroll>
          </div>

          <style>{`
            .teksum-partner-track {
              animation: teksumPartnerMarquee 28s linear infinite;
              will-change: transform;
              backface-visibility: hidden;
            }

            .teksum-partner-track:hover {
              animation-play-state: paused;
            }

            @keyframes teksumPartnerMarquee {
              from {
                transform: translate3d(0, 0, 0);
              }

              to {
                transform: translate3d(calc(-50% - 12px), 0, 0);
              }
            }

            @media (prefers-reduced-motion: reduce) {
              .teksum-partner-track {
                animation: none;
              }
            }
          `}</style>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section
          id="about"
          className="w-full min-w-0 overflow-hidden bg-[#f0f4ff] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 dark:bg-[#0a1020]"
        >
          <div className="mx-auto w-full max-w-7xl min-w-0">
            <RevealOnScroll>
              <div className="mb-10 text-center">
                <p className="text-sm font-semibold uppercase tracking-widest text-[#10b981] dark:text-[#34d399]">
                  Simple process
                </p>

                <h2 className="mt-2 break-words text-2xl font-bold text-[#0f172a] sm:text-3xl dark:text-[#e8eeff]">
                  How TEKSUM works
                </h2>
              </div>
            </RevealOnScroll>

            <div className="grid w-full min-w-0 gap-6 sm:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "Create your account",
                  desc: "Sign up in a few simple steps and verify your email.",
                },
                {
                  step: "02",
                  title: "Add funds to your wallet",
                  desc: "Fund your TEKSUM wallet using the available payment option.",
                },
                {
                  step: "03",
                  title: "Choose and pay",
                  desc: "Select your service, review the details and confirm your purchase.",
                },
              ].map((item, index) => (
                <RevealOnScroll
                  key={item.step}
                  delay={index * 80}
                >
                  <div className="teksum-card-hover h-full min-w-0 rounded-2xl border border-[#dbeafe] bg-white p-6 transition duration-300 dark:border-[#1e3a6e] dark:bg-[#152040]">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1e40af] text-lg font-bold text-white transition-transform duration-200 hover:scale-105 dark:bg-[#3b60d4]">
                      {item.step}
                    </div>

                    <h3 className="mt-4 break-words text-lg font-bold text-[#0f172a] dark:text-[#e8eeff]">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-[#475569] dark:text-[#7b8ebc]">
                      {item.desc}
                    </p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRICING ── */}
        <section
          id="pricing"
          className="w-full min-w-0 overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
        >
          <div className="mx-auto w-full max-w-7xl min-w-0">
            <RevealOnScroll>
              <div className="mb-10 text-center">
                <p className="text-sm font-semibold uppercase tracking-widest text-[#10b981] dark:text-[#34d399]">
                  Clear pricing
                </p>

                <h2 className="mt-2 break-words text-2xl font-bold text-[#0f172a] sm:text-3xl dark:text-[#e8eeff]">
                  Know the price before you pay
                </h2>

                <p className="mx-auto mt-3 w-full max-w-xl text-sm leading-relaxed text-[#475569] dark:text-[#7b8ebc]">
                  The amount for your selected service is shown before you
                  confirm your purchase, so you can review everything first.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={100}>
              <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-[#dbeafe] dark:border-[#1e3a6e]">
                <div className="grid grid-cols-2 bg-[#1e40af] px-4 py-3 text-sm font-semibold text-white sm:px-6 dark:bg-[#3b60d4]">
                  <span>Service</span>
                  <span>Price</span>
                </div>

                {[
                  ["MTN Airtime", "View before payment"],
                  ["MTN Data 1GB", "View before payment"],
                  ["Glo Data", "View before payment"],
                  ["WAEC Result Checker", "View before payment"],
                  ["WAEC Registration PIN", "View before payment"],
                  ["NECO Result Token", "View before payment"],
                  ["JAMB Services", "View before payment"],
                  ["NABTEB Services", "View before payment"],
                  ["NBAIS Services", "View before payment"],
                  ["Electricity", "View before payment"],
                  ["Cable TV", "View before payment"],
                ].map(([service, price], i) => (
                  <div
                    key={service}
                    className={`grid min-w-0 grid-cols-2 border-t border-[#dbeafe] px-4 py-3 text-sm transition-colors duration-200 hover:bg-[#eef5ff] sm:px-6 dark:border-[#1e3a6e] dark:hover:bg-[#182847] ${
                      i % 2 === 0
                        ? "bg-white dark:bg-[#152040]"
                        : "bg-[#f0f4ff] dark:bg-[#0d1526]"
                    }`}
                  >
                    <span className="min-w-0 break-words pr-3 text-[#0f172a] dark:text-[#e8eeff]">
                      {service}
                    </span>

                    <span className="min-w-0 break-words text-[#10b981] dark:text-[#34d399]">
                      {price}
                    </span>
                  </div>
                ))}
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="w-full overflow-hidden bg-[#1e40af] px-4 py-16 sm:px-6 lg:px-8 dark:bg-[#152040]">
          <RevealOnScroll>
            <div className="mx-auto w-full max-w-3xl text-center">
              <h2 className="break-words text-2xl font-bold text-white sm:text-3xl">
                Ready to get started?
              </h2>

              <p className="mx-auto mt-4 w-full max-w-xl text-base text-blue-100 dark:text-[#7b8ebc]">
                Create your TEKSUM account and enjoy a simpler way to manage
                your everyday digital services.
              </p>

              <div className="mt-8 flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Link
                  href="/register"
                  className="teksum-interactive w-full rounded-xl bg-[#10b981] px-8 py-3.5 text-center font-semibold text-white transition hover:bg-[#059669] hover:shadow-md sm:w-auto"
                >
                  Create free account
                </Link>

                <Link
                  href="/contact"
                  className="teksum-interactive w-full rounded-xl border border-white/30 px-8 py-3.5 text-center font-semibold text-white transition hover:border-white hover:bg-white/5 sm:w-auto"
                >
                  Contact support
                </Link>
              </div>
            </div>
          </RevealOnScroll>
        </section>
      </main>

      <Footer />
    </div>
  );
}