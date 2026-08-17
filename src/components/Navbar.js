"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import {
  Sun,
  Moon,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] =
    useState(false);

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [servicesOpen, setServicesOpen] =
    useState(false);

  const dropdownRef =
    useRef(null);

  const {
    user,
    isAuthenticated,
    loading: authLoading,
    logout,
  } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setServicesOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  // Close mobile menu when viewport becomes desktop-sized
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    }

    window.addEventListener(
      "resize",
      handleResize
    );

    return () =>
      window.removeEventListener(
        "resize",
        handleResize
      );
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/#pricing", label: "Pricing" },
    { href: "/#about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const mobileServiceLinks = [
    {
      label: "Airtime",
      icon: "📱",
      href: "/services/airtime",
    },
    {
      label: "Data",
      icon: "📶",
      href: "/services/data",
    },
    {
      label: "Internet",
      icon: "🌐",
      href: "/services/internet",
    },
    {
      label: "JAMB Services",
      icon: "🎓",
      href: "/services/jamb",
    },
    {
      label: "WAEC Services",
      icon: "📄",
      href: "/services/waec-result",
    },
    {
      label: "NECO Services",
      icon: "🎫",
      href: "/services/neco-result",
    },
    {
      label: "NABTEB Services",
      icon: "📋",
      href: "/services/nabteb",
    },
    {
      label: "NBAIS Services",
      icon: "🏫",
      href: "/services/nbais",
    },
    {
      label: "Bills & TV",
      icon: "⚡",
      href: "/services/electricity",
    },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#dbeafe] bg-white dark:border-[#1e3a6e] dark:bg-[#0d1526]">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          className="flex min-w-0 shrink-0 items-center gap-2"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#1e40af]">
            <span className="text-sm font-bold text-white">
              TS
            </span>
          </div>

          <span className="truncate text-xl font-extrabold text-[#1e40af] dark:text-[#3b60d4]">
            TEKSUM
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex">

          {/* Home */}
          <Link
            href="/"
            className="text-sm font-medium text-[#0f172a] transition hover:text-[#1e40af] dark:text-[#e8eeff] dark:hover:text-[#3b60d4]"
          >
            Home
          </Link>

          {/* Services dropdown */}
          <div
            className="relative"
            ref={dropdownRef}
          >
            <button
              type="button"
              onClick={() =>
                setServicesOpen(
                  !servicesOpen
                )
              }
              className="flex items-center gap-1 text-sm font-medium text-[#0f172a] transition hover:text-[#1e40af] dark:text-[#e8eeff] dark:hover:text-[#3b60d4]"
            >
              Services

              <ChevronDown
                size={15}
                className={`transition-transform duration-200 ${
                  servicesOpen
                    ? "rotate-180"
                    : ""
                }`}
              />
            </button>

            {/* Dropdown panel */}
            {servicesOpen && (
              <div className="absolute left-0 top-full mt-2 w-56 rounded-2xl border border-[#dbeafe] bg-white p-2 shadow-xl dark:border-[#1e3a6e] dark:bg-[#152040]">
                {[
                  {
                    label: "Airtime",
                    icon: "📱",
                    href: "/services/airtime",
                  },
                  {
                    label: "Data",
                    icon: "📶",
                    href: "/services/data",
                  },
                  {
                    label: "Internet",
                    icon: "🌐",
                    href: "/services/internet",
                  },
                  {
                    label: "JAMB Services",
                    icon: "🎓",
                    href: "/services/jamb",
                  },
                  {
                    label: "WAEC Services",
                    icon: "📄",
                    href: "/services/waec-result",
                  },
                  {
                    label: "NECO Services",
                    icon: "🎫",
                    href: "/services/neco-result",
                  },
                  {
                    label: "NABTEB Services",
                    icon: "📋",
                    href: "/services/nabteb",
                  },
                  {
                    label: "NBAIS Services",
                    icon: "🏫",
                    href: "/services/nbais",
                  },
                  {
                    label: "Bills & TV",
                    icon: "⚡",
                    href: "/services/electricity",
                  },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() =>
                      setServicesOpen(false)
                    }
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[#0f172a] transition hover:bg-[#f0f4ff] hover:text-[#1e40af] dark:text-[#e8eeff] dark:hover:bg-[#0d1526] dark:hover:text-[#3b60d4]"
                  >
                    <span className="text-base">
                      {item.icon}
                    </span>

                    {item.label}
                  </Link>
                ))}

                <div className="my-1 border-t border-[#dbeafe] dark:border-[#1e3a6e]" />

                <Link
                  href="/services"
                  onClick={() =>
                    setServicesOpen(false)
                  }
                  className="flex items-center justify-center rounded-xl bg-[#f0f4ff] px-3 py-2.5 text-sm font-bold text-[#1e40af] dark:bg-[#0d1526] dark:text-[#3b60d4]"
                >
                  See all services →
                </Link>
              </div>
            )}
          </div>

          {/* Other links */}
          {navLinks
            .slice(1)
            .map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#0f172a] transition hover:text-[#1e40af] dark:text-[#e8eeff] dark:hover:text-[#3b60d4]"
              >
                {link.label}
              </Link>
            ))}
        </div>

        {/* Right side */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">

          {/* Theme toggle */}
          {mounted && (
            <button
              type="button"
              onClick={() =>
                setTheme(
                  theme === "dark"
                    ? "light"
                    : "dark"
                )
              }
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#dbeafe] bg-white text-[#1e40af] transition hover:border-[#1e40af] dark:border-[#1e3a6e] dark:bg-[#152040] dark:text-[#e8eeff]"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun size={18} />
              ) : (
                <Moon size={18} />
              )}
            </button>
          )}

          {/* Auth buttons */}
          <div className="hidden items-center gap-2 md:flex">

            {authLoading ? (
              <div className="h-9 w-24 animate-pulse rounded-xl bg-[#f0f4ff] dark:bg-[#152040]" />
            ) : isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className="rounded-xl px-4 py-2 text-sm font-semibold text-[#1e40af] transition hover:bg-[#f0f4ff] dark:text-[#e8eeff] dark:hover:bg-[#152040]"
                >
                  Dashboard
                </Link>

                <button
                  type="button"
                  onClick={async () => {
                    await logout();
                  }}
                  className="cursor-pointer rounded-xl bg-[#1e40af] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1d3a9e] dark:bg-[#3b60d4] dark:hover:bg-[#2d50c0]"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-xl px-4 py-2 text-sm font-semibold text-[#1e40af] transition hover:bg-[#f0f4ff] dark:text-[#e8eeff] dark:hover:bg-[#152040]"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="rounded-xl bg-[#1e40af] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1d3a9e] dark:bg-[#3b60d4] dark:hover:bg-[#2d50c0]"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#dbeafe] text-[#0f172a] md:hidden dark:border-[#1e3a6e] dark:text-[#e8eeff]"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <X size={18} />
            ) : (
              <Menu size={18} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="w-full overflow-x-hidden border-t border-[#dbeafe] bg-white px-4 pb-4 md:hidden dark:border-[#1e3a6e] dark:bg-[#0d1526]">
          <div className="flex min-w-0 flex-col gap-1 pt-3">

            <Link
              href="/"
              onClick={() =>
                setMenuOpen(false)
              }
              className="rounded-xl px-3 py-2.5 text-sm font-medium text-[#0f172a] hover:bg-[#f0f4ff] dark:text-[#e8eeff] dark:hover:bg-[#152040]"
            >
              Home
            </Link>

            {/* Mobile services list */}
            <p className="mt-2 px-3 text-xs font-bold uppercase tracking-widest text-[#475569] dark:text-[#7b8ebc]">
              Services
            </p>

            {mobileServiceLinks.map(
              (item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() =>
                    setMenuOpen(false)
                  }
                  className="flex min-w-0 items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[#0f172a] hover:bg-[#f0f4ff] dark:text-[#e8eeff] dark:hover:bg-[#152040]"
                >
                  <span className="shrink-0">
                    {item.icon}
                  </span>

                  <span className="min-w-0 truncate">
                    {item.label}
                  </span>
                </Link>
              )
            )}

            <Link
              href="/services"
              onClick={() =>
                setMenuOpen(false)
              }
              className="rounded-xl bg-[#f0f4ff] px-3 py-2.5 text-center text-sm font-bold text-[#1e40af] dark:bg-[#152040] dark:text-[#3b60d4]"
            >
              See all services →
            </Link>

            <hr className="my-2 border-[#dbeafe] dark:border-[#1e3a6e]" />

            <Link
              href="/#pricing"
              onClick={() =>
                setMenuOpen(false)
              }
              className="rounded-xl px-3 py-2.5 text-sm font-medium text-[#0f172a] hover:bg-[#f0f4ff] dark:text-[#e8eeff]"
            >
              Pricing
            </Link>

            <Link
              href="/#about"
              onClick={() =>
                setMenuOpen(false)
              }
              className="rounded-xl px-3 py-2.5 text-sm font-medium text-[#0f172a] hover:bg-[#f0f4ff] dark:text-[#e8eeff]"
            >
              About
            </Link>

            <Link
              href="/contact"
              onClick={() =>
                setMenuOpen(false)
              }
              className="rounded-xl px-3 py-2.5 text-sm font-medium text-[#0f172a] hover:bg-[#f0f4ff] dark:text-[#e8eeff]"
            >
              Contact
            </Link>

            <hr className="my-2 border-[#dbeafe] dark:border-[#1e3a6e]" />

            {/* Mobile authentication */}
            {authLoading ? (
              <div className="h-10 animate-pulse rounded-xl bg-[#f0f4ff] dark:bg-[#152040]" />
            ) : isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() =>
                    setMenuOpen(false)
                  }
                  className="rounded-xl px-3 py-2.5 text-sm font-semibold text-[#1e40af] dark:text-[#e8eeff]"
                >
                  Dashboard
                </Link>

                <button
                  type="button"
                  onClick={async () => {
                    setMenuOpen(false);
                    await logout();
                  }}
                  className="w-full cursor-pointer rounded-xl bg-[#1e40af] px-4 py-2.5 text-center text-sm font-semibold text-white dark:bg-[#3b60d4]"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() =>
                    setMenuOpen(false)
                  }
                  className="rounded-xl px-3 py-2.5 text-sm font-semibold text-[#1e40af] dark:text-[#e8eeff]"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  onClick={() =>
                    setMenuOpen(false)
                  }
                  className="rounded-xl bg-[#1e40af] px-4 py-2.5 text-center text-sm font-semibold text-white dark:bg-[#3b60d4]"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}