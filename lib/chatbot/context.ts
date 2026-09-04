import { PersonalProfile, ChatSuggestion } from "./types";

export const PARAS_PROFILE: PersonalProfile = {
  name: "Paras Rana",
  preferredName: "Paras",
  role: "Full-Stack & Backend Engineer | Competitive Programmer",
  tagline: "Pixels, Packets & Probability Distributions",
  shortBio:
    "I'm Paras, a Computer Science undergrad at IIIT Nagpur (2023–2027). I build high-performance full-stack products, explore practical AI/ML applications, distributed backend architectures, and enjoy turning complex problems into clean, thoughtful software.",
  fullBio: `Paras Rana is a software engineer and Computer Science student at the Indian Institute of Information Technology (IIIT) Nagpur (Class of 2027). With a strong focus on backend systems, real-time protocols (WebSockets, WebRTC, gRPC), distributed data stores (Redis, PostgreSQL, MongoDB), and competitive programming (LeetCode Guardian 2210, CodeChef 4-Star), Paras specializes in architecting reliable, low-latency applications and practical AI/ML solutions.`,
  location: {
    current: "Nagpur, Maharashtra, India (IIIT Nagpur)",
    hometown: "Mumbai, Maharashtra, India",
    college: "Indian Institute of Information Technology (IIIT) Nagpur",
  },
  contact: {
    email: "parasrana579@gmail.com",
    github: "https://github.com/ParasRana123",
    linkedin: "https://www.linkedin.com/in/paras-rana-696b7731b/",
    codolio: "https://codolio.com/profile/_theparas_",
    leetcode: "https://leetcode.com/u/paras579/",
    codechef: "https://www.codechef.com/users/paras579",
    codeforces: "https://codeforces.com/profile/Par08",
    resumeUrl:
      "https://drive.google.com/file/d/1oHGxltfftvUB5vEWj_l3zU3wF3q9byDR/view?usp=sharing",
  },
  skills: {
    languages: [
      "C++",
      "Python",
      "TypeScript",
      "JavaScript",
      "SQL",
      "HTML5",
      "CSS3",
    ],
    backend: [
      "Node.js",
      "Express.js",
      "FastAPI",
      "LangChain",
      "WebSockets",
      "gRPC",
      "Protocol Buffers",
      "REST APIs",
      "System Design & Microservices",
    ],
    frontend: [
      "React.js",
      "Next.js (App Router)",
      "Tailwind CSS",
      "Framer Motion",
      "Three.js",
      "State Management",
    ],
    databases: [
      "PostgreSQL",
      "MongoDB",
      "Redis (Caching, Pub/Sub, Queues)",
      "MySQL",
      "Vector Databases (Qdrant / Chroma / Pinecone)",
    ],
    devopsAndCloud: [
      "Docker",
      "Linux",
      "CI/CD Pipelines",
      "GitHub Actions",
      "Vercel",
    ],
    toolsAndWorkflow: [
      "VS Code",
      "Git & GitHub",
      "Postman",
    ],
  },
  education: [
    {
      degree: "B.Tech in Computer Science & Engineering (CSE)",
      institution: "Indian Institute of Information Technology (IIIT), Nagpur",
      period: "2023 — 2027",
      location: "Nagpur, Maharashtra, India",
      score: "CGPA: 7.50 / 10",
      coursework: [
        "Data Structures & Algorithms",
        "Operating Systems",
        "Database Management Systems (DBMS)",
        "Computer Networks",
        "Machine Learning",
        "Object-Oriented Programming (OOPS)",
      ],
      achievements: [
        "Active competitive programmer & technical builder",
        "Finalist in national-level collegiate hackathons",
      ],
    },
    {
      degree: "Higher Secondary Certificate (Class 12 CBSE)",
      institution: "Yak Public School",
      period: "2021 — 2023",
      location: "Mumbai, Maharashtra, India",
      score: "89%",
      achievements: ["Strong foundation in Mathematics, Physics, and Chemistry"],
    },
    {
      degree: "Secondary School Certificate (Class 10 CBSE)",
      institution: "Atomic Energy Central School",
      period: "2009 — 2021",
      location: "Mumbai, Maharashtra, India",
      score: "92%",
      achievements: ["Distinction in STEM subjects"],
    },
  ],
  projects: [
    {
      title: "Musor (Collaborative Music Platform)",
      category: "Full Stack & Real-Time Audio",
      description:
        "Real-time collaborative music listening platform with synchronized audio playback, group chat, shared dynamic queues, and playlist recommendations. Allows friends to discover each other's playlists, save favorite songs, and enjoy seamless multi-user listening sessions.",
      techStack: ["Next.js", "Node.js", "WebSockets", "Redis", "Tailwind CSS"],
      features: [
        "Real-time synchronized audio playback across multiple clients",
        "Room-based live group chat and shared queue manipulation",
        "Smart music discovery and playlist sharing",
      ],
      demoUrl: "https://musor-ten.vercel.app/",
      githubUrl: "https://github.com/ParasRana123/musor",
      highlights: [
        "Synchronized playback with minimal jitter using websocket signals",
        "Interactive room state persistence",
      ],
    },
    {
      title: "Realtime Peer Chatapp (Omegle Clone)",
      category: "WebRTC & Real-Time Networking",
      description:
        "An anonymous peer-to-peer video & audio chat application mimicking Omegle's core matching mechanics. Built using custom WebSocket signaling servers and WebRTC for direct peer-to-peer low-latency media streams.",
      techStack: ["WebRTC", "WebSockets", "Node.js", "React.js", "Express.js"],
      features: [
        "Random anonymous 1-on-1 peer matching",
        "Direct P2P audio and video streaming via WebRTC",
        "WebSocket based handshaking & signaling server",
        "Text chat overlay during video calls",
      ],
      demoUrl: "https://omegle-beta.vercel.app/",
      githubUrl: "https://github.com/ParasRana123/omegle",
      highlights: [
        "Direct mesh P2P streaming bypassing intermediary media servers",
        "Instant matchmaking queue logic",
      ],
    },
    {
      title: "Celebrity Face Lookalike",
      category: "AI / Machine Learning & Computer Vision",
      description:
        "An interactive computer vision web application that detects facial landmarks from user-uploaded images and matches them with celebrity faces using deep learning embeddings and feature comparison.",
      techStack: ["Python", "PyTorch / TensorFlow", "FastAPI", "React.js", "OpenCV"],
      features: [
        "Automated face detection and bounding-box alignment",
        "Deep feature vector extraction and cosine similarity search against celebrity database",
        "Visual percentage similarity breakdown and top matches display",
      ],
      demoUrl: "https://celeb-face-sable.vercel.app/",
      githubUrl: "https://github.com/ParasRana123/CelebFacelookalike",
      highlights: ["Fast image embedding inference with high matching accuracy"],
    },
    {
      title: "Defence Portal (Smart India Hackathon)",
      category: "System Engineering & Security",
      description:
        "Built as a core solution for the Smart India Hackathon (SIH) tackling a specialized defense-oriented problem statement, providing secure access control, situational dashboarding, and mission asset tracking.",
      techStack: ["Next.js", "Node.js", "PostgreSQL", "Tailwind CSS", "REST API"],
      features: [
        "Secure role-based access control (RBAC)",
        "Situational intelligence dashboard with analytics",
        "Modular asset monitoring and reporting workflow",
      ],
      demoUrl: "https://net-gen-x.vercel.app/",
      githubUrl: "https://github.com/ParasRana123/sih_defence",
      highlights: ["Built and pitched during Smart India Hackathon competition"],
    },
    {
      title: "Movie Recommendation Engine",
      category: "Machine Learning & Information Retrieval",
      description:
        "Personalized content-based and collaborative movie recommendation engine with fuzzy search that automatically corrects typos, recommends top-rated films by genre, and provides in-depth cast and crew breakdowns.",
      techStack: ["Python", "Scikit-Learn", "FastAPI", "React.js", "TMDB API"],
      features: [
        "Fuzzy search with intelligent typo tolerance and instant autocomplete",
        "Content similarity scoring based on genres, plot synopsis, and crew metadata",
        "Rich UI with ratings, trailers, and cast insights",
      ],
      demoUrl: "https://movierecommender-navy.vercel.app/",
      githubUrl: "https://github.com/ParasRana123/Movie_Recommender",
      highlights: ["Sub-second recommendation ranking using vector similarity"],
    },
    {
      title: "Virtual Voice Assistant (NOVA)",
      category: "Voice AI & Automation",
      description:
        "NOVA is an all-in-one digital voice assistant that listens to voice commands, handles workflow automation, fetches live information, and executes desktop/web actions intelligently.",
      techStack: ["Python", "Speech Recognition", "TTS Engines", "Automation APIs"],
      features: [
        "Natural speech recognition and synthesis",
        "System command execution and desktop workflow triggers",
        "Real-time information retrieval (weather, news, search queries)",
      ],
      demoUrl: "https://nova-inky-iota.vercel.app/",
      githubUrl: "https://github.com/ParasRana123/NOVA",
      highlights: ["Lightweight hands-free digital sidekick"],
    },
  ],
  ratings: [
    {
      platform: "LeetCode",
      handle: "paras579",
      rating: 2210,
      rankBadge: "Guardian (Top 1%)",
      details: "Global Rank #8510 · 1200+ solved · 150+ day streak · AIR 67 in Biweekly Contest 180",
      profileUrl: "https://leetcode.com/u/paras579/",
    },
    {
      platform: "CodeChef",
      handle: "paras579",
      rating: 1811,
      rankBadge: "4 Star",
      details: "AIR #3586 · Global Rank 125 in Starters 227 · 25+ contests participated",
      profileUrl: "https://www.codechef.com/users/paras579",
    },
    {
      platform: "Codeforces",
      handle: "Par08",
      rating: 1250,
      rankBadge: "Pupil",
      details: "100+ problems solved across various algorithmic rounds",
      profileUrl: "https://codeforces.com/profile/Par08",
    },
  ],
  achievements: [
    "LeetCode Guardian with max rating 2210 (Top 1% globally)",
    "All India Rank (AIR) 67 — LeetCode Biweekly Contest 180",
    "Global Rank 125 — CodeChef Starters 227",
    "CodeChef 4-Star coder with max rating 1811",
    "Solved 1500+ algorithmic problems across all competitive platforms",
    "National Hackathon Finalist — IIT Guwahati Hackathon",
    "National Hackathon Final Round — IIITM Gwalior Hackathon",
    "Smart India Hackathon (SIH) Defense Portal solution builder",
  ],
  blogPosts: [
    {
      title: "Redis, Pub Subs, and Message Queues",
      date: "03-02-2026",
      url: "https://medium.com/@parasrana579/redis-pub-subs-and-message-queues-6e0bba30a5d4",
      description:
        "Deep dive into distributed messaging patterns, comparing Redis Pub/Sub mechanisms with persistent message queues and broker architectures.",
    },
    {
      title: "Rate Limiting System Design",
      date: "13-09-2025",
      url: "https://medium.com/@parasrana579/rate-limiting-system-design-954636d05bc7",
      description:
        "A practical guide on designing resilient rate limiters using Token Bucket, Leaky Bucket, and Sliding Window log algorithms with Redis.",
    },
    {
      title: "CSR vs SSR vs SSG",
      date: "01-02-2026",
      url: "https://medium.com/@parasrana579/csr-vs-ssr-vs-ssg-d12d0deea827",
      description:
        "An engineering comparison of modern rendering strategies: Client-Side Rendering, Server-Side Rendering, and Static Site Generation in Next.js.",
    },
  ],
  faqs: [
    {
      question: "Are you open to internships or job opportunities?",
      answer:
        "Yes! Paras is actively open to Software Engineering (SWE) internships, Full-Stack and Backend Engineering roles, and AI/ML engineering opportunities. You can reach out directly via email at parasrana579@gmail.com or on LinkedIn.",
      keywords: ["hire", "hiring", "internship", "job", "opportunity", "work", "role", "open to"],
    },
    {
      question: "What is your primary technical expertise?",
      answer:
        "Paras's core strengths are Backend Architecture (Node.js, Express, FastAPI, gRPC, WebSockets), Distributed Systems & Caching (Redis, PostgreSQL, MongoDB), Full-Stack development with Next.js & React, and Advanced Problem Solving / Algorithms (LeetCode Guardian, 1500+ problems solved).",
      keywords: ["expertise", "stack", "skills", "good at", "strength", "specialty"],
    },
    {
      question: "Where can I find your resume?",
      answer:
        "You can view and download Paras's latest resume directly here: https://drive.google.com/file/d/1oHGxltfftvUB5vEWj_l3zU3wF3q9byDR/view?usp=sharing",
      keywords: ["resume", "cv", "pdf", "profile", "document"],
    },
    {
      question: "How can I get in touch with you?",
      answer:
        "You can connect with Paras via:\n- Email: parasrana579@gmail.com\n- LinkedIn: https://www.linkedin.com/in/paras-rana-696b7731b/\n- GitHub: https://github.com/ParasRana123",
      keywords: ["contact", "email", "reach", "message", "linkedin", "talk", "connect"],
    },
    {
      question: "What are your top projects?",
      answer:
        "Some of Paras's top projects include:\n1. **Musor**: Real-time collaborative music listening platform with synced playback (https://musor-ten.vercel.app/)\n2. **Peer Chatapp (Omegle Clone)**: P2P video/audio chat via WebRTC and WebSockets (https://omegle-beta.vercel.app/)\n3. **Celebrity Lookalike**: Deep learning face detection and similarity matching (https://celeb-face-sable.vercel.app/)\n4. **SIH Defence Portal**: Situational intelligence portal for Smart India Hackathon (https://net-gen-x.vercel.app/)\n5. **Movie Recommender**: Typo-tolerant recommendation engine (https://movierecommender-navy.vercel.app/)\n6. **NOVA**: Voice assistant for desktop automation (https://nova-inky-iota.vercel.app/)",
      keywords: ["projects", "built", "portfolio", "musor", "omegle", "nova", "recommendation", "github"],
    },
    {
      question: "What are your competitive programming stats?",
      answer:
        "Paras is a LeetCode Guardian with a 2210 rating (Global Rank #8510, AIR 67 in Biweekly Contest 180, 1200+ solved), a CodeChef 4-Star coder (Rating 1811, Global Rank 125 in Starters 227), and has solved over 1500+ algorithmic problems across platforms. You can check his Codolio profile at https://codolio.com/profile/_theparas_.",
      keywords: ["leetcode", "codechef", "codeforces", "competitive programming", "rating", "rank", "dsa", "solved", "guardian"],
    },
  ],
};

