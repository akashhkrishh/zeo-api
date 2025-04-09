// /app/api/getClientIP/route.ts

import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  // Get the client's IP from 'x-forwarded-for' header (used when behind a proxy)
  const ip = req.headers.get("x-forwarded-for") || req.ip;

  // Return the IP address as a JSON response
  return new Response(JSON.stringify({ ip }), {
    headers: { "Content-Type": "application/json" },
  });
}
