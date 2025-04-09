import { NextRequest } from "next/server";
export async function GET(req: NextRequest) { 
  const forwardedFor = req.headers.get("x-forwarded-for");
  const ip = forwardedFor ? forwardedFor.split(',')[0] : req.ip;
  const isIPv6 = ip && ip.includes(':');
  return new Response(
    JSON.stringify({ ip, isIPv6 }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}
