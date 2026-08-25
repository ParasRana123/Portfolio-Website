const HOME_ACHIEVEMENTS = [
  "Global Rank 125 — CodeChef Starters 227",
  "All India Rank 67 — LeetCode Biweekly Contest 180",
  "National Hackathon Finalist — IIT Guwahati",
  "National Hackathon Final Round — IIITM Gwalior",
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
