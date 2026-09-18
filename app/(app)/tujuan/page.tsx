"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const mockCards = [
  { id: "1", title: "Minum 2L air per hari", category: "hijau", weight: 2, status: "aktif", stepsTotal: 7, stepsDone: 5 },
  { id: "2", title: "Selesaiin kursus TypeScript", category: "biru", weight: 4, status: "aktif", stepsTotal: 12, stepsDone: 3 },
  { id: "3", title: "Lari 5K pertama", category: "merah", weight: 4, status: "aktif", stepsTotal: 8, stepsDone: 1 },
  { id: "4", title: "Coba masak resep baru tiap minggu", category: "kuning", weight: 2, status: "aktif", stepsTotal: 4, stepsDone: 2 },
  { id: "5", title: "Baca 2 buku bulan ini", category: "biru", weight: 2, status: "selesai", stepsTotal: 6, stepsDone: 6 },
  { id: "6", title: "Nabung 1 juta", category: "merah", weight: 4, status: "aktif", stepsTotal: 10, stepsDone: 4 },
];

const catStyle: Record<string, { bg: string; text: string; border: string; label: string }> = {
  merah: { bg: "bg-uno-red", text: "text-white", border: "border-uno-red/20", label: "Karier" },
  biru: { bg: "bg-uno-blue", text: "text-white", border: "border-uno-blue/20", label: "Growth" },
  hijau: { bg: "bg-uno-green", text: "text-white", border: "border-uno-green/20", label: "Kesehatan" },
  kuning: { bg: "bg-uno-yellow", text: "text-ink", border: "border-uno-yellow/20", label: "Petualangan" },
};

const filters = [
  { v: "semua", l: "Semua" },
  { v: "merah", l: "🔴 Karier" },
  { v: "biru", l: "🔵 Growth" },
  { v: "hijau", l: "🟢 Kesehatan" },
  { v: "kuning", l: "🟡 Petualangan" },
];

export default function TujuanPage() {
  const [filter, setFilter] = useState("semua");
  const [q, setQ] = useState("");

  const cards = mockCards.filter((c) => {
    const matchF = filter === "semua" || c.category === filter;
    const matchQ = c.title.toLowerCase().includes(q.toLowerCase());
    return matchF && matchQ;
  });

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}>
        <h1 className="font-display font-black text-3xl text-ink mb-1">Kartu Target 🎯</h1>
        <p className="font-body text-ink-muted text-sm">
          {mockCards.filter(c=>c.status==="aktif").length} kartu aktif · {mockCards.filter(c=>c.status==="selesai").length} selesai
        </p>
      </motion.div>

      {/* Search */}
      <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }} className="relative">
        <span className="icon icon--sm absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted">search</span>
        <input type="text" value={q} onChange={e=>setQ(e.target.value)} placeholder="Cari kartu…" id="search-cards"
          className="w-full pl-11 pr-4 py-3.5 bg-white rounded-2xl font-body text-ink placeholder:text-ink-muted/50 outline-none focus:ring-2 focus:ring-block-purple/20 transition-all border border-cream-dark shadow-sm" />
      </motion.div>

      {/* Filters */}
      <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.15 }}
        className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        <span className="icon icon--sm text-ink-muted shrink-0">filter_list</span>
        {filters.map(f=>(
          <button key={f.v} onClick={()=>setFilter(f.v)}
            className={`shrink-0 px-4 py-2 rounded-full font-display font-semibold text-xs transition-all ${
              filter===f.v ? "bg-ink text-white shadow-sm" : "bg-white text-ink-muted border border-cream-dark hover:bg-cream-dark"
            }`}>{f.l}</button>
        ))}
      </motion.div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <AnimatePresence mode="popLayout">
          {cards.map((card, i) => {
            const s = catStyle[card.category];
            const pct = (card.stepsDone / card.stepsTotal) * 100;
            const done = card.status === "selesai";
            return (
              <motion.div key={card.id} layout
                initial={{ opacity:0, scale:0.9, y:20 }} animate={{ opacity:1, scale:1, y:0 }} exit={{ opacity:0, scale:0.9 }}
                transition={{ delay:i*0.05, duration:0.4, layout:{ type:"spring", stiffness:300, damping:30 } }}>
                <Link href={`/tujuan/${card.id}`}>
                  <div className={`bg-white rounded-2xl p-5 shadow-sm border ${s.border} hover:shadow-md transition-all group cursor-pointer relative overflow-hidden ${done?"opacity-70":""}`}>
                    <div className={`absolute top-0 left-0 right-0 h-1.5 ${s.bg}`} />
                    <div className="flex items-start justify-between mb-3 pt-1">
                      <div className="flex items-center gap-2">
                        <span className={`badge ${s.bg} ${s.text} text-[10px] px-2 py-1`}>{s.label}</span>
                        {done && <span className="badge bg-uno-green/10 text-uno-green text-[10px] px-2 py-1">✓ Selesai</span>}
                      </div>
                      <span className={`font-display font-black text-lg ${card.weight===4?"text-uno-red":"text-block-purple"}`}>+{card.weight}</span>
                    </div>
                    <h3 className="font-display font-bold text-base text-ink mb-3 group-hover:text-block-purple transition-colors leading-snug">{card.title}</h3>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-cream rounded-full h-2">
                        <motion.div className={`${s.bg} rounded-full h-2`}
                          initial={{ width:"0%" }} animate={{ width:`${pct}%` }}
                          transition={{ duration:0.8, delay:0.3+i*0.05 }} />
                      </div>
                      <span className="font-body text-xs text-ink-muted shrink-0">{card.stepsDone}/{card.stepsTotal}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {cards.length===0 && (
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} className="text-center py-12">
          <span className="text-4xl mb-4 block">🃏</span>
          <p className="font-display font-bold text-lg text-ink mb-1">Nggak ada kartu di sini</p>
          <p className="font-body text-sm text-ink-muted">Coba ganti filter atau bikin kartu baru</p>
        </motion.div>
      )}

      <Link href="/tujuan/baru">
        <motion.div className="fixed bottom-24 right-6 w-14 h-14 bg-block-purple rounded-full flex items-center justify-center shadow-lg z-40"
          whileHover={{ scale:1.1 }} whileTap={{ scale:0.9 }} id="fab-add-target">
          <span className="icon text-white">add</span>
        </motion.div>
      </Link>
    </div>
  );
}
