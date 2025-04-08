import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/styles/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import ReduxProvider from "@/redux/ReduxWrapper"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "zeo-Api",
  description: "Modern Next.js application with theme support",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} flex flex-col w-full lg:h-screen `} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
          <ReduxProvider>
            <Toaster className=" rounded-none" />
            {children}
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

