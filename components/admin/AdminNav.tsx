"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/admin/groups", label: "Teams" },
  { href: "/admin/programs", label: "Missions" },
  { href: "/admin/users", label: "Users" }
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="admin-tabs">
      {tabs.map((tab) => (
        <Link
          className={`admin-tab${pathname.startsWith(tab.href) ? " active" : ""}`}
          href={tab.href}
          key={tab.href}
        >
          {tab.label}
        </Link>
      ))}
    </nav>
  );
}
