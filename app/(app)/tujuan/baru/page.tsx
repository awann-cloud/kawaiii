"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const categories = [
  { value: "merah", label: "Karier", color: "bg-uno-red", textColor: "text-white" },
  { value: "biru", label: "Growth", color: "bg-uno-blue", textColor: "text-white" },
  { value: "hijau", label: "Kesehatan", color: "bg-uno-green", textColor: "text-white" },
  { value: "kuning", label: "Petualangan", color: "bg-uno-yellow", textColor: "text-ink" },
];

const weights = [
  {
    value: 2,
    label: "+2",
    desc: "Ini ringan, bisa dicapai dalam waktu dekat.",
  },
  {
    value: 4,
    label: "+4",
    desc: "Ini besar, butuh tenaga dan waktu.",
  },
];

export default function BaruPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [weight, setWeight] = useState<number | null>(null);
  const [steps, setSteps] = useState<string[]>([""]);
  const [showPreview, setShowPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addStep = () => setSteps([...steps, ""]);
  const removeStep = (index: number) =>
    setSteps(steps.filter((_, i) => i !== index));
  const updateStep = (index: number, value: string) =>
    setSteps(steps.map((s, i) => (i === index ? value : s)));

  const selectedCategory = categories.find((c) => c.value === category);
  const isValid =
    title.trim() &&
    category &&
    weight !== null &&
    steps.some((s) => s.trim());

  const handleSubmit = async () => {
    if (!isValid || isSubmitting) return;
    setIsSubmitting(true);

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      alert("Sesi kamu udah habis, login lagi ya.");
      router.push("/login");
      return;
    }

    // Insert target
    const { data: targetData, error: targetError } = await supabase
      .from('targets')
      .insert({
        user_id: user.id,
        title: title.trim(),
        description: description.trim() || null,
        category,
        weight,
        status: 'aktif'
      })
      .select()
      .single();

    if (targetError || !targetData) {
      console.error(targetError);
      alert("Gagal bikin kartu target.");
      setIsSubmitting(false);
      return;
    }

    // Insert steps
    const validSteps = steps.filter(s => s.trim() !== "");
    const stepsToInsert = validSteps.map((s, idx) => ({
      target_id: targetData.id,
      title: s.trim(),
      order_index: idx
    }));

    if (stepsToInsert.length > 0) {
      const { error: stepsError } = await supabase
        .from('steps')
        .insert(stepsToInsert);

      if (stepsError) {
        console.error(stepsError);
        alert("Target berhasil dibuat, tapi langkahnya gagal disimpan.");
      }
    }

    setIsSubmitting(false);
    setShowPreview(true);
  };

  return (
    <div className="space-y-6">
      {/* Back */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Link
          href="/tujuan"
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
      >
        <h1 className="font-display font-black text-3xl text-ink mb-1">
          Kartu Baru
        </h1>
        <p className="font-body text-ink-muted text-sm">
          Tulis target kamu dan pecah jadi langkah-langkah kecil.
        </p>
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <label className="font-display font-bold text-sm text-ink block mb-2">
          Judul Target
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Contoh: Lari 5K pertama"
          className="w-full px-4 py-4 bg-white rounded-2xl font-body text-ink placeholder:text-ink-muted/50 outline-none focus:ring-2 focus:ring-block-purple/20 border border-cream-dark shadow-sm"
          id="input-title"
          disabled={isSubmitting}
        />
      </motion.div>

      {/* Description */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <label className="font-display font-bold text-sm text-ink block mb-2">
          Deskripsi{" "}
          <span className="font-body text-ink-muted font-normal">
            (opsional)
          </span>
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Cerita singkat tentang target ini..."
          className="w-full px-4 py-4 bg-white rounded-2xl font-body text-ink placeholder:text-ink-muted/50 outline-none focus:ring-2 focus:ring-block-purple/20 border border-cream-dark shadow-sm resize-none h-20"
          id="input-desc"
          disabled={isSubmitting}
        />
      </motion.div>

      {/* Category */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <label className="font-display font-bold text-sm text-ink block mb-3">
          Warna Kategori
        </label>
        <div className="grid grid-cols-2 gap-3">
          {categories.map((cat) => (
            <motion.button
              key={cat.value}
              disabled={isSubmitting}
              onClick={() => setCategory(cat.value)}
              className={`p-4 rounded-2xl border-2 transition-all text-left flex items-center gap-3 ${
                category === cat.value
                  ? `${cat.color} ${cat.textColor} border-transparent shadow-md`
                  : "bg-white text-ink border-cream-dark hover:border-ink/10"
              }`}
              whileTap={{ scale: 0.97 }}
            >
              <div className={`w-4 h-4 rounded-full ${category === cat.value ? 'bg-white/40' : cat.color}`} />
              <span className="font-display font-bold text-sm">
                {cat.label}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Weight */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        <label className="font-display font-bold text-sm text-ink block mb-3">
          Bobot Kartu
        </label>
        <div className="grid grid-cols-2 gap-3">
          {weights.map((w) => (
            <motion.button
              key={w.value}
              disabled={isSubmitting}
              onClick={() => setWeight(w.value)}
              className={`p-4 rounded-2xl border-2 transition-all text-left ${
                weight === w.value
                  ? "bg-block-purple text-white border-transparent shadow-md"
                  : "bg-white text-ink border-cream-dark hover:border-ink/10"
              }`}
              whileTap={{ scale: 0.97 }}
            >
              <span
                className={`font-display font-black text-2xl block mb-1 ${
                  weight === w.value ? "text-white" : "text-block-purple"
                }`}
              >
                {w.label}
              </span>
              <span
                className={`font-body text-xs ${
                  weight === w.value ? "text-white/70" : "text-ink-muted"
                }`}
              >
                {w.desc}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Steps */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <label className="font-display font-bold text-sm text-ink block mb-3">
          Langkah-langkah
        </label>
        <div className="space-y-2">
          <AnimatePresence>
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-2"
              >
                <span className="font-display font-bold text-xs text-ink-muted w-6 text-center shrink-0">
                  {i + 1}
                </span>
                <input
                  type="text"
                  value={step}
                  disabled={isSubmitting}
                  onChange={(e) => updateStep(i, e.target.value)}
                  placeholder={`Langkah ${i + 1}...`}
                  className="flex-1 px-4 py-3 bg-white rounded-xl font-body text-sm text-ink placeholder:text-ink-muted/50 outline-none focus:ring-2 focus:ring-block-purple/20 border border-cream-dark disabled:bg-cream"
                />
                {steps.length > 1 && (
                  <button
                    onClick={() => removeStep(i)}
                    disabled={isSubmitting}
                    className="w-8 h-8 flex items-center justify-center text-ink-muted hover:text-uno-red transition-colors shrink-0 disabled:opacity-50"
                  >
                    <span className="icon icon--sm">close</span>
                  </button>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          <motion.button
            onClick={addStep}
            disabled={isSubmitting}
            className="flex items-center gap-2 text-block-purple font-body text-sm hover:underline py-2 disabled:opacity-50"
            whileTap={{ scale: 0.97 }}
          >
            <span className="icon icon--sm">add</span>
            Tambah langkah
          </motion.button>
        </div>
      </motion.div>

      {/* Submit */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="pb-8"
      >
        <motion.button
          onClick={handleSubmit}
          disabled={!isValid || isSubmitting}
          className={`w-full btn-primary btn-primary--purple flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed ${
            isValid ? "" : "pointer-events-none"
          }`}
          whileHover={isValid && !isSubmitting ? { scale: 1.02 } : {}}
          whileTap={isValid && !isSubmitting ? { scale: 0.98 } : {}}
          id="btn-create-card"
        >
          {isSubmitting ? (
            <span className="icon icon--sm animate-spin">refresh</span>
          ) : (
            <span className="icon icon--sm">auto_awesome</span>
          )}
          {isSubmitting ? "Menyimpan..." : "Buat Kartu"}
        </motion.button>
      </motion.div>

      {/* Preview overlay */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.8, y: 40, rotate: -5 }}
              animate={{ scale: 1, y: 0, rotate: 0 }}
              exit={{ scale: 0.8, y: 40 }}
              transition={{ type: "spring", stiffness: 200 }}
              className={`w-full max-w-sm ${selectedCategory?.color || "bg-block-purple"} rounded-3xl p-8 text-center shadow-2xl relative overflow-hidden`}
            >
              <div className="absolute top-4 right-4 text-white/20">
                <span className="icon icon--xl">style</span>
              </div>
              <h2
                className={`font-display font-black text-2xl ${
                  category === "kuning" ? "text-ink" : "text-white"
                } mb-2 relative z-10`}
              >
                Kartu dibuat!
              </h2>
              <p
                className={`font-body text-sm ${
                  category === "kuning" ? "text-ink/70" : "text-white/70"
                } mb-2 relative z-10`}
              >
                {title}
              </p>
              <p
                className={`font-display font-black text-4xl ${
                  category === "kuning" ? "text-ink" : "text-white"
                } mb-6 relative z-10`}
              >
                +{weight}
              </p>
              <Link href="/tujuan" className="relative z-10 block">
                <motion.button
                  className="w-full bg-white text-ink rounded-xl py-3 font-display font-bold text-sm shadow-sm hover:bg-cream transition-colors"
                  whileTap={{ scale: 0.95 }}
                >
                  Lihat Semua Kartu
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
