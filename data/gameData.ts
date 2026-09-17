export type EnemyTier = "easy" | "medium" | "hard" | "boss";

export type IntelCategory = "basic" | "skills" | "projects" | "achievements";

export interface IntelItem {
  id: string;
  tier: EnemyTier;
  category: IntelCategory;
  title: string;
  badge: string;
  subtitle: string;
  value: string;
  details?: string[];
  icon: string; // Icon identifier (e.g. user, code, cpu, trophy, zap, etc.)
  color: string; // Glow & accent hex color
  links?: { label: string; url: string; type?: "demo" | "github" | "doc" | "profile" }[];
  rarity: "Common" | "Rare" | "Epic" | "Legendary";
}

export interface Weapon {
  id: string;
  name: string;
  description: string;
  damage: number;
  fireRateMs: number;
  ammoCost: number;
  projectileSpeed: number;
  color: string;
  beamWidth: number;
  spread: number;
  isAutomatic: boolean;
  burstCount?: number;
  soundType: "laser" | "plasma" | "railgun" | "shotgun";
}

export const GAME_WEAPONS: Weapon[] = [
  {
    id: "blaster",
    name: "Photon Blaster",
    description: "Standard rapid-fire plasma sidearm. High precision, balanced fire rate.",
    damage: 25,
    fireRateMs: 140,
    ammoCost: 0,
    projectileSpeed: 18,
    color: "#22c55e",
    beamWidth: 3,
    spread: 0,
    isAutomatic: true,
    soundType: "laser",
  },
  {
    id: "pulse",
    name: "Pulse Carbine",
    description: "3-round high-velocity energy burst. Excels at taking down armored mechs.",
    damage: 35,
    fireRateMs: 280,
    ammoCost: 0,
    projectileSpeed: 22,
    color: "#eab308",
    beamWidth: 4,
    spread: 0.04,
    isAutomatic: true,
    burstCount: 3,
    soundType: "plasma",
  },
  {
    id: "railgun",
    name: "Hyperion Railgun",
    description: "Devastating focused particle beam. Deals immense single-shot kinetic damage.",
    damage: 100,
    fireRateMs: 550,
    ammoCost: 0,
    projectileSpeed: 30,
    color: "#ef4444",
    beamWidth: 7,
    spread: 0,
    isAutomatic: false,
    soundType: "railgun",
  },
  {
    id: "scatter",
    name: "Nova Scattershot",
    description: "Multi-pellet energy spread. Sweeps multiple targets across the range.",
    damage: 20,
    fireRateMs: 400,
    ammoCost: 0,
    projectileSpeed: 16,
    color: "#a855f7",
    beamWidth: 3,
    spread: 0.22,
    isAutomatic: false,
    burstCount: 5,
    soundType: "shotgun",
  },
];

