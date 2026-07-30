export type Pillar = {
  slug: string;
  index: string;
  name: string;
  lede: string;
  outcome: string;
  services: { title: string; body: string }[];
};

export const company = {
  name: "Scope360",
  tagline: "Premier Full-Service Execution Partner",
  support:
    "We plan it, build it, run it, and look after it — with one team answerable for the whole thing.",
  vision:
    "To empower global organizations with flawless project delivery and transformative digital experiences, turning complex strategic visions into tangible, high-impact ground realities with unmatched precision.",
  mission:
    "To architect, digitize, and operate high-stakes initiatives so our clients can maintain singular focus on their core outcomes. We integrate field operations with data-driven technology to deliver scalable results.",
  about: [
    "Scope360 is a premier, full-service execution partner dedicated to delivering end-to-end physical, digital, and operational solutions. We orchestrate complex initiatives from initial concept to long-term operational viability.",
    "By bridging the gap between rigorous field experience, robust supply chains, and advanced technology, we ensure seamless delivery at every touchpoint.",
  ],
  voice: "Clear. Confident. Technical. Premium.",
} as const;

export const pillars: Pillar[] = [
  {
    slug: "physical-infrastructure",
    index: "01",
    name: "Physical Infrastructure 360°",
    lede: "Everything that has to be built, fitted out, or staffed on the ground — done properly, and done on time.",
    outcome: "Nothing falls through the gap between one contractor and the next.",
    services: [
      {
        title: "Civil Works",
        body: "Turnkey facility refurbishment, civil construction, and site renovation.",
      },
      {
        title: "Experiential Events",
        body: "Custom fabrication, AV and lighting architecture, and spatial planning.",
      },
      {
        title: "Field Mobilization",
        body: "Rapid deployment of field teams and expert on-site supervision.",
      },
      {
        title: "Site Management",
        body: "Venue procurement, permitting, and holistic safety protocols.",
      },
    ],
  },
  {
    slug: "digital-transformation",
    index: "02",
    name: "Digital Transformation 360°",
    lede: "The websites, apps, and screens that make the whole thing easy to run — and easy to see how it is going.",
    outcome: "You see what is happening while it happens, not weeks later.",
    services: [
      {
        title: "Digital Ecosystems",
        body: "Custom web and mobile applications, immersive microsites, and seamless registration platforms.",
      },
      {
        title: "Advanced Analytics",
        body: "Secure data warehousing, cloud infrastructure, and dynamic visualization dashboards.",
      },
      {
        title: "AI & Automation",
        body: "Generative content pipelines, machine learning integration, and CRM workflow automation.",
      },
      {
        title: "Platform Engineering",
        body: "Portals, internal tooling, APIs, and multi-tenant architecture designed for scale.",
      },
    ],
  },
  {
    slug: "managed-services",
    index: "03",
    name: "Managed Services 360°",
    lede: "The part most people walk away from — buying, maintaining, staffing, and looking after it, year after year.",
    outcome: "It keeps working long after opening day.",
    services: [
      {
        title: "Strategic Procurement",
        body: "Vendor panel curation, framework contract negotiation, and robust supply chain management.",
      },
      {
        title: "Asset Lifecycle Management",
        body: "Equipment leasing, warranty tracking, preventative maintenance, and strict AMC governance.",
      },
      {
        title: "Enterprise Support",
        body: "24/7 operational monitoring, back-office outsourcing, and dedicated helpdesk integration.",
      },
      {
        title: "Facility & Logistics Operations",
        body: "Fleet coordination, smart energy monitoring, security tracking, and waste management.",
      },
    ],
  },
];

