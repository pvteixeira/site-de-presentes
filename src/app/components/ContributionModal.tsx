'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, CheckCircle2, UploadCloud, User, Mail, DollarSign, Sparkles } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { generatePixPayload, OFFICIAL_PIX_KEY, BENEFICIARY_NAME } from '../utils/pix';
import type { Gift } from '../types';

interface ContributionModalProps {
  gift: Gift | null;
  onClose: () => void;
  onSuccess: (amount: number) => void;
}

export default function ContributionModal({ gift, onClose, onSuccess }: ContributionModalProps) {
  const [step, setStep] = useState<'amount' | 'pix' | 'form' | 'success'>('amount');
  const [pixString, setPixString] = useState('');
  const [copiedPayload, setCopiedPayload] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);
  
  // Form state
  const [guestName, setGuestName] = useState('');
  const [receiptFile, setReceiptFile] = useState<File | null>(null);

  if (!gift) return null;

  const handleGeneratePix = () => {
    const payload = generatePixPayload(
      OFFICIAL_PIX_KEY,
      'ALINE_TEIXEIRA_BRUNO_SILV',
      'OLINDA',
      gift.totalAmount,
      'CasamentoAlineeKlcio'
    );
    setPixString(payload);
    setStep('pix');
  };

  const handleCopyPayload = () => {
    const payloadToCopy = pixString || generatePixPayload(
      OFFICIAL_PIX_KEY,
      'ALINE_TEIXEIRA_BRUNO_SILV',
      'OLINDA',
      gift.totalAmount,
      'CasamentoAlineeKlcio'
    );
    navigator.clipboard.writeText(payloadToCopy);
    setCopiedPayload(true);
    setTimeout(() => setCopiedPayload(false), 2500);
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(OFFICIAL_PIX_KEY);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2500);
  };

  const handleGoToForm = () => {
    setStep('form');
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;

    const saveContribution = (receiptDataUrl?: string) => {
      const newContrib = {
        id: Date.now().toString(),
        giftId: gift.id,
        giftName: gift.name,
        guestName: guestName.trim(),
        amount: gift.totalAmount,
        date: new Date().toLocaleString('pt-BR'),
        receiptUrl: receiptDataUrl || '',
        receiptName: receiptFile?.name || 'Comprovante_PIX.png'
      };

      try {
        const stored = JSON.parse(localStorage.getItem('pix_contributions') || '[]');
        localStorage.setItem('pix_contributions', JSON.stringify([newContrib, ...stored]));
      } catch (err) {
        console.error(err);
      }
      setStep('success');
    };

    if (receiptFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        saveContribution(reader.result as string);
      };
      reader.readAsDataURL(receiptFile);
    } else {
      saveContribution();
    }
  };

  const handleComplete = () => {
    onSuccess(gift.totalAmount);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-[var(--background)] rounded-2xl w-full max-w-md shadow-xl border border-gray-200 dark:border-zinc-800 overflow-hidden relative max-h-[90vh] overflow-y-auto"
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-[var(--foreground)]/60 hover:text-[var(--foreground)] bg-white/70 dark:bg-zinc-800/70 rounded-full transition-colors z-10 border border-gray-200 dark:border-zinc-700"
          >
            <X size={18} />
          </button>

          <div className="h-32 bg-gray-100 dark:bg-zinc-800 relative">
            <img 
              src={gift.imageUrl} 
              alt={gift.name} 
              decoding="async"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] to-transparent"></div>
          </div>

          <div className="p-6 pt-2">
            <h3 className="text-2xl font-serif text-[var(--foreground)] mb-1 font-medium">{gift.name}</h3>
            <p className="text-xs text-gray-500 mb-6 font-sans">
              Valor do presente: <span className="font-semibold text-[var(--foreground)]">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(gift.totalAmount)}</span>
            </p>

            {step === 'amount' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <div className="p-4 bg-gray-50 dark:bg-zinc-800/60 rounded-xl border border-gray-200 dark:border-zinc-700/60 text-center">
                  <span className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">
                    Valor a ser pago via PIX
                  </span>
                  <span className="text-2xl font-serif font-bold text-[var(--foreground)]">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(gift.totalAmount)}
                  </span>
                </div>

                <button
                  onClick={handleGeneratePix}
                  className="w-full py-3.5 mt-4 bg-black dark:bg-white text-white dark:text-black rounded-xl font-semibold uppercase tracking-wider text-xs hover:opacity-90 transition-colors shadow-sm border border-gray-800 dark:border-gray-200 cursor-pointer"
                >
                  Gerar QR Code PIX
                </button>
              </motion.div>
            )}

            {step === 'pix' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center space-y-3.5"
              >
                <div className="p-3.5 bg-white rounded-2xl shadow-sm border border-gray-200 flex items-center justify-center">
                  <QRCodeSVG 
                    value={pixString || generatePixPayload(OFFICIAL_PIX_KEY, 'ALINE_TEIXEIRA_BRUNO_SILV', 'OLINDA', gift.totalAmount, 'CasamentoAlineeKlcio')} 
                    size={180} 
                    level="M"
                    includeMargin={false}
                  />
                </div>

                <p className="text-[11px] text-gray-500 font-sans text-center">
                  Aponte a câmera do aplicativo do seu banco para o QR Code acima
                </p>

                {/* Main Copia e Cola Button */}
                <div className="w-full space-y-2">
                  <button
                    onClick={handleCopyPayload}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-black dark:bg-white text-white dark:text-black rounded-xl font-semibold text-xs uppercase tracking-wider hover:opacity-90 transition-all shadow-sm cursor-pointer"
                  >
                    {copiedPayload ? <CheckCircle2 size={16} className="text-green-400 dark:text-green-600" /> : <Copy size={16} />}
                    {copiedPayload ? 'Código PIX Copiado!' : 'Copiar Código PIX (Copia e Cola)'}
                  </button>

                  {/* Detalhes para conferência */}
                  <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-zinc-800/60 border border-gray-200 dark:border-zinc-700/60 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 flex items-center gap-1.5">
                        <Mail size={13} /> Chave (E-mail):
                      </span>
                      <div className="flex items-center gap-1.5 font-medium text-[var(--foreground)]">
                        <span className="font-mono text-[11px]">{OFFICIAL_PIX_KEY}</span>
                        <button
                          type="button"
                          onClick={handleCopyKey}
                          title="Copiar e-mail"
                          className="p-1 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded transition-colors text-gray-500"
                        >
                          {copiedKey ? <CheckCircle2 size={13} className="text-green-500" /> : <Copy size={13} />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 flex items-center gap-1.5">
                        <User size={13} /> Beneficiária:
                      </span>
                      <span className="font-medium text-[var(--foreground)]">{BENEFICIARY_NAME}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 flex items-center gap-1.5">
                        <DollarSign size={13} /> Valor:
                      </span>
                      <span className="font-semibold text-green-600 dark:text-green-400">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(gift.totalAmount)}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleGoToForm}
                  className="w-full py-3 border border-gray-300 dark:border-zinc-700 text-[var(--foreground)] rounded-xl font-semibold uppercase tracking-wider text-xs hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all cursor-pointer"
                >
                  Já realizei o pagamento / Enviar Comprovante
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
                  <h4 className="text-lg font-serif font-medium text-[var(--foreground)]">Confirmação de Pagamento</h4>
                  <p className="text-xs text-gray-500 font-sans mt-1">Envie os dados para podermos agradecer pelo seu presente.</p>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">
                    Seu Nome Completo
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Como devemos lhe agradecer?"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 focus:outline-none focus:border-black dark:focus:border-white text-sm transition-all bg-transparent font-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">
                    Comprovante do PIX
                  </label>
                  <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-300 dark:border-zinc-700 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                    <div className="flex flex-col items-center justify-center py-4">
                      <UploadCloud className="w-6 h-6 mb-1 text-gray-400" />
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        <span className="font-semibold text-[var(--foreground)]">Clique para anexar</span> o comprovante
                      </p>
                      <p className="text-[10px] text-gray-400 mt-1">PNG, JPG ou PDF</p>
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
                    <p className="mt-2 text-xs text-green-600 dark:text-green-400 font-medium truncate">
                      ✓ Selecionado: {receiptFile.name}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 mt-4 bg-black dark:bg-white text-white dark:text-black rounded-xl font-semibold uppercase tracking-wider text-xs hover:opacity-90 transition-colors border border-gray-800 dark:border-gray-200 cursor-pointer"
                >
                  Enviar Comprovante
                </button>
              </motion.form>
            )}

            {step === 'success' && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-6 text-center"
              >
                <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-full flex items-center justify-center mb-5">
                  <CheckCircle2 className="w-8 h-8 text-black dark:text-white" />
                </div>
                <h4 className="text-2xl font-serif text-[var(--foreground)] mb-2 font-medium">Muito Obrigado!</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-8 px-4 font-sans leading-relaxed text-justified-elegant text-center">
                  Recebemos seu comprovante, {guestName}. Seu carinho e sua presença tornam nosso sonho ainda mais completo!
                </p>
                <button
                  onClick={handleComplete}
                  className="w-full py-3.5 bg-black dark:bg-white text-white dark:text-black rounded-xl font-semibold uppercase tracking-wider text-xs hover:opacity-90 transition-all cursor-pointer"
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
