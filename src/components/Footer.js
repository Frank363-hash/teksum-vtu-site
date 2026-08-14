import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#dbeafe] bg-white dark:border-[#1e3a6e] dark:bg-[#0d1526]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1e40af]">
                <span className="text-sm font-bold text-white">TS</span>
              </div>
              <span className="text-xl font-extrabold text-[#1e40af] dark:text-[#3b60d4]">
                Teksum
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[#475569] dark:text-[#7b8ebc]">
              Nigeria's fastest wallet-powered VTU platform. Buy airtime, data, exam pins and more instantly.
            </p>
          </div>

          {/* Services */}
<div>
  <h3 className="text-sm font-bold uppercase tracking-widest text-[#0f172a] dark:text-[#e8eeff]">
    Services
  </h3>
  <ul className="mt-4 space-y-2">
            {[
              { label: "All Services", href: "/services" },
              { label: "Buy Airtime", href: "/services/airtime" },
              { label: "Buy Data", href: "/services/data" },
              { label: "JAMB Services", href: "/services/jamb" },
              { label: "WAEC Services", href: "/services/waec-result" },
              { label: "NECO Services", href: "/services/neco-result" },
              { label: "NABTEB Services", href: "/services/nabteb" },
              { label: "NBAIS Services", href: "/services/nbais" },
              { label: "Electricity", href: "/services/electricity" },
              { label: "Cable TV", href: "/services/cable" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-[#475569] transition hover:text-[#1e40af] dark:text-[#7b8ebc] dark:hover:text-[#3b60d4]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
</div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#0f172a] dark:text-[#e8eeff]">
              Company
            </h3>
            <ul className="mt-4 space-y-2">
              {[
                { label: "About Us", href: "/#about" },
                { label: "Pricing", href: "/#pricing" },
                { label: "Contact", href: "/contact" },
                { label: "Register", href: "/register" },
                { label: "Login", href: "/login" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[#475569] transition hover:text-[#1e40af] dark:text-[#7b8ebc] dark:hover:text-[#3b60d4]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#0f172a] dark:text-[#e8eeff]">
              Contact
            </h3>
            <ul className="mt-4 space-y-2">
              <li className="text-sm text-[#475569] dark:text-[#7b8ebc]">
                support@TEKSUM.com.ng
              </li>
              <li className="text-sm text-[#475569] dark:text-[#7b8ebc]">
                WhatsApp: +234 800 000 0000
              </li>
              <li className="text-sm text-[#475569] dark:text-[#7b8ebc]">
                Mon – Sat: 8am – 10pm
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-[#dbeafe] pt-6 sm:flex-row dark:border-[#1e3a6e]">
          <p className="text-xs text-[#475569] dark:text-[#7b8ebc]">
            © 2026 TEKSUM. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-xs text-[#475569] hover:text-[#1e40af] dark:text-[#7b8ebc]">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-[#475569] hover:text-[#1e40af] dark:text-[#7b8ebc]">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}