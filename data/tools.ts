export interface Tool {
  name: string;
  image: string;
  line: string;
}

export const tools: Tool[] = [
  {
    name: "VS Code",
    image: "/tools/vscode.jpg",
    line: "Where ideas become code, bugs become lessons, and projects slowly become real.",
  },
  {
    name: "GitHub",
    image: "/tools/github.png",
    line: "My second brain for code — where experiments, projects, and progress live.",
  },
  {
    name: "React",
    image: "/tools/react.png",
    line: "My go-to canvas for turning complex ideas into interfaces that feel alive.",
  },
  {
    name: "Node.js",
    image: "/tools/nodejs.png",
    line: "The engine behind the APIs and real-time systems that power what I build.",
  },
  {
    name: "PostgreSQL",
    image: "/tools/postgresql.png",
    line: "Where the data behind my applications finds structure, relationships, and a home.",
  },
  {
    name: "Redis",
    image: "/tools/redis.png",
    line: "For the moments when milliseconds matter and applications need to move faster.",
  },
  {
    name: "Docker",
    image: "/tools/docker.jpeg",
    line: "Because if it works on my machine, I want it to work everywhere else too.",
  },
  {
    name: "Vercel",
    image: "/tools/vercel.png",
    line: "The bridge between something I built locally and something the world can actually use.",
  },
  {
    name: "LangChain",
    image: "/tools/langchain.jpeg",
    line: "My playground for exploring what happens when software starts reasoning with language.",
  },
];
