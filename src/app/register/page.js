"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const router =
    useRouter();

  const searchParams =
    useSearchParams();

  const {
    register,
    isAuthenticated,
    loading,
  } = useAuth();

  const [
    name,
    setName,
  ] = useState("");

  const [
    email,
    setEmail,
  ] = useState("");

  const [
    phone,
    setPhone,
  ] = useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [
    termsAccepted,
    setTermsAccepted,
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

  const redirectTo =
    searchParams.get(
      "redirect"
    ) || "/dashboard";

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

    if (!name.trim()) {
      errors.name =
        "Enter your full name.";
    }

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

    const normalizedPhone =
      phone.replace(/\D/g, "");

    if (!normalizedPhone) {
      errors.phone =
        "Enter your phone number.";
    } else if (
      normalizedPhone.length !==
        11 &&
      normalizedPhone.length !==
        13
    ) {
      errors.phone =
        "Enter a valid Nigerian phone number.";
    }

    if (!password) {
      errors.password =
        "Create a password.";
    } else if (
      password.length < 8
    ) {
      errors.password =
        "Password must be at least 8 characters.";
    }

    if (
      password !==
      confirmPassword
    ) {
      errors.confirmPassword =
        "Passwords do not match.";
    }

    if (!termsAccepted) {
      errors.terms =
        "You must accept the Terms of Service and Privacy Policy.";
    }

    setFieldErrors(
      errors
    );

    return (
      Object.keys(errors)
        .length === 0
    );
  }

  async function handleSubmit(
    event
  ) {
    event.preventDefault();

    setError("");

    if (!validate()) {
      return;
    }

    setSubmitting(true);

    const normalizedPhone =
      phone.replace(/\D/g, "");

    const result =
      await register({
        name,
        email,
        phone:
          normalizedPhone,
        password,
      });

    if (!result.success) {
      setError(
        result.message ||
          "Unable to create your account. Please try again."
      );

      setSubmitting(false);

      return;
    }

    /*
     * If the backend requires email verification,
     * it can return a verification-required flag.
     */

    const verificationRequired =
      result.data
        ?.requiresEmailVerification ||
      result.data
        ?.emailVerificationRequired;

    if (
      verificationRequired
    ) {
      router.replace(
        `/login?registered=true&redirect=${encodeURIComponent(
          redirectTo
        )}`
      );

      return;
    }

    router.replace(
      redirectTo
    );
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
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-[#dbeafe] border-t-[#10b981] dark:border-[#1e3a6e] dark:border-t-[#34d399]" />

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

            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#10b981]">
              <span className="text-xl font-bold text-white">
                TS
              </span>
            </div>

            <h1 className="text-2xl font-extrabold text-[#0f172a] dark:text-[#e8eeff]">
              Create your account
            </h1>

            <p className="mt-2 text-sm text-[#475569] dark:text-[#7b8ebc]">
              Join TEKSUM and start buying services instantly
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
              onSubmit={
                handleSubmit
              }
              noValidate
              className="space-y-5"
            >

              <div>
                <label
                  htmlFor="register-name"
                  className="mb-1.5 block text-sm font-medium text-[#0f172a] dark:text-[#e8eeff]"
                >
                  Full name
                </label>

                <input
                  id="register-name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(event) =>
                    setName(
                      event.target
                        .value
                    )
                  }
                  placeholder="John Doe"
                  disabled={
                    submitting
                  }
                  className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-[#0f172a] outline-none transition placeholder:text-[#94a3b8] focus:ring-2 dark:bg-[#0d1526] dark:text-[#e8eeff] dark:placeholder:text-[#475569] ${
                    fieldErrors.name
                      ? "border-[#ef4444]"
                      : "border-[#dbeafe] focus:border-[#1e40af] focus:ring-[#1e40af]/20 dark:border-[#1e3a6e]"
                  }`}
                />

                {fieldErrors.name && (
                  <p className="mt-1.5 text-xs text-[#dc2626]">
                    {
                      fieldErrors.name
                    }
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="register-email"
                  className="mb-1.5 block text-sm font-medium text-[#0f172a] dark:text-[#e8eeff]"
                >
                  Email address
                </label>

                <input
                  id="register-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(
                      event.target
                        .value
                    )
                  }
                  placeholder="you@example.com"
                  disabled={
                    submitting
                  }
                  className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-[#0f172a] outline-none transition placeholder:text-[#94a3b8] focus:ring-2 dark:bg-[#0d1526] dark:text-[#e8eeff] dark:placeholder:text-[#475569] ${
                    fieldErrors.email
                      ? "border-[#ef4444]"
                      : "border-[#dbeafe] focus:border-[#1e40af] focus:ring-[#1e40af]/20 dark:border-[#1e3a6e]"
                  }`}
                />

                {fieldErrors.email && (
                  <p className="mt-1.5 text-xs text-[#dc2626]">
                    {
                      fieldErrors.email
                    }
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="register-phone"
                  className="mb-1.5 block text-sm font-medium text-[#0f172a] dark:text-[#e8eeff]"
                >
                  Phone number
                </label>

                <input
                  id="register-phone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  value={phone}
                  onChange={(event) =>
                    setPhone(
                      event.target
                        .value
                        .replace(
                          /[^\d+]/g,
                          ""
                        )
                        .slice(
                          0,
                          13
                        )
                    )
                  }
                  placeholder="08012345678"
                  disabled={
                    submitting
                  }
                  className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-[#0f172a] outline-none transition placeholder:text-[#94a3b8] focus:ring-2 dark:bg-[#0d1526] dark:text-[#e8eeff] dark:placeholder:text-[#475569] ${
                    fieldErrors.phone
                      ? "border-[#ef4444]"
                      : "border-[#dbeafe] focus:border-[#1e40af] focus:ring-[#1e40af]/20 dark:border-[#1e3a6e]"
                  }`}
                />

                {fieldErrors.phone && (
                  <p className="mt-1.5 text-xs text-[#dc2626]">
                    {
                      fieldErrors.phone
                    }
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="register-password"
                  className="mb-1.5 block text-sm font-medium text-[#0f172a] dark:text-[#e8eeff]"
                >
                  Password
                </label>

                <div className="relative">

                  <input
                    id="register-password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    autoComplete="new-password"
                    value={
                      password
                    }
                    onChange={(event) =>
                      setPassword(
                        event.target
                          .value
                      )
                    }
                    placeholder="Min. 8 characters"
                    disabled={
                      submitting
                    }
                    className={`w-full rounded-xl border bg-white px-4 py-3 pr-20 text-sm text-[#0f172a] outline-none transition placeholder:text-[#94a3b8] focus:ring-2 dark:bg-[#0d1526] dark:text-[#e8eeff] dark:placeholder:text-[#475569] ${
                      fieldErrors.password
                        ? "border-[#ef4444]"
                        : "border-[#dbeafe] focus:border-[#1e40af] focus:ring-[#1e40af]/20 dark:border-[#1e3a6e]"
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (value) =>
                          !value
                      )
                    }
                    disabled={
                      submitting
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-xs font-semibold text-[#1e40af] hover:underline dark:text-[#3b60d4]"
                  >
                    {showPassword
                      ? "Hide"
                      : "Show"}
                  </button>

                </div>

                {fieldErrors.password && (
                  <p className="mt-1.5 text-xs text-[#dc2626]">
                    {
                      fieldErrors.password
                    }
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="register-confirm-password"
                  className="mb-1.5 block text-sm font-medium text-[#0f172a] dark:text-[#e8eeff]"
                >
                  Confirm password
                </label>

                <div className="relative">

                  <input
                    id="register-confirm-password"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    autoComplete="new-password"
                    value={
                      confirmPassword
                    }
                    onChange={(event) =>
                      setConfirmPassword(
                        event.target
                          .value
                      )
                    }
                    placeholder="Repeat your password"
                    disabled={
                      submitting
                    }
                    className={`w-full rounded-xl border bg-white px-4 py-3 pr-20 text-sm text-[#0f172a] outline-none transition placeholder:text-[#94a3b8] focus:ring-2 dark:bg-[#0d1526] dark:text-[#e8eeff] dark:placeholder:text-[#475569] ${
                      fieldErrors.confirmPassword
                        ? "border-[#ef4444]"
                        : "border-[#dbeafe] focus:border-[#1e40af] focus:ring-[#1e40af]/20 dark:border-[#1e3a6e]"
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        (value) =>
                          !value
                      )
                    }
                    disabled={
                      submitting
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-xs font-semibold text-[#1e40af] hover:underline dark:text-[#3b60d4]"
                  >
                    {showConfirmPassword
                      ? "Hide"
                      : "Show"}
                  </button>

                </div>

                {fieldErrors.confirmPassword && (
                  <p className="mt-1.5 text-xs text-[#dc2626]">
                    {
                      fieldErrors.confirmPassword
                    }
                  </p>
                )}
              </div>

              <div>
                <div className="flex items-start gap-3">

                  <input
                    type="checkbox"
                    id="terms"
                    checked={
                      termsAccepted
                    }
                    onChange={(event) =>
                      setTermsAccepted(
                        event.target
                          .checked
                      )
                    }
                    disabled={
                      submitting
                    }
                    className="mt-0.5 h-4 w-4 rounded border-[#dbeafe] accent-[#1e40af]"
                  />

                  <label
                    htmlFor="terms"
                    className="text-sm leading-relaxed text-[#475569] dark:text-[#7b8ebc]"
                  >
                    I agree to TEKSUM's{" "}
                    <Link
                      href="/terms"
                      className="font-semibold text-[#1e40af] hover:underline dark:text-[#3b60d4]"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="font-semibold text-[#1e40af] hover:underline dark:text-[#3b60d4]"
                    >
                      Privacy Policy
                    </Link>
                  </label>

                </div>

                {fieldErrors.terms && (
                  <p className="mt-1.5 text-xs text-[#dc2626]">
                    {
                      fieldErrors.terms
                    }
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={
                  submitting
                }
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#10b981] py-3.5 text-sm font-semibold text-white transition hover:bg-[#059669] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting && (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                )}

                {submitting
                  ? "Creating account..."
                  : "Create free account"}
              </button>

            </form>

            <p className="mt-6 text-center text-sm text-[#475569] dark:text-[#7b8ebc]">
              Already have an account?{" "}
              <Link
                href={`/login?redirect=${encodeURIComponent(
                  redirectTo
                )}`}
                className="font-semibold text-[#1e40af] hover:underline dark:text-[#3b60d4]"
              >
                Sign in
              </Link>
            </p>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}