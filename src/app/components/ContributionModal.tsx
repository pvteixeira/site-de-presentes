'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, CheckCircle2 } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { generatePixPayload } from '../utils/pix';
import type { Gift } from '../types';

interface ContributionModalProps {
  gift: Gift | null;
  onClose: () => void;
  onSuccess: (amount: number) => void;
}

export default function ContributionModal({ gift, onClose, onSuccess }: ContributionModalProps) {
  const [amount, setAmount] = useState<number | ''>('');
  const [isPixGenerated, setIsPixGenerated] = useState(false);
  const [pixString, setPixString] = useState('');
  const [copied, setCopied] = useState(false);

  if (!gift) return null;

  const remaining = gift.totalAmount - gift.currentAmount;

  const handleGeneratePix = () => {
    const finalAmount = amount || remaining;
    // USING MOCK PIX KEY FOR DEMO
    const pixKey = 'alineeklecio@casamento.com';
    const payload = generatePixPayload(pixKey, 'Aline e Klecio', 'SAO PAULO', Number(finalAmount), `GIFT${gift.id}`);
    
    setPixString(payload);
    setIsPixGenerated(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(pixString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleComplete = () => {
    const finalAmount = amount || remaining;
    onSuccess(Number(finalAmount));
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-[var(--background)] rounded-2xl w-full max-w-md shadow-2xl overflow-hidden relative"
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-[var(--foreground)]/50 hover:text-[var(--foreground)] bg-white/50 rounded-full transition-colors z-10"
          >
            <X size={20} />
          </button>

          <div className="h-32 bg-gray-200 relative">
            <img 
              src={gift.imageUrl} 
              alt={gift.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] to-transparent"></div>
          </div>

          <div className="p-6 pt-2">
            <h3 className="text-2xl font-serif text-[var(--foreground)] mb-1">{gift.name}</h3>
            <p className="text-sm text-[var(--foreground)]/60 mb-6 font-sans">
              Valor restante: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(remaining)}
            </p>

            {!isPixGenerated ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)]/80 mb-2">
                    Qual valor deseja contribuir?
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setAmount(remaining)}
                      className={`flex-1 py-3 px-4 rounded-xl border transition-all ${
                        amount === remaining 
                          ? 'border-[var(--color-wedding-gold)] bg-[var(--color-wedding-gold)]/10 text-[var(--color-wedding-gold)]' 
                          : 'border-gray-200 hover:border-[var(--color-wedding-gold)]/50'
                      }`}
                    >
                      Valor Total
                    </button>
                    <div className="flex-1 relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                      <input
                        type="number"
                        placeholder="Outro valor"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[var(--color-wedding-gold)] focus:ring-1 focus:ring-[var(--color-wedding-gold)] transition-all bg-transparent"
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleGeneratePix}
                  disabled={!amount && amount !== 0 && remaining > 0}
                  className="w-full py-4 mt-4 bg-[var(--foreground)] text-[var(--background)] rounded-xl font-medium hover:bg-[var(--foreground)]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Gerar PIX
                </button>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center space-y-6"
              >
                <div className="p-4 bg-white rounded-2xl shadow-inner">
                  <QRCodeSVG value={pixString} size={200} />
                </div>
                
                <div className="w-full">
                  <button
                    onClick={handleCopy}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-[var(--color-wedding-gold)] rounded-xl text-[var(--color-wedding-gold)] hover:bg-[var(--color-wedding-gold)]/5 transition-colors"
                  >
                    {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                    {copied ? 'Código copiado!' : 'Copiar código PIX'}
                  </button>
                </div>

                <button
                  onClick={handleComplete}
                  className="w-full py-4 bg-[var(--color-wedding-gold)] text-white rounded-xl font-medium hover:bg-[var(--color-wedding-gold)]/90 transition-all transform hover:-translate-y-0.5 shadow-md shadow-[var(--color-wedding-gold)]/20"
                >
                  Já realizei o pagamento
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
