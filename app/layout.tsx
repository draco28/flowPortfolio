import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Draco | Full-Stack Developer",
  description: "I craft digital experiences with code. Full-Stack Developer specializing in modern web technologies.",
  keywords: ["developer", "full-stack", "portfolio", "react", "next.js", "typescript"],
  authors: [{ name: "Draco" }],
  openGraph: {
    title: "Draco | Full-Stack Developer",
    description: "I craft digital experiences with code.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Draco | Full-Stack Developer",
    description: "I craft digital experiences with code.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'var(--dark-card)',
              border: '1px solid var(--border-medium)',
              color: 'var(--text-primary)',
            },
          }}
        />
      </body>
    </html>
  );
}
