// src/app/layout.tsx
import type { Metadata } from "next";
import ThemeRegistry from "@/components/ThemeRegistry"; // Import the registry
import ChatWidget from "@/components/ChatWidget";
import Navbar from "@/components/Navbar";
import "@/app/globals.css"; // Import global styles
import Footer from "@/components/Footer";
// import ChatWidget from "@/components/ChatWidget"; // replaced with dynamic import

export const metadata: Metadata = {
  title: "Ye Htet San Portfolio",
  description: "Built with Next.js and MUI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body suppressHydrationWarning>
        <ThemeRegistry>
          <Navbar />
          {children}
          <ChatWidget />
          <Footer />
        </ThemeRegistry>
      </body>
    </html>
  );
}
