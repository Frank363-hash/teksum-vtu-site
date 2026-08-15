"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import ProviderLogo from "@/components/ProviderLogo";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "";

/*
 * ============================================================
 * TEMPORARY DATA PLAN PREVIEW
 * ============================================================
 *
 * These are UI preview values only.
 * Live plans should eventually come from the backend/provider.
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

const EDUCATION_DEFAULT_MIN = 1;
const EDUCATION_DEFAULT_MAX = 10;

const BULK_MIN = 20;
const BULK_MAX = 100;

/*
 * Explicit education bulk rules.
 *
 * These are frontend UX limits only. The backend/provider must
 * validate the real quantity limits before submitting a purchase.
 * NECO Result Token is prepared for bulk ordering, and the NECO
 * GCE/External registration option is prepared for multiple PINs.
 */
const BULK_RULES = {
  "waec-result": {
    min: 20,
    max: 100,
  },
  "waec-registration": {
    min: 1,
    max: 100,
  },
  "neco-result": {
    min: 20,
    max: 100,
  },
  "neco-registration": {
    options: {
      external: {
        min: 1,
        max: 100,
      },
    },
  },
  nabteb: {
    min: 20,
    max: 100,
  },
};

/*
 * ============================================================
 * HELPERS
 * ============================================================
 */

function formatNaira(value) {
  if (value === null || value === undefined || value === "") {
    return "Provider price";
  }

  if (typeof value === "string" && value.includes("₦")) {
    return value;
  }

  const numeric = Number(value);

  if (Number.isNaN(numeric)) {
    return String(value);
  }

  return `₦${numeric.toLocaleString("en-NG")}`;
}

function normalizePhone(value) {
  return String(value || "").replace(/\D/g, "").slice(0, 11);
}

function extractErrorMessage(data, fallback) {
  if (!data) {
    return fallback;
  }

  if (typeof data === "string") {
    return data;
  }

  return (
    data.message ||
    data.error ||
    data.errors?.[0]?.message ||
    data.errors?.[0] ||
    fallback
  );
}

/*
 * ============================================================
 * SMALL UI COMPONENTS
 * ============================================================
 */

function SectionLabel({
  eyebrow,
  title,
  hint,
}) {
  return (
    <div className="mb-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          {eyebrow && (
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#10b981] dark:text-[#34d399]">
              {eyebrow}
            </p>
          )}

          <h3 className="mt-1 text-sm font-bold text-[#0f172a] dark:text-[#e8eeff]">
            {title}
          </h3>
        </div>

        {hint && (
          <span className="text-[11px] text-[#64748b] dark:text-[#94a3b8]">
            {hint}
          </span>
        )}
      </div>
    </div>
  );
}

function ReviewRow({
  label,
  value,
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-[#e2e8f0] py-3 last:border-b-0 dark:border-[#1e293b]">
      <span className="text-xs text-[#64748b] dark:text-[#94a3b8]">
        {label}
      </span>

      <span className="max-w-[65%] text-right text-xs font-semibold text-[#334155] dark:text-[#cbd5e1]">
        {value || "—"}
      </span>
    </div>
  );
}

function NetworkChoice({
  network,
  selected,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`cursor-pointer rounded-xl border px-3 py-3 text-left transition-all ${
        selected
          ? "border-[#1e40af] bg-[#f0f4ff] shadow-sm dark:border-[#3b60d4] dark:bg-[#101a2d]"
          : "border-[#dbeafe] bg-white hover:border-[#1e40af] dark:border-[#1e3a6e] dark:bg-[#152040]"
      }`}
    >
      <div className="flex items-center gap-2.5">
        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[9px] font-black ${
            selected
              ? "bg-[#1e40af] text-white dark:bg-[#3b60d4]"
              : "bg-[#eff6ff] text-[#1e40af] dark:bg-[#101a2d] dark:text-[#7b8ebc]"
          }`}
        >
          {String(network || "")
            .slice(0, 2)
            .toUpperCase()}
        </span>

        <span className="text-xs font-bold text-[#334155] dark:text-[#cbd5e1]">
          {network}
        </span>
      </div>
    </button>
  );
}

function DataTypeCard({
  item,
  selected,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`cursor-pointer rounded-xl border p-3 text-left transition-all ${
        selected
          ? "border-[#1e40af] bg-[#f0f4ff] shadow-sm dark:border-[#3b60d4] dark:bg-[#101a2d]"
          : "border-[#dbeafe] bg-white hover:border-[#1e40af] dark:border-[#1e3a6e] dark:bg-[#152040]"
      }`}
    >
      <div className="flex items-start gap-3">
        <span
          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[9px] font-black ${
            selected
              ? "border-[#1e40af] bg-[#1e40af] text-white dark:border-[#3b60d4] dark:bg-[#3b60d4]"
              : "border-[#cbd5e1] text-transparent dark:border-[#475569]"
          }`}
        >
          ✓
        </span>

        <span className="min-w-0 flex-1">
          <span className="block text-sm font-bold text-[#0f172a] dark:text-[#e8eeff]">
            {item.label}
          </span>

          {item.description && (
            <span className="mt-1 block text-[11px] leading-relaxed text-[#64748b] dark:text-[#94a3b8]">
              {item.description}
            </span>
          )}
        </span>
      </div>
    </button>
  );
}

