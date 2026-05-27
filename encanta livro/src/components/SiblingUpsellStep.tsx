import React from "react";
import { Sparkles, ArrowRight, Heart, Star, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { AGE_OPTIONS, TRAIT_OPTIONS } from "../data";
import { SafeImage } from "./SafeImage";

interface SiblingUpsellStepProps {
  includeSiblingBook: boolean;
  onToggleSibling: (include: boolean) => void;
  siblingName: string;
  onChangeSiblingName: (name: string) => void;
  siblingAge: string;
  onSelectSiblingAge: (age: string) => void;
  siblingTraits: string[];
  onToggleSiblingTrait: (trait: string) => void;
  onNext: () => void;
  onBack: () => void;
  primaryChildName: string;
}

export const SiblingUpsellStep: React.FC<SiblingUpsellStepProps> = ({
  includeSiblingBook,
  onToggleSibling,
  siblingName,
  onChangeSiblingName,
  siblingAge,
  onSelectSiblingAge,
  siblingTraits,
  onToggleSiblingTrait,
  onNext,
  onBack,
  primaryChildName,
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto px-4" id="sibling-upsell-step">
      <div className="text-center space-y-3 mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink/20 text-pink border border-pink/30 text-xs font-bold uppercase tracking-wider animate-pulse">
          <Heart className="w-3 h-3 fill-current" /> Deixe essa lembrança ainda mais especial
        </div>
        <h2 className="text-2xl md:text-3xl font-display font-bold tracking-tight text-white drop-shadow">
          Tem outro pequeno aventureiro em casa?
        </h2>
        <p className="text-sm text-purple-200/80 max-w-md mx-auto">
          Nenhuma criança gosta de ficar de fora da magia 💖 Crie também uma aventura especial para o irmão ou irmã com desconto exclusivo de <span className="text-gold font-bold">30% OFF</span>!
        </p>
      </div>

      <div className="space-y-6">
        {/* Toggle options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => onToggleSibling(false)}
            className={`p-5 rounded-2xl border text-left transition-all relative ${
              !includeSiblingBook
                ? "bg-white/10 border-gold shadow-lg shadow-gold/10"
                : "bg-white/5 border-white/10 hover:bg-white/8"
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-purple-200/65 font-medium">Opção Convencional</p>
                <p className="font-bold text-white text-base mt-1">Apenas para {primaryChildName || "Protagonista"}</p>
                <p className="text-xs text-purple-200/80 mt-2">1 Livro Personalizado em edição de alta qualidade</p>
              </div>
              {!includeSiblingBook && (
                <div className="w-5 h-5 rounded-full bg-gold flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-deep-blue font-bold" />
                </div>
              )}
            </div>
          </button>

          <button
            type="button"
            onClick={() => onToggleSibling(true)}
            className={`p-5 rounded-2xl border text-left transition-all relative overflow-hidden ${
              includeSiblingBook
                ? "bg-gradient-to-br from-pink-950/40 to-purple-950/40 border-pink-500/70 shadow-lg shadow-pink-500/20"
                : "bg-white/5 border-white/10 hover:bg-white/8 hover:border-pink-500/30"
            }`}
          >
            <div className="absolute top-0 right-0 bg-gradient-to-l from-pink to-pink-600 text-white font-black text-[9px] uppercase py-1 px-3.5 rounded-bl-xl tracking-wider flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" /> Campeão de Vendas
            </div>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-pink-300 font-bold uppercase tracking-wider">Super Kit Família (30% OFF)</p>
                <p className="font-bold text-white text-base mt-1">Incluir livro para Irmão(ã)</p>
                <p className="text-xs text-purple-200/80 mt-2">Dobre a magia no lar! Duas histórias personalizadas distintas.</p>
              </div>
              {includeSiblingBook && (
                <div className="w-5 h-5 rounded-full bg-pink flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-white font-bold" />
                </div>
              )}
            </div>
          </button>
        </div>

        {/* Dynamic Sibling Personalization Form */}
        <AnimatePresence mode="wait">
          {includeSiblingBook && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35 }}
              className="overflow-hidden"
            >
              <div className="relative bg-white/5 border border-white/10 rounded-3xl p-6 space-y-6 backdrop-blur-md">
                <div className="absolute -top-3 left-6 bg-pink text-white text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider shadow">
                  Personalizar livro do Irmão / Irmã
                </div>

                {/* Sibling Name */}
                <div className="space-y-2 pt-2">
                  <label className="block text-xs font-bold text-purple-200/80 uppercase tracking-wide">
                    Nome do Irmão ou Irmã
                  </label>
                  <input
                    type="text"
                    value={siblingName}
                    onChange={(e) => onChangeSiblingName(e.target.value)}
                    placeholder="Ex: Gabriel, Sophia, Pedro..."
                    className="w-full bg-white/8 border border-white/15 focus:border-pink-500 rounded-2xl px-5 py-3.5 text-base text-white placeholder-purple-300/40 outline-none transition font-medium"
                  />
                  {siblingName.trim() && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-ping-light/90 font-medium italic mt-1"
                    >
                      Que lindo! O livro do(a) {siblingName} será criado com o mesmo carinho ✨
                    </motion.p>
                  )}
                </div>

                {/* Sibling Age group */}
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-purple-200/80 uppercase tracking-wide">
                    Faixa Etária do(a) {siblingName || "Irmão(ã)"}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {AGE_OPTIONS.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => onSelectSiblingAge(opt.id)}
                        className={`p-3.5 rounded-2xl border text-center transition ${
                          siblingAge === opt.id
                            ? "bg-pink/20 border-pink text-white font-bold"
                            : "bg-white/5 border-white/10 hover:bg-white/8 text-purple-200"
                        }`}
                      >
                        <span className="block text-sm font-bold">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sibling traits */}
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-purple-200/80 uppercase tracking-wide">
                    Qualidades Marcantes do(a) {siblingName || "Irmão(ã)"} (Escolha até 3)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {TRAIT_OPTIONS.map((trait) => {
                      const isSelected = siblingTraits.includes(trait.id);
                      return (
                        <button
                          key={trait.id}
                          type="button"
                          onClick={() => onToggleSiblingTrait(trait.id)}
                          className={`flex items-center gap-2 p-3 rounded-xl border text-xs transition ${
                            isSelected
                              ? "bg-pink-600/35 border-pink text-white font-bold scale-102"
                              : "bg-white/5 border-white/8 hover:bg-white/10 text-purple-200"
                          }`}
                        >
                          <span className="text-sm">{trait.emoji}</span>
                          <span>{trait.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-4 pt-4">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-purple-200 rounded-2xl font-bold text-sm tracking-wide transition cursor-pointer flex items-center justify-center"
          >
            Voltar
          </button>
          
          <button
            type="button"
            onClick={onNext}
            className="flex-1 md:flex-initial px-8 py-3.5 bg-gradient-to-r from-pink to-purple-light hover:opacity-90 active:scale-98 text-white rounded-2xl font-bold text-sm tracking-wide transition cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-pink-500/20"
          >
            {includeSiblingBook ? "Salvar e Continuar" : "Apenas 1 Livro e Continuar"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
