"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const faqs = [
  {
    q: "Apa itu +2 dan +4?",
    a: "Kayak di UNO. +2 buat target ringan yang bisa dicapai cepet. +4 buat target besar yang butuh waktu dan tenaga. Poinnya pindah ke deck lawan (aku) kalau Kawaii selesaiin.",
  },
  {
    q: "Kapan Kawaii menang?",
    a: "Kalau total poin di deck lawan udah nyampe 50. Itu artinya Kawaii udah nyelesaiin cukup banyak target, dan aku resmi kalah. Kawaii dapet hadiah.",
  },
  {
    q: "Boleh nggak nggak nyelesaiin target?",
    a: "Boleh banget. Ini tempat Kawaii, bukan penjara. Pakai kartu Skip buat jeda, atau Reverse kalau arahnya berubah. Di sini nggak ada yang maksa.",
  },
  {
    q: "Kalau Kawaii overthinking gimana?",
    a: "Mulai dari +2 aja. Yang kecil-kecil. Nanti pelan-pelan, kalau udah nyaman, baru coba +4. Nggak ada yang buru-buru di sini.",
  },
  {
    q: "Kenapa cuma Kawaii yang bisa masuk?",
    a: "Karena ini tempat Kawaii. Privat. Personal. Cuma buat Kawaii dan aku. Nggak ada orang lain yang bisa lihat target Kawaii.",
  },
  {
    q: "Siapa lawan Kawaii?",
    a: "Aku. Yang bikin website ini. Aku emang pengen kalah. Setiap kartu plus di deck aku artinya Kawaii semakin dekat sama target Kawaii.",
  },
  {
    q: "Apa itu kartu Skip, Reverse, Wild?",
    a: "Skip buat jeda. Reverse buat ubah arah target. Wild buat mimpi yang belum jelas caranya. Draw buat target yang butuh bantuan aku.",
  },
  {
    q: "Data Kawaii aman?",
    a: "Aman. Cuma Kawaii dan aku yang bisa akses. Nggak ada pihak ketiga. Nggak ada tracking. Ini cuma buat kita berdua.",
  },
];

export default function FaqPage() {
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-display font-black text-3xl text-ink mb-1">
          FAQ ❓
        </h1>
        <p className="font-body text-ink-muted text-sm">
          Pertanyaan yang (mungkin) ada di kepala Kawaii.
        </p>
      </motion.div>

      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
            className="bg-white rounded-2xl p-5 shadow-sm border border-cream-dark"
          >
            <h3 className="font-display font-bold text-base text-ink mb-2 flex items-start gap-2">
              <span className="bg-block-purple text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shrink-0 mt-0.5">
                ?
              </span>
              {faq.q}
            </h3>
            <p className="font-body text-sm text-ink-muted leading-relaxed pl-8">
              {faq.a}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
