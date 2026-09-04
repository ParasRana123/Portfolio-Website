export type ChatRole = "user" | "assistant" | "system";

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

export interface ChatRequestPayload {
  messages: ChatMessage[];
  stream?: boolean;
}

export interface ChatResponsePayload {
  reply: string;
  provider: "gemini" | "openai" | "groq" | "local-knowledge-engine";
  suggestions?: string[];
  contextReferenced?: string[];
}

export interface ChatSuggestion {
  id: string;
  label: string;
  prompt: string;
  category: "projects" | "skills" | "competitive-programming" | "experience" | "contact";
}

export interface ProjectContext {
  title: string;
  category?: string;
  description: string;
  techStack?: string[];
  features?: string[];
  demoUrl?: string | null;
  githubUrl: string;
  highlights?: string[];
}

export interface EducationContext {
  degree: string;
  institution: string;
  period: string;
  location: string;
  score?: string;
  coursework?: string[];
  achievements?: string[];
}

export interface RatingContext {
  platform: string;
  handle: string;
  rating: string | number;
  rankBadge: string;
  details: string;
  profileUrl: string;
}

export interface BlogPostContext {
  title: string;
  date: string;
  url: string;
  description?: string;
}

export interface PersonalProfile {
  name: string;
  preferredName: string;
  role: string;
  tagline: string;
  shortBio: string;
  fullBio: string;
  location: {
    current: string;
    hometown: string;
    college: string;
  };
  contact: {
    email: string;
    github: string;
    linkedin: string;
    codolio: string;
    leetcode: string;
    codechef: string;
    codeforces: string;
    resumeUrl: string;
  };
  skills: {
    languages: string[];
    backend: string[];
    frontend: string[];
    databases: string[];
    devopsAndCloud: string[];
    toolsAndWorkflow: string[];
  };
  education: EducationContext[];
  projects: ProjectContext[];
  ratings: RatingContext[];
  achievements: string[];
  blogPosts: BlogPostContext[];
  musicAndInterests: {
    musicTaste: string;
    favoriteGenres: string[];
    spotifyIntegration: string;
    musicProjects: string;
    hobbies: string[];
  };
  faqs: { question: string; answer: string; keywords: string[] }[];
}
