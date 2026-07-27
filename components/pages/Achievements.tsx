export default function Achievements() {
  const achievements = [
    {
      number: "01",
      title: "Competitive Programming",
      points: [
        "Ranked 125th globally among 41,000+ participants in CodeChef Starters 227.",
        "Achieved Global Rank 283 and All India Rank 67 among 35,000+ participants in LeetCode Biweekly Contest 180.",
      ],
      highlight: "Top Global Ranks",
    },
    {
      number: "02",
      title: "Coding Profiles",
      points: [
        "Reached Guardian tier on LeetCode with a 2100+ rating.",
        "Achieved 3-Star on CodeChef with a 1700+ rating.",
        "Earned 3-Star C++ and 4-Star DSA badges on HackerRank.",
        "Solved 1200+ problems across competitive programming platforms.",
      ],
      highlight: "1200+ Problems Solved",
    },
    {
      number: "03",
      title: "National Hackathon Finalist",
      points: [
        "Selected as a National Hackathon Finalist at a competition hosted by IIT Guwahati.",
        "Competed against teams from top engineering institutions across India.",
      ],
      highlight: "IIT Guwahati",
    },
  ];

  return (
    <section className="dp-achievements-section">
      <div className="dp-achievements-container">
        {/* Section Header */}
        <div className="dp-achievements-intro">
          <p className="dp-achievements-subtitle">
            A few milestones from my journey in competitive programming,
            problem solving, and hackathons.
          </p>
        </div>

        {/* Achievement Cards */}
        <div className="dp-achievements-grid">
          {achievements.map((achievement) => (
            <article
              key={achievement.number}
              className="dp-achievement-card"
            >
              {/* Top Row */}
              <div className="dp-achievement-top">
                <span className="dp-achievement-number">
                  {achievement.number}
                </span>

                <span className="dp-achievement-line" />
              </div>

              {/* Content */}
              <div className="dp-achievement-content">
                <h3 className="dp-achievement-title">
                  {achievement.title}
                </h3>

                <div className="dp-achievement-highlight">
                  {achievement.highlight}
                </div>

                <ul className="dp-achievement-points">
                  {achievement.points.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>

              {/* Bottom Accent */}
              <div className="dp-achievement-accent" />
            </article>
          ))}
        </div>
      </div>

      <style jsx>{`
        /* ========================================
           ACHIEVEMENTS SECTION
        ======================================== */

        .dp-achievements-section {
          width: 100%;

          padding: 32px 0 40px;
        }

        .dp-achievements-container {
          width: 100%;

          max-width: 1200px;

          margin: 0 auto;
        }

        /* ========================================
           SECTION INTRO
        ======================================== */

        .dp-achievements-intro {
          margin: 0 0 52px 0;
        }

        .dp-achievements-eyebrow {
          margin: 0 0 10px 0;

          font-family: "Inter", sans-serif;

          font-size: 12px;

          font-weight: 600;

          line-height: 1.4;

          letter-spacing: 0.18em;

          text-transform: uppercase;

          color: var(--accent);
        }

        .dp-achievements-title {
          margin: 0;

          font-family: "Space Grotesk", sans-serif;

          font-size: 42px;

          font-weight: 600;

          line-height: 1.15;

          letter-spacing: -0.035em;

          color: var(--ink);
        }

        .dp-achievements-subtitle {
          max-width: 650px;

          margin: 16px 0 0 0;

          font-family: "Inter", sans-serif;

          font-size: 15px;

          line-height: 1.7;

          color: var(--muted);
        }

        /* ========================================
           ACHIEVEMENT GRID
        ======================================== */

        .dp-achievements-grid {
          display: grid;

          grid-template-columns: 1fr;

          gap: 32px;

          width: 100%;
        }

        /* ========================================
           ACHIEVEMENT CARD
        ======================================== */

        .dp-achievement-card {
          position: relative;

          display: flex;

          flex-direction: column;

          width: 100%;

          min-width: 0;

          padding: 32px;

          overflow: hidden;

          border-radius: 22px;

          border: 1px solid var(--hairline);

          background: var(--surface);

          box-shadow:
            0 2px 5px rgba(0, 0, 0, 0.025),
            0 8px 24px rgba(0, 0, 0, 0.035);

          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease,
            border-color 0.25s ease;
        }

        .dp-achievement-card::before {
          content: "";

          position: absolute;

          top: -80px;

          right: -80px;

          width: 180px;

          height: 180px;

          border-radius: 50%;

          background: var(--accent);

          opacity: 0.035;

          filter: blur(40px);

          pointer-events: none;

          transition:
            opacity 0.3s ease,
            transform 0.3s ease;
        }

        .dp-achievement-card:hover {
          transform: translateY(-4px);

          border-color: var(--accent);

          box-shadow:
            0 4px 10px rgba(0, 0, 0, 0.04),
            0 14px 34px rgba(0, 0, 0, 0.08);
        }

        .dp-achievement-card:hover::before {
          opacity: 0.08;

          transform: scale(1.15);
        }

        /* ========================================
           TOP ROW
        ======================================== */

        .dp-achievement-top {
          position: relative;

          display: flex;

          align-items: center;

          gap: 18px;

          margin-bottom: 32px;
        }

        .dp-achievement-number {
          flex-shrink: 0;

          font-family: "Space Grotesk", sans-serif;

          font-size: 13px;

          font-weight: 600;

          line-height: 1;

          letter-spacing: 0.12em;

          color: var(--muted);
        }

        .dp-achievement-line {
          width: 54px;

          height: 1px;

          background:
            linear-gradient(
              to right,
              var(--accent),
              transparent
            );

          opacity: 0.5;
        }

        /* ========================================
           CONTENT
        ======================================== */

        .dp-achievement-content {
          position: relative;

          display: flex;

          flex-direction: column;
        }

        .dp-achievement-title {
          margin: 0;

          font-family: "Space Grotesk", sans-serif;

          font-size: 22px;

          font-weight: 600;

          line-height: 1.3;

          letter-spacing: -0.02em;

          color: var(--ink);

          transition:
            color 0.25s ease;
        }

        .dp-achievement-card:hover
          .dp-achievement-title {
          color: var(--accent);
        }

        /* ========================================
           HIGHLIGHT
        ======================================== */

        .dp-achievement-highlight {
          align-self: flex-start;

          margin-top: 16px;

          padding: 6px 11px;

          border-radius: 999px;

          border: 1px solid var(--hairline);

          background: color-mix(
            in srgb,
            var(--accent) 7%,
            transparent
          );

          font-family: "Inter", sans-serif;

          font-size: 11px;

          font-weight: 600;

          line-height: 1.4;

          color: var(--accent);

          white-space: nowrap;
        }

        /* ========================================
           POINTS
        ======================================== */

        .dp-achievement-points {
          display: flex;

          flex-direction: column;

          gap: 10px;

          margin: 22px 0 0 0;

          padding: 0 0 0 20px;

          font-family: "Inter", sans-serif;

          font-size: 14px;

          line-height: 1.7;

          color: var(--muted);

          list-style-type: disc;

          list-style-position: outside;
        }

        .dp-achievement-points li {
          display: list-item;

          padding-left: 4px;
        }

        .dp-achievement-points li::marker {
          color: var(--accent);

          font-size: 0.8em;
        }

        /* ========================================
           BOTTOM ACCENT
        ======================================== */

        .dp-achievement-accent {
          position: absolute;

          bottom: 0;

          left: 0;

          width: 0;

          height: 2px;

          background:
            linear-gradient(
              to right,
              var(--accent),
              transparent
            );

          transition:
            width 0.35s ease;
        }

        .dp-achievement-card:hover
          .dp-achievement-accent {
          width: 100%;
        }

        /* ========================================
           LARGE DESKTOP
        ======================================== */

        @media (min-width: 1400px) {
          .dp-achievements-container {
            max-width: 1200px;
          }

          .dp-achievements-grid {
            gap: 40px;
          }

          .dp-achievement-card {
            padding: 36px;
          }
        }

        /* ========================================
           TABLET
        ======================================== */

        @media (max-width: 1100px) {
          .dp-achievements-grid {
            gap: 28px;
          }

          .dp-achievement-card {
            padding: 28px;
          }

          .dp-achievement-title {
            font-size: 21px;
          }

          .dp-achievement-points {
            font-size: 13.5px;
          }
        }

        /* ========================================
           MOBILE
        ======================================== */

        @media (max-width: 640px) {
          .dp-achievements-section {
            padding: 28px 0 32px;
          }

          .dp-achievements-intro {
            margin-bottom: 40px;
          }

          .dp-achievements-title {
            font-size: 34px;
          }

          .dp-achievements-subtitle {
            margin-top: 14px;

            font-size: 13.5px;

            line-height: 1.65;
          }

          .dp-achievements-grid {
            width: 100%;

            gap: 22px;
          }

          .dp-achievement-card {
            padding: 22px;

            border-radius: 20px;
          }

          .dp-achievement-top {
            margin-bottom: 28px;
          }

          .dp-achievement-title {
            font-size: 19px;
          }

          .dp-achievement-highlight {
            font-size: 10.5px;
          }

          .dp-achievement-points {
            gap: 9px;

            margin-top: 18px;

            padding-left: 18px;

            font-size: 13px;

            line-height: 1.65;

            list-style-type: disc;

            list-style-position: outside;
          }
        }

        /* ========================================
           VERY SMALL MOBILE
        ======================================== */

        @media (max-width: 420px) {
          .dp-achievements-title {
            font-size: 31px;
          }

          .dp-achievement-card {
            padding: 20px;
          }

          .dp-achievement-title {
            font-size: 18px;
          }

          .dp-achievement-points {
            font-size: 13px;
          }
        }
      `}</style>
    </section>
  );
}