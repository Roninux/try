"use client";


import Image from "next/image";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Upload, FolderOpen } from "lucide-react";

// Navbar — sticky top bar shared across the /main route.
export default function Navbar() {
  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e5e7eb",
        boxShadow: "0 1px 3px 0 rgba(0,0,0,0.06)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1.5rem",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* ── Left: Logo ─────────────────────────────────────────── */}
        <Link
          href="/main"
          style={{ display: "inline-flex", alignItems: "center" }}
        >
          <Image
            src="/assets/logo.png"
            alt="FileHub logo"
            width={100}
            height={200}
            priority
            style={{
              transition: "transform 0.2s ease",
            }}
            onMouseEnter={(e) =>
            ((e.currentTarget as HTMLImageElement).style.transform =
              "scale(1.05)")
            }
            onMouseLeave={(e) =>
            ((e.currentTarget as HTMLImageElement).style.transform =
              "scale(1)")
            }
          />
        </Link>

        {/* ── Center: Nav links ───────────────────────────────────── */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
          <NavLink href="/main" icon={<Upload size={16} />} label="Add File" />
          <NavLink
            href="/main/files"
            icon={<FolderOpen size={16} />}
            label="My Files"
          />
        </div>

        {/* ── Right: User menu ────────────────────────────────────── */}
        <div
          style={{ transition: "transform 0.2s ease", display: "inline-flex" }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLDivElement).style.transform = "scale(1.08)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLDivElement).style.transform = "scale(1)")
          }
        >
          <UserButton />
        </div>
      </div>
    </nav>
  );
}

// ── NavLink helper ────────────────────────────────────────────────────
function NavLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.375rem",
        padding: "0.4rem 0.875rem",
        borderRadius: "0.5rem",
        fontSize: "0.875rem",
        fontWeight: 500,
        color: "#374151",
        textDecoration: "none",
        transition: "color 0.2s ease, transform 0.2s ease, background 0.2s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.color = "#2563eb";
        el.style.transform = "scale(1.05)";
        el.style.background = "#eff6ff";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.color = "#374151";
        el.style.transform = "scale(1)";
        el.style.background = "transparent";
      }}
    >
      {icon}
      {label}
    </Link>
  );
}
