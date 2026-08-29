"use client";

import { useEffect, useRef, useState } from "react";
import { FaChevronDown, FaSpotify } from "react-icons/fa";

type Track = {
  id: string;
  title: string;
  artist: string;
  artwork: string | null;
  url: string;
};

export default function SpotifyRecentTracks() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const shellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/spotify")
      .then((response) => (response.ok ? response.json() : { tracks: [] }))
      .then(({ tracks: recentTracks }) => {
        const rawTracks: Track[] = Array.isArray(recentTracks) ? recentTracks : [];
        const seenIds = new Set<string>();
        const seenKeys = new Set<string>();
        const uniqueTracks: Track[] = [];

        for (const track of rawTracks) {
          if (!track || !track.id) continue;
          const key = `${track.title.toLowerCase().trim()}:::${track.artist.toLowerCase().trim()}`;
          if (seenIds.has(track.id) || seenKeys.has(key)) continue;
          seenIds.add(track.id);
          seenKeys.add(key);
          uniqueTracks.push(track);
          if (uniqueTracks.length === 3) break;
        }

        setTracks(uniqueTracks);
        setSelectedTrack(uniqueTracks[0] ?? null);
      })
      .catch(() => setTracks([]));
  }, []);

  useEffect(() => {
    if (!isDropdownOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (shellRef.current && !shellRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDropdownOpen]);

  if (!selectedTrack) return null;

  const otherTracks = tracks.filter((track) => track.id !== selectedTrack.id);

  return (
    <section className="dp-spotify" aria-labelledby="spotify-heading">
      <div className="dp-spotify-heading">
        <FaSpotify aria-hidden="true" />
        <span id="spotify-heading">Recently played</span>
      </div>

      <div className="dp-spotify-player-shell" ref={shellRef}>
        {otherTracks.length > 0 && (
          <button
            type="button"
            className="dp-spotify-more-button"
            onClick={() => setIsDropdownOpen((isOpen) => !isOpen)}
            aria-expanded={isDropdownOpen}
          >
            {isDropdownOpen ? "Hide" : `More (${otherTracks.length})`}
            <FaChevronDown aria-hidden="true" />
          </button>
        )}

        {isDropdownOpen && otherTracks.length > 0 && (
          <div className="dp-spotify-dropdown">
            {otherTracks.map((track) => (
              <button
                key={track.id}
                type="button"
                className="dp-spotify-dropdown-track"
                onClick={() => {
                  setSelectedTrack(track);
                  setIsDropdownOpen(false);
                }}
              >
                {track.artwork ? (
                  <img src={track.artwork} alt="" className="dp-spotify-artwork" />
                ) : (
                  <span className="dp-spotify-artwork dp-spotify-artwork--empty" />
                )}
                <span className="dp-spotify-track-copy">
                  <strong>{track.title}</strong>
                  <span>{track.artist}</span>
                </span>
              </button>
            ))}
          </div>
        )}

        <iframe
          key={selectedTrack.id}
          className="dp-spotify-player"
          title={`Play ${selectedTrack.title} on Spotify`}
          src={`https://open.spotify.com/embed/track/${selectedTrack.id}?utm_source=generator`}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </div>
    </section>
  );
}
