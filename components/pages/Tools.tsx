import { SKILL_GROUPS } from "@/data/tools";

export default function Tools() {
  return (
    <div className="dp-inspiration-page">
      <div className="dp-inspiration-intro">
        <p className="dp-inspiration">
          A glimpse into the tools, technologies, and platforms that turn my
          ideas into things people can actually use.
          <br />
          From the first line of code to the final deployment, these are the
          tools I keep within reach.
        </p>
      </div>

      <div className="dp-skills-grid">
        {SKILL_GROUPS.map((group) => (
          <section className="dp-skill-group" key={group.name}>
            <h2 className="dp-skill-group-title">{group.name}</h2>
            <div className="dp-skill-tags">
              {group.skills.map((skill) => (
                <span
                  className="dp-skill-tag"
                  data-skill={skill.name}
                  key={skill.name}
                >
                  <img src={skill.logo} alt="" className="dp-skill-logo" />
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
