import { WHERE_ITEMS } from "@/data/whereItems";

export default function WhereSection() {
  return (
    <section>
      <div className="dp-eyebrow">Where I am on</div>

      <div className="dp-where-list">
        {WHERE_ITEMS.map((item) => {
          const Icon = item.icon;

          return (
            <a
              className="dp-where-row dp-where-link"
              href={item.href}
              key={item.name}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span
                className="dp-where-icon"
                style={{ background: item.iconBg }}
              >
                <Icon size={15} color="#fff" />
              </span>

              <div>
                <p className="dp-where-name">{item.name}</p>
                <p className="dp-where-line">{item.line}</p>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
