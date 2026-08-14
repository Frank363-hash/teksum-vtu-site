export default function ProviderLogo({ name, compact = false }) {
  const key = name.toLowerCase();
  const base = compact ? "h-9 w-9 text-[10px]" : "h-11 w-11 text-xs";

  if (key.includes("mtn")) {
    return (
      <span
        className={`${base} flex shrink-0 items-center justify-center rounded-xl bg-[#ffcc00] font-black text-[#111827]`}
      >
        MTN
      </span>
    );
  }

  if (key.includes("airtel")) {
    return (
      <span
        className={`${base} flex shrink-0 items-center justify-center rounded-xl bg-[#e30613] font-black text-white`}
      >
        A
      </span>
    );
  }

  if (key.includes("glo")) {
    return (
      <span
        className={`${base} flex shrink-0 items-center justify-center rounded-xl bg-[#78b82a] font-black text-white`}
      >
        Glo
      </span>
    );
  }

  if (key.includes("9mobile") || key.includes("etisalat")) {
    return (
      <span
        className={`${base} flex shrink-0 items-center justify-center rounded-xl bg-[#006b3f] font-black text-white`}
      >
        9
      </span>
    );
  }

  if (key.includes("smile")) {
    return (
      <span
        className={`${base} flex shrink-0 items-center justify-center rounded-xl bg-[#f7c948] font-black text-[#24324a]`}
      >
        smile
      </span>
    );
  }

  if (key.includes("spectranet")) {
    return (
      <span
        className={`${base} flex shrink-0 items-center justify-center rounded-xl bg-[#1d4ed8] font-black text-white`}
      >
        S
      </span>
    );
  }

  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <span
      className={`${base} flex shrink-0 items-center justify-center rounded-xl bg-[#f0f4ff] font-black text-[#1e40af] dark:bg-[#0d1526] dark:text-[#3b60d4]`}
    >
      {initials}
    </span>
  );
}