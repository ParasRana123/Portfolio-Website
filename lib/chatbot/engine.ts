import {
  ChatMessage,
  ChatResponsePayload,
  ChatRequestPayload,
} from "./types";
import { PARAS_PROFILE, buildSystemPrompt } from "./context";

// Environment Key Detectors
function getGeminiKey(): string | null {
  const key =
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY ||
    process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
    "";
  const trimmed = key.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function getOpenAIKey(): string | null {
  const key = process.env.OPENAI_API_KEY || "";
  const trimmed = key.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function getGroqKey(): string | null {
  const key = process.env.GROQ_API_KEY || "";
  const trimmed = key.trim();
  return trimmed.length > 0 ? trimmed : null;
}

/**
 * Intelligent local fallback responder based on verified facts and intent classification.
 */
export function generateLocalKnowledgeReply(
  userQuery: string,
  _history: ChatMessage[] = []
): string {
  const query = userQuery.toLowerCase().trim();
  const p = PARAS_PROFILE;

  // 1. Comprehensive Overview / "Who is Paras Rana" / "Areas of Expertise"
  if (
    query.includes("who is") ||
    query.includes("expertise") ||
    query.includes("about paras") ||
    query.includes("tell me about paras") ||
    query.includes("background") ||
    query.includes("overview") ||
    (query.includes("paras") && (query.includes("know") || query.includes("intro") || query.includes("specializ")))
  ) {
    return `### 👨‍💻 About Paras Rana
Paras Rana is a Computer Science undergraduate at **IIIT Nagpur** (Batch 2023–2027) with a **7.50 CGPA**, specializing in high-performance backend systems, distributed architectures, real-time networking, and competitive programming.

---

### ⚡ Core Areas of Expertise
- ⚙️ **Backend & Systems**: Node.js, Express.js, FastAPI, LangChain, WebSockets, gRPC, Protocol Buffers, Microservices & System Design.
- 🗄️ **Databases & Caching**: PostgreSQL, Redis (Caching, Pub/Sub, Queues), MongoDB, MySQL, Vector Databases.
- 🌐 **Frontend Development**: React.js, Next.js (App Router), Tailwind CSS, Framer Motion.
- ☁️ **DevOps & Tools**: Docker, Linux, CI/CD with GitHub Actions, Git, VS Code.

---

### 🚀 Featured Projects
1. 🎵 [**Musor**](${p.projects[0].demoUrl}): Real-time collaborative music listening platform with synced playback via WebSockets & Redis. ([GitHub](${p.projects[0].githubUrl}))
2. 📹 [**Peer Chatapp (Omegle Clone)**](${p.projects[1].demoUrl}): Anonymous P2P video & audio chat using WebRTC and WebSockets. ([GitHub](${p.projects[1].githubUrl}))
3. 👤 [**Celebrity Face Lookalike**](${p.projects[2].demoUrl}): Deep learning facial landmark detection & celebrity matching engine. ([GitHub](${p.projects[2].githubUrl}))
4. 🛡️ [**Defence Portal (SIH)**](${p.projects[3].demoUrl}): Situational awareness & tactical defense dashboard for Smart India Hackathon. ([GitHub](${p.projects[3].githubUrl}))
5. 🎬 [**Movie Recommendation Engine**](${p.projects[4].demoUrl}): Typo-tolerant fuzzy search & recommendation system. ([GitHub](${p.projects[4].githubUrl}))
6. 🎙️ [**NOVA Voice Assistant**](${p.projects[5].demoUrl}): AI voice companion for desktop and web task automation. ([GitHub](${p.projects[5].githubUrl}))

---

### 🏆 Competitive Programming & Ratings
- 🔴 **LeetCode Guardian** (Rating: **2210**, Global Rank #8510, 1200+ solved, AIR 67 in Biweekly Contest 180) → [LeetCode Profile](${p.contact.leetcode})
- 🟡 **CodeChef 4-Star** (Rating: **1811**, Global Rank 125 in Starters 227, AIR #3586) → [CodeChef Profile](${p.contact.codechef})
- 📊 **Total Solved**: 1500+ problems across platforms → [Codolio Unified Profile](${p.contact.codolio})

---

### 📄 Resume, Contact & Hiring Info
- 📄 [**View / Download Resume (Google Drive)**](${p.contact.resumeUrl})
- ✉️ **Email**: [${p.contact.email}](mailto:${p.contact.email})
- 💼 **LinkedIn**: [linkedin.com/in/paras-rana-696b7731b](${p.contact.linkedin})
- 🐙 **GitHub**: [github.com/ParasRana123](${p.contact.github})

*Paras is actively looking for Software Engineering (SWE) internships and full-stack/backend roles!*`;
  }

  // 2. Resume / CV
  if (
    query.includes("resume") ||
    query.includes("cv") ||
    query.includes("curriculum vitae") ||
    query.includes("pdf")
  ) {
    return `### 📄 Paras Rana's Resume
You can view and download Paras's official up-to-date resume directly via Google Drive:

👉 [**View / Download Resume (Google Drive)**](${p.contact.resumeUrl})

**Quick Highlights from Resume:**
- 🎓 **Education**: B.Tech in CSE at IIIT Nagpur (2023 — 2027) · CGPA: 7.50 / 10
- 🏆 **Competitive Coding**: LeetCode Guardian (2210) · CodeChef 4-Star (1811) · 1500+ problems solved
- 🚀 **Top Projects**: Musor (Synced Audio), Omegle Clone (WebRTC), SIH Defence Portal, Celeb Lookalike
- ✉️ **Contact**: [${p.contact.email}](mailto:${p.contact.email}) · [LinkedIn](${p.contact.linkedin}) · [GitHub](${p.contact.github})`;
  }

  // 3. Contact / Hiring / Email / Socials
  if (
    query.includes("contact") ||
    query.includes("hire") ||
    query.includes("hiring") ||
    query.includes("email") ||
    query.includes("linkedin") ||
    query.includes("reach") ||
    query.includes("internship") ||
    query.includes("job") ||
    query.includes("opportunity") ||
    query.includes("call") ||
    query.includes("message")
  ) {
    return `### 📬 Contact & Hiring Information

Paras is actively open to **Software Engineering (SWE) internships**, **Full-Stack / Backend Engineering** positions, and collaborative tech projects!

Here is how you can connect with Paras directly:
- ✉️ **Email**: [${p.contact.email}](mailto:${p.contact.email})
- 💼 **LinkedIn**: [linkedin.com/in/paras-rana-696b7731b](${p.contact.linkedin})
- 🐙 **GitHub**: [github.com/ParasRana123](${p.contact.github})
- 📄 **Resume**: [View on Google Drive](${p.contact.resumeUrl})
- 📊 **Codolio CP Profile**: [Codolio Profile](${p.contact.codolio})
- 📍 **Location**: Nagpur (College Campus) / Mumbai (Hometown), India`;
  }

  // 4. Competitive Programming & LeetCode / Ratings
  if (
    query.includes("leetcode") ||
    query.includes("codechef") ||
    query.includes("codeforces") ||
    query.includes("cp") ||
    query.includes("rating") ||
    query.includes("rank") ||
    query.includes("guardian") ||
    query.includes("competitive programming") ||
    query.includes("problems solved") ||
    query.includes("codolio") ||
    query.includes("dsa")
  ) {
    return `### 🏆 Competitive Programming & Problem Solving
Paras is an avid competitive programmer with **1500+ problems solved** across platforms:

- 🔴 **LeetCode**: **Guardian** (Rating: **2210**, Global Rank #8510, 1200+ solved, 150+ day streak, AIR 67 in Biweekly Contest 180) → [LeetCode Profile](${p.contact.leetcode})
- 🟡 **CodeChef**: **4-Star** (Rating: **1811**, Global Rank 125 in Starters 227, AIR #3586) → [CodeChef Profile](${p.contact.codechef})
- 🟣 **Codeforces**: **Pupil** (Rating: **1250**, 100+ solved) → [Codeforces Profile](${p.contact.codeforces})
- 📊 **Codolio Unified Profile**: [Codolio Profile](${p.contact.codolio})

**Key Achievements:**
- Global Rank 125 in CodeChef Starters 227
- All India Rank 67 in LeetCode Biweekly Contest 180
- Finalist in National Hackathons at IIT Guwahati & IIITM Gwalior`;
  }

  // 5. Specific Projects
  if (
    query.includes("musor") ||
    (query.includes("music") && query.includes("platform"))
  ) {
    const pr = p.projects[0];
    return `### 🎵 ${pr.title}
${pr.description}

- **Tech Stack**: ${pr.techStack?.join(", ")}
- **Key Features**: Synchronized real-time playback via WebSockets, group rooms, shared queues, dynamic playlist discovery.
- **GitHub**: [${pr.githubUrl}](${pr.githubUrl})
- **Live Demo**: [${pr.demoUrl}](${pr.demoUrl})`;
  }

  if (
    query.includes("omegle") ||
    query.includes("webrtc") ||
    query.includes("peer chatapp") ||
    query.includes("video chat")
  ) {
    const pr = p.projects[1];
    return `### 📹 ${pr.title}
${pr.description}

- **Tech Stack**: ${pr.techStack?.join(", ")}
- **Key Features**: Direct P2P video & audio streaming using WebRTC mesh architecture, custom WebSocket signaling server, instant anonymous matching.
- **GitHub**: [${pr.githubUrl}](${pr.githubUrl})
- **Live Demo**: [${pr.demoUrl}](${pr.demoUrl})`;
  }

  if (
    query.includes("celeb") ||
    query.includes("lookalike") ||
    query.includes("face")
  ) {
    const pr = p.projects[2];
    return `### 👤 ${pr.title}
${pr.description}

- **Tech Stack**: ${pr.techStack?.join(", ")}
- **Key Features**: Automatic face landmark detection, deep feature vector extraction, cosine similarity ranking against celebrity database.
- **GitHub**: [${pr.githubUrl}](${pr.githubUrl})
- **Live Demo**: [${pr.demoUrl}](${pr.demoUrl})`;
  }

  if (
    query.includes("defence") ||
    query.includes("defense") ||
    query.includes("sih") ||
    query.includes("smart india")
  ) {
    const pr = p.projects[3];
    return `### 🛡️ ${pr.title}
${pr.description}

- **Tech Stack**: ${pr.techStack?.join(", ")}
- **Key Features**: Role-based access control (RBAC), tactical situational dashboards, mission asset tracking.
- **GitHub**: [${pr.githubUrl}](${pr.githubUrl})
- **Live Demo**: [${pr.demoUrl}](${pr.demoUrl})`;
  }

  if (
    query.includes("movie") ||
    query.includes("recommender") ||
    query.includes("recommendation")
  ) {
    const pr = p.projects[4];
    return `### 🎬 ${pr.title}
${pr.description}

- **Tech Stack**: ${pr.techStack?.join(", ")}
- **Key Features**: Fuzzy search with typo correction, content-based similarity filtering using Scikit-Learn, genre and cast metadata exploration.
- **GitHub**: [${pr.githubUrl}](${pr.githubUrl})
- **Live Demo**: [${pr.demoUrl}](${pr.demoUrl})`;
  }

  if (query.includes("nova") || query.includes("voice assistant")) {
    const pr = p.projects[5];
    return `### 🎙️ ${pr.title}
${pr.description}

- **Tech Stack**: ${pr.techStack?.join(", ")}
- **Key Features**: Speech recognition, desktop workflow triggers, real-time query parsing.
- **GitHub**: [${pr.githubUrl}](${pr.githubUrl})
- **Live Demo**: [${pr.demoUrl}](${pr.demoUrl})`;
  }

  // 6. All Projects Overview
  if (
    query.includes("project") ||
    query.includes("built") ||
    query.includes("portfolio") ||
    query.includes("work")
  ) {
    return `### 🚀 Projects Built by Paras Rana

1. 🎵 **Musor (Collaborative Music Platform)**: Real-time synced audio playback with WebSockets & Redis. ([Demo](${p.projects[0].demoUrl}) · [Code](${p.projects[0].githubUrl}))
2. 📹 **Realtime Peer Chatapp (Omegle Clone)**: Anonymous P2P video & audio chat built with WebRTC & WebSockets. ([Demo](${p.projects[1].demoUrl}) · [Code](${p.projects[1].githubUrl}))
3. 👤 **Celebrity Face Lookalike**: Deep learning face detection & celebrity matching engine. ([Demo](${p.projects[2].demoUrl}) · [Code](${p.projects[2].githubUrl}))
4. 🛡️ **Defence Portal (SIH)**: National Smart India Hackathon situational dashboard. ([Demo](${p.projects[3].demoUrl}) · [Code](${p.projects[3].githubUrl}))
5. 🎬 **Movie Recommendation Engine**: Typo-tolerant fuzzy search & recommendation system. ([Demo](${p.projects[4].demoUrl}) · [Code](${p.projects[4].githubUrl}))
6. 🎙️ **NOVA Voice Assistant**: AI voice companion for desktop and web task automation. ([Demo](${p.projects[5].demoUrl}) · [Code](${p.projects[5].githubUrl}))

Explore the complete source code on [Paras's GitHub](${p.contact.github})!`;
  }

  // 7. Skills & Tech Stack
  if (
    query.includes("skill") ||
    query.includes("stack") ||
    query.includes("language") ||
    query.includes("framework") ||
    query.includes("database") ||
    query.includes("technology") ||
    query.includes("technologies") ||
    query.includes("tools") ||
    query.includes("backend") ||
    query.includes("frontend")
  ) {
    return `### ⚡ Technical Skills & Stack

- 💻 **Languages**: ${p.skills.languages.join(", ")}
- ⚙️ **Backend & Systems**: ${p.skills.backend.join(", ")}
- 🌐 **Frontend**: ${p.skills.frontend.join(", ")}
- 🗄️ **Databases & Caching**: ${p.skills.databases.join(", ")}
- ☁️ **DevOps & Cloud**: ${p.skills.devopsAndCloud.join(", ")}
- 🛠️ **Workflow & Tools**: ${p.skills.toolsAndWorkflow.join(", ")}`;
  }

  // 8. Education & College
  if (
    query.includes("education") ||
    query.includes("college") ||
    query.includes("university") ||
    query.includes("degree") ||
    query.includes("iiit") ||
    query.includes("cgpa") ||
    query.includes("school") ||
    query.includes("study") ||
    query.includes("gpa")
  ) {
    return `### 🎓 Academic Background

- 🎓 **B.Tech in Computer Science & Engineering** (2023 — 2027)
  **${p.education[0].institution}**
  - **CGPA**: 7.50 / 10
  - **Coursework**: Data Structures & Algorithms, Operating Systems, DBMS, Computer Networks, Machine Learning, OOPs.
- 🏫 **Class 12 (CBSE)**: Yak Public School, Mumbai (2021 — 2023) — **89%**
- 🏫 **Class 10 (CBSE)**: Atomic Energy Central School, Mumbai (2009 — 2021) — **92%**`;
  }

  // 9. Blogs / Articles / Medium / Writing
  if (
    query.includes("blog") ||
    query.includes("article") ||
    query.includes("write") ||
    query.includes("writing") ||
    query.includes("medium") ||
    query.includes("post")
  ) {
    return `### 📝 Technical Articles & Publications

1. 📝 [**Redis, Pub Subs, and Message Queues**](${p.blogPosts[0].url}) (${p.blogPosts[0].date})
   *Deep dive into distributed messaging patterns, pub/sub mechanics, and message brokers.*
2. 📝 [**Rate Limiting System Design**](${p.blogPosts[1].url}) (${p.blogPosts[1].date})
   *Architecting resilient token bucket & sliding window rate limiters with Redis.*
3. 📝 [**CSR vs SSR vs SSG**](${p.blogPosts[2].url}) (${p.blogPosts[2].date})
   *Engineering trade-offs between Client-Side, Server-Side, and Static Generation.*`;
  }

  // 10. Simple Greeting
  if (
    query.includes("hi") ||
    query.includes("hello") ||
    query.includes("hey") ||
    query === ""
  ) {
    return `Hey there! 👋 I'm **Paras Rana's AI Assistant**.

Paras is a Computer Science undergrad at **IIIT Nagpur** (Class of 2027) and a **Full-Stack & Backend Engineer** specializing in distributed systems, real-time protocols (WebSockets & WebRTC), and competitive programming (**LeetCode Guardian 2210**).

**Quick Links:**
- 📄 [**View Resume**](${p.contact.resumeUrl})
- ✉️ [**Email Paras**](mailto:${p.contact.email}) | 💼 [**LinkedIn**](${p.contact.linkedin})
- 🚀 **Top Projects**: Musor, Omegle Clone, Celeb Lookalike, SIH Defence Portal

How can I help you today?`;
  }

  // 11. Default fallback
  return `### 👨‍💻 Paras Rana Overview
Paras Rana is a Computer Science undergraduate at **IIIT Nagpur** (Batch 2023–2027) with a passion for backend systems, distributed architecture, and competitive programming (**LeetCode Guardian 2210**, **CodeChef 4-Star 1811**).

**Key Highlights:**
- 🚀 **Projects**: [Musor](${p.projects[0].demoUrl}), [Omegle Clone](${p.projects[1].demoUrl}), [Celeb Lookalike](${p.projects[2].demoUrl}), [SIH Defence Portal](${p.projects[3].demoUrl}).
- 💻 **Stack**: C++, Python, TypeScript, Node.js, FastAPI, Next.js, Redis, PostgreSQL, WebSockets, WebRTC, Docker.
- 📄 **Resume**: [View on Google Drive](${p.contact.resumeUrl})
- ✉️ **Contact**: [${p.contact.email}](mailto:${p.contact.email}) | [LinkedIn](${p.contact.linkedin}) | [GitHub](${p.contact.github})

Feel free to ask for more details on any of these topics!`;
}

/**
 * Call Google Gemini API with multi-model fallback and high token limit.
 */
async function callGemini(
  apiKey: string,
  messages: ChatMessage[],
  systemPrompt: string
): Promise<string> {
  const models = ["gemini-1.5-flash", "gemini-2.0-flash", "gemini-1.5-pro", "gemini-pro"];

  // Format messages for Gemini API
  const contents = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const body = {
    system_instruction: {
      parts: [{ text: systemPrompt }],
    },
    contents,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 2048,
    },
  };

  let lastError: any = null;

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Gemini (${model}) status ${res.status}: ${errText}`);
      }

      const data = await res.json();
      const text =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        data.candidates?.[0]?.text ||
        "";

      if (text && text.trim().length > 0) {
        return text;
      }
    } catch (err) {
      lastError = err;
      console.warn(`Gemini model ${model} attempt failed:`, err);
    }
  }

  throw lastError || new Error("Failed to generate response from Gemini API");
}

/**
 * Call OpenAI API
 */
async function callOpenAI(
  apiKey: string,
  messages: ChatMessage[],
  systemPrompt: string
): Promise<string> {
  const url = "https://api.openai.com/v1/chat/completions";

  const formattedMessages = [
    { role: "system", content: systemPrompt },
    ...messages.map((m) => ({ role: m.role, content: m.content })),
  ];

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: formattedMessages,
      temperature: 0.7,
      max_tokens: 2048,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`OpenAI API error (${res.status}): ${errText}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content || "";
}

/**
 * Call Groq API
 */
async function callGroq(
  apiKey: string,
  messages: ChatMessage[],
  systemPrompt: string
): Promise<string> {
  const url = "https://api.groq.com/openai/v1/chat/completions";

  const formattedMessages = [
    { role: "system", content: systemPrompt },
    ...messages.map((m) => ({ role: m.role, content: m.content })),
  ];

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: formattedMessages,
      temperature: 0.7,
      max_tokens: 2048,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Groq API error (${res.status}): ${errText}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content || "";
}

/**
 * Generate full non-streaming chat response.
 */
export async function generateChatResponse(
  payload: ChatRequestPayload
): Promise<ChatResponsePayload> {
  const { messages } = payload;
  if (!messages || messages.length === 0) {
    throw new Error("No messages provided in request");
  }

  const lastUserMessage =
    [...messages].reverse().find((m) => m.role === "user")?.content || "";
  const systemPrompt = buildSystemPrompt();

  // 1. Try Gemini
  const geminiKey = getGeminiKey();
  if (geminiKey) {
    try {
      const reply = await callGemini(geminiKey, messages, systemPrompt);
      return {
        reply,
        provider: "gemini",
      };
    } catch (err) {
      console.warn("Gemini API call failed, trying next provider:", err);
    }
  }

  // 2. Try OpenAI
  const openaiKey = getOpenAIKey();
  if (openaiKey) {
    try {
      const reply = await callOpenAI(openaiKey, messages, systemPrompt);
      return {
        reply,
        provider: "openai",
      };
    } catch (err) {
      console.warn("OpenAI API call failed, trying next provider:", err);
    }
  }

  // 3. Try Groq
  const groqKey = getGroqKey();
  if (groqKey) {
    try {
      const reply = await callGroq(groqKey, messages, systemPrompt);
      return {
        reply,
        provider: "groq",
      };
    } catch (err) {
      console.warn("Groq API call failed, falling back to local engine:", err);
    }
  }

  // 4. Intelligent Local Knowledge Fallback
  const reply = generateLocalKnowledgeReply(lastUserMessage, messages);
  return {
    reply,
    provider: "local-knowledge-engine",
  };
}

/**
 * Stream a chat response for real-time typewriter rendering.
 */
export async function createChatStream(
  payload: ChatRequestPayload
): Promise<ReadableStream<Uint8Array>> {
  const encoder = new TextEncoder();

  // Generate full text response from the active engine
  const response = await generateChatResponse(payload);
  const text = response.reply;

  // Stream text smoothly in word/character chunks
  return new ReadableStream({
    async start(controller) {
      try {
        const words = text.split(/(\s+)/);
        for (let i = 0; i < words.length; i++) {
          const chunk = words[i];
          controller.enqueue(encoder.encode(chunk));
          // Micro delay to simulate natural stream pacing
          await new Promise((r) => setTimeout(r, 10));
        }
      } catch (err) {
        controller.error(err);
      } finally {
        controller.close();
      }
    },
  });
}
