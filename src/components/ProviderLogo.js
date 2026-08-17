"use client";

import { useState } from "react";

const LOCAL_LOGOS = {
  // Network providers
  mtn: "/networks/mtn-logo-png_seeklogo-95716.png",
  airtel: "/networks/airtel-seeklogo.png",
  glo: "/networks/glo-limited-logo-png_seeklogo-491131.png",
  "9mobile": "/networks/9mobile-logo-png_seeklogo-481168.png",
  etisalat: "/networks/9mobile-logo-png_seeklogo-481168.png",

  // Internet providers
  smile: "/providers/internet/smile.png",
  spectranet: "/providers/internet/spectranet.png",

  // Cable providers
  dstv: "/providers/cables/DSTV.png",
  gotv: "/providers/cables/GOTV.png",
  startimes: "/providers/cables/Startime.png",
  showmax: "/providers/cables/showmax.png",
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

  if (
    key.includes("dstv") ||
    key.includes("multichoice")
  ) {
    return "dstv";
  }

  if (
    key.includes("gotv") ||
    key.includes("go tv")
  ) {
    return "gotv";
  }

  if (
    key.includes("startimes") ||
    key.includes("star times")
  ) {
    return "startimes";
  }

  if (key.includes("showmax")) {
    return "showmax";
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
    classes = "bg-[#ffcc00] text-[#111827]";
  } else if (lower.includes("airtel")) {
    label = "A";
    classes = "bg-[#e30613] text-white";
  } else if (lower.includes("glo")) {
    label = "Glo";
    classes = "bg-[#78b82a] text-white";
  } else if (
    lower.includes("9mobile") ||
    lower.includes("etisalat")
  ) {
    label = "9";
    classes = "bg-[#006b3f] text-white";
  } else if (lower.includes("smile")) {
    label = "smile";
    classes = "bg-[#f7c948] text-[#24324a]";
  } else if (lower.includes("spectranet")) {
    label = "S";
    classes = "bg-[#1d4ed8] text-white";
  } else if (
    lower.includes("dstv") ||
    lower.includes("multichoice")
  ) {
    label = "DStv";
    classes = "bg-[#0b3b8f] text-white";
  } else if (
    lower.includes("gotv") ||
    lower.includes("go tv")
  ) {
    label = "GOtv";
    classes = "bg-[#111827] text-white";
  } else if (
    lower.includes("startimes") ||
    lower.includes("star times")
  ) {
    label = "StarTimes";
    classes = "bg-[#e11d48] text-white";
  } else if (lower.includes("showmax")) {
    label = "Showmax";
    classes = "bg-[#111827] text-white";
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
  const [imageFailed, setImageFailed] = useState(false);

  const providerKey = getProviderKey(name);

  const logoPath = providerKey
    ? LOCAL_LOGOS[providerKey]
    : null;

  if (!logoPath || imageFailed) {
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
        className="h-full w-full object-contain p-1"
        onError={() => setImageFailed(true)}
      />
    </span>
  );
}