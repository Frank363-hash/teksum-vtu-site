export const services = [
  // ── AIRTIME ──────────────────────────────────────────────────────────────
  {
    slug: "airtime",
    title: "Buy Airtime",
    icon: "📱",
    logo: "/services/airtime.png",
    category: "airtime",
    shortDescription:
      "Recharge MTN, Airtel, Glo or 9mobile lines quickly and securely.",
    description:
      "Recharge any Nigerian mobile number with the network and amount you choose. You can buy airtime for yourself or send it to another number.",
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
      "Fast delivery after successful payment",
    ],
    steps: [
      "Select the mobile network",
      "Enter the recipient phone number",
      "Choose a preset amount or enter a custom amount",
      "Review and confirm your purchase",
    ],
  },

  // ── DATA ──────────────────────────────────────────────────────────────────
  {
    slug: "data",
    title: "Buy Data",
    icon: "📶",
    logo: "/services/data.png",
    category: "data",
    shortDescription:
      "Choose your network, data type and the plan that suits you.",
    description:
      "Buy data for MTN, Airtel, Glo and 9mobile. Available data categories and plans may vary by network and provider, with current plans and prices supplied during backend integration.",
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
      "Network-specific data categories",
      "Current plans and prices can be loaded dynamically",
      "Choose the plan that fits your needs",
    ],

    steps: [
      "Select the network",
      "Select a supported data type",
      "Choose an available data plan",
      "Enter the beneficiary number and confirm",
    ],
  },

  // ── JAMB ─────────────────────────────────────────────────────────────────
  {
    slug: "jamb",
    title: "JAMB Services",
    icon: "🎓",
    logo: "/education/jamb.png",
    category: "jamb",
    shortDescription:
      "Purchase supported JAMB UTME and Direct Entry registration PINs.",
    description:
      "Choose the JAMB registration service you need, review the current price and complete your purchase securely from your TEKSUM wallet.",
    formType: "exam",
    provider: "vtpass",
    serviceID: "jamb",

    /*
     * JAMB supports multiple-candidate purchasing in the frontend.
     * The actual provider transaction and final quantity validation
     * will be enforced by the backend.
     */
    bulkPurchase: {
      enabled: true,
      min: 2,
      max: 10,
      label: "Number of candidates",
      quantityLabel: "Candidates",
      helper:
        "Each candidate requires a separate JAMB PIN/order entry.",
    },

    options: [
      {
        id: "utme-no-mock",
        title: "JAMB e-PIN — UTME Without Mock",
        provider: "vtpass",
        fallbackProvider: "vtuafrica",
        status: "available",
        description:
          "JAMB UTME registration PIN without mock examination.",
        bulkEligible: true,
      },
      {
        id: "utme-mock",
        title: "JAMB e-PIN — UTME With Mock",
        provider: "vtpass",
        fallbackProvider: "vtuafrica",
        status: "available",
        description:
          "JAMB UTME registration PIN with mock examination.",
        bulkEligible: false,
      },
      {
        id: "direct-entry",
        title: "JAMB e-PIN — Direct Entry",
        provider: "vtpass",
        fallbackProvider: "vtuafrica",
        status: "available",
        description:
          "JAMB Direct Entry registration PIN.",
        bulkEligible: true,
      },
    ],

    amounts: ["Dynamic — fetched from provider"],
    amountLabel: "JAMB Service",

    features: [
      "UTME without Mock",
      "UTME with Mock",
      "Direct Entry",
      "Multiple-candidate purchase for supported PIN types",
      "Current pricing can be supplied by the connected provider",
    ],

    steps: [
      "Choose the JAMB PIN type",
      "Select the number of candidates where applicable",
      "Review the current price",
      "Confirm your purchase",
    ],
  },

  // ── WAEC ─────────────────────────────────────────────────────────────────
  {
    slug: "waec-result",
    title: "WAEC Result Checker",
    icon: "📄",
    logo: "/education/Waec_logo.png",
    category: "waec",
    shortDescription:
      "Get a WAEC result-checking PIN for result verification.",
    description:
      "Purchase a WAEC result-checking PIN and use it to access supported WASSCE result verification services.",
    formType: "exam",
    provider: "vtpass",
    serviceID: "waec",

    options: [
      {
        id: "result-checker",
        title: "WAEC Result Checker PIN",
        provider: "vtpass",
        status: "available",
        description:
          "Result-checking PIN / scratch card.",
      },
    ],

    amounts: ["Dynamic — fetched from provider"],
    amountLabel: "Result Checker",

    features: [
      "WAEC result-checking service",
      "Current provider pricing",
      "PIN details can be attached to the transaction record",
    ],

    steps: [
      "Select the result-checking service",
      "Enter the required details",
      "Review the current price",
      "Confirm your purchase",
    ],
  },

  {
    slug: "waec-registration",
    title: "WAEC Registration PIN",
    icon: "✏️",
    logo: "/education/Waec_logo.png",
    category: "waec",
    shortDescription:
      "Purchase a WAEC registration PIN for supported candidate categories.",
    description:
      "Choose the available WAEC registration category, review its availability and complete your purchase when the service is supported.",
    formType: "exam",
    provider: "vtpass",
    serviceID: "waec-registration",

    options: [
      {
        id: "external",
        title: "External / Private Candidate (GCE)",
        provider: "vtpass",
        status: "available",
        description:
          "WASSCE registration token/PIN for private candidates.",
      },
      {
        id: "internal",
        title: "Internal / School Candidate",
        provider: null,
        status: "coming-soon",
        description:
          "This option is shown for future availability and is not currently presented as a live provider service.",
      },
    ],

    amounts: ["Dynamic — fetched from provider"],
    amountLabel: "Registration Type",

    features: [
      "Private-candidate/GCE registration",
      "Clear availability status",
      "Provider pricing can be loaded dynamically",
    ],

    steps: [
      "Choose the registration category",
      "Check the availability status",
      "Enter the required candidate details",
      "Review and confirm when available",
    ],
  },

  // ── WAEC VERIFICATION ────────────────────────────────────────────────────
  {
    slug: "waec-verification",
    title: "WAEC Verification PIN",
    icon: "🔎",
    logo: "/education/Waec_logo.png",
    category: "waec",
    shortDescription:
      "Purchase a WAEC verification PIN for supported verification services.",
    description:
      "A separate WAEC verification PIN service for supported verification use cases.",
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
          "Verification PIN service.",
      },
    ],

    amounts: ["Dynamic — fetched from provider"],
    amountLabel: "Verification PIN",

    features: [
      "Separate from the WAEC result-checker PIN",
      "Verification PIN service",
      "Current provider pricing",
    ],

    steps: [
      "Choose the verification PIN",
      "Review the current price",
      "Confirm your purchase",
      "Receive the PIN after successful fulfilment",
    ],
  },

  // ── NECO ─────────────────────────────────────────────────────────────────
  {
    slug: "neco-result",
    title: "NECO Result Checker Token",
    icon: "🎫",
    logo: "/education/neco.png",
    category: "neco",
    shortDescription:
      "Purchase a NECO result-checking token for supported result services.",
    description:
      "Purchase a NECO result-checking token. Internal and external candidate types remain clearly separated in the interface while the provider determines the available product.",
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
      "Provider product determines final availability and pricing",
    ],

    steps: [
      "Choose the candidate type",
      "Review the current token price",
      "Confirm your purchase",
      "Receive the token after successful fulfilment",
    ],
  },

  {
    slug: "neco-registration",
    title: "NECO Registration PIN",
    icon: "📝",
    logo: "/education/neco.png",
    category: "neco",
    shortDescription:
      "Purchase a NECO registration PIN for supported candidates.",
    description:
      "Choose the NECO registration category you need. External/GCE registration is available where supported, while internal registration remains clearly marked until a matching provider product is confirmed.",
    formType: "exam",
    provider: "vtuafrica",
    serviceID: "neco",

    options: [
      {
        id: "external",
        title: "SSCE External / GCE",
        provider: "vtuafrica",
        status: "available",
        description:
          "NECO GCE registration PIN.",
      },
      {
        id: "internal",
        title: "SSCE Internal",
        provider: null,
        status: "coming-soon",
        description:
          "School-based registration; no matching provider PIN product is currently enabled.",
      },
    ],

    amounts: ["Dynamic — fetched from provider"],
    amountLabel: "Registration Type",

    features: [
      "NECO GCE registration PIN",
      "Internal SSCE kept separate from GCE",
      "Clear availability status",
      "Current pricing can be loaded dynamically",
    ],

    steps: [
      "Choose the registration category",
      "Review availability",
      "Enter the required candidate information",
      "Review and confirm when available",
    ],
  },

  // ── NABTEB ────────────────────────────────────────────────────────────────
  {
    slug: "nabteb",
    title: "NABTEB Services",
    icon: "📋",
    logo: "/education/nabteb.png",
    category: "nabteb",
    shortDescription:
      "Purchase supported NABTEB result-checking and GCE registration PINs.",
    description:
      "Choose between NABTEB result checking and GCE registration services, then review the current price before completing your purchase.",
    formType: "exam",
    provider: "vtuafrica",
    serviceID: "nabteb",

    options: [
      {
        id: "result-checker",
        title: "NABTEB Result Checker PIN",
        provider: "vtuafrica",
        productCode: "1",
        status: "available",
        description:
          "NABTEB result-checking PIN.",
      },
      {
        id: "gce-registration",
        title: "NABTEB GCE Registration PIN",
        provider: "vtuafrica",
        productCode: "2",
        status: "available",
        description:
          "NABTEB GCE registration PIN.",
      },
    ],

    amounts: ["Dynamic — fetched from provider"],
    amountLabel: "NABTEB Service",

    features: [
      "NABTEB Result Checker PIN",
      "NABTEB GCE Registration PIN",
      "Provider-backed service options",
      "Current pricing can be supplied by the provider",
    ],

    steps: [
      "Choose the NABTEB service",
      "Review the current price",
      "Enter any required details",
      "Confirm your purchase",
    ],
  },

  // ── NBAIS ─────────────────────────────────────────────────────────────────
  {
    slug: "nbais",
    title: "NBAIS Services",
    icon: "🏫",
    logo: "/education/nbais.png",
    category: "nbais",
    shortDescription:
      "NBAIS registration and result services prepared for future provider support.",
    description:
      "The NBAIS services requested for TEKSUM are displayed with clear availability labels. They remain unavailable for purchase until a supported provider product is confirmed.",
    formType: "exam",
    provider: null,
    serviceID: "nbais",

    options: [
      {
        id: "registration-internal",
        title: "NBAIS Registration — Internal",
        provider: null,
        status: "coming-soon",
        description:
          "Internal registration service requested by the client.",
      },
      {
        id: "registration-external",
        title: "NBAIS Registration — External",
        provider: null,
        status: "coming-soon",
        description:
          "External registration service requested by the client.",
      },
      {
        id: "result-checker",
        title: "NBAIS Result Checker",
        provider: null,
        status: "coming-soon",
        description:
          "Result-checking service requested by the client.",
      },
    ],

    amounts: ["Provider price pending"],
    amountLabel: "NBAIS Service",

    features: [
      "Client-requested NBAIS services",
      "Clear availability status",
      "No unsupported provider product is presented as purchasable",
      "Ready for confirmed provider integration",
    ],

    steps: [
      "Choose the NBAIS service",
      "Check the availability status",
      "Complete the purchase once a supported provider is connected",
    ],
  },

  // ── INTERNET ─────────────────────────────────────────────────────────────
  {
    slug: "internet",
    title: "Internet Subscription",
    icon: "🌐",
    logo: "/services/internet.png",
    category: "internet",
    shortDescription:
      "Choose a supported broadband provider and subscription plan.",
    description:
      "Subscribe to supported Smile and Spectranet internet plans. Your selected provider determines the account details and plans available to you.",
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
      "Provider-specific account details",
      "Current plans and prices can be loaded dynamically",
    ],

    steps: [
      "Select Smile or Spectranet",
      "Enter the provider-specific account or phone number",
      "Choose the current subscription plan",
      "Review and confirm your purchase",
    ],
  },

  // ── ELECTRICITY ───────────────────────────────────────────────────────────
  {
    slug: "electricity",
    title: "Pay Electricity Bill",
    icon: "⚡",
    logo: "/services/electricity.png",
    category: "bills",
    shortDescription:
      "Pay your Nigerian electricity bill using your meter details.",
    description:
      "Choose your electricity provider, select your meter type and enter your meter number to continue with your bill payment.",
    formType: "electricity",
    networks: [],

    providers: [
      {
        name: "Ikeja Electric (IKEDC) — Lagos",
        serviceID: "ikeja-electric",
      },
      {
        name: "Eko Electric (EKEDC) — Lagos",
        serviceID: "eko-electric",
      },
      {
        name: "Abuja Electric (AEDC)",
        serviceID: "abuja-electric",
      },
      {
        name: "Port Harcourt (PHED)",
        serviceID: "phed",
      },
      {
        name: "Enugu Electric (EEDC)",
        serviceID: "enugu-electric",
      },
      {
        name: "Ibadan Electric (IBEDC)",
        serviceID: "ibadan-electric",
      },
      {
        name: "Benin Electric (BEDC)",
        serviceID: "benin-electric",
      },
      {
        name: "Kano Electric (KEDCO)",
        serviceID: "kano-electric",
      },
      {
        name: "Kaduna Electric (KAEDCO)",
        serviceID: "kaduna-electric",
      },
      {
        name: "Jos Electric (JED)",
        serviceID: "jos-electric",
      },
      {
        name: "Aba Electric",
        serviceID: "aba-electric",
      },
      {
        name: "Yola Electric (YEDC)",
        serviceID: "yola-electric",
      },
    ],

    meterTypes: ["Prepaid", "Postpaid"],
    accountLabel: "Meter Number",
    accountPlaceholder: "Enter your meter number",

    amounts: [
      "₦1,000",
      "₦2,000",
      "₦5,000",
      "₦10,000",
      "₦20,000",
      "₦50,000",
    ],

    amountLabel: "Amount",
    provider: "vtpass",

    features: [
      "Prepaid and postpaid support",
      "Multiple Nigerian electricity providers",
      "Token delivery where supported",
      "Transaction and payment record",
    ],

    steps: [
      "Select your electricity provider",
      "Select your meter type",
      "Enter your meter number",
      "Choose your amount and confirm",
    ],
  },

  // ── CABLE TV ──────────────────────────────────────────────────────────────
  {
    slug: "cable",
    title: "Cable Subscription",
    icon: "📺",
    logo: "/services/cable.png",
    category: "bills",
    shortDescription:
      "Renew supported TV and streaming subscriptions in one place.",
    description:
      "Choose your TV provider, enter your smartcard or IUC number and select an available subscription package.",
    formType: "cable",
    networks: [],

    providers: [
      {
        name: "DSTV",
        serviceID: "dstv",
      },
      {
        name: "GOtv",
        serviceID: "gotv",
      },
      {
        name: "StarTimes",
        serviceID: "startimes",
      },
      {
        name: "Showmax",
        serviceID: "showmax",
      },
    ],

    accountLabel: "Smartcard / IUC Number",
    accountPlaceholder: "Enter your smartcard or IUC number",

    amounts: ["Dynamic — fetched from provider"],
    amountLabel: "Package / Bouquet",
    provider: "vtpass",

    features: [
      "DSTV, GOtv, StarTimes and Showmax",
      "Current packages can be loaded dynamically",
      "Provider-confirmed activation",
    ],

    steps: [
      "Select your TV provider",
      "Enter your smartcard or IUC number",
      "Choose the current package",
      "Review and confirm your subscription",
    ],
  },
];

export function getServiceBySlug(slug) {
  return services.find((service) => service.slug === slug);
}

export function getServicesByCategory(category) {
  return services.filter(
    (service) => service.category === category
  );
}

export const serviceCategories = [
  {
    id: "all",
    label: "All Services",
    icon: "✨",
  },
  {
    id: "airtime",
    label: "Airtime",
    icon: "📱",
  },
  {
    id: "data",
    label: "Data",
    icon: "📶",
  },
  {
    id: "jamb",
    label: "JAMB",
    icon: "🎓",
  },
  {
    id: "waec",
    label: "WAEC",
    icon: "📄",
  },
  {
    id: "neco",
    label: "NECO",
    icon: "🎫",
  },
  {
    id: "nabteb",
    label: "NABTEB",
    icon: "📋",
  },
  {
    id: "nbais",
    label: "NBAIS",
    icon: "🏫",
  },
  {
    id: "bills",
    label: "Bills & TV",
    icon: "⚡",
  },
  {
    id: "internet",
    label: "Internet",
    icon: "🌐",
  },
];