export const differentiators = [
  {
    title: "Unified Accountability",
    body: "A single, authoritative partner overseeing physical execution, technological integration, and ongoing post-launch operations.",
  },
  {
    title: "Ground Expertise",
    body: "Deep practical knowledge required to successfully navigate complex permitting, local vendor landscapes, and on-site hurdles.",
  },
  {
    title: "Data-Driven Precision",
    body: "Real-time analytics and M&E frameworks embedded directly into the DNA of every project, ensuring measurable outcomes.",
  },
  {
    title: "Agile Scalability",
    body: "Access to vetted, global vendor networks combined with managed outsourcing to scale your operations rapidly and efficiently.",
  },
];

export const methodology = [
  {
    step: "01",
    title: "Align",
    body: "Rapid discovery to define strategic objectives, KPIs, and operational constraints.",
  },
  {
    step: "02",
    title: "Architect",
    body: "Modular project blueprints, dynamic timelines, and proactive risk mitigation strategies.",
  },
  {
    step: "03",
    title: "Execute",
    body: "Deployment of certified vendors managed via real-time operational dashboards.",
  },
  {
    step: "04",
    title: "Optimize & Sustain",
    body: "Continuous monitoring, handover processes, and capacity building for long-term viability.",
  },
];

export const engagements = [
  {
    sector: "Public Sector",
    body: "Orchestrating citywide awareness campaigns, large-scale roadshows, and nationwide exhibitions.",
    tags: ["Campaign delivery", "Permitting", "Multi-city logistics"],
  },
  {
    sector: "Corporate & Enterprise",
    body: "Delivering premium corporate office fit-outs, facility upgrades, and global hybrid conferences.",
    tags: ["Fit-out", "Facility upgrade", "Hybrid events"],
  },
  {
    sector: "Technology Ecosystems",
    body: "Deployment of enterprise ticketing platforms seamlessly integrated with biometric and NFC hardware.",
    tags: ["Ticketing platforms", "Biometrics", "NFC integration"],
  },
];

export const capabilityStack = [
  {
    group: "Field & Site Operations",
    items: [
      "Field team mobilization and supervision",
      "Venue procurement and permitting",
      "HSE and safety protocol enforcement",
      "Multi-site programme coordination",
    ],
  },
  {
    group: "Build & Fabrication",
    items: [
      "Civil construction and refurbishment",
      "Custom fabrication and joinery",
      "AV, lighting, and rigging architecture",
      "Spatial planning and site layout",
    ],
  },
  {
    group: "Procurement & Logistics",
    items: [
      "Vendor panel curation and contracting",
      "Supply chain and freight coordination",
      "Equipment leasing and asset tracking",
      "Fleet, security, and waste management",
    ],
  },
  {
    group: "Digital, Data & Support",
    items: [
      "Registration, ticketing and access platforms",
      "Operational dashboards and M&E reporting",
      "Workflow automation and integrations",
      "24/7 monitoring and helpdesk",
    ],
  },
];

export const governance = {
  headline: "Governance & Compliance",
  body: "Scope360 operates with an uncompromising, compliance-first approach. Comprehensive permitting, rigorous vendor contracts, standardized safety frameworks, and exhaustive documentation are mandatory components of every engagement.",
  note: "Formal trade licenses, local registrations, and compliance certifications are maintained rigorously and available upon request.",
  pillars: [
    "Permitting & regulatory clearance",
    "Vendor contracting & framework agreements",
    "Standardized HSE and safety frameworks",
    "Full documentation and audit trail",
  ],
};

export const engagementModels = [
  {
    title: "A first look",
    body: "A short piece of work to scope it out and price it properly, before you commit.",
  },
  {
    title: "The full job",
    body: "We take the whole thing on — the building, the systems, and the people.",
  },
  {
    title: "Ongoing care",
    body: "We stay on to run it, maintain it, and keep it working.",
  },
  {
    title: "A long partnership",
    body: "A dedicated team that stays with you across years, not months.",
  },
];

export const navigation = [
  { href: "/capabilities", label: "Capabilities" },
  { href: "/approach", label: "Approach" },
  { href: "/industries", label: "Industries" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];