export const STARTER_SUGGESTIONS: ChatSuggestion[] = [
  {
    id: "overview",
    label: "👋 Tell me about Paras",
    prompt: "Who is Paras Rana and what are his main areas of expertise?",
    category: "experience",
  },
  {
    id: "projects",
    label: "🚀 Top Projects",
    prompt: "What are the most impressive projects Paras has built?",
    category: "projects",
  },
  {
    id: "cp-stats",
    label: "🏆 CP & LeetCode Stats",
    prompt: "What are Paras's competitive programming ratings and achievements?",
    category: "competitive-programming",
  },
  {
    id: "tech-stack",
    label: "⚡ Tech Stack & Skills",
    prompt: "What programming languages, backend frameworks, and databases does Paras use?",
    category: "skills",
  },
  {
    id: "resume-contact",
    label: "📄 Resume & Contact",
    prompt: "How can I contact Paras or view his resume for job opportunities?",
    category: "contact",
  },
];

export function buildSystemPrompt(): string {
  const p = PARAS_PROFILE;

  return `You are the AI Assistant for Paras Rana's portfolio website. You represent Paras Rana and assist recruiters, engineers, founders, and visitors who want to learn more about Paras's background, skills, projects, achievements, and work experience.

You must answer questions knowledgeably, concisely, accurately, and professionally based on the verified facts below.

### PERSONA & IDENTITY
- Name: ${p.name} (Prefers "${p.preferredName}")
- Role: ${p.role}
- Tagline: "${p.tagline}"
- College: ${p.education[0].institution} (${p.education[0].degree}, ${p.education[0].period})
- Current CGPA: ${p.education[0].score}
- Locations: Nagpur (College campus) & Mumbai (Hometown), India
- Core Focus: Backend Engineering, Distributed Systems, Real-Time Protocols (WebSockets, WebRTC, gRPC), High-Concurrency Systems, Data Structures & Algorithms, Practical AI/ML applications.

### CONTACT DETAILS & LINKS
- Email: ${p.contact.email}
- LinkedIn: ${p.contact.linkedin}
- GitHub: ${p.contact.github}
- Resume: ${p.contact.resumeUrl}
- Codolio: ${p.contact.codolio}
- LeetCode: ${p.contact.leetcode}
- CodeChef: ${p.contact.codechef}
- Codeforces: ${p.contact.codeforces}

### ACADEMIC BACKGROUND
${p.education
  .map(
    (e) =>
      `- **${e.degree}** at ${e.institution} (${e.period})\n  Location: ${e.location}${
        e.score ? ` | Score: ${e.score}` : ""
      }${e.coursework ? `\n  Coursework: ${e.coursework.join(", ")}` : ""}`
  )
  .join("\n\n")}

### TECHNICAL SKILLS
- **Languages**: ${p.skills.languages.join(", ")}
- **Backend & Systems**: ${p.skills.backend.join(", ")}
- **Frontend & Web**: ${p.skills.frontend.join(", ")}
- **Databases & Stores**: ${p.skills.databases.join(", ")}
- **DevOps, Cloud & Infrastructure**: ${p.skills.devopsAndCloud.join(", ")}
- **Tools & Workflow**: ${p.skills.toolsAndWorkflow.join(", ")}

### FEATURED PROJECTS
${p.projects
  .map(
    (pr, i) =>
      `${i + 1}. **${pr.title}** (${pr.category || "Software Project"})
   - Description: ${pr.description}
   - Tech Stack: ${pr.techStack?.join(", ") || "Full-stack"}
   - GitHub: ${pr.githubUrl}
   ${pr.demoUrl ? `- Live Demo: ${pr.demoUrl}` : ""}`
  )
  .join("\n\n")}

### COMPETITIVE PROGRAMMING & RATINGS
- Total Problems Solved: 1500+ problems across platforms (Codolio: ${p.contact.codolio})
- **LeetCode**: Guardian rating 2210 (Global Rank #8510, AIR 67 in Biweekly Contest 180, 1200+ solved, 150+ day streak) - Profile: ${p.contact.leetcode}
- **CodeChef**: 4-Star rating 1811 (AIR #3586, Global Rank 125 in Starters 227, 25+ contests) - Profile: ${p.contact.codechef}
- **Codeforces**: Pupil rating 1250 (100+ solved) - Profile: ${p.contact.codeforces}
- Key Contests & Hackathons:
${p.achievements.map((a) => `  * ${a}`).join("\n")}

### WRITING & BLOGS (MEDIUM)
${p.blogPosts
  .map(
    (b) =>
      `- "${b.title}" (${b.date}): ${b.description || "Tech article"} — ${b.url}`
  )
  .join("\n")}

### GUIDELINES FOR RESPONSES
1. **Authenticity**: Speak warmly and professionally as Paras's intelligent portfolio representative (or representing Paras in first/third person naturally).
2. **Accuracy**: Only state facts that are true and present in this prompt. Do not hallucinate past companies, degrees, or contact numbers that aren't mentioned.
3. **Formatting**: Use clean GitHub-flavored markdown with bolding, lists, and markdown links when referencing GitHub repositories, demos, articles, or contact info.
4. **Brevity & Clarity**: Keep answers concise and direct. Avoid fluffy filler.
5. **Recruiting & Collaboration**: If asked about internships or hiring, confirm that Paras is actively looking for opportunities and provide his email (${p.contact.email}), LinkedIn, and resume link.
6. **Polite Tone**: Be enthusiastic about software engineering, distributed systems, problem solving, and building great products.
7. **Completeness on Overview Queries**: When asked "Who is Paras Rana?", "Tell me about Paras", or about his expertise, provide a full, structured response covering his background, key technical strengths, top projects with links, CP achievements, and always include clickable links to his resume and contact info so the visitor gets a complete picture.`;
}
