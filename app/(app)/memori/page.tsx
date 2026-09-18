"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";

const catColor: Record<string, string> = {
  merah: "bg-uno-red",
  biru: "bg-uno-blue",
  hijau: "bg-uno-green",
  kuning: "bg-uno-yellow",
};

export default function MemoriPage() {
  const [memories, setMemories] = useState<any[]>([]);
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
            title, category
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (data && !error) {
        setMemories(data);
      }
      setIsLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-display font-black text-3xl text-ink mb-1">
          Memori
        </h1>
        <p className="font-body text-ink-muted text-sm">
          Semua yang udah kamu lewati dan selesaiin.
        </p>
      </motion.div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <span className="icon icon--lg animate-spin text-block-purple">refresh</span>
        </div>
      ) : memories.length === 0 ? (
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
          {memories.map((mem, i) => (
            <motion.div
              key={mem.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-cream-dark"
            >
              {/* Color header */}
              <div className={`${catColor[mem.targets?.category || 'kuning']} h-2`} />
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="icon text-ink-muted" style={{ fontSize: '14px' }}>calendar_today</span>
                  <span className="font-body text-xs text-ink-muted">
                    {new Date(mem.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                </div>
                <h3 className="font-display font-bold text-base text-ink mb-2">
                  {mem.targets?.title}
                </h3>
                {mem.note && (
                  <div className="bg-cream p-3 rounded-xl">
                    <p className="font-body text-sm text-ink-light leading-relaxed italic">
                      "{mem.note}"
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
