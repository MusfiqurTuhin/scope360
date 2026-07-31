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
    "To help organisations get big, complicated work done properly — turning plans into something real on the ground, exactly as intended.",
  mission:
    "To plan, build and run demanding work so our clients can get on with their own. We put experienced people on site and back them with clear reporting.",
  about: [
    "Scope360 takes on complicated work from the first idea through to running it for years — the building side, the technology side, and the day-to-day operations.",
    "We bring together hands-on site experience, dependable suppliers, and good technology, so the whole job holds together.",
  ],
  voice: "Clear. Confident. Technical. Premium.",
} as const;

export const pillars: Pillar[] = [
  {
    slug: "on-the-ground",
    index: "01",
    name: "On the Ground 360°",
    lede: "Everything that has to be built, fitted out, or staffed on the ground — done properly, and done on time.",
    outcome: "Nothing falls through the gap between one contractor and the next.",
    services: [
      {
        title: "Civil Works",
        body: "Refurbishing buildings, construction work, and site renovation — finished to a standard you would be happy to hand over.",
      },
      {
        title: "Experiential Events",
        body: "Custom-built stands and sets, sound and lighting, and planning how people move through the space.",
      },
      {
        title: "Field Teams",
        body: "Getting trained people on site quickly, with someone experienced supervising them.",
      },
      {
        title: "Site Management",
        body: "Finding and booking venues, getting the permits, and keeping everyone safe on site.",
      },
    ],
  },
  {
    slug: "digital-and-data",
    index: "02",
    name: "Digital & Data 360°",
    lede: "The websites, apps and screens that make the whole thing easy to run — and easy to see how it is going.",
    outcome: "You see what is happening while it happens, not weeks later.",
    services: [
      {
        title: "Digital Ecosystems",
        body: "Websites, phone apps, and sign-up pages that are quick to use and hold up when a lot of people arrive at once.",
      },
      {
        title: "Reports & Screens",
        body: "Somewhere safe to keep your information, and clear screens that show how the work is going.",
      },
      {
        title: "Ticketing & Entry",
        body: "Selling tickets, issuing passes, and scanning people in — including fingerprint and tap-card readers.",
      },
      {
        title: "Internal Tools",
        body: "Private sites and back-office tools for your own staff, built so they still work as you grow.",
      },
    ],
  },
  {
    slug: "running-it",
    index: "03",
    name: "Running It 360°",
    lede: "The part most people walk away from — buying, maintaining, staffing, and looking after it, year after year.",
    outcome: "It keeps working long after opening day.",
    services: [
      {
        title: "Buying & Suppliers",
        body: "Finding suppliers, agreeing the contracts, and keeping materials arriving when they should.",
      },
      {
        title: "Equipment & Assets",
        body: "Renting equipment, tracking warranties, servicing things before they break, and holding maintenance contracts to account.",
      },
      {
        title: "Round-the-Clock Support",
        body: "Someone watching over it day and night, back-office help, and a help desk your people can actually call.",
      },
      {
        title: "Facility Operations",
        body: "Vehicles, energy use, security and waste — the everyday running of a place.",
      },
    ],
  },
];

export const differentiators = [
  {
    title: "One team to answer to",
    body: "One partner responsible for the building work, the technology, and the running of it afterwards. Nobody pointing at anybody else.",
  },
  {
    title: "We know the ground",
    body: "We have dealt with the permits, the local suppliers, and the problems that only turn up once you are actually on site.",
  },
  {
    title: "You can see the numbers",
    body: "Live reporting built into every job, so progress is measured rather than guessed at.",
  },
  {
    title: "We can scale quickly",
    body: "A tested network of suppliers we can call on, so the work can grow fast without standards slipping.",
  },
];

export const methodology = [
  {
    step: "01",
    title: "Agree",
    body: "A short piece of work to pin down what you want, how it will be measured, and what is standing in the way.",
  },
  {
    step: "02",
    title: "Plan",
    body: "A clear plan with dates, who does what, and where the risks are — before anything starts.",
  },
  {
    step: "03",
    title: "Build",
    body: "Approved suppliers doing the work, tracked so you can see progress while it happens.",
  },
  {
    step: "04",
    title: "Keep it running",
    body: "Watching how it performs, handing it over properly, and training your people to run it themselves.",
  },
];

export const engagements = [
  {
    sector: "Public Sector",
    body: "Citywide campaigns, roadshows around the country, and national exhibitions.",
    tags: ["Campaign delivery", "Permitting", "Multi-city logistics"],
  },
  {
    sector: "Corporate & Enterprise",
    body: "Office fit-outs, building upgrades, and conferences that run in the room and online at the same time.",
    tags: ["Fit-out", "Facility upgrade", "Hybrid events"],
  },
  {
    sector: "Venues & Ticketing",
    body: "Ticketing and entry systems for large venues, including fingerprint and tap-card readers.",
    tags: ["Ticketing", "Fingerprint entry", "Tap cards"],
  },
];

export const capabilityStack = [
  {
    group: "On Site",
    items: [
      "Getting people on site and supervising them",
      "Venue procurement and permitting",
      "Health and safety on site",
      "Running several sites at once",
    ],
  },
  {
    group: "Building & Making",
    items: [
      "Construction and refurbishment",
      "Custom building and joinery",
      "Sound, lighting and rigging",
      "Planning the layout of a space",
    ],
  },
  {
    group: "Buying & Moving",
    items: [
      "Choosing suppliers and agreeing contracts",
      "Getting materials where they need to be",
      "Renting equipment and keeping track of it",
      "Vehicles, security and waste",
    ],
  },
  {
    group: "Digital & Support",
    items: [
      "Sign-up, ticketing and entry systems",
      "Progress reports and live screens",
      "Joining up the systems you already use",
      "24/7 monitoring and helpdesk",
    ],
  },
];

export const governance = {
  headline: "Permits, Safety & Paperwork",
  body: "We do not cut corners on the paperwork. Permits, written supplier contracts, the same safety rules on every site, and a full record of what was done — these are part of every job, not extras.",
  note: "Trade licences, local registrations and safety certificates are all kept current, and we will show them to you on request.",
  pillars: [
    "Permits and legal clearance",
    "Written supplier contracts",
    "The same safety rules on every site",
    "A full record of what was done",
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
