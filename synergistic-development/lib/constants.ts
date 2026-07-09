/**
 * Synergistic Development — Content & Copy
 *
 * All site copy, navigation, neighborhoods, testimonials, and service details
 * live here for easy review and editing.
 *
 * TODO markers flag content that needs final client review.
 */

export const BRAND = {
  name: "Synergistic Development",
  shortName: "Synergistic",
  location: "Denver, Colorado",
  yearFounded: 2004, // TODO: confirm with Shane
  founder: "Shane Fable",
} as const;

export type NavLink = {
  label: string;
  href: string;
  children?: ReadonlyArray<NavLink>;
};

export const NAV_LINKS: ReadonlyArray<NavLink> = [
  { label: "Home",       href: "/" },
  { label: "About",      href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Independent Advisory", href: "/services/advisory" },
    ],
  },
  { label: "Process",    href: "/process" },
  { label: "Portfolio",  href: "/portfolio" },
  { label: "Contact",    href: "/contact" },
];

export const SERVICES = [
  {
    number: "01",
    title: "Custom Homes & Development",
    body:
      "Thoughtfully crafted homes designed around your lifestyle, vision, and long-term goals. Whether building a one-of-a-kind custom residence for a homeowner or partnering with developers to deliver exceptional project management, exceptional craftsmanship, and transparent communication from site selection through final walkthrough.",
    href: "/services/custom-homes",
  },
  {
    number: "02",
    title: "Renovations & Additions",
    body:
      "Transformative renovations that honor the character of your home while enhancing its beauty, functionality, and value. Historic properties and landmark districts are our specialty.",
    href: "/services/renovations",
  },
  {
    number: "03",
    title: "Owner's Representation & Advisory",
    body:
      "Not every client hires us to build. Many engage us before selecting a builder, reviewing bids, or beginning the design process. With 20+ years of experience, we serve as your trusted advocate.",
    href: "/services/advisory",
  },
] as const;

export const EXPERTISE_ITEMS = [
  "HOA & Design Review Boards",
  "Historic District Requirements",
  "Landmark Preservation Guidelines",
  "Municipal Planning & Zoning",
  "Permit & Entitlement Coordination",
  "Variance & Approval Requests",
  "Architectural Review Committees",
  "Complex Neighborhood Standards",
] as const;

export const PROCESS_STEPS = [
  {
    number: "01",
    name: "Discover",
    description:
      "Understand your vision, goals, property, and investment priorities.",
  },
  {
    number: "02",
    name: "Plan",
    description:
      "Develop a clear roadmap with realistic budgets, timelines, and approvals.",
  },
  {
    number: "03",
    name: "Build",
    description:
      "Execute with transparency, communication, and exceptional craftsmanship.",
  },
  {
    number: "04",
    name: "Deliver",
    description:
      "A finished home — and experience — you can be proud of for years to come.",
  },
] as const;

export type Project = {
  id: string;
  href: string;
  image: string;
  alt: string;
  eyebrow: string;
  title: string;
  featured?: boolean;
};

export const PROJECTS: ReadonlyArray<Project> = [
  {
    id: "cherry-creek",
    href: "/portfolio/cherry-creek",
    image: "/images/portfolio/cherry-creek/02-334-steele.jpg",
    alt: "334 Steele Street — modern open kitchen and dining, Cherry Creek",
    eyebrow: "Cherry Creek",
    title: "New Custom Home",
    featured: true,
  },
  {
    id: "wash-park",
    href: "/portfolio/washington-park",
    image: "/images/portfolio/washington-park/925-emerson/01-925-emerson.jpg",
    alt: "925 Emerson — historic Denver home interior, Washington Park renovation",
    eyebrow: "Washington Park",
    title: "Renovation & Addition",
  },
  {
    id: "highlands",
    href: "/portfolio/highlands",
    image: "/images/portfolio/highlands/alcott/03-alcott.jpg",
    alt: "Alcott Street — modern kitchen interior, Highlands renovation",
    eyebrow: "Highlands",
    title: "Custom Home",
  },
  {
    id: "bow-mar",
    href: "/portfolio/bow-mar",
    image: "/images/portfolio/washington-park/578-washington/01-578-washington.jpg",
    alt: "578 Washington — interior living space, Washington Park project",
    eyebrow: "Bow Mar",
    title: "Custom Home",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "Working with Synergistic Development was an entirely different experience than we expected. Shane was at every meeting, answered every question, and delivered exactly what he promised. Our Cherry Creek home is everything we dreamed of.",
    name: "Sarah & Mark T.",
    neighborhood: "Cherry Creek",
  },
  {
    quote:
      "Shane saved us from a costly mistake before we even broke ground. His review of our contractor bids identified nearly $80,000 in unnecessary costs. His advisory service paid for itself ten times over.",
    name: "Jennifer R.",
    neighborhood: "Washington Park",
  },
  {
    quote:
      "We were nervous about navigating our historic district's requirements. Shane handled everything — the HOA, the landmark board, the city permits. We never felt lost once.",
    name: "David & Carol M.",
    neighborhood: "Highlands",
  },
] as const;

export const NEIGHBORHOODS = [
  "Cherry Hills Village",
  "Greenwood Village",
  "Bow Mar",
  "Bow Mar South",
  "Columbine Valley",
  "Washington Park",
  "Bonnie Brae",
  "Hilltop",
  "Observatory Park",
  "Country Club",
  "Crestmoor",
  "Highlands",
  "Sloan's Lake",
  "Littleton",
] as const;

export const STATS: ReadonlyArray<{
  value: string;
  label: string;
  detail?: string;
}> = [
  {
    value: "20+",
    label: "Years Building & Advising",
  },
  {
    value: "$500K–$5M+",
    label: "Typical Project Range",
  },
  {
    value: "Denver's Top",
    label: "Neighborhoods",
    detail: "Cherry Creek · Cherry Hills · Highlands · Bow Mar · Columbine Valley · Wash Park + more",
  },
];

export const FOOTER_TAGLINE = "Trusted Advisor. Exceptional Builder.";
export const FOOTER_SERVICES =
  "Luxury Home Building · Renovation · Consulting";

/* ================================================================
   SERVICES PAGE — content
   ================================================================ */

