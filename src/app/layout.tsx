// src/app/layout.tsx
import type { Metadata } from "next";
import ThemeRegistry from "@/components/ThemeRegistry"; // Import the registry
import Navbar from "@/components/Navbar";
import "@/app/globals.css"; // Import global styles
import Footer from "@/components/Footer";

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
    <html lang="en">
      <body>
        <ThemeRegistry>
          <Navbar />
          {children}
          <Footer />
        </ThemeRegistry>
      </body>
    </html>
  );
}
