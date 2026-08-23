import Introduction from "../Introduction";
import SpotifyRecentTracks from "../SpotifyRecentTracks";
import WhereSection from "../WhereSection";
import WritingSection from "../WritingSection";

export default function Home() {
  return (
    <div className="dp-home-page">
      <Introduction />

      <hr className="dp-hr" />

      <SpotifyRecentTracks />

      <hr className="dp-hr" />

      <WhereSection />

      <hr className="dp-hr-dotted" />

      <div className="dp-home-writing">
        <WritingSection />
      </div>
    </div>
  );
}
