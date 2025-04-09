// /app/page.tsx
"use client"
import { useEffect, useState } from "react";

const HomePage = () => {
  const [ip, setIp] = useState<string | null>(null);

  useEffect(() => {
    async function fetchIP() {
      try {
        const response = await fetch("/api/getClientIP");
        const data = await response.json();
        setIp(data.ip);
      } catch (error) {
        console.error("Error fetching IP:", error);
      }
    }

    fetchIP();
  }, []);

  return (
    <div>
      <h1>Your IP Address: {ip}</h1>
    </div>
  );
};

export default HomePage;
