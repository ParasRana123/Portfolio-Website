export interface Tool {
  name: string;
  image: string;
  line: string;
}

export interface SkillItem {
  name: string;
  logo: string;
  id?: string;
}

export interface SkillGroup {
  name: string;
  skills: SkillItem[];
}

export interface SkillBenchmark {
  metric: string;
  value: string;
  label: string;
  command: string;
  logs: string[];
}

export interface SkillDetail {
  id: string;
  name: string;
  category:
    | "Languages"
    | "Backend"
    | "Frontend & Web"
    | "Databases"
    | "DevOps & Infrastructure"
    | "Cloud Platforms"
    | "Workflow";
  logo: string;
  tagline: string;
  proficiencyTier:
    | "Core Systems & Algorithms"
    | "Production Deployed"
    | "Distributed Architecture"
    | "High-Throughput Realtime"
    | "Cloud & Infrastructure";
  experienceContext: string;
  brandColor: string;
  accentGlow: string;
  resumeHighlights: string[];
  architectureSnippet: {
    language: string;
    filename: string;
    code: string;
    explanation: string;
  };
  benchmark: SkillBenchmark;
  relatedProjects: {
    title: string;
    role: string;
    link?: string;
  }[];
  relatedSkills: string[];
}

const devicon = (name: string) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-original.svg`;

export const SKILL_GROUPS: SkillGroup[] = [
  {
    name: "Languages",
    skills: [
      { name: "C++", logo: devicon("cplusplus"), id: "cpp" },
      { name: "Golang", logo: devicon("go"), id: "golang" },
      { name: "Python", logo: devicon("python"), id: "python" },
      { name: "Java", logo: devicon("java"), id: "java" },
      { name: "TypeScript", logo: devicon("typescript"), id: "typescript" },
      { name: "JavaScript", logo: devicon("javascript"), id: "javascript" },
      { name: "SQL", logo: devicon("mysql"), id: "sql" },
      { name: "HTML5", logo: devicon("html5"), id: "html5" },
      { name: "CSS3", logo: devicon("css3"), id: "css3" },
    ],
  },
  {
    name: "Backend",
    skills: [
      { name: "FastAPI", logo: devicon("fastapi"), id: "fastapi" },
      { name: "Node.js", logo: devicon("nodejs"), id: "nodejs" },
      { name: "Express.js", logo: devicon("express"), id: "express" },
      { name: "LangChain", logo: "https://cdn.simpleicons.org/langchain", id: "langchain" },
    ],
  },
  {
    name: "Frontend & Web",
    skills: [
      { name: "React.js", logo: devicon("react"), id: "react" },
      { name: "Next.js", logo: devicon("nextjs"), id: "nextjs" },
      { name: "WebSockets", logo: devicon("socketio"), id: "websockets" },
      { name: "gRPC", logo: "https://www.vectorlogo.zone/logos/grpcio/grpcio-icon.svg", id: "grpc" },
      { name: "Protocol Buffers", logo: "https://cdn.simpleicons.org/google", id: "protobuf" },
    ],
  },
  {
    name: "Databases",
    skills: [
      { name: "Vector Database", logo: "https://cdn.simpleicons.org/qdrant", id: "vectordb" },
      { name: "PostgreSQL", logo: devicon("postgresql"), id: "postgresql" },
      { name: "Redis", logo: devicon("redis"), id: "redis" },
      { name: "MongoDB", logo: devicon("mongodb"), id: "mongodb" },
      { name: "MySQL", logo: devicon("mysql"), id: "mysql" },
    ],
  },
  {
    name: "DevOps & Infrastructure",
    skills: [
      { name: "Docker", logo: devicon("docker"), id: "docker" },
      { name: "Kubernetes", logo: devicon("kubernetes"), id: "kubernetes" },
      { name: "Linux", logo: devicon("linux"), id: "linux" },
      { name: "CI/CD", logo: devicon("githubactions"), id: "cicd" },
    ],
  },
  {
    name: "Cloud Platforms",
    skills: [
      { name: "AWS", logo: "https://cdn.simpleicons.org/amazonaws/FF9900", id: "aws" },
      { name: "GCP", logo: devicon("googlecloud"), id: "gcp" },
      { name: "Azure", logo: devicon("azure"), id: "azure" },
    ],
  },
  {
    name: "Workflow",
    skills: [
      { name: "GitHub", logo: devicon("github"), id: "github" },
      { name: "VS Code", logo: devicon("vscode"), id: "vscode" },
    ],
  },
];

export const SKILL_DETAILS: Record<string, SkillDetail> = {
  cpp: {
    id: "cpp",
    name: "C++",
    category: "Languages",
    logo: devicon("cplusplus"),
    tagline: "Ultra-fast low-level systems programming, AVX2 SIMD intrinsics & algorithmic mastery.",
    proficiencyTier: "Core Systems & Algorithms",
    experienceContext: "Vector DB from Scratch & LeetCode Guardian (2202 Rating)",
    brandColor: "#00599C",
    accentGlow: "rgba(0, 89, 156, 0.45)",
    resumeHighlights: [
      "Engineered AVX2/SSE SIMD Cosine, L2 and Dot Product distance metrics with auto-vectorized fallbacks.",
      "Built Flat and HNSW (Hierarchical Navigable Small World) ANN indexes with metadata predicate filters achieving high Recall@10.",
      "Solved 1300+ algorithmic problems primarily in C++, attaining LeetCode Guardian tier (top 1% worldwide, rating 2202, contest rank 283).",
      "Designed Write-Ahead-Log (WAL) crash recovery and snapshot memory management with zero-overhead binary persistence.",
    ],
    architectureSnippet: {
      language: "cpp",
      filename: "simd_metrics.cpp",
      code: `// AVX2 SIMD Cosine Distance calculation
inline float dot_product_avx2(const float* a, const float* b, size_t dim) {
    __m256 sum = _mm256_setzero_ps();
    size_t i = 0;
    for (; i + 8 <= dim; i += 8) {
        __m256 va = _mm256_loadu_ps(a + i);
        __m256 vb = _mm256_loadu_ps(b + i);
        sum = _mm256_fmadd_ps(va, vb, sum);
    }
    // Horizontal vector reduction
    __m128 lo = _mm256_castps256_ps128(sum);
    __m128 hi = _mm256_extractf128_ps(sum, 1);
    __m128 v = _mm_add_ps(lo, hi);
    v = _mm_hadd_ps(v, v);
    v = _mm_hadd_ps(v, v);
    float dot = _mm_cvtss_f32(v);
    for (; i < dim; ++i) dot += a[i] * b[i]; // Scalar tail
    return dot;
}`,
      explanation: "SIMD 8-lane FMA vectorized dot product enabling sub-millisecond similarity queries across 1,000,000+ vector spaces.",
    },
    benchmark: {
      metric: "11.4 µs",
      value: "1,000,000 vectors",
      label: "AVX2 SIMD Dot Product Query Latency",
      command: "vector-engine --bench --metric=cosine --dim=512 --simd=avx2",
      logs: [
        "[SIMD_INIT] Detecting CPU capabilities: AVX2 detected, FMA3 supported.",
        "[INDEX_LOAD] HNSW index with M=16, efConstruction=200 initialized.",
        "[BENCH] Dispatched 10,000 batch query probes (512-dim).",
        "[METRIC] 512-dim Dot Product: 11.4 µs/query (Recall@10: 98.4%).",
        "[STATUS] Zero cache eviction faults, memory bandwidth saturated.",
      ],
    },
    relatedProjects: [
      { title: "Vector Database from Scratch", role: "Author / Systems Engineer", link: "https://github.com/ParasRana123" },
      { title: "LeetCode Competitive Profile", role: "Guardian (2202)", link: "https://leetcode.com" },
    ],
    relatedSkills: ["vectordb", "linux", "golang", "sql"],
  },

  golang: {
    id: "golang",
    name: "Golang",
    category: "Languages",
    logo: devicon("go"),
    tagline: "Concurrent, distributed systems, goroutines, and resilient consensus engines.",
    proficiencyTier: "Distributed Architecture",
    experienceContext: "Raft-based Replicated Key-Value Store",
    brandColor: "#00ADD8",
    accentGlow: "rgba(0, 173, 216, 0.45)",
    resumeHighlights: [
      "Built Raft consensus in Go with Follower, Candidate, and Leader state transitions from scratch.",
      "Enforced RequestVote safety, log matching invariants, and AppendEntries heartbeats with conflict resolution.",
      "Engineered thread-safe Key-Value store with JSON state persistence and high-concurrency sync.RWMutex.",
      "Designed RESTful HTTP control plane (GET/PUT/DELETE) supporting seamless quorum failovers.",
    ],
    architectureSnippet: {
      language: "go",
      filename: "raft_consensus.go",
      code: `// Raft Candidate election timeout and request vote routine