export const SERVICES_PAGE = {
  hero: {
    eyebrow: "What We Do",
    headlineTop1: "Building. Renovation.",
    headlineEm: "Advisory.",
    subhead:
      "Three distinct services. One trusted partner. Serving Denver's most discerning homeowners for more than 20 years.",
    backgroundImage:
      "/images/site/heroes/04-services-banner-patio.jpg",
    backgroundAlt: "Modern patio with stone fireplace and warm interior glow — Synergistic Development Denver",
  },

  anchorNav: [
    { number: "01", label: "Custom Homes & Development", href: "#custom-homes" },
    {
      number: "02",
      label: "Renovations & Additions",
      href: "#renovations",
    },
    {
      number: "03",
      label: "Independent Advisory",
      href: "#independent-advisory",
    },
  ],

  customHomes: {
    eyebrow: "01 — Custom Homes",
    headlineTop: "Thoughtfully Crafted Homes",
    headlineEm: "Built Around Your Vision.",
    body1:
      "Building a custom home is one of the most significant decisions of your life. It requires more than a skilled contractor — it requires an experienced partner who can help you navigate the complexity of design, budgeting, approvals, and construction with clarity and confidence.",
    body2:
      "We work with homeowners from the earliest stages of site selection and architectural planning through final walkthrough. Our role is to protect your investment, keep your project on schedule and on budget, and deliver a home that exceeds your expectations — not just meets them.",
    includes: [
      "Site selection & feasibility evaluation",
      "Architectural coordination & design review",
      "Budget development & validation",
      "Permit & entitlement management",
      "HOA & design review board navigation",
      "Full construction management & oversight",
      "Quality control & schedule management",
      "Client communication throughout",
    ],
    image:
      "/video/custom-homes-poster.jpg",
    imageAlt: "Synergistic Development custom homes — interior film, Denver Cherry Creek and Highlands",
  },

  renovations: {
    eyebrow: "02 — Renovations & Additions",
    headlineTop: "Renovations That",
    headlineEm: "Honor the Character of Your Home.",
    body1:
      "A great renovation is one of the hardest things to execute well. It requires understanding not just what a homeowner wants — but what the home itself calls for. Its history, its structure, its relationship to the neighborhood.",
    body2:
      "We have spent over two decades renovating some of Denver's most significant residential properties — historic bungalows in the Highlands, craftsman homes in Washington Park, and estate properties in Cherry Hills Village and Greenwood Village. Every project is approached with the same discipline: protect what matters, improve what can be better, and deliver a result that feels inevitable rather than imposed.",
    includes: [
      "Full-scope renovations & additions",
      "Historic home restorations",
      "Kitchen & primary suite transformations",
      "Structural & systems upgrades",
      "Historic district & landmark compliance",
      "HOA design review navigation",
      "Permit coordination & management",
      "Interior design team coordination",
    ],
    note: "Many of our renovation clients come to us after a previous contractor fell short. We understand the frustration — and we know how to get complex projects back on track.",
    image:
      "/video/renovations-poster.jpg",
    imageAlt: "Synergistic Development renovations — interior film, Denver historic and character restorations",
  },

  advisory: {
    intro: {
      eyebrow: "03 — Owner's Representation & Advisory",
      headlineTop: "Not Every Client Hires Us",
      headlineEm: "to Build.",
      subhead:
        "Many engage us before selecting a builder, purchasing a property, or beginning the design process. With more than 20 years of experience, we serve as your trusted advocate at every stage.",
      quote:
        "Architects represent design. Contractors represent construction. Real estate agents represent the transaction. Who represents you?",
      quoteAttribution: "The case for independent representation",
    },

    cards: [
      {
        label: "Pre-Construction",
        headline: "Before You Break Ground",
        body: "The decisions made before construction begins have the greatest impact on project cost, schedule, and overall success.",
        list: [
          "Builder & contractor selection guidance",
          "Independent bid review & cost comparison",
          "Scope analysis & value engineering",
          "Budget development & validation",
          "Contract review & negotiation support",
          "Design team coordination",
          "Site & feasibility evaluation",
          "Construction planning review",
        ],
      },
      {
        label: "During Construction",
        headline: "Your Advocate on the Ground",
        body: "During construction, we act as an experienced advocate focused on protecting quality, budget, and schedule on your behalf.",
        list: [
          "Regular project site visits",
          "Milestone & progress verification",
          "Budget & cost monitoring",
          "Change order review & negotiation",
          "Contractor accountability",
          "Quality assurance observations",
          "Payment application review",
          "Issue identification & resolution",
          "Architect & designer coordination",
        ],
      },
      {
        label: "Project Completion",
        headline: "Through the Final Detail",
        body: "The final stages of construction are often where important details are overlooked. We ensure your project is completed properly before final payments are made.",
        list: [
          "Punch list development & oversight",
          "Final quality review",
          "Contractor closeout coordination",
          "Warranty documentation review",
          "Final cost reconciliation",
          "Transition & move-in support",
        ],
      },
    ],

    whoFor: {
      eyebrow: "Who This Is For",
      headlineTop: "The Value of Having Someone",
      headlineEm: "On Your Side.",
      body1:
        "Construction projects are complex. Small mistakes can quickly become expensive. An experienced advisor can often identify issues, cost overruns, communication breakdowns, and contract concerns before they become major problems.",
      body2:
        "Our advisory services are ideal for homeowners who want confidence that their investment is being protected — whether they've already chosen a builder or are still evaluating options.",
      clients: [
        "Custom home projects ($500K+)",
        "Luxury renovations and additions",
        "Out-of-state homeowners",
        "Busy professionals and executives",
        "Real estate investors",
        "Families building their forever home",
        "Homeowners evaluating a property prior to renovation",
      ],
      quoteText:
        "Our clients gain something far more valuable than project oversight:",
      quoteHighlight: "Peace of mind.",
      quoteBody:
        "When significant investments are at stake, having an experienced advocate on your side can make all the difference.",
      caption: "Confidential. No commitment required.",
    },
  },

  expertise: {
    eyebrow: "Expertise Beyond Construction",
    headlineTop: "We Navigate the Complexities",
    headlineEm: "Others Can't.",
    subhead:
      "Many of our projects involve far more than building. Our experience working within highly regulated communities helps clients avoid delays, reduce costs, and move projects forward with confidence.",
    col1: [
      "HOA & Design Review Boards",
      "Historic District Requirements",
      "Landmark Preservation Guidelines",
      "Municipal Planning & Zoning Processes",
    ],
    col2: [
      "Permit & Entitlement Coordination",
      "Variance & Approval Requests",
      "Architectural Review Committees",
      "Complex Neighborhood Development Standards",
    ],
  },

  independentAdvisory: {
    eyebrow: "Independent Construction Advisory Services",
    headlineTop: "Independent Construction",
    headlineEm: "Advisory Services",
    subhead: "Expert Guidance—Whether or Not You Hire Us to Build",
    introParagraphs: [
      "Not every client hires Synergistic Development as their builder.",
      "Many homeowners engage us as an independent advisor before purchasing a property, selecting a builder, reviewing construction bids, or throughout an active project. Whether you’re evaluating multiple contractors, already working with a builder, or simply want an experienced professional protecting your interests, we provide objective guidance every step of the way.",
      "Architects represent the design. Builders represent the construction. Real estate agents represent the transaction. Who represents you?",
    ],
    quoteAttribution: "The case for independent representation",

    servicesHeader: "Our Advisory Services",

    phases: [
      {
        label: "Before You Build",
        intro: "Make informed decisions before construction begins.",
        items: [
          "Builder and contractor selection",
          "Independent review and comparison of multiple builder bids",
          "Scope and pricing analysis",
          "Budget validation and cost planning",
          "Contract review and negotiation support",
          "Property and feasibility evaluations before purchase",
          "Design and pre-construction planning guidance",
          "Value engineering and cost-saving recommendations",
        ],
      },
      {
        label: "During Construction",
        intro:
          "Independent oversight focused on protecting your investment. Whether your builder is Synergistic Development or another contractor, we provide experienced project oversight to help keep your project on budget, on schedule, and built to the agreed-upon standard.",
        items: [
          "Project site visits",
          "Progress and milestone verification",
          "Budget and cost monitoring",
          "Change order review",
          "Quality assurance observations",
          "Payment application review",
          "Contractor accountability",
          "Architect and designer coordination",
          "Issue identification and resolution",
        ],
      },
      {
        label: "Project Completion",
        intro: "Protect your investment before final payment.",
        items: [
          "Punch list creation and oversight",
          "Final quality review",
          "Contractor closeout coordination",
          "Warranty documentation review",
          "Final cost reconciliation",
          "Move-in and project transition support",
        ],
      },
    ],
  },

  sameProcess: {
    eyebrow: "For Advisory Clients",
    headlineTop: "The Same Process.",
    headlineEm: "A Different Role.",
    body1:
      "When you hire us as your owner’s representative — rather than your builder — the five-phase framework still applies. The difference is role in each phase.",
    body2:
      "Instead of managing construction, we manage your relationship with whoever is building. We review bids, evaluate contractors, monitor quality, review change orders, and ensure you have a trusted advocate on your side throughout the entire process.",
    body3:
      "For many clients, this service pays for itself many times over — through cost savings identified in the bid process, change orders avoided, and problems caught before they become expensive.",
    col1Label: "Build Client",
    col2Label: "Advisory Client",
    rows: [
      { col1: "SD manages construction", col2: "SD monitors your builder" },
      {
        col1: "SD holds all contracts",
        col2: "You hold contracts, SD reviews them",
      },
      { col1: "SD leads trade partners", col2: "SD evaluates your trades" },
      { col1: "SD oversees budget", col2: "SD audits your budget" },
      { col1: "SD files permits", col2: "SD coordinates with your team" },
      {
        col1: "Single point of accountability",
        col2: "Independent advocate on your side",
      },
    ],
    primaryCta: { label: "Learn More About Advisory Services", href: "/services/advisory" },
    secondaryCta: { label: "← Back to Services", href: "/services" },
  },

  cta: {
    headlineTop: "Ready to Start the",
    headlineEm: "Conversation?",
    body:
      "Whether you're building, renovating, or simply need a second opinion before making a major decision — we're here.",
  },
} as const;

