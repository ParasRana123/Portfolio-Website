import { BLOG_POSTS } from "@/data/blogPosts";

export default function WritingSection() {
  return (
    <section>
      <div className="dp-eyebrow">Writing</div>

      <div className="dp-writing-list">
        {BLOG_POSTS.map((post) => (
          <a
            key={post.title}
            href={post.url}
            target="_blank"
            rel="noreferrer"
            className="dp-writing-row"
          >
            <p className="dp-writing-title">
              {post.title}
            </p>

            <span className="dp-writing-date">
              {post.date}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}