/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { IMAGES, REAL_REVIEWS } from "../data";
import { BookOpen, Star, Sparkles, Check, ArrowRight, ShieldCheck, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HeroStepProps {
  onStart: () => void;
}

export const HeroStep: React.FC<HeroStepProps> = ({ onStart }) => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-10 flex flex-col items-center">
      {/* Brand Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center mb-12"
      >
        <img 
          src={IMAGES.logo} 
          alt="Encanta Livro Logo" 
          className="h-16 md:h-20 object-contain drop-shadow-md mb-2"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // Fallback just in case, though the file should load
            (e.currentTarget as HTMLElement).style.display = 'none';
          }}
        />
        <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full text-gold-light text-xs font-bold uppercase tracking-wider mb-2">
          <Star className="w-3 h-3 fill-current" />
          <span>LIVROS FÍSICOS PREMIUM EM CAPA DURA</span>
          <Star className="w-3 h-3 fill-current" />
        </div>
      </motion.div>

      {/* Main Hero Stack (Two columns on desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
        {/* Text & Primary Value Prop column */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="lg:col-span-6 text-center lg:text-left flex flex-col items-center lg:items-start"
        >
          <span className="text-pink bg-pink/15 text-xs font-extrabold px-3 py-1.5 rounded-full inline-block tracking-widest uppercase mb-4">
            ✨ PRODUTO FÍSICO EXCLUSIVO
          </span>
          <h1 className="font-serif font-black text-white text-4xl md:text-5xl lg:text-5xl leading-tight tracking-tight mb-6">
            Crie um livro impresso <span className="text-gold-light italic">mágico</span> personalizado para sua criança!
          </h1>
          <p className="text-purple-100 text-lg md:text-xl font-medium leading-relaxed max-w-lg mb-8">
            Coloque a criança no centro de uma aventura épica. Personalize o nome, tema e envie uma foto para integrar na história!
          </p>

          {/* Value checkmarks */}
          <div className="space-y-3.5 mb-8 text-left w-full max-w-md">
            {[
              "Livro físico real de alta gramatura e cores ricas",
              "Capa dura luxuosa com toque aveludado premium (anti-risco)",
              "Criação literária pedagógica feita com muito amor",
              "Presente emocionante que dura por toda a vida"
            ].map((bullet, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="bg-emerald-500 text-white rounded-full p-0.5 mt-1 flex-shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="text-purple-100 text-sm md:text-base font-semibold">{bullet}</span>
              </div>
            ))}
          </div>

          {/* Large Magical Call to Action */}
          <div className="w-full max-w-sm lg:max-w-none">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={onStart}
              className="w-full lg:w-auto bg-gradient-to-r from-pink to-[#E8820A] text-white font-black text-lg md:text-xl px-10 py-5 rounded-full shadow-lg hover:shadow-pink/40 hover:shadow-2xl transition duration-200 cursor-pointer flex items-center justify-center gap-3 uppercase tracking-wider"
            >
              <Sparkles className="w-5 h-5 text-gold-light animate-pulse-glow" />
              <span>✨ COMEÇAR MINHA HISTÓRIA</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            <p className="text-purple-200/70 text-xs mt-3.5 flex items-center justify-center lg:justify-start gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Leve apenas 3 minutos para configurar · Rápido e Seguro
            </p>
          </div>
        </motion.div>

        {/* Real Product Mockup / Photo showcase column (Req #1 - IMAGEM REAL) */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="lg:col-span-6 w-full flex flex-col items-center"
        >
          {/* Main Photo Card */}
          <div className="relative w-full max-w-md md:max-w-lg">
            {/* Elegant glowing backdrop rings */}
            <div className="absolute -inset-2 bg-gradient-to-r from-pink via-purple-mid to-gold rounded-[24px] opacity-35 blur-xl animate-pulse-glow" />

            <div className="relative bg-white/5 border border-white/10 rounded-[22px] overflow-hidden p-3.5 shadow-2xl backdrop-blur-sm">
              <img 
                src={IMAGES.previewAmara} 
                alt="Menina linda rindo com seu livro premium Encanta Livro" 
                className="w-full aspect-[4/3] object-cover rounded-[16px] shadow-lg mb-4"
                referrerPolicy="no-referrer"
              />
              
              <div className="grid grid-cols-2 gap-3.5">
                <div className="relative">
                  <img 
                    src={IMAGES.heroMockup} 
                    alt="Mockup do livro aberto em cima de uma mesa de madeira" 
                    className="w-full aspect-square object-cover rounded-[12px] shadow-md border border-white/10"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-1.5 left-1.5 bg-purple-dark/85 text-[10px] text-white font-bold px-2 py-0.5 rounded-full">
                    Aberto físico
                  </span>
                </div>
                <div className="relative">
                  <img 
                    src={IMAGES.previewLeoBed} 
                    alt="Mãe lendo com o filho na cama de maneira aconchegante" 
                    className="w-full aspect-square object-cover rounded-[12px] shadow-md border border-white/10"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-1.5 left-1.5 bg-purple-dark/85 text-[10px] text-white font-bold px-2 py-0.5 rounded-full">
                    Momento de carinho
                  </span>
                </div>
              </div>
            </div>

            {/* Float badge floating */}
            <div className="absolute -top-4 -right-4 bg-gradient-to-br from-gold to-[#f97316] text-white font-black text-xs md:text-sm px-4 py-2.5 rounded-2xl shadow-xl transform rotate-6 flex flex-col items-center z-10">
              <span className="text-[10px] opacity-90 tracking-wide uppercase">Nota de Satisfação</span>
              <span className="flex items-center gap-0.5 text-base font-black mt-0.5">
                4.9/5 <Star className="w-4 h-4 fill-current text-white inline ml-0.5" />
              </span>
            </div>

            {/* Quality seal badge bottom-left */}
            <div className="absolute -bottom-4 -left-4 bg-white text-purple font-extrabold text-[10px] md:text-xs px-3.5 py-2.5 rounded-2xl shadow-xl border border-purple-light/20 flex items-center gap-2 z-10">
              <div className="bg-pink text-white rounded-full p-1">
                <Heart className="w-3 h-3 fill-current" />
              </div>
              <span className="leading-tight text-slate-800">Capa Dura Premium<br /><span className="font-medium text-slate-500">Toque Aveludado</span></span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Social Proof / Static Testimonials displaying exactly 3 reviews */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-20 w-full"
      >
        <div className="text-center mb-8">
          <h2 className="font-serif text-white font-bold text-2xl md:text-3xl">
            Histórias que tocam o coração de verdade 💖
          </h2>
          <p className="text-purple-200 text-sm mt-2">Veja o que pais e mães reais dizem sobre a qualidade dos livros físicos:</p>
        </div>

        {/* 3 Static Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto px-4">
          {REAL_REVIEWS.slice(0, 3).map((review, idx) => (
            <div 
              key={idx}
              className="bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/20 flex flex-col justify-between text-left hover:scale-[1.02] transition-transform duration-300"
            >
              <div>
                <div className="flex items-center gap-1 text-gold mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-slate-700 italic text-sm md:text-sm leading-relaxed mb-4">
                  "{review.comment}"
                </p>
              </div>
              <div className="flex items-center gap-3 border-t border-purple-light/10 pt-3 mt-1.5">
                <span className="text-2xl" role="img" aria-label={review.name}>{review.avatar}</span>
                <div className="min-w-0">
                  <h4 className="text-sm font-black text-purple-dark leading-tight truncate">{review.name}</h4>
                  <span className="text-xs text-purple-mid font-bold block truncate">{review.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