/* ================================================================
   PROCESS PAGE — content
   ================================================================ */

type ProcessStepContent = {
  number: string;
  eyebrow: string;
  headlineTop: string;
  headlineEm: string;
  body: string[];
  inThisPhase: string[];
  closingNote?: string;
  background: "cream" | "white";
};

export const PROCESS_PAGE = {
  hero: {
    eyebrow: "The SD Experience",
    headlineTop: "A Proven Process.",
    headlineEm: "Trusted Advisor.",
    subhead:
      "Every successful project begins long before construction starts. Whether you're building, renovating, or seeking independent guidance — our process is designed to protect your investment at every stage.",
    backgroundImage:
      "/images/site/about/01-about-kitchen-open.jpg",
    backgroundAlt:
      "334 Steele Street — open concept kitchen and dining, refined craftsmanship",
  },

  intro: {
    eyebrow: "How We Work",
    headlineTop: "Clarity Before the",
    headlineEm: "First Shovel.",
    body1:
      "Most problems in construction aren't construction problems — they're planning problems. Unclear scope, unrealistic budgets, misaligned expectations, or inadequate oversight before groundbreaking.",
    body2:
      "Our process is built around a simple premise: the more clarity you have before construction begins, the better your outcome. Every phase is designed to eliminate surprises, protect your investment, and give you the confidence to make decisions with complete information.",
    steps: [
      {
        number: "01",
        name: "Discover",
        description: "Understand your vision, goals, and investment priorities.",
      },
      {
        number: "02",
        name: "Plan",
        description: "Develop a clear roadmap with realistic budgets and timelines.",
      },
      {
        number: "03",
        name: "Prepare",
        description: "Finalize every detail before construction begins.",
      },
      {
        number: "04",
        name: "Build",
        description: "Execute with transparency, communication, and craftsmanship.",
      },
      {
        number: "05",
        name: "Deliver",
        description: "Complete every detail. Close with confidence.",
      },
    ],
  },

  steps: [
    {
      number: "01",
      eyebrow: "Discover",
      headlineTop: "Understanding Your",
      headlineEm: "Vision.",
      body: [
        "Every project starts with understanding — not proposals, not budgets, not contracts. Before we discuss a single specification, we invest time in understanding your vision, your goals, your property, and your investment priorities.",
        "We discuss what success looks like to you. What you've loved about homes you've lived in. What you'd do differently. What concerns you most about the process. What timeline and budget parameters shape your decisions.",
        "For homeowners still evaluating options, this phase may include project consultation, builder selection guidance, or second-opinion reviews — before any commitment is made.",
      ],
      inThisPhase: [
        "Project goals & lifestyle needs",
        "Site & property considerations",
        "Budget expectations & parameters",
        "Timeline objectives",
        "Feasibility & project fit assessment",
        "Builder selection guidance (advisory clients)",
        "Second-opinion consultations",
      ],
      background: "cream",
    },
    {
      number: "02",
      eyebrow: "Plan",
      headlineTop: "The",
      headlineEm: "Roadmap for Success.",
      body: [
        "The planning phase establishes the foundation everything else is built on. This is where vision becomes strategy — where the excitement of a new project meets the discipline of professional project management.",
        "We coordinate with architects, designers, engineers, and consultants to develop a complete project roadmap. We help clients navigate complex approval processes — HOA design reviews, historic district requirements, municipal planning and zoning — before a single permit is filed.",
        "The goal of this phase is simple: eliminate surprises before construction begins. A well-planned project is a well-executed project.",
      ],
      inThisPhase: [
        "HOA & design review board approvals",
        "Historic district & landmark requirements",
        "Municipal planning & zoning navigation",
        "Budget development & validation",
        "Design refinement & constructability review",
        "Architectural & engineering coordination",
        "Schedule development",
        "Risk identification & mitigation",
      ],
      background: "white",
    },
    {
      number: "03",
      eyebrow: "Prepare",
      headlineTop: "Every Detail",
      headlineEm: "Defined.",
      body: [
        "Before construction starts, every detail should be clearly defined. This phase is where planning becomes precision — where we confirm that the project is ready to build, not just ready to start.",
        "We finalize budgets, confirm contractor and trade coordination, acquire permits, and validate scope to ensure there are no open questions when groundbreaking begins. For advisory clients, this phase includes detailed bid comparisons, contract reviews, and builder selection support.",
        "Our standard: if we wouldn't break ground with complete confidence, we don't break ground.",
      ],
      inThisPhase: [
        "Final budgeting & pricing confirmation",
        "Contractor & trade partner coordination",
        "Permit acquisition & filing",
        "Schedule development & finalization",
        "Scope validation & gap analysis",
        "Bid comparisons (advisory clients)",
        "Contract review & negotiation support",
        "Builder selection guidance (advisory clients)",
      ],
      background: "cream",
    },
    {
      number: "04",
      eyebrow: "Build",
      headlineTop: "Where",
      headlineEm: "Planning Becomes Reality.",
      body: [
        "Construction is where planning meets execution. Our team manages every aspect of the build with the same discipline that defined the planning process — proactive communication, rigorous quality control, and unwavering accountability to budget and schedule.",
        "Clients receive regular, proactive updates — not reactive explanations. When issues arise (and in construction, they always do), we identify them early, present solutions, and keep the project moving forward.",
        "Our role during construction is to be the client's advocate on the job site — protecting quality, managing the budget, and ensuring every trade partner delivers to the standard the project demands.",
      ],
      inThisPhase: [
        "Full site supervision & management",
        "Quality control & craftsmanship oversight",
        "Budget monitoring & cost control",
        "Schedule management & milestone tracking",
        "Proactive client communication",
        "Change order review & coordination",
        "Subcontractor & trade accountability",
        "Issue identification & resolution",
      ],
      background: "white",
    },
    {
      number: "05",
      eyebrow: "Deliver",
      headlineTop: "More Than a Completed Project —",
      headlineEm: "Confidence.",
      body: [
        "The final phase ensures every detail is completed to our standards — not just the builder's. We oversee the punch list, conduct final walkthroughs, and ensure every open item is resolved before the project is considered complete.",
        "We don't close a project until we would be proud to call it our own. Warranty documentation, final cost reconciliation, and post-completion support are all part of the process.",
        "The result is more than a finished home. It's the confidence that every decision was made thoughtfully, every dollar was spent wisely, and every detail was handled with care.",
      ],
      inThisPhase: [
        "Punch list development & completion",
        "Final walkthroughs & quality review",
        "Warranty documentation & filing",
        "Project closeout coordination",
        "Final cost reconciliation",
        "Transition & move-in support",
        "Post-completion follow-up",
        "Ongoing client relationship",
      ],
      closingNote:
        "The result is more than a completed project — it's confidence that every detail was handled with care.",
      background: "cream",
    },
  ] satisfies ReadonlyArray<ProcessStepContent>,

  advisory: {
    eyebrow: "For Advisory Clients",
    headlineTop: "The Same Process.",
    headlineEm: "A Different Role.",
    body1:
      "When you hire us as your owner's representative — rather than your builder — the five-phase framework still applies. The difference is our role in each phase.",
    body2:
      "Instead of managing construction, we manage your relationship with whoever is building. We review bids, evaluate contractors, monitor quality, review change orders, and ensure you have a trusted advocate on your side throughout the entire process.",
    body3:
      "For many clients, this service pays for itself many times over — through cost savings identified in the bid process, change orders avoided, and problems caught before they become expensive.",
    tableCol1: "Build Client",
    tableCol2: "Advisory Client",
    rows: [
      {
        col1: "SD manages construction",
        col2: "SD monitors your builder",
      },
      {
        col1: "SD holds all contracts",
        col2: "You hold contracts, SD reviews them",
      },
      {
        col1: "SD leads trade partners",
        col2: "SD evaluates your trades",
      },
      {
        col1: "SD oversees budget",
        col2: "SD audits your budget",
      },
      {
        col1: "SD files permits",
        col2: "SD coordinates with your team",
      },
      {
        col1: "Single point of accountability",
        col2: "Independent advocate on your side",
      },
    ],
  },

  differentiators: {
    eyebrow: "Why It Works",
    headlineTop: "The Difference Between a Builder",
    headlineEm: "and a Trusted Advisor.",
    cards: [
      {
        headline: "Transparency First",
        body: "Every budget line, every change order, every decision is documented and communicated before it happens — not after. You will never be surprised by a cost or a change.",
      },
      {
        headline: "Proactive, Not Reactive",
        body: "We identify issues before they become problems. Our clients hear about challenges early — with solutions already in hand. Construction always has surprises. Our job is to make sure none of them surprise you.",
      },
      {
        headline: "One Voice. Complete Accountability.",
        body: "No matter how many architects, engineers, designers, and trade partners are involved — there is one person accountable for your project. Shane Fable. You will never feel like you are managing a committee.",
      },
    ],
  },

  cta: {
    eyebrow: "Start the Conversation",
    headlineTop: "Ready to Experience the",
    headlineEm: "Difference?",
    body:
      "The first conversation costs nothing and commits you to nothing. It's simply an opportunity to understand your project and explore whether we're the right fit — for both of us.",
    caption:
      "We are selective about the projects we undertake. Initial conversations are confidential and without obligation.",
  },
};

