export type SpotifyTrack = {
  id: string;
  title: string;
  artist: string;
  artwork: string | null;
  url: string;
};

const TOKEN_URL = "https://accounts.spotify.com/api/token";
const RECENTLY_PLAYED_URL =
  "https://api.spotify.com/v1/me/player/recently-played?limit=50";

function getSpotifyConfig() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) return null;

  return { clientId, clientSecret, refreshToken };
}

function normalizeTrackName(name: string): string {
  return (name || "")
    .toLowerCase()
    .replace(
      /\s*[\(\[](feat\.|ft\.|with|remaster|radio edit|deluxe|bonus track|single version|album version|explicit|version orchest\w*|slowed version|acoustic|live)[^\)\]]*[\)\]]/gi,
      ""
    )
    .replace(
      /\s*-\s*(feat\.|ft\.|with|remaster|radio edit|deluxe|bonus track|single version|album version|version orchest\w*|slowed version|acoustic|live).*$/gi,
      ""
    )
    .replace(/[^\p{L}\p{N}\s]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

function getTrackDedupeKey(track: {
  name?: string;
  artists?: Array<{ name: string }>;
}): string {
  const primaryArtist = track.artists?.[0]?.name?.toLowerCase().trim() || "";
  const cleanTitle = normalizeTrackName(track.name || "");
  return `${cleanTitle}:::${primaryArtist}`;
}

export async function getRecentlyPlayedTracks(): Promise<SpotifyTrack[]> {
  const config = getSpotifyConfig();
  if (!config) return [];

  const tokenResponse = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${config.clientId}:${config.clientSecret}`
      ).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: config.refreshToken,
    }),
    cache: "no-store",
  });
  if (!tokenResponse.ok) return [];

  const { access_token: accessToken } = await tokenResponse.json();
  const recentResponse = await fetch(RECENTLY_PLAYED_URL, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });
  if (!recentResponse.ok) return [];

  const { items = [] } = await recentResponse.json();
  const seenIds = new Set<string>();
  const seenKeys = new Set<string>();
  const distinctTracks: SpotifyTrack[] = [];

  for (const { track } of items) {
    if (!track || !track.id || !track.name) continue;

    const trackId = track.id;
    const dedupeKey = getTrackDedupeKey(track);

    if (seenIds.has(trackId) || seenKeys.has(dedupeKey)) continue;

    seenIds.add(trackId);
    seenKeys.add(dedupeKey);

    distinctTracks.push({
      id: track.id,
      title: track.name,
      artist: track.artists
        ? track.artists.map((artist: { name: string }) => artist.name).join(", ")
        : "",
      artwork:
        track.album?.images?.[1]?.url ?? track.album?.images?.[0]?.url ?? null,
      url: track.external_urls?.spotify ?? "",
    });

    if (distinctTracks.length === 3) break;
  }

  return distinctTracks;
}
