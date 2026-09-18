"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

export default function ProfilPage() {
  const [soundOn, setSoundOn] = useState(true);
  const [notifOn, setNotifOn] = useState(true);

  // Countdown to next birthday
  const now = new Date();
  const birthday = new Date(now.getFullYear(), 8, 19);
  if (now > birthday) birthday.setFullYear(birthday.getFullYear() + 1);
  const diffDays = Math.max(
    0,
    Math.ceil((birthday.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  );

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-display font-black text-3xl text-ink mb-1">
          Kawaii
        </h1>
      </motion.div>

      {/* Profile card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-3xl p-6 shadow-sm border border-cream-dark text-center"
      >
        <motion.div
          className="w-20 h-20 bg-block-purple rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg text-3xl"
          animate={{ rotate: [0, -3, 3, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          👑
        </motion.div>
        <h2 className="font-display font-bold text-xl text-ink">Duwai</h2>
        <p className="font-body text-sm text-ink-muted">
          Virgo · 19 September 2004
        </p>

        {/* Countdown */}
        <div className="mt-4 bg-cream rounded-2xl p-4">
          <p className="font-body text-xs text-ink-muted mb-1">
            Countdown Ulang Tahun
          </p>
          <motion.p
            className="font-display font-black text-3xl text-block-purple"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {diffDays === 0 ? "🎂 HARI INI!" : `${diffDays} hari`}
          </motion.p>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl p-5 shadow-sm border border-cream-dark"
      >
        <h3 className="font-display font-bold text-lg text-ink mb-4">
          Statistik Total
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Kartu Dibuat", value: "8" },
            { label: "Kartu Selesai", value: "3" },
            { label: "Total Poin", value: "+8" },
            { label: "Streak Terbaik", value: "2w" },
          ].map((stat, i) => (
            <div key={i} className="bg-cream rounded-xl p-3 text-center">
              <p className="font-display font-black text-xl text-ink">
                {stat.value}
              </p>
              <p className="font-body text-xs text-ink-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl p-5 shadow-sm border border-cream-dark"
      >
        <h3 className="font-display font-bold text-lg text-ink mb-4">
          Pengaturan
        </h3>
        <div className="space-y-3">
          <button
            onClick={() => setSoundOn(!soundOn)}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-cream hover:bg-cream-dark transition-colors"
          >
            <div className="flex items-center gap-3">
              {soundOn ? (
                <span className="icon icon--sm text-block-purple">volume_up</span>
              ) : (
                <span className="icon icon--sm text-ink-muted">volume_off</span>
              )}
              <span className="font-body text-sm text-ink">Suara</span>
            </div>
            <div
              className={`w-10 h-6 rounded-full transition-colors ${
                soundOn ? "bg-block-purple" : "bg-ink-muted/30"
              } flex items-center p-0.5`}
            >
              <motion.div
                className="w-5 h-5 bg-white rounded-full shadow-sm"
                animate={{ x: soundOn ? 16 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </div>
          </button>

          <button
            onClick={() => setNotifOn(!notifOn)}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-cream hover:bg-cream-dark transition-colors"
          >
            <div className="flex items-center gap-3">
              {notifOn ? (
                <span className="icon icon--sm text-block-purple">notifications</span>
              ) : (
                <span className="icon icon--sm text-ink-muted">notifications_off</span>
              )}
              <span className="font-body text-sm text-ink">Notifikasi</span>
            </div>
            <div
              className={`w-10 h-6 rounded-full transition-colors ${
                notifOn ? "bg-block-purple" : "bg-ink-muted/30"
              } flex items-center p-0.5`}
            >
              <motion.div
                className="w-5 h-5 bg-white rounded-full shadow-sm"
                animate={{ x: notifOn ? 16 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </div>
          </button>
        </div>
      </motion.div>

      {/* Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-2"
      >
        <Link
          href="/virgo"
          className="block bg-white rounded-2xl p-4 shadow-sm border border-cream-dark hover:bg-cream transition-colors"
        >
          <span className="font-display font-bold text-sm text-ink">
            Halaman Virgo
          </span>
        </Link>
        <Link
          href="/faq"
          className="block bg-white rounded-2xl p-4 shadow-sm border border-cream-dark hover:bg-cream transition-colors"
        >
          <span className="font-display font-bold text-sm text-ink">
            ❓ FAQ
          </span>
        </Link>
        <Link
          href="/deck-lawanku"
          className="block bg-white rounded-2xl p-4 shadow-sm border border-cream-dark hover:bg-cream transition-colors"
        >
          <span className="font-display font-bold text-sm text-ink">
            🃏 Deck Lawan
          </span>
        </Link>
      </motion.div>

      {/* Logout */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="pb-8"
      >
        <button className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl border-2 border-uno-red/20 text-uno-red font-display font-bold text-sm hover:bg-uno-red/5 transition-colors">
          <span className="icon text-uno-red" style={{ fontSize: '16px' }}>logout</span>
          Keluar
        </button>
      </motion.div>
    </div>
  );
}
