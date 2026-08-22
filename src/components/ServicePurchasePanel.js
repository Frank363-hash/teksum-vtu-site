"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import ProviderLogo from "@/components/ProviderLogo";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "";

/*
 * ============================================================
 * TEMPORARY DATA PLAN PREVIEW
 * ============================================================
 *
 * These are UI preview values only.
 *
 * They MUST be replaced by live provider plans/prices when
 * backend integration begins.
 */
const DATA_PLAN_PREVIEW = [
  {
    id: "preview-1gb-30",
    name: "1GB",
    validity: "30 Days",
    price: "₦350",
  },
  {
    id: "preview-2gb-30",
    name: "2GB",
    validity: "30 Days",
    price: "₦700",
  },
  {
    id: "preview-3gb-30",
    name: "3GB",
    validity: "30 Days",
    price: "₦1,000",
  },
  {
    id: "preview-5gb-30",
    name: "5GB",
    validity: "30 Days",
    price: "₦1,500",
  },
  {
    id: "preview-10gb-30",
    name: "10GB",
    validity: "30 Days",
    price: "₦2,800",
  },
  {
    id: "preview-20gb-30",
    name: "20GB",
    validity: "30 Days",
    price: "₦5,000",
  },
];

/*
 * ============================================================
 * EDUCATION QUANTITY RULES
 * ============================================================
 *
 * JAMB:
 * One PIN is associated with one candidate, so the UI allows
 * multiple candidate quantities.
 *
 * Bulk PIN / TOKEN:
 * Bulk ordering is prepared for scratch-card/token services.
 *
 * IMPORTANT:
 * Actual provider quantity limits must be confirmed by the
 * backend/provider before production purchase.
 */
const EDUCATION_DEFAULT_MIN = 1;
const EDUCATION_DEFAULT_MAX = 1;

/*
 * Bulk quantity is controlled by service.bulkPurchase in
 * src/lib/services.js. This prevents the purchase panel from
 * exposing bulk ordering for services that do not support it.
 *
 * Example:
 *   bulkPurchase: { enabled: true, min: 2, max: 10 }
 *
 * If a service has no bulkPurchase configuration, the standard
 * education quantity is exactly 1.
 */

/*
 * ============================================================
 * COMMON STYLES
 * ============================================================
 */

const inputClass =
  "w-full rounded-xl border border-[#dbeafe] bg-white px-4 py-3 text-sm text-[#0f172a] outline-none transition placeholder:text-[#94a3b8] focus:border-[#1e40af] focus:ring-2 focus:ring-[#1e40af]/15 dark:border-[#1e3a6e] dark:bg-[#0d1526] dark:text-[#e8eeff]";

const choiceClass = (active, disabled = false) =>
  `group rounded-2xl border p-3 text-left transition-all duration-200 ${
    disabled
      ? "cursor-not-allowed opacity-50"
      : "cursor-pointer hover:-translate-y-0.5 hover:border-[#1e40af] hover:shadow-sm"
  } ${
    active
      ? "border-[#1e40af] bg-[#f0f4ff] shadow-sm ring-2 ring-[#1e40af]/10 dark:border-[#3b60d4] dark:bg-[#101a2d]"
      : "border-[#dbeafe] bg-white dark:border-[#1e3a6e] dark:bg-[#152040]"
  }`;

/*
 * ============================================================
 * HELPERS
 * ============================================================
 */

function parseCurrency(value) {
  if (typeof value === "number") return value;

  if (!value) return null;

  const numeric = Number(
    String(value).replace(/[^\d.]/g, "")
  );

  return Number.isFinite(numeric)
    ? numeric
    : null;
}

function formatNaira(value) {
  if (
    value === null ||
    value === undefined ||
    !Number.isFinite(value)
  ) {
    return "—";
  }

  return `₦${value.toLocaleString("en-NG")}`;
}

/*
 * International-airtime provider helpers.
 *
 * The backend discovery endpoints return provider objects rather than
 * requiring the frontend to hard-code countries, product types, operators,
 * or denominations. These helpers accept the common field names used by
 * provider responses while keeping the rest of the component simple.
 */
function getInternationalItemValue(item, type) {
  if (!item) return "";

  if (type === "country") {
    return String(
      item.countryCode ??
        item.country_code ??
        item.code ??
        item.id ??
        item.value ??
        item.name ??
        ""
    );
  }

  if (type === "productType") {
    return String(
      item.productTypeId ??
        item.product_type_id ??
        item.id ??
        item.code ??
        item.value ??
        item.name ??
        ""
    );
  }

  if (type === "operator") {
    return String(
      item.operatorId ??
        item.operator_id ??
        item.id ??
        item.code ??
        item.value ??
        item.name ??
        ""
    );
  }

  return String(
    item.variation_code ??
      item.variationCode ??
      item.variationId ??
      item.id ??
      item.code ??
      item.value ??
      item.name ??
      ""
  );
}

function getInternationalItemLabel(item, type) {
  if (!item) return "";

  if (type === "country") {
    return (
      item.name ??
      item.label ??
      item.countryName ??
      item.country_name ??
      getInternationalItemValue(item, type)
    );
  }

  if (type === "productType") {
    return (
      item.name ??
      item.label ??
      item.productTypeName ??
      item.product_type_name ??
      getInternationalItemValue(item, type)
    );
  }

  if (type === "operator") {
    return (
      item.name ??
      item.label ??
      item.operatorName ??
      item.operator_name ??
      getInternationalItemValue(item, type)
    );
  }

  return (
    item.name ??
    item.label ??
    item.variation_name ??
    item.variationName ??
    item.amount ??
    item.price ??
    getInternationalItemValue(item, type)
  );
}

/*
 * ============================================================
 * SECTION LABEL
 * ============================================================
 */

function SectionLabel({ eyebrow, title, hint }) {
  return (
    <div className="mb-3">
      {eyebrow && (
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#10b981] dark:text-[#34d399]">
          {eyebrow}
        </p>
      )}

      <div className="mt-1 flex items-center justify-between gap-3">
        <h3 className="text-sm font-bold text-[#0f172a] dark:text-[#e8eeff]">
          {title}
        </h3>

        {hint && (
          <span className="text-[11px] text-[#64748b] dark:text-[#94a3b8]">
            {hint}
          </span>
        )}
      </div>
    </div>
  );
}

/*
 * ============================================================
 * NETWORK CARD
 * ============================================================
 */

function NetworkChoice({
  network,
  selected,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={choiceClass(selected)}
      aria-pressed={selected}
    >
      <div className="flex items-center gap-3">
        <ProviderLogo name={network} />

        <div className="min-w-0">
          <p className="text-sm font-bold text-[#0f172a] dark:text-[#e8eeff]">
            {network}
          </p>

          <p className="mt-0.5 text-[11px] text-[#64748b] dark:text-[#94a3b8]">
            {network === "9mobile"
              ? "9mobile"
              : `${network} Nigeria`}
          </p>
        </div>

        <span
          className={`ml-auto flex h-5 w-5 items-center justify-center rounded-full border text-[10px] font-black ${
            selected
              ? "border-[#1e40af] bg-[#1e40af] text-white dark:border-[#3b60d4] dark:bg-[#3b60d4]"
              : "border-[#cbd5e1] text-transparent dark:border-[#475569]"
          }`}
        >
          ✓
        </span>
      </div>
    </button>
  );
}

/*
 * ============================================================
 * DATA TYPE CARD
 * ============================================================
 */