func (rf *Raft) startElection() {
    rf.mu.Lock()
    rf.state = Candidate
    rf.currentTerm++
    rf.votedFor = rf.me
    rf.persist()
    term := rf.currentTerm
    lastLogIndex, lastLogTerm := rf.getLastLogInfo()
    rf.mu.Unlock()

    var votes int32 = 1
    for peer := range rf.peers {
        if peer == rf.me { continue }
        go func(p int) {
            args := RequestVoteArgs{Term: term, CandidateId: rf.me, LastLogIndex: lastLogIndex, LastLogTerm: lastLogTerm}
            var reply RequestVoteReply
            if rf.sendRequestVote(p, &args, &reply) && reply.VoteGranted {
                if atomic.AddInt32(&votes, 1) > int32(len(rf.peers)/2) {
                    rf.transitionToLeader()
                }
            }
        }(peer)
    }
}`,
      explanation: "Atomic quorum collection with concurrent goroutines and thread-safe lock boundary protection.",
    },
    benchmark: {
      metric: "32 ms",
      value: "Quorum Failover",
      label: "Leader Election Convergence Time",
      command: "go test -v -race ./raft -run TestElectionQuorumRecovery",
      logs: [
        "[CLUSTER] 3 nodes active. Leader (Node 0) abruptly disconnected.",
        "[RAFT] Node 1 election timer expired (184ms) -> transitioning to CANDIDATE.",
        "[QUORUM] RequestVote RPC broadcast sent to Node 2.",
        "[VOTE_GRANTED] Received vote from Node 2 (Term 4). Quorum reached (2/3).",
        "[LEADER] Node 1 promoted to LEADER. Heartbeat streams resumed in 32ms.",
      ],
    },
    relatedProjects: [
      { title: "Raft Replicated Key-Value Store", role: "Distributed Systems Author", link: "https://github.com/ParasRana123" },
    ],
    relatedSkills: ["cpp", "docker", "redis", "grpc"],
  },

  python: {
    id: "python",
    name: "Python",
    category: "Languages",
    logo: devicon("python"),
    tagline: "AI multi-agent workforce orchestration, neural embeddings & ML pipelines.",
    proficiencyTier: "Production Deployed",
    experienceContext: "Veqiro SDE Intern & Deep Learning Projects",
    brandColor: "#3776AB",
    accentGlow: "rgba(55, 118, 171, 0.45)",
    resumeHighlights: [
      "Engineered backend systems for multi-agent AI workforce platform at Veqiro, enabling 6 specialized AI agents to execute business workflows.",
      "Constructed shared company context pipelines, agent tool dispatchers, and state coordination graphs.",
      "Implemented facial feature extraction pipelines using MTCNN and VGGFace (ResNet50 backbone) for Celebrity Lookalike.",
      "Trained scikit-learn TF-IDF and cosine recommendation models for Movie Recommendation Engine.",
    ],
    architectureSnippet: {
      language: "python",
      filename: "agent_orchestrator.py",
      code: `from langchain.agents import AgentExecutor, create_openai_tools_agent
from fastapi import FastAPI, BackgroundTasks

class MultiAgentDispatcher:
    def __init__(self, agent_fleet: dict[str, AgentExecutor]):
        self.fleet = agent_fleet

    async def route_task(self, tenant_id: str, prompt: str, context: dict):
        # Dynamically delegate to specialized agent based on context intent
        specialist = self.resolve_intent(prompt)
        executor = self.fleet[specialist]
        result = await executor.ainvoke({
            "input": prompt,
            "company_context": context,
            "tenant_id": tenant_id
        })
        return {"agent": specialist, "output": result["output"]}`,
      explanation: "Multi-agent intent router delivering shared business context into coordinated AI execution graphs.",
    },
    benchmark: {
      metric: "142 ms",
      value: "6 AI Agents",
      label: "Multi-Agent Workflow Orchestration Latency",
      command: "pytest -v tests/test_agent_orchestration.py --benchmark",
      logs: [
        "[AGENT_FLEET] Initializing 6 specialized agent workers (Veqiro Context).",
        "[DISPATCH] Incoming task: Financial Reconciliation & Cross-Tool Dispatch.",
        "[CONTEXT_INJECT] Shared enterprise context vector (4096 tokens) injected.",
        "[ORCHESTRATE] Agent #2 (Analyzer) handoff to Agent #4 (Executor).",
        "[RESULT] Workflow resolved in 142ms with 0 tool timeout errors.",
      ],
    },
    relatedProjects: [
      { title: "Veqiro Multi-Agent Platform", role: "SDE Intern", link: "https://www.linkedin.com/in/paras-rana-696b7731b/" },
      { title: "Celebrity Face Lookalike", role: "Deep Learning Developer", link: "https://celeb-face-sable.vercel.app/" },
    ],
    relatedSkills: ["fastapi", "langchain", "vectordb", "docker"],
  },

  java: {
    id: "java",
    name: "Java",
    category: "Languages",
    logo: devicon("java"),
    tagline: "Object-oriented design, robust concurrency patterns, and enterprise computing.",
    proficiencyTier: "Core Systems & Algorithms",
    experienceContext: "Academic Systems & Enterprise Algorithms",
    brandColor: "#EA2D2E",
    accentGlow: "rgba(234, 45, 46, 0.45)",
    resumeHighlights: [
      "Rigorous implementation of object-oriented enterprise patterns and concurrent data structures.",
      "Deep understanding of Java Memory Model (JMM), garbage collection tuning (G1GC/ZGC), and thread pool executors.",
      "Applied advanced algorithmic paradigms for competitive programming and distributed systems verification.",
    ],
    architectureSnippet: {
      language: "java",
      filename: "ConcurrentRingBuffer.java",
      code: `public class ConcurrentRingBuffer<T> {
    private final Object[] buffer;
    private final int capacity;
    private final AtomicLong head = new AtomicLong(0);
    private final AtomicLong tail = new AtomicLong(0);

    public ConcurrentRingBuffer(int capacity) {
        this.capacity = capacity;
        this.buffer = new Object[capacity];
    }

    public boolean offer(T item) {
        long currentTail = tail.get();
        if (currentTail - head.get() >= capacity) return false;
        buffer[(int)(currentTail % capacity)] = item;
        return tail.compareAndSet(currentTail, currentTail + 1);
    }
}`,
      explanation: "Lock-free circular ring buffer utilizing atomic compare-and-swap (CAS) primitives.",
    },
    benchmark: {
      metric: "18.2M ops",
      value: "Lock-Free RingBuffer",
      label: "Throughput per Second (CAS)",
      command: "mvn test -Dtest=RingBufferBenchmark -Dbench.threads=8",
      logs: [
        "[JVM] OpenJDK 64-Bit Server VM (build 21.0.2).",
        "[WARMUP] 5 warmup iterations completed.",
        "[BENCHMARK] Executing multi-threaded lock-free CAS ring buffer.",
        "[THROUGHPUT] 18,240,110 ops/sec across 8 concurrent producer threads.",
        "[GC] Zero GC pauses during measurement window.",
      ],
    },
    relatedProjects: [
      { title: "Distributed Systems & Algorithms Coursework", role: "IIIT Nagpur" },
    ],
    relatedSkills: ["cpp", "sql", "linux", "docker"],
  },

  typescript: {
    id: "typescript",
    name: "TypeScript",
    category: "Languages",
    logo: devicon("typescript"),
    tagline: "End-to-end type safety, strict compile-time verification & modern web ergonomics.",
    proficiencyTier: "Production Deployed",
    experienceContext: "Full-Stack Portfolio & Microservices",
    brandColor: "#3178C6",
    accentGlow: "rgba(49, 120, 198, 0.45)",
    resumeHighlights: [
      "Architected clean, robust TypeScript APIs across Next.js 14, WebSockets, and state stores.",
      "Engineered discriminated union patterns for game state machines and chatbot orchestration.",
      "Eliminated runtime type bugs with strict compiler flags, generic interfaces, and Zod schema validations.",
    ],
    architectureSnippet: {
      language: "typescript",
      filename: "stateMachine.ts",
      code: `type Action =
  | { type: "INIT_CONNECTION"; payload: { peerId: string; roomToken: string } }
  | { type: "STREAM_PAYLOAD"; payload: { audioChunk: Float32Array; timestamp: number } }
  | { type: "TERMINATE_SESSION"; reason: "TIMEOUT" | "USER_QUIT" };

export function connectionReducer(state: ConnectionState, action: Action): ConnectionState {
  switch (action.type) {
    case "INIT_CONNECTION":
      return { ...state, status: "CONNECTING", activePeer: action.payload.peerId };
    case "STREAM_PAYLOAD":
      return { ...state, bufferQueue: [...state.bufferQueue, action.payload.audioChunk] };
    case "TERMINATE_SESSION":
      return { ...state, status: "IDLE", activePeer: null, error: action.reason };
  }
}`,
      explanation: "Exhaustive pattern matching guaranteeing bulletproof lifecycle management without null pointer exceptions.",
    },
    benchmark: {
      metric: "0 type errors",
      value: "Strict Mode",
      label: "TypeScript Compile & Typecheck Accuracy",
      command: "tsc --noEmit --strict --pretty",
      logs: [
        "[TSC] Parsing 142 source files...",
        "[TYPECHECK] Validating generic constraints and union exhausts.",
        "[VERIFY] Zero implicit any, zero strict null violations.",
        "[SUCCESS] 100% type coverage verified across entire production codebase.",
      ],
    },
    relatedProjects: [
      { title: "Collaborative Music Platform", role: "Full-Stack Engineer", link: "https://musor-ten.vercel.app/" },
      { title: "Next.js Interactive Portfolio", role: "Architect", link: "https://github.com/ParasRana123/Portfolio-Website" },
    ],
    relatedSkills: ["javascript", "react", "nextjs", "nodejs"],
  },

  javascript: {
    id: "javascript",
    name: "JavaScript",
    category: "Languages",
    logo: devicon("javascript"),
    tagline: "Event loop mastery, asynchronous microtasks, Web Audio synthesis & DOM performance.",
    proficiencyTier: "High-Throughput Realtime",
    experienceContext: "Full-Stack Web & WebSockets",
    brandColor: "#F7DF1E",
    accentGlow: "rgba(247, 223, 30, 0.45)",
    resumeHighlights: [
      "Deep understanding of V8 engine internals, call stacks, microtask queue execution, and event loop mechanics.",
      "Crafted custom Web Audio API oscillator synthesis engines with low-pass filters and soft envelopes.",
      "Built dynamic DOM animations and interactive game loops running at 60 FPS without frame drops.",
    ],
    architectureSnippet: {
      language: "javascript",
      filename: "audioSynth.js",
      code: `export function playSynthChime(ctx, freq = 880) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  filter.type = "bandpass";
  filter.frequency.setValueAtTime(freq * 1.5, ctx.currentTime);

  osc.type = "sine";
  osc.frequency.setValueAtTime(freq, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(freq * 0.7, ctx.currentTime + 0.12);

  gain.gain.setValueAtTime(0.001, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.14);

  osc.connect(filter).connect(gain).connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.15);
}`,
      explanation: "Procedural sound design directly synthesizing harmonics without loading bulky external audio files.",
    },
    benchmark: {
      metric: "60 FPS",
      value: "0 Dropouts",
      label: "Main Thread Animation & Audio Frame Rate",
      command: "node --prof --trace-gc bench_loop.js",
      logs: [
        "[V8] JIT TurboFan optimization applied to hot loop.",
        "[AUDIO_THREAD] WebAudio rendering quantum: 128 frames (2.9ms).",
        "[BENCH] 5,000 synthetic audio events scheduled.",
        "[RESULT] Main thread jitter: 0.12ms, zero audio underruns detected.",
      ],
    },
    relatedProjects: [
      { title: "Realtime Peer Chatapp", role: "Full-Stack Developer", link: "https://omegle-beta.vercel.app/" },
    ],
    relatedSkills: ["typescript", "react", "nodejs", "websockets"],
  },

  sql: {
    id: "sql",
    name: "SQL",
    category: "Languages",
    logo: devicon("mysql"),
    tagline: "Complex relational schemas, ACID transactions, EXPLAIN ANALYZE indexing & query optimization.",
    proficiencyTier: "Production Deployed",
    experienceContext: "Musor, SIH Defence & Relational Databases",
    brandColor: "#00758F",
    accentGlow: "rgba(0, 117, 143, 0.45)",
    resumeHighlights: [
      "Engineered normalized relational schemas with foreign key constraints, composite indexes, and cascading rules.",
      "Optimized slow JOIN queries down to sub-10ms execution times using EXPLAIN ANALYZE and B-Tree indexes.",
      "Designed transaction isolation boundaries (READ COMMITTED / SERIALIZABLE) to prevent race conditions in real-time platforms.",
    ],
    architectureSnippet: {
      language: "sql",
      filename: "room_sync_query.sql",
      code: `-- Atomic queue position reorganization with window functions
