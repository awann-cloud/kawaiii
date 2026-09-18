"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function DeckLawankuPage() {
  const threshold = 50;
  const [transfers, setTransfers] = useState<any[]>([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('transfers')
        .select(`
          id,
          note,
          created_at,
          targets (
            id, title, category, weight
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (data && !error) {
        setTransfers(data);
        const pts = data.reduce((sum, t) => {
          const target: any = t.targets;
          const w = Array.isArray(target) ? target[0]?.weight : target?.weight;
          return sum + (w || 0);
        }, 0);
        setTotalPoints(pts);
      }
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const pct = Math.min((totalPoints / threshold) * 100, 100);

  return (
    <div className="space-y-6">
      {/* Back */}
      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
        <Link
          href="/profil"
          className="inline-flex items-center gap-2 text-ink-muted hover:text-ink transition-colors font-body text-sm"
        >
          <span className="icon icon--sm">arrow_back</span>
          Kembali
        </Link>
      </motion.div>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display font-black text-3xl text-ink mb-1">
          Deck Lawan
        </h1>
        <p className="font-body text-ink-muted text-sm">
          Semua kartu plus yang udah kamu kirim ke aku.
        </p>
      </motion.div>

      {/* The big red block */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-uno-red rounded-3xl p-6 text-center shadow-lg relative overflow-hidden"
      >
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full" />
        <div className="relative z-10">
          <p className="font-body text-white/80 text-sm mb-2">Total Poin Kekalahan</p>
          <p className="font-display font-black text-7xl text-white mb-6">
            {totalPoints}
          </p>
          
          <div className="w-full bg-black/20 rounded-full h-4 mb-2 p-1">
            <motion.div
              className="bg-white rounded-full h-full"
              initial={{ width: "0%" }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>
          <p className="font-body text-xs text-white/60">
            {totalPoints} / {threshold} menuju kekalahan aku
          </p>
        </div>
      </motion.div>

      {/* Transfers List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-3xl p-6 shadow-sm border border-cream-dark"
      >
        <h3 className="font-display font-bold text-lg text-ink mb-5">
          Riwayat Transfer
        </h3>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <span className="icon icon--lg animate-spin text-uno-red">refresh</span>
          </div>
        ) : (
          <div className="space-y-4">
            {transfers.length > 0 ? (
              transfers.map((t, i) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-cream border border-cream-dark"
                >
                  <div className="w-12 h-16 bg-uno-red rounded-lg shadow-sm flex items-center justify-center shrink-0">
                    <span className="font-display font-black text-white text-lg">
                      +{(Array.isArray(t.targets) ? (t.targets as any[])[0]?.weight : (t.targets as any)?.weight)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-ink mb-1">
                      {Array.isArray(t.targets) ? (t.targets as any[])[0]?.title : (t.targets as any)?.title}
                    </h4>
                    <p className="font-body text-xs text-ink-muted mb-2">
                      {new Date(t.created_at).toLocaleDateString('id-ID')}
                    </p>
                    {t.note && (
                      <div className="bg-white rounded-xl p-3 border border-cream-dark relative">
                        <div className="absolute -top-2 left-4 w-4 h-4 bg-white border-l border-t border-cream-dark rotate-45" />
                        <p className="font-body text-sm text-ink relative z-10 italic">
                          "{t.note}"
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="font-body text-sm text-ink-muted">
                  Belum ada kartu yang kamu pindahin.
                </p>
              </div>
            )}
          </div>
        )}

        {totalPoints >= threshold && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 bg-uno-yellow rounded-2xl p-6 text-center shadow-md"
          >
            <span className="icon icon--lg text-ink mb-2">emoji_events</span>
            <h3 className="font-display font-black text-xl text-ink mb-1">
              Aku Kalah!
            </h3>
            <p className="font-body text-sm text-ink/80">
              Kamu berhasil ngumpulin 50 poin. Hadiah kamu udah siap.
            </p>
            <button className="mt-4 btn-primary btn-primary--dark w-full">
              Klaim Hadiah
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
