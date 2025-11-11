import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "User Cards PWA",
  description: "A PWA that displays user cards",
  manifest: "/manifest.json",
  // themeColor here is fine, but we’ll ensure it also renders manually
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Manually added meta tag for theme color */}
        <meta name="theme-color" content="#1976d2" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  );
}
