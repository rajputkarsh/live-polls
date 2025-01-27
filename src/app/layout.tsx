import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils/ui-utils";
import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";

const notoSans = Noto_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Real-time Q&A and Polls",
  description:
    "Connect with your audience with real-time Q&A and Polls.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className={cn("h-full bg-zinc-100", notoSans.className)}>
        {children}

        <Toaster />
      </body>
    </html>
  );
}
