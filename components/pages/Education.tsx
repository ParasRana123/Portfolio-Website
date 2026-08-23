import { EDUCATION_DATA } from "@/data/educationData";
import { CalendarDays, MapPin } from "lucide-react";

export default function Education() {
  return (
    <section className="dp-education-section">
      <div className="dp-education-container">
        <div className="dp-education-intro">
          <p className="dp-education-subtitle">
            My academic background and learning journey that built my
            foundation in computer science, software development, and
            emerging technologies.
          </p>

        </div>

        {/* Education Cards */}
        <div className="dp-education-list">

          {EDUCATION_DATA.map((education) => (

            <article
              key={education.degree}
              className="dp-education-card"
            >

              {/* Icon */}
              <div className="dp-education-icon">

                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 10L12 5 2 10l10 5 10-5z" />
                  <path d="M6 12v5c3 2 9 2 12 0v-5" />
                  <path d="M12 15v4" />
                </svg>

              </div>



              {/* Content */}
              <div className="dp-education-content">


                <div className="dp-education-header">


                  <div>

                    <h3 className="dp-education-institution">
                      {education.institution}
                    </h3>


                    <h4 className="dp-education-degree">
                      {education.degree}
                    </h4>

                  </div>



                  <div className="dp-education-meta">

                    <span className="dp-education-meta-item">
                      <CalendarDays size={14} aria-hidden="true" />
                      {education.year}
                    </span>

                    <span className="dp-education-meta-item">
                      <MapPin size={14} aria-hidden="true" />
                      India
                    </span>
                  </div>


                </div>




                {/* Details */}
                <div className="dp-education-details">


                  <p>

                    <span
                      className={
                        "dp-education-detail-label"
                      }
                    >

                      {education.highlights[0].split(":")[0]}:

                    </span>{" "}

                    {
                      education.highlights[0]
                        .split(":")
                        .slice(1)
                        .join(":")
                        .trim()
                    }

                  </p>

                  {education.coursework && (

                    <p>

                      <span className="dp-highlight">
                        Relevant Coursework:
                      </span>{" "}

                      {education.coursework}

                    </p>

                  )}

                </div>

              </div>
              {/* Bottom Accent */}
              <div className="dp-education-accent" />


            </article>

          ))}

        </div>


      </div>

      <style jsx>{`

        /* ========================================
           SECTION
        ======================================== */

        .dp-education-section {

          width:100%;

        }

        .dp-education-container {

          width:100%;

          max-width:1200px;

          margin:0 auto;

        }

        /* ========================================
           HEADER
        ======================================== */

        .dp-education-intro {

          margin-bottom:28px;

        }

        .dp-education-eyebrow {

          margin:0 0 10px;

          font-family:"Inter",sans-serif;

          font-size:12px;

          font-weight:600;

          letter-spacing:.18em;

          text-transform:uppercase;

          color:var(--accent);

        }

        .dp-education-title {

          margin:0;

          font-family:"Space Grotesk",sans-serif;

          font-size:40px;

          font-weight:600;

          letter-spacing:-.035em;

          color:var(--ink);

        }

        .dp-education-subtitle {

          max-width:650px;

          margin:0;

          font-family:"Inter",sans-serif;

          font-size:15px;

          line-height:1.7;

          color:var(--ink);

        }

        /* ========================================
           LIST
        ======================================== */


        .dp-education-list {

          display:flex;

          flex-direction:column;

          gap:20px;

        }

        /* ========================================
           CARD
        ======================================== */


        .dp-education-card {

          position:relative;

          display:flex;

          gap:20px;

          padding:24px;

          border-radius:18px;

          border:1px solid var(--hairline);

          background:var(--surface);

          overflow:hidden;


          box-shadow:

          0 2px 5px rgba(0,0,0,.025),

          0 8px 24px rgba(0,0,0,.035);



          transition:

          transform .25s ease,

          border-color .25s ease,

          box-shadow .25s ease;

        }

        .dp-education-card:hover {

          transform:translateY(-3px);

          border-color:var(--accent);


          box-shadow:

          0 14px 34px rgba(0,0,0,.08);

        }

        /* ========================================
           ICON
        ======================================== */


        .dp-education-icon {


          width:52px;

          height:52px;


          border-radius:14px;


          flex-shrink:0;


          display:flex;

          align-items:center;

          justify-content:center;


          color:var(--accent);


          background:

          color-mix(

            in srgb,

            var(--accent) 12%,

            transparent

          );

        }

        /* ========================================
           CONTENT
        ======================================== */


        .dp-education-content {

          flex:1;

          min-width:0;

        }

        .dp-education-header {

          display:flex;

          justify-content:space-between;

          gap:20px;

        }

        .dp-education-institution {

          margin:0;


          font-family:"Space Grotesk",sans-serif;


          font-size:21px;


          font-weight:600;


          line-height:1.3;


          letter-spacing:-.02em;


          color:var(--ink);

        }

        .dp-education-degree {


          margin:6px 0 0;


          font-family:"Inter",sans-serif;
          font-size:14px;


          font-weight:500;


          line-height:1.55;


          letter-spacing:-.005em;


          color:var(--muted);

        }

        .dp-education-meta {


          display:flex;


          align-items:center;


          gap:14px;


          padding-top:4px;


          font-family:"Inter",sans-serif;


          font-size:12.5px;


          color:var(--muted);


          white-space:nowrap;

        }

        .dp-education-meta-item {

          display:flex;

          align-items:center;

          gap:6px;

        }

        .dp-education-meta-item svg {

          flex-shrink:0;

          color:var(--muted);

        }

        .dp-external {

          font-size:16px;

        }

        /* ========================================
           DETAILS
        ======================================== */


        .dp-education-details {


          margin-top:22px;


          font-family:"Inter",sans-serif;


          font-size:13.5px;


          line-height:1.7;


          color:var(--muted);

        }

        .dp-education-details p {

          margin:0 0 10px;

        }

        .dp-highlight {

          font-weight:600;

          color:var(--accent);

        }

        .dp-education-detail-label {

          font-weight:500;

          color:var(--muted);

        }
        /* ========================================
           ACCENT
        ======================================== */


        .dp-education-accent {


          position:absolute;


          bottom:0;


          left:0;


          width:0;


          height:2px;


          background:

          linear-gradient(

            to right,

            var(--accent),

            transparent

          );
          transition:.35s ease;

        }

        .dp-education-card:hover

        .dp-education-accent {

          width:100%;

        }
        /* ========================================
           MOBILE
        ======================================== */

        @media(max-width:700px){


          .dp-education-title {

            font-size:34px;

          }

          .dp-education-card {

            flex-direction:column;

            padding:20px;

          }

          .dp-education-header {

            flex-direction:column;

          }

          .dp-education-meta {

            flex-wrap:wrap;

          }

          .dp-education-institution {

            font-size:20px;

          }

          .dp-education-degree {

            font-size:14px;

          }

        }

        @media(max-width:420px){


          .dp-education-card {

            padding:20px;

          }

          .dp-education-institution {

            font-size:19px;

          }

          .dp-education-details {

            font-size:13px;

          }

        }

      `}</style>

    </section>
  );
}