function DataTypeCard({
  item,
  selected,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={choiceClass(selected)}
      aria-pressed={selected}
    >
      <div className="flex items-start gap-3">
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-black ${
            selected
              ? "bg-[#1e40af] text-white dark:bg-[#3b60d4]"
              : "bg-[#f0f4ff] text-[#1e40af] dark:bg-[#0d1526] dark:text-[#7b8ebc]"
          }`}
        >
          {selected ? "✓" : "D"}
        </span>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-[#0f172a] dark:text-[#e8eeff]">
            {item.label}
          </p>

          <p className="mt-1 text-[11px] leading-relaxed text-[#64748b] dark:text-[#94a3b8]">
            {item.description}
          </p>
        </div>
      </div>
    </button>
  );
}

/*
 * ============================================================
 * DATA PLAN CARD
 * ============================================================
 */

function DataPlanCard({
  plan,
  selected,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`group cursor-pointer rounded-2xl border p-4 text-left transition-all duration-200 ${
        selected
          ? "border-[#1e40af] bg-[#f0f4ff] shadow-sm ring-2 ring-[#1e40af]/10 dark:border-[#3b60d4] dark:bg-[#101a2d]"
          : "border-[#dbeafe] bg-white hover:-translate-y-0.5 hover:border-[#1e40af] hover:shadow-sm dark:border-[#1e3a6e] dark:bg-[#152040]"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-base font-extrabold text-[#0f172a] dark:text-[#e8eeff]">
            {plan.name}
          </p>

          <p className="mt-1 text-[11px] text-[#64748b] dark:text-[#94a3b8]">
            Valid for {plan.validity}
          </p>
        </div>

        <span
          className={`flex h-6 w-6 items-center justify-center rounded-full border text-[11px] font-black ${
            selected
              ? "border-[#1e40af] bg-[#1e40af] text-white dark:border-[#3b60d4] dark:bg-[#3b60d4]"
              : "border-[#cbd5e1] text-transparent dark:border-[#475569]"
          }`}
        >
          ✓
        </span>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wide text-[#64748b] dark:text-[#94a3b8]">
            Price
          </p>

          <p className="mt-0.5 text-lg font-extrabold text-[#1e40af] dark:text-[#3b60d4]">
            {plan.price}
          </p>
        </div>

        <span className="text-[11px] font-bold text-[#64748b] dark:text-[#94a3b8]">
          {selected ? "Selected" : "Select"}
        </span>
      </div>
    </button>
  );
}

/*
 * ============================================================
 * QUANTITY CONTROL
 * ============================================================
 */

function QuantityControl({
  value,
  min,
  max,
  onChange,
  label,
  helper,
}) {
  return (
    <div>
      <div className="mb-3 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-[#0f172a] dark:text-[#e8eeff]">
            {label}
          </p>

          {helper && (
            <p className="mt-1 text-[11px] leading-relaxed text-[#64748b] dark:text-[#94a3b8]">
              {helper}
            </p>
          )}
        </div>

        <span className="text-[11px] text-[#64748b] dark:text-[#94a3b8]">
          {min}–{max}
        </span>
      </div>

      <div className="flex items-center justify-between rounded-2xl border border-[#dbeafe] bg-white p-2 dark:border-[#1e3a6e] dark:bg-[#152040]">
        <button
          type="button"
          disabled={value <= min}
          onClick={() =>
            onChange(
              Math.max(min, value - 1)
            )
          }
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl bg-[#f0f4ff] text-xl font-semibold text-[#1e40af] transition hover:bg-[#e0e7ff] disabled:cursor-not-allowed disabled:opacity-40 dark:bg-[#0d1526] dark:text-[#7b8ebc]"
          aria-label="Decrease quantity"
        >
          −
        </button>

        <div className="text-center">
          <p className="text-xl font-extrabold text-[#0f172a] dark:text-[#e8eeff]">
            {value}
          </p>

          <p className="text-[10px] text-[#64748b] dark:text-[#94a3b8]">
            {label.toLowerCase()}
          </p>
        </div>

        <button
          type="button"
          disabled={value >= max}
          onClick={() =>
            onChange(
              Math.min(max, value + 1)
            )
          }
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl bg-[#1e40af] text-xl font-semibold text-white transition hover:bg-[#1d3a9e] disabled:cursor-not-allowed disabled:opacity-40 dark:bg-[#3b60d4]"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
    </div>
  );
}

/*
 * ============================================================
 * BULK TOGGLE
 * ============================================================
 */

function BulkToggle({
  enabled,
  onChange,
  label = "Bulk order",
  helper = "Purchase multiple PINs or tokens in one order.",
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      className={`w-full rounded-2xl border p-4 text-left transition ${
        enabled
          ? "border-[#1e40af] bg-[#f0f4ff] dark:border-[#3b60d4] dark:bg-[#101a2d]"
          : "border-[#dbeafe] bg-white dark:border-[#1e3a6e] dark:bg-[#152040]"
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-[#0f172a] dark:text-[#e8eeff]">
            {label}
          </p>

          <p className="mt-1 text-[11px] leading-relaxed text-[#64748b] dark:text-[#94a3b8]">
            {helper}
          </p>
        </div>

        <span
          className={`relative h-6 w-11 shrink-0 rounded-full transition ${
            enabled
              ? "bg-[#1e40af] dark:bg-[#3b60d4]"
              : "bg-[#cbd5e1] dark:bg-[#334155]"
          }`}
        >
          <span
            className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
              enabled
                ? "left-6"
                : "left-1"
            }`}
          />
        </span>
      </div>
    </button>
  );
}

/*
 * ============================================================
 * REVIEW ROW
 * ============================================================
 */

function ReviewRow({
  label,
  value,
  highlight = false,
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5">
      <span className="text-xs text-[#64748b] dark:text-[#94a3b8]">
        {label}
      </span>

      <span
        className={`text-right text-xs font-bold ${
          highlight
            ? "text-[#1e40af] dark:text-[#3b60d4]"
            : "text-[#0f172a] dark:text-[#e8eeff]"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

/*
 * ============================================================
 * MAIN COMPONENT
 * ============================================================
 */

export default function ServicePurchasePanel({
  service,
  isAuthenticated = false,
  accessToken = null,
}) {
  const isAirtime =
    service.formType === "telecom" &&
    service.slug === "airtime";

  const isInternationalAirtime =
    service.formType === "international-airtime" ||
    service.formType === "international" ||
    service.slug === "international-airtime";

  const isData =
    service.formType === "data";

  const isExam =
    service.formType === "exam";

  const isInternet =
    service.formType === "internet";

  const isElectricity =
    service.formType === "electricity";

  const isCable =
    service.formType === "cable";

  const hasOptions =
    Array.isArray(service.options) &&
    service.options.length > 0;

  /*
   * ==========================================================
   * STATE
   * ==========================================================
   */

  const [network, setNetwork] =
    useState("");

  const [dataType, setDataType] =
    useState("");

  const [selectedPlan, setSelectedPlan] =
    useState("");

  const [provider, setProvider] =
    useState("");

  const [option, setOption] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [customAmount, setCustomAmount] =
    useState("");

  const [account, setAccount] =
    useState("");

  const [meterType, setMeterType] =
    useState("");

  /*
   * International airtime state
   *
   * These fields are intentionally kept separate from Nigerian
   * airtime. The backend/provider can later supply the country,
   * product type, operator and denomination/variation lists.
   */
  const [internationalCountry, setInternationalCountry] =
    useState("");
  const [internationalProductType, setInternationalProductType] =
    useState("");
  const [internationalOperator, setInternationalOperator] =
    useState("");
  const [internationalVariation, setInternationalVariation] =
    useState("");
  const [internationalRecipient, setInternationalRecipient] =
    useState("");

  /*
   * Live international-airtime discovery state.
   * The backend is the source of truth for all four lists.
   */
  const [internationalCountries, setInternationalCountries] =
    useState([]);
  const [internationalProductTypes, setInternationalProductTypes] =
    useState([]);
  const [internationalOperators, setInternationalOperators] =
    useState([]);
  const [internationalVariations, setInternationalVariations] =
    useState([]);
  const [internationalLoading, setInternationalLoading] =
    useState(false);
  const [internationalError, setInternationalError] =
    useState("");

  /*
   * STEP 1: countries
   */
  useEffect(() => {
    if (!isInternationalAirtime || !isAuthenticated || !accessToken) {
      setInternationalCountries([]);
      setInternationalProductTypes([]);
      setInternationalOperators([]);
      setInternationalVariations([]);
      return;
    }

    const controller = new AbortController();

    const loadInternationalCountries = async () => {
      setInternationalLoading(true);
      setInternationalError("");

      try {
        const response = await fetch(
          `${API_BASE_URL}/api/services/international-airtime/countries`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            signal: controller.signal,
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result?.message ||
              "Could not load international countries"
          );
        }

        setInternationalCountries(
          Array.isArray(result?.countries)
            ? result.countries
            : []
        );
      } catch (error) {
        if (error?.name === "AbortError") return;

        setInternationalCountries([]);
        setInternationalError(
          error?.message ||
            "Could not load international countries"
        );
      } finally {
        if (!controller.signal.aborted) {
          setInternationalLoading(false);
        }
      }
    };

    loadInternationalCountries();

    return () => controller.abort();
  }, [
    isInternationalAirtime,
    isAuthenticated,
    accessToken,
  ]);

  /*
   * STEP 2: product types for the selected country
   */
  useEffect(() => {
    if (
      !isInternationalAirtime ||
      !isAuthenticated ||
      !accessToken ||
      !internationalCountry
    ) {
      setInternationalProductTypes([]);
      return;
    }

    const controller = new AbortController();
    const countryCode = String(internationalCountry).trim();

    const loadInternationalProductTypes = async () => {
      setInternationalLoading(true);
      setInternationalError("");

      try {
        const response = await fetch(
          `${API_BASE_URL}/api/services/international-airtime/product-types/${encodeURIComponent(countryCode)}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            signal: controller.signal,
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result?.message ||
              "Could not load international product types"
          );
        }

        setInternationalProductTypes(
          Array.isArray(result?.productTypes)
            ? result.productTypes
            : []
        );
      } catch (error) {
        if (error?.name === "AbortError") return;

        setInternationalProductTypes([]);
        setInternationalError(
          error?.message ||
            "Could not load international product types"
        );
      } finally {
        if (!controller.signal.aborted) {
          setInternationalLoading(false);
        }
      }
    };

    loadInternationalProductTypes();

    return () => controller.abort();
  }, [
    isInternationalAirtime,
    isAuthenticated,
    accessToken,
    internationalCountry,
  ]);

  /*
   * STEP 3: operators for the selected country/product type
   */
  useEffect(() => {
    if (
      !isInternationalAirtime ||
      !isAuthenticated ||
      !accessToken ||
      !internationalCountry ||
      !internationalProductType
    ) {
      setInternationalOperators([]);
      return;
    }

    const controller = new AbortController();
    const countryCode = String(internationalCountry).trim();
    const productTypeId = String(internationalProductType).trim();

    const loadInternationalOperators = async () => {
      setInternationalLoading(true);
      setInternationalError("");

      try {
        const response = await fetch(
          `${API_BASE_URL}/api/services/international-airtime/operators/${encodeURIComponent(countryCode)}/${encodeURIComponent(productTypeId)}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            signal: controller.signal,
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result?.message ||
              "Could not load international operators"
          );
        }

        setInternationalOperators(
          Array.isArray(result?.operators)
            ? result.operators
            : []
        );
      } catch (error) {
        if (error?.name === "AbortError") return;

        setInternationalOperators([]);
        setInternationalError(
          error?.message ||
            "Could not load international operators"
        );
      } finally {
        if (!controller.signal.aborted) {
          setInternationalLoading(false);
        }
      }
    };

    loadInternationalOperators();

    return () => controller.abort();
  }, [
    isInternationalAirtime,
    isAuthenticated,
    accessToken,
    internationalCountry,
    internationalProductType,
  ]);

  /*
   * STEP 4: denominations/variations for the selected operator/product
   */
  useEffect(() => {
    if (
      !isInternationalAirtime ||
      !isAuthenticated ||
      !accessToken ||
      !internationalOperator ||
      !internationalProductType
    ) {
      setInternationalVariations([]);
      return;
    }

    const controller = new AbortController();
    const operatorId = String(internationalOperator).trim();
    const productTypeId = String(internationalProductType).trim();

    const loadInternationalVariations = async () => {
      setInternationalLoading(true);
      setInternationalError("");

      try {
        const response = await fetch(
          `${API_BASE_URL}/api/services/international-airtime/variations/${encodeURIComponent(operatorId)}/${encodeURIComponent(productTypeId)}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            signal: controller.signal,
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result?.message ||
              "Could not load international denominations"
          );
        }

        setInternationalVariations(
          Array.isArray(result?.variations)
            ? result.variations
            : []
        );
      } catch (error) {
        if (error?.name === "AbortError") return;

        setInternationalVariations([]);
        setInternationalError(
          error?.message ||
            "Could not load international denominations"
        );
      } finally {
        if (!controller.signal.aborted) {
          setInternationalLoading(false);
        }
      }
    };

    loadInternationalVariations();

    return () => controller.abort();
  }, [
    isInternationalAirtime,
    isAuthenticated,
    accessToken,
    internationalOperator,
    internationalProductType,
  ]);

  /*
   * Education state
   */

  const [selectedExamOption, setSelectedExamOption] =
    useState("");

  const [educationQuantity, setEducationQuantity] =
    useState(1);

  const [bulkMode, setBulkMode] =
    useState(false);

  /*
   * Purchase review
   */

  const [showReview, setShowReview] =
    useState(false);

  /*
   * Purchase lifecycle
   *
   * idle       -> normal review state
   * processing -> backend is processing the purchase
   * success    -> backend confirmed a successful purchase
   * error      -> backend rejected/failed the purchase
   * pending    -> backend/provider has not returned a final result
   *
   * IMPORTANT:
   * The frontend never creates a fake transaction reference
   * and never changes a purchase to "success" by itself.
   * The backend is the source of truth.
   */

  const [purchaseStatus, setPurchaseStatus] =
    useState("idle");

  const [transactionReference, setTransactionReference] =
    useState("");

  const [transactionMessage, setTransactionMessage] =
    useState("");

  const [transactionCode, setTransactionCode] =
    useState("");

  /*
   * ==========================================================
   * DATA TYPES
   * ==========================================================
   */

  const availableDataTypes =
    useMemo(() => {
      if (
        !network ||
        !service.dataTypesByNetwork
      ) {
        return [];
      }

      return (
        service.dataTypesByNetwork[
          network
        ] || []
      );
    }, [
      network,
      service.dataTypesByNetwork,
    ]);

  /*
   * ==========================================================
   * SELECTED PROVIDER
   * ==========================================================
   */

  const selectedProvider =
    useMemo(
      () =>
        service.providers?.find(
          (item) =>
            item.serviceID === provider
        ),
      [provider, service.providers]
    );

  /*
   * ==========================================================
   * SELECTED OPTION
   * ==========================================================
   */

  const selectedOption =
    useMemo(
      () =>
        service.options?.find(
          (item) =>
            item.id === option
        ),
      [option, service.options]
    );

  /*
   * ==========================================================
   * SELECTED DATA TYPE
   * ==========================================================
   */

  const selectedDataType =
    useMemo(
      () =>
        availableDataTypes.find(
          (item) =>
            item.id === dataType
        ),
      [availableDataTypes, dataType]
    );

  /*
   * ==========================================================
   * SELECTED DATA PLAN
   * ==========================================================
   */

  const selectedPlanObject =
    useMemo(
      () =>
        DATA_PLAN_PREVIEW.find(
          (item) =>
            item.id === selectedPlan
        ),
      [selectedPlan]
    );

  /*
   * ==========================================================
   * SELECTED EXAM OPTION
   * ==========================================================
   */

  const selectedExamProduct =
    useMemo(
      () =>
        service.options?.find(
          (item) =>
            item.id ===
            selectedExamOption
        ),
      [
        service.options,
        selectedExamOption,
      ]
    );

  /*
   * ==========================================================
   * INTERNATIONAL AIRTIME OPTIONS
   * ==========================================================
   *
   * These lists are populated by the discovery effects above.
   * Nothing here is hard-coded into the service catalogue.
   */

  const selectedInternationalCountry =
    internationalCountries.find(
      (item) =>
        getInternationalItemValue(item, "country") ===
        String(internationalCountry)
    );

  const selectedInternationalProductType =
    internationalProductTypes.find(
      (item) =>
        getInternationalItemValue(item, "productType") ===
        String(internationalProductType)
    );

  const selectedInternationalOperator =
    internationalOperators.find(
      (item) =>
        getInternationalItemValue(item, "operator") ===
        String(internationalOperator)
    );

  const selectedInternationalVariation =
    internationalVariations.find(
      (item) =>
        getInternationalItemValue(item, "variation") ===
        String(internationalVariation)
    );

  const internationalVariationPrice =
    parseCurrency(
      selectedInternationalVariation?.amount ??
        selectedInternationalVariation?.price ??
        selectedInternationalVariation?.variationAmount ??
        selectedInternationalVariation?.value
    );

  /*
   * ==========================================================
   * EDUCATION QUANTITY RULES
   * ==========================================================
   */

  const isJamb =
    isExam &&
    service.slug === "jamb";

  const bulkConfig =
    isExam &&
    service.bulkPurchase?.enabled === true
      ? service.bulkPurchase
      : null;

  const isBulkEligible =
    Boolean(bulkConfig);

  const bulkMin = Math.max(
    2,
    Number(bulkConfig?.min) || 2
  );

  const bulkMax = Math.max(
    bulkMin,
    Number(bulkConfig?.max) || bulkMin
  );

  const educationMin =
    bulkMode && isBulkEligible
      ? bulkMin
      : EDUCATION_DEFAULT_MIN;

  const educationMax =
    bulkMode && isBulkEligible
      ? bulkMax
      : EDUCATION_DEFAULT_MAX;

  /*
   * If bulk mode is activated, automatically move the quantity
   * to the service-configured bulk minimum. If bulk is disabled,
   * return to a single-item standard order.
   */

  function handleBulkChange(enabled) {
    if (!isBulkEligible) {
      setBulkMode(false);
      setEducationQuantity(1);
      return;
    }

    setBulkMode(enabled);

    setEducationQuantity(
      enabled ? bulkMin : 1
    );
  }

  /*
   * ==========================================================
   * EDUCATION PRICE
   * ==========================================================
   *
   * We deliberately DO NOT invent prices.
   *
   * When the backend supplies:
   *
   * option.price
   * option.unitPrice
   * option.variationAmount
   *
   * this calculation will immediately work.
   */

  const educationUnitPrice =
    parseCurrency(
      selectedExamProduct?.unitPrice ??
        selectedExamProduct?.price ??
        selectedExamProduct?.variationAmount
    );

  const educationTotal =
    educationUnitPrice !== null
      ? educationUnitPrice *
        educationQuantity
      : null;

  /*
   * ==========================================================
   * AMOUNT
   * ==========================================================
   */

  const selectedAmount =
    isInternationalAirtime &&
    internationalVariationPrice !== null
      ? formatNaira(
          internationalVariationPrice
        )
      : customAmount || amount;

  /*
   * ==========================================================
   * NETWORK CHANGE
   * ==========================================================
   */

  function handleNetworkChange(
    value
  ) {
    setNetwork(value);

    if (isData) {
      setDataType("");
      setSelectedPlan("");
    }
  }

  /*
   * ==========================================================
   * DATA TYPE CHANGE
   * ==========================================================
   */

  function handleDataTypeChange(
    value
  ) {
    setDataType(value);
    setSelectedPlan("");
  }

  /*
   * ==========================================================
   * PHONE
   * ==========================================================
   */

  function handlePhoneChange(
    event
  ) {
    setPhone(
      event.target.value
        .replace(/\D/g, "")
        .slice(0, 11)
    );
  }

  function handleInternationalRecipientChange(
    event
  ) {
    setInternationalRecipient(
      event.target.value
        .replace(/[^0-9+()\s-]/g, "")
        .slice(0, 25)
    );
  }

  function handleInternationalVariationChange(
    value
  ) {
    setInternationalVariation(value);

    const selected =
      internationalVariations.find(
        (item) =>
          getInternationalItemValue(item, "variation") ===
          String(value)
      );

    const price =
      parseCurrency(
        selected?.amount ??
          selected?.price ??
          selected?.variationAmount ??
          selected?.value
      );

    if (price !== null) {
      setAmount(
        formatNaira(price)
      );
      setCustomAmount(
        ""
      );
    }
  }

  /*
   * ==========================================================
   * CUSTOM AIRTIME
   * ==========================================================
   */

  function handleCustomAmountChange(
    event
  ) {
    const value =
      event.target.value.replace(
        /\D/g,
        ""
      );

    setCustomAmount(value);
    setAmount("");
  }

  /*
   * ==========================================================
   * FORM VALIDATION
   * ==========================================================
   */

  const examCanContinue =
    isExam &&
    Boolean(
      selectedExamOption &&
        selectedExamProduct?.status ===
          "available"
    );

  const canContinue = isInternationalAirtime
    ? Boolean(
        internationalCountry &&
          internationalProductType &&
          internationalOperator &&
          internationalVariation &&
          internationalRecipient.trim() &&
          selectedAmount
      )
    : isAirtime
      ? Boolean(
          network &&
            phone.length === 11 &&
            selectedAmount
        )
      : isData
      ? Boolean(
          network &&
            dataType &&
            selectedPlan &&
            phone.length === 11
        )
      : isExam
        ? examCanContinue
        : isInternet
          ? Boolean(
              provider &&
                account
            )
          : isElectricity
            ? Boolean(
                provider &&
                  meterType &&
                  account &&
                  amount
              )
            : isCable
              ? Boolean(
                  provider && account
                )
              : hasOptions
                ? Boolean(
                    selectedOption?.status ===
                      "available"
                  )
                : true;

  /*
   * ==========================================================
   * ACCOUNT LABELS
   * ==========================================================
   */

  const accountLabel =
    isInternet
      ? selectedProvider?.accountLabel ||
        "Account / Phone Number"
      : service.accountLabel;

  const accountPlaceholder =
    isInternet
      ? selectedProvider?.accountPlaceholder ||
        "Enter your details"
      : service.accountPlaceholder;

  /*
   * ==========================================================
   * REVIEW
   * ==========================================================
   */

  function openReview() {
    if (canContinue) {
      setPurchaseStatus("idle");
      setShowReview(true);
    }
  }

  function closeReview() {
    if (purchaseStatus !== "processing") {
      setShowReview(false);
    }
  }

  function editPurchase() {
    setShowReview(false);
    setPurchaseStatus("idle");

    setTimeout(() => {
      let targetId =
        "airtime-recipient-phone";

      if (isInternationalAirtime) {
        targetId =
          "international-airtime-options";
      } else if (isData) {
        targetId =
          "data-recipient-phone";
      }

      if (isExam) {
        targetId =
          "education-options";
      }

      document
        .getElementById(targetId)
        ?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
    }, 100);
  }

  /*
   * ==========================================================
   * PURCHASE PAYLOAD
   * ==========================================================
   *
   * This contains the information currently selected in the
   * frontend. The backend remains responsible for:
   *
   * - validating the authenticated user
   * - validating the service
   * - validating the amount/variation
   * - checking wallet balance
   * - selecting the provider
   * - provider failover
   * - creating the transaction
   * - returning the authoritative transaction status
   */

  function buildPurchasePayload() {
    return {
      service: service.slug,
      serviceTitle: service.title,

      network: network || null,
      phone: phone || null,

      internationalCountry:
        internationalCountry || null,
      internationalCountryName:
        selectedInternationalCountry?.name ||
        selectedInternationalCountry?.label ||
        null,
      internationalProductType:
        internationalProductType || null,
      internationalProductTypeName:
        selectedInternationalProductType?.name ||
        selectedInternationalProductType?.label ||
        null,
      internationalOperator:
        internationalOperator || null,
      internationalOperatorName:
        selectedInternationalOperator?.name ||
        selectedInternationalOperator?.label ||
        null,
      internationalVariation:
        internationalVariation || null,
      internationalVariationName:
        selectedInternationalVariation?.name ||
        selectedInternationalVariation?.label ||
        selectedInternationalVariation?.variation_name ||
        null,
      internationalRecipient:
        internationalRecipient || null,

      dataType: dataType || null,
      dataTypeLabel:
        selectedDataType?.label || null,

      plan: selectedPlan || null,
      planName:
        selectedPlanObject?.name || null,
      planValidity:
        selectedPlanObject?.validity || null,

      amount: selectedAmount || null,

      provider: provider || null,
      providerName:
        selectedProvider?.name || null,

      account: account || null,
      meterType: meterType || null,

      option: option || null,
      optionTitle:
        selectedOption?.title || null,

      examOption:
        selectedExamOption || null,
      examOptionTitle:
        selectedExamProduct?.title || null,

      quantity: isExam
        ? educationQuantity
        : 1,

      bulkMode: isExam
        ? bulkMode
        : false,
    };
  }

  /*
   * ==========================================================
   * SAVE PENDING PURCHASE
   * ==========================================================
   *
   * If the user is not authenticated, the purchase details are
   * saved temporarily so the user can sign in and return
   * without filling the form again.
   */

  function savePendingPurchase() {
    try {
      sessionStorage.setItem(
        "teksum_pending_purchase",
        JSON.stringify(
          buildPurchasePayload()
        )
      );

      return true;
    } catch (error) {
      console.error(
        "Unable to save pending purchase:",
        error
      );

      return false;
    }
  }

  /*
   * ==========================================================
   * REDIRECT TO LOGIN
   * ==========================================================
   */

  function redirectToLogin() {
    savePendingPurchase();

    const returnTo =
      typeof window !== "undefined"
        ? window.location.pathname +
          window.location.search
        : "/";

    const loginUrl =
      `/login?returnTo=${encodeURIComponent(
        returnTo
      )}`;

    window.location.href =
      loginUrl;
  }

  /*
   * ==========================================================
   * START PURCHASE
   * ==========================================================
   *
   * There is deliberately NO fake success here.
   *
   * If the user is not authenticated, the purchase stops and
   * the user is sent to login.
   *
   * If authenticated, the frontend sends the request to the
   * TEKSUM backend and uses the backend response to decide
   * between success, failed and pending.
   */

  async function startPurchase() {
    if (
      !canContinue ||
      purchaseStatus ===
        "processing"
    ) {
      return;
    }

    /*
     * Authentication is required before a purchase can be
     * submitted.
     *
     * The parent component/AuthContext will eventually provide
     * the authenticated state and access token.
     */
    if (
      !isAuthenticated ||
      !accessToken
    ) {
      redirectToLogin();
      return;
    }

    setPurchaseStatus(
      "processing"
    );

    setTransactionMessage("");
    setTransactionCode("");
    setTransactionReference("");

    try {
      const response =
        await fetch(
          `${API_BASE_URL}/api/services/purchase`,
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
              Authorization:
                `Bearer ${accessToken}`,
            },
            body: JSON.stringify(
              buildPurchasePayload()
            ),
          }
        );

      let result = {};

      try {
        result =
          await response.json();
      } catch {
        result = {};
      }

      /*
       * Backend response is authoritative.
       *
       * We intentionally accept common status spellings so the
       * frontend can work with the existing backend response
       * once its exact response shape is confirmed.
       */

      const backendStatus =
        String(
          result.status ||
            result.transactionStatus ||
            result.data?.status ||
            ""
        ).toLowerCase();

      const reference =
        result.reference ||
        result.transactionReference ||
        result.transactionId ||
        result.data?.reference ||
        result.data?.transactionReference ||
        result.data?.transactionId ||
        "";

      const message =
        result.message ||
        result.error ||
        result.data?.message ||
        result.data?.error ||
        "";

      const code =
        result.code ||
        result.statusCode ||
        result.data?.code ||
        "";

      if (
        response.ok &&
        (
          backendStatus ===
            "success" ||
          backendStatus ===
            "successful" ||
          backendStatus ===
            "completed"
        )
      ) {
        setTransactionReference(
          reference
        );

        setTransactionMessage(
          message ||
            "Your transaction was completed successfully."
        );

        setTransactionCode(
          code
        );

        setPurchaseStatus(
          "success"
        );

        return;
      }

      if (
        backendStatus ===
          "pending" ||
        backendStatus ===
          "processing" ||
        backendStatus ===
          "queued"
      ) {
        setTransactionReference(
          reference
        );

        setTransactionMessage(
          message ||
            "Your transaction is still being processed."
        );

        setTransactionCode(
          code
        );

        setPurchaseStatus(
          "pending"
        );

        return;
      }

      /*
       * Anything that is not an explicit successful or pending
       * response is treated as failed.
       *
       * This is safer than displaying success when the backend
       * has not positively confirmed it.
       */

      setTransactionReference(
        reference
      );

      setTransactionMessage(
        message ||
          "We couldn't complete this transaction."
      );

      setTransactionCode(
        code
      );

      setPurchaseStatus(
        "error"
      );
    } catch (error) {
      console.error(
        "Purchase request failed:",
        error
      );

      setTransactionReference("");
      setTransactionCode(
        "NETWORK_ERROR"
      );

      setTransactionMessage(
        "We couldn't reach the TEKSUM server. Please check your connection and try again."
      );

      setPurchaseStatus(
        "error"
      );
    }
  }

  /*
   * ==========================================================
   * RETRY
   * ==========================================================
   */

  function retryPurchase() {
    setPurchaseStatus(
      "idle"
    );

    setTransactionReference("");
    setTransactionMessage("");
    setTransactionCode("");

    setShowReview(true);
  }

  /*
   * ==========================================================
   * FINISH SUCCESS
   * ==========================================================
   */

  function finishPurchase() {
    setPurchaseStatus(
      "idle"
    );

    setShowReview(false);

    setTransactionReference("");
    setTransactionMessage("");
    setTransactionCode("");

    try {
      sessionStorage.removeItem(
        "teksum_pending_purchase"
      );
    } catch (error) {
      console.error(
        "Unable to clear pending purchase:",
        error
      );
    }
  }

  /*
   * ==========================================================
   * EDIT AFTER FAILURE
   * ==========================================================
   */

  function editFailedPurchase() {
    setPurchaseStatus(
      "idle"
    );

    setTransactionReference("");
    setTransactionMessage("");
    setTransactionCode("");

    setShowReview(false);
  }

  /*
   * ==========================================================
   * PENDING TRANSACTION
   * ==========================================================
   *
   * A pending transaction is NOT a success.
   *
   * The backend/provider must later expose a transaction-status
   * endpoint so this state can be refreshed automatically.
   *
   * For now the user is given a safe status message rather than
   * being told that the transaction succeeded.
   */

  function closePendingState() {
    setPurchaseStatus(
      "idle"
    );

    setShowReview(false);
  }

  /*
   * ==========================================================
   * RENDER
   * ==========================================================
   */

  return (
    <>
      {/* ======================================================
          PURCHASE PANEL
      ======================================================= */}

      <div className="rounded-2xl border border-[#dbeafe] bg-white p-6 shadow-md dark:border-[#1e3a6e] dark:bg-[#152040] lg:sticky lg:top-24 lg:self-start">

        <h2 className="text-lg font-bold text-[#0f172a] dark:text-[#e8eeff]">
          Quick Purchase
        </h2>

        <p className="mt-1 text-sm leading-relaxed text-[#475569] dark:text-[#7b8ebc]">
          Choose your options below and review
          your purchase before continuing.
        </p>

        <div className="mt-6 space-y-6">

          {/* ==================================================
              NETWORK
          =================================================== */}

          {(isAirtime || isData) && (
            <div>
              <SectionLabel
                eyebrow="Step 1"
                title="Choose network"
                hint="4 major networks"
              />

              <div className="grid grid-cols-2 gap-2.5">
                {service.networks?.map(
                  (item) => (
                    <NetworkChoice
                      key={item}
                      network={item}
                      selected={
                        network === item
                      }
                      onClick={() =>
                        handleNetworkChange(
                          item
                        )
                      }
                    />
                  )
                )}
              </div>
            </div>
          )}

          {/* ==================================================
              AIRTIME
          =================================================== */}

          {isAirtime && (
            <>
              <div>
                <SectionLabel
                  eyebrow="Step 2"
                  title="Recipient phone number"
                  hint="11 digits"
                />

                <input
                  id="airtime-recipient-phone"
                  value={phone}
                  onChange={
                    handlePhoneChange
                  }
                  type="tel"
                  inputMode="numeric"
                  maxLength={11}
                  placeholder="08012345678"
                  className={inputClass}
                />

                {phone.length > 0 &&
                  phone.length !== 11 && (
                    <p className="mt-2 text-xs font-medium text-[#dc2626]">
                      Enter an 11-digit Nigerian
                      phone number.
                    </p>
                  )}
              </div>

              <div>
                <SectionLabel
                  eyebrow="Step 3"
                  title="Choose amount"
                  hint="Select or enter"
                />

                <div className="grid grid-cols-3 gap-2">
                  {service.amounts?.map(
                    (item) => {
                      const active =
                        amount === item &&
                        !customAmount;

                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => {
                            setAmount(
                              item
                            );
                            setCustomAmount(
                              ""
                            );
                          }}
                          className={`cursor-pointer rounded-xl border px-3 py-3 text-sm font-bold transition-all ${
                            active
                              ? "border-[#1e40af] bg-[#f0f4ff] text-[#1e40af] shadow-sm dark:border-[#3b60d4] dark:bg-[#101a2d] dark:text-[#3b60d4]"
                              : "border-[#dbeafe] bg-white text-[#334155] hover:border-[#1e40af] dark:border-[#1e3a6e] dark:bg-[#152040] dark:text-[#cbd5e1]"
                          }`}
                        >
                          {item}
                        </button>
                      );
                    }
                  )}
                </div>

                <div className="mt-3">
                  <input
                    value={
                      customAmount
                    }
                    onChange={
                      handleCustomAmountChange
                    }
                    type="text"
                    inputMode="numeric"
                    placeholder="Or enter a custom amount"
                    className={
                      inputClass
                    }
                  />
                </div>
              </div>
            </>
          )}

          {/* ==================================================
              DATA
          =================================================== */}

          {isData && (
            <>
              <div>
                <SectionLabel
                  eyebrow="Step 2"
                  title="Choose data type"
                  hint={
                    network
                      ? `${network} options`
                      : "Choose a network first"
                  }
                />

                {!network ? (
                  <div className="rounded-2xl border border-dashed border-[#cbd5e1] bg-[#f8fafc] p-5 text-center dark:border-[#334155] dark:bg-[#0d1526]">
                    <p className="text-sm font-semibold text-[#475569] dark:text-[#cbd5e1]">
                      Select a network to continue
                    </p>

                    <p className="mt-1 text-xs leading-relaxed text-[#64748b] dark:text-[#94a3b8]">
                      Available data types will
                      appear based on the network
                      you choose.
                    </p>
                  </div>
                ) : availableDataTypes.length >
                  0 ? (
                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {availableDataTypes.map(
                      (item) => (
                        <DataTypeCard
                          key={item.id}
                          item={item}
                          selected={
                            dataType ===
                            item.id
                          }
                          onClick={() =>
                            handleDataTypeChange(
                              item.id
                            )
                          }
                        />
                      )
                    )}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-dashed border-[#cbd5e1] bg-[#f8fafc] p-5 text-center dark:border-[#334155] dark:bg-[#0d1526]">
                    <p className="text-sm font-semibold text-[#475569] dark:text-[#cbd5e1]">
                      No data types available
                    </p>

                    <p className="mt-1 text-xs text-[#64748b] dark:text-[#94a3b8]">
                      Please choose another network.
                    </p>
                  </div>
                )}
              </div>

              {network &&
                dataType && (
                  <div>
                    <div className="mb-3">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#10b981] dark:text-[#34d399]">
                            Step 3
                          </p>

                          <h3 className="mt-1 text-sm font-bold text-[#0f172a] dark:text-[#e8eeff]">
                            Choose data plan
                          </h3>
                        </div>

                        <span className="text-[11px] text-[#64748b] dark:text-[#94a3b8]">
                          {selectedPlan
                            ? "Plan selected"
                            : "Select one"}
                        </span>
                      </div>

                      <p className="mt-1 text-[11px] text-[#64748b] dark:text-[#94a3b8]">
                        {network} •{" "}
                        {
                          selectedDataType?.label
                        }
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                      {DATA_PLAN_PREVIEW.map(
                        (plan) => (
                          <DataPlanCard
                            key={
                              plan.id
                            }
                            plan={
                              plan
                            }
                            selected={
                              selectedPlan ===
                              plan.id
                            }
                            onClick={() =>
                              setSelectedPlan(
                                plan.id
                              )
                            }
                          />
                        )
                      )}
                    </div>

                    <p className="mt-3 text-[10px] leading-relaxed text-[#64748b] dark:text-[#94a3b8]">
                      Preview plans are temporary UI
                      data. Live plans and prices will
                      eventually come from the TEKSUM
                      backend.
                    </p>
                  </div>
                )}

              <div>
                <SectionLabel
                  eyebrow="Step 4"
                  title="Recipient phone number"
                  hint="11 digits"
                />

                <input
                  id="data-recipient-phone"
                  value={phone}
                  onChange={
                    handlePhoneChange
                  }
                  type="tel"
                  inputMode="numeric"
                  maxLength={11}
                  placeholder="08012345678"
                  className={inputClass}
                />

                {phone.length > 0 &&
                  phone.length !== 11 && (
                    <p className="mt-2 text-xs font-medium text-[#dc2626]">
                      Enter an 11-digit Nigerian
                      phone number.
                    </p>
                  )}
              </div>
            </>
          )}

          {/* ==================================================
              INTERNATIONAL AIRTIME
          =================================================== */}

          {isInternationalAirtime && (
            <div
              id="international-airtime-options"
              className="space-y-5"
            >
              <div>
                <SectionLabel
                  eyebrow="Step 1"
                  title="Choose destination country"
                  hint="International"
                />

                {internationalLoading &&
                internationalCountries.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-[#cbd5e1] bg-[#f8fafc] p-4 dark:border-[#334155] dark:bg-[#0d1526]">
                    <p className="text-sm font-semibold text-[#334155] dark:text-[#cbd5e1]">
                      Loading international destinations…
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-[#64748b] dark:text-[#94a3b8]">
                      Fetching the current supported countries from the backend provider.
                    </p>
                  </div>
                ) : internationalCountries.length > 0 ? (
                  <select
                    value={internationalCountry}
                    onChange={(event) => {
                      setInternationalCountry(event.target.value);
                      setInternationalProductType("");
                      setInternationalOperator("");
                      setInternationalVariation("");
                      setInternationalProductTypes([]);
                      setInternationalOperators([]);
                      setInternationalVariations([]);
                      setAmount("");
                      setCustomAmount("");
                      setInternationalError("");
                    }}
                    className={inputClass}
                  >
                    <option value="">Select country</option>
                    {internationalCountries.map((item) => {
                      const value =
                        getInternationalItemValue(
                          item,
                          "country"
                        );
                      const label =
                        getInternationalItemLabel(
                          item,
                          "country"
                        );

                      return (
                        <option
                          key={String(value)}
                          value={String(value)}
                        >
                          {label}
                        </option>
                      );
                    })}
                  </select>
                ) : (
                  <div className="rounded-2xl border border-dashed border-[#cbd5e1] bg-[#f8fafc] p-4 dark:border-[#334155] dark:bg-[#0d1526]">
                    <p className="text-sm font-semibold text-[#334155] dark:text-[#cbd5e1]">
                      {!isAuthenticated || !accessToken
                        ? "Sign in to load international destinations"
                        : internationalError ||
                          "No international destinations were returned by the provider"}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-[#64748b] dark:text-[#94a3b8]">
                      {!isAuthenticated || !accessToken
                        ? "This endpoint is protected. Sign in first, then return to this page."
                        : "The country list comes directly from the backend discovery endpoint and is not hard-coded in the frontend."}
                    </p>
                  </div>
                )}

                {internationalError &&
                  internationalCountries.length > 0 && (
                    <p className="mt-2 text-xs font-medium text-[#dc2626]">
                      {internationalError}
                    </p>
                  )}
              </div>

              <div>
                <SectionLabel
                  eyebrow="Step 2"
                  title="Choose product type"
                />

                <select
                  value={internationalProductType}
                  onChange={(event) => {
                    setInternationalProductType(event.target.value);
                    setInternationalOperator("");
                    setInternationalVariation("");
                    setInternationalOperators([]);
                    setInternationalVariations([]);
                    setAmount("");
                    setCustomAmount("");
                    setInternationalError("");
                  }}
                  disabled={!internationalCountry || internationalProductTypes.length === 0}
                  className={inputClass}
                >
                  <option value="">
                    {!internationalCountry
                      ? "Select a country first"
                      : internationalLoading &&
                          internationalProductTypes.length === 0
                        ? "Loading product types…"
                        : internationalProductTypes.length === 0
                          ? "No product types available"
                          : "Select product type"}
                  </option>
                  {internationalProductTypes.map((item) => {
                    const value =
                      getInternationalItemValue(
                        item,
                        "productType"
                      );
                    const label =
                      getInternationalItemLabel(
                        item,
                        "productType"
                      );

                    return (
                      <option
                        key={String(value)}
                        value={String(value)}
                      >
                        {label}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div>
                <SectionLabel
                  eyebrow="Step 3"
                  title="Choose mobile operator"
                />

                <select
                  value={internationalOperator}
                  onChange={(event) => {
                    setInternationalOperator(event.target.value);
                    setInternationalVariation("");
                    setInternationalVariations([]);
                    setAmount("");
                    setCustomAmount("");
                    setInternationalError("");
                  }}
                  disabled={!internationalProductType || internationalOperators.length === 0}
                  className={inputClass}
                >
                  <option value="">
                    {!internationalProductType
                      ? "Select a product type first"
                      : internationalLoading &&
                          internationalOperators.length === 0
                        ? "Loading operators…"
                        : internationalOperators.length === 0
                          ? "No operators available"
                          : "Select operator"}
                  </option>
                  {internationalOperators.map((item) => {
                    const value =
                      getInternationalItemValue(
                        item,
                        "operator"
                      );
                    const label =
                      getInternationalItemLabel(
                        item,
                        "operator"
                      );

                    return (
                      <option
                        key={String(value)}
                        value={String(value)}
                      >
                        {label}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div>
                <SectionLabel
                  eyebrow="Step 4"
                  title="Choose denomination"
                />

                <select
                  value={internationalVariation}
                  onChange={(event) =>
                    handleInternationalVariationChange(event.target.value)
                  }
                  disabled={!internationalOperator || internationalVariations.length === 0}
                  className={inputClass}
                >
                  <option value="">
                    {!internationalOperator
                      ? "Select an operator first"
                      : internationalLoading &&
                          internationalVariations.length === 0
                        ? "Loading denominations…"
                        : internationalVariations.length === 0
                          ? "No denominations available"
                          : "Select denomination"}
                  </option>
                  {internationalVariations.map((item) => {
                    const value =
                      getInternationalItemValue(
                        item,
                        "variation"
                      );
                    const label =
                      getInternationalItemLabel(
                        item,
                        "variation"
                      );

                    return (
                      <option
                        key={String(value)}
                        value={String(value)}
                      >
                        {label}
                      </option>
                    );
                  })}
                </select>
              </div>

              {internationalLoading && (
                <p className="text-xs font-medium text-[#64748b] dark:text-[#94a3b8]">
                  Loading the latest provider options…
                </p>
              )}

              {internationalError && (
                <p className="text-xs font-medium text-[#dc2626]">
                  {internationalError}
                </p>
              )}

              <div>
                <SectionLabel
                  eyebrow="Step 5"
                  title="Recipient mobile number"
                  hint="International format"
                />

                <input
                  value={internationalRecipient}
                  onChange={handleInternationalRecipientChange}
                  type="tel"
                  inputMode="tel"
                  maxLength={25}
                  placeholder="Enter the recipient's mobile number"
                  className={inputClass}
                />
              </div>

              <div className="rounded-2xl border border-[#bfdbfe] bg-[#f0f6ff] p-4 dark:border-[#294b86] dark:bg-[#101a2d]">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-wide text-[#64748b] dark:text-[#94a3b8]">
                      Denomination / price
                    </p>
                    <p className="mt-1 text-lg font-extrabold text-[#1e40af] dark:text-[#3b60d4]">
                      {internationalVariationPrice !== null
                        ? formatNaira(internationalVariationPrice)
                        : "Provider price"}
                    </p>
                  </div>
                  <span className="text-xs text-[#64748b] dark:text-[#94a3b8]">
                    Final price confirmed by backend
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ==================================================
              EDUCATION
          =================================================== */}

          {isExam && (
            <div
              id="education-options"
              className="space-y-5"
            >

              {/* STEP 1: SERVICE */}

              <div>
                <SectionLabel
                  eyebrow="Step 1"
                  title="Choose service"
                  hint={
                    service.options?.length
                      ? `${service.options.length} options`
                      : undefined
                  }
                />

                <div className="space-y-2.5">
                  {service.options?.map(
                    (item) => {
                      const disabled =
                        item.status !==
                        "available";

                      const selected =
                        selectedExamOption ===
                        item.id;

                      return (
                        <button
                          key={item.id}
                          type="button"
                          disabled={
                            disabled
                          }
                          onClick={() => {
                            setSelectedExamOption(
                              item.id
                            );

                            setEducationQuantity(
                              1
                            );

                            setBulkMode(
                              false
                            );
                          }}
                          className={`w-full ${choiceClass(
                            selected,
                            disabled
                          )}`}
                        >
                          <div className="flex items-start gap-3">

                            <span
                              className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[10px] font-black ${
                                selected
                                  ? "border-[#1e40af] bg-[#1e40af] text-white dark:border-[#3b60d4] dark:bg-[#3b60d4]"
                                  : "border-[#cbd5e1] text-transparent dark:border-[#475569]"
                              }`}
                            >
                              ✓
                            </span>

                            <span className="min-w-0 flex-1">

                              <span className="flex items-start justify-between gap-3">
                                <span className="text-sm font-bold text-[#0f172a] dark:text-[#e8eeff]">
                                  {
                                    item.title
                                  }
                                </span>

                                <span
                                  className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-bold ${
                                    disabled
                                      ? "bg-[#f1f5f9] text-[#64748b] dark:bg-[#1e293b] dark:text-[#94a3b8]"
                                      : "bg-[#dcfce7] text-[#15803d] dark:bg-[#052e16] dark:text-[#4ade80]"
                                  }`}
                                >
                                  {disabled
                                    ? "Coming soon"
                                    : "Available"}
                                </span>
                              </span>

                              <span className="mt-1 block text-xs leading-relaxed text-[#64748b] dark:text-[#94a3b8]">
                                {
                                  item.description
                                }
                              </span>

                            </span>
                          </div>
                        </button>
                      );
                    }
                  )}
                </div>
              </div>

              {/* QUANTITY */}

              {selectedExamProduct && (
                <>
                  <div>
                    <SectionLabel
                      eyebrow="Step 2"
                      title={
                        isJamb
                          ? "Number of candidates"
                          : "Purchase quantity"
                      }
                      hint={
                        bulkMode
                          ? "Bulk order"
                          : "Multiple purchase"
                      }
                    />

                    <QuantityControl
                      value={
                        educationQuantity
                      }
                      min={
                        educationMin
                      }
                      max={
                        educationMax
                      }
                      onChange={
                        setEducationQuantity
                      }
                      label={
                        isJamb
                          ? "Candidates"
                          : "PINs / Tokens"
                      }
                      helper={
                        isJamb
                          ? bulkMode
                            ? `Bulk JAMB ordering: ${bulkMin}–${bulkMax} candidates.`
                            : "One candidate per standard order. Enable bulk ordering when the service configuration allows multiple candidates."
                          : isBulkEligible
                            ? bulkMode
                              ? `Bulk order: ${bulkMin}–${bulkMax} PINs/tokens.`
                              : "Standard order: one PIN or token. Enable bulk ordering for multiple items."
                            : "This service is available as a single PIN/token per order."
                      }
                    />
                  </div>

                  {/* BULK */}

                  {isBulkEligible && (
                    <div>
                      <BulkToggle
                        enabled={bulkMode}
                        onChange={handleBulkChange}
                        label={
                          bulkConfig?.label ||
                          "Bulk order"
                        }
                        helper={
                          bulkConfig?.helper ||
                          "Purchase multiple PINs or tokens in one order."
                        }
                      />

                      {bulkMode && (
                        <p className="mt-2 text-[10px] leading-relaxed text-[#64748b] dark:text-[#94a3b8]">
                          Bulk quantity: {bulkMin}–{bulkMax}. Final provider limits and pricing will be validated by the backend before the purchase is processed.
                        </p>
                      )}
                    </div>
                  )}

                  {/* TOTAL */}

                  <div className="rounded-2xl border border-[#bfdbfe] bg-[#f0f6ff] p-4 dark:border-[#294b86] dark:bg-[#101a2d]">

                    <div className="flex items-center justify-between gap-4">

                      <div>
                        <p className="text-[10px] font-medium uppercase tracking-wide text-[#64748b] dark:text-[#94a3b8]">
                          Unit price
                        </p>

                        <p className="mt-1 text-sm font-bold text-[#0f172a] dark:text-[#e8eeff]">
                          {educationUnitPrice !==
                          null
                            ? formatNaira(
                                educationUnitPrice
                              )
                            : "Provider price"}
                        </p>
                      </div>

                      <span className="text-[#64748b]">
                        ×
                      </span>

                      <div className="text-center">
                        <p className="text-[10px] font-medium uppercase tracking-wide text-[#64748b] dark:text-[#94a3b8]">
                          Quantity
                        </p>

                        <p className="mt-1 text-sm font-bold text-[#0f172a] dark:text-[#e8eeff]">
                          {
                            educationQuantity
                          }
                        </p>
                      </div>

                      <span className="text-[#64748b]">
                        =
                      </span>

                      <div className="text-right">
                        <p className="text-[10px] font-medium uppercase tracking-wide text-[#64748b] dark:text-[#94a3b8]">
                          Total
                        </p>

                        <p className="mt-1 text-lg font-extrabold text-[#1e40af] dark:text-[#3b60d4]">
                          {educationTotal !==
                          null
                            ? formatNaira(
                                educationTotal
                              )
                            : "Calculated at checkout"}
                        </p>
                      </div>

                    </div>

                    {educationUnitPrice ===
                      null && (
                      <p className="mt-3 border-t border-[#bfdbfe] pt-3 text-[10px] leading-relaxed text-[#64748b] dark:border-[#294b86] dark:text-[#94a3b8]">
                        The provider price is
                        intentionally not
                        hard-coded. Once the
                        backend returns the
                        live variation price,
                        TEKSUM will calculate
                        the total automatically.
                      </p>
                    )}

                  </div>
                </>
              )}
            </div>
          )}

          {/* ==================================================
              INTERNET
          =================================================== */}

          {isInternet && (
            <>
              <div>
                <SectionLabel
                  eyebrow="Step 1"
                  title="Choose internet provider"
                  hint="Smile or Spectranet"
                />

                <div className="grid grid-cols-2 gap-2.5">
                  {service.providers?.map(
                    (item) => (
                      <button
                        key={
                          item.serviceID
                        }
                        type="button"
                        onClick={() => {
                          setProvider(
                            item.serviceID
                          );

                          setAccount(
                            ""
                          );
                        }}
                        className={choiceClass(
                          provider ===
                            item.serviceID
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <ProviderLogo
                            name={
                              item.name
                            }
                          />

                          <div className="min-w-0">
                            <p className="text-sm font-bold text-[#0f172a] dark:text-[#e8eeff]">
                              {
                                item.name
                              }
                            </p>

                            <p className="mt-0.5 text-[11px] text-[#64748b] dark:text-[#94a3b8]">
                              Internet
                              subscription
                            </p>
                          </div>
                        </div>
                      </button>
                    )
                  )}
                </div>
              </div>

              <div>
                <SectionLabel
                  eyebrow="Step 2"
                  title={
                    accountLabel ||
                    "Account details"
                  }
                />

                <input
                  value={account}
                  onChange={(
                    event
                  ) =>
                    setAccount(
                      event.target
                        .value
                    )
                  }
                  type={
                    selectedProvider?.accountType ||
                    "text"
                  }
                  placeholder={
                    accountPlaceholder
                  }
                  className={
                    inputClass
                  }
                />
              </div>

              <div>
                <SectionLabel
                  eyebrow="Step 3"
                  title="Internet plan"
                />

                <div className="rounded-2xl border border-dashed border-[#cbd5e1] bg-[#f8fafc] p-4 dark:border-[#334155] dark:bg-[#0d1526]">

                  <p className="text-sm font-semibold text-[#334155] dark:text-[#cbd5e1]">
                    Plans will load from the
                    provider
                  </p>

                  <p className="mt-1 text-xs leading-relaxed text-[#64748b] dark:text-[#94a3b8]">
                    Live Smile and Spectranet
                    plans will be retrieved during
                    backend integration.
                  </p>

                </div>
              </div>
            </>
          )}

          {/* ==================================================
              ELECTRICITY / CABLE
          =================================================== */}

          {(isElectricity ||
            isCable) && (
            <>
              <div>
                <SectionLabel
                  eyebrow="Step 1"
                  title={
                    isElectricity
                      ? "Choose electricity provider"
                      : "Choose TV provider"
                  }
                />

                <div className="grid grid-cols-2 gap-2">
                  {service.providers?.map(
                    (item) => (
                      <button
                        key={
                          item.serviceID
                        }
                        type="button"
                        onClick={() =>
                          setProvider(
                            item.serviceID
                          )
                        }
                        className={choiceClass(
                          provider ===
                            item.serviceID
                        )}
                      >
                        <div className="flex items-center gap-2.5">
                          <ProviderLogo
                            name={
                              item.name
                            }
                            compact
                          />

                          <span className="text-xs font-bold text-[#334155] dark:text-[#cbd5e1]">
                            {
                              item.name
                            }
                          </span>
                        </div>
                      </button>
                    )
                  )}
                </div>
              </div>

              {isElectricity && (
                <div>
                  <SectionLabel
                    eyebrow="Step 2"
                    title="Meter type"
                  />

                  <div className="grid grid-cols-2 gap-2">
                    {service.meterTypes?.map(
                      (item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() =>
                            setMeterType(
                              item
                            )
                          }
                          className={choiceClass(
                            meterType ===
                              item
                          )}
                        >
                          {item}
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}

              <div>
                <SectionLabel
                  eyebrow={
                    isElectricity
                      ? "Step 3"
                      : "Step 2"
                  }
                  title={
                    service.accountLabel ||
                    "Account details"
                  }
                />

                <input
                  value={account}
                  onChange={(
                    event
                  ) =>
                    setAccount(
                      event.target
                        .value
                    )
                  }
                  type="text"
                  placeholder={
                    service.accountPlaceholder
                  }
                  className={
                    inputClass
                  }
                />
              </div>

              {isElectricity && (
                <div>
                  <SectionLabel
                    eyebrow="Step 4"
                    title="Amount"
                  />

                  <select
                    value={amount}
                    onChange={(
                      event
                    ) =>
                      setAmount(
                        event.target
                          .value
                      )
                    }
                    className={
                      inputClass
                    }
                  >
                    <option value="">
                      Select amount
                    </option>

                    {service.amounts?.map(
                      (item) => (
                        <option
                          key={item}
                        >
                          {item}
                        </option>
                      )
                    )}
                  </select>
                </div>
              )}

              {isCable && (
                <div>
                  <SectionLabel
                    eyebrow="Step 3"
                    title="Choose package"
                  />

                  <div className="rounded-2xl border border-dashed border-[#cbd5e1] bg-[#f8fafc] p-4 dark:border-[#334155] dark:bg-[#0d1526]">

                    <p className="text-sm font-semibold text-[#334155] dark:text-[#cbd5e1]">
                      Bouquets will load
                      from the provider
                    </p>

                    <p className="mt-1 text-xs leading-relaxed text-[#64748b] dark:text-[#94a3b8]">
                      Current packages
                      and prices will be
                      retrieved during
                      backend integration.
                    </p>

                  </div>
                </div>
              )}
            </>
          )}

          {/* ==================================================
              GENERIC OPTIONS
          =================================================== */}

          {hasOptions &&
            !isElectricity &&
            !isCable &&
            !isAirtime &&
            !isData &&
            !isInternet &&
            !isExam && (
              <div>
                <SectionLabel
                  eyebrow="Step 1"
                  title="Choose service"
                />

                <div className="space-y-2">
                  {service.options.map(
                    (item) => {
                      const disabled =
                        item.status !==
                        "available";

                      return (
                        <button
                          key={
                            item.id
                          }
                          type="button"
                          disabled={
                            disabled
                          }
                          onClick={() =>
                            setOption(
                              item.id
                            )
                          }
                          className={`w-full ${choiceClass(
                            option ===
                              item.id,
                            disabled
                          )}`}
                        >
                          <div className="flex items-start gap-3">

                            <span
                              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-black ${
                                option ===
                                item.id
                                  ? "border-[#1e40af] bg-[#1e40af] text-white"
                                  : "border-[#cbd5e1] text-transparent dark:border-[#475569]"
                              }`}
                            >
                              ✓
                            </span>

                            <span className="min-w-0 flex-1">

                              <span className="flex items-start justify-between gap-3">
                                <span className="text-sm font-bold text-[#0f172a] dark:text-[#e8eeff]">
                                  {
                                    item.title
                                  }
                                </span>

                                <span
                                  className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-bold ${
                                    disabled
                                      ? "bg-[#f1f5f9] text-[#64748b] dark:bg-[#1e293b] dark:text-[#94a3b8]"
                                      : "bg-[#dcfce7] text-[#15803d] dark:bg-[#052e16] dark:text-[#4ade80]"
                                  }`}
                                >
                                  {disabled
                                    ? "Coming soon"
                                    : "Available"}
                                </span>
                              </span>

                              <span className="mt-1 block text-xs leading-relaxed text-[#64748b] dark:text-[#94a3b8]">
                                {
                                  item.description
                                }
                              </span>

                            </span>
                          </div>
                        </button>
                      );
                    }
                  )}
                </div>
              </div>
            )}

          {/* ==================================================
              CONTINUE
          =================================================== */}

          {canContinue ? (
            isInternationalAirtime ||
            isAirtime ||
            isData ||
            isExam ? (
              <button
                type="button"
                onClick={
                  openReview
                }
                className="w-full cursor-pointer rounded-xl bg-[#1e40af] py-3.5 text-center text-sm font-semibold text-white transition hover:bg-[#1d3a9e] dark:bg-[#3b60d4] dark:hover:bg-[#2d50c0]"
              >
                Continue to Purchase
              </button>
            ) : (
              <Link
                href="/register"
                className="block w-full rounded-xl bg-[#1e40af] py-3.5 text-center text-sm font-semibold text-white transition hover:bg-[#1d3a9e] dark:bg-[#3b60d4] dark:hover:bg-[#2d50c0]"
              >
                Continue to Purchase
              </Link>
            )
          ) : (
            <button
              type="button"
              disabled
              className="w-full cursor-not-allowed rounded-xl bg-[#cbd5e1] py-3.5 text-center text-sm font-semibold text-[#64748b] dark:bg-[#334155] dark:text-[#94a3b8]"
            >
              Complete your selections
            </button>
          )}

          <p className="text-center text-xs text-[#475569] dark:text-[#7b8ebc]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-[#1e40af] hover:underline dark:text-[#3b60d4]"
            >
              Sign in
            </Link>
          </p>

        </div>
      </div>

      {/* ========================================================
          PURCHASE REVIEW MODAL
      ========================================================= */}

      {showReview && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="purchase-review-title"
        >
          <div className="w-full max-w-md overflow-hidden rounded-3xl border border-[#dbeafe] bg-white shadow-2xl dark:border-[#1e3a6e] dark:bg-[#152040]">

            {/* HEADER */}

            <div className="border-b border-[#e2e8f0] px-5 py-5 dark:border-[#1e3a6e]">

              <div className="flex items-start justify-between gap-4">

                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#10b981] dark:text-[#34d399]">
                    Final review
                  </p>

                  <h3
                    id="purchase-review-title"
                    className="mt-1 text-lg font-bold text-[#0f172a] dark:text-[#e8eeff]"
                  >
                    Confirm your{" "}
                    {isExam
                      ? "education purchase"
                      : isAirtime
                        ? "airtime purchase"
                        : "purchase"}
                  </h3>

                  <p className="mt-1 text-xs leading-relaxed text-[#64748b] dark:text-[#94a3b8]">
                    Please check the details
                    below before continuing.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={
                    closeReview
                  }
                  aria-label="Close review"
                  disabled={
                    purchaseStatus ===
                    "processing"
                  }
                  className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#f1f5f9] text-[#64748b] transition hover:bg-[#e2e8f0] disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#0d1526] dark:text-[#94a3b8]"
                >
                  ×
                </button>

              </div>
            </div>

            {/* DETAILS */}

            <div className="px-5 py-4">

              <div className="rounded-2xl bg-[#f8fafc] px-4 py-2 dark:bg-[#0d1526]">

                {isInternationalAirtime ? (
                  <>
                    <ReviewRow
                      label="Destination country"
                      value={
                        selectedInternationalCountry?.name ||
                        selectedInternationalCountry?.label ||
                        internationalCountry
                      }
                    />

                    <ReviewRow
                      label="Product type"
                      value={
                        selectedInternationalProductType?.name ||
                        selectedInternationalProductType?.label ||
                        internationalProductType
                      }
                    />

                    <ReviewRow
                      label="Operator"
                      value={
                        selectedInternationalOperator?.name ||
                        selectedInternationalOperator?.label ||
                        internationalOperator
                      }
                    />

                    <ReviewRow
                      label="Denomination"
                      value={
                        selectedInternationalVariation?.name ||
                        selectedInternationalVariation?.label ||
                        internationalVariation
                      }
                    />

                    <ReviewRow
                      label="Recipient"
                      value={internationalRecipient}
                    />
                  </>
                ) : isExam ? (
                  <>
                    <ReviewRow
                      label="Exam body"
                      value={
                        service.title
                      }
                    />

                    <ReviewRow
                      label="Service"
                      value={
                        selectedExamProduct?.title ||
                        selectedExamOption
                      }
                    />

                    <ReviewRow
                      label="Quantity"
                      value={
                        educationQuantity
                      }
                    />

                    <ReviewRow
                      label="Order type"
                      value={
                        bulkMode
                          ? "Bulk order"
                          : isJamb
                            ? "Single / Multiple"
                            : "Standard order"
                      }
                    />

                    <ReviewRow
                      label="Price per unit"
                      value={
                        educationUnitPrice !==
                        null
                          ? formatNaira(
                              educationUnitPrice
                            )
                          : "Provider price"
                      }
                    />
                  </>
                ) : (
                  <>
                    <ReviewRow
                      label="Network"
                      value={
                        network
                      }
                    />

                    {isData && (
                      <>
                        <ReviewRow
                          label="Data type"
                          value={
                            selectedDataType?.label ||
                            dataType
                          }
                        />

                        <ReviewRow
                          label="Plan"
                          value={`${selectedPlanObject?.name} • ${selectedPlanObject?.validity}`}
                        />
                      </>
                    )}

                    {isAirtime && (
                      <ReviewRow
                        label="Service"
                        value="Airtime"
                      />
                    )}

                    <ReviewRow
                      label="Recipient"
                      value={
                        isInternationalAirtime
                          ? internationalRecipient
                          : phone
                      }
                    />
                  </>
                )}

              </div>

              {/* TOTAL */}

              <div className="mt-4 rounded-2xl border border-[#bfdbfe] bg-[#f0f6ff] p-4 dark:border-[#294b86] dark:bg-[#101a2d]">

                {isExam ? (
                  <>
                    <div className="flex items-center justify-between gap-4">

                      <div>
                        <p className="text-[10px] font-medium uppercase tracking-wide text-[#64748b] dark:text-[#94a3b8]">
                          Quantity
                        </p>

                        <p className="mt-1 text-lg font-extrabold text-[#0f172a] dark:text-[#e8eeff]">
                          {
                            educationQuantity
                          }
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-[10px] font-medium uppercase tracking-wide text-[#64748b] dark:text-[#94a3b8]">
                          Total
                        </p>

                        <p className="mt-1 text-xl font-extrabold text-[#1e40af] dark:text-[#3b60d4]">
                          {educationTotal !==
                          null
                            ? formatNaira(
                                educationTotal
                              )
                            : "Provider price"}
                        </p>
                      </div>

                    </div>

                    {educationTotal ===
                      null && (
                      <p className="mt-3 border-t border-[#bfdbfe] pt-3 text-[10px] leading-relaxed text-[#64748b] dark:border-[#294b86] dark:text-[#94a3b8]">
                        The final amount
                        will be calculated
                        from the live provider
                        price before the
                        transaction is submitted.
                      </p>
                    )}
                  </>
                ) : (
                  <div className="flex items-center justify-between">

                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-wide text-[#64748b] dark:text-[#94a3b8]">
                        Amount to pay
                      </p>

                      <p className="mt-1 text-xl font-extrabold text-[#1e40af] dark:text-[#3b60d4]">
                        {isData
                          ? selectedPlanObject?.price
                          : selectedAmount}
                      </p>
                    </div>

                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1e40af] text-sm font-black text-white dark:bg-[#3b60d4]">
                      ✓
                    </span>

                  </div>
                )}

              </div>

              <p className="mt-3 text-center text-[10px] leading-relaxed text-[#64748b] dark:text-[#94a3b8]">
                {isExam
                  ? "PINs and tokens will be delivered according to the connected provider's fulfilment response."
                  : "Make sure the recipient details are correct before continuing."}
              </p>

            </div>

            {/* ACTIONS */}

            <div className="flex gap-3 border-t border-[#e2e8f0] px-5 py-4 dark:border-[#1e3a6e]">

              <button
                type="button"
                onClick={
                  editPurchase
                }
                disabled={
                  purchaseStatus ===
                  "processing"
                }
                className="flex-1 cursor-pointer rounded-xl border border-[#cbd5e1] bg-white px-4 py-3 text-sm font-semibold text-[#334155] transition hover:bg-[#f8fafc] disabled:cursor-not-allowed disabled:opacity-50 dark:border-[#475569] dark:bg-[#152040] dark:text-[#cbd5e1]"
              >
                Edit
              </button>

              <button
                type="button"
                onClick={
                  startPurchase
                }
                disabled={
                  purchaseStatus ===
                  "processing"
                }
                className="flex flex-1 cursor-pointer items-center justify-center rounded-xl bg-[#1e40af] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#1d3a9e] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#3b60d4]"
              >
                {purchaseStatus ===
                "processing"
                  ? "Processing..."
                  : "Confirm"}
              </button>

            </div>

          </div>
        </div>
      )}

      {/* ========================================================
          PROCESSING STATE
      ========================================================= */}

      {purchaseStatus ===
        "processing" && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="purchase-processing-title"
        >
          <div className="w-full max-w-sm rounded-3xl border border-[#dbeafe] bg-white p-6 text-center shadow-2xl dark:border-[#1e3a6e] dark:bg-[#152040]">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f0f4ff] dark:bg-[#101a2d]">
              <span className="h-8 w-8 animate-spin rounded-full border-4 border-[#dbeafe] border-t-[#1e40af] dark:border-[#294b86] dark:border-t-[#3b60d4]" />
            </div>

            <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#10b981] dark:text-[#34d399]">
              Processing
            </p>

            <h3
              id="purchase-processing-title"
              className="mt-1 text-lg font-bold text-[#0f172a] dark:text-[#e8eeff]"
            >
              Processing your purchase
            </h3>

            <p className="mt-2 text-xs leading-relaxed text-[#64748b] dark:text-[#94a3b8]">
              Please don't close this window or click the purchase button again.
            </p>

          </div>
        </div>
      )}

      {/* ========================================================
          SUCCESS STATE
      ========================================================= */}

      {purchaseStatus ===
        "success" && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="purchase-success-title"
        >
          <div className="w-full max-w-md overflow-hidden rounded-3xl border border-[#dbeafe] bg-white shadow-2xl dark:border-[#1e3a6e] dark:bg-[#152040]">

            <div className="px-5 py-7 text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#dcfce7] text-2xl font-black text-[#15803d] dark:bg-[#052e16] dark:text-[#4ade80]">
                ✓
              </div>

              <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#10b981] dark:text-[#34d399]">
                Purchase successful
              </p>

              <h3
                id="purchase-success-title"
                className="mt-1 text-xl font-bold text-[#0f172a] dark:text-[#e8eeff]"
              >
                Your request was completed
              </h3>

              <p className="mt-2 text-xs leading-relaxed text-[#64748b] dark:text-[#94a3b8]">
                The TEKSUM backend confirmed this transaction.
              </p>

              <div className="mt-5 rounded-2xl bg-[#f8fafc] px-4 py-2 text-left dark:bg-[#0d1526]">

                <ReviewRow
                  label="Service"
                  value={
                    service.title
                  }
                />

                {isExam && (
                  <>
                    <ReviewRow
                      label="Option"
                      value={
                        selectedExamProduct?.title ||
                        selectedExamOption
                      }
                    />

                    <ReviewRow
                      label="Quantity"
                      value={
                        educationQuantity
                      }
                    />
                  </>
                )}

                {isData && (
                  <ReviewRow
                    label="Plan"
                    value={`${selectedPlanObject?.name || "Data plan"} • ${selectedPlanObject?.validity || ""}`}
                  />
                )}

                {(isInternationalAirtime ||
                  isAirtime ||
                  isData) && (
                  <ReviewRow
                    label="Recipient"
                    value={
                      phone
                    }
                  />
                )}

                <ReviewRow
                  label="Reference"
                  value={
                    transactionReference ||
                    "Not provided"
                  }
                />

                {transactionCode && (
                  <ReviewRow
                    label="Status"
                    value={
                      transactionCode
                    }
                  />
                )}

              </div>

              {transactionMessage && (
                <p className="mt-4 rounded-2xl border border-[#bbf7d0] bg-[#f0fdf4] p-3 text-xs leading-relaxed text-[#166534] dark:border-[#14532d] dark:bg-[#052e16] dark:text-[#86efac]">
                  {transactionMessage}
                </p>
              )}

              <div className="mt-4 rounded-2xl border border-[#bfdbfe] bg-[#f0f6ff] p-4 dark:border-[#294b86] dark:bg-[#101a2d]">

                <p className="text-[10px] font-medium uppercase tracking-wide text-[#64748b] dark:text-[#94a3b8]">
                  Total
                </p>

                <p className="mt-1 text-2xl font-extrabold text-[#1e40af] dark:text-[#3b60d4]">
                  {isExam
                    ? educationTotal !==
                      null
                      ? formatNaira(
                          educationTotal
                        )
                      : "Provider price"
                    : isData
                      ? selectedPlanObject?.price ||
                        "Provider price"
                      : selectedAmount ||
                        "Provider price"}
                </p>

              </div>

            </div>

            <div className="border-t border-[#e2e8f0] px-5 py-4 dark:border-[#1e3a6e]">

              <button
                type="button"
                onClick={
                  finishPurchase
                }
                className="w-full cursor-pointer rounded-xl bg-[#1e40af] px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-[#1d3a9e] dark:bg-[#3b60d4]"
              >
                Done
              </button>

            </div>

          </div>
        </div>
      )}

      {/* ========================================================
          PENDING STATE
      ========================================================= */}

      {purchaseStatus ===
        "pending" && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="purchase-pending-title"
        >
          <div className="w-full max-w-md overflow-hidden rounded-3xl border border-[#dbeafe] bg-white shadow-2xl dark:border-[#1e3a6e] dark:bg-[#152040]">

            <div className="px-5 py-7 text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#fef3c7] text-2xl font-black text-[#b45309] dark:bg-[#451a03] dark:text-[#fbbf24]">
                …
              </div>

              <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#b45309] dark:text-[#fbbf24]">
                Transaction pending
              </p>

              <h3
                id="purchase-pending-title"
                className="mt-1 text-xl font-bold text-[#0f172a] dark:text-[#e8eeff]"
              >
                Your purchase is still processing
              </h3>

              <p className="mt-2 text-xs leading-relaxed text-[#64748b] dark:text-[#94a3b8]">
                The backend has not received a final success or failure result yet. Please do not submit the purchase again.
              </p>

              {transactionReference && (
                <div className="mt-5 rounded-2xl bg-[#f8fafc] px-4 py-2 text-left dark:bg-[#0d1526]">
                  <ReviewRow
                    label="Reference"
                    value={
                      transactionReference
                    }
                  />

                  {transactionCode && (
                    <ReviewRow
                      label="Status"
                      value={
                        transactionCode
                      }
                    />
                  )}
                </div>
              )}

              {transactionMessage && (
                <p className="mt-4 rounded-2xl border border-[#fde68a] bg-[#fffbeb] p-3 text-xs leading-relaxed text-[#92400e] dark:border-[#78350f] dark:bg-[#451a03] dark:text-[#fcd34d]">
                  {transactionMessage}
                </p>
              )}

            </div>

            <div className="border-t border-[#e2e8f0] px-5 py-4 dark:border-[#1e3a6e]">

              <button
                type="button"
                onClick={
                  closePendingState
                }
                className="w-full cursor-pointer rounded-xl bg-[#1e40af] px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-[#1d3a9e] dark:bg-[#3b60d4]"
              >
                Close
              </button>

            </div>

          </div>
        </div>
      )}

      {/* ========================================================
          FAILURE STATE
      ========================================================= */}

      {purchaseStatus ===
        "error" && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="purchase-error-title"
        >
          <div className="w-full max-w-md overflow-hidden rounded-3xl border border-[#dbeafe] bg-white shadow-2xl dark:border-[#1e3a6e] dark:bg-[#152040]">

            <div className="px-5 py-7 text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#fee2e2] text-2xl font-black text-[#dc2626] dark:bg-[#450a0a] dark:text-[#f87171]">
                !
              </div>

              <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#dc2626]">
                Transaction failed
              </p>

              <h3
                id="purchase-error-title"
                className="mt-1 text-xl font-bold text-[#0f172a] dark:text-[#e8eeff]"
              >
                We couldn't complete the purchase
              </h3>

              <p className="mt-2 text-xs leading-relaxed text-[#64748b] dark:text-[#94a3b8]">
                {transactionMessage ||
                  "The TEKSUM backend did not confirm this transaction as successful."}
              </p>

              {(transactionReference ||
                transactionCode) && (
                <div className="mt-5 rounded-2xl bg-[#f8fafc] px-4 py-2 text-left dark:bg-[#0d1526]">
                  {transactionReference && (
                    <ReviewRow
                      label="Reference"
                      value={
                        transactionReference
                      }
                    />
                  )}

                  {transactionCode && (
                    <ReviewRow
                      label="Error code"
                      value={
                        transactionCode
                      }
                    />
                  )}
                </div>
              )}

              <div className="mt-5 rounded-2xl bg-[#f8fafc] p-4 text-left dark:bg-[#0d1526]">

                <p className="text-xs font-bold text-[#334155] dark:text-[#cbd5e1]">
                  What you can do
                </p>

                <ul className="mt-2 space-y-1.5 text-[11px] leading-relaxed text-[#64748b] dark:text-[#94a3b8]">
                  <li>
                    • Check the details you entered.
                  </li>

                  <li>
                    • Try the purchase again.
                  </li>

                  <li>
                    • Contact support if the problem continues.
                  </li>
                </ul>

              </div>

            </div>

            <div className="flex gap-3 border-t border-[#e2e8f0] px-5 py-4 dark:border-[#1e3a6e]">

              <button
                type="button"
                onClick={
                  editFailedPurchase
                }
                className="flex-1 cursor-pointer rounded-xl border border-[#cbd5e1] bg-white px-4 py-3 text-sm font-semibold text-[#334155] transition hover:bg-[#f8fafc] dark:border-[#475569] dark:bg-[#152040] dark:text-[#cbd5e1]"
              >
                Edit
              </button>

              <button
                type="button"
                onClick={
                  retryPurchase
                }
                className="flex-1 cursor-pointer rounded-xl bg-[#1e40af] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#1d3a9e] dark:bg-[#3b60d4]"
              >
                Try Again
              </button>

            </div>

          </div>
        </div>
      )}

    </>
  );
}