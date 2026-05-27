import React from "react";
import { IMAGES, PREMIUM_VALUE_BULLETS, FAVORITE_COLORS } from "../data";
import { Star, Check, Sparkles, Heart, Landmark, CreditCard, ShieldCheck, Gift, FileText, Image, Award, Layout, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { SafeImage } from "./SafeImage";

interface CheckoutStepProps {
  childName: string;
  themeLabel: string;
  themeEmoji: string;
  themeImage: string;
  ageRange: string;
  traits: string[];
  reader: string;
  favoriteColor: string;
  onFinalize: () => void;
  
  // Upsells Props Passed down from App State
  includeSiblingBook: boolean;
  siblingName: string;
  siblingAge: string;
  siblingTraits: string[];
  
  premiumCover: boolean;
  onTogglePremiumCover: (val: boolean) => void;
  
  customDedication: boolean;
  onToggleDedication: (val: boolean) => void;
  dedicationText: string;
  onChangeDedicationText: (val: string) => void;
  
  giftWrapping: boolean;
  onToggleGiftWrapping: (val: boolean) => void;
  
  coverPoster: boolean;
  onToggleCoverPoster: (val: boolean) => void;
  
  heroCertificate: boolean;
  onToggleHeroCertificate: (val: boolean) => void;
  
  digitalPdf: boolean;
  onToggleDigitalPdf: (val: boolean) => void;
}

export const CheckoutStep: React.FC<CheckoutStepProps> = ({
  childName,
  themeLabel,
  themeEmoji,
  themeImage,
  ageRange,
  traits,
  reader,
  favoriteColor,
  onFinalize,
  
  includeSiblingBook,
  siblingName,
  siblingAge,
  siblingTraits,
  
  premiumCover,
  onTogglePremiumCover,
  
  customDedication,
  onToggleDedication,
  dedicationText,
  onChangeDedicationText,
  
  giftWrapping,
  onToggleGiftWrapping,
  
  coverPoster,
  onToggleCoverPoster,
  
  heroCertificate,
  onToggleHeroCertificate,
  
  digitalPdf,
  onToggleDigitalPdf,
}) => {
  const finalProtagonist = childName || "Maria/Pedro";

  // Financial Pricing Math Setup
  const BASE_PRICE = 157.00;
  const ORIGINAL_BASE = 249.00;
  
  const SIBLING_PRICE = 49.90;
  const ORIGINAL_SIBLING = 69.90;
  
  const PREMIUM_COVER_PRICE = 29.90;
  const GIFT_WRAPPING_PRICE = 25.90;
  const COVER_POSTER_PRICE = 19.90;
  const DIGITAL_PDF_PRICE = 15.90;

  // Real-time recalculation of summary cart pricing
  let totalPrice = BASE_PRICE;
  let totalOriginal = ORIGINAL_BASE;

  if (includeSiblingBook) {
    totalPrice += SIBLING_PRICE;
    totalOriginal += ORIGINAL_SIBLING;
  }
  if (premiumCover) {
    totalPrice += PREMIUM_COVER_PRICE;
    totalOriginal += PREMIUM_COVER_PRICE * 1.5;
  }
  if (giftWrapping) {
    totalPrice += GIFT_WRAPPING_PRICE;
    totalOriginal += GIFT_WRAPPING_PRICE * 1.6;
  }
  if (coverPoster) {
    totalPrice += COVER_POSTER_PRICE;
    totalOriginal += COVER_POSTER_PRICE * 1.8;
  }
  if (digitalPdf) {
    totalPrice += DIGITAL_PDF_PRICE;
    totalOriginal += DIGITAL_PDF_PRICE * 2.0;
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-6 py-4 flex flex-col items-center" id="checkout-upgrades-section">
      
      {/* Header and Step Indicator */}
      <div className="text-center mb-8">
        <span className="text-xs font-black uppercase tracking-widest text-[#E8820A] bg-gold/15 px-3.5 py-1.5 rounded-full inline-block mb-3 border border-gold/10">
          Última Etapa 🎉 Garanta seu Exemplar
        </span>
        <h2 className="font-serif font-black text-white text-3xl md:text-4.5xl tracking-tight leading-tight mb-2">
          Deixe esse momento ainda mais mágico! ✨
        </h2>
        <p className="text-purple-100 text-sm md:text-base max-w-xl mx-auto font-medium">
          Personalize as opções finais e transforme cada livro de <span className="text-gold-light font-bold italic">{finalProtagonist}</span> em uma relíquia familiar inestimável.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-start mb-8">
        
        {/* Left Column: Custom Items Overview & Emotional Upsells list */}
        <div className="lg:col-span-7 w-full space-y-6">
          
          {/* Order Details Panel */}
          <div className="premium-glass-card rounded-[22px] overflow-hidden shadow-2xl border border-white/50">
            <div className="bg-purple/10 border-b border-purple-light/10 p-5 flex items-center gap-4">
              <div className="relative w-16 h-20 bg-gold rounded-r-lg rounded-l-[2px] shadow-lg shrink-0 overflow-hidden flex items-center justify-center">
                <SafeImage 
                  src={themeImage || IMAGES.previewAmara} 
                  alt="Previa da capa de luxo" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-black/45 rounded-l-[2px]" />
              </div>

              <div>
                <h3 className="font-serif font-black text-purple-dark text-base md:text-lg leading-snug">
                  A Grande Aventura de {finalProtagonist}
                </h3>
                <p className="text-purple-mid text-xs font-bold mt-0.5">
                  Volume Impresso Físico Original {premiumCover ? "· Edição Premium Capa Dura ✨" : "· Edição Protetora Soft"}
                </p>
              </div>
            </div>

            <div className="p-5 md:p-6 divide-y divide-purple-dark/5 text-slate-800">
              <div className="flex justify-between items-center py-2.5">
                <span className="text-xs md:text-sm font-bold text-slate-500">Protagonista principal</span>
                <span className="text-sm font-black text-purple-dark">{finalProtagonist}</span>
              </div>
              <div className="flex justify-between items-center py-2.5">
                <span className="text-xs md:text-sm font-bold text-slate-500">Tema Literário</span>
                <span className="text-sm font-black text-purple-dark flex items-center gap-1">
                  <span>{themeEmoji}</span>
                  <span>{themeLabel || "Reino Encantado"}</span>
                </span>
              </div>
              
              {/* Sibling book indicator row */}
              {includeSiblingBook && (
                <div className="flex justify-between items-center py-2.5 bg-pink/5 px-2 -mx-2 rounded-xl border border-pink/10 animate-fade-in">
                  <span className="text-xs md:text-sm font-bold text-pink-700 flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 fill-current animate-pulse text-pink" /> Livro Adicional (Irmão/ã)
                  </span>
                  <span className="text-sm font-black text-pink-800">{siblingName || "Gabriel"} ({siblingAge || "5-7"} anos)</span>
                </div>
              )}

              <div className="flex justify-between items-center py-2.5">
                <span className="text-xs md:text-sm font-bold text-slate-500">Características</span>
                <span className="text-xs md:text-sm font-black text-purple-dark max-w-xs text-right leading-tight">
                  {traits.length > 0 ? traits.map(t => t.charAt(0).toUpperCase() + t.slice(1)).join(", ") : "Divertida, Corajosa"}
                </span>
              </div>
              <div className="flex justify-between items-center py-2.5">
                <span className="text-xs md:text-sm font-bold text-slate-500">Aconchego</span>
                <span className="text-sm font-black text-purple-dark text-right font-sans">Leitura guiada com {reader || "Mãe"}</span>
              </div>
              
              {favoriteColor && FAVORITE_COLORS.find((c) => c.id === favoriteColor) && (
                <div className="flex justify-between items-center py-2.5">
                  <span className="text-xs md:text-sm font-bold text-slate-500">Cor Favorita</span>
                  <span className="text-sm font-black text-purple-dark flex items-center gap-1.5 justify-end font-sans">
                    <span className={`w-3.5 h-3.5 rounded-full ${FAVORITE_COLORS.find((c) => c.id === favoriteColor)?.bgClass} inline-block shadow-sm ring-1 ring-black/15`} />
                    <span>{FAVORITE_COLORS.find((c) => c.id === favoriteColor)?.label}</span>
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* 🌈 INTERACTIVE EMOTIONAL UPSELLS SELECTOR CENTER (Req #5/User Request checkout order) */}
          <div className="space-y-4">
            <h3 className="text-sm font-black uppercase tracking-widest text-[#E8820A] flex items-center gap-1.5 pt-2">
              <Sparkles className="w-4 h-4" /> Deixe essa lembrança ainda mais especial:
            </h3>

            {/* 1. Capa Premium Hardcover Toggle (Funnels into Checkout seamlessly if missed earlier) */}
            <label className={`block cursor-pointer p-4.5 rounded-3xl border-2 text-left transition-all relative ${premiumCover ? "bg-amber-950/20 border-gold/70 shadow-lg shadow-gold/5" : "bg-white/5 border-white/10 hover:bg-white/8 hover:border-gold/30"}`}>
              <div className="flex items-start gap-3.5">
                <input
                  type="checkbox"
                  checked={premiumCover}
                  onChange={(e) => onTogglePremiumCover(e.target.checked)}
                  className="mt-1 w-4.5 h-4.5 accent-gold cursor-pointer"
                />
                <div className="flex-1 space-y-0.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-base">✨ Edição Premium Capa Dura (+ R$ 29,90)</span>
                    <span className="bg-gold/15 text-gold-light border border-gold/20 px-2 py-0.5 rounded-full text-[9px] font-black uppercase font-sans">IMPERDÍVEL</span>
                  </div>
                  <p className="text-xs text-purple-200/90 leading-relaxed font-semibold">
                    Capa dura laminada de altíssima gramatura, relevo brilhante macio e toque soft-touch aveludado resistente. Guarde por toda vida! 💖
                  </p>
                </div>
              </div>
            </label>

            {/* 2. Gift Wrapping Box (Presente) */}
            <label className={`block cursor-pointer p-4.5 rounded-3xl border-2 text-left transition-all ${giftWrapping ? "bg-pink-950/20 border-pink-500/70 shadow-lg" : "bg-white/5 border-white/10 hover:bg-white/8"}`}>
              <div className="flex items-start gap-3.5">
                <input
                  type="checkbox"
                  checked={giftWrapping}
                  onChange={(e) => onToggleGiftWrapping(e.target.checked)}
                  className="mt-1 w-4.5 h-4.5 accent-pink cursor-pointer"
                />
                <div className="flex-1 space-y-0.5">
                  <div className="flex items-center justify-between font-sans">
                    <span className="font-bold text-white text-base">🎁 Embalagem Especial para Presente (+ R$ 25,90)</span>
                    <span className="bg-pink-500/15 text-pink border border-pink-500/20 px-2 py-0.5 rounded-full text-[9px] font-black uppercase">ALTA EMOÇÃO</span>
                  </div>
                  <p className="text-xs text-purple-200/90 leading-relaxed font-semibold">
                    Inclui fita de cetim vermelha selada à mão, caixa premium cartonada com relevo e papel mágico de seda perfumado de morango.
                  </p>
                </div>
              </div>
            </label>

            {/* 3. Bedroom Poster */}
            <label className={`block cursor-pointer p-4.5 rounded-3xl border-2 text-left transition-all ${coverPoster ? "bg-sky-950/20 border-sky-400-500/70 shadow-lg" : "bg-white/5 border-white/10 hover:bg-white/8"}`}>
              <div className="flex items-start gap-3.5">
                <input
                  type="checkbox"
                  checked={coverPoster}
                  onChange={(e) => onToggleCoverPoster(e.target.checked)}
                  className="mt-1 w-4.5 h-4.5 accent-sky-400 cursor-pointer"
                />
                <div className="flex-1 space-y-0.5">
                  <div className="flex items-center justify-between font-sans">
                    <span className="font-bold text-white text-base">🖼 Pôster Exclusivo A4 da Capa (+ R$ 19,90)</span>
                    <span className="bg-sky-400/15 text-sky-400 border border-sky-400/20 px-2 py-0.5 rounded-full text-[9px] font-black uppercase">QUARTO INFANTIL</span>
                  </div>
                  <p className="text-xs text-purple-200/90 leading-relaxed font-medium">
                    Receba um pôster fotográfico A4 brilhante com a imagem customizada da capa e o nome do seu filho para decorar o quarto infantil!
                  </p>
                </div>
              </div>
            </label>

            {/* 4. Digital PDF Copy */}
            <label className={`block cursor-pointer p-4.5 rounded-3xl border-2 text-left transition-all ${digitalPdf ? "bg-emerald-950/20 border-emerald-500/70 shadow-lg" : "bg-white/5 border-white/10 hover:bg-white/8"}`}>
              <div className="flex items-start gap-3.5">
                <input
                  type="checkbox"
                  checked={digitalPdf}
                  onChange={(e) => onToggleDigitalPdf(e.target.checked)}
                  className="mt-1 w-4.5 h-4.5 accent-emerald-400 cursor-pointer"
                />
                <div className="flex-1 space-y-0.5">
                  <div className="flex items-center justify-between font-sans">
                    <span className="font-bold text-white text-base">📱 Versão Digital PDF de Alta Fidelidade (+ R$ 15,90)</span>
                    <span className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full text-[9px] font-black uppercase">MARGEM 100%</span>
                  </div>
                  <p className="text-xs text-purple-200/90 leading-relaxed font-semibold">
                    Acesso eterno no celular, Kindle, tablet ou computador. Perfeito para ler em viagens longas e guardar como backup eterno.
                  </p>
                </div>
              </div>
            </label>

          </div>

        </div>

        {/* Right Column: Values and Checkout Summary/Payment (Dynamic Math) */}
        <div className="lg:col-span-5 w-full space-y-6">
          
          {/* Emotional value checklists */}
          <div className="bg-white/95 backdrop-blur-md rounded-[22px] border border-white/60 p-6 shadow-xl space-y-4 text-slate-800 font-sans">
            <h3 className="font-serif font-black text-purple-dark text-lg border-b border-purple-light/10 pb-3 flex items-center gap-2">
              <Heart className="w-5 h-5 text-pink fill-current shrink-0" />
              <span>Selo de Excelência Encanta Livro:</span>
            </h3>

            <div className="space-y-3.5">
              {PREMIUM_VALUE_BULLETS.map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="bg-emerald-500 text-white rounded-full p-0.5 mt-0.5 flex-shrink-0 animate-pulse-glow">
                    <Check className="w-3.5 h-3.5 stroke-[3.5]" />
                  </div>
                  <div>
                    <h4 className="font-black text-purple-dark text-xs md:text-sm leading-tight">
                      {bullet.label}
                    </h4>
                    <p className="text-slate-500 text-[11px] mt-0.5 leading-relaxed font-semibold">
                      {bullet.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recalculated dynamic pricing block */}
          <div className="premium-glass-card rounded-[22px] p-6 shadow-2xl border border-white/60 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-gold/10 to-transparent pointer-events-none" />
            
            <div className="space-y-4 font-sans text-slate-800">
              <span className="text-xs font-black uppercase text-[#E8820A] tracking-wider block">Resumo do Pedido</span>
              
              {/* Line items math */}
              <div className="text-xs space-y-2 font-semibold">
                <div className="flex justify-between">
                  <span className="text-slate-500">1x Livro {finalProtagonist} (Base Premium):</span>
                  <span className="text-purple-dark font-black">R$ 157,00</span>
                </div>
                
                {includeSiblingBook && (
                  <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between text-pink-700 font-bold">
                    <span>1x Livro Adicional ({siblingName || "Irmão"}):</span>
                    <span>+ R$ 49,90</span>
                  </motion.div>
                )}

                {premiumCover && (
                  <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between text-purple font-bold">
                    <span>Upgrade Capa Dura Suprema:</span>
                    <span>+ R$ 29,90</span>
                  </motion.div>
                )}

                {giftWrapping && (
                  <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between text-purple font-bold">
                    <span>Embalagem Presente Fita/Caixa:</span>
                    <span>+ R$ 25,90</span>
                  </motion.div>
                )}

                {coverPoster && (
                  <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between text-purple font-bold">
                    <span>Pôster Quarto A4:</span>
                    <span>+ R$ 19,90</span>
                  </motion.div>
                )}

                {digitalPdf && (
                  <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between text-purple font-bold">
                    <span>Versão Digital PDF:</span>
                    <span>+ R$ 15,90</span>
                  </motion.div>
                )}

                <div className="flex justify-between text-slate-500 border-t border-purple-light/10 pt-2.5 mt-2.5">
                  <span>Frete de Envio:</span>
                  <span className="text-purple font-black text-[11px] uppercase bg-purple/10 px-2 py-0.5 rounded-full">Não incluso</span>
                </div>
              </div>

              {/* Final calculation segment */}
              <div className="border-t border-purple-light/10 pt-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-black text-slate-500 tracking-wider">TOTAL DO PEDIDO</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-purple-dark font-black text-xs">R$</span>
                    <span className="font-serif font-black text-purple text-4.5xl leading-none">
                      {totalPrice.toFixed(2)}
                    </span>
                    <span className="text-slate-500 text-xs line-through italic font-medium opacity-65 ml-1">
                      R$ {totalOriginal.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-emerald-600 text-[11px] font-extrabold mt-1">
                    🎉 Economia total de R$ {(totalOriginal - totalPrice).toFixed(2)}!
                  </p>
                </div>

                <div className="text-right bg-emerald-50 border border-emerald-200/50 p-2.5 rounded-xl">
                  <span className="text-[9px] text-emerald-800 font-black block leading-none">PARCELE EM ATÉ</span>
                  <span className="text-sm font-black text-emerald-600 block mt-0.5 leading-none">
                    10x R$ {(totalPrice / 10).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Delivery and Guarantee */}
              <div className="text-purple-700 bg-purple-500/8 border border-purple-500/10 p-3 rounded-2xl flex items-start gap-2.5">
                <span className="mt-0.5">🚛</span>
                <p className="text-[11px] font-bold leading-normal">
                  <span className="text-purple-800 block uppercase tracking-wider text-[10px]">CORREIOS / DISTRIBUIÇÃO</span>
                  O frete de envio não é gratuito e será calculado com base no seu CEP na etapa de postagem e rastreamento.
                </p>
              </div>

              {/* Guarantee */}
              <div className="border-t border-purple-light/10 pt-3 flex items-center gap-3 text-left">
                <ShieldCheck className="w-6 h-6 text-emerald-500 shrink-0" />
                <p className="text-slate-500 text-[10px] font-semibold leading-relaxed">
                  <strong>Garantia Estrita de Encanto:</strong> Amamos espalhar magia. Se seu livro tiver defeito físico de trânsito ou pintura, resolvemos ou estornamos 100% de imediato.
                </p>
              </div>
            </div>
          </div>

          {/* Checkout Submit Trigger Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={onFinalize}
            className="w-full bg-gradient-to-r from-gold to-[#E8820A] text-white font-black text-base py-4.5 rounded-2xl shadow-lg hover:shadow-gold/30 hover:shadow-2xl transition duration-200 uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer border border-gold-light/10 shadow-gold/15"
          >
            <Sparkles className="w-5 h-5 text-gold-light animate-pulse-glow animate-duration-1000" strokeWidth={3} />
            <span>🎁 FINALIZAR MEU LIVRO</span>
          </motion.button>

          {/* Checkout micro footnotes trust badges */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-purple-200 text-[10px] font-black opacity-80 pt-1 text-center">
            <span>🔒 PAGAMENTO CRIPTOGRAFADO SSL BLINDADO</span>
            <span className="hidden sm:inline">·</span>
            <span>⚡ POSTAGEM EXPRESSA SEGURA</span>
          </div>

        </div>

      </div>
    </div>
  );
};
