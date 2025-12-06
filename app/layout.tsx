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
  title: "Draco | AI Agent Builder & Full-Stack Developer",
  description: "Building the future with AI-powered code. Full-Stack Developer crafting AI agents and intelligent applications with an AI-augmented workflow.",
  keywords: ["AI agents", "full-stack developer", "Claude SDK", "LangChain", "Next.js", "TypeScript", "React", "AI development", "prompt engineering"],
  authors: [{ name: "Draco" }],
  openGraph: {
    title: "Draco | AI Agent Builder & Full-Stack Developer",
    description: "Building the future with AI-powered code. Crafting AI agents and intelligent applications.",
    type: "website",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Draco | AI Agent Builder",
    description: "Building the future with AI-powered code.",
  },
  robots: {
    index: true,
    follow: true,
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
