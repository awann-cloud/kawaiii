"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const traits = [
  {
    emoji: "🔍",
    title: "Teliti",
    desc: "Kamu nggak suka yang asal-asalan. Detail itu penting buat kamu.",
  },
  {
    emoji: "📐",
    title: "Suka Struktur",
    desc: "Kamu lebih nyaman kalau ada langkah-langkah yang jelas.",
  },
  {
    emoji: "💪",
    title: "Perfeksionis",
    desc: "Kamu selalu pengen kasih yang terbaik. Tapi kadang ini bikin capek sendiri.",
  },
  {
    emoji: "🧠",
    title: "Analitis",
    desc: "Kamu mikir sebelum bertindak. Nggak suka asal lompat.",
  },
  {
    emoji: "💛",
    title: "Tulus",
    desc: "Kalau kamu sayang, kamu sayang beneran. Wholehearted.",
  },
  {
    emoji: "⚡",
    title: "Keras ke Diri Sendiri",
    desc: "Kamu sering terlalu strict sama diri sendiri. Padahal kamu udah bagus.",
  },
];

export default function VirgoPage() {
  return (
    <div className="space-y-6">
      {/* Back */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Link
          href="/profil"
          className="inline-flex items-center gap-2 text-ink-muted hover:text-ink transition-colors font-body text-sm"
        >
          <span className="icon icon--sm">arrow_back</span>
          Kembali
        </Link>
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <motion.span
          className="text-6xl block mb-4"
          animate={{ rotate: [0, -5, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          ✨
        </motion.span>
        <h1 className="font-display font-black text-4xl text-ink mb-2">
          Kamu itu Virgo.
        </h1>
        <p className="font-body text-ink-muted max-w-sm mx-auto">
          Dan ini bukan ramalan. Ini cara aku ngerti kamu.
        </p>
      </motion.div>

      {/* Traits */}
      <div className="space-y-3">
        {traits.map((trait, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="bg-white rounded-2xl p-5 shadow-sm border border-cream-dark"
          >
            <div className="flex items-start gap-4">
              <span className="text-2xl">{trait.emoji}</span>
              <div>
                <h3 className="font-display font-bold text-base text-ink mb-1">
                  {trait.title}
                </h3>
                <p className="font-body text-sm text-ink-muted leading-relaxed">
                  {trait.desc}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* How to play section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-block-purple rounded-3xl p-6 text-white"
      >
        <h2 className="font-display font-black text-2xl mb-4">
          Cara Main Kamu 🃏
        </h2>
        <div className="space-y-4">
          {[
            {
              icon: "🛑",
              text: "Nggak ada penalti. Nggak ada yang marahin kamu kalau kamu skip.",
            },
            {
              icon: "🔄",
              text: "Kalau target berubah arah, pakai kartu Reverse. Normal.",
            },
            {
              icon: "⏸️",
              text: "Butuh jeda? Pakai kartu Skip. Istirahat itu penting.",
            },
            {
              icon: "🌈",
              text: "Kartu Wild buat mimpi yang belum jelas caranya. Tulis aja dulu.",
            },
            {
              icon: "❤️",
              text: "Kamu nggak sendirian. Ada aku di deck seberang yang nunggu kamu menang.",
            },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-xl shrink-0">{item.icon}</span>
              <p className="font-body text-sm text-white/80 leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Closing */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center py-6"
      >
        <p className="font-display font-bold text-xl text-ink italic">
          &ldquo;Kamu nggak perlu sempurna.
          <br />
          Kamu cuma perlu mulai.&rdquo;
        </p>
      </motion.div>
    </div>
  );
}
