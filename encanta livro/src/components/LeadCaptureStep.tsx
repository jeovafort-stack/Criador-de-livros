/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Mail, Phone, ShieldCheck, Sparkles, Check, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

interface LeadCaptureStepProps {
  childName: string;
  email: string;
  onChangeEmail: (email: string) => void;
  whatsapp: string;
  onChangeWhatsapp: (whatsapp: string) => void;
  onSubmit: () => void;
}

export const LeadCaptureStep: React.FC<LeadCaptureStepProps> = ({
  childName,
  email,
  onChangeEmail,
  whatsapp,
  onChangeWhatsapp,
  onSubmit,
}) => {
  const [errorLocal, setErrorLocal] = useState("");
  const chosenName = childName || "sua criança";

  const handleValidationAndSubmission = () => {
    if (!email.trim() && !whatsapp.trim()) {
      setErrorLocal("Por favor, preencha pelo menos um campo para podermos enviar sua prévia mágica! 💛");
      return;
    }
    
    // Simple email validation if filled
    if (email.trim() && !email.includes("@")) {
      setErrorLocal("Por favor, insira um endereço de e-mail válido ✉️");
      return;
    }

    setErrorLocal("");
    onSubmit();
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 md:px-6 py-6 flex flex-col items-center">
      {/* Header and Step Indicator (Req #4 - DISFARÇAR CAPTURA) */}
      <div className="text-center mb-8">
        <span className="text-xs font-black uppercase tracking-widest text-gold bg-gold/15 px-3.5 py-1.5 rounded-full inline-block mb-3 border border-gold/10">
          Etapa 5 de 5 · Preparando Envio
        </span>
        <h2 className="font-serif font-black text-white text-3xl md:text-4xl tracking-tight leading-tight mb-2.5">
          Sua história está quase pronta ✨
        </h2>
        <p className="text-gold-light text-base md:text-lg font-bold max-w-sm mx-auto p-1 text-center bg-white/10 rounded-xl px-4 border border-white/5 py-1.5 shadow-sm">
          Só falta para onde vamos enviar a prévia mágica 💖
        </p>
      </div>

      {/* Disguised Form Card with Premium Glass Styling */}
      <div className="w-full premium-glass-card rounded-[22px] p-6 md:p-8 shadow-2xl border border-white/50 mb-6 space-y-5.5 relative">
        <div className="space-y-4">
          
          {/* Email input field */}
          <div>
            <label htmlFor="lead-email-input" className="block text-purple-dark font-black tracking-wide text-xs uppercase mb-1.5">
              ✉️ Endereço de e-mail principal
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-light w-5 h-5" />
              <input
                id="lead-email-input"
                type="email"
                value={email}
                onChange={(e) => onChangeEmail(e.target.value)}
                placeholder="Ex: mae@exemplo.com.br"
                className="w-full bg-white/70 text-purple-dark text-sm md:text-base font-extrabold pl-12 pr-4 py-4 rounded-xl border-2 border-purple-light/20 focus:border-purple focus:ring-0 focus:outline-none transition-all placeholder:text-purple-light/40"
              />
            </div>
            <p className="text-slate-500 text-[11px] font-semibold mt-1">
              Enviaremos o rascunho em PDF completo em alta resolução para este e-mail.
            </p>
          </div>

          {/* WhatsApp / Mobile input field */}
          <div>
            <label htmlFor="lead-phone-input" className="block text-purple-dark font-black tracking-wide text-xs uppercase mb-1.5">
              📱 WhatsApp habilitado com DDD
            </label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-light w-5 h-5" />
              <input
                id="lead-phone-input"
                type="tel"
                value={whatsapp}
                onChange={(e) => onChangeWhatsapp(e.target.value)}
                placeholder="Ex: (11) 99999-9999"
                className="w-full bg-white/70 text-purple-dark text-sm md:text-base font-extrabold pl-12 pr-4 py-4 rounded-xl border-2 border-purple-light/20 focus:border-purple focus:ring-0 focus:outline-none transition-all placeholder:text-purple-light/40"
              />
            </div>
            <p className="text-slate-500 text-[11px] font-semibold mt-1">
              Enviaremos avisos de entrega, status de impressão e bônus no WhatsApp.
            </p>
          </div>

        </div>

        {/* Error notification display */}
        {errorLocal && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3.5 bg-red-50 border-l-4 border-red-500 rounded-xl text-red-700 text-xs font-bold leading-relaxed"
          >
            {errorLocal}
          </motion.div>
        )}

        {/* Highlight details indicators */}
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex md:items-center gap-2.5">
          <div className="bg-emerald-500 text-white rounded-full p-0.5 shrink-0 mt-0.5 md:mt-0">
            <Check className="w-3.5 h-3.5 stroke-[3px]" />
          </div>
          <span className="text-slate-600 text-[11px] md:text-xs font-semibold text-left">
            Pronto! Com esses dados enviaremos as primeiras páginas inteiramente em cores simulando o nome da <strong>{chosenName}</strong>!
          </span>
        </div>
      </div>

      {/* Action / continue details */}
      <div className="w-full max-w-sm flex flex-col items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleValidationAndSubmission}
          className="w-full bg-gradient-to-r from-pink to-[#E8820A] text-white font-black text-lg py-4.5 rounded-full shadow-lg hover:shadow-pink/35 hover:shadow-xl transition duration-200 uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>💖 QUERO RECEBER A PRÉVIA</span>
          <ArrowRight className="w-4 h-4 stroke-[3px]" />
        </motion.button>
        
        <p className="text-purple-200/70 text-2xs md:text-xs flex items-center justify-center gap-1.5 font-medium leading-none mt-1">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          Seus dados estão 100% seguros e protegidos contra Spam.
        </p>
      </div>
    </div>
  );
};
