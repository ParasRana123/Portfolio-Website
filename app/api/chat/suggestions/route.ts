import { NextResponse } from "next/server";
import { STARTER_SUGGESTIONS } from "@/lib/chatbot/context";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({
    suggestions: STARTER_SUGGESTIONS,
  });
}
