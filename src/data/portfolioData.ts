export interface VideoItem {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  posterUrl: string;
  category: "Showreel" | "Brand Commercials" | "9:16 Vertical Reels" | "3D Motion / CGI" | "Performance Ads";
  clientName: string;
  duration?: string;
  isFeatured?: boolean;
  order: number;
}

export interface PackageItem {
  id: string;
  name: string;
  tier: string;
  priceMonthly: number;
  priceQuarterly: number;
  description: string;
  features: string[];
  isPopular?: boolean;
  badge?: string;
  ctaText?: string;
  order: number;
}

export interface CaseStudyItem {
  id: string;
  clientName: string;
  title: string;
  category: string;
  roiMetric: string;
  metricLabel: string;
  description: string;
  imageUrl?: string;
  videoUrl?: string;
  tags: string[];
  isFeatured?: boolean;
  order: number;
}

export interface TestimonialItem {
  id: string;
  author: string;
  role: string;
  company: string;
  quote: string;
  avatarUrl?: string;
  metric?: string;
  rating: number;
  isFeatured: boolean;
  order: number;
}

export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  deliverables: string[];
  metrics: { label: string; value: string }[];
  isFeatured: boolean;
  order: number;
}

export interface AgencySettings {
  agencyName: string;
  logoUrl: string;
  motoLine: string;
  subHeadline: string;
  aboutText: string;
  contactEmail: string;
  contactPhone: string;
  location: string;
  instagramUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
  youtubeUrl: string;
  whatsappNumber: string;
  calendlyUrl: string;
  accentColor: string;
  colorScheme: string;
}

export interface PortfolioData {
  settings: AgencySettings;
  videos: VideoItem[];
  packages: PackageItem[];
  caseStudies: CaseStudyItem[];
  testimonials: TestimonialItem[];
  services: ServiceItem[];
}

