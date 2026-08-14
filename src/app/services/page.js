"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { services, serviceCategories } from "@/lib/services";

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

function ServiceCard({ service }) {
  const availableOptions = service.options?.filter((option) => option.status === "available") ?? [];
  const unavailableOptions = service.options?.filter((option) => option.status !== "available") ?? [];

  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-[#dbeafe] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#1e40af] hover:shadow-lg dark:border-[#1e3a6e] dark:bg-[#152040] dark:hover:border-[#3b60d4]"
    >
      <div className="flex items-start justify-between gap-4">
        {service.logo ? (
          <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[#dbeafe] bg-[#f8fafc] dark:border-[#1e3a6e] dark:bg-[#0d1526]">
            <Image src={service.logo} alt="" fill sizes="64px" className="object-contain p-2" />
          </div>
        ) : (
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#f0f4ff] text-3xl dark:bg-[#0d1526]">
            {service.icon}
          </div>
        )}
        {service.options && <StatusBadge status={availableOptions.length ? "available" : "coming-soon"} />}
      </div>

      <h2 className="mt-5 text-lg font-bold text-[#0f172a] dark:text-[#e8eeff]">
        {service.title}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-[#475569] dark:text-[#7b8ebc]">
        {service.shortDescription}
      </p>

      {service.options ? (
        <div className="mt-4 space-y-2">
          {service.options.slice(0, 4).map((option) => (
            <div key={option.id} className="flex items-center justify-between gap-3 rounded-xl bg-[#f8fafc] px-3 py-2.5 dark:bg-[#0d1526]">
              <span className="min-w-0 text-xs font-semibold text-[#334155] dark:text-[#cbd5e1]">
                {option.title}
              </span>
              <StatusBadge status={option.status} />
            </div>
          ))}
          {service.options.length > 4 && (
            <p className="text-xs font-semibold text-[#1e40af] dark:text-[#3b60d4]">
              + {service.options.length - 4} more option{service.options.length - 4 === 1 ? "" : "s"}
            </p>
          )}
        </div>
      ) : (
        <div className="mt-4 flex flex-wrap gap-2">
          {(service.formType === "telecom" || service.formType === "data") && service.networks?.slice(0, 4).map((network) => (
            <span key={network} className="rounded-full bg-[#f0f4ff] px-2.5 py-1 text-xs font-semibold text-[#475569] dark:bg-[#0d1526] dark:text-[#94a3b8]">
              {network}
            </span>
          ))}
          {service.formType === "internet" && (
  <span className="rounded-full bg-[#f0f4ff] px-2.5 py-1 text-xs font-semibold text-[#475569] dark:bg-[#0d1526] dark:text-[#94a3b8]">
    Smile • Spectranet
  </span>
)}
          {service.formType === "electricity" && <span className="rounded-full bg-[#f0f4ff] px-2.5 py-1 text-xs font-semibold text-[#475569] dark:bg-[#0d1526] dark:text-[#94a3b8]">Prepaid & Postpaid</span>}
          {service.formType === "cable" && <span className="rounded-full bg-[#f0f4ff] px-2.5 py-1 text-xs font-semibold text-[#475569] dark:bg-[#0d1526] dark:text-[#94a3b8]">DSTV • GOtv • StarTimes • Showmax</span>}
        </div>
      )}

      <span className="mt-auto pt-5 text-sm font-bold text-[#10b981] group-hover:underline dark:text-[#34d399]">
        View service →
      </span>
    </Link>
  );
}

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [query, setQuery] = useState("");

  const filteredServices = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return services.filter((service) => {
      const categoryMatches = activeCategory === "all" || service.category === activeCategory;
      if (!categoryMatches) return false;
      if (!normalizedQuery) return true;

      const optionText = service.options?.map((option) => `${option.title} ${option.description}`).join(" ") ?? "";
      return `${service.title} ${service.shortDescription} ${optionText}`.toLowerCase().includes(normalizedQuery);
    });
  }, [activeCategory, query]);

  const educationServices = services.filter((service) => ["jamb", "waec", "neco", "nabteb", "nbais"].includes(service.category));

  return (
    <div className="min-h-screen bg-white dark:bg-[#0d1526]">
      <Navbar />

      <main>
        <section className="bg-gradient-to-br from-[#eff6ff] via-[#f0fdf4] to-[#eff6ff] px-4 py-14 sm:px-6 sm:py-20 lg:px-8 dark:from-[#0d1526] dark:via-[#0f2a3f] dark:to-[#0d1526]">
          <div className="mx-auto max-w-5xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#10b981] dark:text-[#34d399]">
              TEKSUM Services
            </p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-[#0f172a] sm:text-5xl dark:text-[#e8eeff]">
              Everything you need, in one place
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#475569] dark:text-[#7b8ebc]">
              Browse airtime, data, education services, electricity and TV subscriptions. Exam services are grouped clearly so customers can find the exact PIN or token they need.
            </p>

            <div className="mx-auto mt-8 max-w-xl">
              <label htmlFor="service-search" className="sr-only">Search services</label>
              <input
                id="service-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search for JAMB, WAEC, NECO, electricity..."
                className="w-full rounded-2xl border border-[#dbeafe] bg-white px-5 py-3.5 text-sm text-[#0f172a] shadow-sm outline-none transition focus:border-[#1e40af] focus:ring-4 focus:ring-[#1e40af]/10 dark:border-[#1e3a6e] dark:bg-[#152040] dark:text-[#e8eeff]"
              />
            </div>
          </div>
        </section>

        <section className="border-b border-[#dbeafe] bg-white px-4 py-5 dark:border-[#1e3a6e] dark:bg-[#0d1526]">
          <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto pb-1">
            {serviceCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                  activeCategory === category.id
                    ? "bg-[#1e40af] text-white shadow-sm dark:bg-[#3b60d4]"
                    : "border border-[#dbeafe] bg-white text-[#475569] hover:border-[#1e40af] hover:text-[#1e40af] dark:border-[#1e3a6e] dark:bg-[#152040] dark:text-[#94a3b8]"
                }`}
              >
                <span className="mr-1.5">{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {activeCategory === "all" && !query && (
              <div className="mb-10 rounded-3xl border border-[#dbeafe] bg-[#f8fafc] p-6 sm:p-8 dark:border-[#1e3a6e] dark:bg-[#101a2d]">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#10b981]">Education Services</p>
                    <h2 className="mt-2 text-2xl font-extrabold text-[#0f172a] dark:text-[#e8eeff]">Exam PINs, tokens & registration</h2>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#475569] dark:text-[#7b8ebc]">
                      JAMB, WAEC, NECO, NABTEB and NBAIS are separated into their own service pages. Where a provider has not been verified for a requested product, TEKSUM labels it instead of promising a service it cannot yet fulfil.
                    </p>
                  </div>
                  <Link href="#education" className="shrink-0 rounded-xl bg-[#1e40af] px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-[#1d3a9e] dark:bg-[#3b60d4]">
                    Browse exam services
                  </Link>
                </div>
              </div>
            )}

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredServices.map((service) => (
                <ServiceCard key={service.slug} service={service} />
              ))}
            </div>

            {filteredServices.length === 0 && (
              <div className="rounded-2xl border border-dashed border-[#cbd5e1] p-10 text-center dark:border-[#334155]">
                <p className="font-bold text-[#0f172a] dark:text-[#e8eeff]">No services found</p>
                <p className="mt-2 text-sm text-[#64748b] dark:text-[#94a3b8]">Try another search term or choose All Services.</p>
              </div>
            )}
          </div>
        </section>

        {activeCategory === "all" && !query && (
          <section id="education" className="border-t border-[#dbeafe] bg-[#f8fafc] px-4 py-14 sm:px-6 lg:px-8 dark:border-[#1e3a6e] dark:bg-[#0a1020]">
            <div className="mx-auto max-w-7xl">
              <div className="mb-8">
                <p className="text-sm font-bold uppercase tracking-widest text-[#10b981]">Education</p>
                <h2 className="mt-2 text-2xl font-extrabold text-[#0f172a] dark:text-[#e8eeff]">Exam services by body</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {educationServices.map((service) => (
                  <Link key={service.slug} href={`/services/${service.slug}`} className="rounded-2xl border border-[#dbeafe] bg-white p-5 transition hover:-translate-y-1 hover:border-[#1e40af] hover:shadow-md dark:border-[#1e3a6e] dark:bg-[#152040]">
                    {service.logo ? (
                      <div className="relative h-20 w-20 overflow-hidden rounded-2xl bg-[#f8fafc] dark:bg-[#0d1526]">
                        <Image src={service.logo} alt="" fill sizes="80px" className="object-contain p-2" />
                      </div>
                    ) : (
                      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#f0f4ff] text-3xl dark:bg-[#0d1526]">{service.icon}</div>
                    )}
                    <h3 className="mt-4 font-bold text-[#0f172a] dark:text-[#e8eeff]">{service.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-[#64748b] dark:text-[#94a3b8]">Open service</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
