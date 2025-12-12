import "./globals.css";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "ICTP CAMP 2025: Pirate of the Cyberian",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-thai">{children}</body>
    </html>
  );
}
