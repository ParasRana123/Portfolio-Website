const AVATAR = "/tools/paras.jpg";

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