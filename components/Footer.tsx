"use client";

type FooterProps = {
  active: string;
  setActive: (page: string) => void;
};

const navLinks = ["Home", "Projects", "Tools", "Education", "Achievements"];

const socialLinks = [
  { label: "GitHub", href: "https://github.com/" },
  { label: "LinkedIn", href: "https://linkedin.com/" },
  { label: "Email", href: "mailto:hello@example.com" },
];

export default function Footer({ active, setActive }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer style={{ paddingBottom: 4 }}>
      <style>{`
        @keyframes dp-pulse {
          0% { box-shadow: 0 0 0 0 var(--accent); opacity: 1; }
          70% { box-shadow: 0 0 0 6px transparent; opacity: 0.4; }
          100% { box-shadow: 0 0 0 0 transparent; opacity: 1; }
        }
      `}</style>

      {/* Line 1 — identity + unique "status" touch */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 6,
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "var(--accent)",
            animation: "dp-pulse 1.8s ease-out infinite",
            flexShrink: 0,
          }}
        />
        <p
          className="dp-mono"
          style={{
            fontSize: 11.5,
            color: "var(--muted)",
            letterSpacing: "0.04em",
            margin: 0,
          }}
        >
          Available for freelance & full-time roles
        </p>
      </div>

      {/* Line 2 — quick nav + connect, inline */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 6,
          marginBottom: 6,
          fontSize: 11.5,
        }}
      >
        {navLinks.map((link, i) => (
          <span key={link} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <button
              onClick={() => setActive(link)}
              className="dp-mono"
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                color: active === link ? "var(--accent)" : "var(--muted)",
              }}
            >
              {link}
            </button>
            <span style={{ color: "var(--hairline)" }}>·</span>
          </span>
        ))}
        {socialLinks.map((s, i) => (
          <span key={s.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            
            <a
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="dp-mono"
              style={{
                color: "var(--muted)",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--muted)";
              }}
            >
              {s.label}
            </a>
            {i < socialLinks.length - 1 && (
              <span style={{ color: "var(--hairline)" }}>·</span>
            )}
          </span>
        ))}
      </div>

      {/* Line 3 — copyright + back to top */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <p
          className="dp-mono"
          style={{
            fontSize: 11,
            color: "var(--muted)",
            letterSpacing: "0.04em",
            margin: 0,
          }}
        >
          © {new Date().getFullYear()} PARAS RANA
        </p>

        <button
          onClick={scrollToTop}
          className="dp-mono"
          style={{
            background: "none",
            border: "none",
            padding: 0,
            fontSize: 11,
            letterSpacing: "0.04em",
            color: "var(--muted)",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = "var(--accent)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = "var(--muted)";
          }}
        >
          ↑ Top
        </button>
      </div>
    </footer>
  );
}