/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from "react";
import { ArrowLeft, Camera, UploadCloud, X, Sparkles, AlertCircle } from "lucide-react";
import { EMOTIONAL_MICROCOPIES } from "../data";
import { motion, AnimatePresence } from "motion/react";

interface PhotoStepProps {
  photo: string | null;
  onChangePhoto: (photo: string | null) => void;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
}

export const PhotoStep: React.FC<PhotoStepProps> = ({
  photo,
  onChangePhoto,
  onNext,
  onBack,
  onSkip,
}) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onChangePhoto(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onChangePhoto(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

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
          Etapa 3 de 5 · Ilustração de Referência
        </span>
        <h2 className="font-serif font-black text-white text-3xl md:text-4xl tracking-tight mb-2">
          Envie uma foto para referência 📸
        </h2>
        <p className="text-purple-100 text-sm md:text-base">
          Nossa equipe artística usará esta foto como modelo para deixar o herói do livro com as carinhas, cabelos e traços da criança!
        </p>
      </div>

      {/* Drag & Drop Canvas Wrapper Card */}
      <div 
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`w-full relative overflow-hidden rounded-[22px] border-2 border-dashed p-10 md:p-14 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center ${
          isDragActive 
            ? "border-gold bg-white/20 shadow-lg shadow-gold/10" 
            : photo 
              ? "border-purple-light/40 bg-white" 
              : "border-purple-light/25 bg-white/85 hover:border-purple-light/65 hover:bg-white"
        }`}
      >
        <input 
          ref={fileInputRef}
          type="file" 
          accept="image/*"
          onChange={handleFileChange}
          className="hidden" 
        />

        <AnimatePresence mode="wait">
          {photo ? (
            <motion.div 
              key="preview"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="flex flex-col items-center gap-4"
              onClick={(e) => e.stopPropagation()} // Stop propagation from triggering file input click
            >
              <div className="relative">
                <img 
                  src={photo} 
                  alt="Previa do protagonista infantil" 
                  className="w-36 h-36 border-4 border-purple-light object-cover rounded-full shadow-2xl"
                />
                <button
                  type="button"
                  onClick={() => onChangePhoto(null)}
                  className="absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 shadow-lg transition"
                >
                  <X className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>

              <div className="text-center font-extrabold text-sm text-pink flex items-center gap-1.5 justify-center">
                <Sparkles className="w-4 h-4 text-pink shrink-0 animate-pulse-glow" />
                <span>{EMOTIONAL_MICROCOPIES.afterPhoto}</span>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="prompt"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="flex flex-col items-center"
            >
              <div className="bg-purple/10 text-purple p-4 rounded-full mb-4 animate-magical-float">
                <Camera className="w-10 h-10 stroke-[1.8]" />
              </div>
              <h3 className="text-purple-dark text-lg font-black mb-1.5">
                Arraste uma foto aqui ou clique para selecionar
              </h3>
              <p className="text-purple-light text-xs font-semibold max-w-sm mb-4">
                Formatos JPG, PNG ou WEBP em alta definição · Até 10MB
              </p>
              
              <div className="flex items-center gap-1.5 px-4.5 py-2.5 rounded-full border bg-slate-50 text-slate-700 hover:bg-slate-100 transition-all shadow-sm">
                <UploadCloud className="w-4 h-4" />
                <span className="text-xs font-black uppercase tracking-wider">Carregar imagem</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Trust check badge details */}
      <div className="bg-white/10 text-purple-100 p-3.5 rounded-xl border border-white/10 w-full mb-8 flex items-start gap-2.5">
        <AlertCircle className="w-5 h-5 text-gold shrink-0 mt-0.5" />
        <span className="text-xs md:text-sm font-semibold text-left leading-relaxed">
          <strong>Aviso de privacidade:</strong> Suas fotos são usadas estritamente para ilustração interna e apagadas de nossos servidores logo após a conclusão mecânica e encadernamento do livro.
        </span>
      </div>

      {/* Button controls */}
      <div className="w-full max-w-sm flex flex-col items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNext}
          className="w-full bg-gradient-to-r from-pink to-[#E8820A] text-white font-black text-lg py-4.5 rounded-full shadow-lg hover:shadow-pink/35 hover:shadow-xl transition duration-200 uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>{photo ? "FOTO CARREGADA, CONTINUAR →" : "CONTINUAR SEM FOTO →"}</span>
        </motion.button>
        
        {!photo && (
          <button 
            type="button"
            onClick={onSkip}
            className="text-purple-100/70 hover:text-white underline text-sm font-bold transition duration-150 cursor-pointer py-1"
          >
            Pular esta etapa e criar com ilustrações clássicas
          </button>
        )}
      </div>
    </div>
  );
};
