import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { botToken, chatId, message } = await req.json();
    if (!botToken || !chatId) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: "HTML" }),
    });

    const data = await response.json();
    if (!data.ok) return NextResponse.json({ success: false, error: data.description }, { status: 400 });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}