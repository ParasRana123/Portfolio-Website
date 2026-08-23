"use client";

import { useEffect, useState } from "react";
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

  useEffect(() => {
    fetch("/api/spotify")
      .then((response) => (response.ok ? response.json() : { tracks: [] }))
      .then(({ tracks: recentTracks }) => {
        const nextTracks = recentTracks ?? [];
        setTracks(nextTracks);
        setSelectedTrack(nextTracks[0] ?? null);
      })
      .catch(() => setTracks([]));
  }, []);

  if (!selectedTrack) return null;

  return (
    <section className="dp-spotify" aria-labelledby="spotify-heading">
      <div className="dp-spotify-heading">
        <FaSpotify aria-hidden="true" />
        <span id="spotify-heading">Recently played</span>
      </div>

      <div className="dp-spotify-player-shell">
        {tracks.length > 1 && (
          <button
            type="button"
            className="dp-spotify-more-button"
            onClick={() => setIsDropdownOpen((isOpen) => !isOpen)}
            aria-expanded={isDropdownOpen}
          >
            {isDropdownOpen ? "Hide" : `More (${tracks.length - 1})`}
            <FaChevronDown aria-hidden="true" />
          </button>
        )}

        {isDropdownOpen && (
          <div className="dp-spotify-dropdown">
            {tracks.slice(1).map((track) => (
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
