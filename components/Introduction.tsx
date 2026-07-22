import { PARAGRAPHS } from "@/data/paragraphs";

export default function Introduction() {
  return (
    <div className="dp-intro">
      {PARAGRAPHS.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}   