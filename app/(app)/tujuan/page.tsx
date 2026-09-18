"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

const catStyle: Record<string, { bg: string; text: string; border: string; label: string }> = {
  merah: { bg: "bg-uno-red", text: "text-white", border: "border-uno-red/20", label: "Karier" },
  biru: { bg: "bg-uno-blue", text: "text-white", border: "border-uno-blue/20", label: "Growth" },
  hijau: { bg: "bg-uno-green", text: "text-white", border: "border-uno-green/20", label: "Kesehatan" },
  kuning: { bg: "bg-uno-yellow", text: "text-ink", border: "border-uno-yellow/20", label: "Petualangan" },
};

const filters = [
  { v: "semua", l: "Semua" },
  { v: "merah", l: "Karier" },
  { v: "biru", l: "Growth" },
  { v: "hijau", l: "Kesehatan" },
  { v: "kuning", l: "Petualangan" },
];

export default function TujuanPage() {
  const [filter, setFilter] = useState("semua");
  const [q, setQ] = useState("");
  const [mockCards, setMockCards] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: targets, error } = await supabase
        .from('targets')
        .select(`*, steps(*)`)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (targets && !error) {
        const mapped = targets.map(t => {
          const stepsTotal = t.steps ? t.steps.length : 0;
          const stepsDone = t.steps ? t.steps.filter((s:any) => s.is_done).length : 0;
          return {
            id: t.id,
            title: t.title,
            category: t.category,
            weight: t.weight,
            status: t.status,
            stepsTotal,
            stepsDone
          };
        });
        setMockCards(mapped);
      }
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const cards = mockCards.filter((c) => {
    const matchF = filter === "semua" || c.category === filter;
    const matchQ = c.title.toLowerCase().includes(q.toLowerCase());
    return matchF && matchQ;
  });

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}>
        <h1 className="font-display font-black text-3xl text-ink mb-1">Kartu Target</h1>
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
            className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full font-display font-semibold text-xs transition-all ${
              filter===f.v ? "bg-ink text-white shadow-sm" : "bg-white text-ink-muted border border-cream-dark hover:bg-cream-dark"
            }`}>
            {f.v !== "semua" && (
              <div className={`w-2 h-2 rounded-full ${catStyle[f.v].bg}`} />
            )}
            {f.l}
          </button>
        ))}
      </motion.div>

      {/* Cards */}
      {isLoading ? (
        <div className="text-center py-12">
           <span className="icon icon--lg animate-spin text-block-purple">refresh</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <AnimatePresence mode="popLayout">
            {cards.map((card, i) => {
              const s = catStyle[card.category];
              const pct = card.stepsTotal > 0 ? (card.stepsDone / card.stepsTotal) * 100 : 0;
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
      )}

      {!isLoading && cards.length===0 && (
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} className="text-center py-12">
          <span className="icon icon--xl text-ink-muted mb-4 block">layers_clear</span>
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
