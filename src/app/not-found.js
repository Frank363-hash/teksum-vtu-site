import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0d1526]">
      <Navbar />
      <main className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center px-4 text-center">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#f0f4ff] text-5xl dark:bg-[#152040]">
          🔍
        </div>
        <h1 className="text-6xl font-extrabold text-[#1e40af] dark:text-[#3b60d4]">
          404
        </h1>
        <h2 className="mt-4 text-2xl font-bold text-[#0f172a] dark:text-[#e8eeff]">
          Page not found
        </h2>
        <p className="mx-auto mt-3 max-w-md text-base text-[#475569] dark:text-[#7b8ebc]">
          The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="rounded-xl bg-[#1e40af] px-8 py-3.5 font-semibold text-white transition hover:bg-[#1d3a9e] dark:bg-[#3b60d4]"
          >
            Go to Homepage
          </Link>
          <Link
            href="/dashboard"
            className="rounded-xl border border-[#dbeafe] px-8 py-3.5 font-semibold text-[#1e40af] transition hover:border-[#1e40af] dark:border-[#1e3a6e] dark:text-[#e8eeff]"
          >
            Go to Dashboard
          </Link>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {["Buy Airtime", "Buy Data", "WAEC Pin", "NECO Token", "JAMB Pin"].map((service) => (
            <Link
              key={service}
              href={`/services/${service.toLowerCase().replace(" ", "-").replace(" ", "-")}`}
              className="rounded-full border border-[#dbeafe] bg-[#f0f4ff] px-4 py-2 text-sm font-medium text-[#1e40af] hover:border-[#1e40af] dark:border-[#1e3a6e] dark:bg-[#152040] dark:text-[#e8eeff]"
            >
              {service}
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}