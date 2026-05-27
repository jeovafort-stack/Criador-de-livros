/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Sparkles, Calendar, BookOpen, Star, ArrowRight, Heart, Check, Gift } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { THEME_OPTIONS } from "../data";
import { SafeImage } from "./SafeImage";

interface CreationReviewStepProps {
  childName: string;
  themeId: string;
  ageId: string;
  readerId: string;
  onNext: () => void;
  premiumCover: boolean;
  onTogglePremiumCover: (val: boolean) => void;
}

export const CreationReviewStep: React.FC<CreationReviewStepProps> = ({
  childName,
  themeId,
  ageId,
  readerId,
  onNext,
  premiumCover,
  onTogglePremiumCover,
}) => {
  const [loading, setLoading] = useState(true);
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);

  const loadingTexts = [
    "Abrindo o baú de histórias antigas...",
    "Reunindo os personagens da floresta...",
    "Integrando a foto de referência do herói...",
    "Teclando poesias nas páginas de pergaminho...",
    "Encadernando a capa dura holográfica...",
  ];

  // Pick the customized theme option
  const themeOpt = THEME_OPTIONS.find((t) => t.id === themeId);
  const chosenName = childName || "sua criança";
  const coverTitleTemplate = themeOpt?.bookCoverTitle || "O Livro Mágico de {name}";
  const finalBookTitle = coverTitleTemplate.replace("{name}", chosenName);

  // Transition from loading State to Wow State
  useEffect(() => {
    // Progress texts
    const textInterval = setInterval(() => {
      setLoadingTextIndex((prev) => (prev < loadingTexts.length - 1 ? prev + 1 : prev));
    }, 450);

    // Wait and load content
    const loadTimeout = setTimeout(() => {
      setLoading(false);
    }, 2400);

    return () => {
      clearInterval(textInterval);
      clearTimeout(loadTimeout);
    };
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 md:px-6 py-6 flex flex-col items-center min-height-70">
      <AnimatePresence mode="wait">
        {loading ? (
          /* Magical loading state animations */
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center justify-center text-center p-10 max-w-md w-full"
          >
            <div className="relative mb-6">
              <div className="w-20 h-20 rounded-full border-4 border-purple-light/20 border-t-gold animate-spin" />
              <Sparkles className="absolute inset-0 m-auto text-gold w-8 h-8 animate-pulse-glow" />
            </div>

            <h3 className="font-serif font-black text-white text-2xl mb-2">
              Misturando porções e pozinho de fada... ✨
            </h3>
            
            <motion.p
              key={loadingTextIndex}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-pink text-sm md:text-base font-extrabold mt-3 tracking-wide"
            >
              {loadingTexts[loadingTextIndex]}
            </motion.p>
          </motion.div>
        ) : (
          /* Gorgeous Wow revealed state with real CAPA 3D dynamics */
          <motion.div
            key="revealed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 80 }}
            className="w-full flex flex-col items-center"
          >
            {/* Header badges */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-1.5 bg-gold/15 text-gold border border-gold/15 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5 fill-current animate-pulse-glow" />
                <span>RASCUNHO FÍSICO RENDERIZADO</span>
              </div>
              
              <h2 className="font-serif font-black text-white text-3xl md:text-4xl tracking-tight leading-tight mb-2">
                Estamos criando algo sublime para <span className="text-gold-light italic">{chosenName}</span> ✨
              </h2>
              <p className="text-purple-100 text-sm md:text-base max-w-sm mx-auto">
                Confira a composição da capa do seu exemplar de luxo impresso:
              </p>
            </div>

            {/* Premium Interactive 3D Book Mockup with Real Capa Overlap (Req #2 - CAPA REAL) */}
            <div className="relative w-full max-w-sm aspect-[11/14] mb-10 group" style={{ perspective: "1000px" }}>
              
              {/* Backlight background bloom glow */}
              <div className={`absolute -inset-2 bg-gradient-to-r ${premiumCover ? "from-gold via-yellow-400 to-amber-500 opacity-60 blur-3xl scale-105" : "from-gold via-pink to-purple-light opacity-30 shadow-lg"} rounded-[28px] blur-2xl group-hover:opacity-45 transition-all duration-500`} />

              {/* The 3D Book container */}
              <motion.div 
                initial={{ rotateY: -15, rotateX: 5 }}
                animate={{ rotateY: -6, rotateX: 3 }}
                transition={{ repeat: Infinity, repeatType: "reverse", duration: 4, ease: "easeInOut" }}
                className={`relative w-full h-full rounded-r-[24px] rounded-l-[4px] shadow-[15px_20px_50px_rgba(0,0,0,0.55)] border overflow-hidden cursor-pointer transition-all duration-500 ${
                  premiumCover ? "ring-4 ring-gold/80 border-gold/90 scale-102" : "border-white/10"
                }`}
              >
                {/* 1. Underlying real product cover sheet illustration image using SafeImage tool */}
                <SafeImage 
                  src={themeOpt?.previewImage || ""} 
                  alt="Previa real da ilustracao do livro" 
                  className="absolute inset-0 w-full h-full object-cover select-none"
                />

                {/* 2. Glassmorphic overlay container focusing title & child custom tags */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-dark/85 via-purple-dark/45 to-transparent p-6 md:p-8 flex flex-col justify-between">
                  {/* Spine simulated shadow ridge (left edge of page) */}
                  <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-black/60 to-transparent rounded-l-[4px]" />

                  {/* Corner metallic book protectors */}
                  <div className={`absolute top-0 right-0 w-8 h-8 border-t-[3px] border-r-[3px] rounded-tr-[8px] transition-all ${premiumCover ? "border-gold scale-110 shadow-[0_0_15px_rgba(232,130,10,0.5)]" : "border-gold/40"}`} />
                  <div className={`absolute bottom-0 right-0 w-8 h-8 border-b-[3px] border-r-[3px] rounded-br-[8px] transition-all ${premiumCover ? "border-gold scale-110 shadow-[0_0_15px_rgba(232,130,10,0.5)]" : "border-gold/40"}`} />

                  {/* Dynamic Custom Header text details */}
                  <div className={`self-end bg-white/12 backdrop-blur-md border px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider mb-2 transition-all ${premiumCover ? "border-gold text-gold" : "border-white/12 text-white"}`}>
                    {premiumCover ? "✨ EDIÇÃO PREMIUM SUPREMA" : `${themeOpt?.emoji} ${themeOpt?.label}`}
                  </div>

                  {/* Interactive Dynamic Custom Book Spine Title Layer */}
                  <div className={`text-center w-full bg-white/95 backdrop-blur-md border rounded-2xl py-5 px-4 shadow-xl flex flex-col items-center gap-1.5 transition-all duration-500 ${premiumCover ? "border-gold ring-2 ring-gold/50" : "border-white/50"}`}>
                    <p className={`font-black tracking-widest text-[10px] uppercase ${premiumCover ? "text-amber-700 font-black animate-pulse" : "text-purple-dark"}`}>
                      {premiumCover ? "🌟 LIVRO PREMIUM CAPA DURA" : "LIVRO PERSONALIZADO"}
                    </p>
                    
                    {/* The dynamic updated cover title with configured kids name! */}
                    <h3 className="font-serif font-black text-purple-dark text-lg md:text-xl leading-tight">
                      {finalBookTitle}
                    </h3>

                    {/* Miniature rating badge */}
                    <div className="flex items-center gap-1.5 mt-1 bg-purple/10 px-2.5 py-0.5 rounded-full text-[9px] text-purple-mid font-extrabold uppercase">
                      <Star className="w-2.5 h-2.5 fill-current text-gold shrink-0" />
                      <span>Encanta Livro</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Configured meta badges indicators */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 w-full mb-6 max-w-lg">
              <div className="bg-white/8 border border-white/8 px-4 py-2 rounded-full text-white text-xs font-semibold leading-tight">
                Protagonista: <span className="text-gold font-bold">{chosenName}</span>
              </div>
              <div className="bg-white/8 border border-white/8 px-4 py-2 rounded-full text-white text-xs font-semibold leading-tight">
                Faixa: <span className="text-gold font-bold">{ageId === "2-4" ? "2 a 4" : ageId === "5-7" ? "5 a 7" : ageId === "8-12" ? "8 a 12" : ageId || "—"} anos</span>
              </div>
              <div className="bg-white/8 border border-white/8 px-4 py-2 rounded-full text-white text-xs font-semibold leading-tight">
                Lendo com: <span className="text-gold font-bold">{readerId || "—"}</span>
              </div>
            </div>

            {/* ─── CAPA PREMIUM UPSELL COMPONENT (Req #2 - CAPA PREMIUM) ─── */}
            <div className="w-full max-w-md mb-8">
              <button
                type="button"
                onClick={() => onTogglePremiumCover(!premiumCover)}
                className={`w-full p-4.5 rounded-3xl border-2 text-left transition-all ${
                  premiumCover 
                    ? "bg-gradient-to-r from-amber-950/45 to-yellow-950/40 border-gold/90 shadow-lg shadow-gold/20" 
                    : "bg-white/5 border-white/10 hover:bg-white/8 hover:border-gold/30"
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className={`mt-0.5 p-2 rounded-xl ${premiumCover ? "bg-gold text-purple-dark" : "bg-white/10 text-gold-light"}`}>
                    <Sparkles className="w-5 h-5 fill-current" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase tracking-wider text-gold">UPGRADE EXCLUSIVO</span>
                      <span className="bg-gold/15 text-gold-light border border-gold/20 px-2 py-0.5 rounded-full text-[10px] font-bold">RECOMENDADO</span>
                    </div>
                    <p className="font-bold text-white text-base">✨ Transforme seu livro em edição premium</p>
                    <p className="text-xs text-purple-200/90 leading-relaxed font-medium">
                      Um livro criado para guardar por toda vida merece um acabamento especial 💖 Inclui: Capa dura, laminação aveludada anti-risco, relevo de luxo e brilho verniz localizado (+ R$ 29,90).
                    </p>
                    <div className="flex items-center gap-1.5 pt-1.5 text-xs font-bold text-emerald-400">
                      <Check className="w-3.5 h-3.5" />
                      <span>{premiumCover ? "EDICÃO PREMIUM SELECIONADA!" : "Toque para adicionar"}</span>
                    </div>
                  </div>
                </div>
              </button>
            </div>

            {/* Advance button */}
            <div className="w-full max-w-sm flex flex-col items-center">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={onNext}
                className="w-full bg-gradient-to-r from-pink to-[#E8820A] text-white font-black text-base py-4.5 rounded-2xl shadow-lg hover:shadow-pink/30 transition duration-200 uppercase tracking-wider flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <span>Salvar e Continuar</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
