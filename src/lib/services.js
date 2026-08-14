export const services = [
 // ── AIRTIME ──────────────────────────────────────────────────────────────
{
  slug: "airtime",
  title: "Buy Airtime",
  icon: "📱",
  category: "airtime",
  shortDescription:
    "Top up any Nigerian network instantly — MTN, Airtel, Glo, and 9mobile.",
  description:
    "Recharge any Nigerian mobile number in seconds. TEKSUM supports the four major Nigerian mobile networks, with provider-backed vending planned through the backend.",
  formType: "telecom",
  networks: ["MTN", "Airtel", "Glo", "9mobile"],
  amounts: [
    "₦50",
    "₦100",
    "₦200",
    "₦500",
    "₦1,000",
    "₦2,000",
    "₦5,000",
  ],
  amountLabel: "Amount",
  provider: "vtpass",
  providers: ["vtpass", "vtuafrica"],
  features: [
    "MTN, Airtel, Glo and 9mobile",
    "Preset amounts plus custom top-up",
    "Buy for yourself or another Nigerian number",
    "Provider-controlled delivery and pricing",
  ],
  steps: [
    "Select the mobile network",
    "Enter the recipient phone number",
    "Choose a preset amount or enter a custom amount",
    "Confirm from your TEKSUM wallet",
  ],
},

// ── DATA ──────────────────────────────────────────────────────────────────
{
  slug: "data",
  title: "Buy Data",
  icon: "📶",
  category: "data",
  shortDescription:
    "Choose a network, data type and provider-backed data plan.",
  description:
    "Buy data on MTN, Airtel, Glo and 9mobile. Data categories are provider-dependent and final plans, prices and variation codes will be loaded dynamically from the connected provider.",
  formType: "data",
  networks: ["MTN", "Airtel", "Glo", "9mobile"],

  dataTypesByNetwork: {
  MTN: [
    {
      id: "regular",
      label: "Regular Data",
      description: "Standard MTN data bundles.",
    },
    {
      id: "sme",
      label: "SME Data",
      description: "MTN SME data bundles.",
    },
    {
      id: "awoof",
      label: "Awoof Data",
      description: "MTN promotional data bundles where available.",
    },
    {
      id: "data-share",
      label: "Data Share",
      description: "MTN data-sharing bundles.",
    },
  ],

  Airtel: [
    {
      id: "regular",
      label: "Regular Data",
      description: "Standard Airtel data bundles.",
    },
    {
      id: "sme",
      label: "SME Data",
      description: "Airtel SME data bundles.",
    },
    {
      id: "corporate",
      label: "Corporate Data",
      description: "Airtel corporate data bundles.",
    },
  ],

  Glo: [
    {
      id: "regular",
      label: "Regular Data",
      description: "Standard Glo data bundles.",
    },
    {
      id: "sme",
      label: "SME Data",
      description: "Glo SME data bundles.",
    },
    {
      id: "corporate",
      label: "Corporate Data",
      description: "Glo corporate data bundles.",
    },
    {
      id: "gifting",
      label: "Gifting Data",
      description: "Glo gifting data bundles.",
    },
  ],

  "9mobile": [
    {
      id: "regular",
      label: "Regular Data",
      description: "Standard 9mobile data bundles.",
    },
    {
      id: "sme",
      label: "SME Data",
      description: "9mobile SME data bundles.",
    },
  ],
},

  amountLabel: "Data Plan",
  provider: "vtpass",
  providers: ["vtpass", "vtuafrica"],

  features: [
    "All four major Nigerian mobile networks",
    "Regular, SME and other provider-backed categories",
    "Data plans and prices loaded dynamically",
    "No invented or stale plan catalogue",
  ],

  steps: [
    "Select the network",
    "Select a supported data type",
    "Choose a live provider plan",
    "Enter the beneficiary number and confirm",
  ],
},
  // ── JAMB ─────────────────────────────────────────────────────────────────
  {
    slug: "jamb",
    title: "JAMB Services",
    icon: "🎓",
    logo: "/exams/jamb.svg",
    category: "jamb",
    shortDescription: "JAMB UTME and Direct Entry PIN vending through supported providers.",
    description: "Buy supported JAMB registration PINs through TEKSUM. The available PIN types are determined by the connected provider catalogue.",
    formType: "exam",
    provider: "vtpass",
    serviceID: "jamb",
options: [
  {
    id: "utme-no-mock",
    title: "JAMB e-PIN — UTME Without Mock",
    provider: "vtpass",
    fallbackProvider: "vtuafrica",
    status: "available",
    description:
      "JAMB UTME registration PIN without mock examination.",
  },
  {
    id: "utme-mock",
    title: "JAMB e-PIN — UTME With Mock",
    provider: "vtpass",
    fallbackProvider: "vtuafrica",
    status: "available",
    description:
      "JAMB UTME registration PIN with mock examination.",
  },
  {
    id: "direct-entry",
    title: "JAMB e-PIN — Direct Entry",
    provider: "vtpass",
    fallbackProvider: "vtuafrica",
    status: "available",
    description:
      "JAMB Direct Entry registration PIN.",
  },
],
    amounts: ["Dynamic — fetched from provider"],
    amountLabel: "JAMB Service",
features: [
  "UTME without Mock",
  "UTME with Mock",
  "Direct Entry",
  "Provider variation codes determine current pricing",
],
    steps: [
      "Choose the JAMB PIN type",
      "Enter any required candidate/profile information",
      "Review the current provider price",
      "Confirm from your TEKSUM wallet",
    ],
  },

  // ── WAEC ─────────────────────────────────────────────────────────────────
  {
    slug: "waec-result",
    title: "WAEC Result Checker",
    icon: "📄",
    logo: "/exams/waec.svg",
    category: "waec",
    shortDescription: "Buy WAEC result checker PINs for WASSCE result verification.",
    description: "Purchase WAEC result checker PINs. The provider exposes WAEC result checker variations through its API.",
    formType: "exam",
    provider: "vtpass",
    serviceID: "waec",
    options: [
      {
        id: "result-checker",
        title: "WAEC Result Checker PIN",
        provider: "vtpass",
        status: "available",
        description: "Result checking PIN / scratch card.",
      },
    ],
    amounts: ["Dynamic — fetched from provider"],
    amountLabel: "Result Checker",
    features: [
      "Official provider-backed WAEC result checker service",
      "Current variation/pricing can be fetched from VTpass",
      "PIN delivery can be attached to the transaction record",
    ],
    steps: [
      "Select the result checker option",
      "Enter the required customer details",
      "Review the current provider price",
      "Confirm from your TEKSUM wallet",
    ],
  },

  {
    slug: "waec-registration",
    title: "WAEC Registration PIN",
    icon: "✏️",
    logo: "/exams/waec.svg",
    category: "waec",
    shortDescription: "WAEC registration PINs for supported candidate categories.",
    description: "Buy WAEC registration PINs through a supported provider. Current public VTpass documentation identifies the WASSCE Private Candidate / GCE registration PIN as the available registration product.",
    formType: "exam",
    provider: "vtpass",
    serviceID: "waec-registration",
    options: [
      {
        id: "external",
        title: "External / Private Candidate (GCE)",
        provider: "vtpass",
        status: "available",
        description: "WASSCE registration token/PIN for private candidates.",
      },
      {
        id: "internal",
        title: "Internal / School Candidate",
        provider: null,
        status: "coming-soon",
        description: "Not exposed as a registration-PIN product in the provider documentation currently verified.",
      },
    ],
    amounts: ["Dynamic — fetched from provider"],
    amountLabel: "Registration Type",
    features: [
      "Private-candidate/GCE registration is supported by the verified provider catalogue",
      "Internal school registration is shown for discoverability but is not falsely presented as API-supported",
      "Provider pricing should be fetched dynamically",
    ],
    steps: [
      "Choose the registration category",
      "Review the availability badge",
      "Enter the required candidate details",
      "Confirm from your TEKSUM wallet when the service is available",
    ],
  },
// ── WAEC VERIFICATION ─────────────────────────────────────────────────────
  {
  slug: "waec-verification",
  title: "WAEC Verification PIN",
  icon: "🔎",
  logo: "/exams/waec.svg",
  category: "waec",
  shortDescription:
    "WAEC verification PIN for supported verification use cases.",
  description:
    "VTU Africa exposes a WAEC Verification PIN product. TEKSUM keeps this separate from the ordinary result-checker PIN.",
  formType: "exam",
  provider: "vtuafrica",
  serviceID: "waec",

  options: [
    {
      id: "verification-pin",
      title: "WAEC Verification PIN",
      provider: "vtuafrica",
      status: "available",
      description:
        "Provider-backed verification PIN product.",
    },
  ],

  amounts: ["Dynamic — fetched from provider"],
  amountLabel: "Verification PIN",

  features: [
    "Separate from the WAEC result-checker PIN",
    "VTU Africa provider product",
    "Dynamic provider pricing",
  ],

  steps: [
    "Choose the verification PIN",
    "Review the current provider price",
    "Confirm from your TEKSUM wallet",
    "Receive the PIN after successful fulfilment",
  ],
},

  // ── NECO ─────────────────────────────────────────────────────────────────
  {
    slug: "neco-result",
    title: "NECO Result Checker Token",
    icon: "🎫",
    logo: "/exams/neco.svg",
    category: "neco",
    shortDescription: "Buy NECO result-checking tokens for supported SSCE result types.",
    description: "Purchase NECO result checker tokens. VTU Africa exposes a NECO Result Checking Token product; the provider API uses one product code rather than separate internal/external token products.",
    formType: "exam",
    provider: "vtuafrica",
    serviceID: "neco",
options: [
  {
    id: "result-token",
    title: "NECO Result Checking Token",
    provider: "vtuafrica",
    status: "available",
    description:
      "Provider-backed NECO result-checking token.",
  },
],
    amounts: ["Dynamic — fetched from provider"],
    amountLabel: "Candidate Type",
    features: [
      "NECO result-checking token",
      "Internal and external candidate choices in the interface",
      "Provider uses a single NECO result-token product code",
      "Current price should be fetched from the provider",
    ],
    steps: [
      "Choose Internal or External",
      "Review the current token price",
      "Confirm payment from your TEKSUM wallet",
      "Receive the token after successful fulfilment",
    ],
  },

  {
    slug: "neco-registration",
    title: "NECO Registration PIN",
    icon: "📝",
    logo: "/exams/neco.svg",
    category: "neco",
    shortDescription: "NECO registration PIN for supported external/private candidates.",
    description: "The verified VTU Africa exam-pin API exposes a NECO GCE Registration PIN. Internal SSCE registration is a school-based process and is not exposed as a matching registration-PIN product in the provider documentation we verified.",
    formType: "exam",
    provider: "vtuafrica",
    serviceID: "neco",
    options: [
      {
        id: "external",
        title: "SSCE External / GCE",
        provider: "vtuafrica",
        status: "available",
        description: "NECO GCE registration PIN.",
      },
      {
        id: "internal",
        title: "SSCE Internal",
        provider: null,
        status: "coming-soon",
        description: "School-based registration; no matching provider PIN product verified.",
      },
    ],
    amounts: ["Dynamic — fetched from provider"],
    amountLabel: "Registration Type",
    features: [
      "NECO GCE registration PIN is exposed by VTU Africa",
      "Internal SSCE is clearly separated instead of being mislabeled as GCE",
      "Pricing should be fetched dynamically",
    ],
    steps: [
      "Choose the registration category",
      "Review availability",
      "Enter required candidate information",
      "Confirm from your TEKSUM wallet when available",
    ],
  },

  // ── NABTEB ────────────────────────────────────────────────────────────────
  {
    slug: "nabteb",
    title: "NABTEB Services",
    icon: "📋",
    logo: "/exams/nabteb.svg",
    category: "nabteb",
    shortDescription: "NABTEB result-checking and GCE registration PIN services.",
    description: "NABTEB examination PIN services exposed by VTU Africa include result checking and GCE registration.",
    formType: "exam",
    provider: "vtuafrica",
    serviceID: "nabteb",
    options: [
      {
        id: "result-checker",
        title: "NABTEB Result Checker PIN",
        provider: "vtuafrica",
        status: "available",
        description: "NABTEB result checking PIN.",
      },
      {
        id: "gce-registration",
        title: "NABTEB GCE Registration PIN",
        provider: "vtuafrica",
        status: "available",
        description: "NABTEB GCE registration PIN.",
      },
    ],
    amounts: ["Dynamic — fetched from provider"],
    amountLabel: "NABTEB Service",
    features: [
      "Result checker PIN",
      "GCE registration PIN",
      "Provider-backed service catalogue",
      "Dynamic pricing ready for API integration",
    ],
    steps: [
      "Choose the NABTEB service",
      "Review the current provider price",
      "Confirm from your TEKSUM wallet",
      "Receive the PIN after successful fulfilment",
    ],
  },

  // ── NBAIS ─────────────────────────────────────────────────────────────────
  {
    slug: "nbais",
    title: "NBAIS Services",
    icon: "🏫",
    logo: "/exams/nbais.svg",
    category: "nbais",
    shortDescription: "NBAIS registration and result-checking services prepared for provider integration.",
    description: "TEKSUM exposes the NBAIS services requested by the client. Current VTPass and VTU Africa documentation reviewed for this build did not expose a confirmed NBAIS API product, so these are marked as coming soon until a provider is confirmed.",
    formType: "exam",
    provider: null,
    serviceID: "nbais",
    options: [
      {
        id: "registration-internal",
        title: "NBAIS Registration — Internal",
        provider: null,
        status: "coming-soon",
        description: "Internal registration service requested by the client.",
      },
      {
        id: "registration-external",
        title: "NBAIS Registration — External",
        provider: null,
        status: "coming-soon",
        description: "External registration service requested by the client.",
      },
      {
        id: "result-checker",
        title: "NBAIS Result Checker",
        provider: null,
        status: "coming-soon",
        description: "Result-checking PIN/token service requested by the client.",
      },
    ],
    amounts: ["Provider price pending"],
    amountLabel: "NBAIS Service",
    features: [
      "Client-requested NBAIS services are visible in the catalogue",
      "No unsupported provider integration is being invented",
      "Ready for a confirmed provider/product code",
    ],
    steps: [
      "Choose the NBAIS service you need",
      "Check the availability badge",
      "Complete the purchase once a supported provider is connected",
    ],
  },

  // ── INTERNET ─────────────────────────────────────────────────────────────
  {
  slug: "internet",
  title: "Internet Subscription",
  icon: "🌐",
  category: "internet",
  shortDescription:
    "Buy Smile and Spectranet broadband plans from one place.",
  description:
    "Subscribe to supported Smile and Spectranet internet plans. The selected provider determines the recipient identifier and live plan catalogue.",
  formType: "internet",

  providers: [
    {
      name: "Smile",
      serviceID: "smile",
      accountLabel: "Smile Account Email",
      accountPlaceholder: "you@example.com",
      accountType: "email",
    },
    {
      name: "Spectranet",
      serviceID: "spectranet",
      accountLabel: "Phone Number",
      accountPlaceholder: "08012345678",
      accountType: "tel",
    },
  ],

  amounts: ["Dynamic — fetched from provider"],
  amountLabel: "Internet Plan",
  provider: "vtpass",

  features: [
    "Smile broadband subscriptions",
    "Spectranet internet plans",
    "Provider-specific recipient details",
    "Live plans and prices should be fetched dynamically",
  ],

  steps: [
    "Select Smile or Spectranet",
    "Enter the provider-specific account or phone number",
    "Choose the current provider plan",
    "Confirm from your TEKSUM wallet",
  ],
},

  // ── ELECTRICITY ───────────────────────────────────────────────────────────
  {
    slug: "electricity",
    title: "Pay Electricity Bill",
    icon: "⚡",
    category: "bills",
    shortDescription: "Pay electricity bills for Nigerian DISCOs.",
    description: "Pay prepaid or postpaid electricity bills from anywhere. Provider data should be used to keep DISCO and service availability current.",
    formType: "electricity",
    networks: [],
    providers: [
      { name: "Ikeja Electric (IKEDC) — Lagos", serviceID: "ikeja-electric" },
      { name: "Eko Electric (EKEDC) — Lagos", serviceID: "eko-electric" },
      { name: "Abuja Electric (AEDC)", serviceID: "abuja-electric" },
      { name: "Port Harcourt (PHED)", serviceID: "phed" },
      { name: "Enugu Electric (EEDC)", serviceID: "enugu-electric" },
      { name: "Ibadan Electric (IBEDC)", serviceID: "ibadan-electric" },
      { name: "Benin Electric (BEDC)", serviceID: "benin-electric" },
      { name: "Kano Electric (KEDCO)", serviceID: "kano-electric" },
      { name: "Kaduna Electric (KAEDCO)", serviceID: "kaduna-electric" },
      { name: "Jos Electric (JED)", serviceID: "jos-electric" },
      { name: "Aba Electric", serviceID: "aba-electric" },
      { name: "Yola Electric (YEDC)", serviceID: "yola-electric" },
    ],
    meterTypes: ["Prepaid", "Postpaid"],
    accountLabel: "Meter Number",
    accountPlaceholder: "Enter your meter number",
    amounts: ["₦1,000", "₦2,000", "₦5,000", "₦10,000", "₦20,000", "₦50,000"],
    amountLabel: "Amount",
    provider: "vtpass",
    features: [
      "Prepaid and postpaid support",
      "Provider-backed DISCO catalogue",
      "Instant token delivery where supported",
      "Receipt/transaction record",
    ],
    steps: [
      "Select your electricity provider",
      "Select meter type",
      "Enter your meter number",
      "Choose amount and confirm from your wallet",
    ],
  },

  // ── CABLE TV ──────────────────────────────────────────────────────────────
  {
    slug: "cable",
    title: "Cable Subscription",
    icon: "📺",
    category: "bills",
    shortDescription: "Renew DSTV, GOtv, StarTimes and Showmax subscriptions.",
    description: "Renew supported TV and streaming subscriptions. Provider variations should supply the current bouquets and prices.",
    formType: "cable",
    networks: [],
    providers: [
      { name: "DSTV", serviceID: "dstv" },
      { name: "GOtv", serviceID: "gotv" },
      { name: "StarTimes", serviceID: "startimes" },
      { name: "Showmax", serviceID: "showmax" },
    ],
    accountLabel: "Smartcard / IUC Number",
    accountPlaceholder: "Enter your smartcard or IUC number",
    amounts: ["Dynamic — fetched from provider"],
    amountLabel: "Package / Bouquet",
    provider: "vtpass",
    features: [
      "DSTV, GOtv, StarTimes and Showmax",
      "Current bouquets can be fetched dynamically",
      "Instant activation where provider confirms success",
    ],
    steps: [
      "Select your TV provider",
      "Enter your smartcard or IUC number",
      "Choose the current package",
      "Confirm from your wallet",
    ],
  },
];

export function getServiceBySlug(slug) {
  return services.find((s) => s.slug === slug);
}

export function getServicesByCategory(category) {
  return services.filter((s) => s.category === category);
}

export const serviceCategories = [
  { id: "all", label: "All Services", icon: "✨" },
  { id: "airtime", label: "Airtime", icon: "📱" },
  { id: "data", label: "Data", icon: "📶" },
  { id: "jamb", label: "JAMB", icon: "🎓" },
  { id: "waec", label: "WAEC", icon: "📄" },
  { id: "neco", label: "NECO", icon: "🎫" },
  { id: "nabteb", label: "NABTEB", icon: "📋" },
  { id: "nbais", label: "NBAIS", icon: "🏫" },
  { id: "bills", label: "Bills & TV", icon: "⚡" },
  { id: "internet", label: "Internet", icon: "🌐" },
];
