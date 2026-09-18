"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const stats = {
  opponentPoints: 12,
  loseThreshold: 50,
  activeTargets: 5,
  completedTargets: 3,
  weeklyStreak: 2,
};

const activity = [
  { id: 1, text: "Kamu nyelesaiin 'Minum 2L air per hari'", pts: "+2", time: "3 jam lalu", dot: "bg-uno-green" },
  { id: 2, text: "Kamu centang langkah di 'Belajar TypeScript'", pts: null, time: "5 jam lalu", dot: "bg-uno-blue" },
  { id: 3, text: "Kamu bikin kartu baru 'Lari 5K pertama'", pts: null, time: "Kemarin", dot: "bg-uno-red" },
];

const fadeUp = (i: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: i * 0.1, duration: 0.5 },
});

export default function MejaPage() {
  const pct = (stats.opponentPoints / stats.loseThreshold) * 100;

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <motion.div {...fadeUp(0)}>
        <h1 className="font-display font-black text-3xl text-ink mb-1">Meja UNO 🃏</h1>
        <p className="font-body text-ink-muted text-sm">Ini ringkasan permainan kamu hari ini.</p>
      </motion.div>

      {/* Score Card */}
      <motion.div {...fadeUp(1)}
        className="bg-gradient-to-br from-block-purple to-[#6930c3] rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full" />
        <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white/5 rounded-full" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <span className="icon icon--sm text-uno-yellow">emoji_events</span>
            <span className="font-body text-sm text-white/70">Poin di Deck Aku</span>
          </div>
          <p className="font-display font-black text-5xl mb-4">+{stats.opponentPoints}</p>
          <div className="w-full bg-white/20 rounded-full h-3 mb-2">
            <motion.div className="bg-gradient-to-r from-uno-yellow to-uno-red rounded-full h-3"
              initial={{ width: "0%" }} animate={{ width: `${pct}%` }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }} />
          </div>
          <div className="flex items-center justify-between">
            <span className="font-body text-xs text-white/60">{stats.opponentPoints} / {stats.loseThreshold} menuju kekalahan</span>
            <span className="font-display font-bold text-xs text-uno-yellow">{Math.round(pct)}%</span>
          </div>
        </div>
      </motion.div>

      {/* Stat Cards */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: "target", label: "Aktif", value: stats.activeTargets, color: "text-block-purple", bg: "bg-block-purple/10" },
          { icon: "check_circle", label: "Selesai", value: stats.completedTargets, color: "text-uno-green", bg: "bg-uno-green/10" },
          { icon: "local_fire_department", label: "Streak", value: `${stats.weeklyStreak}w`, color: "text-block-orange", bg: "bg-block-orange/10" },
        ].map((s, i) => (
          <motion.div key={i} {...fadeUp(i + 2)} className="bg-white rounded-2xl p-4 shadow-sm border border-cream-dark">
            <div className={`w-9 h-9 ${s.bg} rounded-xl flex items-center justify-center mb-2`}>
              <span className={`icon icon--sm ${s.color}`}>{s.icon}</span>
            </div>
            <p className="font-display font-black text-2xl text-ink">{s.value}</p>
            <p className="font-body text-xs text-ink-muted mt-0.5">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* UNO Table */}
      <motion.div {...fadeUp(5)} className="bg-white rounded-3xl p-6 shadow-sm border border-cream-dark">
        <h3 className="font-display font-bold text-lg text-ink mb-5 flex items-center gap-2">
          <span className="icon icon--sm text-block-purple">auto_awesome</span>
          Meja Permainan
        </h3>
        <div className="flex items-center justify-center gap-8">
          {/* Her deck */}
          <div className="text-center">
            <div className="relative">
              {[2,1,0].map((n) => (
                <motion.div key={n} className="w-16 h-22 bg-block-purple rounded-xl shadow-md"
                  style={{ position: n===0?"relative":"absolute", top:`${-n*3}px`, left:`${n*2}px`, zIndex:3-n }}
                  initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5+n*0.1 }}>
                  {n===0 && <div className="w-full h-full flex items-center justify-center">
                    <span className="font-display font-black text-white text-xs">{stats.activeTargets}</span>
                  </div>}
                </motion.div>
              ))}
            </div>
            <p className="font-display font-bold text-sm text-ink mt-3">Deck Kamu</p>
            <p className="font-body text-xs text-ink-muted">{stats.activeTargets} kartu</p>
          </div>

          <div className="flex flex-col items-center gap-1">
            <motion.div animate={{ rotate: [0,10,-10,0] }} transition={{ duration:2, repeat:Infinity }} className="text-2xl">⚡</motion.div>
            <span className="font-display font-black text-xs text-ink-muted">VS</span>
          </div>

          {/* My deck */}
          <div className="text-center">
            <div className="relative">
              {[2,1,0].map((n) => (
                <motion.div key={n} className="w-16 h-22 bg-uno-red rounded-xl shadow-md"
                  style={{ position: n===0?"relative":"absolute", top:`${-n*3}px`, right:`${n*2}px`, zIndex:3-n }}
                  initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5+n*0.1 }}>
                  {n===0 && <div className="w-full h-full flex items-center justify-center">
                    <span className="font-display font-black text-white text-xs">+{stats.opponentPoints}</span>
                  </div>}
                </motion.div>
              ))}
            </div>
            <p className="font-display font-bold text-sm text-ink mt-3">Deck Aku</p>
            <p className="font-body text-xs text-ink-muted">+{stats.opponentPoints} poin</p>
          </div>
        </div>
      </motion.div>

      {/* Activity */}
      <motion.div {...fadeUp(6)} className="bg-white rounded-3xl p-6 shadow-sm border border-cream-dark">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-bold text-lg text-ink">Aktivitas Terbaru</h3>
          <Link href="/tujuan" className="font-body text-sm text-block-purple flex items-center gap-1 hover:underline">
            Lihat semua <span className="icon icon--sm">arrow_forward</span>
          </Link>
        </div>
        <div className="space-y-3">
          {activity.map((a, i) => (
            <motion.div key={a.id} initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }}
              transition={{ delay: 0.8+i*0.1 }} className="flex items-start gap-3">
              <div className={`w-2 h-2 ${a.dot} rounded-full mt-2 shrink-0`} />
              <div className="flex-1 min-w-0">
                <p className="font-body text-sm text-ink leading-snug">
                  {a.text}
                  {a.pts && <span className="font-display font-bold text-block-purple ml-1">{a.pts}</span>}
                </p>
                <p className="font-body text-xs text-ink-muted mt-0.5">{a.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* FAB */}
      <Link href="/tujuan/baru">
        <motion.div className="fixed bottom-24 right-6 w-14 h-14 bg-block-purple rounded-full flex items-center justify-center shadow-lg z-40"
          whileHover={{ scale:1.1 }} whileTap={{ scale:0.9 }}
          animate={{ y:[0,-4,0] }} transition={{ y:{ duration:3, repeat:Infinity, ease:"easeInOut" } }}
          id="fab-add-card">
          <span className="icon text-white">add</span>
        </motion.div>
      </Link>
    </div>
  );
}