/* ================================================================
   PORTFOLIO PAGE — content
   ================================================================ */

export type NeighborhoodId =
  | "all"
  | "cherry-creek"
  | "washington-park"
  | "highlands"
  | "bow-mar"
  | "lakewood-cc"
  | "other";

export type ProjectSize = "feature" | "large" | "standard";

export interface PortfolioProject {
  id: string;
  name: string;
  neighborhood: Exclude<NeighborhoodId, "all">;
  type: string;
  location: string;
  imageSrc: string;
  imageAlt: string;
  size: ProjectSize;
  leadWithInterior: boolean;
  images?: string[];
  photoStatus?: "complete" | "awaiting-photos";
  todoComment?: string;
}

export const NEIGHBORHOOD_FILTERS: ReadonlyArray<{ id: NeighborhoodId; label: string }> = [
  { id: "all", label: "All" },
  { id: "cherry-creek", label: "Cherry Creek" },
  { id: "washington-park", label: "Washington Park" },
  { id: "highlands", label: "Highlands" },
  { id: "bow-mar", label: "Bow Mar" },
  { id: "lakewood-cc", label: "Lakewood CC" },
  { id: "other", label: "Other" },
];

export const PORTFOLIO = {
  hero: {
    eyebrow: "Our Portfolio",
    headlineTop: "Exceptional Work Across",
    headlineEm: "Denver's Premier Neighborhoods.",
    subhead:
      "Custom homes, transformative renovations, and historic restorations throughout Colorado's most desirable communities.",
    backgroundImage:
      "/images/portfolio/highlands/mariposa/01-mariposa.jpg",
    backgroundAlt:
      "Mariposa Highlands renovation — modern kitchen interior, Synergistic Development portfolio",
  },

  projects: [
    // CHERRY CREEK
    {
      id: "cherry-creek-custom-home",
      name: "Cherry Creek Custom Home",
      neighborhood: "cherry-creek",
      type: "New Custom Home",
      location: "Cherry Creek, Denver",
      imageSrc:
        "/projects/982-penn/hero/kitchen-01-982-s-pennsylvania-st-denver-large-012-15-kitchen-1500x1000-72dpi.jpg",
      imageAlt: "Cherry Creek luxury custom home — interior",
      size: "feature",
      leadWithInterior: true,
      todoComment:
        "TODO: Replace with Cherry Creek custom home INTERIOR hero photo — Shane to provide, this is priority #1",
      photoStatus: "awaiting-photos",
    },
    {
      id: "cherry-creek-334-steele",
      name: "334 Steele Street",
      neighborhood: "cherry-creek",
      type: "Custom Home",
      location: "Cherry Creek, Denver",
      imageSrc:
        "/images/portfolio/cherry-creek/02-334-steele.jpg",
      imageAlt: "334 Steele Street Cherry Creek — modern open kitchen and dining",
      size: "large",
      leadWithInterior: true,
      images: [
        "/images/portfolio/cherry-creek/01-334-steele.jpg",
        "/images/portfolio/cherry-creek/02-334-steele.jpg",
        "/images/portfolio/cherry-creek/03-334-steele.jpg",
        "/images/portfolio/cherry-creek/04-334-steele.jpg",
        "/images/portfolio/cherry-creek/05-334-steele.jpg",
      ],
      photoStatus: "complete",
    },
    {
      id: "cherry-hills-custom-home",
      name: "Cherry Hills Custom Home",
      neighborhood: "cherry-creek",
      type: "New Custom Home",
      location: "Cherry Hills Village",
      imageSrc:
        "/projects/578-washington/hero/living-02-578-s-washington-st-denver-co-large-005-3-living-room-1500x1000-72dpi.jpg",
      imageAlt: "Cherry Hills Village luxury custom home — living interior",
      size: "standard",
      leadWithInterior: true,
      todoComment:
        "TODO: Use Cherry Hills interior grid photos (kitchen, bath, built-ins) — confirmed usable from client brief",
      photoStatus: "awaiting-photos",
    },

    // WASHINGTON PARK
    {
      id: "wash-park-918-emerson",
      name: "918 Emerson",
      neighborhood: "washington-park",
      type: "Renovation & Addition",
      location: "Washington Park, Denver",
      imageSrc:
        "/images/portfolio/washington-park/918-emerson/01-918-emerson.jpg",
      imageAlt: "918 Emerson Street Washington Park — exterior",
      size: "large",
      leadWithInterior: false,
      images: [
        "/images/portfolio/washington-park/918-emerson/01-918-emerson.jpg",
        "/images/portfolio/washington-park/918-emerson/02-918-emerson.jpg",
        "/images/portfolio/washington-park/918-emerson/03-918-emerson.jpg",
        "/images/portfolio/washington-park/918-emerson/04-918-emerson.jpg",
        "/images/portfolio/washington-park/918-emerson/05-918-emerson.jpg",
        "/images/portfolio/washington-park/918-emerson/06-918-emerson.jpg",
        "/images/portfolio/washington-park/918-emerson/07-918-emerson.jpg",
        "/images/portfolio/washington-park/918-emerson/08-918-emerson.jpg",
        "/images/portfolio/washington-park/918-emerson/09-918-emerson.jpg",
        "/images/portfolio/washington-park/918-emerson/10-918-emerson.jpg",
        "/images/portfolio/washington-park/918-emerson/11-918-emerson.jpg",
        "/images/portfolio/washington-park/918-emerson/12-918-emerson.jpg",
      ],
      photoStatus: "complete",
    },
    {
      id: "wash-park-925-emerson",
      name: "925 Emerson",
      neighborhood: "washington-park",
      type: "Historic Renovation",
      location: "Washington Park, Denver",
      imageSrc:
        "/images/portfolio/washington-park/925-emerson/01-925-emerson.jpg",
      imageAlt: "925 Emerson Street Washington Park — interior",
      size: "standard",
      leadWithInterior: true,
      images: [
        "/images/portfolio/washington-park/925-emerson/01-925-emerson.jpg",
        "/images/portfolio/washington-park/925-emerson/02-925-emerson.jpg",
        "/images/portfolio/washington-park/925-emerson/03-925-emerson.jpg",
        "/images/portfolio/washington-park/925-emerson/04-925-emerson.jpg",
        "/images/portfolio/washington-park/925-emerson/05-925-emerson.jpg",
        "/images/portfolio/washington-park/925-emerson/06-925-emerson.jpg",
        "/images/portfolio/washington-park/925-emerson/07-925-emerson.jpg",
        "/images/portfolio/washington-park/925-emerson/08-925-emerson.jpg",
        "/images/portfolio/washington-park/925-emerson/09-925-emerson.jpg",
      ],
      photoStatus: "complete",
    },
    {
      id: "wash-park-578-washington",
      name: "578 Washington",
      neighborhood: "washington-park",
      type: "Renovation & Addition",
      location: "Washington Park, Denver",
      imageSrc:
        "/images/portfolio/washington-park/578-washington/01-578-washington.jpg",
      imageAlt: "578 Washington Street Washington Park — interior",
      size: "large",
      leadWithInterior: true,
      images: [
        "/images/portfolio/washington-park/578-washington/01-578-washington.jpg",
        "/images/portfolio/washington-park/578-washington/02-578-washington.jpg",
        "/images/portfolio/washington-park/578-washington/03-578-washington.jpg",
        "/images/portfolio/washington-park/578-washington/04-578-washington.jpg",
        "/images/portfolio/washington-park/578-washington/05-578-washington.jpg",
        "/images/portfolio/washington-park/578-washington/06-578-washington.jpg",
        "/images/portfolio/washington-park/578-washington/07-578-washington.jpg",
        "/images/portfolio/washington-park/578-washington/08-578-washington.jpg",
        "/images/portfolio/washington-park/578-washington/09-578-washington.jpg",
      ],
      photoStatus: "complete",
    },
    {
      id: "wash-park-982-south-penn",
      name: "982 South Penn",
      neighborhood: "washington-park",
      type: "Historic Renovation",
      location: "Washington Park, Denver",
      imageSrc:
        "/images/portfolio/washington-park/982-south-penn/01-982-south-penn.jpg",
      imageAlt: "982 South Penn Washington Park — interior",
      size: "standard",
      leadWithInterior: true,
      images: [
        "/images/portfolio/washington-park/982-south-penn/01-982-south-penn.jpg",
        "/images/portfolio/washington-park/982-south-penn/02-982-south-penn.jpg",
        "/images/portfolio/washington-park/982-south-penn/03-982-south-penn.jpg",
        "/images/portfolio/washington-park/982-south-penn/04-982-south-penn.jpg",
        "/images/portfolio/washington-park/982-south-penn/05-982-south-penn.jpg",
        "/images/portfolio/washington-park/982-south-penn/06-982-south-penn.jpg",
        "/images/portfolio/washington-park/982-south-penn/07-982-south-penn.jpg",
        "/images/portfolio/washington-park/982-south-penn/08-982-south-penn.jpg",
        "/images/portfolio/washington-park/982-south-penn/09-982-south-penn.jpg",
        "/images/portfolio/washington-park/982-south-penn/10-982-south-penn.jpg",
      ],
      photoStatus: "complete",
    },

    // HIGHLANDS
    {
      id: "highlands-mariposa",
      name: "Mariposa Street",
      neighborhood: "highlands",
      type: "Historic Renovation",
      location: "Highlands, Denver",
      imageSrc:
        "/images/portfolio/highlands/mariposa/01-mariposa.jpg",
      imageAlt: "Mariposa Street Highlands renovation — interior",
      size: "large",
      leadWithInterior: true,
      images: [
        "/images/portfolio/highlands/mariposa/01-mariposa.jpg",
        "/images/portfolio/highlands/mariposa/02-mariposa.jpg",
        "/images/portfolio/highlands/mariposa/03-mariposa.jpg",
        "/images/portfolio/highlands/mariposa/04-mariposa.jpg",
        "/images/portfolio/highlands/mariposa/05-mariposa.jpg",
        "/images/portfolio/highlands/mariposa/06-mariposa.jpg",
        "/images/portfolio/highlands/mariposa/07-mariposa.jpg",
        "/images/portfolio/highlands/mariposa/08-mariposa.jpg",
        "/images/portfolio/highlands/mariposa/09-mariposa.jpg",
        "/images/portfolio/highlands/mariposa/10-mariposa.jpg",
        "/images/portfolio/highlands/mariposa/11-mariposa.jpg",
        "/images/portfolio/highlands/mariposa/12-mariposa.jpg",
        "/images/portfolio/highlands/mariposa/13-mariposa.jpg",
        "/images/portfolio/highlands/mariposa/14-mariposa.jpg",
        "/images/portfolio/highlands/mariposa/15-mariposa.jpg",
        "/images/portfolio/highlands/mariposa/16-mariposa.jpg",
        "/images/portfolio/highlands/mariposa/17-mariposa.jpg",
        "/images/portfolio/highlands/mariposa/18-mariposa.jpg",
        "/images/portfolio/highlands/mariposa/19-mariposa.jpg",
        "/images/portfolio/highlands/mariposa/20-mariposa.jpg",
        "/images/portfolio/highlands/mariposa/21-mariposa.jpg",
        "/images/portfolio/highlands/mariposa/22-mariposa.jpg",
        "/images/portfolio/highlands/mariposa/23-mariposa.jpg",
        "/images/portfolio/highlands/mariposa/24-mariposa.jpg",
        "/images/portfolio/highlands/mariposa/25-mariposa.jpg",
        "/images/portfolio/highlands/mariposa/26-mariposa.jpg",
        "/images/portfolio/highlands/mariposa/27-mariposa.jpg",
        "/images/portfolio/highlands/mariposa/28-mariposa.jpg",
        "/images/portfolio/highlands/mariposa/29-mariposa.jpg",
        "/images/portfolio/highlands/mariposa/30-mariposa.jpg",
        "/images/portfolio/highlands/mariposa/31-mariposa.jpg",
        "/images/portfolio/highlands/mariposa/32-mariposa.jpg",
      ],
      photoStatus: "complete",
    },
    {
      id: "highlands-alcott",
      name: "Alcott Street",
      neighborhood: "highlands",
      type: "Renovation & Addition",
      location: "Highlands, Denver",
      imageSrc:
        "/images/portfolio/highlands/alcott/03-alcott.jpg",
      imageAlt: "Alcott Street Highlands renovation — modern kitchen interior",
      size: "standard",
      leadWithInterior: true,
      images: [
        "/images/portfolio/highlands/alcott/01-alcott.jpg",
        "/images/portfolio/highlands/alcott/02-alcott.jpg",
        "/images/portfolio/highlands/alcott/03-alcott.jpg",
        "/images/portfolio/highlands/alcott/04-alcott.jpg",
        "/images/portfolio/highlands/alcott/05-alcott.jpg",
      ],
      photoStatus: "complete",
    },
    {
      id: "highlands-sunnyside",
      name: "Sunnyside",
      neighborhood: "highlands",
      type: "Custom Home",
      location: "Sunnyside, Denver",
      imageSrc:
        "/projects/982-penn/hero/exterior-04-982-s-pennsylvania-st-denver-large-036-38-back-yard-1500x1000-72dpi.jpg",
      imageAlt: "Sunnyside Denver custom home",
      size: "standard",
      leadWithInterior: false,
      todoComment:
        "TODO: Sunnyside — can add per client. Confirm photos with Shane.",
      photoStatus: "awaiting-photos",
    },

    // LAKEWOOD COUNTRY CLUB
    {
      id: "lakewood-cc-interior",
      name: "Lakewood Country Club",
      neighborhood: "lakewood-cc",
      type: "Luxury Renovation",
      location: "Lakewood Country Club",
      imageSrc:
        "/images/portfolio/lakewood-cc/01-lakewood-cc.jpg",
      imageAlt: "Lakewood Country Club luxury renovation — interior",
      size: "large",
      leadWithInterior: true,
      images: [
        "/images/portfolio/lakewood-cc/01-lakewood-cc.jpg",
        "/images/portfolio/lakewood-cc/02-lakewood-cc.jpg",
        "/images/portfolio/lakewood-cc/03-lakewood-cc.jpg",
        "/images/portfolio/lakewood-cc/04-lakewood-cc.jpg",
        "/images/portfolio/lakewood-cc/05-lakewood-cc.jpg",
        "/images/portfolio/lakewood-cc/06-lakewood-cc.jpg",
        "/images/portfolio/lakewood-cc/07-lakewood-cc.jpg",
        "/images/portfolio/lakewood-cc/08-lakewood-cc.jpg",
        "/images/portfolio/lakewood-cc/09-lakewood-cc.jpg",
        "/images/portfolio/lakewood-cc/10-lakewood-cc.jpg",
      ],
      photoStatus: "complete",
    },

    // BOW MAR (other)
    {
      id: "bow-mar-custom",
      name: "Bow Mar Custom Home",
      neighborhood: "bow-mar",
      type: "New Custom Home",
      location: "Bow Mar, Colorado",
      imageSrc:
        "/projects/982-penn/hero/exterior-03-982-s-pennsylvania-st-denver-large-034-25-patio-1500x1000-72dpi.jpg",
      imageAlt: "Bow Mar custom home — Synergistic Development",
      size: "large",
      leadWithInterior: false,
      todoComment:
        "TODO: Bow Mar project — confirm photos and details with Shane. Placeholder only.",
      photoStatus: "awaiting-photos",
    },
  ] satisfies ReadonlyArray<PortfolioProject>,

  // Default "ALL" view ordering — controls the 12-col grid layout
  defaultOrder: [
    "cherry-creek-custom-home", // feature full width
    "cherry-creek-334-steele", // large (7)
    "cherry-hills-custom-home", // standard (5)
    "wash-park-918-emerson", // large (7)
    "wash-park-925-emerson", // standard (5)
    "highlands-mariposa", // large (7)
    "wash-park-578-washington", // standard (5)
    "highlands-alcott", // standard (6)
    "lakewood-cc-interior", // large (6)
    "wash-park-982-south-penn", // standard (5)
    "bow-mar-custom", // large (7)
    "highlands-sunnyside", // standard — final orphan row
  ],

  stats: [
    { number: "20+", label: "Years of Experience" },
    { number: "Denver's", label: "Most Desirable Neighborhoods" },
    { number: "$500K–$5M+", label: "Typical Project Range" },
  ],

  cherryCreek: {
    eyebrow: "Featured Neighborhood",
    headlineTop: "Cherry Creek &",
    headlineEm: "Cherry Hills Village.",
    body1:
      "Among Denver's most prestigious residential addresses, Cherry Creek and Cherry Hills Village represent the highest standard of custom homebuilding in Colorado.",
    body2:
      "Our work in these neighborhoods reflects a deep understanding of their unique character — the architectural standards, HOA and design review requirements, and the caliber of finish and craftsmanship these communities demand.",
    image:
      "/images/portfolio/cherry-creek/01-334-steele.jpg",
    imageAlt: "Cherry Creek luxury custom home — featured interior",
  },

  neighborhoods: [
    "Cherry Creek",
    "Cherry Hills Village",
    "Washington Park",
    "Highlands",
    "Bow Mar",
    "Lakewood CC",
    "Littleton",
    "Columbine Valley",
    "Greenwood Village",
    "Bonnie Brae",
    "Hilltop",
    "Observatory Park",
    "Castle Pines",
  ],

  cta: {
    eyebrow: "Start Your Project",
    headlineTop: "Ready to Build Something",
    headlineEm: "Exceptional?",
    body:
      "We'd love to learn about your project and explore whether we're the right fit. Initial conversations are confidential and without obligation.",
  },
};

