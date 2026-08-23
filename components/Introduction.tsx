import { PARAGRAPHS } from "@/data/paragraphs";

export default function Introduction() {
  return (
    <div className="dp-intro">
      {PARAGRAPHS.map((p, i) => (
        <p key={i}>{p}</p>
      ))}

      <div className="dp-intro-actions">
        <a
          className="dp-intro-action dp-intro-action--primary"
          href="/Paras-Rana-Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          View resume
        </a>
        <a className="dp-intro-action" href="#contact">
          Get in touch
        </a>
      </div>
    </div>
  );
}   
