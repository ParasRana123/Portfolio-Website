export interface Tool {
  name: string;
  image: string;
  line: string;
}

export interface SkillGroup {
  name: string;
  skills: { name: string; logo: string }[];
}

const devicon = (name: string) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-original.svg`;

export const SKILL_GROUPS: SkillGroup[] = [
  {
    name: "Languages",
    skills: [
      { name: "C++", logo: devicon("cplusplus") },
      { name: "Python", logo: devicon("python") },
      { name: "JavaScript", logo: devicon("javascript") },
      { name: "TypeScript", logo: devicon("typescript") },
      { name: "SQL", logo: devicon("mysql") },
      { name: "HTML5", logo: devicon("html5") },
      { name: "CSS3", logo: devicon("css3") },
    ],
  },
  {
    name: "Backend",
    skills: [
      { name: "FastAPI", logo: devicon("fastapi") },
      { name: "Node.js", logo: devicon("nodejs") },
      { name: "Express.js", logo: devicon("express") },
      { name: "LangChain", logo: "https://cdn.simpleicons.org/langchain" },
    ],
  },
  {
    name: "Frontend & Web",
    skills: [
      { name: "React.js", logo: devicon("react") },
      { name: "Next.js", logo: devicon("nextjs") },
      { name: "WebSockets", logo: devicon("socketio") },
      { name: "gRPC", logo: "https://www.vectorlogo.zone/logos/grpcio/grpcio-icon.svg" },
      { name: "Protocol Buffers", logo: "https://cdn.simpleicons.org/google" },
    ],
  },
  {
    name: "Databases",
    skills: [
      { name: "PostgreSQL", logo: devicon("postgresql") },
      { name: "MongoDB", logo: devicon("mongodb") },
      { name: "Redis", logo: devicon("redis") },
      { name: "MySQL", logo: devicon("mysql") },
      { name: "Vector Database", logo: "https://cdn.simpleicons.org/qdrant" },
    ],
  },
  {
    name: "DevOps & Infrastructure",
    skills: [
      { name: "Docker", logo: devicon("docker") },
      { name: "Linux", logo: devicon("linux") },
      { name: "CI/CD", logo: devicon("githubactions") },
    ],
  },
  {
    name: "Workflow",
    skills: [
      { name: "GitHub", logo: devicon("github") },
      { name: "VS Code", logo: devicon("vscode") },
    ],
  },
];

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