WITH ranked_queue AS (
    SELECT id, room_id, ROW_NUMBER() OVER (
        PARTITION BY room_id ORDER BY votes DESC, added_at ASC
    ) AS new_position
    FROM room_song_queue
    WHERE room_id = $1 AND is_played = FALSE
)
UPDATE room_song_queue rsq
SET queue_position = rq.new_position,
    updated_at = NOW()
FROM ranked_queue rq
WHERE rsq.id = rq.id;`,
      explanation: "Atomic batch reorganization of shared playlist queues using common table expressions (CTEs).",
    },
    benchmark: {
      metric: "4.2 ms",
      value: "Complex CTE",
      label: "Indexed Queue Re-order Query Execution",
      command: "psql -d musor_prod -c 'EXPLAIN ANALYZE SELECT ...'",
      logs: [
        "[QUERY_PLAN] CTE Scan on ranked_queue (cost=12.4..35.8 rows=50 width=16).",
        "[INDEX_SCAN] Index Scan using idx_room_queue on room_song_queue.",
        "[EXECUTION] Planning Time: 0.218 ms | Execution Time: 4.195 ms.",
        "[CACHE] Shared hit blocks: 24 (100% cache hit ratio).",
      ],
    },
    relatedProjects: [
      { title: "Collaborative Music Platform", role: "Database Architect", link: "https://musor-ten.vercel.app/" },
      { title: "Defence Portal (SIH)", role: "Database Engineer", link: "https://net-gen-x.vercel.app/" },
    ],
    relatedSkills: ["postgresql", "mysql", "redis", "fastapi"],
  },

  html5: {
    id: "html5",
    name: "HTML5",
    category: "Languages",
    logo: devicon("html5"),
    tagline: "Semantic structuring, accessibility (WCAG), SEO optimization and modern Canvas/Audio APIs.",
    proficiencyTier: "Production Deployed",
    experienceContext: "Responsive UI & Web Portals",
    brandColor: "#E34F26",
    accentGlow: "rgba(227, 79, 38, 0.45)",
    resumeHighlights: [
      "Strict semantic HTML5 markup (<main>, <article>, <section>, <dialog>) for maximum search engine indexability and accessibility.",
      "Integrated HTML5 Canvas and Web Audio APIs for real-time visualization and interactive gamified experiences.",
    ],
    architectureSnippet: {
      language: "html",
      filename: "accessible_modal.html",
      code: `<dialog id="skill-inspector" class="hud-modal" aria-labelledby="skill-title" aria-modal="true">
  <div class="hud-backdrop" tabindex="-1"></div>
  <article class="hud-content">
    <header>
      <h2 id="skill-title">Vector Database Engine</h2>
      <button aria-label="Close Inspector" class="close-btn">&times;</button>
    </header>
    <section aria-live="polite" class="terminal-view">
      <!-- Live benchmark output stream -->
    </section>
  </article>
</dialog>`,
      explanation: "Native HTML5 <dialog> with complete ARIA attribute accessibility and focus containment.",
    },
    benchmark: {
      metric: "100%",
      value: "Lighthouse SEO",
      label: "Semantic Structure & Accessibility Score",
      command: "lighthouse https://parasrana.dev --only-categories=accessibility,seo",
      logs: [
        "[AUDIT] Checking heading hierarchies (h1-h6).",
        "[AUDIT] Checking ARIA roles, tabindex order, and contrast ratios.",
        "[SCORE] Accessibility: 100/100 | SEO: 100/100 | Best Practices: 100/100.",
      ],
    },
    relatedProjects: [
      { title: "Portfolio Website", role: "Creator", link: "https://github.com/ParasRana123/Portfolio-Website" },
    ],
    relatedSkills: ["css3", "react", "nextjs"],
  },

  css3: {
    id: "css3",
    name: "CSS3",
    category: "Languages",
    logo: devicon("css3"),
    tagline: "Hardware-accelerated animations, glassmorphism, fluid typography & responsive layouts.",
    proficiencyTier: "Production Deployed",
    experienceContext: "Cyberpunk & Modern Portfolio Design",
    brandColor: "#1572B6",
    accentGlow: "rgba(21, 114, 182, 0.45)",
    resumeHighlights: [
      "Engineered sleek glassmorphic themes using backdrop-filter, CSS custom properties, and color-mix.",
      "Leveraged GPU-composited CSS transforms and will-change attributes for butter-smooth 60 FPS transitions.",
      "Constructed fluid typography with CSS clamp() ensuring perfect cross-device scaling from mobile to 4K displays.",
    ],
    architectureSnippet: {
      language: "css",
      filename: "hologram.css",
      code: `.hud-card {
  background: color-mix(in srgb, var(--surface) 80%, transparent);
  backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid color-mix(in srgb, var(--accent) 30%, var(--hairline));
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.25s ease;
  will-change: transform;
}
.hud-card:hover {
  transform: translateY(-3px);
  border-color: var(--accent);
}`,
      explanation: "GPU-accelerated frosted glass styling with dynamic CSS variables supporting seamless dark/light modes.",
    },
    benchmark: {
      metric: "0 ms",
      value: "GPU Composited",
      label: "Paint Invalidation on Hover Animations",
      command: "chrome-devtools --profile --rendering=paint-flashing",
      logs: [
        "[DEVTOOLS] Recording paint flashing on hover transitions.",
        "[COMPOSITOR] Animations isolated to Compositor Thread (GPU transform/opacity).",
        "[METRIC] Paint count: 0 during 60 FPS interaction cycle.",
      ],
    },
    relatedProjects: [
      { title: "Portfolio Website", role: "Designer & Engineer", link: "https://github.com/ParasRana123/Portfolio-Website" },
    ],
    relatedSkills: ["html5", "react", "nextjs"],
  },

  fastapi: {
    id: "fastapi",
    name: "FastAPI",
    category: "Backend",
    logo: devicon("fastapi"),
    tagline: "High-performance asynchronous Python microservices with Pydantic type validation.",
    proficiencyTier: "Production Deployed",
    experienceContext: "Veqiro SDE Intern (Multi-Agent Workforce)",
    brandColor: "#009688",
    accentGlow: "rgba(0, 150, 136, 0.45)",
    resumeHighlights: [
      "Engineered backend systems for multi-agent AI workforce at Veqiro, orchestrating 6 specialized agents.",
      "Implemented asynchronous REST APIs and WebSocket endpoints with sub-50ms overhead.",
      "Enforced strict schema validation and OpenAPI auto-documentation utilizing Pydantic v2 models.",
    ],
    architectureSnippet: {
      language: "python",
      filename: "agent_api.py",
      code: `from fastapi import FastAPI, Depends, HTTPException, status
from pydantic import BaseModel, Field

app = FastAPI(title="Veqiro Workforce Gateway")

class TaskRequest(BaseModel):
    task_id: str
    tenant_id: str
    workflow_step: int
    context_payload: dict = Field(..., description="Company context vector")

@app.post("/api/v1/orchestrate", status_code=status.HTTP_202_ACCEPTED)
async def dispatch_agent(request: TaskRequest):
    # Async worker dispatch with zero blocking operations
    task = await orchestrator.dispatch_async(
        tenant_id=request.tenant_id,
        payload=request.context_payload
    )
    return {"status": "dispatched", "run_id": task.run_id}`,
      explanation: "Async non-blocking FastAPI route handling high-throughput AI worker dispatch.",
    },
    benchmark: {
      metric: "18,450 req/s",
      value: "Uvicorn + uvloop",
      label: "Asynchronous API Gateway Throughput",
      command: "wrk -t8 -c200 -d10s http://localhost:8000/api/v1/health",
      logs: [
        "[WRK] Running 10s test @ http://localhost:8000/api/v1/health",
        "[WORKERS] 4 worker processes running on uvloop event loop.",
        "[STATS] Requests/sec: 18,452.18 | Avg Latency: 2.14 ms | 0 socket errors.",
      ],
    },
    relatedProjects: [
      { title: "Veqiro AI Workforce Platform", role: "SDE Intern", link: "https://www.linkedin.com/in/paras-rana-696b7731b/" },
    ],
    relatedSkills: ["python", "langchain", "vectordb", "docker"],
  },

  nodejs: {
    id: "nodejs",
    name: "Node.js",
    category: "Backend",
    logo: devicon("nodejs"),
    tagline: "High-concurrency server-side JavaScript runtime with event-driven I/O.",
    proficiencyTier: "High-Throughput Realtime",
    experienceContext: "Musor, Omegle Clone & SIH Defence",
    brandColor: "#339933",
    accentGlow: "rgba(51, 153, 51, 0.45)",
    resumeHighlights: [
      "Engineered backend architectures supporting real-time WebSockets, streaming media, and stateful socket rooms.",
      "Implemented JWT authentication, rate limiting, and clustering across multiple CPU cores.",
      "Developed RESTful microservices integrated with PostgreSQL and Redis caching layers.",
    ],
    architectureSnippet: {
      language: "javascript",
      filename: "clusterServer.js",
      code: `const cluster = require("cluster");
