"use client";

import { motion } from "framer-motion";

const mockTransfers = [
  {
    id: "1",
    title: "Baca 2 buku bulan ini",
    category: "biru",
    weight: 2,
    date: "14 Sep 2026",
    note: "Aku bangga. Ini +2 pertama kamu tahun ini.",
  },
  {
    id: "2",
    title: "Jalan kaki 30 menit setiap hari",
    category: "hijau",
    weight: 4,
    date: "12 Sep 2026",
    note: "Konsisten banget kamu. Keep going!",
  },
  {
    id: "3",
    title: "Selesaiin portfolio website",
    category: "merah",
    weight: 4,
    date: "2 minggu lalu",
    note: null,
  },
];

const totalPoints = mockTransfers.reduce((sum, t) => sum + t.weight, 0);
const threshold = 50;
const progress = (totalPoints / threshold) * 100;

const catColor: Record<string, string> = {
  merah: "bg-uno-red",
  biru: "bg-uno-blue",
  hijau: "bg-uno-green",
  kuning: "bg-uno-yellow",
};

export default function DeckLawankuPage() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-display font-black text-3xl text-ink mb-1">
          Deck Lawan 🃏
        </h1>
        <p className="font-body text-ink-muted text-sm">
          Semua kartu plus yang udah kamu kirim ke aku.
        </p>
      </motion.div>

      {/* Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-uno-red to-[#c62828] rounded-3xl p-6 text-white shadow-lg"
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="icon icon--sm text-uno-yellow">emoji_events</span>
          <span className="font-body text-sm text-white/70">
            Total Poin Lawan
          </span>
        </div>
        <p className="font-display font-black text-5xl mb-3">+{totalPoints}</p>
        <div className="w-full bg-white/20 rounded-full h-3 mb-2">
          <motion.div
            className="bg-gradient-to-r from-uno-yellow to-white rounded-full h-3"
            initial={{ width: "0%" }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ duration: 1.2 }}
          />
        </div>
        <p className="font-body text-xs text-white/60">
          {totalPoints} / {threshold} menuju kekalahan aku
        </p>
      </motion.div>

      {/* Transferred cards */}
      <div className="space-y-3">
        {mockTransfers.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="bg-white rounded-2xl p-5 shadow-sm border border-cream-dark"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 ${catColor[t.category]} rounded-full`} />
                <h3 className="font-display font-bold text-base text-ink">
                  {t.title}
                </h3>
              </div>
              <span className="font-display font-black text-lg text-uno-red">
                +{t.weight}
              </span>
            </div>
            <p className="font-body text-xs text-ink-muted mb-3">{t.date}</p>

            {t.note ? (
              <div className="bg-block-purple/5 rounded-xl p-3 flex items-start gap-2">
                <span className="icon text-block-purple mt-0.5 shrink-0" style={{ fontSize: '14px' }}>chat</span>
                <p className="font-body text-sm text-ink-light italic">
                  &ldquo;{t.note}&rdquo;
                </p>
              </div>
            ) : (
              <div className="bg-cream rounded-xl p-3 text-center">
                <p className="font-body text-xs text-ink-muted">
                  Belum ada pesan dari lawan
                </p>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Win condition teaser */}
      {progress < 100 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center py-6"
        >
          <span className="icon icon--lg text-ink-muted mx-auto mb-2">redeem</span>
          <p className="font-body text-sm text-ink-muted">
            {threshold - totalPoints} poin lagi buat ngalahin aku dan dapet
            hadiah 🎁
          </p>
        </motion.div>
      )}
    </div>
  );
}
