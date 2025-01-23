import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class">
          <div className="dark:bg-nft-dark bg-white min-h-screen">
            <h1>Header</h1>
            {children}
          </div>
          <h1>Footer</h1>
        </ThemeProvider>
      </body>
    </html>
  );
}
