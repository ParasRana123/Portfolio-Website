import { NextRequest, NextResponse } from "next/server";
import { generateChatResponse, createChatStream } from "@/lib/chatbot/engine";
import { ChatMessage } from "@/lib/chatbot/types";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, stream = false } = body;

    // Validate messages array
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Invalid request: 'messages' must be a non-empty array." },
        { status: 400 }
      );
    }

    // Sanitize & validate each message
    const sanitizedMessages: ChatMessage[] = [];
    for (const m of messages) {
      if (
        typeof m !== "object" ||
        !m ||
        typeof m.content !== "string" ||
        !["user", "assistant", "system"].includes(m.role)
      ) {
        return NextResponse.json(
          {
            error:
              "Invalid message format. Each message must have 'role' ('user'|'assistant'|'system') and string 'content'.",
          },
          { status: 400 }
        );
      }

      // Truncate overly large messages for safety
      const content = m.content.trim().slice(0, 4000);
      if (content.length > 0) {
        sanitizedMessages.push({
          role: m.role,
          content,
        });
      }
    }

    if (sanitizedMessages.length === 0) {
      return NextResponse.json(
        { error: "No valid message content provided." },
        { status: 400 }
      );
    }

    // Limit conversation history length to last 20 messages to prevent token explosion
    const recentMessages = sanitizedMessages.slice(-20);

    // Streaming mode
    if (stream) {
      const chatStream = await createChatStream({
        messages: recentMessages,
        stream: true,
      });

      return new Response(chatStream, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-cache, no-transform",
          "Transfer-Encoding": "chunked",
          Connection: "keep-alive",
        },
      });
    }

    // Standard JSON response
    const responsePayload = await generateChatResponse({
      messages: recentMessages,
    });

    return NextResponse.json(responsePayload);
  } catch (error: any) {
    console.error("Chat API route error:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error while generating chat response.",
        details: error?.message || String(error),
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "Paras Rana Portfolio Chatbot Backend",
    endpoints: {
      chat: "POST /api/chat",
      suggestions: "GET /api/chat/suggestions",
    },
  });
}
