// /app/api/getClientIP/route.ts

import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  // Get the IP from the 'x-forwarded-for' header or req.ip
  const forwardedFor = req.headers.get("x-forwarded-for");
  const ip = forwardedFor ? forwardedFor.split(',')[0] : req.ip;

  // Check if the IP is an IPv6 address
  const isIPv6 = ip && ip.includes(':');

  // Return the IP address and whether it's IPv6
  return new Response(
    JSON.stringify({ ip, isIPv6 }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}
