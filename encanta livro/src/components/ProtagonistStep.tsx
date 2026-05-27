/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { AGE_OPTIONS, TRAIT_OPTIONS, FAVORITE_COLORS, EMOTIONAL_MICROCOPIES } from "../data";
import { TraitOption } from "../types";
import { ArrowLeft, User, Heart, Sparkles, Trophy } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ProtagonistStepProps {
  childName: string;
  onChangeName: (name: string) => void;
  selectedAgeId: string;
  onSelectAge: (ageId: string) => void;
  favoriteColor: string;
  onSelectColor: (colorId: string) => void;
  selectedTraits: string[];
  onToggleTrait: (trait: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export const ProtagonistStep: React.FC<ProtagonistStepProps> = ({
  childName,
  onChangeName,
  selectedAgeId,
  onSelectAge,
  favoriteColor,
  onSelectColor,
  selectedTraits,
  onToggleTrait,
  onNext,
  onBack,
}) => {
  // Check if step is valid for forwarding
  const isFormValid = childName.trim().length > 1 && selectedAgeId !== "" && favoriteColor !== "";

  // Helper to retrieve selected age range label
  const activeAgeLabel = AGE_OPTIONS.find((a) => a.id === selectedAgeId)?.range;

  return (
    <div className="w-full max-w-2xl mx-auto px-4 md:px-6 py-6 flex flex-col items-center">
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
          Etapa 2 de 5 · Personalização do Protagonista
        </span>
        <h2 className="font-serif font-black text-white text-3xl md:text-4xl tracking-tight mb-2">
          Vamos conhecer a estrela da história! 🌟
        </h2>
        <p className="text-purple-100 text-sm md:text-base">
          Estes dados personalizarão os diálogos e ilustrações internas do livro impresso.
        </p>
      </div>

      {/* Main Glass Form Card */}
      <div className="w-full premium-glass-card rounded-[22px] p-6 md:p-8 shadow-2xl mb-8 border border-white/50 space-y-7.5">
        
        {/* Child Name Field */}
        <div>
          <label htmlFor="child-name-input" className="block text-purple-dark font-black tracking-wide text-xs uppercase mb-2">
            ✏️ Nome completo ou apelido da criança
          </label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-light w-5 h-5" />
            <input
              id="child-name-input"
              type="text"
              value={childName}
              onChange={(e) => onChangeName(e.target.value)}
              placeholder="Ex: Pedro, Carolina, Maria Alice..."
              maxLength={26}
              className="w-full bg-white/70 text-purple-dark text-base md:text-lg font-extrabold pl-12 pr-4 py-4 rounded-xl border-2 border-purple-light/20 focus:border-purple focus:ring-0 focus:outline-none transition-all placeholder:text-purple-light/50"
            />
          </div>

          {/* Dynamic Emotional Microcopy for name (Req #3) */}
          <AnimatePresence>
            {childName.trim().length > 1 && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -5 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -5 }}
                className="mt-2.5 ml-1 flex items-center gap-1.5 text-pink font-extrabold text-sm"
              >
                <Sparkles className="w-4 h-4 text-pink shrink-0 animate-pulse-glow" />
                <span>{EMOTIONAL_MICROCOPIES.afterName(childName)}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Age Level Field */}
        <div>
          <label className="block text-purple-dark font-black tracking-wide text-xs uppercase mb-3">
            🎂 Em qual faixa etária ela está?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {AGE_OPTIONS.map((opt) => {
              const isAgeSelected = opt.id === selectedAgeId;
              return (
                <button
                  key={opt.id}
                  onClick={() => onSelectAge(opt.id)}
                  className={`px-4 py-3.5 rounded-xl border-2 text-center transition-all duration-200 cursor-pointer ${
                    isAgeSelected
                      ? "bg-purple text-white border-purple shadow-md shadow-purple/10"
                      : "bg-white/60 border-purple-light/15 text-purple-dark hover:border-purple-light/55 hover:bg-white"
                  }`}
                >
                  <p className="font-extrabold text-sm md:text-base">{opt.label}</p>
                </button>
              );
            })}
          </div>

          {/* Dynamic Emotional Microcopy for age (Req #3) */}
          <AnimatePresence>
            {selectedAgeId !== "" && activeAgeLabel && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -5 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -5 }}
                className="mt-3.5 text-purple-dark/85 bg-purple/5 px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold flex items-start gap-2 border border-purple/10"
              >
                <Trophy className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-pink font-extrabold">{EMOTIONAL_MICROCOPIES.afterAge(activeAgeLabel)}</span>
                  <span className="text-purple-mid text-xs font-semibold mt-0.5">
                    {AGE_OPTIONS.find((a) => a.id === selectedAgeId)?.subtitle}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Favorite Color Field */}
        <div>
          <label className="block text-purple-dark font-black tracking-wide text-xs uppercase mb-3 text-left">
            🎨 Qual é a cor favorita da criança?
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
            {FAVORITE_COLORS.map((color) => {
              const isColorSelected = color.id === favoriteColor;
              return (
                <button
                  key={color.id}
                  type="button"
                  onClick={() => onSelectColor(color.id)}
                  className={`relative flex flex-col items-center justify-center p-2.5 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                    isColorSelected
                      ? "bg-white border-purple text-purple shadow-lg shadow-purple/15 scale-102 ring-2 ring-purple/20"
                      : "bg-white/60 border-purple-light/15 text-purple-dark hover:border-purple-light/50 hover:bg-white"
                  }`}
                >
                  <span className={`w-8 h-8 rounded-full ${color.bgClass} flex items-center justify-center text-white text-xs font-black shadow-md mb-1.5 relative`}>
                    {isColorSelected && "✓"}
                  </span>
                  <span className="text-[11px] font-black tracking-tight">{color.label}</span>
                </button>
              );
            })}
          </div>
          
          <AnimatePresence>
            {favoriteColor !== "" && (
              <motion.p
                initial={{ opacity: 0, height: 0, y: -5 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -5 }}
                className="text-pink font-extrabold text-sm mt-3 ml-1 flex items-center gap-1.5"
              >
                <span>{FAVORITE_COLORS.find(c => c.id === favoriteColor)?.emoji}</span>
                <span>Que incrível! A cor {FAVORITE_COLORS.find(c => c.id === favoriteColor)?.label} deixará as ilustrações e detalhes da capa ainda mais mágicos! 💫</span>
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Personality Descriptors Field */}
        <div>
          <label className="block text-purple-dark font-black tracking-wide text-xs uppercase mb-3">
            💫 Como é a personalidade do protagonista? (Selecione todos que combinam)
          </label>
          <div className="flex flex-wrap gap-2.5">
            {TRAIT_OPTIONS.map((trait) => {
              const isTraitSelected = selectedTraits.includes(trait.id);
              return (
                <button
                  key={trait.id}
                  onClick={() => onToggleTrait(trait.id)}
                  className={`flex items-center gap-1.5 px-4.5 py-2.5 rounded-full border-2 text-sm font-extrabold transition-all duration-200 cursor-pointer ${
                    isTraitSelected
                      ? "bg-gold text-white border-gold shadow-md"
                      : "bg-white/70 border-purple-light/15 text-purple-dark hover:border-purple-light/50"
                  }`}
                >
                  <span>{trait.emoji}</span>
                  <span>{trait.label}</span>
                </button>
              );
            })}
          </div>

          {/* Dynamic Emotional Microcopy for Trait */}
          <AnimatePresence>
            {selectedTraits.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -5 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -5 }}
                className="mt-3.5 ml-1 flex items-center gap-1.5 text-purple-mid font-extrabold text-sm"
              >
                <Heart className="w-4 h-4 text-gold fill-current" />
                <span>{EMOTIONAL_MICROCOPIES.afterTraits}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Button controls */}
      <div className="w-full max-w-sm flex flex-col items-center gap-3">
        <motion.button
          whileHover={isFormValid ? { scale: 1.03 } : {}}
          whileTap={isFormValid ? { scale: 0.98 } : {}}
          onClick={onNext}
          disabled={!isFormValid}
          className={`w-full font-black text-lg py-4.5 rounded-full shadow-lg transition duration-200 uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer ${
            isFormValid
              ? "bg-gradient-to-r from-pink to-[#E8820A] text-white hover:shadow-pink/35 hover:shadow-xl"
              : "bg-white/20 text-white/50 cursor-not-allowed"
          }`}
        >
          <span>Continuar</span>
          <Sparkles className="w-4 h-4 text-gold-light animate-pulse-glow" strokeWidth={3} />
        </motion.button>
        {!isFormValid && (
          <p className="text-purple-200/80 text-xs font-semibold">
            Insira o nome da criança, faixa etária e cor favorita para prosseguir 💖
          </p>
        )}
      </div>
    </div>
  );
};
