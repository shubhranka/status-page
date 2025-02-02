import { ClerkProvider } from "@clerk/nextjs"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import React from "react" // Import React
import Navbar from "./navbar"
import { Toaster } from "@/components/ui/sonner"
import WebSocketComp from "@/components/WebSocket"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Status Page",
  description: "A clean and simple service status page",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <ClerkProvider>
          <WebSocketComp/>
      <html lang="en">
      
        <body className={`${inter.className} bg-gray-100 text-gray-800`}>
          <Navbar/>
          {children}
          <Toaster />
          </body>
      </html>
    </ClerkProvider>
  )
}

