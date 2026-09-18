"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

/* ===== Icon Component ===== */
function Icon({
  name,
  className = "",
  filled = false,
  size,
}: {
  name: string;
  className?: string;
  filled?: boolean;
  size?: "sm" | "lg" | "xl";
}) {
  const sizeClass = size ? `icon--${size}` : "";
  return (
    <span
      className={`icon ${filled ? "icon--filled" : ""} ${sizeClass} ${className}`}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}

/* ===== Animation Wrapper ===== */
function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ===== Doodle SVG ===== */
function Doodles({ variant = "light" }: { variant?: "light" | "dark" }) {
  const c = variant === "dark" ? "#fff" : "#1A1A1A";
  return (
    <div className="doodle-bg" aria-hidden="true">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={`d-${variant}`} x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
            <path d="M20 10L22 16H28L23 20L25 26L20 22L15 26L17 20L12 16H18Z" fill="none" stroke={c} strokeWidth="1.5"/>
            <circle cx="70" cy="30" r="8" fill="none" stroke={c} strokeWidth="1.5"/>
            <path d="M90 70L95 60L100 70L105 60L110 70" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M30 80C30 75 40 70 40 80C40 70 50 75 50 80C50 90 40 95 40 100C40 95 30 90 30 80Z" fill="none" stroke={c} strokeWidth="1.2"/>
            <circle cx="55" cy="65" r="2" fill={c}/><circle cx="15" cy="55" r="2" fill={c}/>
            <path d="M60 95V105M55 100H65" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#d-${variant})`}/>
      </svg>
    </div>
  );
}

/* ===== Floating Cards ===== */
function FloatingCards() {
  const cards = [
    { color: "bg-uno-red", label: "+2", r: -12, x: -40, y: 15 },
    { color: "bg-uno-blue", label: "+4", r: 8, x: 35, y: -10 },
    { color: "bg-uno-green", label: "+2", r: -5, x: -25, y: 55 },
    { color: "bg-uno-yellow", label: "+4", r: 15, x: 45, y: 50 },
  ];
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {cards.map((c, i) => (
        <motion.div
          key={i}
          className={`absolute w-14 h-20 ${c.color} rounded-xl shadow-lg flex items-center justify-center`}
          style={{ top: `${20 + c.y}%`, left: `${50 + c.x}%`, rotate: `${c.r}deg` }}
          animate={{ y: [0, -12, 0], rotate: [c.r, c.r + 3, c.r] }}
          transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
        >
          <span className={`font-display font-black text-base ${c.color === "bg-uno-yellow" ? "text-ink" : "text-white"}`}>
            {c.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

/* ===== Phone Mockup ===== */
function PhoneMockup() {
  return (
    <motion.div
      className="phone-mockup mx-auto"
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="phone-mockup__notch" />
      <div className="phone-mockup__screen flex flex-col">
        <div className="bg-cream p-4 flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="w-8 h-8 bg-ink rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-display font-bold">U</span>
            </div>
            <span className="font-display font-bold text-[10px] text-ink">Meja UNO</span>
            <div className="w-6 h-6 bg-cream-dark rounded-full" />
          </div>
          <div className="bg-block-purple rounded-2xl p-3 mb-3">
            <p className="text-white text-[8px] font-body opacity-80">Poin di Deck Aku</p>
            <p className="text-white font-display font-black text-2xl">+12</p>
            <div className="w-full bg-white/20 rounded-full h-2 mt-2">
              <div className="bg-white rounded-full h-2 w-[24%]" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="bg-white rounded-xl p-2 shadow-sm">
              <p className="text-[7px] text-ink-muted font-body">Target Aktif</p>
              <p className="font-display font-black text-lg text-ink">5</p>
            </div>
            <div className="bg-white rounded-xl p-2 shadow-sm">
              <p className="text-[7px] text-ink-muted font-body">Selesai</p>
              <p className="font-display font-black text-lg text-uno-green">3</p>
            </div>
          </div>
          <div className="flex gap-1.5 justify-center mt-auto mb-2">
            {["bg-uno-red","bg-uno-blue","bg-uno-green","bg-uno-yellow"].map((bg,i)=>(
              <div key={i} className={`w-9 h-13 ${bg} rounded-lg shadow-sm flex items-center justify-center`}>
                <span className={`${bg==="bg-uno-yellow"?"text-ink":"text-white"} text-[8px] font-bold`}>{i%2===0?"+2":"+4"}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ===== Countdown ===== */
function Countdown() {
  const now = new Date();
  const bd = new Date(now.getFullYear(), 8, 19);
  if (now > bd) bd.setFullYear(bd.getFullYear() + 1);
  const diff = bd.getTime() - now.getTime();
  const days = Math.max(0, Math.floor(diff / 86400000));
  const hrs = Math.max(0, Math.floor((diff % 86400000) / 3600000));

  if (days === 0) {
    return (
      <div className="text-center">
        <motion.p className="font-display font-black text-5xl md:text-7xl text-block-purple mb-2"
          animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}>
          🎂 HARI INI! 🎂
        </motion.p>
        <p className="font-body text-ink-muted text-lg">Selamat ulang tahun, Kak Wai!</p>
      </div>
    );
  }

  return (
    <div className="text-center">
      {days === 1 ? (
        <>
          <motion.p className="font-display font-black text-5xl md:text-7xl text-block-orange mb-2"
            animate={{ scale: [1, 1.03, 1] }} transition={{ duration: 2, repeat: Infinity }}>
            BESOK! 🎉
          </motion.p>
          <p className="font-body text-ink-muted text-lg">Tinggal {hrs} jam lagi…</p>
        </>
      ) : (
        <>
          <p className="font-display font-black text-6xl md:text-8xl text-ink mb-2">{days}</p>
          <p className="font-body text-ink-muted text-lg">hari menuju 19 September</p>
        </>
      )}
    </div>
  );
}

/* ============================================================ */
/*  LANDING PAGE                                                */
/* ============================================================ */

export default function LandingPage() {
  return (
    <main className="w-full">

      {/* ───── HERO ───── */}
      <section className="section-block section-block--cream relative min-h-screen flex flex-col items-center justify-center text-center" id="hero">
        <Doodles variant="light" />
        <FloatingCards />

        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <FadeIn>
            <div className="inline-flex items-center gap-2 badge bg-block-purple/10 text-block-purple mb-6">
              <Icon name="auto_awesome" size="sm" />
              <span>Kado Digital Buat Kamu</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-ink mb-6 leading-[0.95]">
              Deck kamu<br />
              <span className="text-block-purple">udah siap.</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="font-body text-lg sm:text-xl text-ink-muted max-w-md mx-auto mb-10 leading-relaxed">
              Tulis target kamu. Selesaiin satu per satu.<br />
              <strong className="text-ink">Aku yang bakal kalah.</strong>
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <Link href="/login" className="btn-primary">
              Buka Kartu Akses
              <Icon name="arrow_forward" size="sm" />
            </Link>
          </FadeIn>

          <FadeIn delay={0.5}>
            <div className="mt-14"><PhoneMockup /></div>
          </FadeIn>

          <motion.div className="mt-10" animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <Icon name="expand_more" className="text-ink-muted mx-auto" size="lg" />
          </motion.div>
        </div>
      </section>

      {/* ───── INI BUKAN TO-DO LIST ───── */}
      <section className="section-block section-block--purple" id="rules">
        <Doodles variant="dark" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <FadeIn>
            <div className="inline-flex items-center gap-2 badge bg-white/20 text-white mb-6">
              <Icon name="favorite" size="sm" />
              <span>Designed for Kak Wai</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white mb-6 leading-tight">
              Ini bukan to-do list.<br />
              Ini <span className="text-uno-yellow">deck kamu.</span>
            </h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="font-body text-lg text-white/80 mb-10 leading-relaxed max-w-lg">
              Setiap target yang kamu tulis jadi satu kartu UNO. Target ringan bernilai +2.
              Target besar bernilai +4. Selesaiin, dan kartunya pindah ke deck aku.
            </p>
          </FadeIn>

          <div className="space-y-6">
            <FadeIn delay={0.3}>
              <motion.div className="flex items-start gap-4" whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                <div className="bg-uno-green w-20 h-28 rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                  <span className="font-display font-black text-3xl text-white">+2</span>
                </div>
                <div>
                  <h4 className="font-display font-bold text-xl text-white mb-1">Target Ringan</h4>
                  <p className="font-body text-white/80 text-sm leading-relaxed">
                    Hal kecil yang bisa kamu capai dalam waktu dekat. Minum air cukup. Baca beberapa halaman. Jalan kaki sore.
                  </p>
                </div>
              </motion.div>
            </FadeIn>
            <FadeIn delay={0.4}>
              <motion.div className="flex items-start gap-4" whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                <div className="bg-uno-red w-20 h-28 rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                  <span className="font-display font-black text-3xl text-white">+4</span>
                </div>
                <div>
                  <h4 className="font-display font-bold text-xl text-white mb-1">Target Besar</h4>
                  <p className="font-body text-white/80 text-sm leading-relaxed">
                    Yang butuh tenaga dan waktu. Selesaiin satu kursus. Dapet sertifikasi. Capai target tabungan.
                  </p>
                </div>
              </motion.div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ───── CARA MENANG ───── */}
      <section className="section-block section-block--orange" id="how-to-win">
        <Doodles variant="dark" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <FadeIn>
            <div className="inline-flex items-center gap-2 badge bg-white/20 text-white mb-6">
              <Icon name="emoji_events" size="sm" />
              <span>Cara Menang</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white mb-6 leading-tight">
              Kamu menang.<br />
              <span className="text-uno-yellow">Aku kalah.</span>
            </h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="font-body text-lg text-white/80 mb-10 leading-relaxed max-w-lg">
              Setiap kartu yang kamu selesaiin, poinnya pindah ke deck aku. Kalau poin di deck aku udah nyampe 50… aku kalah. Dan kamu dapet hadiah.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <span className="font-display font-bold text-white text-sm">Deck Aku</span>
                <span className="font-display font-bold text-uno-yellow text-sm">12 / 50</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-4 mb-6">
                <motion.div className="bg-gradient-to-r from-uno-yellow to-uno-red rounded-full h-4"
                  initial={{ width: "0%" }} whileInView={{ width: "24%" }}
                  transition={{ duration: 1.5, ease: "easeOut" }} viewport={{ once: true }} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { icon: "edit_note", text: "Tulis target kamu" },
                  { icon: "bolt", text: "Selesaiin langkahnya" },
                  { icon: "celebration", text: "Teriak UNO! 🎉" },
                ].map((s, i) => (
                  <motion.div key={i} className="bg-white/10 rounded-2xl p-4 text-center" whileHover={{ scale: 1.05 }}>
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <Icon name={s.icon} className="text-white" size="sm" />
                    </div>
                    <p className="font-display font-bold text-white text-sm">{s.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="mt-8 flex items-start gap-3 bg-white/10 rounded-2xl p-5 border border-white/10">
              <span className="text-2xl">🤫</span>
              <p className="font-body text-sm text-white/80 leading-relaxed">
                <strong className="text-white">Spoiler:</strong> Aku emang pengen kalah. Setiap kartu plus di deck aku artinya kamu udah semakin dekat sama target kamu. Jadi… cepetan kalahin aku ya, Kak.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ───── KENAPA FORMAT INI ───── */}
      <section className="section-block section-block--teal" id="why">
        <Doodles variant="dark" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <FadeIn>
            <div className="inline-flex items-center gap-2 badge bg-white/20 text-white mb-6">
              <Icon name="star" size="sm" />
              <span>Dibuat Khusus</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white mb-6 leading-tight">
              Kenapa format ini<br />
              <span className="text-uno-yellow">cocok buat kamu?</span>
            </h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="font-body text-lg text-white/80 mb-10 leading-relaxed max-w-lg">
              Kamu suka struktur, detail, dan progres yang jelas. Tapi juga sering terlalu keras ke diri sendiri.
              UNO Deck ini dirancang biar kamu punya tempat yang rapi, tanpa tekanan, tanpa penalti.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: "target", title: "Terstruktur", desc: "Setiap kartu punya langkah-langkah kecil yang bisa kamu centang satu per satu." },
              { icon: "block", title: "Tanpa Penalti", desc: "Nggak ada hukuman kalau kamu butuh jeda. Pakai kartu Skip kapan aja." },
              { icon: "palette", title: "4 Warna, 4 Area", desc: "Merah buat karier. Biru buat self-growth. Hijau buat kesehatan. Kuning buat petualangan." },
              { icon: "mail", title: "Ada yang Nemenin", desc: "Di setiap kartu yang kamu selesaiin, aku bisa nulis pesan kecil buat kamu." },
            ].map((item, i) => (
              <FadeIn key={i} delay={0.3 + i * 0.1}>
                <motion.div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10" whileHover={{ scale: 1.03, y: -4 }}>
                  <div className="w-11 h-11 bg-white/15 rounded-xl flex items-center justify-center mb-3">
                    <Icon name={item.icon} className="text-white" />
                  </div>
                  <h4 className="font-display font-bold text-lg text-white mb-1">{item.title}</h4>
                  <p className="font-body text-sm text-white/70 leading-relaxed">{item.desc}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.7}>
            <div className="mt-10 text-center">
              <p className="font-display font-bold text-xl sm:text-2xl text-white/90 italic leading-relaxed">
                &ldquo;Di sini nggak ada omelan. Nggak ada deadline.<br />
                Yang ada cuma kartu kamu, dan aku yang siap kalah.&rdquo;
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ───── FAQ ───── */}
      <section className="section-block section-block--cream" id="faq">
        <div className="relative z-10 max-w-2xl mx-auto">
          <FadeIn>
            <h2 className="font-display font-black text-4xl sm:text-5xl text-ink mb-10 leading-tight">
              Pertanyaan yang<br />
              <span className="text-block-purple">mungkin kamu tanya.</span>
            </h2>
          </FadeIn>

          <div className="space-y-4">
            {[
              { q: "Apa itu +2 dan +4?", a: "Kayak di UNO. +2 buat target ringan. +4 buat target besar. Poinnya pindah ke deck aku kalau kamu selesaiin." },
              { q: "Kapan aku menang?", a: "Kalau total poin di deck aku udah nyampe 50. Itu artinya kamu udah nyelesaiin cukup banyak target, dan aku resmi kalah." },
              { q: "Boleh nggak nggak nyelesaiin target?", a: "Boleh banget. Pakai kartu Skip buat jeda. Di sini nggak ada yang maksa." },
              { q: "Kalau aku overthinking gimana?", a: "Mulai dari +2 aja. Yang kecil-kecil. Nanti pelan-pelan baru coba +4. Nggak ada yang buru-buru." },
              { q: "Kenapa cuma aku yang bisa masuk?", a: "Karena ini tempat kamu. Privat. Personal. Cuma buat kamu dan aku." },
            ].map((f, i) => (
              <FadeIn key={i} delay={0.1 + i * 0.08}>
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-cream-dark">
                  <h4 className="font-display font-bold text-base text-ink mb-2 flex items-center gap-2">
                    <span className="bg-block-purple text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shrink-0">?</span>
                    {f.q}
                  </h4>
                  <p className="font-body text-sm text-ink-muted leading-relaxed pl-8">{f.a}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ───── DUA PEMAIN ───── */}
      <section className="section-block section-block--black" id="players">
        <Doodles variant="dark" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <FadeIn>
            <h2 className="font-display font-black text-4xl sm:text-5xl text-white mb-3 leading-tight">
              Dua pemain<br />
              <span className="text-block-purple">di meja ini.</span>
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="font-body text-lg text-white/60 mb-10 max-w-md">
              Satu yang punya target. Satu lagi yang pengen kalah.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FadeIn delay={0.2}>
              <motion.div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/10" whileHover={{ scale: 1.03, rotate: -1 }} transition={{ type: "spring", stiffness: 300 }}>
                <div className="w-16 h-16 bg-block-purple rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-lg">👑</div>
                <h4 className="font-display font-bold text-xl text-white mb-1">Kak Wai</h4>
                <p className="font-body text-sm text-white/50 mb-3">Pemain Utama · ♍</p>
                <p className="font-body text-sm text-white/80 leading-relaxed">Yang nulis target, centang langkah, dan teriak UNO. Semua kartu ada di tangan kamu.</p>
              </motion.div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <motion.div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/10" whileHover={{ scale: 1.03, rotate: 1 }} transition={{ type: "spring", stiffness: 300 }}>
                <div className="w-16 h-16 bg-uno-red rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-lg">🃏</div>
                <h4 className="font-display font-bold text-xl text-white mb-1">Aku</h4>
                <p className="font-body text-sm text-white/50 mb-3">Lawan · Yang Pengen Kalah</p>
                <p className="font-body text-sm text-white/80 leading-relaxed">Yang nampung semua kartu plus kamu. Semakin banyak poin di deck aku, semakin kamu menang.</p>
              </motion.div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ───── FOOTER / COUNTDOWN ───── */}
      <section className="section-block section-block--cream text-center" id="footer">
        <div className="relative z-10 max-w-2xl mx-auto">
          <FadeIn><Countdown /></FadeIn>
          <FadeIn delay={0.2}>
            <div className="mt-10">
              <Link href="/login" className="btn-primary btn-primary--purple">
                Buka Kartu Akses
                <Icon name="arrow_forward" size="sm" />
              </Link>
            </div>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="mt-8 font-body text-sm text-ink-muted">Made with ❤️ for Kawaii</p>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
