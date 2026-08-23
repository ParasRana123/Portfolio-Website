import { NextResponse } from "next/server";
import { getRecentlyPlayedTracks } from "@/lib/spotify";

export const dynamic = "force-dynamic";

export async function GET() {
  const tracks = await getRecentlyPlayedTracks();
  return NextResponse.json({ tracks });
}
