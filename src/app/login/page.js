"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";

function LoginPageContent() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const {
    login,
    isAuthenticated,
    loading,
  } = useAuth();

  const [
    email,
    setEmail,
  ] = useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [
    submitting,
    setSubmitting,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  const [
    fieldErrors,
    setFieldErrors,
  ] = useState({});

  /*
   * Preserve the page the user came from.
   *
   * Example:
   *
   * /login?redirect=/services/airtime
   */

  const redirectTo =
    searchParams.get("redirect") || "/dashboard";

  /*
   * If the user is already signed in,
   * don't leave them sitting on the login page.
   */

  useEffect(() => {
    if (
      !loading &&
      isAuthenticated
    ) {
      router.replace(
        redirectTo
      );
    }
  }, [
    loading,
    isAuthenticated,
    redirectTo,
    router,
  ]);

  function validate() {
    const errors = {};

    if (!email.trim()) {
      errors.email =
        "Enter your email address.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email.trim()
      )
    ) {
      errors.email =
        "Enter a valid email address.";
    }

    if (!password) {
      errors.password =
        "Enter your password.";
    }

    setFieldErrors(errors);

    return (
      Object.keys(errors).length === 0
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    if (!validate()) {
      return;
    }

    setSubmitting(true);

    try {
      const result = await login({
        email: email.trim(),
        password,
      });

      if (!result.success) {
        setError(
          result.message ||
            "Unable to sign in. Please try again."
        );

        setSubmitting(false);

        return;
      }

      /*
       * Login succeeded.
       *
       * The AuthContext now owns the authenticated state.
       *
       * If the user originally came from a purchase page,
       * redirectTo returns them there so the pending purchase
       * flow can continue.
       */

      router.replace(redirectTo);
    } catch (err) {
      console.error("Login error:", err);

      setError(
        "Unable to sign in. Please try again."
      );

      setSubmitting(false);
    }
  }

  if (
    loading &&
    !isAuthenticated
  ) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0d1526]">
        <Navbar />

        <main className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-16">
          <div className="text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-[#dbeafe] border-t-[#1e40af] dark:border-[#1e3a6e] dark:border-t-[#3b60d4]" />

            <p className="mt-4 text-sm text-[#64748b] dark:text-[#94a3b8]">
              Checking your session...
            </p>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0d1526]">
      <Navbar />

      <main className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-16 sm:px-6">
        <div className="w-full max-w-md">

          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1e40af]">
              <span className="text-xl font-bold text-white">
                TS
              </span>
            </div>

            <h1 className="text-2xl font-extrabold text-[#0f172a] dark:text-[#e8eeff]">
              Welcome back
            </h1>

            <p className="mt-2 text-sm text-[#475569] dark:text-[#7b8ebc]">
              Sign in to your TEKSUM account
            </p>
          </div>

          <div className="rounded-2xl border border-[#dbeafe] bg-white p-8 shadow-sm dark:border-[#1e3a6e] dark:bg-[#152040]">

            {error && (
              <div
                role="alert"
                className="mb-5 rounded-xl border border-[#fecaca] bg-[#fef2f2] px-4 py-3 text-sm leading-relaxed text-[#b91c1c] dark:border-[#7f1d1d] dark:bg-[#450a0a] dark:text-[#fca5a5]"
              >
                {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-5"
            >

              <div>
                <label
                  htmlFor="login-email"
                  className="mb-1.5 block text-sm font-medium text-[#0f172a] dark:text-[#e8eeff]"
                >
                  Email address
                </label>

                <input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(
                      event.target.value
                    );

                    if (fieldErrors.email) {
                      setFieldErrors(
                        (current) => ({
                          ...current,
                          email: "",
                        })
                      );
                    }
                  }}
                  placeholder="you@example.com"
                  disabled={submitting}
                  className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-[#0f172a] outline-none transition placeholder:text-[#94a3b8] focus:ring-2 dark:bg-[#0d1526] dark:text-[#e8eeff] dark:placeholder:text-[#475569] ${
                    fieldErrors.email
                      ? "border-[#ef4444] focus:border-[#ef4444] focus:ring-[#fecaca]"
                      : "border-[#dbeafe] focus:border-[#1e40af] focus:ring-[#1e40af]/20 dark:border-[#1e3a6e]"
                  }`}
                />

                {fieldErrors.email && (
                  <p className="mt-1.5 text-xs text-[#dc2626]">
                    {fieldErrors.email}
                  </p>
                )}
              </div>

              <div>
                <div className="mb-1.5 flex items-center justify-between gap-3">
                  <label
                    htmlFor="login-password"
                    className="text-sm font-medium text-[#0f172a] dark:text-[#e8eeff]"
                  >
                    Password
                  </label>

                  <Link
                    href="/forgot-password"
                    className="text-xs font-semibold text-[#1e40af] hover:underline dark:text-[#3b60d4]"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <input
                    id="login-password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => {
                      setPassword(
                        event.target.value
                      );

                      if (fieldErrors.password) {
                        setFieldErrors(
                          (current) => ({
                            ...current,
                            password: "",
                          })
                        );
                      }
                    }}
                    placeholder="••••••••"
                    disabled={submitting}
                    className={`w-full rounded-xl border bg-white px-4 py-3 pr-20 text-sm text-[#0f172a] outline-none transition placeholder:text-[#94a3b8] focus:ring-2 dark:bg-[#0d1526] dark:text-[#e8eeff] dark:placeholder:text-[#475569] ${
                      fieldErrors.password
                        ? "border-[#ef4444] focus:border-[#ef4444] focus:ring-[#fecaca]"
                        : "border-[#dbeafe] focus:border-[#1e40af] focus:ring-[#1e40af]/20 dark:border-[#1e3a6e]"
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (value) => !value
                      )
                    }
                    disabled={submitting}
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-xs font-semibold text-[#1e40af] hover:underline dark:text-[#3b60d4]"
                  >
                    {showPassword
                      ? "Hide"
                      : "Show"}
                  </button>
                </div>

                {fieldErrors.password && (
                  <p className="mt-1.5 text-xs text-[#dc2626]">
                    {fieldErrors.password}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#1e40af] py-3.5 text-sm font-semibold text-white transition hover:bg-[#1d3a9e] disabled:cursor-not-allowed disabled:opacity-70 dark:bg-[#3b60d4] dark:hover:bg-[#2d50c0]"
              >
                {submitting && (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                )}

                {submitting
                  ? "Signing in..."
                  : "Sign in"}
              </button>
            </form>

            <div className="my-6 flex items-center gap-3">
              <hr className="flex-1 border-[#dbeafe] dark:border-[#1e3a6e]" />

              <span className="text-xs text-[#475569] dark:text-[#7b8ebc]">
                or
              </span>

              <hr className="flex-1 border-[#dbeafe] dark:border-[#1e3a6e]" />
            </div>

            <p className="text-center text-sm text-[#475569] dark:text-[#7b8ebc]">
              Don't have an account?{" "}
              <Link
                href={`/register?redirect=${encodeURIComponent(
                  redirectTo
                )}`}
                className="font-semibold text-[#1e40af] hover:underline dark:text-[#3b60d4]"
              >
                Create one free
              </Link>
            </p>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

/*
 * IMPORTANT:
 *
 * Next.js requires a Suspense boundary around components
 * that use useSearchParams() when the page is prerendered.
 *
 * This fixes the Vercel build error:
 *
 * "useSearchParams() should be wrapped in a suspense boundary"
 */

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white dark:bg-[#0d1526]">
          <Navbar />

          <main className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-16">
            <div className="text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-[#dbeafe] border-t-[#1e40af] dark:border-[#1e3a6e] dark:border-t-[#3b60d4]" />

              <p className="mt-4 text-sm text-[#64748b] dark:text-[#94a3b8]">
                Loading sign in...
              </p>
            </div>
          </main>

          <Footer />
        </div>
      }
    >
      <LoginPageContent />
    </Suspense>
  );
}