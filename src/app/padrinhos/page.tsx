'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lock, 
  User, 
  Sparkles, 
  MessageSquare, 
  Calendar, 
  LogOut, 
  CheckCircle2, 
  AlertTriangle, 
  Send, 
  Palette,
  ArrowLeft,
  Users,
  Flower2,
  Clock,
  Camera,
  Smile,
  HelpCircle
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
  const [activeTab, setActiveTab] = useState<'padrinhos' | 'daminhas' | 'mensagens' | 'cronograma'>('padrinhos');
  
  // Interactive Tie Color Harmonizer state
  const [selectedDressColor, setSelectedDressColor] = useState('#4B5563');

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
        const parsed: PadrinhoAccount = JSON.parse(savedUser);
        const match = PADRINHOS_ACCOUNTS.find(a => a.id === parsed.id);
        if (match) {
          setLoggedUser(match);
          if (match.role === 'daminha') {
            setActiveTab('daminhas');
          } else {
            setActiveTab('padrinhos');
          }
        }
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
      if (userMatch.role === 'daminha') {
        setActiveTab('daminhas');
      } else {
        setActiveTab('padrinhos');
      }
    } else {
      setLoginError('Usuário ou senha incorretos. Por favor, solicite a senha aos noivos.');
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

  // If not logged in, show luxury authentication view
  if (!loggedUser) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex flex-col justify-between p-4 md:p-8 relative overflow-hidden">
        {/* Background Subtle Elements */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-gray-100 dark:bg-zinc-900 rounded-full blur-3xl pointer-events-none opacity-50"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gray-100 dark:bg-zinc-900 rounded-full blur-3xl pointer-events-none opacity-50"></div>

        <header className="max-w-6xl w-full mx-auto flex items-center justify-between z-10 py-2">
          <Link href="/" className="flex items-center gap-2 text-xs md:text-sm text-[var(--foreground)]/70 hover:text-[var(--foreground)] transition-colors">
            <ArrowLeft size={16} /> Voltar ao site principal
          </Link>
          <div className="flex items-center gap-2">
            <img src="/img/aline_e_klecio.jpg" alt="Logo Marca Aline e Klécio" className="w-8 h-8 rounded-full border border-gray-300 dark:border-zinc-700 object-contain" />
            <span className="font-serif text-lg text-[var(--foreground)] font-semibold">Aline e Klécio</span>
          </div>
        </header>

        <div className="flex-1 flex items-center justify-center my-8 z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl w-full max-w-md rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-zinc-800"
          >
            <div className="w-20 h-20 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center mx-auto mb-6 shadow-md p-1 border-2 border-gray-300 dark:border-zinc-700 overflow-hidden">
              <img src="/img/aline_e_klecio.jpg" alt="Logo Marca Aline e Klécio" className="w-full h-full object-contain rounded-full" />
            </div>

            <h1 className="text-2xl md:text-3xl font-serif text-center text-[var(--foreground)] mb-2 font-medium">
              Área Restrita do Cortejo
            </h1>
            <p className="text-xs md:text-sm text-center text-gray-500 mb-8 font-sans leading-relaxed text-justified-elegant text-center">
              Acesso exclusivo por perfil. Digite o usuário e senha fornecidos pelos noivos para acessar o seu conteúdo restrito.
            </p>

            {loginError && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 p-3 rounded-xl text-xs mb-6 flex items-center gap-2"
              >
                <AlertTriangle size={16} className="shrink-0" />
                <span>{loginError}</span>
              </motion.div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">
                  Usuário ou E-mail
                </label>
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Ex: debora.carlos ou luna"
                    required
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-transparent text-[var(--foreground)] text-sm focus:outline-none focus:border-black dark:focus:border-white transition-all font-sans"
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
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-transparent text-[var(--foreground)] text-sm focus:outline-none focus:border-black dark:focus:border-white transition-all font-sans"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-black dark:bg-white text-white dark:text-black py-3.5 rounded-xl font-semibold uppercase tracking-wider text-xs shadow-sm border border-gray-800 dark:border-gray-200 hover:opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Lock size={16} /> Entrar na Área Restrita
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-zinc-800 text-center">
              <p className="text-xs text-gray-400 font-sans">
                Dúvidas ou perda de senha? Fale diretamente com Aline e Klécio.
              </p>
            </div>
          </motion.div>
        </div>

        <footer className="text-center text-xs text-gray-400 py-4 font-sans z-10">
          Aline e Klécio 2027 • Casamento dos Sonhos
        </footer>
      </div>
    );
  }

  const isDaminha = loggedUser.role === 'daminha';

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
              <img src="/img/aline_e_klecio.jpg" alt="Logo" className="w-8 h-8 rounded-full border border-gray-300 dark:border-zinc-700 object-contain" />
              <div>
                <span className="font-serif font-semibold text-base md:text-lg text-[var(--foreground)] block leading-tight">
                  {isDaminha ? 'Área Exclusiva das Daminhas' : 'Área Restrita dos Padrinhos e Madrinhas'}
                </span>
                <p className="text-[10px] text-gray-500 font-medium">Aline e Klécio 2027</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-[var(--foreground)]">{loggedUser.name}</p>
              <p className="text-xs text-gray-400 capitalize">
                {isDaminha ? 'Daminha de Honra' : loggedUser.role === 'casal' ? 'Casal de Padrinhos' : loggedUser.role}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer"
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
          className="relative rounded-2xl p-6 md:p-10 overflow-hidden bg-gradient-to-r from-zinc-950 via-zinc-900 to-black text-white shadow-xl border border-zinc-800"
        >
          <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px]"></div>
          
          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/10 text-xs font-medium uppercase tracking-widest backdrop-blur-md mb-4 border border-white/20">
              <Sparkles size={14} /> 
              {isDaminha ? 'Daminha / Pajem de Honra' : loggedUser.role === 'casal' ? 'Casal de Padrinhos' : loggedUser.role === 'madrinha' ? 'Madrinha de Honra' : 'Padrinho de Honra'}
            </span>

            <h1 className="text-3xl md:text-5xl font-serif font-normal mb-3">
              Olá, {loggedUser.name}!
            </h1>

            <p className="text-white/90 text-base md:text-lg font-sans leading-relaxed mb-6 text-justified-elegant">
              {loggedUser.customMessage || (isDaminha 
                ? 'Sua presença enche nosso coração de alegria e doçura!' 
                : 'Vocês são essenciais em nossas vidas e é um presente ter vocês ao nosso lado neste momento inesquecível!')}
            </p>

            <div className="flex flex-wrap gap-4 text-xs font-medium text-white/90">
              <span className="bg-white/10 border border-white/10 px-3 py-1.5 rounded-xl backdrop-blur-sm">📅 09 de Janeiro de 2027</span>
              <span className="bg-white/10 border border-white/10 px-3 py-1.5 rounded-xl backdrop-blur-sm">📍 Cerimônia e Recepção Clássica</span>
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation - Strictly Separated per Role */}
        <div className="flex border-b border-gray-200 dark:border-zinc-800 gap-2 md:gap-4 overflow-x-auto hide-scrollbar">
          {!isDaminha && (
            <button
              onClick={() => setActiveTab('padrinhos')}
              className={`pb-4 px-4 font-serif text-base md:text-lg flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'padrinhos'
                  ? 'border-black dark:border-white text-[var(--foreground)] font-semibold'
                  : 'border-transparent text-gray-500 hover:text-[var(--foreground)]'
              }`}
            >
              <Users size={18} className="text-gray-400" /> Padrinhos e Madrinhas
            </button>
          )}

          {isDaminha && (
            <button
              onClick={() => setActiveTab('daminhas')}
              className={`pb-4 px-4 font-serif text-base md:text-lg flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'daminhas'
                  ? 'border-black dark:border-white text-[var(--foreground)] font-semibold'
                  : 'border-transparent text-gray-500 hover:text-[var(--foreground)]'
              }`}
            >
              <Flower2 size={18} className="text-gray-400" /> Área das Daminhas
            </button>
          )}

          <button
            onClick={() => setActiveTab('mensagens')}
            className={`pb-4 px-4 font-serif text-base md:text-lg flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'mensagens'
                ? 'border-black dark:border-white text-[var(--foreground)] font-semibold'
                : 'border-transparent text-gray-500 hover:text-[var(--foreground)]'
            }`}
          >
            <MessageSquare size={18} className="text-gray-400" /> Mural e Avisos
          </button>

          <button
            onClick={() => setActiveTab('cronograma')}
            className={`pb-4 px-4 font-serif text-base md:text-lg flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'cronograma'
                ? 'border-black dark:border-white text-[var(--foreground)] font-semibold'
                : 'border-transparent text-gray-500 hover:text-[var(--foreground)]'
            }`}
          >
            <Calendar size={18} className="text-gray-400" /> Cronograma
          </button>
        </div>

        {/* Tab Contents */}
        <AnimatePresence mode="wait">
          
          {/* TAB 1: PADRINHOS E MADRINHAS (Visible strictly to Padrinhos/Madrinhas/Casais) */}
          {!isDaminha && activeTab === 'padrinhos' && (
            <motion.div
              key="padrinhos"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-10"
            >
              {/* Introduction Banner */}
              <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200 dark:border-zinc-800">
                <h2 className="text-2xl font-serif text-[var(--foreground)] mb-3 flex items-center gap-2 font-medium">
                  <Palette size={22} className="text-gray-400" /> Guia de Vestimentas e Orientações dos Padrinhos
                </h2>
                <p className="text-gray-600 dark:text-gray-300 font-sans leading-relaxed text-justified-elegant text-sm md:text-base">
                  Preparamos este espaço com todas as informações sobre horários de chegada, trajes e fotos para nossas madrinhas e padrinhos.
                </p>
              </div>

              {/* Madrinhas & Padrinhos Cards Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Madrinhas Card */}
                <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200 dark:border-zinc-800 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold font-serif shadow-sm">
                        M
                      </div>
                      <div>
                        <h3 className="text-2xl font-serif text-[var(--foreground)] font-medium">{DRESS_CODE_INFO.madrinhas.title}</h3>
                        <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Paleta Livre • Vestidos Longos</p>
                      </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-zinc-800/60 p-5 rounded-xl mb-6 border border-gray-200 dark:border-zinc-700/50">
                      <p className="text-gray-700 dark:text-gray-200 font-sans italic text-sm md:text-base leading-relaxed text-justified-elegant">
                        "{DRESS_CODE_INFO.madrinhas.description} A paleta de cores será livre, para que possam escolher a cor e o estilo que mais combinem com vocês. No entanto, pedimos apenas que optem por vestidos longos, elegantes, que harmonizem com o horário e a proposta clássica da celebração."
                      </p>
                    </div>

                    <div className="space-y-4 mb-6">
                      <h4 className="font-serif text-base font-medium text-[var(--foreground)] flex items-center gap-2">
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
                    <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6">
                      <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-semibold font-serif text-sm mb-1">
                        <AlertTriangle size={18} /> ATENÇÃO RESTRITA:
                      </div>
                      <p className="text-xs text-red-700 dark:text-red-300 font-sans font-medium text-justified-elegant">
                        As cores <strong className="underline decoration-red-400">Brancas e Off-White NÃO serão permitidas</strong> em nenhuma hipótese para preservação do momento da noiva.
                      </p>
                    </div>

                    {/* Photo Reference */}
                    <div className="mt-4">
                      <span className="text-xs uppercase font-semibold text-gray-400 tracking-wider block mb-3">Exemplo de Referência (Vestido Longo):</span>
                      <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-zinc-700 shadow-sm group relative">
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
                <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200 dark:border-zinc-800 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold font-serif shadow-sm">
                        P
                      </div>
                      <div>
                        <h3 className="text-2xl font-serif text-[var(--foreground)] font-medium">{DRESS_CODE_INFO.padrinhos.title}</h3>
                        <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Terno Preto Clássico • Gravata Harmonizada</p>
                      </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-zinc-800/60 p-5 rounded-xl mb-6 border border-gray-200 dark:border-zinc-700/50">
                      <p className="text-gray-700 dark:text-gray-200 font-sans italic text-sm md:text-base leading-relaxed text-justified-elegant">
                        "{DRESS_CODE_INFO.padrinhos.description} A gravata deverá harmonizar com a cor do vestido do seu par, preservando a harmonia visual da celebração."
                      </p>
                    </div>

                    <div className="space-y-4 mb-6">
                      <h4 className="font-serif text-base font-medium text-[var(--foreground)] flex items-center gap-2">
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
                    <div className="bg-gradient-to-br from-zinc-950 to-black text-white p-5 rounded-xl shadow-md border border-zinc-800">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-serif text-gray-300 uppercase tracking-wider flex items-center gap-1">
                          <Sparkles size={12} className="text-gray-400" /> Harmonizador de Trajes do Casal
                        </span>
                        <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-gray-300 font-sans">Simulador Interativo</span>
                      </div>

                      <div className="flex items-center justify-around py-4">
                        <div className="text-center">
                          <div className="relative w-16 h-20 bg-black rounded-lg border border-zinc-700 mx-auto flex flex-col items-center justify-start pt-2 shadow-inner">
                            <div className="w-6 h-3 bg-white clip-v-neck"></div>
                            <div 
                              className="w-2.5 h-10 transition-colors duration-300 rounded-b shadow"
                              style={{ backgroundColor: selectedDressColor }}
                            ></div>
                          </div>
                          <span className="text-[11px] text-gray-300 font-sans block mt-2">Terno Preto e Gravata</span>
                        </div>

                        <div className="text-2xl text-white font-serif">+</div>

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
            </motion.div>
          )}

          {/* TAB 2: ÁREA EXCLUSIVA DAS DAMINHAS (Visible strictly to Daminhas) */}
          {isDaminha && activeTab === 'daminhas' && (
            <motion.div
              key="daminhas"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              {/* Header Daminhas */}
              <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200 dark:border-zinc-800">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-zinc-800 text-[var(--foreground)] flex items-center justify-center font-bold font-serif">
                    🌸
                  </div>
                  <div>
                    <h2 className="text-2xl font-serif text-[var(--foreground)] font-medium">Área Exclusiva das Daminhas</h2>
                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Espaço Especial • {loggedUser.name}</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 font-sans text-sm md:text-base leading-relaxed text-justified-elegant">
                  {DRESS_CODE_INFO.daminhas.description}
                </p>
              </div>

              {/* Grid de Informações para Daminhas */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-zinc-800 text-[var(--foreground)] flex items-center justify-center mb-4 border border-gray-200 dark:border-zinc-700">
                    <Clock size={20} />
                  </div>
                  <h3 className="font-serif text-lg text-[var(--foreground)] font-medium mb-2">Horário de Chegada</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 font-sans leading-relaxed text-justified-elegant">
                    Chegada às <strong className="text-[var(--foreground)]">18h</strong> com os pais ao local da cerimônia para se arrumarem sem correria e fazerem fotos prévias com carinho.
                  </p>
                </div>

                <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-zinc-800 text-[var(--foreground)] flex items-center justify-center mb-4 border border-gray-200 dark:border-zinc-700">
                    <Sparkles size={20} />
                  </div>
                  <h3 className="font-serif text-lg text-[var(--foreground)] font-medium mb-2">Vestimenta e Sapatos</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 font-sans leading-relaxed text-justified-elegant">
                    Vestidinhos delicados e sapatinhos muito confortáveis para garantir a liberdade e o sorriso de {loggedUser.name}.
                  </p>
                </div>

                <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-zinc-800 text-[var(--foreground)] flex items-center justify-center mb-4 border border-gray-200 dark:border-zinc-700">
                    <Smile size={20} />
                  </div>
                  <h3 className="font-serif text-lg text-[var(--foreground)] font-medium mb-2">Entrada Festiva e Leve</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 font-sans leading-relaxed text-justified-elegant">
                    Entrada cheia de doçura. O momento deve ser totalmente sem pressão, celebrado com leveza e o apoio próximo dos pais!
                  </p>
                </div>

                <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-zinc-800 text-[var(--foreground)] flex items-center justify-center mb-4 border border-gray-200 dark:border-zinc-700">
                    <Camera size={20} />
                  </div>
                  <h3 className="font-serif text-lg text-[var(--foreground)] font-medium mb-2">Sessão de Fotos</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 font-sans leading-relaxed text-justified-elegant">
                    Fotos oficiais carinhosas no altar com Aline e Klécio logo após a bênção, antes de abrirem a pista e os docinhos na recepção.
                  </p>
                </div>

                <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm md:col-span-2">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-zinc-800 text-[var(--foreground)] flex items-center justify-center mb-4 border border-gray-200 dark:border-zinc-700">
                    <HelpCircle size={20} />
                  </div>
                  <h3 className="font-serif text-lg text-[var(--foreground)] font-medium mb-2">Dúvidas ou Suporte das Famílias</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 font-sans leading-relaxed text-justified-elegant">
                    Caso haja qualquer dúvida dos pais sobre roupas, acessórios ou horários, a cerimonialista e a noiva Aline estão totalmente disponíveis para apoiar com todo carinho!
                  </p>
                </div>

              </div>
            </motion.div>
          )}

          {/* TAB 3: MURAL E AVISOS */}
          {activeTab === 'mensagens' && (
            <motion.div
              key="mensagens"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-serif text-[var(--foreground)] mb-6 flex items-center gap-2 font-medium">
                  <Sparkles size={22} className="text-gray-400" /> Recados e Avisos dos Noivos
                </h2>

                <div className="space-y-4">
                  {announcements.map((ann) => (
                    <div 
                      key={ann.id}
                      className={`p-6 rounded-2xl border transition-all ${
                        ann.isImportant
                          ? 'bg-zinc-50 dark:bg-zinc-800/80 border-gray-300 dark:border-zinc-700'
                          : 'bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--foreground)]">
                          {ann.author}
                        </span>
                        <span className="text-xs text-gray-400 font-sans">{ann.date}</span>
                      </div>
                      <h3 className="text-xl font-serif text-[var(--foreground)] mb-2 font-medium">{ann.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 font-sans text-sm md:text-base leading-relaxed text-justified-elegant">
                        {ann.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reply Section */}
              <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200 dark:border-zinc-800">
                <h3 className="text-xl font-serif text-[var(--foreground)] mb-2 flex items-center gap-2 font-medium">
                  <MessageSquare size={20} className="text-gray-400" /> Deixar Recado para Aline e Klécio
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
                    className="w-full p-4 rounded-xl border border-gray-200 dark:border-zinc-700 bg-transparent text-[var(--foreground)] focus:outline-none focus:border-black dark:focus:border-white font-sans text-sm"
                  />
                  <button
                    type="submit"
                    className="flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-6 py-3.5 rounded-xl font-semibold uppercase tracking-wider text-xs hover:opacity-90 transition-colors shadow-sm cursor-pointer border border-gray-800 dark:border-gray-200"
                  >
                    <Send size={16} /> Enviar Mensagem aos Noivos
                  </button>
                </form>

                {padrinhoReplies.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-gray-100 dark:border-zinc-800">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">Seus Recados Enviados:</h4>
                    <div className="space-y-3">
                      {padrinhoReplies.map((r) => (
                        <div key={r.id} className="bg-gray-50 dark:bg-zinc-800/40 p-4 rounded-xl text-sm font-sans border border-gray-100 dark:border-zinc-700/50">
                          <div className="flex justify-between text-xs text-gray-400 mb-1">
                            <span className="font-bold text-[var(--foreground)]">{r.author}</span>
                            <span>{r.date}</span>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 text-justified-elegant">{r.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* TAB 4: CRONOGRAMA */}
          {activeTab === 'cronograma' && (
            <motion.div
              key="cronograma"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white dark:bg-zinc-900 rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200 dark:border-zinc-800"
            >
              <h2 className="text-2xl font-serif text-[var(--foreground)] mb-2 flex items-center gap-2 font-medium">
                <Calendar size={22} className="text-gray-400" /> Cronograma do Grande Dia
              </h2>
              <p className="text-xs text-gray-500 font-sans mb-8">
                Horários orientativos planejados com carinho para aproveitarem cada instante!
              </p>

              <div className="relative border-l-2 border-gray-300 dark:border-zinc-700 pl-6 space-y-8 ml-2">
                
                <div className="relative">
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-black dark:bg-white border-4 border-white dark:border-zinc-900"></div>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block font-mono">18h</span>
                  <h3 className="text-lg font-serif text-[var(--foreground)] font-semibold">
                    {isDaminha ? 'Chegada das Daminhas com os Pais' : 'Chegada dos Padrinhos e Madrinhas'}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-sans mt-1 text-justified-elegant">
                    {isDaminha 
                      ? 'Chegada com os pais ao local para vestimento tranquilo e primeiras fotos.'
                      : 'Chegada antecedente ao local da celebração para organização de cortejo e alinhamento.'}
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-black dark:bg-white border-4 border-white dark:border-zinc-900"></div>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block font-mono">19h</span>
                  <h3 className="text-lg font-serif text-[var(--foreground)] font-semibold">Início Solene da Cerimônia</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-sans mt-1 text-justified-elegant">
                    Momento emocionante da celebração do casamento de Aline e Klécio.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-black dark:bg-white border-4 border-white dark:border-zinc-900"></div>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block font-mono">20h15</span>
                  <h3 className="text-lg font-serif text-[var(--foreground)] font-semibold">Sessão de Fotos Oficiais com os Noivos</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-sans mt-1 text-justified-elegant">
                    Fotos registradas com todo o carinho no altar.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-black dark:bg-white border-4 border-white dark:border-zinc-900"></div>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block font-mono">22h em diante</span>
                  <h3 className="text-lg font-serif text-[var(--foreground)] font-semibold">Recepção, Brinde e Festa</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-sans mt-1 text-justified-elegant">
                    Abertura da pista de dança, recepção e comemoração inesquecível!
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
