const HOME_ACHIEVEMENTS = [
  "Flipkart Grid 8.0 — Selected as a Semi-Finalist among 150,000+ participants",
  "Amazon ML Challenge 2025 — Ranked 214 among 15,000+ teams",
  "GrabHack 2025 — Selected as a Semi-Finalist in Grab’s nationwide hackathon",
  "Hacksagon 2025 — Ranked 5th among 600+ teams (ABV-IIITM Gwalior)",
];

export default function WhereSection() {
  return (
    <section className="dp-home-achievements" aria-label="Selected achievements">
      <div className="dp-eyebrow">Achievements</div>
      <ul className="dp-home-achievements-list">
        {HOME_ACHIEVEMENTS.map((achievement) => (
          <li key={achievement}>{achievement}</li>
        ))}
      </ul>
    </section>
  );
}
