import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lexaffin — AI Legal & Financial Assistant",
  description: "AI-powered tools for business formation, contracts, compliance, and more.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="noise-overlay">{children}</body>
    </html>
  );
}
