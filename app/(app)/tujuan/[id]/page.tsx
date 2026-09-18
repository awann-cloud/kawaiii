"use client";

import { useState, useEffect, use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const catMeta: Record<string,{ bg:string; bgL:string; text:string; label:string }> = {
  merah: { bg:"bg-uno-red", bgL:"bg-uno-red/10", text:"text-uno-red", label:"Karier" },
  biru: { bg:"bg-uno-blue", bgL:"bg-uno-blue/10", text:"text-uno-blue", label:"Growth" },
  hijau: { bg:"bg-uno-green", bgL:"bg-uno-green/10", text:"text-uno-green", label:"Kesehatan" },
  kuning: { bg:"bg-uno-yellow", bgL:"bg-uno-yellow/10", text:"text-uno-yellow", label:"Petualangan" },
};

export default function CardDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  
  const [card, setCard] = useState<any>(null);
  const [steps, setSteps] = useState<any[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showUno, setShowUno] = useState(false);
  const [unoPressed, setUnoPressed] = useState(false);
  const [note, setNote] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient();
      const { data: target, error } = await supabase
        .from('targets')
        .select(`*, steps(*)`)
        .eq('id', id)
        .single();

      if (target && !error) {
        setCard(target);
        // Sort steps by order_index
        const sortedSteps = (target.steps || []).sort((a:any, b:any) => a.order_index - b.order_index);
        setSteps(sortedSteps);
        if (target.status === 'selesai') {
          setUnoPressed(true);
        } else {
          // Check if all steps are done initially
          if (sortedSteps.length > 0 && sortedSteps.every((s:any) => s.is_done)) {
            setShowUno(true);
          }
        }
      }
      setIsLoading(false);
    }
    fetchData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="icon icon--lg animate-spin text-block-purple">refresh</span>
      </div>
    );
  }

  if (!card) {
    return (
      <div className="text-center py-12">
        <p className="font-display font-bold text-lg text-ink">Kartu tidak ditemukan.</p>
        <Link href="/tujuan" className="text-block-purple text-sm mt-2 block hover:underline">Kembali ke Daftar Target</Link>
      </div>
    );
  }

  const m = catMeta[card.category] || catMeta.kuning;
  const done = steps.filter(s=>s.is_done).length;
  const total = steps.length;
  const pct = total > 0 ? (done/total)*100 : 0;

  const toggle = async (sid: string) => {
    if (unoPressed) return;

    const step = steps.find(s => s.id === sid);
    if (!step) return;

    const newStatus = !step.is_done;
    
    // Update local state optimistically
    const next = steps.map(s => s.id === sid ? {...s, is_done: newStatus} : s);
    setSteps(next);
    
    if (next.every(s => s.is_done)) {
      setShowUno(true);
    } else {
      setShowUno(false);
    }

    // Update Supabase
    const supabase = createClient();
    await supabase.from('steps').update({ is_done: newStatus }).eq('id', sid);
  };

  const handleUno = async () => {
    const supabase = createClient();
    
    // 1. Update target status to selesai
    await supabase.from('targets').update({ 
      status: 'selesai',
      completed_at: new Date().toISOString()
    }).eq('id', card.id);

    // 2. Insert into transfers
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase.from('transfers').insert({
        target_id: card.id,
        user_id: user.id,
        note: null // Will be updated later if user writes a note
      });
    }

    setUnoPressed(true); 
    setShowConfetti(true); 
    setShowUno(false);
    setTimeout(() => setShowConfetti(false), 4000);
  };

  const handleSaveNote = async () => {
    if (!note.trim()) return;
    const supabase = createClient();
    await supabase.from('transfers').update({ note: note.trim() }).eq('target_id', card.id);
    alert("Catatan berhasil disimpan!");
    router.push("/tujuan");
  };

  return (
    <div className="space-y-6 relative">
      {/* Confetti */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 backdrop-blur-sm">
            {Array.from({length:30}).map((_,i)=>(
              <motion.div key={i}
                className={`absolute w-3 h-3 rounded-sm ${["bg-uno-red","bg-uno-blue","bg-uno-green","bg-uno-yellow","bg-block-purple"][i%5]}`}
                initial={{ x:0, y:0, scale:0, rotate:0 }}
                animate={{ x:(Math.random()-0.5)*400, y:(Math.random()-0.5)*600, scale:[0,1,0.5], rotate:Math.random()*720 }}
                transition={{ duration:2+Math.random(), delay:Math.random()*0.3, ease:"easeOut" }} />
            ))}
            <motion.div initial={{ scale:0, rotate:-10 }} animate={{ scale:1, rotate:0 }}
              transition={{ type:"spring", stiffness:200, delay:0.3 }} className="text-center z-10">
              <motion.p className="font-display font-black text-7xl sm:text-8xl text-white mb-4"
                animate={{ scale:[1,1.1,1] }} transition={{ duration:0.5, repeat:3 }}>UNO!</motion.p>
              <p className="font-body text-xl text-white/80 mb-2">Kartu +{card.weight} pindah ke deck aku!</p>
              <p className="font-body text-sm text-white/50">Kamu luar biasa, Kak. Satu langkah lebih dekat buat ngalahin aku.</p>
              <motion.button className="mt-6 btn-primary btn-primary--light" onClick={()=>setShowConfetti(false)}
                initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:1.5 }}>Lanjut</motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back */}
      <motion.div initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }}>
        <Link href="/tujuan" className="inline-flex items-center gap-2 text-ink-muted hover:text-ink transition-colors font-body text-sm">
          <span className="icon icon--sm">arrow_back</span> Kembali
        </Link>
      </motion.div>

      {/* Header */}
      <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
        className={`${m.bg} rounded-3xl p-6 text-white relative overflow-hidden`}>
        <div className="absolute -top-8 -right-8 w-24 h-24 bg-white/10 rounded-full" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="badge bg-white/20 text-white text-xs">{m.label}</span>
            <span className="badge bg-white/20 text-white text-xs">+{card.weight}</span>
            {unoPressed && <span className="badge bg-white text-uno-green text-xs">✓ Selesai!</span>}
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl leading-tight">{card.title}</h1>
          {card.description && <p className="font-body text-sm text-white/70 mt-2 leading-relaxed">{card.description}</p>}
        </div>
      </motion.div>

      {/* Progress */}
      <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }}
        className="bg-white rounded-2xl p-5 shadow-sm border border-cream-dark">
        <div className="flex items-center justify-between mb-2">
          <span className="font-display font-bold text-sm text-ink">Progres</span>
          <span className={`font-display font-bold text-sm ${m.text}`}>{done}/{total}</span>
        </div>
        <div className="w-full bg-cream rounded-full h-3">
          <motion.div className={`${m.bg} rounded-full h-3`}
            initial={{ width:"0%" }} animate={{ width:`${pct}%` }} transition={{ duration:0.8 }} />
        </div>
        <p className="font-body text-xs text-ink-muted mt-2">
          {done === total || unoPressed ? "Semua langkah selesai!" : `${total-done} langkah lagi`}
        </p>
      </motion.div>

      {/* Steps */}
      <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}
        className="bg-white rounded-2xl p-5 shadow-sm border border-cream-dark">
        <h3 className="font-display font-bold text-lg text-ink mb-4">Langkah-langkah</h3>
        <div className="space-y-2">
          {steps.map((step,i)=>(
            <motion.button key={step.id} onClick={()=>toggle(step.id)} disabled={unoPressed}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left disabled:cursor-not-allowed ${
                step.is_done ? `${m.bgL} ${m.text}` : "bg-cream hover:bg-cream-dark text-ink"}`}
              initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }}
              transition={{ delay:0.3+i*0.05 }} whileTap={!unoPressed ? { scale:0.98 } : {}}>
              <span className={`icon icon--sm ${step.is_done ? m.text : "text-ink-muted"}`}>
                {step.is_done ? "check_circle" : "radio_button_unchecked"}
              </span>
              <span className={`font-body text-sm ${step.is_done?"line-through opacity-70":""}`}>{step.title}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* UNO Button */}
      <AnimatePresence>
        {showUno && !unoPressed && (
          <motion.div initial={{ opacity:0, y:40, scale:0.8 }} animate={{ opacity:1, y:0, scale:1 }} exit={{ opacity:0, y:40, scale:0.8 }}
            className="fixed bottom-28 left-0 right-0 flex justify-center z-40">
            <motion.button onClick={handleUno} id="btn-uno"
              className="bg-uno-red text-white font-display font-black text-3xl px-12 py-5 rounded-full shadow-2xl"
              animate={{ scale:[1,1.05,1], boxShadow:["0 0 0 0 rgba(229,57,53,0.4)","0 0 0 20px rgba(229,57,53,0)","0 0 0 0 rgba(229,57,53,0.4)"] }}
              transition={{ duration:1.5, repeat:Infinity }} whileTap={{ scale:0.9 }}>
              <span className="icon mr-2" style={{ fontSize:"28px" }}>auto_awesome</span>
              UNO!
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Note after completion */}
      {unoPressed && (
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
          className="bg-white rounded-2xl p-5 shadow-sm border border-cream-dark">
          <div className="flex items-center gap-2 mb-3">
            <span className="icon icon--sm text-block-purple">chat</span>
            <h3 className="font-display font-bold text-lg text-ink">Catatan untuk aku</h3>
          </div>
          <textarea 
            placeholder="Apa yang pengen kamu sampaikan ke aku? (opsional)" 
            id="note-textarea"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full p-4 bg-cream rounded-xl font-body text-sm text-ink placeholder:text-ink-muted/50 outline-none focus:ring-2 focus:ring-block-purple/20 resize-none h-24 border-2 border-transparent focus:border-block-purple/20" 
          />
          <button onClick={handleSaveNote} className="mt-3 btn-primary btn-primary--purple text-sm py-3 px-6">Kirim Catatan</button>
        </motion.div>
      )}
    </div>
  );
}