export const initialPortfolioData: PortfolioData = {
  settings: {
    agencyName: "NORD MEDIA HOUSE",
    logoUrl: "/uploads/logos/nord-media-house.jpg",
    motoLine: "ELEVATING VISUAL CULTURE THROUGH CINEMATIC DIRECTION & PERFORMANCE MEDIA",
    subHeadline:
      "We engineer high-impact commercials, viral creator campaigns, and scalable acquisition engines for premier global brands.",
    aboutText:
      "Nord Media House is a premier creative production and digital growth studio specializing in cinematic visual storytelling, viral social storytelling, and high-ROAS performance acquisition.",
    contactEmail: "hello@nordmediahouse.com",
    contactPhone: "+1 (415) 890-3200",
    location: "Los Angeles • New York • London • Stockholm",
    instagramUrl: "https://instagram.com/nordmediahouse",
    linkedinUrl: "https://linkedin.com/company/nord-media-house",
    twitterUrl: "https://x.com/nordmediahouse",
    youtubeUrl: "https://youtube.com/@nordmediahouse",
    whatsappNumber: "+14158903200",
    calendlyUrl: "https://calendly.com",
    accentColor: "#A82BA0",
    colorScheme: "nord-plum",
  },
  videos: [
    {
      id: "v-1",
      title: "Nord 2026 Master Showreel: The Horizon",
      description: "Our definitive visual reel synthesizing high-fashion cinematography, CGI physics, and viral editing pacing.",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      posterUrl: "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1200&q=80",
      category: "Brand Commercials",
      clientName: "Nord Global Direction",
      duration: "0:45",
      isFeatured: true,
      order: 1,
    },
    {
      id: "v-2",
      title: "AURA Neo-Luxury Fragrance Campaign",
      description: "Direct-to-Consumer hero commercial generating 4.2M organic impressions across TikTok and Instagram within 72 hours.",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      posterUrl: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
      category: "9:16 Vertical Reels",
      clientName: "AURA Parfum Paris",
      duration: "0:30",
      isFeatured: true,
      order: 2,
    },
    {
      id: "v-4",
      title: "Solstice Energy Performance Meta Ads",
      description: "A series of 18 high-velocity hook variations driving 4.8x Return on Ad Spend for nationwide launch.",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      posterUrl: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=800&q=80",
      category: "Performance Ads",
      clientName: "Solstice Bev Co.",
      duration: "0:15",
      isFeatured: false,
      order: 3,
    },
    {
      id: "v-5",
      title: "Verve Electric Supercar Global Launch",
      description: "Cinematic commercial film shot across Iceland and Norway with anamorphic optics and drone choreography.",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      posterUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
      category: "Brand Commercials",
      clientName: "Verve Motors Sweden",
      duration: "1:15",
      isFeatured: false,
      order: 4,
    },
    {
      id: "v-6",
      title: "KINETIC Apparel Viral Streetwear Drops",
      description: "Paced 9:16 vertical storytelling campaign that sold out 12,000 units within 4 hours of broadcast.",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
      posterUrl: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
      category: "9:16 Vertical Reels",
      clientName: "KINETIC Studio NYC",
      duration: "0:25",
      isFeatured: false,
      order: 5,
    },
  ],
  packages: [
    {
      id: "pkg-1",
      name: "CREATOR FOUNDATION",
      tier: "Starter Retainer",
      priceMonthly: 3499,
      priceQuarterly: 9499,
      description: "Essential high-impact monthly content engine engineered to build commanding brand authority on TikTok and Instagram.",
      features: [
        "12 Cinematic 9:16 4K Vertical Reels / Short-Form Assets",
        "Scriptwriting, Creative Hooks & Trend Forecasting",
        "Professional Color Grading & Motion Typography",
        "Sound Design & Bespoke Audio Mixing",
        "Monthly Creative Director Review & Analytics Strategy",
        "Dedicated Private Slack / Asana Workspace Channel",
      ],
      isPopular: false,
      badge: "Fast Launch",
      ctaText: "Select Foundation Tier",
      order: 1,
    },
    {
      id: "pkg-2",
      name: "PERFORMANCE CATALYST",
      tier: "Growth Retainer",
      priceMonthly: 6999,
      priceQuarterly: 18999,
      description: "Comprehensive end-to-end creative production & Meta ad acquisition engine designed to scale high-growth brands to 7+ figures.",
      features: [
        "24 Bespoke 9:16 High-Velocity Creative Assets & Ad Hook Variations",
        "1 Hero Brand Commercial Film (4K Widescreen / Cine-Grade)",
        "Meta & TikTok Paid Ads Creative Optimization & Iteration",
        "Custom 3D Product Renders & Motion Graphic Stills",
        "Full UGC Creator Network Scouting & Management",
        "Weekly Strategy Cadence + Real-Time ROAS Optimization",
        "48-Hour Rush Iteration Turnaround Guarantee",
      ],
      isPopular: true,
      badge: "Most Popular",
      ctaText: "Scale With Performance",
      order: 2,
    },
    {
      id: "pkg-3",
      name: "ENTERPRISE MONOLITH",
      tier: "Custom Retainer",
      priceMonthly: 12999,
      priceQuarterly: 34999,
      description: "Full-scale dedicated creative department and multi-channel acquisition suite for market leaders.",
      features: [
        "Unlimited Creative Iterations & High-Volume Production Pipeline",
        "Multi-City On-Location Production Crew & Studio Bookings",
        "Full Omnichannel Paid Media Direction (Meta, YouTube, TikTok, Google)",
        "Executive Creative Director (ECD) Directly Assigned",
        "Dedicated Lead Motion Editor",
        "Exclusive Geographic & Industry Category Lockout",
      ],
      isPopular: false,
      badge: "Elite Studio",
      ctaText: "Book Custom Consultation",
      order: 3,
    },
  ],
  caseStudies: [
    {
      id: "cs-1",
      clientName: "Solstice Beverage Co.",
      title: "Scaling Direct-to-Consumer Revenue from $120k to $1.1M/mo",
      category: "Paid Social & UGC Engine",
      roiMetric: "+816%",
      metricLabel: "Net Revenue Growth in 90 Days",
      description: "Designed a multi-angle performance creative system testing 40+ dynamic hook variations across TikTok and Meta Ads with automated scaling rules.",
      imageUrl: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
      tags: ["Meta Ads", "TikTok UGC", "Direct Response", "Creative Strategy"],
      isFeatured: true,
      order: 1,
    },
    {
      id: "cs-2",
      clientName: "Verve Electric Supercars",
      title: "Viral Pre-Order Campaign Generating 18,000 Verified Reservations",
      category: "Cinematic Commercial Production",
      roiMetric: "4.8x",
      metricLabel: "ROAS with 24M+ Organic Views",
      description: "Produced high-octane 4K commercial films filmed across Nordic landscapes paired with micro-cut vertical reels for social domination.",
      imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
      tags: ["Commercial Film", "Automotive", "VFX", "High Production"],
      isFeatured: true,
      order: 2,
    },
  ],
  testimonials: [
    {
      id: "t-1",
      author: "Marcus Vance",
      role: "Chief Marketing Officer",
      company: "Solstice Beverage Co.",
      quote: "Nord Media House fundamentally transformed our customer acquisition economics. Their creative direction isn't just visually stunning—it converts at 3x our previous agency benchmark.",
      metric: "+816% DTC Revenue Growth",
      rating: 5,
      isFeatured: true,
      order: 1,
    },
    {
      id: "t-2",
      author: "Elena Rostova",
      role: "Head of Brand Strategy",
      company: "Chronos Horology",
      quote: "The visual direction produced by Nord put our brand into an entirely different echelon. Every asset feels like it was crafted for high fashion.",
      metric: "$3.2M Sold Out in 47 Mins",
      rating: 5,
      isFeatured: true,
      order: 2,
    },
    {
      id: "t-3",
      author: "Julian Sterling",
      role: "Founder & CEO",
      company: "Verve Mobility",
      quote: "Flawless execution from script to final color grade. Working with Nord feels like having a Hollywood-grade creative studio and a Wall Street growth team on speed dial.",
      metric: "24M+ Organic Reach",
      rating: 5,
      isFeatured: true,
      order: 3,
    },
  ],
  services: [
    {
      id: "srv-1",
      title: "Cinematic Video Commercials",
      slug: "commercial-production",
      shortDescription: "High-concept brand films, 4K commercials, and editorial storytelling built with world-class cameras and lenses.",
      fullDescription: "From creative conception and scriptwriting to on-set production, stunt coordination, drone cinematography, and high-end DaVinci color mastering.",
      icon: "Film",
      deliverables: ["4K Hero Commercials", "Cutdowns for Social", "Color Master", "Custom Sound Design"],
      metrics: [
        { label: "Average Production Fidelity", value: "4K Cinema RAW" },
        { label: "Average Turnaround", value: "14-21 Days" },
      ],
      isFeatured: true,
      order: 1,
    },
    {
      id: "srv-2",
      title: "Vertical Social Storytelling & Reels",
      slug: "social-storytelling",
      shortDescription: "High-volume 9:16 vertical video assets optimized for TikTok, Instagram Reels, and YouTube Shorts algorithms.",
      fullDescription: "Engineering scroll-stopping visual hooks, kinetic captions, fast-paced transitions, and culturally resonant audio that drive exponential viral reach.",
      icon: "Zap",
      deliverables: ["12-30 Reels/Month", "Hook Variations", "Trending Audio Sourcing", "Thumbnail Suites"],
      metrics: [
        { label: "Viral Reach Generated", value: "120M+ Views" },
        { label: "Average Hook Retention", value: "+44%" },
      ],
      isFeatured: true,
      order: 2,
    },
    {
      id: "srv-4",
      title: "High-ROAS Meta & TikTok Paid Media",
      slug: "paid-media-growth",
      shortDescription: "Data-backed performance creative pipelines that drive down Customer Acquisition Cost and maximize ROAS.",
      fullDescription: "Continuous iterative creative testing, rapid hook variation deployment, high-converting direct response funnels, and full budget scaling management.",
      icon: "TrendingUp",
      deliverables: ["Creative Testing Matrix", "Ad Account Management", "Weekly Reporting", "Funnel Optimization"],
      metrics: [
        { label: "Client Ad Spend Managed", value: "$18M+" },
        { label: "Average Client ROAS", value: "4.6x" },
      ],
      isFeatured: true,
      order: 3,
    },
  ],
};
