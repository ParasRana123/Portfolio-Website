import Introduction from "../Introduction";
import WhereSection from "../WhereSection";
import WritingSection from "../WritingSection";

export default function Home() {
  return (
    <div className="dp-home-page">
      <Introduction />

      <hr className="dp-hr" />

      <WhereSection />

      <hr
        className="dp-hr-dotted"
        style={{ margin: "26px 0 0" }}
      />

      <div className="dp-home-writing">
        <WritingSection />
      </div>
    </div>
  );
}