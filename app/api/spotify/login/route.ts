import { NextResponse } from "next/server";

const SPOTIFY_AUTHORIZE_URL = "https://accounts.spotify.com/authorize";

export async function GET() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    return new NextResponse("Spotify is not configured yet.", { status: 500 });
  }

  const state = crypto.randomUUID();
  const authorizationUrl = new URL(SPOTIFY_AUTHORIZE_URL);
  authorizationUrl.search = new URLSearchParams({
    client_id: clientId,
    response_type: "code",
    redirect_uri: redirectUri,
    scope: "user-read-recently-played",
    state,
  }).toString();

  const response = NextResponse.redirect(authorizationUrl);
  response.cookies.set("spotify_oauth_state", state, {
    httpOnly: true,
    maxAge: 600,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}
