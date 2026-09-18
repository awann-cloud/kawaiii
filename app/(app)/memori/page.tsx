"use client";

import { motion } from "framer-motion";

const mockMemories = [
  {
    id: "1",
    title: "Baca 2 buku bulan ini",
    date: "12 Sep 2026",
    note: "Buku pertama: Atomic Habits. Buku kedua: The Subtle Art. Dua-duanya bikin mikir.",
    category: "biru",
  },
  {
    id: "2",
    title: "Jalan kaki 30 menit setiap hari",
    date: "8 Sep 2026",
    note: "Ternyata jalan kaki pagi itu enak banget. Sekarang jadi kebiasaan.",
    category: "hijau",
  },
  {
    id: "3",
    title: "Selesaiin portfolio website",
    date: "1 Sep 2026",
    note: "Akhirnya punya portfolio sendiri! Bangga banget.",
    category: "merah",
  },
];

const catColor: Record<string, string> = {
  merah: "bg-uno-red",
  biru: "bg-uno-blue",
  hijau: "bg-uno-green",
  kuning: "bg-uno-yellow",
};

export default function MemoriPage() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-display font-black text-3xl text-ink mb-1">
          Memori 📸
        </h1>
        <p className="font-body text-ink-muted text-sm">
          Semua yang udah kamu lewati dan selesaiin.
        </p>
      </motion.div>

      {mockMemories.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <span className="icon icon--xl text-ink-muted/30 mx-auto mb-4">image</span>
          <p className="font-display font-bold text-lg text-ink mb-1">
            Belum ada memori
          </p>
          <p className="font-body text-sm text-ink-muted">
            Selesaiin kartu target kamu dan memori akan muncul di sini
          </p>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {mockMemories.map((mem, i) => (
            <motion.div
              key={mem.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-cream-dark"
            >
              {/* Color header */}
              <div className={`${catColor[mem.category]} h-2`} />
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="icon text-ink-muted" style={{ fontSize: '14px' }}>calendar_today</span>
                  <span className="font-body text-xs text-ink-muted">
                    {mem.date}
                  </span>
                </div>
                <h3 className="font-display font-bold text-base text-ink mb-2">
                  {mem.title}
                </h3>
                {mem.note && (
                  <p className="font-body text-sm text-ink-light leading-relaxed">
                    {mem.note}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
