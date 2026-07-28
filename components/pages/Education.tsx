import { EDUCATION_DATA } from "@/data/educationData";

export default function Education() {
  return (
    <section className="dp-education-section">
      <div className="dp-education-container">

        {/* Section Header */}
        <div className="dp-education-intro">

          <p className="dp-education-eyebrow">
            Academic Journey
          </p>

          <h2 className="dp-education-title">
            Education
          </h2>

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

                    <span>
                      📅 {education.year}
                    </span>

                    <span>
                      📍 India
                    </span>

                    <span className="dp-external">
                      ↗
                    </span>

                  </div>


                </div>




                {/* Details */}
                <div className="dp-education-details">


                  <p>

                    <span className="dp-highlight">

                      {education.highlights[0].includes("CGPA")
                        ? "CGPA:"
                        : "Percentage:"}

                    </span>{" "}

                    {
                      education.highlights[0]
                        .replace("CGPA: ", "")
                        .replace("Percentage: ", "")
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

          padding:32px 0 40px;

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

          margin-bottom:52px;

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

          margin:16px 0 0;

          font-family:"Inter",sans-serif;

          font-size:15px;

          line-height:1.7;

          color:var(--muted);

        }

        /* ========================================
           LIST
        ======================================== */


        .dp-education-list {

          display:flex;

          flex-direction:column;

          gap:28px;

        }

        /* ========================================
           CARD
        ======================================== */


        .dp-education-card {

          position:relative;

          display:flex;

          gap:24px;

          padding:28px 34px;

          border-radius:22px;

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


          font-size:20px;


          font-weight:650;


          letter-spacing:-.015em;


          color:var(--ink);

        }

        .dp-education-degree {


          margin:10px 0 0;


          font-family:"Space Grotesk",sans-serif;
          font-size:16px;


          font-weight:600;


          letter-spacing:-.01em;


          color:var(--accent);

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

            padding:24px;

          }

          .dp-education-header {

            flex-direction:column;

          }

          .dp-education-meta {

            flex-wrap:wrap;

          }

          .dp-education-institution {

            font-size:19px;

          }

          .dp-education-degree {

            font-size:15px;

          }

        }

        @media(max-width:420px){


          .dp-education-card {

            padding:20px;

          }

          .dp-education-institution {

            font-size:18px;

          }

          .dp-education-details {

            font-size:13px;

          }

        }

      `}</style>

    </section>
  );
}