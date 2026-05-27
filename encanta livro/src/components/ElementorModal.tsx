import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Copy, Check, X, Code, ExternalLink, HelpCircle, Layers } from "lucide-react";

interface ElementorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ElementorModal: React.FC<ElementorModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [iframeHeight, setIframeHeight] = useState("720");

  const getEmbedUrl = () => {
    if (typeof window === "undefined") return "https://sua-url-aqui.com";
    let origin = window.location.origin;
    
    // Se estiver no ambiente de desenvolvimento da ferramenta, converte para o domínio público de compartilhamento (-pre-)
    // Isso evita o erro de "Conexão Recusada" (ERR_CONNECTION_REFUSED) no Elementor!
    if (origin.includes("ais-dev-")) {
      origin = origin.replace("ais-dev-", "ais-pre-");
    }
    // Sempre aponta para a raiz "/" para evitar erros de "Page not found / URL não encontrada"
    return origin + "/";
  };

  const appUrl = getEmbedUrl();

  const embedCode = `<iframe 
  src="${appUrl}" 
  width="100%" 
  height="${iframeHeight}px" 
  style="border: none; border-radius: 16px; min-height: ${iframeHeight}px; background: transparent;" 
  allow="camera; microphone; geolocation"
></iframe>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 30 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-2xl bg-slate-900 border border-purple-light/30 rounded-3xl p-6 md:p-8 text-left shadow-2xl z-10 text-white overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            {/* Glowing accents */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-purple-500/20 rounded-full blur-xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-pink-500/10 rounded-full blur-xl pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-purple/20 p-2 rounded-xl text-purple-light border border-purple-light/20">
                  <Layers className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white tracking-tight flex items-center gap-1.5">
                    Integração com WordPress / Elementor
                  </h3>
                  <p className="text-xs text-purple-200/70">Instale este fluxo de venda de livros no seu site</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="bg-white/5 hover:bg-white/15 hover:scale-105 active:scale-95 transition rounded-full p-2 text-white/70"
                id="close-elementor-modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content body */}
            <div className="space-y-6">
              {/* Step 1: Copy Code */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-purple-light uppercase tracking-wider flex items-center gap-1.5">
                    <Code className="w-4 h-4" /> 1. Código HTML para o Elementor
                  </label>
                  
                  {/* Height customizer */}
                  <div className="flex items-center gap-2 text-xs text-purple-200/60 font-semibold">
                    <span>Altura recomendada:</span>
                    <select
                      value={iframeHeight}
                      onChange={(e) => setIframeHeight(e.target.value)}
                      className="bg-slate-800 border border-white/10 rounded-md px-2 py-1 text-white outline-none focus:border-purple-light"
                    >
                      <option value="600">600px (Compacto)</option>
                      <option value="720">720px (Ideal)</option>
                      <option value="850">850px (Espaçoso)</option>
                      <option value="1000">1000px (Longo)</option>
                    </select>
                  </div>
                </div>

                <div className="relative">
                  <textarea
                    readOnly
                    value={embedCode}
                    className="w-full h-24 bg-black/40 text-purple-200/90 border border-white/10 rounded-2xl p-4 text-xs font-mono leading-relaxed outline-none resize-none focus:border-purple-light focus:ring-1 focus:ring-purple-light"
                  />
                  
                  <button
                    type="button"
                    onClick={copyToClipboard}
                    className="absolute bottom-3 right-3 bg-purple-600 hover:bg-purple-500 font-bold text-xs py-2 px-3.5 rounded-xl flex items-center gap-1.5 shadow transition-all active:scale-95 cursor-pointer text-white"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-300 stroke-[3]" />
                        Copiado!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        Copiar Código
                      </>
                    )}
                  </button>
                </div>

                {/* ⚠️ ERR_CONNECTION_REFUSED and Page Not Found explanation badge */}
                <div className="bg-amber-500/10 border border-amber-500/20 text-amber-200 rounded-2xl p-4 space-y-2 text-xs">
                  <div className="flex items-center gap-2 font-bold text-amber-300">
                    <span className="text-sm">⚠️</span>
                    <span>ATENÇÃO: Correção Automática para o Elementor</span>
                  </div>
                  <p className="leading-relaxed opacity-90 font-medium">
                    Dois pequenos detalhes importantes no WordPress/Elementor:
                  </p>
                  <ul className="list-disc list-inside space-y-1.5 opacity-90 font-medium pl-1">
                    <li>
                      <strong className="text-white">"Reprodutor Recusado" / "Conexão Recusada":</strong> Ocorre ao tentar embutir o link interno de edição <code className="bg-black/30 px-1 py-0.5 rounded text-amber-100 font-mono">ais-dev-...</code>.
                    </li>
                    <li>
                      <strong className="text-white">"Page not found" (Página não encontrada):</strong> Ocorre quando o Elementor tenta ler caminhos adicionais que não existem no nosso servidor estático.
                    </li>
                  </ul>
                  <p className="leading-relaxed opacity-90 font-medium mt-2">
                    O código HTML acima <strong className="text-emerald-300">já foi totalmente limpo e corrigido automaticamente</strong>! Ele agora utiliza o link de visualização público (<code className="bg-black/30 px-1 py-0.5 rounded text-emerald-100 font-mono">ais-pre-...</code>) e aponta diretamente para a raiz do criador, garantindo funcionamento 100% perfeito no Elementor.
                  </p>
                </div>
              </div>

              {/* Step 2: WordPress Step-by-Step */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5 space-y-4">
                <h4 className="text-xs font-bold text-purple-light uppercase tracking-wider flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4" /> Como instalar em 3 passos simples:
                </h4>
                
                <ol className="text-xs text-purple-200/80 space-y-3 list-decimal list-inside font-medium leading-relaxed">
                  <li>
                    <strong className="text-white">Adicione o widget HTML:</strong> No editor do <strong className="text-purple-300">Elementor</strong>, procure e arraste o widget <span className="bg-white/10 text-white px-1.5 py-0.5 rounded font-mono font-bold">HTML</span> ou <span className="bg-white/10 text-white px-1.5 py-0.5 rounded font-mono font-bold">Iframe</span> na seção desejada da sua página.
                  </li>
                  <li>
                    <strong className="text-white">Cole o código copiado:</strong> Cole o código gerado acima no painel do widget no WordPress. Ele exibirá o criador de livros automaticamente.
                  </li>
                  <li>
                    <strong className="text-white">Ajuste responsivo:</strong> Certifique-se de configurar a largura da seção para <span className="text-white font-bold">"Largura Total" (Full Width)</span> para que a experiência fique perfeita tanto em celulares quanto em computadores.
                  </li>
                </ol>
              </div>

              {/* Quick Preview Tips */}
              <div className="text-[11px] text-purple-200/50 italic flex items-start gap-1.5 bg-purple-950/20 border border-purple-900/40 p-3 rounded-xl font-medium">
                <span className="text-purple-light">💡</span>
                <p>
                  Dica: O design é 100% responsivo e herda o fundo translúcido para se misturar harmoniosamente com as cores da sua Landing Page do Elementor.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
