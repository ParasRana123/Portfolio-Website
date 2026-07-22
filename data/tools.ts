export interface Tool {
  name: string;
  image: string;
  line: string;
}

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
    name: "Vercel",
    image: "/tools/vercel.png",
    line: "From localhost to the world.",
  },
  {
    name: "LangChain",
    image: "/tools/langchain.jpeg",
    line: "Connecting code with intelligence.",
  },
];