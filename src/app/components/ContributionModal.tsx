'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, CheckCircle2, UploadCloud } from 'lucide-react';
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
  const [step, setStep] = useState<'amount' | 'pix' | 'form' | 'success'>('amount');
  const [pixString, setPixString] = useState('');
  const [copied, setCopied] = useState(false);
  
  // Form state
  const [guestName, setGuestName] = useState('');
  const [receiptFile, setReceiptFile] = useState<File | null>(null);

  if (!gift) return null;

  const handleGeneratePix = () => {
    const finalAmount = amount || gift.totalAmount;
    // USING MOCK PIX KEY FOR DEMO
    const pixKey = 'alineeklecio@casamento.com';
    const payload = generatePixPayload(pixKey, 'Aline e Klecio', 'SAO PAULO', Number(finalAmount), `GIFT${gift.id}`);
    
    setPixString(payload);
    setStep('pix');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(pixString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGoToForm = () => {
    setStep('form');
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would upload the file to a server or Firebase here
    setStep('success');
  };

  const handleComplete = () => {
    const finalAmount = amount || gift.totalAmount;
    onSuccess(Number(finalAmount));
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-[var(--background)] rounded-2xl w-full max-w-md shadow-2xl overflow-hidden relative max-h-[90vh] overflow-y-auto"
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
              Valor do presente: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(gift.totalAmount)}
            </p>

            {step === 'amount' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)]/80 mb-2">
                    Qual valor deseja contribuir?
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setAmount(gift.totalAmount)}
                      className={`flex-1 py-3 px-4 rounded-xl border transition-all ${
                        amount === gift.totalAmount 
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
                  disabled={!amount && amount !== 0}
                  className="w-full py-4 mt-4 bg-[var(--foreground)] text-[var(--background)] rounded-xl font-medium hover:bg-[var(--foreground)]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Gerar PIX
                </button>
              </motion.div>
            )}

            {step === 'pix' && (
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
                  onClick={handleGoToForm}
                  className="w-full py-4 bg-[var(--color-wedding-gold)] text-white rounded-xl font-medium hover:bg-[var(--color-wedding-gold)]/90 transition-all transform hover:-translate-y-0.5 shadow-md shadow-[var(--color-wedding-gold)]/20"
                >
                  Já realizei o pagamento
                </button>
              </motion.div>
            )}

            {step === 'form' && (
              <motion.form 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleSubmitForm}
                className="space-y-4"
              >
                <div className="text-center mb-6">
                  <h4 className="text-lg font-medium text-[var(--foreground)]">Confirmação de Pagamento</h4>
                  <p className="text-sm text-[var(--foreground)]/60">Por favor, envie o comprovante para identificarmos o seu presente.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)]/80 mb-2">
                    Seu Nome Completo
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Como devemos lhe agradecer?"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[var(--color-wedding-gold)] focus:ring-1 focus:ring-[var(--color-wedding-gold)] transition-all bg-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)]/80 mb-2">
                    Comprovante do PIX
                  </label>
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <UploadCloud className="w-8 h-8 mb-2 text-gray-400" />
                      <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Clique para anexar</span> ou arraste a imagem
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG ou PDF</p>
                    </div>
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*,.pdf"
                      required
                      onChange={(e) => setReceiptFile(e.target.files?.[0] || null)}
                    />
                  </label>
                  {receiptFile && (
                    <p className="mt-2 text-sm text-[var(--color-wedding-gold)] truncate">
                      Arquivo selecionado: {receiptFile.name}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-4 mt-4 bg-[var(--foreground)] text-[var(--background)] rounded-xl font-medium hover:bg-[var(--foreground)]/90 transition-colors"
                >
                  Enviar Comprovante
                </button>
              </motion.form>
            )}

            {step === 'success' && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-8 text-center"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
                <h4 className="text-2xl font-serif text-[var(--foreground)] mb-2">Muito Obrigado!</h4>
                <p className="text-[var(--foreground)]/70 mb-8 px-4">
                  Recebemos seu comprovante, {guestName}. Seu carinho é muito importante para nós!
                </p>
                <button
                  onClick={handleComplete}
                  className="w-full py-4 bg-[var(--color-wedding-gold)] text-white rounded-xl font-medium hover:bg-[var(--color-wedding-gold)]/90 transition-all"
                >
                  Voltar para os presentes
                </button>
              </motion.div>
            )}

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
