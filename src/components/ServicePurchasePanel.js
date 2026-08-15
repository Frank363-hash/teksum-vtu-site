"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import ProviderLogo from "@/components/ProviderLogo";
import { useAuth } from "@/context/AuthContext";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

const DATA_PLAN_PREVIEW = [
  { id: "preview-1gb-30", name: "1GB", validity: "30 Days", price: "₦350" },
  { id: "preview-2gb-30", name: "2GB", validity: "30 Days", price: "₦700" },
  { id: "preview-3gb-30", name: "3GB", validity: "30 Days", price: "₦1,000" },
  { id: "preview-5gb-30", name: "5GB", validity: "30 Days", price: "₦1,500" },
  { id: "preview-10gb-30", name: "10GB", validity: "30 Days", price: "₦2,800" },
  { id: "preview-20gb-30", name: "20GB", validity: "30 Days", price: "₦5,000" },
];

const EDUCATION_DEFAULT_MIN = 1;
const EDUCATION_DEFAULT_MAX = 10;
const BULK_MIN = 20;
const BULK_MAX = 100;

const BULK_ELIGIBLE_SLUGS = [
  "waec-result",
  "waec-verification",
  "neco-result",
  "nabteb",
];

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

function parseCurrency(value) {
  if (typeof value === "number") return value;
  if (!value) return null;

  const numeric = Number(String(value).replace(/[^\d.]/g, ""));
  return Number.isFinite(numeric) ? numeric : null;
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

function NetworkChoice({ network, selected, onClick }) {
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
            {network === "9mobile" ? "9mobile" : `${network} Nigeria`}
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

function DataTypeCard({ item, selected, onClick }) {
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

function DataPlanCard({ plan, selected, onClick }) {
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
          onClick={() => onChange(Math.max(min, value - 1))}
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
          onClick={() => onChange(Math.min(max, value + 1))}
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl bg-[#1e40af] text-xl font-semibold text-white transition hover:bg-[#1d3a9e] disabled:cursor-not-allowed disabled:opacity-40 dark:bg-[#3b60d4]"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
    </div>
  );
}

function BulkToggle({ enabled, onChange }) {
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
            Bulk order
          </p>

          <p className="mt-1 text-[11px] leading-relaxed text-[#64748b] dark:text-[#94a3b8]">
            Purchase multiple PINs or tokens in one order.
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
              enabled ? "left-6" : "left-1"
            }`}
          />
        </span>
      </div>
    </button>
  );
}

function ReviewRow({ label, value, highlight = false }) {
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
        {value || "—"}
      </span>
    </div>
  );
}

export default function ServicePurchasePanel({
  service,
  isAuthenticated: propIsAuthenticated = false,
  accessToken: propAccessToken = null,
}) {
  const auth = useAuth();

  const isAuthenticated =
    auth?.isAuthenticated ?? propIsAuthenticated;

  const accessToken =
    auth?.accessToken || propAccessToken;

  const isAirtime =
    service.formType === "telecom" &&
    service.slug === "airtime";

  const isData = service.formType === "data";
  const isExam = service.formType === "exam";
  const isInternet = service.formType === "internet";
  const isElectricity = service.formType === "electricity";
  const isCable = service.formType === "cable";

  const hasOptions =
    Array.isArray(service.options) &&
    service.options.length > 0;

  const [network, setNetwork] = useState("");
  const [dataType, setDataType] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [provider, setProvider] = useState("");
  const [option, setOption] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [account, setAccount] = useState("");
  const [meterType, setMeterType] = useState("");

  const [selectedExamOption, setSelectedExamOption] = useState("");
  const [educationQuantity, setEducationQuantity] = useState(1);
  const [bulkMode, setBulkMode] = useState(false);

  const [showReview, setShowReview] = useState(false);

  const [purchaseStatus, setPurchaseStatus] = useState("idle");
  const [transactionReference, setTransactionReference] = useState("");
  const [transactionMessage, setTransactionMessage] = useState("");
  const [transactionCode, setTransactionCode] = useState("");

  useEffect(() => {
    if (auth?.loading || !isAuthenticated) return;

    try {
      const raw = sessionStorage.getItem("teksum_pending_purchase");
      if (!raw) return;

      const pending = JSON.parse(raw);

      if (!pending || pending.service !== service.slug) return;

      setNetwork(pending.network || "");
      setDataType(pending.dataType || "");
      setSelectedPlan(pending.plan || "");
      setProvider(pending.provider || "");
      setOption(pending.option || "");
      setPhone(pending.phone || "");
      setAmount(pending.amount || "");
      setCustomAmount("");
      setAccount(pending.account || "");
      setMeterType(pending.meterType || "");
      setSelectedExamOption(pending.examOption || "");
      setEducationQuantity(
        Number(pending.quantity) > 0
          ? Number(pending.quantity)
          : 1
      );
      setBulkMode(Boolean(pending.bulkMode));
      setPurchaseStatus("idle");
      setTransactionReference("");
      setTransactionMessage("");
      setTransactionCode("");
      setShowReview(true);
    } catch (error) {
      console.error("Unable to restore pending purchase:", error);
    }
  }, [auth?.loading, isAuthenticated, service.slug]);

  const availableDataTypes = useMemo(() => {
    if (!network || !service.dataTypesByNetwork) return [];

    return service.dataTypesByNetwork[network] || [];
  }, [network, service.dataTypesByNetwork]);

  const selectedProvider = useMemo(
    () =>
      service.providers?.find(
        (item) => item.serviceID === provider
      ),
    [provider, service.providers]
  );

  const selectedOption = useMemo(
    () =>
      service.options?.find(
        (item) => item.id === option
      ),
    [option, service.options]
  );

  const selectedDataType = useMemo(
    () =>
      availableDataTypes.find(
        (item) => item.id === dataType
      ),
    [availableDataTypes, dataType]
  );

  const selectedPlanObject = useMemo(
    () =>
      DATA_PLAN_PREVIEW.find(
        (item) => item.id === selectedPlan
      ),
    [selectedPlan]
  );

  const selectedExamProduct = useMemo(
    () =>
      service.options?.find(
        (item) => item.id === selectedExamOption
      ),
    [service.options, selectedExamOption]
  );

  const isJamb =
    isExam && service.slug === "jamb";

  const isBulkEligible =
    BULK_ELIGIBLE_SLUGS.includes(service.slug) &&
    !isJamb;

  const educationMin = bulkMode
    ? BULK_MIN
    : EDUCATION_DEFAULT_MIN;

  const educationMax = bulkMode
    ? BULK_MAX
    : EDUCATION_DEFAULT_MAX;

  const educationUnitPrice = parseCurrency(
    selectedExamProduct?.unitPrice ??
      selectedExamProduct?.price ??
      selectedExamProduct?.variationAmount
  );

  const educationTotal =
    educationUnitPrice !== null
      ? educationUnitPrice * educationQuantity
      : null;

  const selectedAmount =
    customAmount || amount;

  function handleBulkChange(enabled) {
    setBulkMode(enabled);
    setEducationQuantity(enabled ? BULK_MIN : 1);
  }

  function handleNetworkChange(value) {
    setNetwork(value);

    if (isData) {
      setDataType("");
      setSelectedPlan("");
    }
  }

  function handleDataTypeChange(value) {
    setDataType(value);
    setSelectedPlan("");
  }

  function handlePhoneChange(event) {
    setPhone(
      event.target.value
        .replace(/\D/g, "")
        .slice(0, 11)
    );
  }

  function handleCustomAmountChange(event) {
    const value = event.target.value.replace(/\D/g, "");

    setCustomAmount(value);
    setAmount("");
  }

  const examCanContinue =
    isExam &&
    Boolean(
      selectedExamOption &&
        selectedExamProduct?.status === "available"
    );

  const canContinue = isAirtime
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
          ? Boolean(provider && account)
          : isElectricity
            ? Boolean(
                provider &&
                  meterType &&
                  account &&
                  amount
              )
            : isCable
              ? Boolean(provider && account)
              : hasOptions
                ? Boolean(
                    selectedOption?.status ===
                      "available"
                  )
                : true;

  const accountLabel = isInternet
    ? selectedProvider?.accountLabel ||
      "Account / Phone Number"
    : service.accountLabel;

  const accountPlaceholder = isInternet
    ? selectedProvider?.accountPlaceholder ||
      "Enter your details"
    : service.accountPlaceholder;

  function openReview() {
    if (!canContinue) return;

    setPurchaseStatus("idle");
    setShowReview(true);
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
      let targetId = "airtime-recipient-phone";

      if (isData) {
        targetId = "data-recipient-phone";
      }

      if (isExam) {
        targetId = "education-options";
      }

      document
        .getElementById(targetId)
        ?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
    }, 100);
  }

  function buildPurchasePayload() {
    return {
      service: service.slug,
      serviceTitle: service.title,

      network: network || null,
      phone: phone || null,

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

  async function startPurchase() {
    if (
      !canContinue ||
      purchaseStatus === "processing"
    ) {
      return;
    }

    if (!isAuthenticated || !accessToken) {
      try {
        sessionStorage.setItem(
          "teksum_pending_purchase",
          JSON.stringify(buildPurchasePayload())
        );
      } catch {}

      window.location.href =
        `/login?redirect=${encodeURIComponent(
          window.location.pathname +
            window.location.search
        )}`;

      return;
    }

    setPurchaseStatus("processing");
    setTransactionMessage("");
    setTransactionCode("");
    setTransactionReference("");

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/services/purchase`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(
            buildPurchasePayload()
          ),
        }
      );

      let result = {};

      try {
        result = await response.json();
      } catch {
        result = {};
      }

      const data = result.data || {};

      const backendStatus = String(
        result.status ||
          result.transactionStatus ||
          data.status ||
          ""
      ).toLowerCase();

      const reference =
        result.reference ||
        result.transactionReference ||
        result.transactionId ||
        data.reference ||
        data.transactionReference ||
        data.transactionId ||
        "";

      const message =
        result.message ||
        result.error ||
        data.message ||
        data.error ||
        "";

      const code =
        result.code ||
        result.statusCode ||
        data.code ||
        "";

      setTransactionReference(reference);
      setTransactionMessage(message);
      setTransactionCode(code);

      if (
        response.ok &&
        [
          "success",
          "successful",
          "completed",
        ].includes(backendStatus)
      ) {
        setTransactionMessage(
          message ||
            "Your transaction was completed successfully."
        );

        setPurchaseStatus("success");
        return;
      }

      if (
        backendStatus === "pending" ||
        backendStatus === "processing" ||
        backendStatus === "queued"
      ) {
        setTransactionMessage(
          message ||
            "Your transaction is still being processed."
        );

        setPurchaseStatus("pending");
        return;
      }

      setTransactionMessage(
        message ||
          "We couldn't complete this transaction."
      );

      setPurchaseStatus("error");
    } catch (error) {
      console.error(
        "Purchase request failed:",
        error
      );

      setTransactionReference("");
      setTransactionCode("NETWORK_ERROR");
      setTransactionMessage(
        "We couldn't reach the TEKSUM server. Please check your connection and try again."
      );

      setPurchaseStatus("error");
    }
  }

  function retryPurchase() {
    setPurchaseStatus("idle");
    setTransactionReference("");
    setTransactionMessage("");
    setTransactionCode("");
    setShowReview(true);
  }

  function finishPurchase() {
    setPurchaseStatus("idle");
    setShowReview(false);
    setTransactionReference("");
    setTransactionMessage("");
    setTransactionCode("");

    try {
      sessionStorage.removeItem(
        "teksum_pending_purchase"
      );
    } catch {}
  }

  function editFailedPurchase() {
    setPurchaseStatus("idle");
    setTransactionReference("");
    setTransactionMessage("");
    setTransactionCode("");
    setShowReview(false);
  }

  function closePendingState() {
    setPurchaseStatus("idle");
    setShowReview(false);
  }

  return (
    <>
      <div className="rounded-2xl border border-[#dbeafe] bg-white p-6 shadow-md dark:border-[#1e3a6e] dark:bg-[#152040] lg:sticky lg:top-24 lg:self-start">
        <h2 className="text-lg font-bold text-[#0f172a] dark:text-[#e8eeff]">
          Quick Purchase
        </h2>

        <p className="mt-1 text-sm leading-relaxed text-[#475569] dark:text-[#7b8ebc]">
          Choose your options below and review your purchase before continuing.
        </p>

        <div className="mt-6 space-y-6">
          {(isAirtime || isData) && (
            <div>
              <SectionLabel
                eyebrow="Step 1"
                title="Choose network"
                hint="4 major networks"
              />

              <div className="grid grid-cols-2 gap-2.5">
                {service.networks?.map((item) => (
                  <NetworkChoice
                    key={item}
                    network={item}
                    selected={network === item}
                    onClick={() =>
                      handleNetworkChange(item)
                    }
                  />
                ))}
              </div>
            </div>
          )}

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
                  onChange={handlePhoneChange}
                  type="tel"
                  inputMode="numeric"
                  maxLength={11}
                  placeholder="08012345678"
                  className={inputClass}
                />

                {phone.length > 0 &&
                  phone.length !== 11 && (
                    <p className="mt-2 text-xs font-medium text-[#dc2626]">
                      Enter an 11-digit Nigerian phone number.
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
                  {service.amounts?.map((item) => {
                    const active =
                      amount === item &&
                      !customAmount;

                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => {
                          setAmount(item);
                          setCustomAmount("");
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
                  })}
                </div>

                <div className="mt-3">
                  <input
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    type="text"
                    inputMode="numeric"
                    placeholder="Or enter a custom amount"
                    className={inputClass}
                  />
                </div>
              </div>
            </>
          )}

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
                      Available data types will appear based on the network you choose.
                    </p>
                  </div>
                ) : availableDataTypes.length > 0 ? (
                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {availableDataTypes.map((item) => (
                      <DataTypeCard
                        key={item.id}
                        item={item}
                        selected={dataType === item.id}
                        onClick={() =>
                          handleDataTypeChange(item.id)
                        }
                      />
                    ))}
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

              {network && dataType && (
                <div>
                  <SectionLabel
                    eyebrow="Step 3"
                    title="Choose data plan"
                    hint={
                      selectedPlan
                        ? "Plan selected"
                        : "Select one"
                    }
                  />

                  <p className="mb-3 text-[11px] text-[#64748b] dark:text-[#94a3b8]">
                    {network} •{" "}
                    {selectedDataType?.label}
                  </p>

                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {DATA_PLAN_PREVIEW.map((plan) => (
                      <DataPlanCard
                        key={plan.id}
                        plan={plan}
                        selected={
                          selectedPlan === plan.id
                        }
                        onClick={() =>
                          setSelectedPlan(plan.id)
                        }
                      />
                    ))}
                  </div>

                  <p className="mt-3 text-[10px] leading-relaxed text-[#64748b] dark:text-[#94a3b8]">
                    Preview plans are temporary UI data. Live plans and prices will eventually come from the TEKSUM backend.
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
                  onChange={handlePhoneChange}
                  type="tel"
                  inputMode="numeric"
                  maxLength={11}
                  placeholder="08012345678"
                  className={inputClass}
                />

                {phone.length > 0 &&
                  phone.length !== 11 && (
                    <p className="mt-2 text-xs font-medium text-[#dc2626]">
                      Enter an 11-digit Nigerian phone number.
                    </p>
                  )}
              </div>
            </>
          )}

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
                  {service.options?.map((item) => {
                    const disabled =
                      item.status !== "available";

                    const selected =
                      selectedExamOption === item.id;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        disabled={disabled}
                        onClick={() => {
                          setSelectedExamOption(item.id);
                          setEducationQuantity(1);
                          setBulkMode(false);
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

                            <span className="mt-1 block text-xs leading-relaxed text-[#64748b] dark:text-[#94a3b8]">
                              {item.description}
                            </span>
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

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
                      value={educationQuantity}
                      min={educationMin}
                      max={educationMax}
                      onChange={setEducationQuantity}
                      label={
                        isJamb
                          ? "Candidates"
                          : "PINs / Tokens"
                      }
                      helper={
                        isJamb
                          ? "Each candidate will require a separate JAMB PIN/order entry."
                          : "Purchase more than one PIN or token in the same order."
                      }
                    />
                  </div>

                  {isBulkEligible && (
                    <div>
                      <BulkToggle
                        enabled={bulkMode}
                        onChange={handleBulkChange}
                      />

                      {bulkMode && (
                        <p className="mt-2 text-[10px] leading-relaxed text-[#64748b] dark:text-[#94a3b8]">
                          Bulk quantity is currently prepared as 20–100 units. Final limits and bulk pricing will be confirmed by the connected provider.
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
                          {educationUnitPrice !== null
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
                          {educationTotal !== null
                            ? formatNaira(
                                educationTotal
                              )
                            : "Calculated at checkout"}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {isInternet && (
            <>
              <div>
                <SectionLabel
                  eyebrow="Step 1"
                  title="Choose internet provider"
                />

                <div className="grid grid-cols-2 gap-2.5">
                  {service.providers?.map((item) => (
                    <button
                      key={item.serviceID}
                      type="button"
                      onClick={() => {
                        setProvider(item.serviceID);
                        setAccount("");
                      }}
                      className={choiceClass(
                        provider === item.serviceID
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <ProviderLogo
                          name={item.name}
                        />

                        <div>
                          <p className="text-sm font-bold text-[#0f172a] dark:text-[#e8eeff]">
                            {item.name}
                          </p>

                          <p className="mt-0.5 text-[11px] text-[#64748b] dark:text-[#94a3b8]">
                            Internet subscription
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <SectionLabel
                  eyebrow="Step 2"
                  title={accountLabel || "Account details"}
                />

                <input
                  value={account}
                  onChange={(e) =>
                    setAccount(e.target.value)
                  }
                  type={
                    selectedProvider?.accountType ||
                    "text"
                  }
                  placeholder={accountPlaceholder}
                  className={inputClass}
                />
              </div>

              <div className="rounded-2xl border border-dashed border-[#cbd5e1] bg-[#f8fafc] p-4 dark:border-[#334155] dark:bg-[#0d1526]">
                <p className="text-sm font-semibold text-[#334155] dark:text-[#cbd5e1]">
                  Plans will load from the provider
                </p>

                <p className="mt-1 text-xs leading-relaxed text-[#64748b] dark:text-[#94a3b8]">
                  Live provider plans will be retrieved during backend integration.
                </p>
              </div>
            </>
          )}

          {(isElectricity || isCable) && (
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
                  {service.providers?.map((item) => (
                    <button
                      key={item.serviceID}
                      type="button"
                      onClick={() =>
                        setProvider(
                          item.serviceID
                        )
                      }
                      className={choiceClass(
                        provider === item.serviceID
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <ProviderLogo
                          name={item.name}
                          compact
                        />

                        <span className="text-xs font-bold text-[#334155] dark:text-[#cbd5e1]">
                          {item.name}
                        </span>
                      </div>
                    </button>
                  ))}
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
                            setMeterType(item)
                          }
                          className={choiceClass(
                            meterType === item
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
                  onChange={(e) =>
                    setAccount(e.target.value)
                  }
                  type="text"
                  placeholder={
                    service.accountPlaceholder
                  }
                  className={inputClass}
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
                    onChange={(e) =>
                      setAmount(e.target.value)
                    }
                    className={inputClass}
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
                <div className="rounded-2xl border border-dashed border-[#cbd5e1] bg-[#f8fafc] p-4 dark:border-[#334155] dark:bg-[#0d1526]">
                  <p className="text-sm font-semibold text-[#334155] dark:text-[#cbd5e1]">
                    Bouquets will load from the provider
                  </p>

                  <p className="mt-1 text-xs leading-relaxed text-[#64748b] dark:text-[#94a3b8]">
                    Current packages and prices will be retrieved during backend integration.
                  </p>
                </div>
              )}
            </>
          )}

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
                  {service.options.map((item) => {
                    const disabled =
                      item.status !==
                      "available";

                    return (
                      <button
                        key={item.id}
                        type="button"
                        disabled={disabled}
                        onClick={() =>
                          setOption(item.id)
                        }
                        className={`w-full ${choiceClass(
                          option === item.id,
                          disabled
                        )}`}
                      >
                        <div className="flex items-start gap-3">
                          <span
                            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-black ${
                              option === item.id
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
                                    ? "bg-[#f1f5f9] text-[#64748b]"
                                    : "bg-[#dcfce7] text-[#15803d]"
                                }`}
                              >
                                {disabled
                                  ? "Coming soon"
                                  : "Available"}
                              </span>
                            </span>

                            <span className="mt-1 block text-xs leading-relaxed text-[#64748b] dark:text-[#94a3b8]">
                              {item.description}
                            </span>
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

          {canContinue ? (
            <button
              type="button"
              onClick={openReview}
              className="w-full cursor-pointer rounded-xl bg-[#1e40af] py-3.5 text-center text-sm font-semibold text-white transition hover:bg-[#1d3a9e] dark:bg-[#3b60d4]"
            >
              Continue to Purchase
            </button>
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

      {showReview && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-md overflow-hidden rounded-3xl border border-[#dbeafe] bg-white shadow-2xl dark:border-[#1e3a6e] dark:bg-[#152040]">
            <div className="border-b border-[#e2e8f0] px-5 py-5 dark:border-[#1e3a6e]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#10b981] dark:text-[#34d399]">
                    Final review
                  </p>

                  <h3 className="mt-1 text-lg font-bold text-[#0f172a] dark:text-[#e8eeff]">
                    Confirm your{" "}
                    {isExam
                      ? "education purchase"
                      : isAirtime
                        ? "airtime purchase"
                        : "purchase"}
                  </h3>

                  <p className="mt-1 text-xs leading-relaxed text-[#64748b] dark:text-[#94a3b8]">
                    Please check the details below before continuing.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeReview}
                  disabled={
                    purchaseStatus ===
                    "processing"
                  }
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f1f5f9] text-[#64748b] disabled:opacity-50 dark:bg-[#0d1526]"
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
                      value={service.title}
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
                      value={educationQuantity}
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
                    {network && (
                      <ReviewRow
                        label="Network"
                        value={network}
                      />
                    )}

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
                          value={`${selectedPlanObject?.name || "Data plan"} • ${selectedPlanObject?.validity || ""}`}
                        />
                      </>
                    )}

                    {isAirtime && (
                      <ReviewRow
                        label="Service"
                        value="Airtime"
                      />
                    )}

                    {(isAirtime ||
                      isData) && (
                      <ReviewRow
                        label="Recipient"
                        value={phone}
                      />
                    )}

                    {isElectricity && (
                      <>
                        <ReviewRow
                          label="Provider"
                          value={
                            selectedProvider?.name
                          }
                        />

                        <ReviewRow
                          label="Meter type"
                          value={meterType}
                        />

                        <ReviewRow
                          label={
                            service.accountLabel ||
                            "Account"
                          }
                          value={account}
                        />
                      </>
                    )}

                    {isCable && (
                      <>
                        <ReviewRow
                          label="Provider"
                          value={
                            selectedProvider?.name
                          }
                        />

                        <ReviewRow
                          label={
                            service.accountLabel ||
                            "Account"
                          }
                          value={account}
                        />
                      </>
                    )}
                  </>
                )}
              </div>

              <div className="mt-4 rounded-2xl border border-[#bfdbfe] bg-[#f0f6ff] p-4 dark:border-[#294b86] dark:bg-[#101a2d]">
                <p className="text-[10px] font-medium uppercase tracking-wide text-[#64748b] dark:text-[#94a3b8]">
                  Amount to pay
                </p>

                <p className="mt-1 text-xl font-extrabold text-[#1e40af] dark:text-[#3b60d4]">
                  {isExam
                    ? educationTotal !== null
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

              <p className="mt-3 text-center text-[10px] leading-relaxed text-[#64748b] dark:text-[#94a3b8]">
                Make sure the recipient and service details are correct before continuing.
              </p>
            </div>

            <div className="flex gap-3 border-t border-[#e2e8f0] px-5 py-4 dark:border-[#1e3a6e]">
              <button
                type="button"
                onClick={editPurchase}
                disabled={
                  purchaseStatus ===
                  "processing"
                }
                className="flex-1 rounded-xl border border-[#cbd5e1] bg-white px-4 py-3 text-sm font-semibold text-[#334155] disabled:opacity-50 dark:border-[#475569] dark:bg-[#152040] dark:text-[#cbd5e1]"
              >
                Edit
              </button>

              <button
                type="button"
                onClick={startPurchase}
                disabled={
                  purchaseStatus ===
                  "processing"
                }
                className="flex flex-1 items-center justify-center rounded-xl bg-[#1e40af] px-4 py-3 text-sm font-semibold text-white disabled:opacity-60 dark:bg-[#3b60d4]"
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

      {purchaseStatus === "processing" && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-3xl border border-[#dbeafe] bg-white p-6 text-center shadow-2xl dark:border-[#1e3a6e] dark:bg-[#152040]">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f0f4ff] dark:bg-[#101a2d]">
              <span className="h-8 w-8 animate-spin rounded-full border-4 border-[#dbeafe] border-t-[#1e40af] dark:border-[#294b86] dark:border-t-[#3b60d4]" />
            </div>

            <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#10b981] dark:text-[#34d399]">
              Processing
            </p>

            <h3 className="mt-1 text-lg font-bold text-[#0f172a] dark:text-[#e8eeff]">
              Processing your purchase
            </h3>

            <p className="mt-2 text-xs leading-relaxed text-[#64748b] dark:text-[#94a3b8]">
              Please don't close this window or click the purchase button again.
            </p>
          </div>
        </div>
      )}

      {purchaseStatus === "success" && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm">
          <div className="w-full max-w-md overflow-hidden rounded-3xl border border-[#dbeafe] bg-white shadow-2xl dark:border-[#1e3a6e] dark:bg-[#152040]">
            <div className="px-5 py-7 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#dcfce7] text-2xl font-black text-[#15803d] dark:bg-[#052e16] dark:text-[#4ade80]">
                ✓
              </div>

              <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#10b981] dark:text-[#34d399]">
                Purchase successful
              </p>

              <h3 className="mt-1 text-xl font-bold text-[#0f172a] dark:text-[#e8eeff]">
                Your request was completed
              </h3>

              <p className="mt-2 text-xs leading-relaxed text-[#64748b] dark:text-[#94a3b8]">
                The TEKSUM backend confirmed this transaction successfully.
              </p>

              <div className="mt-5 rounded-2xl bg-[#f8fafc] px-4 py-2 text-left dark:bg-[#0d1526]">
                <ReviewRow
                  label="Service"
                  value={service.title}
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
                      value={educationQuantity}
                    />
                  </>
                )}

                {isData && (
                  <ReviewRow
                    label="Plan"
                    value={`${selectedPlanObject?.name || "Data plan"} • ${selectedPlanObject?.validity || ""}`}
                  />
                )}

                {(isAirtime ||
                  isData) && (
                  <ReviewRow
                    label="Recipient"
                    value={phone}
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
                    value={transactionCode}
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
                    ? educationTotal !== null
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
                onClick={finishPurchase}
                className="w-full rounded-xl bg-[#1e40af] px-4 py-3.5 text-sm font-semibold text-white dark:bg-[#3b60d4]"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {purchaseStatus === "pending" && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm">
          <div className="w-full max-w-md overflow-hidden rounded-3xl border border-[#dbeafe] bg-white shadow-2xl dark:border-[#1e3a6e] dark:bg-[#152040]">
            <div className="px-5 py-7 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#fef3c7] text-2xl font-black text-[#b45309] dark:bg-[#451a03] dark:text-[#fbbf24]">
                …
              </div>

              <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#b45309] dark:text-[#fbbf24]">
                Transaction pending
              </p>

              <h3 className="mt-1 text-xl font-bold text-[#0f172a] dark:text-[#e8eeff]">
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
                      value={transactionCode}
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
                onClick={closePendingState}
                className="w-full rounded-xl bg-[#1e40af] px-4 py-3.5 text-sm font-semibold text-white dark:bg-[#3b60d4]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {purchaseStatus === "error" && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm">
          <div className="w-full max-w-md overflow-hidden rounded-3xl border border-[#dbeafe] bg-white shadow-2xl dark:border-[#1e3a6e] dark:bg-[#152040]">
            <div className="px-5 py-7 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#fee2e2] text-2xl font-black text-[#dc2626] dark:bg-[#450a0a] dark:text-[#f87171]">
                !
              </div>

              <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#dc2626]">
                Transaction failed
              </p>

              <h3 className="mt-1 text-xl font-bold text-[#0f172a] dark:text-[#e8eeff]">
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
                      value={transactionCode}
                    />
                  )}
                </div>
              )}

              <div className="mt-5 rounded-2xl bg-[#f8fafc] p-4 text-left dark:bg-[#0d1526]">
                <p className="text-xs font-bold text-[#334155] dark:text-[#cbd5e1]">
                  What you can do
                </p>

                <ul className="mt-2 space-y-1.5 text-[11px] leading-relaxed text-[#64748b] dark:text-[#94a3b8]">
                  <li>• Check the details you entered.</li>
                  <li>• Try the purchase again.</li>
                  <li>• Contact support if the problem continues.</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-3 border-t border-[#e2e8f0] px-5 py-4 dark:border-[#1e3a6e]">
              <button
                type="button"
                onClick={editFailedPurchase}
                className="flex-1 rounded-xl border border-[#cbd5e1] bg-white px-4 py-3 text-sm font-semibold text-[#334155] dark:border-[#475569] dark:bg-[#152040] dark:text-[#cbd5e1]"
              >
                Edit
              </button>

              <button
                type="button"
                onClick={retryPurchase}
                className="flex-1 rounded-xl bg-[#1e40af] px-4 py-3 text-sm font-semibold text-white dark:bg-[#3b60d4]"
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