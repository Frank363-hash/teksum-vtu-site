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
      "Recharge any Nigerian mobile number with the network and amount you choose. Buy airtime for yourself or send it to family, friends or another number.",
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
      "Buy data for MTN, Airtel, Glo and 9mobile. Choose from the available data categories and plans for your selected network.",
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
      "A range of plans to suit different needs",
      "Choose the plan that works best for you",
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
      "Choose the JAMB registration service you need, review the price shown and complete your purchase securely from your TEKSUM wallet.",
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

    amounts: ["Dynamic — current price"],
    amountLabel: "JAMB Service",

    features: [
      "UTME without Mock",
      "UTME with Mock",
      "Direct Entry",
      "Multiple-candidate purchase for supported PIN types",
      "Secure purchase from your TEKSUM wallet",
    ],

    steps: [
      "Choose the JAMB PIN type",
      "Select the number of candidates where applicable",
      "Review the price shown",
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
          "PIN for checking supported WAEC examination results.",
      },
    ],

    amounts: ["Dynamic — current price"],
    amountLabel: "Result Checker",

    features: [
      "WAEC result-checking service",
      "Simple and convenient purchase",
      "Secure delivery after successful payment",
    ],

    steps: [
      "Select the result-checking service",
      "Enter the required details",
      "Review the price shown",
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
      "Choose the WAEC registration category you need, check its availability and complete your purchase when the service is available.",
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
          "School-based registration option that is not currently available.",
      },
    ],

    amounts: ["Dynamic — current price"],
    amountLabel: "Registration Type",

    features: [
      "Private-candidate/GCE registration",
      "Clear availability status",
      "Convenient registration purchase",
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
      "Get a WAEC verification PIN for supported verification services quickly and conveniently through your TEKSUM wallet.",
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
          "PIN for supported WAEC verification services.",
      },
    ],

    amounts: ["Dynamic — current price"],
    amountLabel: "Verification PIN",

    features: [
      "Separate from the WAEC result-checker PIN",
      "Convenient verification PIN purchase",
      "Secure delivery after successful payment",
    ],

    steps: [
      "Choose the verification PIN",
      "Review the price shown",
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
      "Purchase a NECO result-checking token for supported result services. Available options are clearly displayed so you can choose the service that matches your needs.",
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
          "Token for checking supported NECO examination results.",
      },
    ],

    amounts: ["Dynamic — current price"],
    amountLabel: "Candidate Type",

    features: [
      "NECO result-checking token",
      "Clear service information",
      "Convenient purchase from your TEKSUM wallet",
    ],

    steps: [
      "Choose the candidate type",
      "Review the token price",
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
      "Choose the NECO registration category you need, review its availability and complete your purchase when the service is available.",
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
          "School-based registration option that is not currently available.",
      },
    ],

    amounts: ["Dynamic — current price"],
    amountLabel: "Registration Type",

    features: [
      "NECO GCE registration PIN",
      "Clear registration categories",
      "Clear availability status",
      "Convenient purchase from your TEKSUM wallet",
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
      "Choose the NABTEB service you need, review the price shown and complete your purchase securely from your TEKSUM wallet.",
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
          "PIN for checking supported NABTEB examination results.",
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

    amounts: ["Dynamic — current price"],
    amountLabel: "NABTEB Service",

    features: [
      "NABTEB Result Checker PIN",
      "NABTEB GCE Registration PIN",
      "Clear service options",
      "Secure purchase from your TEKSUM wallet",
    ],

    steps: [
      "Choose the NABTEB service",
      "Review the price shown",
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
      "Access NBAIS registration and result services as they become available.",
    description:
      "Explore the NBAIS services planned for TEKSUM. Each option clearly shows its current availability so you always know what can be purchased.",
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
          "Internal registration service that is not currently available.",
      },
      {
        id: "registration-external",
        title: "NBAIS Registration — External",
        provider: null,
        status: "coming-soon",
        description:
          "External registration service that is not currently available.",
      },
      {
        id: "result-checker",
        title: "NBAIS Result Checker",
        provider: null,
        status: "coming-soon",
        description:
          "Result-checking service that is not currently available.",
      },
    ],

    amounts: ["Current price"],
    amountLabel: "NBAIS Service",

    features: [
      "NBAIS registration services",
      "NBAIS result-checking service",
      "Clear availability status",
      "More options will appear as they become available",
    ],

    steps: [
      "Choose the NBAIS service",
      "Check the availability status",
      "Complete your purchase when the service is available",
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
      "Subscribe to Smile and Spectranet internet plans. Select your service, enter your account details and choose the plan that suits you.",
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

    amounts: ["Dynamic — current price"],
    amountLabel: "Internet Plan",
    provider: "vtpass",

    features: [
      "Smile broadband subscriptions",
      "Spectranet internet plans",
      "Simple account verification",
      "Choose from available subscription plans",
    ],

    steps: [
      "Select Smile or Spectranet",
      "Enter your account or phone number",
      "Choose the available subscription plan",
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
      "Choose your electricity provider, select your meter type and enter your meter number to make a secure electricity payment.",
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
      "Easy-to-follow payment process",
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
      "Choose your TV service, enter your smartcard or IUC number and select an available subscription package.",
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
    accountPlaceholder:
      "Enter your smartcard or IUC number",

    amounts: ["Dynamic — current price"],
    amountLabel: "Package / Bouquet",
    provider: "vtpass",

    features: [
      "DSTV, GOtv, StarTimes and Showmax",
      "Choose from available packages",
      "Convenient subscription renewal",
      "Secure payment from your TEKSUM wallet",
    ],

    steps: [
      "Select your TV service",
      "Enter your smartcard or IUC number",
      "Choose the available package",
      "Review and confirm your subscription",
    ],
  },
];

export function getServiceBySlug(slug) {
  return services.find(
    (service) => service.slug === slug
  );
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