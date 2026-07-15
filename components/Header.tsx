const AVATAR =
  "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&h=200&fit=crop&crop=faces";

export default function Header() {
  return (
    <div className="dp-header">
      <img className="dp-avatar" src={AVATAR} alt="Paras Rana" />

      <div>
        <h1 className="dp-name">Paras Rana</h1>
        <p className="dp-subtitle">
          CS UNDERGRAD — FULL-STACK & AI/ML — MUMBAI
        </p>
      </div>
    </div>
  );
}