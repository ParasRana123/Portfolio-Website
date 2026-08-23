export type SpotifyTrack = {
  id: string;
  title: string;
  artist: string;
  artwork: string | null;
  url: string;
};

const TOKEN_URL = "https://accounts.spotify.com/api/token";
const RECENTLY_PLAYED_URL =
  "https://api.spotify.com/v1/me/player/recently-played?limit=15";

function getSpotifyConfig() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) return null;

  return { clientId, clientSecret, refreshToken };
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
  const uniqueTracks = new Map<string, SpotifyTrack>();

  for (const { track } of items) {
    if (uniqueTracks.has(track.id)) continue;

    uniqueTracks.set(track.id, {
      id: track.id,
      title: track.name,
      artist: track.artists
        .map((artist: { name: string }) => artist.name)
        .join(", "),
      artwork:
        track.album.images?.[1]?.url ?? track.album.images?.[0]?.url ?? null,
      url: track.external_urls.spotify,
    });

    if (uniqueTracks.size === 3) break;
  }

  return Array.from(uniqueTracks.values());
}