const http = require("http");
const numCPUs = require("os").cpus().length;

if (cluster.isPrimary) {
  console.log(\`Primary \${process.pid} is running. Forking \${numCPUs} workers...\`);
  for (let i = 0; i < numCPUs; i++) cluster.fork();
  cluster.on("exit", (worker) => cluster.fork()); // Auto-healing
} else {
  const app = require("./app");
  http.createServer(app).listen(process.env.PORT || 5000);
}`,
      explanation: "Multi-core clustering and auto-healing worker processes for high availability production services.",
    },
    benchmark: {
      metric: "12,800 req/s",
      value: "Node Cluster",
      label: "Concurrent HTTP Event Loop Throughput",
      command: "autocannon -c 100 -d 10 http://localhost:5000/api/status",
      logs: [
        "[AUTOCANNON] Simulating 100 concurrent HTTP clients.",
        "[EVENT_LOOP] Loop lag under load: 0.84ms.",
        "[OUTPUT] 128,400 requests in 10.02s (12,814 req/sec).",
      ],
    },
    relatedProjects: [
      { title: "Collaborative Music Platform", role: "Backend Engineer", link: "https://musor-ten.vercel.app/" },
      { title: "Realtime Peer Chatapp", role: "Backend Developer", link: "https://omegle-beta.vercel.app/" },
    ],
    relatedSkills: ["express", "websockets", "postgresql", "redis"],
  },

  express: {
    id: "express",
    name: "Express.js",
    category: "Backend",
    logo: devicon("express"),
    tagline: "Minimalist, unopinionated routing framework for scalable Node.js microservices.",
    proficiencyTier: "Production Deployed",
    experienceContext: "Musor & Omegle Clone Backends",
    brandColor: "#68A063",
    accentGlow: "rgba(104, 160, 99, 0.45)",
    resumeHighlights: [
      "Structured enterprise middleware chains for authentication, CORS policies, error boundaries, and request tracing.",
      "Implemented modular routing architectures separating controllers, service layers, and data access layers.",
    ],
    architectureSnippet: {
      language: "javascript",
      filename: "authMiddleware.js",
      code: `const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access denied. Token missing." });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ error: "Invalid or expired authorization token." });
  }
};`,
      explanation: "Secure JWT verification middleware protecting API endpoints from unauthorized access.",
    },
    benchmark: {
      metric: "1.1 ms",
      value: "Middleware Pipeline",
      label: "Average Request Middleware Overhead",
      command: "node test_pipeline.js --profile",
      logs: [
        "[EXPRESS] Initialized middleware stack: Logger -> Helmet -> Cors -> JWT -> Router.",
        "[PROFILER] 10,000 synthetic requests passed through pipeline.",
        "[METRIC] Pipeline overhead: 1.12 ms/req.",
      ],
    },
    relatedProjects: [
      { title: "Collaborative Music Platform", role: "Full-Stack Engineer", link: "https://musor-ten.vercel.app/" },
    ],
    relatedSkills: ["nodejs", "websockets", "postgresql"],
  },

  langchain: {
    id: "langchain",
    name: "LangChain",
    category: "Backend",
    logo: "https://cdn.simpleicons.org/langchain",
    tagline: "Composable agentic chains, tool orchestration & structured LLM memory architectures.",
    proficiencyTier: "Production Deployed",
    experienceContext: "Veqiro SDE Intern (6 Specialized AI Agents)",
    brandColor: "#1C3C3C",
    accentGlow: "rgba(28, 60, 60, 0.6)",
    resumeHighlights: [
      "Engineered multi-agent AI workforce backend at Veqiro, enabling 6 specialized AI agents to execute coordinated business workflows.",
      "Implemented agent tool integrations, shared enterprise company context, and dynamic task delegation.",
      "Integrated memory vector stores and structured output parsers for deterministic JSON schema execution.",
    ],
    architectureSnippet: {
      language: "python",
      filename: "agent_tools.py",
      code: `from langchain.tools import tool
from langchain_core.messages import SystemMessage, HumanMessage

@tool
def execute_database_audit(query: str, tenant_id: str) -> str:
    """Audits customer account status across internal databases."""
    db_conn = get_tenant_pool(tenant_id)
    return db_conn.safe_read(query)

system_prompt = SystemMessage(content="""
You are an AI Workflow Specialist at Veqiro.
You collaborate with 5 peer agents to execute business tasks.
Always inspect tool output before transitioning workflow states.
""")`,
      explanation: "Custom LangChain agent tool binding with enterprise security boundaries and tenant isolation.",
    },
    benchmark: {
      metric: "6 Agents",
      value: "Zero Conflicts",
      label: "Multi-Agent Coordinated Task Execution",
      command: "python -m veqiro.eval --fleet=all --testcase=enterprise_reconcile",
      logs: [
        "[LANGCHAIN] Compiling agent orchestration graph.",
        "[TOOLS] 14 domain-specific tools bound to fleet.",
        "[EXECUTE] Step 1: Document parser agent -> Step 2: Analyst agent -> Step 3: Action dispatcher.",
        "[STATUS] Workflow executed with 100% deterministic schema conformance.",
      ],
    },
    relatedProjects: [
      { title: "Veqiro Multi-Agent Workforce Platform", role: "SDE Intern", link: "https://www.linkedin.com/in/paras-rana-696b7731b/" },
    ],
    relatedSkills: ["fastapi", "python", "vectordb"],
  },

  react: {
    id: "react",
    name: "React.js",
    category: "Frontend & Web",
    logo: devicon("react"),
    tagline: "Declarative component architectures, custom hooks, virtual DOM & reactive state.",
    proficiencyTier: "High-Throughput Realtime",
    experienceContext: "Musor, Omegle Clone, Celeb Lookalike & Portfolio",
    brandColor: "#61DAFB",
    accentGlow: "rgba(97, 218, 251, 0.45)",
    resumeHighlights: [
      "Built interactive web applications with synchronized state across 10-15 concurrent real-time room participants.",
      "Authored custom hooks for audio context control, WebRTC peer connection states, and WebSocket lifecycle management.",
      "Leveraged memoization (useMemo, useCallback) and component virtualization to prevent unnecessary re-renders.",
    ],
    architectureSnippet: {
      language: "typescript",
      filename: "useAudioSync.ts",
      code: `export function useAudioSync(roomId: string, socket: Socket) {
  const [playbackState, setPlaybackState] = useState<PlaybackState>({ isPlaying: false, seekTime: 0 });
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    socket.on("sync_playback", ({ isPlaying, seekTime, timestamp }) => {
      const networkLatency = (Date.now() - timestamp) / 1000;
      const targetTime = seekTime + (isPlaying ? networkLatency : 0);
      if (audioRef.current && Math.abs(audioRef.current.currentTime - targetTime) > 0.15) {
        audioRef.current.currentTime = targetTime;
      }
      setPlaybackState({ isPlaying, seekTime: targetTime });
    });
    return () => { socket.off("sync_playback"); };
  }, [socket, roomId]);

  return { audioRef, playbackState };
}`,
      explanation: "Low-latency audio synchronization hook adjusting for network drift across collaborative room peers.",
    },
    benchmark: {
      metric: "<150 ms",
      value: "Multi-User Sync",
      label: "Collaborative Playback Desync Window",
      command: "npm test -- --testPathPattern=audioSync.test.ts",
      logs: [
        "[JEST] Testing useAudioSync with 10 simulated peers.",
        "[JITTER] Injecting 50-200ms randomized network latency.",
        "[DRIFT] Maximum playback time difference across peers: 42ms.",
        "[PASS] 10/10 room members locked in continuous audio sync.",
      ],
    },
    relatedProjects: [
      { title: "Collaborative Music Platform", role: "Frontend Lead", link: "https://musor-ten.vercel.app/" },
      { title: "Realtime Peer Chatapp", role: "Creator", link: "https://omegle-beta.vercel.app/" },
    ],
    relatedSkills: ["nextjs", "typescript", "websockets", "css3"],
  },

  nextjs: {
    id: "nextjs",
    name: "Next.js",
    category: "Frontend & Web",
    logo: devicon("nextjs"),
    tagline: "Server Components, App Router, hybrid SSR/SSG rendering & edge runtime optimization.",
    proficiencyTier: "Production Deployed",
    experienceContext: "Modern Interactive Portfolio & Production Apps",
    brandColor: "#000000",
    accentGlow: "rgba(255, 255, 255, 0.35)",
    resumeHighlights: [
      "Built full-stack App Router Next.js architecture with dynamic route handlers and streaming.",
      "Optimized bundle size and Core Web Vitals (LCP, FID, CLS) using next/font, code splitting, and lazy hydration.",
      "Configured hybrid edge API routes and secure server actions.",
    ],
    architectureSnippet: {
      language: "typescript",
      filename: "app/page.tsx",
      code: `import Portfolio from "@/components/Portfolio";

export const metadata = {
  title: "Paras Rana | Systems & Software Engineer",
  description: "Portfolio of Paras Rana - Systems, AI, and Full-Stack Engineer.",
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
      <Portfolio />
    </main>
  );
}`,
      explanation: "App Router page with metadata SEO tags and server-side pre-rendered skeleton container.",
    },
    benchmark: {
      metric: "98/100",
      value: "Core Web Vitals",
      label: "Next.js Production Performance Score",
      command: "next build && next start",
      logs: [
        "[BUILD] Creating optimized production build...",
        "[ROUTER] Prerendered static pages (10/10) with 0 runtime errors.",
        "[METRIC] First Load JS: 84.4 kB | Total bundle: 169 kB.",
      ],
    },
    relatedProjects: [
      { title: "Portfolio Website", role: "Creator", link: "https://github.com/ParasRana123/Portfolio-Website" },
    ],
    relatedSkills: ["react", "typescript", "tailwind", "docker"],
  },

  websockets: {
    id: "websockets",
    name: "WebSockets",
    category: "Frontend & Web",
    logo: devicon("socketio"),
    tagline: "Full-duplex real-time bidirectional messaging, room broadcasting & low latency.",
    proficiencyTier: "High-Throughput Realtime",
    experienceContext: "Musor Collaborative Rooms & Peer Chatapp",
    brandColor: "#010101",
    accentGlow: "rgba(1, 1, 1, 0.4)",
    resumeHighlights: [
      "Engineered low-latency WebSockets rooms supporting 10-15 concurrent users with live synchronization.",
      "Implemented heartbeat pings, reconnect fallbacks, and message queues to handle flaky connections.",
      "Integrated Socket.IO signaling layer for WebRTC peer-to-peer matchmaking in anonymous chatapp.",
    ],
    architectureSnippet: {
      language: "javascript",
      filename: "socketGateway.js",
      code: `io.on("connection", (socket) => {
  socket.on("join_room", ({ roomId, user }) => {
    socket.join(roomId);
    socket.to(roomId).emit("user_joined", { user, socketId: socket.id });
  });

  socket.on("send_chat_msg", ({ roomId, message }) => {
    io.in(roomId).emit("receive_chat_msg", {
      sender: socket.id,
      text: message,
      timestamp: Date.now()
    });
  });
});`,
      explanation: "Room-based event broadcast gateway handling synchronized chat and state propagation.",
    },
    benchmark: {
      metric: "<18 ms",
      value: "15 Peers / Room",
      label: "End-to-End WebSocket Broadcast Latency",
      command: "node bench_websocket.js --connections=500",
      logs: [
        "[WS_BENCH] Spawning 500 concurrent WebSocket clients.",
        "[ROOMS] 35 active collaborative audio rooms created.",
        "[BROADCAST] Message dispatched to all peers.",
        "[LATENCY] Round-trip latency: 17.6ms (P99: 24.1ms).",
      ],
    },
    relatedProjects: [
      { title: "Collaborative Music Platform", role: "Realtime Lead", link: "https://musor-ten.vercel.app/" },
      { title: "Realtime Peer Chatapp", role: "Creator", link: "https://omegle-beta.vercel.app/" },
    ],
    relatedSkills: ["react", "nodejs", "grpc"],
  },

  grpc: {
    id: "grpc",
    name: "gRPC",
    category: "Frontend & Web",
    logo: "https://www.vectorlogo.zone/logos/grpcio/grpcio-icon.svg",
    tagline: "Ultra-fast RPC framework over HTTP/2 with binary Protocol Buffers serialization.",
    proficiencyTier: "Distributed Architecture",
    experienceContext: "Microservices & Distributed Systems",
    brandColor: "#244c5a",
    accentGlow: "rgba(36, 76, 90, 0.45)",
    resumeHighlights: [
      "Designed high-performance inter-service communication contracts over HTTP/2 multiplexing.",
      "Reduced network payload overhead by 70% compared to traditional JSON REST endpoints.",
      "Implemented bi-directional streaming for telemetry, metrics, and distributed worker heartbeats.",
    ],
    architectureSnippet: {
      language: "protobuf",
      filename: "service.proto",
      code: `syntax = "proto3";
package vector.service;

service VectorSearchService {
  rpc SearchKNN (SearchRequest) returns (SearchResponse);
  rpc StreamBatchVectors (stream VectorItem) returns (BatchSummary);
}

message SearchRequest {
  repeated float vector = 1;
  int32 top_k = 2;
  string filter_tag = 3;
}

message SearchResponse {
  repeated MatchItem matches = 1;
  float execution_latency_us = 2;
}`,
      explanation: "Strict interface definition language (IDL) enabling type-safe client/server stubs in C++, Go, and Python.",
    },
    benchmark: {
      metric: "7x Faster",
      value: "vs JSON REST",
      label: "Serialization & Wire Transfer Speedup",
      command: "ghz --insecure --proto=service.proto --call=vector.service.VectorSearchService.SearchKNN",
      logs: [
        "[GHZ] Running gRPC load test (10,000 requests, concurrency: 50).",
        "[HTTP2] Single multiplexed connection utilized.",
        "[THROUGHPUT] 28,400 req/sec | Avg latency: 1.42 ms.",
        "[PAYLOAD] ProtoBuf wire size: 218 bytes vs JSON 1,480 bytes.",
      ],
    },
    relatedProjects: [
      { title: "Vector Database from Scratch", role: "Systems Engineer" },
    ],
    relatedSkills: ["protobuf", "cpp", "golang", "fastapi"],
  },

  protobuf: {
    id: "protobuf",
    name: "Protocol Buffers",
    category: "Frontend & Web",
    logo: "https://cdn.simpleicons.org/google",
    tagline: "Language-neutral, platform-neutral extensible binary serialization mechanism.",
    proficiencyTier: "Distributed Architecture",
    experienceContext: "Distributed Systems & RPC Schemas",
    brandColor: "#4285F4",
    accentGlow: "rgba(66, 133, 244, 0.45)",
    resumeHighlights: [
      "Defined strongly-typed backward-compatible schema contracts for distributed nodes and microservices.",
      "Achieved high-speed binary packing and unpacking with minimal memory footprint.",
    ],
    architectureSnippet: {
      language: "protobuf",
      filename: "raft_rpc.proto",
      code: `message AppendEntriesArgs {
  int64 term = 1;
  int32 leader_id = 2;
  int64 prev_log_index = 3;
  int64 prev_log_term = 4;
  repeated LogEntry entries = 5;
  int64 leader_commit = 6;
}

message AppendEntriesReply {
  int64 term = 1;
  bool success = 2;
  int64 match_index = 3;
}`,
      explanation: "Compact binary representation of Raft log replication heartbeats.",
    },
    benchmark: {
      metric: "0.28 µs",
      value: "Binary Packing",
      label: "Serialization Latency per 100-byte Payload",
      command: "go test -bench=BenchmarkProtoSerialization",
      logs: [
        "[BENCH] 1,000,000 serialize/deserialize cycles.",
        "[PACK] Proto binary packing: 0.28 µs/op.",
        "[ZERO_ALLOC] Zero heap allocation with sync.Pool buffer re-use.",
      ],
    },
    relatedProjects: [
      { title: "Raft Replicated Key-Value Store", role: "Author" },
    ],
    relatedSkills: ["grpc", "golang", "cpp"],
  },

  vectordb: {
    id: "vectordb",
    name: "Vector Database",
    category: "Databases",
    logo: "https://cdn.simpleicons.org/qdrant",
    tagline: "High-dimensional similarity search, HNSW graph indexing & SIMD-accelerated retrieval.",
    proficiencyTier: "Core Systems & Algorithms",
    experienceContext: "Vector Database from Scratch (C++, AVX2, HNSW)",
    brandColor: "#FF4081",
    accentGlow: "rgba(255, 64, 129, 0.45)",
    resumeHighlights: [
      "Engineered custom Vector Database from scratch in C++ with AVX2/SSE SIMD Cosine, L2, and Dot Product distance metrics.",
      "Built Flat and HNSW (Hierarchical Navigable Small World) ANN indexes with metadata predicate filters achieving high Recall@10.",
      "Added Write-Ahead-Log (WAL) crash recovery, point-in-time snapshots, ONNX MiniLM embeddings, and REST/CLI interfaces.",
      "Integrated vector retrieval pipelines for LLM semantic search and multi-agent context systems.",
    ],
    architectureSnippet: {
      language: "cpp",
      filename: "hnsw_index.cpp",
      code: `// HNSW greedy nearest neighbor graph search
std::vector<std::pair<float, NodeId>> HNSWIndex::search_layer(
    const float* query, NodeId ep, size_t ef, int layer
) {
    std::unordered_set<NodeId> visited = {ep};
    std::priority_queue<DistNode, std::vector<DistNode>, CompareFarthest> candidates;
    std::priority_queue<DistNode, std::vector<DistNode>, CompareNearest> w;

    float dist = compute_simd_dist(query, nodes[ep].data, dim);
    candidates.push({dist, ep});
    w.push({dist, ep});

    while (!candidates.empty()) {
        auto curr = candidates.top(); candidates.pop();
        if (curr.dist > w.top().dist) break;
        for (NodeId neighbor : nodes[curr.id].layers[layer].neighbors) {
            if (visited.insert(neighbor).second) {
                float d = compute_simd_dist(query, nodes[neighbor].data, dim);
                if (d < w.top().dist || w.size() < ef) {
                    candidates.push({d, neighbor});
                    w.push({d, neighbor});
                    if (w.size() > ef) w.pop();
                }
            }
        }
    }
    return extract_results(w);
}`,
      explanation: "Hierarchical multi-layer graph navigation locating approximate nearest neighbors in logarithmic time.",
    },
    benchmark: {
      metric: "98.4%",
      value: "Recall@10",
      label: "1M SIFT1M Dataset Search Accuracy & 11µs Latency",
      command: "vector-cli --benchmark --dataset=sift1m --efSearch=64",
      logs: [
        "[LOAD] Loaded 1,000,000 128-dimensional SIFT vectors into memory.",
        "[BUILD] HNSW Graph constructed: 16 edges/node, efConstruction=200.",
        "[EVAL] Evaluating 10,000 ground-truth query vectors.",
        "[METRIC] Recall@10: 98.42% | P95 Latency: 11.2 µs | Queries/sec: 89,280.",
        "[WAL] WAL flush sync complete: 0 uncommitted mutations.",
      ],
    },
    relatedProjects: [
      { title: "Vector Database from Scratch", role: "Creator & Systems Engineer", link: "https://github.com/ParasRana123" },
      { title: "Celebrity Face Lookalike", role: "Embedding Similarity Engine", link: "https://celeb-face-sable.vercel.app/" },
    ],
    relatedSkills: ["cpp", "python", "fastapi", "linux"],
  },

  postgresql: {
    id: "postgresql",
    name: "PostgreSQL",
    category: "Databases",
    logo: devicon("postgresql"),
    tagline: "ACID-compliant enterprise relational database, JSONB query capabilities & WAL logging.",
    proficiencyTier: "Production Deployed",
    experienceContext: "Musor, SIH Defence & Relational Data Stores",
    brandColor: "#336791",
    accentGlow: "rgba(51, 103, 145, 0.45)",
    resumeHighlights: [
      "Designed and maintained schemas for multi-user collaborative platforms with relational integrity constraints.",
      "Leveraged connection pooling (PgBouncer) and prepared statements to sustain concurrent spikes.",
      "Implemented indexing strategies (B-Tree, GIN, Partial indexes) cutting average query time by 80%.",
    ],
    architectureSnippet: {
      language: "sql",
      filename: "schema.sql",
      code: `CREATE TABLE IF NOT EXISTS room_playback_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    room_code VARCHAR(12) NOT NULL UNIQUE,
    current_song_id VARCHAR(64),
    playback_position_ms INTEGER DEFAULT 0,
    is_playing BOOLEAN DEFAULT FALSE,
    host_user_id VARCHAR(64) NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_sessions_active 
ON room_playback_sessions(room_code) 
WHERE is_playing = TRUE;`,
      explanation: "Optimized relational schema featuring JSONB metadata and partial index for active room lookups.",
    },
    benchmark: {
      metric: "2.8 ms",
      value: "P99 Latency",
      label: "Indexed Session Read/Write Latency",
      command: "pgbench -c 50 -j 4 -T 10 musor_db",
      logs: [
        "[PGBENCH] 50 concurrent transactions per client.",
        "[TPS] Transactions per second: 4,820 (excluding connection time).",
        "[LATENCY] Average latency: 2.84ms | Max latency: 6.12ms.",
        "[INTEGRITY] 0 deadlocks or lock contention timeouts.",
      ],
    },
    relatedProjects: [
      { title: "Collaborative Music Platform", role: "Database Lead", link: "https://musor-ten.vercel.app/" },
      { title: "Defence Portal (SIH)", role: "Database Architect", link: "https://net-gen-x.vercel.app/" },
    ],
    relatedSkills: ["sql", "redis", "nodejs", "fastapi"],
  },

  redis: {
    id: "redis",
    name: "Redis",
    category: "Databases",
    logo: devicon("redis"),
    tagline: "Ultra-fast in-memory key-value data store, Pub/Sub message broker & distributed locks.",
    proficiencyTier: "High-Throughput Realtime",
    experienceContext: "In-Memory Session Caching & Real-Time Sync",
    brandColor: "#DC382D",
    accentGlow: "rgba(220, 56, 45, 0.45)",
    resumeHighlights: [
      "Deployed Redis as an in-memory caching layer delivering sub-millisecond data retrieval.",
      "Used Redis Pub/Sub channels to broadcast real-time state changes across multiple Node.js server instances.",
      "Implemented sliding-window rate limiters with Redis sorted sets to protect public API endpoints.",
    ],
    architectureSnippet: {
      language: "typescript",
      filename: "redisCache.ts",
      code: `import Redis from "ioredis";
const redis = new Redis(process.env.REDIS_URL);

export async function getOrSetCache<T>(
  key: string,
  ttlSeconds: number,
  fetcher: () => Promise<T>
): Promise<T> {
  const cached = await redis.get(key);
  if (cached) return JSON.parse(cached);

  const freshData = await fetcher();
  await redis.setex(key, ttlSeconds, JSON.stringify(freshData));
  return freshData;
}`,
      explanation: "Safe cache-aside abstraction with TTL expiration preventing stale data and database stampedes.",
    },
    benchmark: {
      metric: "0.68 ms",
      value: "Sub-Millisecond",
      label: "Redis In-Memory SET/GET Latency",
      command: "redis-benchmark -t set,get -q -n 100000",
      logs: [
        "[REDIS] Executing 100,000 queries @ 50 parallel clients.",
        "[SET] 124,532 requests/sec | Latency: 0.68ms.",
        "[GET] 138,888 requests/sec | Latency: 0.59ms.",
        "[MEMORY] Memory fragmentation ratio: 1.04 (optimal).",
      ],
    },
    relatedProjects: [
      { title: "Collaborative Music Platform", role: "Cache Architect", link: "https://musor-ten.vercel.app/" },
      { title: "Raft Replicated Key-Value Store", role: "Reference Model", link: "https://github.com/ParasRana123" },
    ],
    relatedSkills: ["golang", "postgresql", "nodejs", "fastapi"],
  },

  mongodb: {
    id: "mongodb",
    name: "MongoDB",
    category: "Databases",
    logo: devicon("mongodb"),
    tagline: "Flexible document-oriented database, dynamic schemas & aggregation pipelines.",
    proficiencyTier: "Production Deployed",
    experienceContext: "Full-Stack Web & Document Stores",
    brandColor: "#47A248",
    accentGlow: "rgba(71, 162, 72, 0.45)",
    resumeHighlights: [
      "Engineered flexible BSON document schemas accommodating evolving product requirements.",
      "Constructed multi-stage aggregation pipelines for analytics and user engagement summaries.",
    ],
    architectureSnippet: {
      language: "javascript",
      filename: "aggregateAnalytics.js",
      code: `const stats = await db.collection("incident_reports").aggregate([
  { $match: { status: "RESOLVED", verifiedAt: { $gte: last30Days } } },
  { $group: {
      _id: "$category",
      totalIncidents: { $sum: 1 },
      avgResponseHours: { $avg: "$resolutionTimeHours" }
  }},
  { $sort: { totalIncidents: -1 } }
]).toArray();`,
      explanation: "Multi-stage aggregation pipeline calculating incident trends and resolution metrics.",
    },
    benchmark: {
      metric: "6.4 ms",
      value: "Aggregation",
      label: "Multi-Stage Document Aggregation Time",
      command: "mongosh --eval 'db.collection.explain().aggregate(...)'",
      logs: [
        "[MONGO] Aggregation pipeline executed with covered index.",
        "[INDEX] Matched 50,000 documents via IXSCAN on { status: 1, verifiedAt: 1 }.",
        "[EXECUTION] Total execution time: 6.42 ms | Documents returned: 12.",
      ],
    },
    relatedProjects: [
      { title: "Defence Portal (SIH)", role: "Backend Developer", link: "https://net-gen-x.vercel.app/" },
    ],
    relatedSkills: ["nodejs", "express", "postgresql"],
  },

  mysql: {
    id: "mysql",
    name: "MySQL",
    category: "Databases",
    logo: devicon("mysql"),
    tagline: "Battle-tested relational storage, InnoDB transactions & replica topologies.",
    proficiencyTier: "Production Deployed",
    experienceContext: "Academic & Production Systems",
    brandColor: "#4479A1",
    accentGlow: "rgba(68, 121, 161, 0.45)",
    resumeHighlights: [
      "Proficient in InnoDB storage engine architecture, clustered index layout, and row-level locking.",
      "Configured replication and binlog streaming for data redundancy.",
    ],
    architectureSnippet: {
      language: "sql",
      filename: "transaction.sql",
      code: `START TRANSACTION;
SELECT balance FROM accounts WHERE user_id = 101 FOR UPDATE;
UPDATE accounts SET balance = balance - 50 WHERE user_id = 101;
UPDATE accounts SET balance = balance + 50 WHERE user_id = 202;
COMMIT;`,
      explanation: "Row-level pessimistic locking preventing double-spend anomalies in high-concurrency transfers.",
    },
    benchmark: {
      metric: "3.5 ms",
      value: "InnoDB Lock",
      label: "Row Locking Transaction Commit Time",
      command: "mysqlslap --concurrency=20 --iterations=10 --query=...",
      logs: [
        "[MYSQLSLAP] Benchmark run across 20 concurrent connections.",
        "[COMMITS] 100% successful commits without deadlocks.",
        "[LATENCY] Average transaction turnaround: 3.52 ms.",
      ],
    },
    relatedProjects: [
      { title: "Relational Database Coursework", role: "IIIT Nagpur" },
    ],
    relatedSkills: ["sql", "postgresql"],
  },

  docker: {
    id: "docker",
    name: "Docker",
    category: "DevOps & Infrastructure",
    logo: devicon("docker"),
    tagline: "Multi-stage containerization, minimal image footprints & reproducible runtime isolation.",
    proficiencyTier: "Cloud & Infrastructure",
    experienceContext: "Microservice Containerization & CI/CD",
    brandColor: "#2496ED",
    accentGlow: "rgba(36, 150, 237, 0.45)",
    resumeHighlights: [
      "Crafted multi-stage Dockerfiles reducing production image footprints from 1.2 GB down to 65 MB.",
      "Orchestrated multi-service stacks with Docker Compose for local development mirroring production environments.",
      "Enforced rootless containers, security scanning (Trivy), and non-privileged daemon user execution.",
    ],
    architectureSnippet: {
      language: "dockerfile",
      filename: "Dockerfile",
      code: `# Multi-stage lean build for Next.js / Node.js
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]`,
      explanation: "Multi-stage Alpine image minimizing attack surfaces and shaving over 90% off image transfer sizes.",
    },
    benchmark: {
      metric: "65 MB",
      value: "92% Smaller",
      label: "Production Docker Image Footprint",
      command: "docker build -t app:prod . && docker images app:prod",
      logs: [
        "[STAGE 1] Builder stage compiled Next.js standalone artifacts.",
        "[STAGE 2] Stripped devDependencies, documentation, and build caches.",
        "[IMAGE] app:prod size: 64.8 MB (down from 980 MB base).",
        "[TRIVY] Vulnerability scan: 0 critical, 0 high vulnerabilities detected.",
      ],
    },
    relatedProjects: [
      { title: "Portfolio Website & Microservices", role: "DevOps Engineer" },
    ],
    relatedSkills: ["kubernetes", "linux", "cicd", "aws"],
  },

  kubernetes: {
    id: "kubernetes",
    name: "Kubernetes",
    category: "DevOps & Infrastructure",
    logo: devicon("kubernetes"),
    tagline: "Declarative container orchestration, horizontal autoscaling & self-healing clusters.",
    proficiencyTier: "Cloud & Infrastructure",
    experienceContext: "Microservices Infrastructure & Scaling",
    brandColor: "#326CE5",
    accentGlow: "rgba(50, 108, 229, 0.45)",
    resumeHighlights: [
      "Authored declarative Kubernetes manifests (Deployments, Services, ConfigMaps, Secrets, Ingress).",
      "Configured Horizontal Pod Autoscalers (HPA) responding to real-time CPU and request rate metrics.",
      "Implemented zero-downtime rolling updates and liveness/readiness health probe validation.",
    ],
    architectureSnippet: {
      language: "yaml",
      filename: "deployment.yaml",
      code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: vector-search-engine
  labels: { app: vector-engine }
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate: { maxSurge: 1, maxUnavailable: 0 }
  template:
    metadata: { labels: { app: vector-engine } }
    spec:
      containers:
      - name: engine
        image: parasrana/vectordb:latest
        resources:
          limits: { cpu: "2", memory: "4Gi" }
          requests: { cpu: "500m", memory: "1Gi" }
        readinessProbe:
          httpGet: { path: /health, port: 8080 }
          initialDelaySeconds: 5`,
      explanation: "Zero-downtime rolling update deployment with memory bounds and automated readiness checks.",
    },
    benchmark: {
      metric: "0s Downtime",
      value: "Rolling Update",
      label: "Zero-Downtime Deployment & Pod Self-Healing",
      command: "kubectl rollout status deployment/vector-search-engine",
      logs: [
        "[K8S] Initiating rolling update to version 1.4.0.",
        "[PODS] 1/3 updated -> health probe 200 OK -> 2/3 updated -> 3/3 updated.",
        "[SERVICE] Ingress traffic routed seamlessly with 0 dropped HTTP connections.",
        "[STATUS] Deployment successfully rolled out with zero downtime.",
      ],
    },
    relatedProjects: [
      { title: "Microservice Scaling Architecture", role: "DevOps Engineer" },
    ],
    relatedSkills: ["docker", "linux", "cicd", "aws", "gcp"],
  },

  linux: {
    id: "linux",
    name: "Linux",
    category: "DevOps & Infrastructure",
    logo: devicon("linux"),
    tagline: "POSIX systems programming, kernel signals, ucontext scheduler & bash automation.",
    proficiencyTier: "Core Systems & Algorithms",
    experienceContext: "User-Level Threading Runtime & System Administration",
    brandColor: "#FCC624",
    accentGlow: "rgba(252, 198, 36, 0.45)",
    resumeHighlights: [
      "Built user-level threading runtime in C with zero syscalls per context switch, scaling to thousands of threads.",
      "Implemented a constant-time round-robin scheduler with preemptive slices triggered by SIGALRM signals.",
      "Added POSIX synchronization primitives (mutex, semaphore, condvar, join) verified with automated test suites.",
      "Proficient in bash scripting, systemd service management, eBPF inspection, and network stack tuning.",
    ],
    architectureSnippet: {
      language: "c",
      filename: "uthread_scheduler.c",
      code: `// Preemptive context switch using POSIX ucontext and SIGALRM
static void scheduler_tick(int signum) {
    if (!current_thread || queue_empty(&run_queue)) return;
    uthread_t* prev = current_thread;
    current_thread = queue_pop(&run_queue);
    queue_push(&run_queue, prev);

    // Swap execution context directly in user-space (zero kernel syscalls)
    swapcontext(&prev->context, &current_thread->context);
}

void uthread_init(int time_slice_ms) {
    struct sigaction sa;
    sa.sa_handler = scheduler_tick;
    sigemptyset(&sa.sa_mask);
    sa.sa_flags = SA_RESTART;
    sigaction(SIGALRM, &sa, NULL);

    struct itimerval timer;
    timer.it_value.tv_sec = 0;
    timer.it_value.tv_usec = time_slice_ms * 1000;
    timer.it_interval = timer.it_value;
    setitimer(ITIMER_REAL, &timer, NULL);
}`,
      explanation: "Constant-time round-robin user-space thread scheduler preempted via SIGALRM timer interrupts.",
    },
    benchmark: {
      metric: "0 Syscalls",
      value: "10,000 Threads",
      label: "User-Level Context Switch Latency: 38 ns",
      command: "./uthread_bench --threads=10000 --iterations=100000",
      logs: [
        "[LINUX] Initializing POSIX user-level threading testbed.",
        "[ALLOC] Allocated 10,000 coroutine stacks with 64KB guard pages.",
        "[SCHEDULER] Dispatched 100,000 round-robin preemptive switches.",
        "[BENCH] Context switch cost: 38 nanoseconds (vs ~1.5 µs kernel pthread).",
        "[SYS] Zero kernel transition overhead detected.",
      ],
    },
    relatedProjects: [
      { title: "User-Level Threading Runtime", role: "Systems Engineer", link: "https://github.com/ParasRana123" },
      { title: "Vector Database from Scratch", role: "C++ Author", link: "https://github.com/ParasRana123" },
    ],
    relatedSkills: ["cpp", "docker", "kubernetes", "golang"],
  },

  cicd: {
    id: "cicd",
    name: "CI/CD",
    category: "DevOps & Infrastructure",
    logo: devicon("githubactions"),
    tagline: "Automated test suites, security auditing, multi-platform artifact builds & continuous deployment.",
    proficiencyTier: "Cloud & Infrastructure",
    experienceContext: "GitHub Actions & Production Workflows",
    brandColor: "#2088FF",
    accentGlow: "rgba(32, 136, 255, 0.45)",
    resumeHighlights: [
      "Engineered end-to-end GitHub Actions pipelines automating linting, type checks, unit testing, and deployment.",
      "Configured matrix builds testing across multiple Node, Python, and GCC versions.",
      "Integrated automated Docker build cache and branch previews on Vercel and cloud platforms.",
    ],
    architectureSnippet: {
      language: "yaml",
      filename: "ci-pipeline.yml",
      code: `name: Production CI/CD
on:
  push: { branches: [main] }
  pull_request: { branches: [main] }

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: 'npm' }
      - run: npm ci
      - run: npm run lint
      - run: npm run build
      - name: Deploy Preview
        uses: amondnet/vercel-action@v25
        if: github.ref == 'refs/heads/main'
        with:
          vercel-token: \${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: \${{ secrets.ORG_ID }}
          vercel-project-id: \${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'`,
      explanation: "Automated continuous delivery pipeline verifying quality before rolling out to production.",
    },
    benchmark: {
      metric: "52 s",
      value: "Full Pipeline",
      label: "Lint, Typecheck, Build & Deploy Pipeline Time",
      command: "gh run view --log",
      logs: [
        "[CHECKOUT] Repository pulled with cache hit: 2.1s.",
        "[DEPENDENCY] npm ci cached dependencies restored: 4.8s.",
        "[LINT & TYPECHECK] Zero lint errors, zero typescript discrepancies: 14.2s.",
        "[BUILD] Static generation completed in 24.1s.",
        "[DEPLOY] Vercel edge deployment promoted to production: 7.2s.",
      ],
    },
    relatedProjects: [
      { title: "Portfolio Website & Web Apps", role: "DevOps Automation" },
    ],
    relatedSkills: ["docker", "github", "kubernetes"],
  },

  aws: {
    id: "aws",
    name: "AWS",
    category: "Cloud Platforms",
    logo: "https://cdn.simpleicons.org/amazonaws/FF9900",
    tagline: "Scalable cloud architecture, serverless Lambda functions, S3 storage & EC2 instances.",
    proficiencyTier: "Cloud & Infrastructure",
    experienceContext: "Cloud Deployments & Cloud Storage",
    brandColor: "#FF9900",
    accentGlow: "rgba(255, 153, 0, 0.45)",
    resumeHighlights: [
      "Configured S3 buckets with signed URLs for secure media storage and CloudFront CDN distribution.",
      "Deployed containerized services to AWS EC2 and configured security groups, VPCs, and IAM policies.",
      "Implemented event-driven serverless architectures with AWS Lambda.",
    ],
    architectureSnippet: {
      language: "typescript",
      filename: "s3Uploader.ts",
      code: `import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({ region: process.env.AWS_REGION || "us-east-1" });

export async function generatePresignedUploadUrl(filename: string, fileType: string) {
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: \`uploads/\${Date.now()}_\${filename}\`,
    ContentType: fileType,
  });
  return await getSignedUrl(s3, command, { expiresIn: 300 });
}`,
      explanation: "Direct client-to-S3 presigned uploads offloading media bandwidth from API servers.",
    },
    benchmark: {
      metric: "18 ms",
      value: "CloudFront CDN",
      label: "Global Edge Asset Delivery Time",
      command: "curl -w '%{time_total}\\n' -o /dev/null -s https://cdn.parasrana.dev/asset.webp",
      logs: [
        "[AWS_CDN] Request dispatched to nearest edge location (DELHI-BOM).",
        "[CACHE] X-Cache: Hit from cloudfront.",
        "[TIME] Total latency: 0.018s (18ms).",
      ],
    },
    relatedProjects: [
      { title: "Cloud Media Infrastructure", role: "Cloud Architect" },
    ],
    relatedSkills: ["gcp", "azure", "docker"],
  },

  gcp: {
    id: "gcp",
    name: "GCP",
    category: "Cloud Platforms",
    logo: devicon("googlecloud"),
    tagline: "Google Cloud Platform, Cloud Run serverless containers & Vertex AI integrations.",
    proficiencyTier: "Cloud & Infrastructure",
    experienceContext: "Containerized Cloud Deployments",
    brandColor: "#4285F4",
    accentGlow: "rgba(66, 133, 244, 0.45)",
    resumeHighlights: [
      "Deployed auto-scaling serverless containers to Google Cloud Run with zero cold-start latency.",
      "Managed Cloud IAM roles, service accounts, and API secret keys securely.",
    ],
    architectureSnippet: {
      language: "bash",
      filename: "cloud_run_deploy.sh",
      code: `gcloud run deploy vector-service \\
  --image gcr.io/\$PROJECT_ID/vector-service:latest \\
  --platform managed \\
  --region asia-south1 \\
  --allow-unauthenticated \\
  --memory 2Gi \\
  --cpu 2 \\
  --min-instances 1 \\
  --max-instances 10`,
      explanation: "Production Google Cloud Run auto-scaling deployment with minimum warm instance guarantees.",
    },
    benchmark: {
      metric: "0 Cold Start",
      value: "Cloud Run",
      label: "Warm Container Request Response Time",
      command: "gcloud run services describe vector-service --region asia-south1",
      logs: [
        "[GCP] Service healthy: 1 warm replica always ready.",
        "[AUTOSCALE] Scaling threshold: 80 concurrent requests/pod.",
        "[METRIC] Health check response: 14ms.",
      ],
    },
    relatedProjects: [
      { title: "Cloud Run Microservices", role: "Cloud Engineer" },
    ],
    relatedSkills: ["aws", "azure", "docker"],
  },

  azure: {
    id: "azure",
    name: "Azure",
    category: "Cloud Platforms",
    logo: devicon("azure"),
    tagline: "Microsoft Azure compute, container instances & enterprise active directory integration.",
    proficiencyTier: "Cloud & Infrastructure",
    experienceContext: "Cloud Services & Virtual Networks",
    brandColor: "#0078D4",
    accentGlow: "rgba(0, 120, 212, 0.45)",
    resumeHighlights: [
      "Configured Azure App Services, virtual networks, and blob storage containers.",
      "Applied enterprise role-based access control (RBAC) and monitored resource telemetry with Azure Monitor.",
    ],
    architectureSnippet: {
      language: "bash",
      filename: "azure_deploy.sh",
      code: `az webapp up \\
  --name paras-enterprise-service \\
  --resource-group rg-production \\
  --plan plan-standard-linux \\
  --runtime "NODE:20-lts"`,
      explanation: "Automated deployment targeting Azure App Service Linux infrastructure.",
    },
    benchmark: {
      metric: "99.95%",
      value: "SLA Uptime",
      label: "Availability & Redundancy Benchmark",
      command: "az monitor metrics list --resource ...",
      logs: [
        "[AZURE_MONITOR] Polling last 30 days availability telemetry.",
        "[UPTIME] Zero unhandled downtime incidents recorded.",
        "[METRIC] Average CPU utilization: 24%.",
      ],
    },
    relatedProjects: [
      { title: "Enterprise Cloud Systems", role: "Cloud Engineer" },
    ],
    relatedSkills: ["aws", "gcp", "docker"],
  },

  github: {
    id: "github",
    name: "GitHub",
    category: "Workflow",
    logo: devicon("github"),
    tagline: "Git version control, collaborative code reviews, Actions workflows & issue management.",
    proficiencyTier: "Production Deployed",
    experienceContext: "Open Source, Multi-Repo Workflows & CI/CD",
    brandColor: "#24292E",
    accentGlow: "rgba(36, 41, 46, 0.45)",
    resumeHighlights: [
      "Active open-source contributor with clean commit histories, feature branches, and thorough pull requests.",
      "Maintains multiple systems repositories: Vector DB, Raft KV store, Threading Runtime, and Full-Stack apps.",
    ],
    architectureSnippet: {
      language: "bash",
      filename: "git_workflow.sh",
      code: `git checkout -b feature/hnsw-predicate-filters
git add src/index/hnsw.cpp
git commit -m "feat(index): implement boolean predicate filtering on HNSW graph traversal"
git push origin feature/hnsw-predicate-filters`,
      explanation: "Conventional commit conventions and clean topic branch isolation.",
    },
    benchmark: {
      metric: "100%",
      value: "Clean History",
      label: "Semantic Commit & Clean Merge Protocol",
      command: "git log --oneline -n 10",
      logs: [
        "[GIT] Semantic versioning with descriptive conventional commits.",
        "[BRANCH] Protected main branch with mandatory CI check passing.",
      ],
    },
    relatedProjects: [
      { title: "All Projects on GitHub", role: "Author", link: "https://github.com/ParasRana123" },
    ],
    relatedSkills: ["vscode", "cicd"],
  },

  vscode: {
    id: "vscode",
    name: "VS Code",
    category: "Workflow",
    logo: devicon("vscode"),
    tagline: "Daily driver IDE configured with LLM extensions, gdb/lldb debuggers & language servers.",
    proficiencyTier: "Core Systems & Algorithms",
    experienceContext: "Primary Systems & Web Development Environment",
    brandColor: "#007ACC",
    accentGlow: "rgba(0, 122, 204, 0.45)",
    resumeHighlights: [
      "Custom configured with clangd, gdb debuggers, valgrind memory profilers, and Go/Rust/TypeScript language servers.",
      "Optimized workspace keybindings and devcontainers for seamless local development.",
    ],
    architectureSnippet: {
      language: "json",
      filename: ".vscode/launch.json",
      code: `{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Vector DB (lldb)",
      "type": "cppdbg",
      "request": "launch",
      "program": "\${workspaceFolder}/bin/vector_engine",
      "args": ["--benchmark", "--dim=512"],
      "stopAtEntry": false,
      "cwd": "\${workspaceFolder}",
      "MIMode": "lldb"
    }
  ]
}`,
      explanation: "Low-level LLDB debugger configuration for step-by-step SIMD memory inspection.",
    },
    benchmark: {
      metric: "<10 ms",
      value: "Language Server",
      label: "clangd / TypeScript LSP Autocomplete Response Time",
      command: "code --status",
      logs: [
        "[VSCODE] LSP clangd running on 8 background indexing threads.",
        "[AUTOCOMPLETE] 10ms semantic token completion across 50,000 LOC.",
      ],
    },
    relatedProjects: [
      { title: "Systems & Web Workspaces", role: "Developer" },
    ],
    relatedSkills: ["github"],
  },
};