function DataPlanCard({
  plan,
  selected,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`cursor-pointer rounded-xl border p-3 text-left transition-all ${
        selected
          ? "border-[#1e40af] bg-[#f0f4ff] shadow-sm dark:border-[#3b60d4] dark:bg-[#101a2d]"
          : "border-[#dbeafe] bg-white hover:border-[#1e40af] dark:border-[#1e3a6e] dark:bg-[#152040]"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-[#0f172a] dark:text-[#e8eeff]">
            {plan.name}
          </p>

          <p className="mt-1 text-[11px] text-[#64748b] dark:text-[#94a3b8]">
            {plan.validity}
          </p>
        </div>

        <p className="text-sm font-extrabold text-[#1e40af] dark:text-[#3b60d4]">
          {plan.price}
        </p>
      </div>
    </button>
  );
}

function QuantityControl({
  value,
  min,
  max,
  onChange,
  label,
  helper,
}) {
  function decrease() {
    onChange(Math.max(min, Number(value) - 1));
  }

  function increase() {
    onChange(Math.min(max, Number(value) + 1));
  }

  return (
    <div className="rounded-2xl border border-[#dbeafe] bg-white p-4 dark:border-[#1e3a6e] dark:bg-[#152040]">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-[#0f172a] dark:text-[#e8eeff]">
            {label}
          </p>

          <p className="mt-1 text-[11px] leading-relaxed text-[#64748b] dark:text-[#94a3b8]">
            {helper}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={decrease}
            disabled={value <= min}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-[#cbd5e1] text-lg font-bold text-[#334155] transition hover:bg-[#f8fafc] disabled:cursor-not-allowed disabled:opacity-40 dark:border-[#475569] dark:text-[#cbd5e1]"
            aria-label="Decrease quantity"
          >
            −
          </button>

          <span className="flex h-9 min-w-10 items-center justify-center rounded-lg bg-[#f0f4ff] px-2 text-sm font-extrabold text-[#1e40af] dark:bg-[#101a2d] dark:text-[#3b60d4]">
            {value}
          </span>

          <button
            type="button"
            onClick={increase}
            disabled={value >= max}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-[#cbd5e1] text-lg font-bold text-[#334155] transition hover:bg-[#f8fafc] disabled:cursor-not-allowed disabled:opacity-40 dark:border-[#475569] dark:text-[#cbd5e1]"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

function BulkToggle({
  enabled,
  onChange,
  title = "Bulk order",
  helper = "Purchase multiple PINs or tokens together.",
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      className="flex w-full cursor-pointer items-center justify-between rounded-2xl border border-[#dbeafe] bg-white p-4 text-left dark:border-[#1e3a6e] dark:bg-[#152040]"
    >
      <div>
        <p className="text-sm font-bold text-[#0f172a] dark:text-[#e8eeff]">
          {title}
        </p>

        <p className="mt-1 text-[11px] text-[#64748b] dark:text-[#94a3b8]">
          {helper}
        </p>
      </div>

      <span
        className={`relative h-6 w-11 rounded-full transition ${
          enabled
            ? "bg-[#1e40af] dark:bg-[#3b60d4]"
            : "bg-[#cbd5e1] dark:bg-[#334155]"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
            enabled ? "left-6" : "left-1"
          }`}
        />
      </span>
    </button>
  );
}

/*
 * ============================================================
 * MAIN COMPONENT
 * ============================================================
 */

export default function ServicePurchasePanel({
  service,
}) {
  const isAirtime =
    service.formType === "telecom" &&
    service.slug === "airtime";

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
   * Purchase request state
   */

  const [purchaseStatus, setPurchaseStatus] =
    useState("idle");

  const [purchaseMessage, setPurchaseMessage] =
    useState("");

  const [transactionReference, setTransactionReference] =
    useState("");

  const [isSubmitting, setIsSubmitting] =
    useState(false);

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
        service.dataTypesByNetwork[network] ||
        []
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
      [
        provider,
        service.providers,
      ]
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
      [
        option,
        service.options,
      ]
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
      [
        availableDataTypes,
        dataType,
      ]
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
   * EDUCATION RULES
   * ==========================================================
   */

  const currentBulkRule =
    BULK_RULES[service.slug] || null;

  const selectedEducationOptionKey =
    String(
      selectedExamProduct?.id ||
        selectedExamProduct?.code ||
        selectedExamProduct?.variationCode ||
        ""
    ).toLowerCase();

  const isNecoExternalRegistration =
    service.slug ===
      "neco-registration" &&
    (
      selectedEducationOptionKey.includes(
        "external"
      ) ||
      selectedEducationOptionKey.includes(
        "gce"
      )
    );

  const isBulkEligible =
    Boolean(currentBulkRule) &&
    (
      service.slug !==
        "neco-registration" ||
      isNecoExternalRegistration
    );

  const educationMin =
    bulkMode &&
    isBulkEligible
      ? currentBulkRule?.options
          ?.external?.min ||
        currentBulkRule?.min ||
        BULK_MIN
      : EDUCATION_DEFAULT_MIN;

  const educationMax =
    bulkMode &&
    isBulkEligible
      ? currentBulkRule?.options
          ?.external?.max ||
        currentBulkRule?.max ||
        BULK_MAX
      : EDUCATION_DEFAULT_MAX;

  /*
   * Keep quantity inside the active range.
   */

  function clampEducationQuantity(
    value,
    min = educationMin,
    max = educationMax
  ) {
    const numeric =
      Number(value);

    if (!Number.isFinite(numeric)) {
      return min;
    }

    return Math.min(
      max,
      Math.max(min, numeric)
    );
  }

  /*
   * ==========================================================
   * EDUCATION PRICE
   * ==========================================================
   */

  const educationUnitPrice =
    selectedExamProduct?.unitPrice ??
    selectedExamProduct?.price ??
    selectedExamProduct?.variationAmount ??
    null;

  const parsedEducationUnitPrice =
    educationUnitPrice !== null &&
    educationUnitPrice !== undefined &&
    educationUnitPrice !== ""
      ? Number(
          String(
            educationUnitPrice
          ).replace(/[^\d.]/g, "")
        )
      : null;

  const validEducationPrice =
    Number.isFinite(
      parsedEducationUnitPrice
    )
      ? parsedEducationUnitPrice
      : null;

  const educationTotal =
    validEducationPrice !== null
      ? validEducationPrice *
        educationQuantity
      : null;

  /*
   * ==========================================================
   * AMOUNT
   * ==========================================================
   */

  const selectedAmount =
    customAmount || amount;

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

    setPhone("");
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
      normalizePhone(
        event.target.value
      )
    );
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
   * EDUCATION OPTION CHANGE
   * ==========================================================
   */

  function handleExamOptionChange(
    item
  ) {
    setSelectedExamOption(
      item.id
    );

    setEducationQuantity(1);
    setBulkMode(false);
  }

  /*
   * ==========================================================
   * BULK CHANGE
   * ==========================================================
   */

  function handleBulkChange(
    enabled
  ) {
    if (
      enabled &&
      !isBulkEligible
    ) {
      setBulkMode(false);
      setEducationQuantity(1);
      return;
    }

    setBulkMode(enabled);

    if (enabled) {
      const rule =
        currentBulkRule;

      const min =
        rule?.options?.external?.min ||
        rule?.min ||
        BULK_MIN;

      setEducationQuantity(
        min
      );
    } else {
      setEducationQuantity(1);
    }
  }

  /*
   * ==========================================================
   * QUANTITY CHANGE
   * ==========================================================
   */

  function handleEducationQuantityChange(
    value
  ) {
    setEducationQuantity(
      clampEducationQuantity(
        value
      )
    );
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

  const canContinue =
    isAirtime
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
                    provider &&
                      account
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
   * PURCHASE PAYLOAD
   * ==========================================================
   */

  function buildPurchasePayload() {
    const payload = {
      serviceSlug:
        service.slug,
      serviceId:
        service.id,
      network:
        network || undefined,
      phone:
        phone || undefined,
      amount:
        selectedAmount || undefined,
      provider:
        provider || undefined,
      account:
        account || undefined,
      meterType:
        meterType || undefined,
      option:
        option || undefined,
      examOption:
        selectedExamOption ||
        undefined,
      quantity:
        isExam
          ? educationQuantity
          : 1,
      bulk:
        isExam
          ? bulkMode
          : false,
      dataType:
        dataType || undefined,
      dataTypeId:
        selectedDataType?.id ||
        undefined,
      dataTypeLabel:
        selectedDataType?.label ||
        undefined,
      plan:
        selectedPlan ||
        undefined,
      planId:
        selectedPlan ||
        undefined,
      planName:
        selectedPlanObject?.name ||
        undefined,
      planValidity:
        selectedPlanObject?.validity ||
        undefined,
    };

    return Object.fromEntries(
      Object.entries(payload).filter(
        ([, value]) =>
          value !== undefined &&
          value !== ""
      )
    );
  }

  /*
   * ==========================================================
   * REVIEW
   * ==========================================================
   */

  function openReview() {
    if (
      canContinue &&
      !isSubmitting
    ) {
      setPurchaseStatus(
        "idle"
      );
      setPurchaseMessage("");
      setShowReview(true);
    }
  }

  function closeReview() {
    if (!isSubmitting) {
      setShowReview(false);
    }
  }

  function editPurchase() {
    setShowReview(false);

    setTimeout(() => {
      let targetId =
        "airtime-recipient-phone";

      if (isData) {
        targetId =
          "data-recipient-phone";
      }

      if (isExam) {
        targetId =
          "education-options";
      }

      document
        .getElementById(
          targetId
        )
        ?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
    }, 100);
  }

  /*
   * ==========================================================
   * PURCHASE SUBMISSION
   * ==========================================================
   */

  async function submitPurchase() {
    if (
      !canContinue ||
      isSubmitting
    ) {
      return;
    }

    setIsSubmitting(true);
    setPurchaseStatus(
      "submitting"
    );
    setPurchaseMessage("");
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
            },
            credentials:
              "include",
            body: JSON.stringify(
              buildPurchasePayload()
            ),
          }
        );

      const contentType =
        response.headers.get(
          "content-type"
        ) || "";

      const data =
        contentType.includes(
          "application/json"
        )
          ? await response.json()
          : await response.text();

      if (!response.ok) {
        throw new Error(
          extractErrorMessage(
            data,
            "The purchase request could not be completed."
          )
        );
      }

      const status =
        String(
          data?.status ||
            data?.transaction?.status ||
            data?.data?.status ||
            ""
        ).toLowerCase();

      const reference =
        data?.reference ||
        data?.transactionReference ||
        data?.transaction?.reference ||
        data?.data?.reference ||
        data?.data?.transactionReference ||
        "";

      setTransactionReference(
        reference
      );

      setPurchaseMessage(
        data?.message ||
          "The purchase request was received successfully."
      );

      if (
        [
          "success",
          "successful",
          "completed",
          "complete",
          "delivered",
        ].includes(status) ||
        data?.success === true
      ) {
        setPurchaseStatus(
          "success"
        );
      } else if (
        [
          "pending",
          "processing",
          "in-progress",
          "initiated",
        ].includes(status)
      ) {
        setPurchaseStatus(
          "pending"
        );
      } else {
        setPurchaseStatus(
          "success"
        );
      }

      setShowReview(false);
    } catch (error) {
      setPurchaseStatus(
        "error"
      );

      setPurchaseMessage(
        error?.message ||
          "Something went wrong while processing your purchase."
      );

      setShowReview(false);
    } finally {
      setIsSubmitting(false);
    }
  }

  /*
   * ==========================================================
   * RETRY / FINISH
   * ==========================================================
   */

  function retryPurchase() {
    setPurchaseStatus(
      "idle"
    );

    setPurchaseMessage(
      ""
    );

    setTransactionReference(
      ""
    );

    setTimeout(() => {
      setShowReview(true);
    }, 50);
  }

  function editFailedPurchase() {
    setPurchaseStatus(
      "idle"
    );

    setPurchaseMessage(
      ""
    );

    setTransactionReference(
      ""
    );

    setTimeout(() => {
      editPurchase();
    }, 50);
  }

  function finishPurchase() {
    setPurchaseStatus(
      "idle"
    );

    setPurchaseMessage(
      ""
    );

    setTransactionReference(
      ""
    );
  }

  /*
   * ============================================================
   * RENDER
   * ============================================================
   */

  return (
    <>
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

          {(isAirtime ||
            isData) && (
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
                  className="w-full rounded-xl border border-[#dbeafe] bg-white px-4 py-3 text-sm text-[#0f172a] outline-none transition placeholder:text-[#94a3b8] focus:border-[#1e40af] focus:ring-2 focus:ring-[#1e40af]/15 dark:border-[#1e3a6e] dark:bg-[#0d1526] dark:text-[#e8eeff]"
                />

                {phone.length > 0 &&
                  phone.length !==
                    11 && (
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
                    className="w-full rounded-xl border border-[#dbeafe] bg-white px-4 py-3 text-sm text-[#0f172a] outline-none transition placeholder:text-[#94a3b8] focus:border-[#1e40af] focus:ring-2 focus:ring-[#1e40af]/15 dark:border-[#1e3a6e] dark:bg-[#0d1526] dark:text-[#e8eeff]"
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
                      Available data types will appear
                      based on the network you choose.
                    </p>
                  </div>
                ) : availableDataTypes.length >
                  0 ? (
                  <div
                    key={`data-types-${network}`}
                    className="grid grid-cols-1 gap-2.5 sm:grid-cols-2"
                  >
                    {availableDataTypes.map(
                      (item) => (
                        <DataTypeCard
                          key={`${network}-${item.id}`}
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
                            key={plan.id}
                            plan={plan}
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
                  className="w-full rounded-xl border border-[#dbeafe] bg-white px-4 py-3 text-sm text-[#0f172a] outline-none transition placeholder:text-[#94a3b8] focus:border-[#1e40af] focus:ring-2 focus:ring-[#1e40af]/15 dark:border-[#1e3a6e] dark:bg-[#0d1526] dark:text-[#e8eeff]"
                />

                {phone.length > 0 &&
                  phone.length !==
                    11 && (
                    <p className="mt-2 text-xs font-medium text-[#dc2626]">
                      Enter an 11-digit Nigerian
                      phone number.
                    </p>
                  )}

              </div>
            </>
          )}

          {/* ==================================================
              EDUCATION
          =================================================== */}

          {isExam && (
            <div
              id="education-options"
              className="space-y-5"
            >

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
                          disabled={disabled}
                          onClick={() =>
                            handleExamOptionChange(
                              item
                            )
                          }
                          className={`w-full cursor-pointer rounded-2xl border p-4 text-left transition-all ${
                            selected
                              ? "border-[#1e40af] bg-[#f0f4ff] shadow-sm dark:border-[#3b60d4] dark:bg-[#101a2d]"
                              : disabled
                                ? "cursor-not-allowed border-[#dbeafe] bg-white opacity-50 dark:border-[#1e3a6e] dark:bg-[#152040]"
                                : "border-[#dbeafe] bg-white hover:border-[#1e40af] hover:shadow-sm dark:border-[#1e3a6e] dark:bg-[#152040]"
                          }`}
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
                                  {item.title}
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

                              {item.description && (
                                <span className="mt-1 block text-xs leading-relaxed text-[#64748b] dark:text-[#94a3b8]">
                                  {item.description}
                                </span>
                              )}

                            </span>

                          </div>

                        </button>
                      );
                    }
                  )}

                </div>

              </div>

              {selectedExamProduct && (
                <>
                  <div>

                    <SectionLabel
                      eyebrow="Step 2"
                      title={
                        service.slug ===
                        "jamb"
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
                        handleEducationQuantityChange
                      }
                      label={
                        service.slug ===
                        "jamb"
                          ? "Candidates"
                          : isNecoExternalRegistration
                            ? "Registration PINs"
                            : "PINs / Tokens"
                      }
                      helper={
                        service.slug ===
                        "jamb"
                          ? "Each candidate will require a separate JAMB PIN/order entry."
                          : isNecoExternalRegistration
                            ? "Purchase multiple NECO GCE / External registration PINs in one order."
                            : "Purchase more than one PIN or token in the same order."
                      }
                    />

                  </div>

                  {isBulkEligible && (
                    <div>

                      <BulkToggle
                        enabled={
                          bulkMode
                        }
                        onChange={
                          handleBulkChange
                        }
                        title={
                          isNecoExternalRegistration
                            ? "Bulk registration"
                            : "Bulk order"
                        }
                        helper={
                          isNecoExternalRegistration
                            ? "Purchase multiple NECO GCE / External registration PINs together."
                            : "Purchase multiple PINs or tokens together."
                        }
                      />

                      {bulkMode && (
                        <p className="mt-2 text-[10px] leading-relaxed text-[#64748b] dark:text-[#94a3b8]">
                          Bulk quantity is currently prepared
                          for {educationMin}–{educationMax}
                          units. Final limits and pricing will
                          be confirmed by the connected provider
                          before production.
                        </p>
                      )}

                    </div>
                  )}

                  <div className="rounded-2xl border border-[#bfdbfe] bg-[#f0f6ff] p-4 dark:border-[#294b86] dark:bg-[#101a2d]">

                    <div className="flex items-center justify-between gap-4">

                      <div>
                        <p className="text-[10px] font-medium uppercase tracking-wide text-[#64748b] dark:text-[#94a3b8]">
                          Unit price
                        </p>

                        <p className="mt-1 text-sm font-bold text-[#0f172a] dark:text-[#e8eeff]">
                          {validEducationPrice !==
                          null
                            ? formatNaira(
                                validEducationPrice
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
                          {educationQuantity}
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

                    {validEducationPrice ===
                      null && (
                      <p className="mt-3 border-t border-[#bfdbfe] pt-3 text-[10px] leading-relaxed text-[#64748b] dark:border-[#294b86] dark:text-[#94a3b8]">
                        The provider price is intentionally
                        not hard-coded. Once the backend returns
                        the live variation price, TEKSUM will
                        calculate the total automatically.
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
                        className={`cursor-pointer rounded-2xl border p-3 text-left transition-all ${
                          provider ===
                          item.serviceID
                            ? "border-[#1e40af] bg-[#f0f4ff] shadow-sm dark:border-[#3b60d4] dark:bg-[#101a2d]"
                            : "border-[#dbeafe] bg-white hover:border-[#1e40af] dark:border-[#1e3a6e] dark:bg-[#152040]"
                        }`}
                      >

                        <div className="flex items-center gap-3">

                          <ProviderLogo
                            name={
                              item.name
                            }
                          />

                          <div className="min-w-0">
                            <p className="text-sm font-bold text-[#0f172a] dark:text-[#e8eeff]">
                              {item.name}
                            </p>

                            <p className="mt-0.5 text-[11px] text-[#64748b] dark:text-[#94a3b8]">
                              Internet subscription
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
                  onChange={(event) =>
                    setAccount(
                      event.target.value
                    )
                  }
                  type={
                    selectedProvider?.accountType ||
                    "text"
                  }
                  placeholder={
                    accountPlaceholder
                  }
                  className="w-full rounded-xl border border-[#dbeafe] bg-white px-4 py-3 text-sm text-[#0f172a] outline-none transition placeholder:text-[#94a3b8] focus:border-[#1e40af] focus:ring-2 focus:ring-[#1e40af]/15 dark:border-[#1e3a6e] dark:bg-[#0d1526] dark:text-[#e8eeff]"
                />

              </div>

              <div>

                <SectionLabel
                  eyebrow="Step 3"
                  title="Internet plan"
                />

                <div className="rounded-2xl border border-dashed border-[#cbd5e1] bg-[#f8fafc] p-4 dark:border-[#334155] dark:bg-[#0d1526]">

                  <p className="text-sm font-semibold text-[#334155] dark:text-[#cbd5e1]">
                    Plans will load from the provider
                  </p>

                  <p className="mt-1 text-xs leading-relaxed text-[#64748b] dark:text-[#94a3b8]">
                    Live Smile and Spectranet plans will be
                    retrieved during backend integration.
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
                        className={`cursor-pointer rounded-2xl border p-3 text-left transition-all ${
                          provider ===
                          item.serviceID
                            ? "border-[#1e40af] bg-[#f0f4ff] shadow-sm dark:border-[#3b60d4] dark:bg-[#101a2d]"
                            : "border-[#dbeafe] bg-white hover:border-[#1e40af] dark:border-[#1e3a6e] dark:bg-[#152040]"
                        }`}
                      >

                        <div className="flex items-center gap-2.5">

                          <ProviderLogo
                            name={
                              item.name
                            }
                            compact
                          />

                          <span className="text-xs font-bold text-[#334155] dark:text-[#cbd5e1]">
                            {item.name}
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
                          className={`cursor-pointer rounded-xl border p-3 text-xs font-bold transition-all ${
                            meterType ===
                            item
                              ? "border-[#1e40af] bg-[#f0f4ff] text-[#1e40af] dark:border-[#3b60d4] dark:bg-[#101a2d] dark:text-[#3b60d4]"
                              : "border-[#dbeafe] bg-white text-[#334155] hover:border-[#1e40af] dark:border-[#1e3a6e] dark:bg-[#152040] dark:text-[#cbd5e1]"
                          }`}
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
                  onChange={(event) =>
                    setAccount(
                      event.target.value
                    )
                  }
                  type="text"
                  placeholder={
                    service.accountPlaceholder
                  }
                  className="w-full rounded-xl border border-[#dbeafe] bg-white px-4 py-3 text-sm text-[#0f172a] outline-none transition placeholder:text-[#94a3b8] focus:border-[#1e40af] focus:ring-2 focus:ring-[#1e40af]/15 dark:border-[#1e3a6e] dark:bg-[#0d1526] dark:text-[#e8eeff]"
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
                    onChange={(event) =>
                      setAmount(
                        event.target.value
                      )
                    }
                    className="w-full rounded-xl border border-[#dbeafe] bg-white px-4 py-3 text-sm text-[#0f172a] outline-none transition focus:border-[#1e40af] focus:ring-2 focus:ring-[#1e40af]/15 dark:border-[#1e3a6e] dark:bg-[#0d1526] dark:text-[#e8eeff]"
                  >
                    <option value="">
                      Select amount
                    </option>

                    {service.amounts?.map(
                      (item) => (
                        <option
                          key={item}
                          value={item}
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
                      Bouquets will load from the provider
                    </p>

                    <p className="mt-1 text-xs leading-relaxed text-[#64748b] dark:text-[#94a3b8]">
                      Current packages and prices will be
                      retrieved during backend integration.
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
                          key={item.id}
                          type="button"
                          disabled={disabled}
                          onClick={() =>
                            setOption(
                              item.id
                            )
                          }
                          className={`w-full cursor-pointer rounded-2xl border p-4 text-left transition-all ${
                            option ===
                            item.id
                              ? "border-[#1e40af] bg-[#f0f4ff] shadow-sm dark:border-[#3b60d4] dark:bg-[#101a2d]"
                              : disabled
                                ? "cursor-not-allowed border-[#dbeafe] bg-white opacity-50 dark:border-[#1e3a6e] dark:bg-[#152040]"
                                : "border-[#dbeafe] bg-white hover:border-[#1e40af] dark:border-[#1e3a6e] dark:bg-[#152040]"
                          }`}
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
                                  {item.title}
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

                              {item.description && (
                                <span className="mt-1 block text-xs leading-relaxed text-[#64748b] dark:text-[#94a3b8]">
                                  {item.description}
                                </span>
                              )}

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

          <div>

            {canContinue ? (
              isAirtime ||
              isData ||
              isExam ? (
                <button
                  type="button"
                  onClick={
                    openReview
                  }
                  disabled={
                    isSubmitting
                  }
                  className="w-full cursor-pointer rounded-xl bg-[#1e40af] py-3.5 text-center text-sm font-semibold text-white transition hover:bg-[#1d3a9e] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#3b60d4] dark:hover:bg-[#2d50c0]"
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

          </div>

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
                    Please check the details below
                    before continuing.
                  </p>

                </div>

                <button
                  type="button"
                  onClick={
                    closeReview
                  }
                  disabled={
                    isSubmitting
                  }
                  aria-label="Close review"
                  className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#f1f5f9] text-[#64748b] transition hover:bg-[#e2e8f0] disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#0d1526] dark:text-[#94a3b8]"
                >
                  ×
                </button>

              </div>

            </div>

            <div className="px-5 py-4">

              <div className="rounded-2xl bg-[#f8fafc] px-4 py-2 dark:bg-[#0d1526]">

                {isExam ? (
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
                          : "Standard order"
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
                          value={
                            selectedPlanObject
                              ? `${selectedPlanObject.name} • ${selectedPlanObject.validity}`
                              : selectedPlan
                          }
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
                        phone
                      }
                    />
                  </>
                )}

              </div>

              <div className="mt-4 rounded-2xl border border-[#bfdbfe] bg-[#f0f6ff] p-4 dark:border-[#294b86] dark:bg-[#101a2d]">

                {isExam ? (
                  <>
                    <div className="flex items-center justify-between gap-4">

                      <div>
                        <p className="text-[10px] font-medium uppercase tracking-wide text-[#64748b] dark:text-[#94a3b8]">
                          Quantity
                        </p>

                        <p className="mt-1 text-lg font-extrabold text-[#0f172a] dark:text-[#e8eeff]">
                          {educationQuantity}
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
                        The final amount will be calculated
                        from the live provider price before the
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
                          ? selectedPlanObject?.price ||
                            "Provider price"
                          : formatNaira(
                              selectedAmount
                            )}
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

            <div className="flex gap-3 border-t border-[#e2e8f0] px-5 py-4 dark:border-[#1e3a6e]">

              <button
                type="button"
                onClick={
                  editPurchase
                }
                disabled={
                  isSubmitting
                }
                className="flex-1 cursor-pointer rounded-xl border border-[#cbd5e1] bg-white px-4 py-3 text-sm font-semibold text-[#334155] transition hover:bg-[#f8fafc] disabled:cursor-not-allowed disabled:opacity-50 dark:border-[#475569] dark:bg-[#152040] dark:text-[#cbd5e1]"
              >
                Edit
              </button>

              <button
                type="button"
                onClick={
                  submitPurchase
                }
                disabled={
                  isSubmitting
                }
                className="flex flex-1 items-center justify-center rounded-xl bg-[#1e40af] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#1d3a9e] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#3b60d4]"
              >
                {isSubmitting
                  ? "Processing..."
                  : "Confirm"}
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
                Your purchase is being processed
              </h3>

              <p className="mt-2 text-xs leading-relaxed text-[#64748b] dark:text-[#94a3b8]">
                {purchaseMessage ||
                  "The provider has received the request, but the final transaction status is not available yet."}
              </p>

              {transactionReference && (
                <div className="mt-5 rounded-2xl bg-[#f8fafc] px-4 py-3 text-left dark:bg-[#0d1526]">
                  <ReviewRow
                    label="Reference"
                    value={
                      transactionReference
                    }
                  />
                </div>
              )}

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
                Your purchase was completed
              </h3>

              <p className="mt-2 text-xs leading-relaxed text-[#64748b] dark:text-[#94a3b8]">
                The TEKSUM backend has returned a
                successful purchase response.
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
                    value={
                      selectedPlanObject
                        ? `${selectedPlanObject.name} • ${selectedPlanObject.validity}`
                        : selectedPlan
                    }
                  />
                )}

                {(isAirtime ||
                  isData) && (
                  <ReviewRow
                    label="Recipient"
                    value={
                      phone
                    }
                  />
                )}

                {transactionReference && (
                  <ReviewRow
                    label="Reference"
                    value={
                      transactionReference
                    }
                  />
                )}

              </div>

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
                      : selectedAmount
                        ? formatNaira(
                            selectedAmount
                          )
                        : "Provider price"}
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
                {purchaseMessage ||
                  "The backend or provider returned an unsuccessful transaction response."}
              </p>

              {transactionReference && (
                <div className="mt-5 rounded-2xl bg-[#f8fafc] px-4 py-2 text-left dark:bg-[#0d1526]">
                  <ReviewRow
                    label="Reference"
                    value={
                      transactionReference
                    }
                  />
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
                    • Contact support if the problem
                    continues.
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