"use client";

import { useState } from "react";

const LOCAL_LOGOS = {
  mtn: "/providers/mtn.svg",
  airtel: "/providers/airtel.svg",
  glo: "/providers/glo.svg",
  "9mobile": "/providers/9mobile.svg",
  etisalat: "/providers/9mobile.svg",
  smile: "/providers/smile.svg",
  spectranet: "/providers/spectranet.svg",
};

function getProviderKey(name) {
  const key = String(name || "")
    .trim()
    .toLowerCase();

  if (key.includes("mtn")) {
    return "mtn";
  }

  if (key.includes("airtel")) {
    return "airtel";
  }

  if (key.includes("glo")) {
    return "glo";
  }

  if (
    key.includes("9mobile") ||
    key.includes("etisalat")
  ) {
    return "9mobile";
  }

  if (key.includes("smile")) {
    return "smile";
  }

  if (key.includes("spectranet")) {
    return "spectranet";
  }

  return null;
}

function FallbackLogo({
  name,
  compact,
}) {
  const key = String(name || "");
  const lower = key.toLowerCase();

  const base = compact
    ? "h-9 w-9 text-[10px]"
    : "h-11 w-11 text-xs";

  let label = key
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  let classes =
    "bg-[#f0f4ff] text-[#1e40af] dark:bg-[#0d1526] dark:text-[#3b60d4]";

  if (lower.includes("mtn")) {
    label = "MTN";
    classes =
      "bg-[#ffcc00] text-[#111827]";
  } else if (
    lower.includes("airtel")
  ) {
    label = "A";
    classes =
      "bg-[#e30613] text-white";
  } else if (
    lower.includes("glo")
  ) {
    label = "Glo";
    classes =
      "bg-[#78b82a] text-white";
  } else if (
    lower.includes("9mobile") ||
    lower.includes("etisalat")
  ) {
    label = "9";
    classes =
      "bg-[#006b3f] text-white";
  } else if (
    lower.includes("smile")
  ) {
    label = "smile";
    classes =
      "bg-[#f7c948] text-[#24324a]";
  } else if (
    lower.includes("spectranet")
  ) {
    label = "S";
    classes =
      "bg-[#1d4ed8] text-white";
  }

  return (
    <span
      aria-hidden="true"
      className={`${base} flex shrink-0 items-center justify-center rounded-xl font-black ${classes}`}
    >
      {label || "?"}
    </span>
  );
}

export default function ProviderLogo({
  name,
  compact = false,
}) {
  const [
    imageFailed,
    setImageFailed,
  ] = useState(false);

  const providerKey =
    getProviderKey(name);

  const logoPath =
    providerKey
      ? LOCAL_LOGOS[
          providerKey
        ]
      : null;

  if (
    !logoPath ||
    imageFailed
  ) {
    return (
      <FallbackLogo
        name={name}
        compact={compact}
      />
    );
  }

  const size = compact
    ? "h-9 w-9"
    : "h-11 w-11";

  return (
    <span
      className={`${size} flex shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white dark:bg-[#0d1526]`}
    >
      <img
        src={logoPath}
        alt={`${name} logo`}
        className="h-full w-full object-contain"
        onError={() =>
          setImageFailed(true)
        }
      />
    </span>
  );
}