/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { READER_OPTIONS, EMOTIONAL_MICROCOPIES } from "../data";
import { ReaderOption } from "../types";
import { ArrowLeft, Check, Heart, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ReaderStepProps {
  childName: string;
  selectedReaderId: string;
  onSelectReader: (readerId: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export const ReaderStep: React.FC<ReaderStepProps> = ({
  childName,
  selectedReaderId,
  onSelectReader,
  onNext,
  onBack,
}) => {
  const isSelected = selectedReaderId !== "";
  const nameToDisplay = childName ? childName : "a criança";

  return (
    <div className="w-full max-w-3xl mx-auto px-4 md:px-6 py-6 flex flex-col items-center">
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
          Etapa 4 de 5 · Vínculo Afetivo
        </span>
        <h2 className="font-serif font-black text-white text-3xl md:text-4xl tracking-tight mb-2">
          Quem costuma ler histórias com <span className="text-gold-light italic">{nameToDisplay}</span>? 💛
        </h2>
        <p className="text-purple-100 text-sm md:text-base max-w-sm mx-auto">
          Inserir o leitor principal personaliza a dedicatória e as ilustrações finais de carinho do livro.
        </p>
      </div>

      {/* Reader Options Layout Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 w-full mb-10">
        {READER_OPTIONS.map((opt) => {
          const isCurrentSelected = opt.id === selectedReaderId;
          return (
            <motion.div
              key={opt.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectReader(opt.id)}
              className={`rounded-[18px] border p-5 text-center cursor-pointer flex flex-col items-center gap-3.5 transition-all duration-300 ${
                isCurrentSelected
                  ? "bg-white border-gold shadow-lg shadow-gold/20 -translate-y-1 ring-2 ring-gold"
                  : "bg-white/85 border-purple-light/20 text-purple-dark hover:border-purple-light/50 hover:bg-white"
              }`}
            >
              {/* Reader emoji indicator icon */}
              <div className="text-4xl filter drop-shadow-md animate-magical-float shrink-0">
                {opt.emoji}
              </div>

              <div>
                <h3 className="font-serif font-black text-slate-800 text-sm leading-tight mb-1">
                  {opt.label}
                </h3>
              </div>

              {/* Status Indicator check dot */}
              <div className="mt-1">
                {isCurrentSelected ? (
                  <div className="bg-emerald-500 text-white rounded-full p-0.5">
                    <Check className="w-2.5 h-2.5 stroke-[4px]" />
                  </div>
                ) : (
                  <div className="w-3.5 h-3.5 rounded-full border border-slate-300" />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Dynamic Emotional Microcopy feedback (Req #3) */}
      <div className="w-full max-w-md mb-8">
        <AnimatePresence>
          {isSelected && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mt-3.5 text-center bg-white/10 px-5 py-3 rounded-full text-xs md:text-sm font-black flex items-center gap-2 border border-white/10 justify-center text-gold-light"
            >
              <Heart className="w-4 h-4 fill-current text-gold shrink-0" />
              <span>{EMOTIONAL_MICROCOPIES.afterReader}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Button controls */}
      <div className="w-full max-w-sm flex flex-col items-center gap-3">
        <motion.button
          whileHover={isSelected ? { scale: 1.03 } : {}}
          whileTap={isSelected ? { scale: 0.98 } : {}}
          onClick={onNext}
          disabled={!isSelected}
          className={`w-full font-black text-lg py-4.5 rounded-full shadow-lg transition duration-200 uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer ${
            isSelected
              ? "bg-gradient-to-r from-pink to-[#E8820A] text-white hover:shadow-pink/35 hover:shadow-xl"
              : "bg-white/20 text-white/50 cursor-not-allowed"
          }`}
        >
          <span>Criar Livro Mágico →</span>
        </motion.button>
        {!isSelected && (
          <p className="text-purple-200/80 text-xs font-semibold">
            Por favor, selecione quem lê as histórias para prosseguir 💛
          </p>
        )}
      </div>
    </div>
  );
};
