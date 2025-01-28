import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";

import { headers } from "next/headers";
import ContextProvider from "@/context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NFT Marketplace - Buy, Sell, and Discover Unique Digital Assets",
  description:
    "Explore the leading NFT marketplace to buy, sell, and discover unique digital assets. Join our community of creators and collectors today.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersObj = await headers();
  const cookies = headersObj.get("cookie");

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class">
          <ContextProvider cookies={cookies}>
            <Navbar />
            <section className="flex flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
              <div className="mx-auto w-full">{children}</div>
            </section>
            <Footer />
          </ContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
