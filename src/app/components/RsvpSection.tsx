'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Phone, 
  Calendar, 
  Send, 
  Check, 
  AlertCircle,
  Mail,
  CheckCircle2,
  XCircle
} from 'lucide-react';

export default function RsvpSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<'confirmed' | 'declined'>('confirmed');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Format Brazilian phone mask on the fly
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 11) val = val.substring(0, 11);
    
    if (val.length > 10) {
      val = val.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    } else if (val.length > 6) {
      val = val.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
    } else if (val.length > 2) {
      val = val.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
    }
    setPhone(val);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanName = name.trim();
    if (!cleanName || cleanName.length < 3) {
      setErrorMessage('Por favor, informe seu nome completo (mínimo de 3 caracteres).');
      return;
    }
    if (cleanName.length > 80) {
      setErrorMessage('Nome muito longo (máximo de 80 caracteres).');
      return;
    }

    const rawPhone = phone.replace(/\D/g, '');
    const cleanEmail = email.trim().toLowerCase();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail);

    if (status === 'confirmed') {
      if (!rawPhone || rawPhone.length < 10 || rawPhone.length > 11) {
        setErrorMessage('Por favor, informe seu WhatsApp / Telefone com DDD (10 ou 11 dígitos).');
        return;
      }

      if (!cleanEmail || cleanEmail.length < 6 || cleanEmail.length > 80 || !isValidEmail) {
        setErrorMessage('Por favor, informe um e-mail válido para receber a confirmação (ex: nome@email.com).');
        return;
      }
    } else {
      if (rawPhone && (rawPhone.length < 10 || rawPhone.length > 11)) {
        setErrorMessage('Telefone inválido (deve conter 10 ou 11 dígitos com DDD).');
        return;
      }
      if (cleanEmail && (!isValidEmail || cleanEmail.length < 6 || cleanEmail.length > 80)) {
        setErrorMessage('Por favor, informe um e-mail válido (ex: nome@email.com).');
        return;
      }
    }

    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const payload = {
        name: cleanName,
        email: cleanEmail,
        phone: rawPhone ? phone.trim() : '',
        status,
        guestCount: status === 'confirmed' ? 1 : 0,
        companionNames: '',
        notes: '',
      };

      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        // Salva backup local
        const localList = JSON.parse(localStorage.getItem('rsvp_local_backup') || '[]');
        const savedEntry = {
          id: data?.data?.id || ('rsvp-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7)),
          name: cleanName,
          email: cleanEmail,
          phone: rawPhone ? phone.trim() : '',
          status,
          guest_count: status === 'confirmed' ? 1 : 0,
          companion_names: '',
          notes: '',
          date: new Date().toLocaleDateString('pt-BR'),
          created_at: new Date().toISOString(),
          ...(data?.data || {}),
        };
        localList.unshift(savedEntry);
        localStorage.setItem('rsvp_local_backup', JSON.stringify(localList));

        setSubmitted(true);
      } else {
        setErrorMessage(data.message || 'Ocorreu um erro ao enviar. Tente novamente.');
      }
    } catch (err: any) {
      console.error('Erro ao enviar confirmação:', err);
      // Fallback gracioso caso offline
      const localList = JSON.parse(localStorage.getItem('rsvp_local_backup') || '[]');
      localList.unshift({
        id: 'rsvp-' + Date.now(),
        name,
        phone,
        status,
        guest_count: status === 'confirmed' ? 1 : 0,
        companion_names: '',
        notes: '',
        date: new Date().toLocaleDateString('pt-BR'),
      });
      localStorage.setItem('rsvp_local_backup', JSON.stringify(localList));
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setPhone('');
    setStatus('confirmed');
    setSubmitted(false);
    setErrorMessage('');
  };

  return (
    <section id="confirmar-presenca" className="py-24 bg-gradient-to-b from-[var(--background)] via-gray-50/50 dark:via-zinc-900/30 to-[var(--background)] border-t border-gray-200 dark:border-zinc-800 relative overflow-hidden">
      
      {/* Decorative background silver glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-slate-300/20 dark:bg-slate-500/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
        
        {/* Section Header */}
        <div className="space-y-4">
          <h2 className="text-3xl md:text-5xl font-serif text-[var(--foreground)] font-medium tracking-tight">
            Confirmação de Presença
          </h2>
        </div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto glass-card bg-white/95 dark:bg-zinc-900/95 p-6 sm:p-10 rounded-3xl border border-gray-200 dark:border-zinc-800 shadow-xl backdrop-blur-md text-left"
        >
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="rsvp-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                {/* 1. Escolha de Status: Sim ou Não */}
                <div className="space-y-2">
                  <label className="block text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold font-sans">
                    Você comparecerá ao casamento? <span className="text-red-500">*</span>
                  </label>

                  <div className="grid grid-cols-2 gap-3">
                    {/* Botão: Sim */}
                    <button
                      type="button"
                      onClick={() => setStatus('confirmed')}
                      className={`p-3.5 rounded-2xl border transition-all text-left flex items-center gap-3 cursor-pointer ${
                        status === 'confirmed'
                          ? 'border-slate-400 dark:border-zinc-500 bg-slate-200/90 hover:bg-slate-300/80 dark:bg-zinc-800 text-slate-900 dark:text-slate-100 ring-1 ring-slate-400 dark:ring-zinc-500 shadow-sm'
                          : 'border-gray-200 dark:border-zinc-700 bg-gray-50/50 dark:bg-zinc-800/40 text-gray-600 dark:text-gray-300 hover:border-gray-300 dark:hover:border-zinc-600'
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${
                        status === 'confirmed'
                          ? 'bg-slate-300 dark:bg-zinc-700 text-slate-900 dark:text-slate-100 border border-slate-400/50 shadow-xs'
                          : 'bg-gray-200 dark:bg-zinc-700 text-gray-500 dark:text-gray-400'
                      }`}>
                        <CheckCircle2 size={16} />
                      </div>
                      <span className="font-serif font-semibold text-base">
                        Sim
                      </span>
                    </button>

                    {/* Botão: Não */}
                    <button
                      type="button"
                      onClick={() => setStatus('declined')}
                      className={`p-3.5 rounded-2xl border transition-all text-left flex items-center gap-3 cursor-pointer ${
                        status === 'declined'
                          ? 'border-slate-400 dark:border-zinc-500 bg-slate-200/90 hover:bg-slate-300/80 dark:bg-zinc-800 text-slate-900 dark:text-slate-100 ring-1 ring-slate-400 dark:ring-zinc-500 shadow-sm'
                          : 'border-gray-200 dark:border-zinc-700 bg-gray-50/50 dark:bg-zinc-800/40 text-gray-600 dark:text-gray-300 hover:border-gray-300 dark:hover:border-zinc-600'
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${
                        status === 'declined'
                          ? 'bg-slate-300 dark:bg-zinc-700 text-slate-900 dark:text-slate-100 border border-slate-400/50 shadow-xs'
                          : 'bg-gray-200 dark:bg-zinc-700 text-gray-500 dark:text-gray-400'
                      }`}>
                        <XCircle size={16} />
                      </div>
                      <span className="font-serif font-semibold text-base">
                        Não
                      </span>
                    </button>
                  </div>
                </div>

                {/* 2. Nome Completo */}
                <div className="space-y-1.5">
                  <label className="block text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold font-sans">
                    Seu Nome Completo <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      required
                      maxLength={80}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex: Maria da Silva"
                      className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200 dark:border-zinc-700 bg-gray-50/50 dark:bg-zinc-800/40 text-[var(--foreground)] text-sm focus:outline-none focus:border-black dark:focus:border-white focus:bg-white dark:focus:bg-zinc-850 transition-all font-sans"
                    />
                  </div>
                </div>

                {/* 3. Telefone / WhatsApp */}
                <div className="space-y-1.5">
                  <label className="block text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold font-sans">
                    WhatsApp / Telefone {status === 'confirmed' && <span className="text-red-500">*</span>}
                  </label>
                  <div className="relative">
                    <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      required={status === 'confirmed'}
                      maxLength={15}
                      value={phone}
                      onChange={handlePhoneChange}
                      placeholder="(00) 00000-0000"
                      className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200 dark:border-zinc-700 bg-gray-50/50 dark:bg-zinc-800/40 text-[var(--foreground)] text-sm focus:outline-none focus:border-black dark:focus:border-white focus:bg-white dark:focus:bg-zinc-850 transition-all font-sans"
                    />
                  </div>
                </div>

                {/* 4. E-mail */}
                <div className="space-y-1.5">
                  <label className="block text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold font-sans">
                    Seu E-mail {status === 'confirmed' && <span className="text-red-500">*</span>}
                  </label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      required={status === 'confirmed'}
                      maxLength={80}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seunome@gmail.com"
                      className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200 dark:border-zinc-700 bg-gray-50/50 dark:bg-zinc-800/40 text-[var(--foreground)] text-sm focus:outline-none focus:border-black dark:focus:border-white focus:bg-white dark:focus:bg-zinc-850 transition-all font-sans"
                    />
                  </div>
                </div>

                {/* Mensagem de Erro */}
                {errorMessage && (
                  <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs flex items-center gap-2 font-sans">
                    <AlertCircle size={16} className="shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Botão de Envio */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl font-serif text-base font-semibold transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2.5 cursor-pointer bg-slate-200 hover:bg-slate-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-zinc-700 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-slate-700 dark:border-slate-300 border-t-transparent rounded-full animate-spin"></div>
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} className="text-slate-700 dark:text-slate-300" />
                      <span>{status === 'confirmed' ? 'Confirmar Minha Presença' : 'Enviar Resposta'}</span>
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              /* Success State Card */
              <motion.div
                key="rsvp-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 sm:py-8 space-y-6"
              >
                <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-zinc-700 flex items-center justify-center mx-auto shadow-sm">
                  <Check size={32} />
                </div>

                <div className="space-y-2 max-w-md mx-auto">
                  <span className="font-signature text-2xl md:text-3xl text-gray-500 dark:text-gray-400 block">
                    {status === 'confirmed' ? 'Oba! Presença Confirmada!' : 'Resposta Enviada!'}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-serif font-medium text-[var(--foreground)]">
                    {status === 'confirmed'
                      ? `Muito obrigado, ${name.split(' ')[0]}!`
                      : `Agradecemos por nos avisar, ${name.split(' ')[0]}!`}
                  </h3>
                  {status !== 'confirmed' && (
                    <p className="text-sm text-gray-600 dark:text-gray-300 font-sans leading-relaxed">
                      Sentiremos sua falta no grande dia, mas agradecemos de coração pelo carinho e pela resposta!
                    </p>
                  )}
                  {email && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-sans inline-flex items-center gap-1.5 justify-center pt-1">
                      <Mail size={13} className="shrink-0 text-slate-400" />
                      E-mail registrado: <span className="font-mono text-gray-700 dark:text-gray-300">{email}</span>
                    </p>
                  )}
                </div>

                {/* Botões de Ação */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
                  {status === 'confirmed' && (
                    <a
                      href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Casamento%20Aline%20%26%20Kl%C3%A9cio%20%F0%9F%92%8D&dates=20270109T220000Z%2F20270110T070000Z&details=Cerim%C3%B4nia%20Religiosa%20%C3%A0s%2019h%20na%20Igreja%20do%20Bom%20Jesus%20do%20Bonfim%20(Olinda%20-%20PE)%20e%20Recep%C3%A7%C3%A3o%20%C3%A0s%2021h%20no%20Dayse%20Nogueira%20Recep%C3%A7%C3%B5es.&location=Igreja%20do%20Bom%20Jesus%20do%20Bonfim%2C%20Olinda%20-%20PE"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-zinc-700 text-xs font-sans font-semibold transition-all shadow-sm cursor-pointer"
                    >
                      <Calendar size={15} />
                      Salvar no Google Agenda
                    </a>
                  )}
                  <button
                    onClick={handleReset}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-300 dark:border-zinc-700 bg-white hover:bg-slate-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-700 dark:text-slate-200 text-xs font-sans font-medium transition-colors cursor-pointer"
                  >
                    {status === 'confirmed' ? 'Enviar Outra Confirmação' : 'Enviar Outra Resposta'}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
