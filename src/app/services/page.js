"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  services,
  serviceCategories,
} from "@/lib/services";

/* ============================================================
   STATUS BADGE
   ============================================================ */

function StatusBadge({ status }) {
  const isAvailable =
    status === "available";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${
        isAvailable
          ? "bg-[#dcfce7] text-[#15803d] dark:bg-[#052e16] dark:text-[#4ade80]"
          : "bg-[#f1f5f9] text-[#64748b] dark:bg-[#1e293b] dark:text-[#94a3b8]"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          isAvailable
            ? "bg-[#22c55e]"
            : "bg-[#94a3b8]"
        }`}
      />

      {isAvailable
        ? "Available"
        : "Coming soon"}
    </span>
  );
}

/* ============================================================
   SERVICE ICON / LOGO
   ============================================================ */

function ServiceVisual({
  service,
  large = false,
}) {
  const size = large
    ? "h-20 w-20"
    : "h-16 w-16";

  if (service.logo) {
    return (
      <div
        className={`relative flex ${size} shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[#dbeafe] bg-white dark:border-[#1e3a6e] dark:bg-[#0d1526]`}
      >
        <Image
          src={service.logo}
          alt={`${service.title} logo`}
          fill
          sizes={
            large
              ? "80px"
              : "64px"
          }
          className="object-contain p-2.5"
        />
      </div>
    );
  }

  return (
    <div
      className={`flex ${size} shrink-0 items-center justify-center rounded-2xl bg-[#f0f4ff] text-3xl dark:bg-[#101a2d]`}
    >
      {service.icon || "◉"}
    </div>
  );
}

/* ============================================================
   SERVICE DETAILS
   ============================================================ */

function getServiceMeta(service) {
  if (
    service.formType ===
      "telecom" ||
    service.formType === "data"
  ) {
    if (
      service.networks?.length
    ) {
      return service.networks
        .slice(0, 4)
        .join(" • ");
    }
  }

  if (
    service.formType ===
    "internet"
  ) {
    return "Smile • Spectranet";
  }

  if (
    service.formType ===
    "electricity"
  ) {
    return "Prepaid & Postpaid";
  }

  if (
    service.formType === "cable"
  ) {
    return "DStv • GOtv • StarTimes • Showmax";
  }

  if (service.options?.length) {
    return `${service.options.length} service option${
      service.options.length === 1
        ? ""
        : "s"
    }`;
  }

  return null;
}

/* ============================================================
   OPTION STATUS SUMMARY
   ============================================================ */

function getOptionSummary(
  service
) {
  if (!service.options?.length) {
    return null;
  }

  const available =
    service.options.filter(
      (option) =>
        option.status ===
        "available"
    ).length;

  const total =
    service.options.length;

  return {
    available,
    total,
  };
}

/* ============================================================
   SERVICE CARD
   ============================================================ */

function ServiceCard({
  service,
}) {
  const summary =
    getOptionSummary(service);

  const hasAvailableOption =
    summary
      ? summary.available > 0
      : service.status !==
        "coming-soon";

  const serviceStatus =
    service.status ===
      "coming-soon" ||
    !hasAvailableOption
      ? "coming-soon"
      : "available";

  const meta =
    getServiceMeta(service);

  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-[#dbeafe] bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-[#1e40af] hover:shadow-lg dark:border-[#1e3a6e] dark:bg-[#152040] dark:hover:border-[#3b60d4]"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <ServiceVisual
          service={service}
        />

        <StatusBadge
          status={serviceStatus}
        />
      </div>

      {/* Title */}
      <div className="mt-5">
        <h2 className="text-lg font-bold text-[#0f172a] dark:text-[#e8eeff]">
          {service.title}
        </h2>

        {service.shortDescription && (
          <p className="mt-2 text-sm leading-relaxed text-[#475569] dark:text-[#7b8ebc]">
            {service.shortDescription}
          </p>
        )}
      </div>

      {/* Network / provider information */}
      {meta && (
        <div className="mt-4">
          <span className="inline-flex max-w-full rounded-full bg-[#f0f4ff] px-3 py-1.5 text-[11px] font-semibold text-[#475569] dark:bg-[#0d1526] dark:text-[#94a3b8]">
            {meta}
          </span>
        </div>
      )}

      {/* Service options */}
      {service.options?.length >
        0 && (
        <div className="mt-4 space-y-2">
          {service.options
            .slice(0, 3)
            .map((option) => (
              <div
                key={option.id}
                className="flex items-center justify-between gap-3 rounded-xl bg-[#f8fafc] px-3 py-2.5 dark:bg-[#0d1526]"
              >
                <span className="min-w-0 truncate text-xs font-semibold text-[#334155] dark:text-[#cbd5e1]">
                  {option.title}
                </span>

                <StatusBadge
                  status={
                    option.status
                  }
                />
              </div>
            ))}

          {service.options
            .length > 3 && (
            <p className="pt-1 text-[11px] font-bold text-[#1e40af] dark:text-[#3b60d4]">
              +{" "}
              {service.options
                .length - 3}{" "}
              more option
              {service.options
                .length -
                3 ===
              1
                ? ""
                : "s"}
            </p>
          )}
        </div>
      )}

      {/* CTA */}
      <div className="mt-auto flex items-center justify-between gap-3 pt-6">
        <span className="text-sm font-bold text-[#10b981] dark:text-[#34d399]">
          View service
        </span>

        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f0f4ff] text-sm font-bold text-[#1e40af] transition group-hover:translate-x-1 dark:bg-[#101a2d] dark:text-[#3b60d4]">
          →
        </span>
      </div>
    </Link>
  );
}

