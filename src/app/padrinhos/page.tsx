'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lock, 
  User, 
  Sparkles, 
  Shirt, 
  MessageSquare, 
  Calendar, 
  LogOut, 
  CheckCircle2, 
  AlertTriangle, 
  Send, 
  Heart,
  Palette,
  ArrowLeft,
  ChevronRight
} from 'lucide-react';
import { 
  PADRINHOS_ACCOUNTS, 
  PadrinhoAccount, 
  INITIAL_ANNOUNCEMENTS, 
  PadrinhoMessage,
  DRESS_CODE_INFO 
} from '../data/padrinhosData';

export default function PadrinhosPortal() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedUser, setLoggedUser] = useState<PadrinhoAccount | null>(null);
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'vestimentas' | 'mensagens' | 'cronograma'>('vestimentas');
  
  // Interactive Tie Color Harmonizer state
  const [selectedDressColor, setSelectedDressColor] = useState('#4B5563');
  const [customTieColorName, setCustomTieColorName] = useState('Cinza Grafite');

  // Messages state
  const [announcements, setAnnouncements] = useState<PadrinhoMessage[]>(INITIAL_ANNOUNCEMENTS);
  const [newReply, setNewReply] = useState('');
  const [padrinhoReplies, setPadrinhoReplies] = useState<{ id: string; author: string; text: string; date: string }[]>([]);
  const [replySuccess, setReplySuccess] = useState(false);

  // Check stored session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('padrinho_session');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        const match = PADRINHOS_ACCOUNTS.find(a => a.id === parsed.id);
        if (match) setLoggedUser(match);
      } catch (e) {
        console.error(e);
      }
    }

    const savedReplies = localStorage.getItem('padrinho_replies');
    if (savedReplies) {
      try {
        setPadrinhoReplies(JSON.parse(savedReplies));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const cleanUser = username.trim().toLowerCase();
    const cleanPass = password.trim();

    const userMatch = PADRINHOS_ACCOUNTS.find(acc => {
      const matchUsername = acc.username.toLowerCase() === cleanUser || 
        acc.alternateUsernames?.some(alt => alt.toLowerCase() === cleanUser);
      return matchUsername && acc.password === cleanPass;
    });

    if (userMatch) {
      setLoggedUser(userMatch);
      localStorage.setItem('padrinho_session', JSON.stringify(userMatch));
    } else {
      setLoginError('Usuário ou senha incorretos. Por favor, confira com os noivos.');
    }
  };

  const handleLogout = () => {
    setLoggedUser(null);
    localStorage.removeItem('padrinho_session');
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReply.trim() || !loggedUser) return;

    const replyObj = {
      id: Date.now().toString(),
      author: loggedUser.name,
      text: newReply.trim(),
      date: new Date().toLocaleDateString('pt-BR')
    };

    const updated = [replyObj, ...padrinhoReplies];
    setPadrinhoReplies(updated);
    localStorage.setItem('padrinho_replies', JSON.stringify(updated));
    setNewReply('');
    setReplySuccess(true);
    setTimeout(() => setReplySuccess(false), 4000);
  };

  // If not logged in, show luxury login view
  if (!loggedUser) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex flex-col justify-between p-4 md:p-8 relative overflow-hidden">
        {/* Background Subtle Elements */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-black/5 dark:bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-black/5 dark:bg-white/5 rounded-full blur-3xl pointer-events-none"></div>

        <header className="max-w-6xl w-full mx-auto flex items-center justify-between z-10 py-2">
          <Link href="/" className="flex items-center gap-2 text-sm text-[var(--foreground)]/70 hover:text-[var(--foreground)] transition-colors">
            <ArrowLeft size={16} /> Voltar ao site principal
          </Link>
          <div className="flex items-center gap-2">
            <img src="/LOGO_MARCA.jpg" alt="Logo" className="w-8 h-8 rounded-full border border-gray-300 dark:border-zinc-700 object-cover" />
            <span className="font-serif text-lg text-[var(--foreground)] font-semibold">Aline & Klécio</span>
          </div>
        </header>

        <div className="flex-1 flex items-center justify-center my-8 z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl w-full max-w-md rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-zinc-800"
          >
            <div className="w-20 h-20 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl p-1 border-2 border-gray-200 dark:border-zinc-700 overflow-hidden">
              <img src="/LOGO_MARCA.jpg" alt="Logo Marca" className="w-full h-full object-cover rounded-full" />
            </div>

            <h1 className="text-3xl font-serif text-center text-[var(--foreground)] mb-2 font-medium">
              Área dos Padrinhos
            </h1>
            <p className="text-sm text-center text-gray-500 mb-8 font-sans">
              Acesse com as credenciais fornecidas por Aline & Klécio para visualizar suas informações, vestimentas e avisos.
            </p>

            {loginError && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 p-3 rounded-xl text-sm mb-6 flex items-center gap-2"
              >
                <AlertTriangle size={16} className="shrink-0" />
                <span>{loginError}</span>
              </motion.div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">
                  Usuário ou Nome
                </label>
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Ex: debora.carlos ou Débora"
                    required
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white/50 dark:bg-zinc-800/50 text-[var(--foreground)] focus:outline-none focus:border-black dark:focus:border-white focus:ring-2 focus:ring-black/10 transition-all font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">
                  Senha
                </label>
                <div className="relative">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Digite sua senha"
                    required
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white/50 dark:bg-zinc-800/50 text-[var(--foreground)] focus:outline-none focus:border-black dark:focus:border-white focus:ring-2 focus:ring-black/10 transition-all font-sans"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-black dark:bg-white text-white dark:text-black py-3.5 rounded-xl font-semibold uppercase tracking-wider text-xs shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Lock size={16} /> Entrar na Área de Padrinhos
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-zinc-800 text-center">
              <p className="text-xs text-gray-400 font-sans">
                Esqueceu suas credenciais? Entre em contato diretamente com Aline ou Klécio.
              </p>
            </div>
          </motion.div>
        </div>

        <footer className="text-center text-xs text-gray-400 py-4 font-sans z-10">
          Aline & Klécio 2027 • Casamento dos Sonhos
        </footer>
      </div>
    );
  }

  // Dashboard for logged in padrinho
  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border-b border-gray-200 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-gray-400 hover:text-[var(--foreground)] transition-colors p-1" title="Ir para home">
              <ArrowLeft size={20} />
            </Link>
            <div className="flex items-center gap-2">
              <img src="/LOGO_MARCA.jpg" alt="Logo" className="w-8 h-8 rounded-full border border-gray-300 dark:border-zinc-700 object-cover" />
              <div>
                <span className="font-serif font-bold text-base md:text-lg text-[var(--foreground)] block leading-tight">Padrinhos VIP</span>
                <p className="text-[10px] text-gray-500 font-medium">Aline & Klécio 2027</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-[var(--foreground)]">{loggedUser.name}</p>
              <p className="text-xs text-gray-400 capitalize">{loggedUser.role === 'casal' ? 'Casal de Padrinhos' : loggedUser.role}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20 transition-colors"
            >
              <LogOut size={14} /> Sair
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-8 space-y-8">
        
        {/* Welcome Banner Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-3xl p-6 md:p-10 overflow-hidden bg-gradient-to-r from-zinc-950 via-zinc-900 to-black text-white shadow-xl border border-zinc-800"
        >
          {/* Decorative Pattern Overlay */}
          <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px]"></div>
          
          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-medium uppercase tracking-widest backdrop-blur-md mb-4 border border-white/20">
              <Sparkles size={14} /> 
              {loggedUser.role === 'casal' && 'Casal de Padrinhos'}
              {loggedUser.role === 'madrinha' && 'Madrinha de Honra'}
              {loggedUser.role === 'padrinho' && 'Padrinho de Honra'}
              {loggedUser.role === 'daminha' && 'Daminha de Honra'}
            </span>

            <h1 className="text-3xl md:text-5xl font-serif font-normal mb-3">
              Olá, {loggedUser.name}!
            </h1>

            <p className="text-white/90 text-base md:text-lg font-sans leading-relaxed mb-6">
              {loggedUser.customMessage || 'Vocês são essenciais em nossas vidas e é um presente ter vocês ao nosso lado neste momento inesquecível!'}
            </p>

            <div className="flex flex-wrap gap-4 text-xs font-medium text-white/90">
              <span className="bg-white/10 border border-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm">📅 09 de Janeiro de 2027</span>
              <span className="bg-white/10 border border-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm">📍 Cerimônia & Recepção Clássica</span>
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 dark:border-zinc-800 gap-2 md:gap-4 overflow-x-auto hide-scrollbar">
          <button
            onClick={() => setActiveTab('vestimentas')}
            className={`pb-4 px-4 font-serif text-base md:text-lg flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'vestimentas'
                ? 'border-[var(--color-wedding-gold)] text-[var(--color-wedding-gold)] font-bold'
                : 'border-transparent text-gray-500 hover:text-[var(--foreground)]'
            }`}
          >
            <Shirt size={20} /> Guia de Vestimentas
          </button>
          <button
            onClick={() => setActiveTab('mensagens')}
            className={`pb-4 px-4 font-serif text-base md:text-lg flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'mensagens'
                ? 'border-[var(--color-wedding-gold)] text-[var(--color-wedding-gold)] font-bold'
                : 'border-transparent text-gray-500 hover:text-[var(--foreground)]'
            }`}
          >
            <MessageSquare size={20} /> Mural & Avisos
          </button>
          <button
            onClick={() => setActiveTab('cronograma')}
            className={`pb-4 px-4 font-serif text-base md:text-lg flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'cronograma'
                ? 'border-[var(--color-wedding-gold)] text-[var(--color-wedding-gold)] font-bold'
                : 'border-transparent text-gray-500 hover:text-[var(--foreground)]'
            }`}
          >
            <Calendar size={20} /> Cronograma do Padrinho
          </button>
        </div>

        {/* Tab Contents */}
        <AnimatePresence mode="wait">
          {activeTab === 'vestimentas' && (
            <motion.div
              key="vestimentas"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-10"
            >
              {/* Introduction Banner */}
              <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-zinc-800">
                <h2 className="text-2xl font-serif text-[var(--color-wedding-gold)] mb-3 flex items-center gap-2">
                  <Palette size={24} /> O Estilo & Dress Code do Casamento
                </h2>
                <p className="text-gray-600 dark:text-gray-300 font-sans leading-relaxed">
                  Para tornar nosso grande dia ainda mais inesquecível e visualmente harmonioso, preparamos as orientações detalhadas de vestimentas para nossas madrinhas, padrinhos e daminhas.
                </p>
              </div>

              {/* Madrinhas & Padrinhos Cards Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Madrinhas Card */}
                <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-zinc-800 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-2xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold font-serif shadow-md">
                        M
                      </div>
                      <div>
                        <h3 className="text-2xl font-serif text-[var(--foreground)]">{DRESS_CODE_INFO.madrinhas.title}</h3>
                        <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Paleta Livre • Vestidos Longos</p>
                      </div>
                    </div>

                    <div className="bg-gray-100 dark:bg-zinc-800/60 p-5 rounded-2xl mb-6 border border-gray-200 dark:border-zinc-700/50">
                      <p className="text-gray-700 dark:text-gray-200 font-sans italic text-sm md:text-base leading-relaxed">
                        "{DRESS_CODE_INFO.madrinhas.description} A paleta de cores será livre, para que possam escolher a cor e o estilo que mais combinem com vocês. No entanto, pedimos apenas que optem por vestidos longos, elegantes, que harmonizem com o horário e a proposta clássica da celebração."
                      </p>
                    </div>

                    <div className="space-y-4 mb-6">
                      <h4 className="font-serif text-base font-bold text-[var(--foreground)] flex items-center gap-2">
                        <CheckCircle2 size={18} className="text-green-500" /> Diretrizes Principais
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300 font-sans pl-2">
                        <li className="flex items-start gap-2">
                          <span className="text-black dark:text-white mt-1">•</span>
                          <span><strong>Comprimento:</strong> Vestidos estritamente LONGOS e elegantes.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-black dark:text-white mt-1">•</span>
                          <span><strong>Cores:</strong> Paleta livre (liberdade total para escolher o tom que preferir!).</span>
                        </li>
                      </ul>
                    </div>

                    {/* Prohibited Alert */}
                    <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 mb-6">
                      <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-bold font-serif text-sm mb-1">
                        <AlertTriangle size={18} /> ATENÇÃO RESTRITA:
                      </div>
                      <p className="text-xs text-red-700 dark:text-red-300 font-sans font-medium">
                        As cores <strong className="underline decoration-red-400">Brancas e Off-White NÃO serão permitidas</strong> em nenhuma hipótese para preservação do momento da noiva.
                      </p>
                    </div>

                    {/* Single Photo Example for Madrinhas */}
                    <div className="mt-4">
                      <span className="text-xs uppercase font-semibold text-gray-400 tracking-wider block mb-3">Exemplo de Referência (Vestido Longo):</span>
                      <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-zinc-700 shadow-md group relative">
                        <img 
                          src="https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000&auto=format&fit=crop" 
                          alt="Exemplo de mulher com vestido longo elegante" 
                          className="w-full h-80 object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-center">
                          <span className="text-xs font-semibold text-white font-sans tracking-wide">
                            Exemplo de Vestido Longo Elegante
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Padrinhos Card */}
                <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-zinc-800 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-2xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold font-serif shadow-md">
                        P
                      </div>
                      <div>
                        <h3 className="text-2xl font-serif text-[var(--foreground)]">{DRESS_CODE_INFO.padrinhos.title}</h3>
                        <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Terno Preto Clássico • Gravata Harmonizada</p>
                      </div>
                    </div>

                    <div className="bg-gray-100 dark:bg-zinc-800/60 p-5 rounded-2xl mb-6 border border-gray-200 dark:border-zinc-700/50">
                      <p className="text-gray-700 dark:text-gray-200 font-sans italic text-sm md:text-base leading-relaxed">
                        "{DRESS_CODE_INFO.padrinhos.description} A gravata deverá harmonizar com a cor do vestido do seu par, preservando a harmonia visual da celebração."
                      </p>
                    </div>

                    <div className="space-y-4 mb-6">
                      <h4 className="font-serif text-base font-bold text-[var(--foreground)] flex items-center gap-2">
                        <CheckCircle2 size={18} className="text-green-500" /> Diretrizes dos Padrinhos
                      </h4>
                      <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300 font-sans pl-2">
                        <li className="flex items-start gap-2">
                          <span className="text-black dark:text-white mt-1">•</span>
                          <span><strong>Terno:</strong> Terno completo PRETO clássico (paletó e calça pretos).</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-black dark:text-white mt-1">•</span>
                          <span><strong>Camisa:</strong> Camisa social BRANCA clássica.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-black dark:text-white mt-1">•</span>
                          <span><strong>Gravata:</strong> Na mesma cor ou tom harmonizado com o vestido da sua madrinha/par.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-black dark:text-white mt-1">•</span>
                          <span><strong>Sapatos:</strong> Sapato social preto.</span>
                        </li>
                      </ul>
                    </div>

                    {/* Interactive Harmonizer Widget */}
                    <div className="bg-gradient-to-br from-zinc-900 to-black text-white p-5 rounded-2xl shadow-lg border border-zinc-800">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-serif text-gray-300 uppercase tracking-wider flex items-center gap-1">
                          <Sparkles size={12} /> Harmonizador de Trajes do Casal
                        </span>
                        <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-gray-300 font-sans">Simulador Interativo</span>
                      </div>

                      <div className="flex items-center justify-around py-4">
                        {/* Suit Icon */}
                        <div className="text-center">
                          <div className="relative w-16 h-20 bg-black rounded-lg border border-zinc-700 mx-auto flex flex-col items-center justify-start pt-2 shadow-inner">
                            {/* Shirt Collar */}
                            <div className="w-6 h-3 bg-white clip-v-neck"></div>
                            {/* Tie Color */}
                            <div 
                              className="w-2.5 h-10 transition-colors duration-300 rounded-b shadow"
                              style={{ backgroundColor: selectedDressColor }}
                            ></div>
                          </div>
                          <span className="text-[11px] text-gray-300 font-sans block mt-2">Terno Preto & Gravata</span>
                        </div>

                        <div className="text-2xl text-white font-serif">+</div>

                        {/* Dress Color */}
                        <div className="text-center">
                          <div 
                            className="w-16 h-20 rounded-lg border border-white/20 mx-auto transition-colors duration-300 shadow-inner flex items-end justify-center pb-2"
                            style={{ backgroundColor: selectedDressColor }}
                          >
                            <span className="text-[9px] font-bold text-white bg-black/40 px-1 rounded backdrop-blur-sm">Longo</span>
                          </div>
                          <span className="text-[11px] text-gray-300 font-sans block mt-2">Vestido Madrinha</span>
                        </div>
                      </div>

                      <div className="mt-2 pt-3 border-t border-zinc-800 text-center">
                        <p className="text-xs text-gray-400 font-sans">
                          Harmonização visual elegante para o casal
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Daminhas Card */}
              <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-zinc-800">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-zinc-200 dark:bg-zinc-800 text-[var(--foreground)] flex items-center justify-center font-bold font-serif">
                    D
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif text-[var(--foreground)]">{DRESS_CODE_INFO.daminhas.title}</h3>
                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Entrada Festiva • Luna & Julia</p>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 font-sans text-sm md:text-base leading-relaxed mb-4">
                  {DRESS_CODE_INFO.daminhas.description}
                </p>

                <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {DRESS_CODE_INFO.daminhas.rules.map((rule, i) => (
                    <li key={i} className="bg-gray-50 dark:bg-zinc-800/40 p-4 rounded-2xl border border-gray-100 dark:border-zinc-700/40 text-xs md:text-sm font-sans text-gray-700 dark:text-gray-300 flex items-start gap-2">
                      <Heart size={16} className="text-gray-400 shrink-0 mt-0.5" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </motion.div>
          )}

          {activeTab === 'mensagens' && (
            <motion.div
              key="mensagens"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              {/* Announcements List */}
              <div>
                <h2 className="text-2xl font-serif text-[var(--foreground)] mb-6 flex items-center gap-2">
                  <Sparkles size={24} className="text-[var(--foreground)]" /> Recados dos Noivos
                </h2>

                <div className="space-y-4">
                  {announcements.map((ann) => (
                    <div 
                      key={ann.id}
                      className={`p-6 rounded-3xl border transition-all ${
                        ann.isImportant
                          ? 'bg-zinc-100 dark:bg-zinc-800/80 border-zinc-300 dark:border-zinc-700'
                          : 'bg-white dark:bg-zinc-900 border-gray-100 dark:border-zinc-800'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--foreground)]">
                          {ann.author}
                        </span>
                        <span className="text-xs text-gray-400 font-sans">{ann.date}</span>
                      </div>
                      <h3 className="text-xl font-serif text-[var(--foreground)] mb-2">{ann.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 font-sans text-sm md:text-base leading-relaxed">
                        {ann.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reply Section */}
              <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-zinc-800">
                <h3 className="text-xl font-serif text-[var(--foreground)] mb-2 flex items-center gap-2">
                  <MessageSquare size={20} className="text-[var(--foreground)]" /> Deixar Recado para Aline & Klécio
                </h3>
                <p className="text-xs text-gray-500 font-sans mb-6">
                  Escreva um recado especial, tire dúvidas ou envie um carinho para os noivos.
                </p>

                {replySuccess && (
                  <div className="bg-green-500/10 border border-green-500/30 text-green-600 p-3 rounded-xl text-sm mb-4 flex items-center gap-2">
                    <CheckCircle2 size={16} /> Recado enviado com sucesso para os noivos!
                  </div>
                )}

                <form onSubmit={handleSendReply} className="space-y-4">
                  <textarea
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                    placeholder="Digite sua mensagem aqui..."
                    rows={4}
                    required
                    className="w-full p-4 rounded-2xl border border-gray-200 dark:border-zinc-700 bg-transparent text-[var(--foreground)] focus:outline-none focus:border-black dark:focus:border-white font-sans"
                  />
                  <button
                    type="submit"
                    className="flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-xl font-semibold uppercase tracking-wider text-xs hover:opacity-90 transition-colors shadow-md cursor-pointer"
                  >
                    <Send size={16} /> Enviar Mensagem
                  </button>
                </form>

                {/* Display Sent Replies */}
                {padrinhoReplies.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-gray-100 dark:border-zinc-800">
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Seus Recados Enviados:</h4>
                    <div className="space-y-3">
                      {padrinhoReplies.map((r) => (
                        <div key={r.id} className="bg-gray-50 dark:bg-zinc-800/40 p-4 rounded-xl text-sm font-sans">
                          <div className="flex justify-between text-xs text-gray-400 mb-1">
                            <span className="font-bold text-[var(--foreground)]">{r.author}</span>
                            <span>{r.date}</span>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300">{r.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'cronograma' && (
            <motion.div
              key="cronograma"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white dark:bg-zinc-900 rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-zinc-800"
            >
              <h2 className="text-2xl font-serif text-[var(--foreground)] mb-2 flex items-center gap-2">
                <Calendar size={24} className="text-[var(--foreground)]" /> Cronograma do Grande Dia
              </h2>
              <p className="text-sm text-gray-500 font-sans mb-8">
                Horários orientativos planejados com carinho para os padrinhos aproveitarem cada instante!
              </p>

              <div className="relative border-l-2 border-zinc-300 dark:border-zinc-700 pl-6 space-y-8 ml-2">
                
                <div className="relative">
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-black dark:bg-white border-4 border-white dark:border-zinc-900"></div>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">18:00</span>
                  <h3 className="text-lg font-serif text-[var(--foreground)] font-semibold">Chegada dos Padrinhos & Posição no Altar</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-sans mt-1">
                    Chegada antecedente ao local da celebração para organização de cortejo e alinhamento com a cerimonialista.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-black dark:bg-white border-4 border-white dark:border-zinc-900"></div>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">18:30</span>
                  <h3 className="text-lg font-serif text-[var(--foreground)] font-semibold">Início Especial da Cerimônia</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-sans mt-1">
                    Entrada dos padrinhos, daminhas Luna e Julia e noivos para o momento solene do SIM.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-black dark:bg-white border-4 border-white dark:border-zinc-900"></div>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">19:45</span>
                  <h3 className="text-lg font-serif text-[var(--foreground)] font-semibold">Sessão de Fotos Oficiais com os Noivos</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-sans mt-1">
                    Fotos clássicas e divertidas de cada casal e grupo no altar/backdrop com Aline & Klécio.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-black dark:bg-white border-4 border-white dark:border-zinc-900"></div>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">20:30 em diante</span>
                  <h3 className="text-lg font-serif text-[var(--foreground)] font-semibold">Recepção, Brinde & Festa</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-sans mt-1">
                    Abertura da pista de dança, coquetel, jantar e celebração inesquecível a noite toda!
                  </p>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>
    </div>
  );
}
