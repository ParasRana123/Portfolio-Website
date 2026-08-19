"use client";

import { FiMail, FiExternalLink } from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";

type FooterProps = {
  active?: string;
  setActive?: (page: string) => void;
};

const CONTACT_LINKS = [
  {
    label: "parasrana579@gmail.com",
    href: "mailto:parasrana579@gmail.com",
    icon: FiMail,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/paras-rana-696b7731b/",
    icon: FaLinkedin,
  },
  {
    label: "GitHub",
    href: "https://github.com/ParasRana123",
    icon: FaGithub,
  },
  {
    label: "LeetCode",
    href: "https://leetcode.com/u/paras579/",
    icon: FiExternalLink,
  },
  {
    label: "Codechef",
    href: "https://www.codechef.com/users/paras579",
    icon: FiExternalLink,
  },
];

export default function Footer(_props: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="dp-footer">
      <div className="dp-footer-container">
        {/* Eyebrow */}
        {/* <p className="dp-footer-eyebrow dp-mono">// contact</p> */}

        {/* Heading */}
        <h2 className="dp-footer-heading">
          Let&apos;s{" "}
          <span className="dp-footer-heading-accent">Connect</span>
        </h2>

        {/* Subtitle */}
        <p className="dp-footer-subtitle">
          Open to internships, collaborations, and competitive
          programming discussions.
        </p>

        {/* Contact Links */}
        <div className="dp-footer-links">
          {CONTACT_LINKS.map((link) => {
            const Icon = link.icon;

            return (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="dp-footer-link"
              >
                <Icon size={13} className="dp-footer-link-icon" />
                <span className="dp-mono">{link.label}</span>
              </a>
            );
          })}
        </div>

        {/* Bottom Bar */}
        {/* <div className="dp-footer-bottom">
          <p className="dp-mono dp-footer-copyright">
            © {new Date().getFullYear()} PARAS RANA
          </p>

          <button
            onClick={scrollToTop}
            className="dp-mono dp-footer-top-btn"
          >
            ↑ Top
          </button>
        </div> */}
      </div>

      <style jsx>{`
        /* ========================================
           FOOTER SECTION
        ======================================== */

        .dp-footer {
          width: 100%;
          padding: 40px 0 16px;
        }

        .dp-footer-container {
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        /* ========================================
           EYEBROW
        ======================================== */

        .dp-footer-eyebrow {
          margin: 0 0 8px 0;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--accent);
        }

        /* ========================================
           HEADING
        ======================================== */

        .dp-footer-heading {
          margin: 0;
          font-family: "Space Grotesk", sans-serif;
          font-size: 32px;
          font-weight: 600;
          letter-spacing: -0.03em;
          line-height: 1.1;
          color: var(--ink);
        }

        .dp-footer-heading-accent {
          background: linear-gradient(
            120deg,
            var(--accent) 0%,
            #7dd3fc 50%,
            #c084fc 100%
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        /* ========================================
           SUBTITLE
        ======================================== */

        .dp-footer-subtitle {
          max-width: 420px;
          margin: 10px 0 0 0;
          font-family: "Inter", sans-serif;
          font-size: 13px;
          line-height: 1.5;
          color: var(--muted);
        }

        /* ========================================
           CONTACT LINKS
        ======================================== */

        .dp-footer-links {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 22px;
        }

        .dp-footer-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 12px;
          border-radius: 999px;
          border: 1px solid var(--hairline);
          background: var(--surface);
          font-size: 11px;
          color: var(--ink);
          text-decoration: none;
          transition:
            border-color 0.2s ease,
            transform 0.2s ease,
            color 0.2s ease;
        }

        .dp-footer-link-icon {
          color: var(--accent);
          flex-shrink: 0;
        }

        .dp-footer-link:hover {
          border-color: var(--accent);
          color: var(--accent);
          transform: translateY(-1px);
        }

        /* ========================================
           BOTTOM BAR
        ======================================== */

        .dp-footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          margin-top: 30px;
          padding-top: 12px;
          border-top: 1px solid var(--hairline);
        }

        .dp-footer-copyright {
          margin: 0;
          font-size: 9px;
          letter-spacing: 0.04em;
          color: var(--muted);
        }

        .dp-footer-top-btn {
          background: none;
          border: none;
          padding: 0;
          font-size: 9px;
          letter-spacing: 0.04em;
          color: var(--muted);
          cursor: pointer;
          transition: color 0.2s ease;
        }

        .dp-footer-top-btn:hover {
          color: var(--accent);
        }

        /* ========================================
           MOBILE
        ======================================== */

        @media (max-width: 640px) {
          .dp-footer {
            padding: 32px 0 14px;
          }

          .dp-footer-heading {
            font-size: 27px;
          }

          .dp-footer-subtitle {
            max-width: 340px;
            font-size: 12px;
          }

          .dp-footer-links {
            gap: 7px;
            margin-top: 18px;
          }

          .dp-footer-link {
            padding: 6px 10px;
            font-size: 10.5px;
          }

          .dp-footer-bottom {
            margin-top: 24px;
            padding-top: 10px;
          }
        }

        /* ========================================
           VERY SMALL SCREENS
        ======================================== */

        @media (max-width: 400px) {
          .dp-footer-heading {
            font-size: 25px;
          }

          .dp-footer-subtitle {
            font-size: 11.5px;
          }

          .dp-footer-link {
            padding: 6px 9px;
            font-size: 10px;
          }

          .dp-footer-links {
            max-width: 320px;
          }
        }
      `}</style>
    </footer>
  );
}