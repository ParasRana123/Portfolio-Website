import { tools } from "@/data/tools";

export default function Inspiration() {
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

      <div className="dp-tools-list">
        {tools.map((tool: any) => (
          <div className="dp-tool-row" key={tool.name}>
            <div className="dp-tool-icon">
              <img
                src={tool.image}
                alt={tool.name}
              />
            </div>

            <p className="dp-tool-text">
              <span className="dp-tool-name">
                {tool.name}
              </span>

              <span className="dp-tool-dot">•</span>

              <span className="dp-tool-line">
                {tool.line}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}