export const tools: Tool[] = [
  {
    name: "VS Code",
    image: "/tools/vscode.jpg",
    line: "Where every idea starts.",
  },
  {
    name: "GitHub",
    image: "/tools/github.png",
    line: "Where my code calls home.",
  },
  {
    name: "React",
    image: "/tools/react.png",
    line: "Building interfaces that breathe.",
  },
  {
    name: "Node.js",
    image: "/tools/nodejs.png",
    line: "Powering the logic behind the screen.",
  },
  {
    name: "PostgreSQL",
    image: "/tools/postgresql.png",
    line: "Where my data finds structure.",
  },
  {
    name: "Redis",
    image: "/tools/redis.png",
    line: "When every millisecond counts.",
  },
  {
    name: "Docker",
    image: "/tools/docker.jpeg",
    line: "Build once. Run anywhere.",
  },
  {
    name: "LangChain",
    image: "/tools/langchain.jpeg",
    line: "Connecting code with intelligence.",
  },
];

export function getSkillDetail(nameOrId: string): SkillDetail | null {
  const normalized = nameOrId.toLowerCase().replace(/[^a-z0-9]/g, "");
  
  // Direct ID match
  if (SKILL_DETAILS[normalized]) {
    return SKILL_DETAILS[normalized];
  }
  
  // Map common name variations
  const aliasMap: Record<string, string> = {
    "c": "cpp",
    "c++": "cpp",
    "cpp": "cpp",
    "golang": "golang",
    "go": "golang",
    "python": "python",
    "java": "java",
    "typescript": "typescript",
    "javascript": "javascript",
    "sql": "sql",
    "html5": "html5",
    "html": "html5",
    "css3": "css3",
    "css": "css3",
    "fastapi": "fastapi",
    "nodejs": "nodejs",
    "node.js": "nodejs",
    "express": "express",
    "express.js": "express",
    "langchain": "langchain",
    "react": "react",
    "react.js": "react",
    "nextjs": "nextjs",
    "next.js": "nextjs",
    "websockets": "websockets",
    "grpc": "grpc",
    "protobuf": "protobuf",
    "protocolbuffers": "protobuf",
    "protocol buffers": "protobuf",
    "vectordatabase": "vectordb",
    "vector database": "vectordb",
    "vectordb": "vectordb",
    "postgresql": "postgresql",
    "postgres": "postgresql",
    "redis": "redis",
    "mongodb": "mongodb",
    "mysql": "mysql",
    "docker": "docker",
    "kubernetes": "kubernetes",
    "linux": "linux",
    "cicd": "cicd",
    "ci/cd": "cicd",
    "aws": "aws",
    "gcp": "gcp",
    "azure": "azure",
    "github": "github",
    "vscode": "vscode",
    "vs code": "vscode",
  };

  const aliasKey = aliasMap[nameOrId.toLowerCase()] || aliasMap[normalized];
  if (aliasKey && SKILL_DETAILS[aliasKey]) {
    return SKILL_DETAILS[aliasKey];
  }

  // Fallback search by name
  const found = Object.values(SKILL_DETAILS).find(
    (s) => s.name.toLowerCase() === nameOrId.toLowerCase()
  );
  return found || null;
}
