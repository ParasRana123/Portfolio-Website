import { RATINGS_DATA, TOTAL_PROBLEMS_SOLVED } from "@/data/ratingsData";

export default function Ratings() {
  return (
    <section className="dp-ratings-section">
      <div className="dp-ratings-container">
        {/* Rating Cards */}
        <div className="dp-ratings-grid">
          {RATINGS_DATA.map((item) => (
            <article
              key={item.id}
              className="dp-rating-card"
              style={{ "--card-accent": item.accent }}
            >
              {/* Top Row */}
              <div className="dp-rating-top">
                <span className="dp-rating-platform">{item.platform}</span>
                <span className="dp-rating-badge">{item.badge}</span>
              </div>

              {/* Rating Number */}
              <div className="dp-rating-number">{item.rating}</div>

              {/* Subtitle */}
              <div className="dp-rating-subtitle">{item.subtitle}</div>

              {/* Profile Link */}
              <a
                href={item.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="dp-rating-link"
              >
                View Profile →
              </a>

              {/* Progress Bar */}
              <div className="dp-rating-bar-track">
                <div
                  className="dp-rating-bar-fill"
                  style={{ width: `${item.progress}%` }}
                />
              </div>
            </article>
          ))}
        </div>

        {/* Total Problems Solved */}
        <div className="dp-total-solved" style={{ "margin-top" : "20px", "margin-bottom" : "15px" }}>
          <span className="dp-total-label">total_problems_solved</span>
          <span className="dp-total-chevron">&gt;</span>
          <span className="dp-total-value">{TOTAL_PROBLEMS_SOLVED}</span>
        </div>
      </div>

      <style jsx>{`
        /* ========================================
           RATINGS SECTION
        ======================================== */

        .dp-ratings-section {
          width: 100%;
        }

        .dp-ratings-container {
          width: 100%;
          max-width: 700px;
          margin: 0 auto;
        }

        /* ========================================
           RATINGS GRID
        ======================================== */

        .dp-ratings-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
          width: 100%;
        }

        /* ========================================
           RATING CARD
        ======================================== */

        .dp-rating-card {
          position: relative;
          display: flex;
          flex-direction: column;
          min-width: 0;
          padding: 24px;
          border-radius: 16px;
          border: 1px solid var(--hairline, rgba(255, 255, 255, 0.08));
          background: var(--surface, rgba(255, 255, 255, 0.02));
          transition:
            transform 0.25s ease,
            border-color 0.25s ease,
            box-shadow 0.25s ease;
        }

        .dp-rating-card:hover {
          transform: translateY(-4px);
          border-color: color-mix(in srgb, var(--card-accent) 40%, transparent);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.25);
        }

        /* ========================================
           TOP ROW
        ======================================== */

        .dp-rating-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 18px;
        }

        .dp-rating-platform {
          font-family: "Space Mono", "Courier New", monospace;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.08em;
          color: var(--muted, #8a8f98);
        }

        .dp-rating-badge {
          padding: 4px 10px;
          border-radius: 999px;
          border: 1px solid color-mix(in srgb, var(--card-accent) 45%, transparent);
          background: color-mix(in srgb, var(--card-accent) 12%, transparent);
          font-family: "Inter", sans-serif;
          font-size: 11px;
          font-weight: 600;
          color: var(--card-accent);
          white-space: nowrap;
        }

        /* ========================================
           RATING NUMBER
        ======================================== */

        .dp-rating-number {
          font-family: "Space Mono", "Courier New", monospace;
          font-size: 42px;
          font-weight: 700;
          line-height: 1.1;
          color: var(--card-accent);
          margin-bottom: 14px;
        }

        /* ========================================
           SUBTITLE
        ======================================== */

        .dp-rating-subtitle {
          font-family: "Space Mono", "Courier New", monospace;
          font-size: 13px;
          line-height: 1.5;
          color: var(--muted, #8a8f98);
          margin-bottom: 14px;
        }

        /* ========================================
           PROFILE LINK
        ======================================== */

        .dp-rating-link {
          font-family: "Space Mono", "Courier New", monospace;
          font-size: 13px;
          color: var(--muted, #8a8f98);
          text-decoration: none;
          margin-bottom: 14px;
          transition: color 0.2s ease;
        }

        .dp-rating-link:hover {
          color: var(--card-accent);
        }

        /* ========================================
           PROGRESS BAR
        ======================================== */

        .dp-rating-bar-track {
          width: 100%;
          height: 4px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.08);
          overflow: hidden;
        }

        .dp-rating-bar-fill {
          height: 100%;
          border-radius: 999px;
          background: var(--card-accent);
        }

        /* ========================================
           TOTAL SOLVED
        ======================================== */

        .dp-total-solved {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: fit-content;
          margin: 48px auto 0;
          padding: 14px 28px;
          border-radius: 12px;
          border: 1px solid var(--hairline, rgba(255, 255, 255, 0.08));
          background: var(--surface, rgba(255, 255, 255, 0.02));
          font-family: "Space Mono", "Courier New", monospace;
        }

        .dp-total-label {
          font-size: 14px;
          color: var(--muted, #8a8f98);
        }

        .dp-total-chevron {
          font-size: 14px;
          color: var(--muted, #8a8f98);
        }

        .dp-total-value {
          font-size: 16px;
          font-weight: 700;
          color: #22d3ee;
        }

        /* ========================================
           MOBILE
        ======================================== */

        @media (max-width: 640px) {
          .dp-rating-number {
            font-size: 36px;
          }

          .dp-total-solved {
            flex-wrap: wrap;
            padding: 12px 20px;
          }
        }
      `}</style>
    </section>
  );
}