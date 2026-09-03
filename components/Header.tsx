const AVATAR = "/tools/paras.jpg";

export default function Header() {
  return (
    <div className="dp-header">
      <img className="dp-avatar" src={AVATAR} alt="Paras Rana" />

      <div>
        <h1 className="dp-name">Paras Rana</h1>
        <p className="dp-subtitle">
          PIXELS, PACKETS &amp; PROBABILITY DISTRIBUTIONS
        </p>
      </div>
    </div>
  );
}