"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const navItems = [
  { href: "/meja", label: "Meja", icon: "dashboard" },
  { href: "/tujuan", label: "Tujuan", icon: "target" },
  { href: "/memori", label: "Memori", icon: "photo_library" },
  { href: "/profil", label: "Kawaii", icon: "person" },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-cream/80 backdrop-blur-xl border-b border-cream-dark">
        <div className="max-w-2xl mx-auto px-5 py-4 flex items-center justify-between">
          <Link href="/meja" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-block-purple rounded-xl flex items-center justify-center shadow-sm">
              <span className="font-display font-black text-xs text-white">UNO</span>
            </div>
            <span className="font-display font-bold text-lg text-ink">Deck</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-5 py-6 pb-28">{children}</main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-t border-cream-dark">
        <div className="max-w-2xl mx-auto px-2">
          <div className="flex items-center justify-around py-2">
            {navItems.map((item) => {
              const active = pathname === item.href || pathname?.startsWith(item.href + "/");
              return (
                <Link key={item.href} href={item.href}
                  className="relative flex flex-col items-center gap-0.5 px-4 py-2 rounded-2xl transition-colors"
                  id={`nav-${item.label.toLowerCase()}`}>
                  {active && (
                    <motion.div layoutId="nav-pill" className="absolute inset-0 bg-block-purple/10 rounded-2xl"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }} />
                  )}
                  <span className={`icon icon--sm relative z-10 transition-colors ${active ? "text-block-purple icon--filled" : "text-ink-muted"}`}>
                    {item.icon}
                  </span>
                  <span className={`relative z-10 text-[10px] font-display font-semibold transition-colors ${active ? "text-block-purple" : "text-ink-muted"}`}>
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}
