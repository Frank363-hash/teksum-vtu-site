import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  getServiceBySlug,
  services,
} from "@/lib/services";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicePurchasePanelWrapper from "@/components/ServicePurchasePanelWrapper";

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const service =
    getServiceBySlug(slug);

  if (!service) {
    return {};
  }

  return {
    title: `${service.title} | TEKSUM`,
    description: service.description,
  };
}

function StatusBadge({ status }) {
  if (status === "available") {
    return (
      <span className="rounded-full bg-[#dcfce7] px-2.5 py-1 text-[11px] font-bold text-[#15803d] dark:bg-[#052e16] dark:text-[#4ade80]">
        Available
      </span>
    );
  }

  return (
    <span className="rounded-full bg-[#f1f5f9] px-2.5 py-1 text-[11px] font-bold text-[#64748b] dark:bg-[#1e293b] dark:text-[#94a3b8]">
      Coming soon
    </span>
  );
}

export default async function ServicePage({
  params,
}) {
  const { slug } = await params;

  const service =
    getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  /*
   * ---------------------------------------------------------
   * SAFE OPTIONAL DATA
   * ---------------------------------------------------------
   *
   * Different services do not necessarily contain all of
   * these arrays.
   *
   * Normalising them here prevents .map() / .some()
   * runtime errors.
   */

  const options = Array.isArray(
    service.options
  )
    ? service.options
    : [];

  const features = Array.isArray(
    service.features
  )
    ? service.features
    : [];

  const steps = Array.isArray(
    service.steps
  )
    ? service.steps
    : [];

  const hasOptions =
    options.length > 0;

  const hasAvailableOption =
    options.some(
      (option) =>
        option?.status ===
        "available"
    );

  return (
    <div className="min-h-screen bg-white dark:bg-[#0d1526]">

      <Navbar />

      <main>

        {/* =====================================================
            SERVICE HERO
        ===================================================== */}

        <section className="bg-gradient-to-br from-[#eff6ff] via-[#f0fdf4] to-[#eff6ff] px-4 py-14 sm:px-6 sm:py-20 lg:px-8 dark:from-[#0d1526] dark:via-[#0f2a3f] dark:to-[#0d1526]">

          <div className="mx-auto max-w-4xl text-center">

            {service.logo ? (
              <div className="relative mx-auto mb-5 h-20 w-20 overflow-hidden rounded-2xl border border-[#dbeafe] bg-white p-2 shadow-sm dark:border-[#1e3a6e] dark:bg-[#152040]">

                <Image
                  src={service.logo}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-contain p-2"
                />

              </div>
            ) : (
              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-white text-4xl shadow-sm dark:bg-[#152040]">
                {service.icon}
              </div>
            )}

            <h1 className="text-3xl font-extrabold text-[#0f172a] sm:text-4xl dark:text-[#e8eeff]">
              {service.title}
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#475569] dark:text-[#7b8ebc]">
              {service.description}
            </p>

          </div>

        </section>

        {/* =====================================================
            MAIN SERVICE CONTENT
        ===================================================== */}

        <section className="px-4 py-14 sm:px-6 lg:px-8">

          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_390px]">

            {/* =================================================
                LEFT INFORMATION COLUMN
            ================================================= */}

            <div className="space-y-10">

              {/* =================================================
                  SERVICE OPTIONS
              ================================================= */}

              {hasOptions && (
                <div>

                  <div className="flex items-end justify-between gap-4">

                    <div>

                      <p className="text-xs font-bold uppercase tracking-widest text-[#10b981]">
                        Available options
                      </p>

                      <h2 className="mt-2 text-xl font-bold text-[#0f172a] dark:text-[#e8eeff]">
                        Choose what you need
                      </h2>

                    </div>

                    <span className="text-xs font-medium text-[#64748b] dark:text-[#94a3b8]">
                      {options.length}{" "}
                      option
                      {options.length ===
                      1
                        ? ""
                        : "s"}
                    </span>

                  </div>

                  <div className="mt-5 space-y-3">

                    {options.map(
                      (option) => (
                        <div
                          key={
                            option.id
                          }
                          className="rounded-2xl border border-[#dbeafe] bg-white p-4 dark:border-[#1e3a6e] dark:bg-[#152040]"
                        >

                          <div className="flex items-start justify-between gap-4">

                            <div className="min-w-0">

                              <h3 className="text-sm font-bold text-[#0f172a] dark:text-[#e8eeff]">
                                {
                                  option.title
                                }
                              </h3>

                              {option.description && (
                                <p className="mt-1 text-xs leading-relaxed text-[#64748b] dark:text-[#94a3b8]">
                                  {
                                    option.description
                                  }
                                </p>
                              )}

                            </div>

                            <StatusBadge
                              status={
                                option.status
                              }
                            />

                          </div>

                        </div>
                      )
                    )}

                  </div>

                </div>
              )}

              {/* =================================================
                  WHY TEKSUM
              ================================================= */}

              {features.length > 0 && (
                <div>

                  <h2 className="text-xl font-bold text-[#0f172a] dark:text-[#e8eeff]">
                    Why choose TEKSUM?
                  </h2>

                  <ul className="mt-5 space-y-3">

                    {features.map(
                      (feature) => (
                        <li
                          key={
                            feature
                          }
                          className="flex items-start gap-3"
                        >

                          <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#10b981]/15 text-[#10b981]">

                            <svg
                              className="h-3 w-3"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={3}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>

                          </span>

                          <span className="text-sm leading-relaxed text-[#475569] dark:text-[#7b8ebc]">
                            {feature}
                          </span>

                        </li>
                      )
                    )}

                  </ul>

                </div>
              )}

              {/* =================================================
                  HOW IT WORKS
              ================================================= */}

              {steps.length > 0 && (
                <div>

                  <h2 className="text-xl font-bold text-[#0f172a] dark:text-[#e8eeff]">
                    How it works
                  </h2>

                  <ol className="mt-5 space-y-4">

                    {steps.map(
                      (
                        step,
                        index
                      ) => (
                        <li
                          key={
                            step
                          }
                          className="flex gap-4"
                        >

                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1e40af] text-sm font-bold text-white dark:bg-[#3b60d4]">
                            {index +
                              1}
                          </span>

                          <p className="pt-1 text-sm leading-relaxed text-[#475569] dark:text-[#7b8ebc]">
                            {step}
                          </p>

                        </li>
                      )
                    )}

                  </ol>

                </div>
              )}

              {/* =================================================
                  UNAVAILABLE NOTICE
              ================================================= */}

              {hasOptions &&
                !hasAvailableOption && (
                  <div className="rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] p-5 dark:border-[#334155] dark:bg-[#0d1526]">

                    <p className="text-sm font-semibold text-[#475569] dark:text-[#cbd5e1]">
                      This service is
                      currently unavailable.
                    </p>

                    <p className="mt-1 text-xs leading-relaxed text-[#64748b] dark:text-[#94a3b8]">
                      This service is not
                      available for purchase
                      right now. Please check
                      back later for updates.
                    </p>

                  </div>
                )}

            </div>

            {/* =================================================
                REAL PURCHASE PANEL
            ================================================= */}

            <div>

              <ServicePurchasePanelWrapper
                service={service}
              />

            </div>

          </div>

        </section>

        {/* =====================================================
            OTHER SERVICES
        ===================================================== */}

        <section className="border-t border-[#dbeafe] bg-[#f0f4ff] px-4 py-12 sm:px-6 lg:px-8 dark:border-[#1e3a6e] dark:bg-[#0a1020]">

          <div className="mx-auto max-w-6xl text-center">

            <h2 className="text-lg font-bold text-[#0f172a] dark:text-[#e8eeff]">
              Explore other services
            </h2>

            <div className="mt-5 flex flex-wrap justify-center gap-3">

              {services
                .filter(
                  (item) =>
                    item.slug !==
                    service.slug
                )
                .slice(0, 12)
                .map(
                  (item) => (
                    <Link
                      key={
                        item.slug
                      }
                      href={`/services/${item.slug}`}
                      className="rounded-full border border-[#dbeafe] bg-white px-5 py-2 text-sm font-medium text-[#0f172a] transition hover:border-[#1e40af] hover:text-[#1e40af] dark:border-[#1e3a6e] dark:bg-[#152040] dark:text-[#e8eeff] dark:hover:border-[#3b60d4]"
                    >
                      {item.icon}{" "}
                      {item.title}
                    </Link>
                  )
                )}

            </div>

            <Link
              href="/services"
              className="mt-6 inline-block text-sm font-bold text-[#1e40af] hover:underline dark:text-[#3b60d4]"
            >
              See all services →
            </Link>

          </div>

        </section>

      </main>

      <Footer />

    </div>
  );
}