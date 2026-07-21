import Introduction from "../Introduction";
import WhereSection from "../WhereSection";
import WritingSection from "../WritingSection";

export default function Home() {
  return (
    <>

      <Introduction />
      
      <hr className="dp-hr" />

      <WhereSection />

      <hr
        className="dp-hr-dotted"
        style={{ margin: "26px 0 0" }}
      />

      <div style={{ padding: "22px 0 4px" }}>
        <WritingSection />
      </div>
    </>
  );
}