/* ============================================================
   CATEGORY BUTTON
   ============================================================ */

function CategoryButton({
  category,
  active,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold transition ${
        active
          ? "bg-[#1e40af] text-white shadow-sm dark:bg-[#3b60d4]"
          : "border border-[#dbeafe] bg-white text-[#475569] hover:border-[#1e40af] hover:text-[#1e40af] dark:border-[#1e3a6e] dark:bg-[#152040] dark:text-[#94a3b8] dark:hover:border-[#3b60d4] dark:hover:text-[#3b60d4]"
      }`}
    >
      <span>
        {category.icon}
      </span>

      <span>
        {category.label}
      </span>
    </button>
  );
}

/* ============================================================
   EMPTY STATE
   ============================================================ */

function EmptyState({
  query,
  resetFilters,
}) {
  return (
    <div className="rounded-3xl border border-dashed border-[#cbd5e1] bg-[#f8fafc] px-6 py-14 text-center dark:border-[#334155] dark:bg-[#101a2d]">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#e2e8f0] text-xl dark:bg-[#1e293b]">
        🔎
      </div>

      <h3 className="mt-5 text-lg font-bold text-[#0f172a] dark:text-[#e8eeff]">
        No services found
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[#64748b] dark:text-[#94a3b8]">
        We couldn't find a service matching
        {query
          ? ` "${query}".`
          : " your current filters."}
        Try another search term or view all
        services.
      </p>

      <button
        type="button"
        onClick={resetFilters}
        className="mt-6 cursor-pointer rounded-xl bg-[#1e40af] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#1d3a9e] dark:bg-[#3b60d4]"
      >
        View all services
      </button>
    </div>
  );
}

/* ============================================================
   EDUCATION QUICK LINKS
   ============================================================ */

function EducationSection({
  educationServices,
}) {
  if (
    !educationServices.length
  ) {
    return null;
  }

  return (
    <section
      id="education"
      className="border-t border-[#dbeafe] bg-[#f8fafc] px-4 py-14 sm:px-6 lg:px-8 dark:border-[#1e3a6e] dark:bg-[#0a1020]"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#10b981] dark:text-[#34d399]">
              Education
            </p>

            <h2 className="mt-2 text-2xl font-extrabold text-[#0f172a] dark:text-[#e8eeff]">
              Exam services by body
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#475569] dark:text-[#7b8ebc]">
              Choose the examination body first,
              then select the exact registration,
              result or PIN service available.
            </p>
          </div>

          <Link
            href="/services?category=education"
            className="text-sm font-bold text-[#1e40af] hover:underline dark:text-[#3b60d4]"
          >
            View education services →
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {educationServices.map(
            (service) => {
              const summary =
                getOptionSummary(
                  service
                );

              const available =
                summary
                  ? summary.available >
                    0
                  : service.status !==
                    "coming-soon";

              return (
                <Link
                  key={
                    service.slug
                  }
                  href={`/services/${service.slug}`}
                  className="group rounded-2xl border border-[#dbeafe] bg-white p-5 transition hover:-translate-y-1 hover:border-[#1e40af] hover:shadow-md dark:border-[#1e3a6e] dark:bg-[#152040]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <ServiceVisual
                      service={
                        service
                      }
                      large
                    />

                    <StatusBadge
                      status={
                        available
                          ? "available"
                          : "coming-soon"
                      }
                    />
                  </div>

                  <h3 className="mt-4 font-bold text-[#0f172a] dark:text-[#e8eeff]">
                    {service.title}
                  </h3>

                  <p className="mt-1 text-xs leading-relaxed text-[#64748b] dark:text-[#94a3b8]">
                    {summary
                      ? `${summary.available} of ${summary.total} options available`
                      : "Open service"}
                  </p>

                  <span className="mt-4 block text-xs font-bold text-[#10b981] group-hover:underline dark:text-[#34d399]">
                    Open service →
                  </span>
                </Link>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   MAIN PAGE
   ============================================================ */

export default function ServicesPage() {
  const [
    activeCategory,
    setActiveCategory,
  ] = useState("all");

  const [
    query,
    setQuery,
  ] = useState("");

  const normalizedQuery =
    query.trim().toLowerCase();

  /* ----------------------------------------------------------
     Filter services
     ---------------------------------------------------------- */

  const filteredServices =
    useMemo(() => {
      return services.filter(
        (service) => {
          const categoryMatches =
            activeCategory ===
              "all" ||
            service.category ===
              activeCategory;

          if (!categoryMatches) {
            return false;
          }

          if (!normalizedQuery) {
            return true;
          }

          const optionText =
            service.options
              ?.map(
                (option) =>
                  `${option.title || ""} ${
                    option.description ||
                    ""
                  }`
              )
              .join(" ") || "";

          const networkText =
            service.networks?.join(
              " "
            ) || "";

          const providerText =
            service.providers
              ?.map(
                (provider) =>
                  `${provider.name || ""}`
              )
              .join(" ") || "";

          const searchableText =
            `
              ${service.title || ""}
              ${service.shortDescription || ""}
              ${service.description || ""}
              ${optionText}
              ${networkText}
              ${providerText}
            `.toLowerCase();

          return searchableText.includes(
            normalizedQuery
          );
        }
      );
    }, [
      activeCategory,
      normalizedQuery,
    ]);

  /* ----------------------------------------------------------
     Education services
     ---------------------------------------------------------- */

  const educationSlugs = [
    "jamb",
    "waec-result",
    "waec-registration",
    "waec-verification",
    "neco-result",
    "neco-registration",
    "nabteb",
    "nbais",
  ];

  const educationServices =
    services.filter(
      (service) =>
        educationSlugs.includes(
          service.slug
        )
    );

  /* ----------------------------------------------------------
     Reset filters
     ---------------------------------------------------------- */

  function resetFilters() {
    setActiveCategory(
      "all"
    );

    setQuery("");
  }

  /* ----------------------------------------------------------
     Search result count
     ---------------------------------------------------------- */

  const resultLabel =
    filteredServices.length ===
    1
      ? "service"
      : "services";

  return (
    <div className="min-h-screen bg-white dark:bg-[#0d1526]">
      <Navbar />

      <main>
        {/* ==================================================
            HERO
        ================================================== */}

        <section className="bg-gradient-to-br from-[#eff6ff] via-[#f0fdf4] to-[#eff6ff] px-4 py-14 sm:px-6 sm:py-20 lg:px-8 dark:from-[#0d1526] dark:via-[#0f2a3f] dark:to-[#0d1526]">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-3xl text-center">

              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#10b981] dark:text-[#34d399]">
                TEKSUM Services
              </p>

              <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-[#0f172a] sm:text-5xl dark:text-[#e8eeff]">
                Everything you need,
                <span className="block text-[#1e40af] dark:text-[#3b60d4]">
                  in one place
                </span>
              </h1>

              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#475569] dark:text-[#7b8ebc]">
                Buy airtime and data, pay bills,
                subscribe to TV, access internet
                services and purchase education
                products from one simple platform.
              </p>

              {/* Search */}
              <div className="relative mx-auto mt-8 max-w-2xl">
                <label
                  htmlFor="service-search"
                  className="sr-only"
                >
                  Search services
                </label>

                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-[#94a3b8]">
                  🔎
                </span>

                <input
                  id="service-search"
                  type="search"
                  value={query}
                  onChange={(event) =>
                    setQuery(
                      event.target
                        .value
                    )
                  }
                  placeholder="Search JAMB, WAEC, data, electricity..."
                  className="w-full rounded-2xl border border-[#dbeafe] bg-white py-4 pl-12 pr-12 text-sm text-[#0f172a] shadow-sm outline-none transition placeholder:text-[#94a3b8] focus:border-[#1e40af] focus:ring-4 focus:ring-[#1e40af]/10 dark:border-[#1e3a6e] dark:bg-[#152040] dark:text-[#e8eeff]"
                />

                {query && (
                  <button
                    type="button"
                    onClick={() =>
                      setQuery(
                        ""
                      )
                    }
                    aria-label="Clear search"
                    className="absolute right-4 top-1/2 flex h-7 w-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[#f1f5f9] text-xs font-bold text-[#64748b] hover:bg-[#e2e8f0] dark:bg-[#0d1526] dark:text-[#94a3b8]"
                  >
                    ×
                  </button>
                )}
              </div>

              {/* Search result indicator */}
              <div className="mt-4 min-h-[20px]">
                {query && (
                  <p className="text-xs font-medium text-[#64748b] dark:text-[#94a3b8]">
                    {filteredServices.length}{" "}
                    {resultLabel} found
                  </p>
                )}
              </div>

            </div>
          </div>
        </section>

        {/* ==================================================
            CATEGORY NAV
        ================================================== */}

        <section className="sticky top-0 z-30 border-b border-[#dbeafe] bg-white/95 px-4 py-4 backdrop-blur sm:px-6 lg:px-8 dark:border-[#1e3a6e] dark:bg-[#0d1526]/95">
          <div className="mx-auto max-w-7xl">

            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {serviceCategories.map(
                (category) => (
                  <CategoryButton
                    key={
                      category.id
                    }
                    category={
                      category
                    }
                    active={
                      activeCategory ===
                      category.id
                    }
                    onClick={() =>
                      setActiveCategory(
                        category.id
                      )
                    }
                  />
                )
              )}
            </div>

          </div>
        </section>

        {/* ==================================================
            SERVICE GRID
        ================================================== */}

        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">

            {/* Section heading */}
            <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#10b981] dark:text-[#34d399]">
                  {activeCategory ===
                  "all"
                    ? "All services"
                    : serviceCategories.find(
                        (
                          category
                        ) =>
                          category.id ===
                          activeCategory
                      )?.label ||
                      "Services"}
                </p>

                <h2 className="mt-1 text-2xl font-extrabold text-[#0f172a] dark:text-[#e8eeff]">
                  Choose a service
                </h2>
              </div>

              {(query ||
                activeCategory !==
                  "all") && (
                <button
                  type="button"
                  onClick={
                    resetFilters
                  }
                  className="w-fit cursor-pointer text-sm font-bold text-[#1e40af] hover:underline dark:text-[#3b60d4]"
                >
                  Clear filters
                </button>
              )}

            </div>

            {filteredServices.length >
            0 ? (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filteredServices.map(
                  (service) => (
                    <ServiceCard
                      key={
                        service.slug
                      }
                      service={
                        service
                      }
                    />
                  )
                )}
              </div>
            ) : (
              <EmptyState
                query={query}
                resetFilters={
                  resetFilters
                }
              />
            )}

          </div>
        </section>

        {/* ==================================================
            EDUCATION QUICK ACCESS
        ================================================== */}

        {activeCategory ===
          "all" &&
          !query && (
            <EducationSection
              educationServices={
                educationServices
              }
            />
          )}

        {/* ==================================================
            TRUST / FLOW SECTION
        ================================================== */}

        <section className="border-t border-[#dbeafe] bg-white px-4 py-14 sm:px-6 lg:px-8 dark:border-[#1e3a6e] dark:bg-[#0d1526]">
          <div className="mx-auto max-w-5xl">

            <div className="text-center">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#10b981] dark:text-[#34d399]">
                Simple process
              </p>

              <h2 className="mt-2 text-2xl font-extrabold text-[#0f172a] dark:text-[#e8eeff]">
                From service to completion
              </h2>

              <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[#475569] dark:text-[#7b8ebc]">
                Select a service, provide the required
                details and review your transaction before
                it is submitted.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">

              <div className="rounded-2xl border border-[#dbeafe] bg-[#f8fafc] p-5 text-center dark:border-[#1e3a6e] dark:bg-[#101a2d]">
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#f0f4ff] font-extrabold text-[#1e40af] dark:bg-[#0d1526] dark:text-[#3b60d4]">
                  1
                </div>

                <h3 className="mt-4 text-sm font-bold text-[#0f172a] dark:text-[#e8eeff]">
                  Choose a service
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-[#64748b] dark:text-[#94a3b8]">
                  Select airtime, data, bills, education
                  or another available service.
                </p>
              </div>

              <div className="rounded-2xl border border-[#dbeafe] bg-[#f8fafc] p-5 text-center dark:border-[#1e3a6e] dark:bg-[#101a2d]">
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#f0f4ff] font-extrabold text-[#1e40af] dark:bg-[#0d1526] dark:text-[#3b60d4]">
                  2
                </div>

                <h3 className="mt-4 text-sm font-bold text-[#0f172a] dark:text-[#e8eeff]">
                  Enter your details
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-[#64748b] dark:text-[#94a3b8]">
                  Complete the focused purchase form for
                  the selected service.
                </p>
              </div>

              <div className="rounded-2xl border border-[#dbeafe] bg-[#f8fafc] p-5 text-center dark:border-[#1e3a6e] dark:bg-[#101a2d]">
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#f0f4ff] font-extrabold text-[#1e40af] dark:bg-[#0d1526] dark:text-[#3b60d4]">
                  3
                </div>

                <h3 className="mt-4 text-sm font-bold text-[#0f172a] dark:text-[#e8eeff]">
                  Review & purchase
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-[#64748b] dark:text-[#94a3b8]">
                  Review the transaction before it is
                  submitted to the backend.
                </p>
              </div>

            </div>

          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}