import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { AppNav } from "@/components/AppNav";
import { ConfigureAmplify } from "@/components/ConfigureAmplify";
import "./globals.css";

export const metadata: Metadata = {
  title: "Deep Roots",
  description:
    "Deep Roots is an 8-week transformational training that equips men to build strong spiritual, relational, and physical foundations so they can flourish in every part of life.",
  icons: {
    icon: "/logo.png?v=deep-roots-20260912"
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
              <Image
                className="brand-mark"
                src="/logo.png?v=deep-roots-20260912"
                alt=""
                aria-hidden="true"
                width={28}
                height={28}
                unoptimized
              />
              Deep Roots
            </Link>
            <AppNav />
          </header>
          <main className="main">{children}</main>
        </div>
      </body>
    </html>
  );
}
