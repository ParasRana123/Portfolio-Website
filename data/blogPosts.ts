export interface BlogPost {
  title: string;
  date: string;
  url: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    title: "Redis, Pub Subs, and Message Queues",
    date: "03-02-2026",
    url: "https://medium.com/@parasrana579/redis-pub-subs-and-message-queues-6e0bba30a5d4",
  },
  {
    title: "Rate Limiting System Design",
    date: "13-09-2025",
    url: "https://medium.com/@parasrana579/rate-limiting-system-design-954636d05bc7",
  },
  {
    title: "CSR vs SSR vs SSG",
    date: "01-02-2026",
    url: "https://medium.com/@parasrana579/csr-vs-ssr-vs-ssg-d12d0deea827",
  },
];