/* ================================================================
   CONTACT PAGE — content
   ================================================================ */

export const CONTACT = {
  hero: {
    eyebrow: "Get In Touch",
    headlineTop: "Let's Start the",
    headlineEm: "Conversation.",
    subhead:
      "No commitment. No pressure. Just an honest conversation about your project.",
    backgroundImage:
      "/images/site/contact/01-contact-bath.jpg",
    backgroundAlt:
      "Alcott Street Highlands — refined modern bathroom detail",
  },

  form: {
    headlineTop: "Tell Us About Your",
    headlineEm: "Project.",
    subhead:
      "We'll review your inquiry and be in touch within one business day.",
    inquiryTypes: [
      {
        value: "custom-home",
        label: "Custom Home Build",
        description: "Planning a new ground-up custom home",
      },
      {
        value: "renovation",
        label: "Renovation or Addition",
        description: "Transforming an existing property",
      },
      {
        value: "advisory",
        label: "Owner's Representation",
        description: "Need an advisor before or during construction",
      },
      {
        value: "general",
        label: "General Inquiry",
        description: "Not sure yet — just exploring",
      },
    ],
    successHeadline: "Thank you. We'll be in touch shortly.",
    successBody:
      "We've received your inquiry and will review it within one business day. We look forward to learning more about your project.",
  },

  info: {
    email: "shane@sddenver.com",
    phone: "(303) 910-7881",
    location: "Bow Mar, Colorado",
    locationSub: "Serving the Greater Denver Metro & Front Range",
    tagline: "Trusted Advisor. Exceptional Builder.",
  },

  whatToExpect: [
    {
      number: "01",
      title: "We Review Your Inquiry",
      description:
        "We read every inquiry personally and respond within one business day.",
    },
    {
      number: "02",
      title: "We Schedule a Call",
      description:
        "We'll reach out to schedule a brief introductory call at your convenience.",
    },
    {
      number: "03",
      title: "We Have an Honest Conversation",
      description:
        "No pressure, no pitch. Just a candid discussion about your project and whether we're the right fit.",
    },
  ],

  testimonial: {
    quote:
      "Shane saved us from a costly mistake before we even broke ground. His review of our contractor bids identified nearly $80,000 in unnecessary costs. His advisory service paid for itself many times over.",
    attribution: "Jennifer R., Washington Park",
    // TODO: Replace with real verified testimonial from Shane
  },

  stats: [
    { number: "20+", label: "Years Building & Advising" },
    { number: "$500K–$5M+", label: "Typical Project Investment" },
    {
      number: "Denver's",
      label: "Most Desirable Neighborhoods",
    },
  ],

  advisory: {
    eyebrow: "Not Sure Where to Start?",
    headlineTop: "Start with a",
    headlineEm: "Confidential Consultation.",
    body1:
      "Many of our most valuable client relationships begin with a simple question: \"I'm not sure if I'm ready to build yet — can I just talk to someone who knows what they're doing?\"",
    body2:
      "Yes. That's exactly what we're here for. Whether you're evaluating a property, comparing builder bids, navigating an HOA approval, or simply not sure where to start — a confidential consultation costs you nothing and may save you a great deal.",
    caption:
      "Confidential. No commitment required. We work with homeowners at every stage of the decision process.",
  },

  closing: {
    quote:
      "We are intentionally selective in the projects we undertake — allowing us to provide the attention, communication, and accountability that exceptional projects require.",
    attribution: "Synergistic Development · Denver, Colorado",
  },
};