export const INTEL_ITEMS: IntelItem[] = [
  // ==========================================
  // 🟢 TIER 1: EASY ENEMIES (Basic Info)
  // ==========================================
  {
    id: "intel-name",
    tier: "easy",
    category: "basic",
    title: "Identity & Name",
    badge: "OPERATOR",
    subtitle: "Full-Stack Engineer & Problem Solver",
    value: "Paras Rana",
    details: [
      "Role: Full-Stack & Backend Systems Engineer",
      "Tagline: Pixels, Packets & Probability Distributions",
      "Passionate about distributed architectures, low-latency protocols & AI systems",
    ],
    icon: "user",
    color: "#22c55e",
    rarity: "Common",
    links: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/paras-rana-696b7731b/", type: "profile" },
      { label: "Email", url: "mailto:parasrana579@gmail.com", type: "profile" },
    ],
  },
  {
    id: "intel-college",
    tier: "easy",
    category: "basic",
    title: "Alma Mater & Campus",
    badge: "INSTITUTE",
    subtitle: "Indian Institute of Information Technology",
    value: "IIIT Nagpur (Indian Institute of Information Technology)",
    details: [
      "National Institute of Importance, Nagpur, Maharashtra, India",
      "Active participant and finalist in national collegiate hackathons",
      "Active competitive programming community mentor & builder",
    ],
    icon: "building",
    color: "#22c55e",
    rarity: "Common",
  },
  {
    id: "intel-degree",
    tier: "easy",
    category: "basic",
    title: "Field of Study & Degree",
    badge: "DEGREE",
    subtitle: "Undergraduate Computer Science",
    value: "B.Tech — Computer Science & Engineering (CSE)",
    details: [
      "Core Coursework: Data Structures & Algorithms, Operating Systems, DBMS",
      "Advanced Studies: Computer Networks, Machine Learning, OOP Systems",
      "Current CGPA: 7.50 / 10.0",
    ],
    icon: "graduation-cap",
    color: "#22c55e",
    rarity: "Common",
  },
  {
    id: "intel-grad-year",
    tier: "easy",
    category: "basic",
    title: "Graduation Cohort",
    badge: "TIMELINE",
    subtitle: "Four-Year Degree Tenure",
    value: "Class of 2027 (2023 — 2027)",
    details: [
      "2023 — 2027: B.Tech in CSE at IIIT Nagpur",
      "2021 — 2023: Higher Secondary at Yak Public School (CBSE 89%)",
      "2009 — 2021: Secondary Education at AECS Mumbai (CBSE 92%)",
    ],
    icon: "calendar",
    color: "#22c55e",
    rarity: "Common",
  },
  {
    id: "intel-intro-bio",
    tier: "easy",
    category: "basic",
    title: "Executive Introduction",
    badge: "MISSION BRIEF",
    subtitle: "Core Philosophy & Engineering Focus",
    value: "Architecting Thoughtful, High-Performance Software",
    details: [
      "I'm Paras, a Computer Science undergrad at IIIT Nagpur.",
      "I build full-stack products, explore practical AI/ML applications, and enjoy turning ambiguous problems into thoughtful software.",
      "Specialized in backend microservices, real-time protocols (WebSockets, WebRTC), and ML pipelines.",
    ],
    icon: "compass",
    color: "#22c55e",
    rarity: "Common",
  },

  // ==========================================
  // 🟡 TIER 2: MEDIUM ENEMIES (Skills Arsenal)
  // ==========================================
  {
    id: "intel-skill-cpp",
    tier: "medium",
    category: "skills",
    title: "C++ & Algorithmics",
    badge: "SYSTEMS",
    subtitle: "Core Language for Competitive Programming",
    value: "C++ (STL, Memory Efficiency & High-Speed Computation)",
    details: [
      "Primary algorithmic language used to solve 1500+ complex problems",
      "Deep grasp of STL containers, custom iterators, graph algorithms, and DP",
      "Object-Oriented Programming (OOPS) & cache-efficient data structures",
    ],
    icon: "code",
    color: "#eab308",
    rarity: "Rare",
  },
  {
    id: "intel-skill-react-next",
    tier: "medium",
    category: "skills",
    title: "React.js & Next.js",
    badge: "FRONTEND",
    subtitle: "Modern Reactive Web Architecture",
    value: "React.js, Next.js (App Router), TypeScript & Tailwind",
    details: [
      "Server Components (RSC), Client Components, dynamic streaming & Suspense",
      "Modular design systems, custom responsive hooks, state management",
      "Micro-interactions, sleek dark modes, performance optimization & SEO",
    ],
    icon: "layout",
    color: "#eab308",
    rarity: "Rare",
  },
  {
    id: "intel-skill-node-express",
    tier: "medium",
    category: "skills",
    title: "Node.js & Express.js",
    badge: "BACKEND",
    subtitle: "Asynchronous Distributed Services",
    value: "Node.js, Express.js, FastAPI & Microservices",
    details: [
      "High-throughput RESTful API design, JWT authentication, role-based RBAC",
      "Middleware pipelines, error handling, rate limiting, and request validation",
      "Clean architecture with modular controllers, services, and repositories",
    ],
    icon: "server",
    color: "#eab308",
    rarity: "Rare",
  },
  {
    id: "intel-skill-postgres-redis",
    tier: "medium",
    category: "skills",
    title: "PostgreSQL & Redis",
    badge: "DATA LAYER",
    subtitle: "Relational Modeling & In-Memory Caching",
    value: "PostgreSQL, Redis Pub/Sub, MongoDB & Vector DBs",
    details: [
      "Complex SQL joins, indexing strategies, transactions & foreign keys",
      "Redis caching layers, rate limiting tokens, pub/sub messaging channels",
      "Vector databases (Qdrant/Pinecone) for semantic embeddings search",
    ],
    icon: "database",
    color: "#eab308",
    rarity: "Rare",
  },
  {
    id: "intel-skill-ml",
    tier: "medium",
    category: "skills",
    title: "Machine Learning & CV",
    badge: "INTELLIGENCE",
    subtitle: "Feature Extraction & Predictive Modeling",
    value: "Scikit-Learn, PyTorch, TensorFlow, MTCNN & VGGFace",
    details: [
      "Deep facial embedding extraction with MTCNN & VGGFace (ResNet50)",
      "Content-based similarity systems, cosine similarity & TF-IDF matrices",
      "Supervised classification, regression, and data preprocessing pipelines",
    ],
    icon: "brain",
    color: "#eab308",
    rarity: "Rare",
  },
  {
    id: "intel-skill-genai",
    tier: "medium",
    category: "skills",
    title: "GenAI & LLM Systems",
    badge: "NEXT-GEN AI",
    subtitle: "LangChain, RAG Pipelines & Agentic Workflows",
    value: "LangChain, OpenAI & Google Gemini APIs, RAG Architecture",
    details: [
      "Context-aware Retrieval-Augmented Generation (RAG) over custom docs",
      "Prompt engineering, multi-turn stateful chatbots, structured tool calls",
      "Vector embeddings search, fallback heuristics & streaming responses",
    ],
    icon: "sparkles",
    color: "#eab308",
    rarity: "Rare",
  },
  {
    id: "intel-skill-websockets-webrtc",
    tier: "medium",
    category: "skills",
    title: "WebSockets & WebRTC",
    badge: "REAL-TIME",
    subtitle: "Low-Latency Bi-Directional Protocols",
    value: "WebSockets, Socket.IO, WebRTC P2P Media & gRPC",
    details: [
      "Synchronized playback broadcast with sub-50ms jitter across clients",
      "Peer-to-peer audio/video streaming with ICE candidates & SDP handshaking",
      "Real-time matchmaking queues, room multiplexing & heartbeat sync",
    ],
    icon: "radio",
    color: "#eab308",
    rarity: "Rare",
  },

  // ==========================================
  // 🔴 TIER 3: HARD / ELITE BOSSES (Projects & Achievements)
  // ==========================================
  {
    id: "intel-achieve-cp-ratings",
    tier: "hard",
    category: "achievements",
    title: "Competitive Programming Masterclass",
    badge: "TOP 1% GLOBAL",
    subtitle: "1500+ Algorithmic Problems Solved",
    value: "LeetCode Guardian (2210) & CodeChef 4-Star (1811)",
    details: [
      "LeetCode: Guardian Rating 2210 (Top 1% Worldwide) · Global Rank #8510",
      "LeetCode Contest: All India Rank (AIR) 67 in Biweekly Contest 180",
      "CodeChef: 4-Star (Rating 1811) · Global Rank 125 in Starters 227",
      "Codeforces: Pupil (Rating 1250) · 100+ contest problems solved",
      "Total Problems Solved: 1500+ across all competitive platforms",
    ],
    icon: "trophy",
    color: "#ef4444",
    rarity: "Legendary",
    links: [
      { label: "LeetCode Profile", url: "https://leetcode.com/u/paras579/", type: "profile" },
      { label: "CodeChef Profile", url: "https://www.codechef.com/users/paras579", type: "profile" },
      { label: "Codolio Profile", url: "https://codolio.com/profile/_theparas_", type: "profile" },
    ],
  },
  {
    id: "intel-proj-musor",
    tier: "hard",
    category: "projects",
    title: "Musor — Collaborative Music Platform",
    badge: "FLAGSHIP",
    subtitle: "Synchronized Real-Time Multi-User Audio Rooms",
    value: "React, Node.js, Express, WebSockets, PostgreSQL & Redis",
    details: [
      "Synchronized audio playback across multiple devices with minimal latency",
      "Shared collaborative song queue, live room chat & playlist discovery",
      "Supports 10–15 concurrent listeners per session without desync",
      "Clerk authentication and secure room session management",
    ],
    icon: "music",
    color: "#ef4444",
    rarity: "Epic",
    links: [
      { label: "Live Demo", url: "https://musor-ten.vercel.app/", type: "demo" },
      { label: "GitHub Code", url: "https://github.com/ParasRana123/musor", type: "github" },
    ],
  },
  {
    id: "intel-proj-sih",
    tier: "hard",
    category: "projects",
    title: "SIH Defence Cyber Portal",
    badge: "HACKATHON",
    subtitle: "AI Threat Detection & Tamper-Proof Audit Trails",
    value: "Smart India Hackathon Finalist Defense Security Platform",
    details: [
      "AI-powered cyber incident reporting for defense personnel & veterans",
      "Detects phishing, malware, deepfakes, and OPSEC threat vectors",
      "Private blockchain evidence hashing for tamper-proof digital custody",
      "Automated threat triage and actionable mitigation playbooks",
    ],
    icon: "shield-alert",
    color: "#ef4444",
    rarity: "Epic",
    links: [
      { label: "Live Demo", url: "https://net-gen-x.vercel.app/", type: "demo" },
      { label: "GitHub Code", url: "https://github.com/ParasRana123/sih_defence", type: "github" },
    ],
  },
  {
    id: "intel-proj-omegle",
    tier: "hard",
    category: "projects",
    title: "Realtime Peer Video & Chat (Omegle Clone)",
    badge: "NETWORKING",
    subtitle: "Direct P2P WebRTC Audio / Video Streams",
    value: "React, Node.js, Socket.IO, WebRTC & In-Memory Matchmaker",
    details: [
      "Direct mesh P2P video & audio streaming bypassing media server costs",
      "In-memory matchmaking queue for random anonymous 1-on-1 pairings",
      "WebSocket signaling server handling SDP offers, answers, and ICE candidates",
      "Live text messaging overlay with typing indicators and instant skip",
    ],
    icon: "video",
    color: "#ef4444",
    rarity: "Epic",
    links: [
      { label: "Live Demo", url: "https://omegle-beta.vercel.app/", type: "demo" },
      { label: "GitHub Code", url: "https://github.com/ParasRana123/omegle", type: "github" },
    ],
  },
  {
    id: "intel-proj-ml-celeb",
    tier: "boss",
    category: "projects",
    title: "Deep Vision: Celebrity Face & Movie Recommender",
    badge: "AI SUITE",
    subtitle: "Computer Vision Embeddings & NLP Engines",
    value: "MTCNN, VGGFace ResNet50, Flask, Scikit-Learn & TF-IDF",
    details: [
      "Celebrity Matcher: Extracts facial landmarks and computes cosine similarity against celebrity database",
      "Movie Recommender: Vector similarity recommendations with NLP review sentiment classification",
      "NOVA AI: Voice-controlled digital sidekick with speech recognition & desktop workflow triggers",
    ],
    icon: "sparkles",
    color: "#ef4444",
    rarity: "Legendary",
    links: [
      { label: "Celebrity Matcher", url: "https://celeb-face-sable.vercel.app/", type: "demo" },
      { label: "Movie Recommender", url: "https://movierecommender-navy.vercel.app/", type: "demo" },
      { label: "NOVA Assistant", url: "https://nova-inky-iota.vercel.app/", type: "demo" },
    ],
  },
  {
    id: "intel-resumes-github",
    tier: "boss",
    category: "achievements",
    title: "Master Credentials & GitHub Arsenal",
    badge: "ULTIMATE INTEL",
    subtitle: "SDE Resume, AI/ML Resume & Full Code Repositories",
    value: "Direct Access to Paras Rana's Complete Dossier",
    details: [
      "SDE Resume: Specialized in Full-Stack & Distributed Backend Systems",
      "AI/ML Resume: Specialized in Machine Learning, Vision & GenAI Applications",
      "GitHub Profile: 20+ public repositories, open source contributions & active streak",
      "Hackathons: Finalist at IIT Guwahati & IIITM Gwalior National Hackathons",
    ],
    icon: "file-text",
    color: "#ef4444",
    rarity: "Legendary",
    links: [
      { label: "View SDE Resume", url: "https://drive.google.com/file/d/1oHGxltfftvUB5vEWj_l3zU3wF3q9byDR/view", type: "doc" },
      { label: "View AI/ML Resume", url: "https://drive.google.com/file/d/1PWYSdLrPIxbm9y_nHmuVRUWfwyJx_IVh/view", type: "doc" },
      { label: "GitHub Profile", url: "https://github.com/ParasRana123", type: "github" },
      { label: "LinkedIn Profile", url: "https://www.linkedin.com/in/paras-rana-696b7731b/", type: "profile" },
    ],
  },
];
