import { tools } from "@/data/tools";

export default function Inspiration() {
  return (
    <div style={{ padding: "2px 0" }}>
      <p className="dp-inspiration">
        A glimpse into the tools, technologies, and platforms that turn my ideas into things people can actually use.
        <br />
        From the first line of code to the final deployment, these are the tools I keep within reach.
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          marginTop: "24px",
        }}
      >
        {tools.map((tool: any) => (
          <div
            key={tool.name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              padding: "10px 8px",
              borderRadius: "12px",
              transition: "background-color 0.15s ease",
              cursor: "default",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#f7f6f5";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            <div
              style={{
                width: "38px",
                height: "38px",
                minWidth: "38px",
                borderRadius: "10px",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#fafaf9",
                border: "1px solid #ebeae8",
                boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
              }}
            >
              <img
                src={tool.image}
                alt={tool.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>

            <p
              style={{
                margin: 0,
                fontSize: "14.5px",
                lineHeight: "1.4",
                letterSpacing: "-0.01em",
              }}
            >
              <span style={{ fontWeight: 600, color: "#1c1917" }}>
                {tool.name}
              </span>
              <span style={{ margin: "0 8px", color: "#d6d3d1" }}>•</span>
              <span style={{ color: "#78716c" }}>{tool.line}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}