/* ================================================================
   ABOUT PAGE — content
   ================================================================ */

export const ABOUT = {
  hero: {
    eyebrow: "About Synergistic Development",
    headlineTop: "For Those Who Expect",
    headlineEm: "More Than a ",
    headlineEmItalic: "Builder.",
    subhead:
      "Founded on a simple belief: homeowners deserve experienced guidance throughout one of the largest investments of their lives.",
    backgroundImage:
      "/images/site/heroes/02-hero-kitchen-alcott.jpg",
    backgroundAlt:
      "Alcott Street Highlands — modern kitchen with refined cabinetry and natural light",
  },

  philosophy: {
    eyebrow: "Our Story",
    headlineTop: "Built on a Simple ",
    headlineEm: "Belief.",
    body1:
      "Synergistic Development was founded on a simple belief: homeowners deserve experienced guidance throughout one of the largest investments of their lives.",
    body2:
      "For more than 20 years, we have helped clients navigate custom homes, transformative renovations, residential development, and complex approval processes throughout Colorado's most desirable neighborhoods and communities.",
    body3:
      "Our role extends beyond construction. We serve as a trusted advisor, helping homeowners make informed decisions, avoid costly mistakes, and confidently move projects from concept to completion.",
    body4:
      "We are intentionally selective in the projects we undertake — allowing us to provide the attention, communication, and accountability that exceptional projects require.",
    quote:
      "Whether you're building a custom home, renovating a historic property, navigating HOA or municipal approvals, evaluating a property before purchase, or seeking independent project guidance — our focus remains the same.",
    tagline:
      "Protect your investment. Simplify the process. Deliver exceptional results.",
  },

  shane: {
    eyebrow: "Meet the Founder",
    headlineTop: "Shane ",
    headlineEm: "Fable",
    title: "Founder · Synergistic Development · Est. 2004",
    bio1:
      "Shane Fable founded Synergistic Development in 2004 after working as both a subdivision superintendent for a Colorado homebuilder and a project manager for a Denver-based urban infill developer.",
    bio2:
      "Over the past 20+ years, Shane has managed custom homes, major renovations, additions, historic home restorations, and residential development projects throughout Colorado. His experience spans construction management, budgeting, permitting, entitlement, financing, architectural coordination, and municipal approvals.",
    bio3:
      "What separates Shane from many builders is his ability to evaluate projects from both an owner's and builder's perspective. Whether serving as a contractor, consultant, or owner's representative, his focus remains the same: helping clients make informed decisions, avoid costly mistakes, and successfully execute complex projects.",
    closing:
      "Today, Shane lives in Bow Mar, Colorado, with his wife and three children — and remains personally involved in every project Synergistic Development undertakes.",
    portraitImage:
      "/images/site/shane/portrait.png",
    portraitAlt: "Shane Fable, Founder of Synergistic Development",
    photoStatus: "complete",
    credentials: [
      {
        label: "Education",
        lines: [
          "M.S. Real Estate & Construction Management",
          "University of Denver",
          "B.S. Finance & Management",
          "University of San Diego",
        ],
      },
      {
        label: "Based In",
        lines: ["Bow Mar, Colorado"],
      },
    ],
  },

  team: {
    eyebrow: "The Team",
    headlineTop: "The People Behind",
    headlineEm: "Every Project.",
    subhead:
      "Synergistic Development is supported by an established network of professionals who have collaborated on residential projects throughout Colorado for years.",
    body:
      "Depending on project needs, we assemble the right professionals to ensure each project benefits from specialized expertise while maintaining a single point of accountability.",
    body2:
      "Many of our trade and design relationships have been built over decades, creating a collaborative process that helps projects move efficiently from planning through completion.",
    disciplines: [
      "Project Managers & Superintendents",
      "Licensed Architects & Engineers",
      "Interior Designers",
      "Historic Preservation Specialists",
      "HOA & Municipal Approval Consultants",
      "Specialty Trade Partners",
      "Landscape & Site Consultants",
    ],
    note: {
      line1:
        "Every project maintains a single point of accountability — Shane Fable — regardless of how many specialists are involved. You will never feel like you are managing a committee.",
      line2: "One point of contact. Complete accountability.",
    },
  },

  expertise: {
    eyebrow: "What We Do Best",
    headlineTop: "Twenty Years of ",
    headlineEm: "Expertise",
    cards: [
      {
        headline: "Custom Homes",
        body: "Ground-up custom homes designed around your lifestyle, vision, and long-term investment goals.",
      },
      {
        headline: "Luxury Renovations & Additions",
        body: "Transformative renovations that honor the character of your home while elevating its beauty, function, and value.",
      },
      {
        headline: "Historic Home Restorations",
        body: "Deep experience with Denver's landmark properties, historic districts, and the unique approvals they require.",
      },
      {
        headline: "Residential Development",
        body: "Site acquisition, entitlement, planning, and development of residential infill and custom projects.",
      },
      {
        headline: "HOA & Design Review Approvals",
        body: "Decades of experience navigating design review boards, HOA requirements, and architectural committees throughout Colorado.",
      },
      {
        headline: "Owner's Representation & Advisory",
        body: "Independent guidance for homeowners evaluating builders, bids, contracts, and complex decisions before and during construction.",
      },
    ],
  },

  whoWeServe: {
    eyebrow: "Who We Serve",
    headlineTop: "Clients Who Value",
    headlineEm: "Expertise Over Price.",
    body:
      "Our clients value expertise, transparency, and thoughtful execution. They are looking for more than a contractor — they want an experienced partner who can provide both strategic guidance and exceptional craftsmanship throughout the building process.",
    clients: [
      "Homeowners planning a custom home",
      "Families planning a major renovation or addition",
      "Residential developers seeking a trusted construction partner",
      "Real estate investors evaluating development opportunities",
      "Homeowners seeking owner's representation and construction consulting",
      "Clients comparing builders, bids, budgets, and contracts",
      "Homebuyers evaluating a property before purchase or redevelopment",
      "Out-of-state homeowners needing local project oversight",
      "Busy professionals seeking a trusted expert to manage the building process",
    ],
    note: "Projects typically exceed $500,000 in construction value.",
  },

  areas: {
    eyebrow: "Areas We Serve",
    headlineTop: "Denver's Most ",
    headlineEm: "Desirable",
    headlineBottom: " Neighborhoods & Communities",
    body:
      "We understand the unique permitting requirements, design review processes, HOA standards, zoning regulations, and neighborhood character that influence successful projects throughout Colorado.",
    col1: [
      "Cherry Hills Village",
      "Greenwood Village",
      "Bow Mar",
      "Bow Mar South",
      "Columbine Valley",
      "Washington Park",
      "Bonnie Brae",
      "Hilltop",
      "Observatory Park",
      "Country Club",
      "Crestmoor",
    ],
    col2: [
      "Highlands",
      "Sloan's Lake",
      "Littleton",
      "Castle Pines",
      "Castle Rock",
      "Parker",
      "Evergreen",
      "Golden",
      "Boulder",
      "Surrounding Front Range Communities",
    ],
    note:
      "This is not an exhaustive list. If your neighborhood is not listed, contact us — we work throughout Colorado's Front Range.",
  },

  cta: {
    eyebrow: "Start the Conversation",
    headlineTop: "Ready to Work With",
    headlineEm: "Someone Who Gets It?",
    body:
      "Whether you're building from the ground up, renovating a historic property, or simply need an experienced second opinion — we're here to help you move forward with confidence.",
    cardHeadline1: "Trusted Advisor.",
    cardHeadline2: "Exceptional Builder.",
    caption: "No commitment required for initial conversations.",
  },
} as const;

