import { WHERE_ITEMS } from "@/data/whereItems";

export default function WhereSection() {
  return (
    <section>
      <div className="dp-eyebrow">Where I am on</div>

      <div className="dp-where-list">
        {WHERE_ITEMS.map((item) => {
          const Icon = item.icon;

          return (
            <div className="dp-where-row" key={item.name}>
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
            </div>
          );
        })}
      </div>
    </section>
  );
}