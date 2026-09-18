"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isFlipping, setIsFlipping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Bypass auth if Supabase is not configured yet
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      setIsFlipping(true);
      setTimeout(() => {
        router.push("/meja");
      }, 1500);
      return;
    }

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError("Email atau password kamu salah, Kak.");
      setIsLoading(false);
      return;
    }

    setIsFlipping(true);
    setTimeout(() => {
      router.push("/meja");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-ink flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Scattered mini cards */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          { color: "bg-uno-red", top: "10%", left: "5%", rotate: -20, opacity: 0.15 },
          { color: "bg-uno-blue", top: "20%", right: "8%", rotate: 15, opacity: 0.12 },
          { color: "bg-uno-green", bottom: "15%", left: "10%", rotate: -10, opacity: 0.1 },
          { color: "bg-uno-yellow", bottom: "25%", right: "5%", rotate: 25, opacity: 0.15 },
          { color: "bg-block-purple", top: "50%", left: "3%", rotate: -30, opacity: 0.1 },
        ].map((c, i) => (
          <motion.div key={i} className={`absolute w-12 h-18 ${c.color} rounded-lg`}
            style={{ top: c.top, left: c.left, right: c.right, bottom: c.bottom, opacity: c.opacity, rotate: `${c.rotate}deg` }}
            animate={{ y: [0, -10, 0], rotate: [c.rotate, c.rotate + 5, c.rotate] }}
            transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut" }} />
        ))}
      </div>

      {/* Back */}
      <motion.div className="absolute top-6 left-6 z-10"
        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
        <Link href="/" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors font-body text-sm">
          <span className="icon icon--sm">arrow_back</span>
          Kembali
        </Link>
      </motion.div>

      {/* Card with perspective */}
      <div className="relative z-10" style={{ perspective: "1200px" }}>
        <motion.div className="relative"
          animate={{ rotateY: isFlipping ? 180 : 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] }}
          style={{ transformStyle: "preserve-3d" }}>

          {/* Front — Login */}
          <motion.div className="w-[340px] sm:w-[380px] rounded-[32px] overflow-hidden shadow-2xl"
            style={{ backfaceVisibility: "hidden" }}
            initial={{ opacity: 0, y: 40, rotate: -5 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] }}>

            <div className="bg-block-purple h-3" />
            <div className="bg-white p-8">
              <div className="text-center mb-8">
                <motion.div className="w-20 h-20 bg-block-purple rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
                  animate={{ rotate: [0, -3, 3, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                  <span className="font-display font-black text-2xl text-white">UNO</span>
                </motion.div>
                <h1 className="font-display font-black text-2xl text-ink mb-1">Masukkan kartu akses kamu</h1>
                <p className="font-body text-sm text-ink-muted">Cuma yang punya kartu yang bisa masuk</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <span className="icon icon--sm absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted">mail</span>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email kamu" id="login-email"
                    className="w-full pl-12 pr-4 py-4 bg-cream rounded-2xl font-body text-ink placeholder:text-ink-muted/50 outline-none focus:ring-2 focus:ring-block-purple/30 transition-all border-2 border-transparent focus:border-block-purple/20" />
                </div>

                <div className="relative">
                  <span className="icon icon--sm absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted">lock</span>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password kamu" id="login-password"
                    className="w-full pl-12 pr-4 py-4 bg-cream rounded-2xl font-body text-ink placeholder:text-ink-muted/50 outline-none focus:ring-2 focus:ring-block-purple/30 transition-all border-2 border-transparent focus:border-block-purple/20" />
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.div initial={{ opacity: 0, y: -10, height: 0 }} animate={{ opacity: 1, y: 0, height: "auto" }} exit={{ opacity: 0, y: -10, height: 0 }}
                      className="flex items-center gap-2 text-uno-red font-body text-sm bg-uno-red/10 rounded-xl px-4 py-3">
                      <span className="icon icon--sm">error</span>
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button type="submit" disabled={isLoading} id="login-submit"
                  className="w-full btn-primary btn-primary--purple disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: isLoading ? 1 : 1.02 }} whileTap={{ scale: isLoading ? 1 : 0.98 }}>
                  {isLoading ? (
                    <motion.div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
                  ) : "Masuk"}
                </motion.button>
              </form>

              <p className="text-center font-body text-xs text-ink-muted mt-6">
                Lupa password? Tanya yang bikin website ini 😉
              </p>
            </div>
            <div className="bg-block-purple h-3" />
          </motion.div>

          {/* Back — Success */}
          <div className="absolute inset-0 w-[340px] sm:w-[380px] rounded-[32px] overflow-hidden shadow-2xl bg-block-purple flex flex-col items-center justify-center"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
            <motion.div initial={{ scale: 0 }} animate={isFlipping ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }} className="text-center text-white p-8">
              <span className="text-6xl mb-4 block">🎴</span>
              <h2 className="font-display font-black text-3xl mb-2">Kartu diterima!</h2>
              <p className="font-body text-white/80">Masuk ke meja UNO kamu…</p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.p className="relative z-10 mt-10 font-body text-sm text-white/30"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
        UNO Deck · For Kawaii
      </motion.p>
    </div>
  );
}
