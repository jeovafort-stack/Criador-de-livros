/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { ThemeOption } from "./types";
import { THEME_OPTIONS, IMAGES } from "./data";
import { Confetti } from "./components/Confetti";
import { HeroStep } from "./components/HeroStep";
import { ThemeSelectionStep } from "./components/ThemeSelectionStep";
import { ProtagonistStep } from "./components/ProtagonistStep";
import { SiblingUpsellStep } from "./components/SiblingUpsellStep";
import { PhotoStep } from "./components/PhotoStep";
import { ReaderStep } from "./components/ReaderStep";
import { CreationReviewStep } from "./components/CreationReviewStep";
import { LeadCaptureStep } from "./components/LeadCaptureStep";
import { CheckoutStep } from "./components/CheckoutStep";
import { ElementorModal } from "./components/ElementorModal";
import { Sparkles, Star, ChevronLeft, ChevronRight, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  // Step list: 1=Hero, 2=Theme, 3=Protagonist, 4=Sibling Book (Upsell), 5=Photo, 6=Reader, 7=Review/Hardcover (Upsell), 8=LeadCapture, 9=Checkout/All Upgrades (Upsells)
  const [step, setStep] = useState<number>(1);

  // User configuration states
  const [themeId, setThemeId] = useState<string>("");
  const [themeEmoji, setThemeEmoji] = useState<string>("🦁");
  const [themeLabel, setThemeLabel] = useState<string>("Reino Encantado");
  const [themeImage, setThemeImage] = useState<string>(IMAGES.previewLeoBed);

  const [childName, setChildName] = useState<string>("");
  const [ageId, setAgeId] = useState<string>("");
  const [favoriteColor, setFavoriteColor] = useState<string>("");
  const [traits, setTraits] = useState<string[]>([]);
  const [photo, setPhoto] = useState<string | null>(null);
  const [reader, setReader] = useState<string>("");

  const [email, setEmail] = useState<string>("");
  const [whatsapp, setWhatsapp] = useState<string>("");

  // ─── UPSELL STATES ───
  // 1. Sibling Book (Durante o Funil - Depois da Personalização)
  const [includeSiblingBook, setIncludeSiblingBook] = useState<boolean>(false);
  const [siblingName, setSiblingName] = useState<string>("");
  const [siblingAge, setSiblingAge] = useState<string>("");
  const [siblingTraits, setSiblingTraits] = useState<string[]>([]);

  // 2. Capa Premium (Durante o Funil - Livro de Luxo Review)
  const [premiumCover, setPremiumCover] = useState<boolean>(false);

  // 3. Dedicatória dos Pais (Checkout)
  const [customDedication, setCustomDedication] = useState<boolean>(false);
  const [dedicationText, setDedicationText] = useState<string>("");

  // 4. Checkout Addons
  const [giftWrapping, setGiftWrapping] = useState<boolean>(false);
  const [coverPoster, setCoverPoster] = useState<boolean>(false);
  const [heroCertificate, setHeroCertificate] = useState<boolean>(false);
  const [digitalPdf, setDigitalPdf] = useState<boolean>(false);

  // Confetti triggering state
  const [isConfettiActive, setIsConfettiActive] = useState<boolean>(false);
  const [isElementorOpen, setIsElementorOpen] = useState<boolean>(false);
  const [showElementorTrigger, setShowElementorTrigger] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname;
      // Exibe apenas em ambientes de teste/desenvolvimento do AI Studio ou localmente
      const isWorkspace = 
        hostname.includes("ais-dev-") || 
        hostname.includes("ais-pre-") || 
        hostname.includes("localhost") || 
        hostname.includes("127.0.0.1");
      setShowElementorTrigger(isWorkspace);
    }
  }, []);

  // Calculate progress bar width percentage (Step 1 doesn't count, Step 2-9 covers 0-100%)
  const maxFormSteps = 8; // Steps 2 to 9
  const currentProgressPct = step === 1 ? 0 : Math.ceil(((step - 1) / maxFormSteps) * 100);

  // Helper to handle theme selection & transition to State
  const handleSelectTheme = (theme: ThemeOption) => {
    setThemeId(theme.id);
    setThemeEmoji(theme.emoji);
    setThemeLabel(theme.label);
    setThemeImage(theme.previewImage);
    triggerConfetti();
  };

  const triggerConfetti = () => {
    setIsConfettiActive(true);
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    if (audioContext) {
      // Play a little fairy chime!
      try {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.connect(gain);
        gain.connect(audioContext.destination);
        osc.type = "sine";
        osc.frequency.setValueAtTime(880, audioContext.currentTime); // A5
        osc.frequency.exponentialRampToValueAtTime(1760, audioContext.currentTime + 0.35); // A6
        gain.gain.setValueAtTime(0.08, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.45);
        osc.start();
        osc.stop(audioContext.currentTime + 0.5);
      } catch (err) {
        // Safe catch for browser gesture requirements
      }
    }
  };

  // Turn off confetti after a burst
  useEffect(() => {
    if (isConfettiActive) {
      const timer = setTimeout(() => setIsConfettiActive(false), 3500);
      return () => clearTimeout(timer);
    }
  }, [isConfettiActive]);

  // Navigate to steps
  const nextStep = () => {
    setStep((prev) => Math.min(prev + 1, 9));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Skip photo and directly advance
  const skipPhotoAndNext = () => {
    setPhoto(null);
    nextStep();
  };

  // Toggle trait chip selection
  const handleToggleTrait = (traitId: string) => {
    setTraits((prev) => {
      if (prev.includes(traitId)) {
        return prev.filter((id) => id !== traitId);
      } else {
        return [...prev, traitId];
      }
    });
  };

  // Sibling trait chip selection toggle helper
  const handleToggleSiblingTrait = (traitId: string) => {
    setSiblingTraits((prev) => {
      if (prev.includes(traitId)) {
        return prev.filter((id) => id !== traitId);
      } else if (prev.length < 3) {
        return [...prev, traitId];
      }
      return prev;
    });
  };

  // Final purchase confirmation
  const handleFinalize = () => {
    triggerConfetti();
    
    // Rich analytical breakdown alerts to keep alignment flawless
    let alertText = `🎉 Seu livro personalizado de ${childName || "sua criança"} foi enviado para confecção!\n\n`;
    
    if (includeSiblingBook) {
      alertText += `✨ Kit Duplo Ativado! Livro adicional do(a) irmão(a) ${siblingName || "Gabriel"} também incluso.\n`;
    }
    if (premiumCover) {
      alertText += `✨ Upgrade Edição Capa Dura Suprema ativo!\n`;
    }
    if (customDedication) {
      alertText += `💌 Dedicatória personalizada inclusa no início do livro!\n`;
    }
    if (giftWrapping) {
      alertText += `🎁 Embalagem especial luxo ativa para presente!\n`;
    }
    if (coverPoster) {
      alertText += `🖼 Pôster de parede A4 exclusivo incluso!\n`;
    }
    if (heroCertificate) {
      alertText += `🏅 Certificado oficial de leitor ativado!\n`;
    }
    if (digitalPdf) {
      alertText += `📱 Cópia digital PDF imediata inclusa!\n`;
    }

    alertText += `\nEnviamos o resumo financeiro estruturado para ${email || "seu e-mail"}.\n\n` +
      `Nosso setor comercial de suporte criativo entrará em contato via WhatsApp (${whatsapp || "seu número"}) para validar cada detalhe artístico antes de imprimir. Parabéns por semear esse carinho! 💛`;
      
    alert(alertText);
  };

  return (
    <div className="relative min-h-screen deep-sparkle-bg text-white overflow-hidden flex flex-col justify-between">
      
      {/* ─── CANVAS CONFETTI INJECTIONS ─── */}
      <Confetti active={isConfettiActive} type="burst" />

      {/* ─── AMBIENT LAYERS & DEPTH GLOWS (Req #7 - FUNDO COM PROFUNDIDADE) ─── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[5%] w-[40vw] h-[40vw] bg-purple-light/20 blur-[130px] rounded-full animate-pulse-glow" style={{ animationDuration: "12s" }} />
        <div className="absolute bottom-[20%] right-[5%] w-[35vw] h-[35vw] bg-pink/15 blur-[120px] rounded-full animate-pulse-glow" style={{ animationDuration: "18s" }} />
        <div className="absolute top-[50%] left-[45%] w-[300px] h-[300px] bg-gold/5 blur-[100px] rounded-full animate-slow-rotate" />
        
        {/* Scattered twinkle stars */}
        {[...Array(24)].map((_, i) => {
          const top = Math.random() * 95;
          const left = Math.random() * 95;
          const size = Math.random() * 4 + 1.5;
          const delay = Math.random() * 3;
          return (
            <span
              key={i}
              className="absolute bg-white rounded-full opacity-65 twinkle-star pointer-events-none"
              style={{
                top: `${top}%`,
                left: `${left}%`,
                width: `${size}px`,
                height: `${size}px`,
                animationDelay: `${delay}s`,
                boxShadow: size > 3 ? "0 0 10px rgba(255, 255, 255, 0.8)" : "none",
              }}
            />
          );
        })}
      </div>

      {/* ─── NAVIGATION BAR AND PROGRESS (Hidden on Step 1) ─── */}
      {step > 1 && (
        <header className="relative z-20 w-full pt-6 px-4 md:px-8 max-w-5xl mx-auto flex flex-col gap-4">
          <div className="flex items-center justify-between w-full">
            <button 
              onClick={() => setStep(1)}
              className="flex items-center gap-2 hover:opacity-85 transition cursor-pointer"
            >
              <img 
                src={IMAGES.logo} 
                className="h-10 object-contain drop-shadow" 
                alt="Encanta Livro Logo Header"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }}
              />
            </button>

            {/* Custom Interactive Step Number Dot Matrix */}
            <div className="flex items-center gap-2">
              {[2, 3, 4, 5, 6, 7, 8, 9].map((sIndex) => {
                const isCompleted = sIndex < step;
                const isCurrent = sIndex === step;
                return (
                  <button
                    key={sIndex}
                    onClick={() => {
                      // Allow jumping backward to previously fulfilled steps or steps that have inputs
                      if (sIndex < step || (sIndex === 3 && themeId) || (sIndex === 5 && childName)) {
                        setStep(sIndex);
                      }
                    }}
                    className={`w-3.5 h-3.5 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isCompleted 
                        ? "bg-emerald-500 scale-100 shadow" 
                        : isCurrent 
                          ? "bg-gold scale-125 ring-4 ring-gold/25" 
                          : "bg-white/15 hover:bg-white/30"
                    }`}
                    title={`Passo ${sIndex - 1}`}
                  />
                );
              })}
            </div>
          </div>

          {/* Progress bar scale container */}
          <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden border border-white/5 shadow-inner">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${currentProgressPct}%` }}
              transition={{ type: "spring", stiffness: 60, damping: 15 }}
              className="h-full bg-gradient-to-r from-gold via-pink to-purple-light rounded-full"
            />
          </div>
        </header>
      )}

      {/* ─── WIZARD STEPS RENDERER ─── */}
      <main className="relative z-10 w-full flex-grow flex items-center justify-center py-6 font-sans">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="w-full flex justify-center"
          >
            {step === 1 && <HeroStep onStart={() => setStep(2)} />}
            
            {step === 2 && (
              <ThemeSelectionStep
                selectedThemeId={themeId}
                onSelectTheme={handleSelectTheme}
                onNext={nextStep}
                onBack={prevStep}
              />
            )}

            {step === 3 && (
              <ProtagonistStep
                childName={childName}
                onChangeName={setChildName}
                selectedAgeId={ageId}
                onSelectAge={setAgeId}
                favoriteColor={favoriteColor}
                onSelectColor={setFavoriteColor}
                selectedTraits={traits}
                onToggleTrait={handleToggleTrait}
                onNext={nextStep}
                onBack={prevStep}
              />
            )}

            {step === 4 && (
              <SiblingUpsellStep
                includeSiblingBook={includeSiblingBook}
                onToggleSibling={setIncludeSiblingBook}
                siblingName={siblingName}
                onChangeSiblingName={setSiblingName}
                siblingAge={siblingAge}
                onSelectSiblingAge={setSiblingAge}
                siblingTraits={siblingTraits}
                onToggleSiblingTrait={handleToggleSiblingTrait}
                onNext={nextStep}
                onBack={prevStep}
                primaryChildName={childName}
              />
            )}

            {step === 5 && (
              <PhotoStep
                photo={photo}
                onChangePhoto={setPhoto}
                onNext={nextStep}
                onBack={prevStep}
                onSkip={skipPhotoAndNext}
              />
            )}

            {step === 6 && (
              <ReaderStep
                childName={childName}
                selectedReaderId={reader}
                onSelectReader={setReader}
                onNext={nextStep}
                onBack={prevStep}
              />
            )}

            {step === 7 && (
              <CreationReviewStep
                childName={childName}
                themeId={themeId}
                ageId={ageId}
                readerId={reader}
                onNext={nextStep}
                premiumCover={premiumCover}
                onTogglePremiumCover={setPremiumCover}
              />
            )}

            {step === 8 && (
              <LeadCaptureStep
                childName={childName}
                email={email}
                onChangeEmail={setEmail}
                whatsapp={whatsapp}
                onChangeWhatsapp={setWhatsapp}
                onSubmit={nextStep}
              />
            )}

            {step === 9 && (
              <CheckoutStep
                childName={childName}
                themeLabel={themeLabel}
                themeEmoji={themeEmoji}
                themeImage={themeImage}
                ageRange={ageId}
                traits={traits}
                reader={reader}
                favoriteColor={favoriteColor}
                onFinalize={handleFinalize}
                
                includeSiblingBook={includeSiblingBook}
                siblingName={siblingName}
                siblingAge={siblingAge}
                siblingTraits={siblingTraits}
                
                premiumCover={premiumCover}
                onTogglePremiumCover={setPremiumCover}
                
                customDedication={customDedication}
                onToggleDedication={setCustomDedication}
                dedicationText={dedicationText}
                onChangeDedicationText={setDedicationText}
                
                giftWrapping={giftWrapping}
                onToggleGiftWrapping={setGiftWrapping}
                
                coverPoster={coverPoster}
                onToggleCoverPoster={setCoverPoster}
                
                heroCertificate={heroCertificate}
                onToggleHeroCertificate={setHeroCertificate}
                
                digitalPdf={digitalPdf}
                onToggleDigitalPdf={setDigitalPdf}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ─── BRAND FOOTER ─── */}
      <footer className="relative z-10 w-full border-t border-white/5 py-6 text-center text-purple-200/50 text-[11px] font-bold tracking-wider space-y-1">
        <p>© 2026 ENCANTA LIVRO LITERATURA INFANTIL LTDA. TODOS OS DIREITOS RESERVADOS.</p>
        <p>CNPJ 24.582.112/0001-99 · FEITO COM AMOR NO BRASIL 🇧🇷</p>
      </footer>

      {/* 🔌 WordPress & Elementor Integration Floating Trigger */}
      {showElementorTrigger && (
        <>
          <button
            type="button"
            id="elementor-trigger-btn"
            onClick={() => setIsElementorOpen(true)}
            className="fixed bottom-4 left-4 z-40 bg-gradient-to-r from-purple to-purple-light hover:from-purple-light hover:to-pink text-white text-[11px] font-bold py-2 px-3.5 rounded-full shadow-lg border border-white/10 backdrop-blur transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-1.5 cursor-pointer"
          >
            <span className="text-sm">🔌</span> Enviar para Elementor
          </button>

          {/* Elementor Modal Render */}
          <ElementorModal isOpen={isElementorOpen} onClose={() => setIsElementorOpen(false)} />
        </>
      )}
      
    </div>
  );
}
