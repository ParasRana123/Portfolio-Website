import { NextRequest, NextResponse } from "next/server";

const TOKEN_URL = "https://accounts.spotify.com/api/token";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const expectedState = request.cookies.get("spotify_oauth_state")?.value;
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

  if (!code || !state || state !== expectedState) {
    return new NextResponse("Spotify authorization could not be verified.", {
      status: 400,
    });
  }

  if (!clientId || !clientSecret || !redirectUri) {
    return new NextResponse("Spotify is not configured yet.", { status: 500 });
  }

  const tokenResponse = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${clientId}:${clientSecret}`
      ).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
    }),
    cache: "no-store",
  });

  if (!tokenResponse.ok) {
    return new NextResponse("Spotify token exchange failed.", { status: 502 });
  }

  const { refresh_token: refreshToken } = await tokenResponse.json();
  const response = new NextResponse(
    `<!doctype html><html><body style="font-family:system-ui;max-width:680px;margin:64px auto;padding:0 24px"><h1>Spotify connected</h1><p>Copy this value into <code>SPOTIFY_REFRESH_TOKEN</code> in your local <code>.env</code> file, then close this page.</p><pre style="white-space:pre-wrap;word-break:break-all;padding:16px;border-radius:8px;background:#f4f4f4">${refreshToken}</pre></body></html>`,
    {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
      },
    }
  );
  response.cookies.delete("spotify_oauth_state");

  return response;
}
