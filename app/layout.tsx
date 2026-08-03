import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { AppNav } from "@/components/AppNav";
import { ConfigureAmplify } from "@/components/ConfigureAmplify";
import "./globals.css";

export const metadata: Metadata = {
  title: "Priority One Deep Roots",
  description: "Team-based discipleship, challenge, and reflection for Priority One Deep Roots",
  icons: {
    icon: "/logo.png"
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ConfigureAmplify />
        <div className="shell">
          <header className="topbar">
            <Link className="brand" href="/dashboard">
              <Image className="brand-mark" src="/logo.png" alt="" aria-hidden="true" width={28} height={28} />
              Priority One Deep Roots
            </Link>
            <AppNav />
          </header>
          <main className="main">{children}</main>
        </div>
      </body>
    </html>
  );
}
