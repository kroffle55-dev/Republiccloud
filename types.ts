
export type Language = 'ko' | 'en';

export interface TranslationSchema {
  nav: {
    products: string;
    solutions: string;
    status: string;
    docs: string;
    login: string;
    signup: string;
    console: string;
  };
  productsDropdown: {
    computing: string;
    cloudCompute: string;
    cloudComputeDesc: string;
    bareMetal: string;
    bareMetalDesc: string;
    autoScaling: string;
    autoScalingDesc: string;
    storage: string;
    hdd: string;
    hddDesc: string;
    nas: string;
    nasDesc: string;
    network: string;
    firewall: string;
    firewallDesc: string;
    ddos: string;
    ddosDesc: string;
    loadBalancing: string;
    loadBalancingDesc: string;
  };
  solutionsDropdown: {
    industries: string;
    finance: string;
    ecommerce: string;
    gaming: string;
    gamingDesc: string;
    financeDesc: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
    secondary: string;
  };
  features: {
    title: string;
    items: Array<{
      title: string;
      desc: string;
    }>;
  };
  pricing: {
    title: string;
    subtitle: string;
    services: Array<{
      title: string;
      subtitle: string;
      description: string;
      details: string[];
      iconType: 'lock' | 'shield' | 'scale';
      cta: string;
    }>;
  };
  infrastructure: {
    title: string;
    subtitle: string;
    stats: Array<{ label: string; value: string; }>;
    cardTitle: string;
    cardDesc: string;
  };
  global: {
    title: string;
    subtitle: string;
    items: Array<{ title: string; desc: string; }>;
  };
  auth: {
    loginTitle: string;
    signupTitle: string;
    email: string;
    password: string;
    confirmPassword: string;
    forgotPassword: string;
    noAccount: string;
    hasAccount: string;
    socialLogin: string;
    welcome: string;
    createAccount: string;
    loginSubtitle: string;
    signupSubtitle: string;
    name: string;
    namePlaceholder: string;
  };
  portal: {
    title: string;
    chooseAccount: string;
    addAccount: string;
    loading: string;
    initializing: string;
    noAccounts: string;
    selectAccount: string;
    secureSession: string;
    exit: string;
    back: string;
  };
  status: {
    title: string;
    subtitle: string;
    operational: string;
    uptime: string;
    regions: string;
    incidentHistory: string;
    noIncidents: string;
  };
  docs: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    categories: string[];
    welcomeTitle: string;
    welcomeDesc: string;
  };
  notFound: {
    title: string;
    desc: string;
    button: string;
    portalButton: string;
  };
  footer: {
    privacy: string;
    terms: string;
    careers: string;
    security: string;
    companyName: string;
    ceo: string;
    businessInfo: string;
    address: string;
    copyright: string;
  };
}

export interface Translations {
  ko: TranslationSchema;
  en: TranslationSchema;
}
