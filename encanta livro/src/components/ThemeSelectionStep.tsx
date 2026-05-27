/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { THEME_OPTIONS } from "../data";
import { ThemeOption } from "../types";
import { ArrowLeft, Check, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { SafeImage } from "./SafeImage";

interface ThemeSelectionStepProps {
  selectedThemeId: string;
  onSelectTheme: (theme: ThemeOption) => void;
  onNext: () => void;
  onBack: () => void;
}

export const ThemeSelectionStep: React.FC<ThemeSelectionStepProps> = ({
  selectedThemeId,
  onSelectTheme,
  onNext,
  onBack,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 md:px-6 py-6 flex flex-col items-center">
      {/* Back button */}
      <button 
        onClick={onBack}
        className="self-start mb-6 flex items-center gap-1.5 text-purple-100/80 hover:text-white transition font-bold text-sm cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Voltar</span>
      </button>

      {/* Header and Step Indicator */}
      <div className="text-center mb-8">
        <span className="text-xs font-black uppercase tracking-widest text-gold bg-gold/15 px-3.5 py-1.5 rounded-full inline-block mb-3 border border-gold/10">
          Etapa 1 de 5 · Escolha o Universo
        </span>
        <h2 className="font-serif font-black text-white text-3xl md:text-4xl tracking-tight mb-3">
          Qual aventura combina mais com sua criança? 🌟
        </h2>
        <p className="text-purple-100 text-base max-w-md mx-auto">
          Cada universo possui ilustrações exclusivas desenvolvidas com muito requinte estético.
        </p>
      </div>

      {/* Grid containing themes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full mb-10">
        {THEME_OPTIONS.map((theme, i) => {
          const isSelected = theme.id === selectedThemeId;
          return (
            <motion.div
              key={theme.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              onClick={() => onSelectTheme(theme)}
              className={`group relative overflow-hidden rounded-[18px] border cursor-pointer flex flex-col transition-all duration-300 ${
                isSelected
                  ? "bg-white border-gold shadow-lg shadow-gold/20 -translate-y-1.5 ring-2 ring-gold"
                  : "bg-white/90 hover:bg-white border-transparent hover:-translate-y-1 hover:shadow-xl"
              }`}
            >
              {/* Cover Thumbnail Preview - Dynamic Cover Mockup Thumbnail (Req #2 - CAPA REAL) */}
              <div className="relative w-full aspect-[4/3] bg-purple-dark/10 overflow-hidden">
                <SafeImage 
                  src={theme.previewImage} 
                  alt={`Capa aproximada de ${theme.label}`} 
                  className="w-full h-full object-cover group-hover:scale-108 transition-all duration-500"
                />
              </div>

              {/* Title & details inside the card */}
              <div className="p-4 flex flex-col flex-1 justify-between">
                <div>
                  {/* Title of the book styled as the purple badge, matching user's visual request */}
                  <div className="inline-flex bg-purple-dark text-white rounded-full px-2.5 py-1 text-[11px] font-extrabold items-center gap-1.5 mb-2.5">
                    <span>{theme.emoji}</span>
                    <span>{theme.label}</span>
                  </div>

                  <p className={`text-xs ${
                    isSelected ? "text-slate-600 font-medium" : "text-slate-500"
                  } leading-relaxed`}>
                    {theme.description}
                  </p>
                </div>

                {/* Selected outline icon feedback */}
                <div className="mt-3.5 flex items-center justify-between border-t border-slate-100 pt-3">
                  <span className="text-[10px] font-black tracking-wide text-purple-light uppercase">
                    Ver prévia física
                  </span>
                  {isSelected ? (
                    <div className="bg-emerald-500 text-white rounded-full p-1 shadow-md">
                      <Check className="w-3 h-3 stroke-[3px]" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-slate-200" />
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Button controls */}
      <div className="w-full max-w-sm flex flex-col items-center gap-3">
        <motion.button
          whileHover={selectedThemeId ? { scale: 1.03 } : {}}
          whileTap={selectedThemeId ? { scale: 0.98 } : {}}
          onClick={onNext}
          disabled={!selectedThemeId}
          className={`w-full font-black text-lg py-4.5 rounded-full shadow-lg transition duration-200 uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer ${
            selectedThemeId
              ? "bg-gradient-to-r from-pink to-[#E8820A] text-white hover:shadow-pink/35 hover:shadow-xl"
              : "bg-white/20 text-white/50 cursor-not-allowed"
          }`}
        >
          <span>Avançar</span>
          <Sparkles className="w-4 h-4 text-gold-light animate-pulse-glow" />
        </motion.button>
        {!selectedThemeId && (
          <p className="text-purple-200/80 text-xs font-semibold">
            Por favor, selecione uma aventura para continuar 💖
          </p>
        )}
      </div>
    </div>
  );
};
