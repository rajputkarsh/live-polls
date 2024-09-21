import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const notoSansFont = Noto_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Realtime Q&A and Polls",
  description: "Connect with your audience with real-time Q&A and Polls",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="h-full" lang="en">
      <body
        className={`${cn(
          "h-full bg-zinc-100",
          notoSansFont.className
        )} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
