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
  HelpCircle,
  Shirt,
  Scissors,
  Check,
  X,
  ZoomIn,
  MessageCircle
} from 'lucide-react';
import {
  PADRINHOS_ACCOUNTS,
  PadrinhoAccount,
  INITIAL_ANNOUNCEMENTS,
  PadrinhoMessage,
  DRESS_CODE_INFO
} from '../data/padrinhosData';

function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}

interface GalleryItem {
  id: string;
  title: string;
  tag: string;
  description: string;
  url: string;
}

const MADRINHAS_GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'sereia',
    title: 'Corte Sereia Elegante',
    tag: 'Corte Sereia',
    description: 'Modelagem ajustada ao corpo que se abre delicadamente a partir dos joelhos.',
    url: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'evase',
    title: 'Corte Evasê Clássico',
    tag: 'Corte Evasê',
    description: 'Caimento em A que valoriza a silhueta com leveza e movimento natural.',
    url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'cetim',
    title: 'Tecido Acetinado Nobre',
    tag: 'Tecido Acetinado',
    description: 'Seda ou cetim fluido com brilho discreto para celebrações à noite.',
    url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'chiffon',
    title: 'Chiffon Esvoaçante',
    tag: 'Chiffon Leve',
    description: 'Tecido leve e esvoaçante que traz frescor e extrema delicadeza.',
    url: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'mangas',
    title: 'Vestido com Mangas Delicadas',
    tag: 'Mangas Elegantes',
    description: 'Mangas longas ou 3/4 em tule ou tecido estruturado para um toque solene.',
    url: 'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'um-ombro',
    title: 'Ombro Único (Assimétrico)',
    tag: 'Um Ombro Só',
    description: 'Decote assimétrico moderno mantendo a sobriedade e sofisticação.',
    url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'decote-discreto',
    title: 'Decote Clássico e Discreto',
    tag: 'Decote Discreto',
    description: 'Gola alta, decote canoa ou reto que valorizam o colo de forma elegante.',
    url: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'minimalista',
    title: 'Minimalista Chique',
    tag: 'Minimalista',
    description: 'Linhas limpas, sem bordados excessivos, com foco no corte impecável.',
    url: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1000&auto=format&fit=crop',
  },
];

const DRESS_COLOR_OPTIONS = [
  { id: 'rose', name: 'Rosê Gold', hex: '#D4A373', tieName: 'Gravata Rosê Gold', description: 'Harmonização calorosa, romântica e elegante' },
  { id: 'terracota', name: 'Terracota', hex: '#C86446', tieName: 'Gravata Terracota', description: 'Tom terroso sofisticado para fim de tarde/noite' },
  { id: 'verde-oliva', name: 'Verde Oliva', hex: '#4A6B5D', tieName: 'Gravata Verde Oliva', description: 'Naturais, marcantes e muito chiques' },
  { id: 'serenity', name: 'Azul Serenity', hex: '#7A9A9E', tieName: 'Gravata Azul Serenity', description: 'Suavidade clássica e atemporal' },
  { id: 'marsala', name: 'Marsala / Vinho', hex: '#6B2D46', tieName: 'Gravata Marsala', description: 'Elegância intensa perfeita para a noite' },
  { id: 'lavanda', name: 'Lavanda', hex: '#9E88B2', tieName: 'Gravata Lavanda', description: 'Delicadeza e frescor romântico' },
  { id: 'prata', name: 'Prata Metalizado', hex: '#9CA3AF', tieName: 'Gravata Prata Metalizada', description: 'Harmonização metálica e moderna' },
  { id: 'nude', name: 'Nude / Champagne', hex: '#CDB4DB', tieName: 'Gravata Nude / Champagne', description: 'Tom neutro e ultra elegante' },
];

export default function PadrinhosPortal() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedUser, setLoggedUser] = useState<PadrinhoAccount | null>(null);
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'padrinhos' | 'daminhas' | 'mensagens' | 'cronograma'>('padrinhos');

  // Interactive Tie Color Harmonizer state
  const [selectedHarmonizerColor, setSelectedHarmonizerColor] = useState(DRESS_COLOR_OPTIONS[0]);
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

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
            <img src="/img/LOGO_MARCA.png" alt="Logo Marca Aline e Klécio" className="w-8 h-8 rounded-full border border-gray-300 dark:border-zinc-700 object-contain" />
            <span className="font-signature text-2xl text-[var(--foreground)] font-normal">Aline e Klécio</span>
          </div>
        </header>

        <div className="flex-1 flex items-center justify-center my-8 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl w-full max-w-md rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-zinc-800"
          >
            <div className="w-20 h-20 p-1.5 rounded-full border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-md flex items-center justify-center mx-auto mb-6 overflow-hidden">
              <img src="/img/LOGO_MARCA.png" alt="Logo Marca Aline e Klécio" className="w-full h-full object-contain rounded-full" />
            </div>

            <h1 className="text-2xl md:text-3xl font-serif text-center text-[var(--foreground)] mb-2 font-medium">
              Área dos Padrinhos e Madrinhas
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
              <img src="/img/LOGO_MARCA.png" alt="Logo" className="w-8 h-8 rounded-full border border-gray-300 dark:border-zinc-700 object-contain" />
              <div>
                <span className="font-serif font-semibold text-base md:text-lg text-[var(--foreground)] block leading-tight">
                  {isDaminha ? 'Área Exclusiva das Daminhas' : 'Área Restrita dos Padrinhos e Madrinhas'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-[var(--foreground)]">{loggedUser.name}</p>
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
          className="relative rounded-2xl p-6 md:p-10 overflow-hidden bg-gradient-to-r from-slate-200 via-gray-100 to-slate-200 dark:from-zinc-900 dark:via-zinc-850 dark:to-zinc-900 text-slate-900 dark:text-slate-100 shadow-md border border-slate-300 dark:border-zinc-700"
        >
          <div className="absolute inset-0 bg-slate-300/10 dark:bg-black/20 backdrop-blur-[1px]"></div>

          <div className="relative z-10 max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-serif font-medium mb-3 text-slate-900 dark:text-white">
              Olá, {loggedUser.name}!
            </h1>

            <p className="text-slate-700 dark:text-slate-200 text-base md:text-lg font-sans leading-relaxed mb-6 text-justified-elegant">
              {loggedUser.customMessage || (isDaminha
                ? 'Sua presença enche nosso coração de alegria e doçura!'
                : 'Vocês são essenciais em nossas vidas e é um presente ter vocês ao nosso lado neste momento inesquecível!')}
            </p>

            <div className="flex flex-wrap gap-3 text-xs font-semibold text-slate-900 dark:text-slate-100">
              <span className="bg-slate-300/80 dark:bg-zinc-800 border border-slate-400 dark:border-zinc-700 px-3.5 py-2 rounded-xl backdrop-blur-sm shadow-sm">📅 09 de Janeiro de 2027</span>
              <span className="bg-slate-300/80 dark:bg-zinc-800 border border-slate-400 dark:border-zinc-700 px-3.5 py-2 rounded-xl backdrop-blur-sm shadow-sm">📍 Cerimônia Religiosa e Recepção</span>
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation - Strictly Separated per Role */}
        <div className="flex border-b border-gray-200 dark:border-zinc-800 gap-2 md:gap-4 overflow-x-auto hide-scrollbar">
          {!isDaminha && (
            <button
              onClick={() => setActiveTab('padrinhos')}
              className={`pb-4 px-4 font-serif text-base md:text-lg flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${activeTab === 'padrinhos'
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
              className={`pb-4 px-4 font-serif text-base md:text-lg flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${activeTab === 'daminhas'
                ? 'border-black dark:border-white text-[var(--foreground)] font-semibold'
                : 'border-transparent text-gray-500 hover:text-[var(--foreground)]'
                }`}
            >
              <Flower2 size={18} className="text-gray-400" /> Área das Daminhas
            </button>
          )}

          <button
            onClick={() => setActiveTab('mensagens')}
            className={`pb-4 px-4 font-serif text-base md:text-lg flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${activeTab === 'mensagens'
              ? 'border-black dark:border-white text-[var(--foreground)] font-semibold'
              : 'border-transparent text-gray-500 hover:text-[var(--foreground)]'
              }`}
          >
            <MessageSquare size={18} className="text-gray-400" /> Mural e Avisos
          </button>

          <button
            onClick={() => setActiveTab('cronograma')}
            className={`pb-4 px-4 font-serif text-base md:text-lg flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${activeTab === 'cronograma'
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
              className="space-y-12"
            >
              {/* Introduction Banner - Editorial Style */}
              <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 md:p-10 shadow-md border border-gray-200 dark:border-zinc-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-2 max-w-3xl">
                  <h2 className="text-3xl md:text-4xl font-serif text-[var(--foreground)] font-medium">
                    Guia de Trajes e Orientações
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 font-sans text-sm md:text-base leading-relaxed text-justified-elegant">
                    Preparamos este espaço exclusivo com todas as orientações sobre trajes, diretrizes e sugestões de harmonização para que nosso altar esteja radiante no grande dia.
                  </p>
                </div>
              </div>

              {/* Madrinhas & Padrinhos Cards Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">

                {/* 1. COLUMN MADRINHAS */}
                <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 md:p-10 shadow-md border border-gray-200 dark:border-zinc-800 flex flex-col justify-between space-y-8">
                  <div className="space-y-8">

                    {/* Header Block */}
                    <div className="flex items-center gap-4 pb-6 border-b border-gray-100 dark:border-zinc-800">
                      <div className="w-12 h-12 rounded-2xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold font-serif text-xl shadow-sm shrink-0">
                        M
                      </div>
                      <div>
                        <h3 className="text-2xl md:text-3xl font-serif text-[var(--foreground)] font-medium leading-tight">
                          {DRESS_CODE_INFO.madrinhas.title}
                        </h3>
                      </div>
                    </div>

                    {/* Mensagem Inicial - Estilo Carta Elegante */}
                    <div className="relative bg-gray-50/80 dark:bg-zinc-800/40 p-6 rounded-r-2xl border-l-4 border-gray-400 dark:border-zinc-600 shadow-xs">
                      <span className="text-xs uppercase font-semibold text-gray-400 tracking-wider block mb-2 font-mono">TRAJES MADRINHAS</span>
                      <p className="text-gray-700 dark:text-gray-200 text-base md:text-lg leading-relaxed text-justified-elegant font-sans">
                        {DRESS_CODE_INFO.madrinhas.description} A paleta de cores será livre, para que possam escolher a cor e o estilo que mais combinem com vocês. No entanto, pedimos apenas que optem por vestidos longos, elegantes, que harmonizem com o horário e a proposta clássica da celebração.
                      </p>
                    </div>

                    {/* Diretrizes Principais - Lista Estruturada com Ícones */}
                    <div className="space-y-4">
                      <h4 className="font-serif text-lg font-medium text-[var(--foreground)] flex items-center gap-2 pb-2 border-b border-gray-100 dark:border-zinc-800">
                        <Sparkles size={18} className="text-gray-400" /> Diretrizes Principais
                      </h4>

                      <div className="space-y-4 font-sans text-sm">
                        {/* Guideline 1 */}
                        <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-gray-50/50 dark:bg-zinc-800/20 border border-gray-100 dark:border-zinc-800/60">
                          <div className="w-8 h-8 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                            <Scissors size={16} />
                          </div>
                          <div>
                            <span className="font-serif font-semibold text-base text-[var(--foreground)] block">Comprimento Obrigatório</span>
                            <p className="text-gray-600 dark:text-gray-300 mt-1 leading-relaxed text-justified-elegant">
                              Vestidos estritamente <strong className="text-[var(--foreground)]">LONGOS</strong> e elegantes, adequados à cerimônia solene das 19h e à proposta refinada do evento.
                            </p>
                          </div>
                        </div>

                        {/* Guideline 2 */}
                        <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-gray-50/50 dark:bg-zinc-800/20 border border-gray-100 dark:border-zinc-800/60">
                          <div className="w-8 h-8 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                            <Palette size={16} />
                          </div>
                          <div>
                            <span className="font-serif font-semibold text-base text-[var(--foreground)] block">Liberdade de Cores</span>
                            <p className="text-gray-600 dark:text-gray-300 mt-1 leading-relaxed text-justified-elegant">
                              Paleta de cores inteiramente <strong className="text-[var(--foreground)]">LIVRE</strong> — sinta-se à vontade para escolher a tonalidade e caimento que mais valorizem você.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Restricted Alert - Refined Modern Card */}
                    <div className="bg-red-500/5 dark:bg-red-950/20 border-l-4 border-red-500 border-t border-r border-b border-red-200/60 dark:border-red-900/30 rounded-2xl p-5 md:p-6 space-y-2">
                      <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-semibold font-serif text-sm">
                        <AlertTriangle size={18} className="shrink-0" />
                        <span>INFORMAÇÃO IMPORTANTE</span>
                      </div>
                      <p className="text-xs md:text-sm text-red-700 dark:text-red-300 font-sans leading-relaxed text-justified-elegant">
                        Não será permitido o uso de trajes nas cores branco, off-white e champanhe.
                      </p>
                    </div>

                    {/* Grupo do WhatsApp das Madrinhas */}
                    <div className="bg-[#25D366]/10 dark:bg-[#25D366]/15 border border-[#25D366]/30 dark:border-[#25D366]/20 rounded-2xl p-6 md:p-8 flex flex-col items-center text-center space-y-4 shadow-xs">
                      <div className="space-y-1.5 max-w-md mx-auto">
                        <h4 className="text-lg md:text-xl font-serif font-semibold text-emerald-950 dark:text-emerald-100 whitespace-nowrap">
                          Enlace Matrimonial - Madrinhas
                        </h4>
                        <p className="text-xs text-emerald-900/80 dark:text-emerald-300/80 font-sans leading-relaxed">
                          Clique no botão abaixo para entrar no grupo das madrinhas!
                        </p>
                      </div>

                      <a
                        href="https://chat.whatsapp.com/DzTUJcujovC9foT8p6SWJU?mode=gi_t"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-xs shadow-md transition-all hover:scale-[1.02] cursor-pointer"
                      >
                        <WhatsAppIcon className="w-5 h-5 shrink-0" />
                        <span>Entrar no Grupo</span>
                      </a>
                    </div>

                    {/* Inspirações para Madrinhas - Galeria de Referências */}
                    <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-zinc-800">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xl font-serif text-[var(--foreground)] font-medium flex items-center gap-2">
                            <Sparkles size={18} className="text-gray-400" /> Inspirações para Madrinhas
                          </h4>
                          <span className="text-[10px] bg-gray-100 dark:bg-zinc-800 text-gray-500 px-2.5 py-1 rounded-full font-mono font-medium">8 Referências</span>
                        </div>
                        <p className="text-xs text-gray-500 font-sans leading-relaxed text-justified-elegant">
                          As imagens abaixo são apenas referências de estilo. Cada madrinha poderá escolher livremente a cor e o modelo do vestido, desde que respeite as orientações do casamento.
                        </p>
                      </div>

                      {/* Responsive Image Grid */}
                      <div className="grid grid-cols-2 gap-3">
                        {MADRINHAS_GALLERY_ITEMS.map((item) => (
                          <div
                            key={item.id}
                            onClick={() => setLightboxItem(item)}
                            className="group relative rounded-2xl overflow-hidden border border-gray-200 dark:border-zinc-700/60 shadow-xs cursor-pointer bg-zinc-900 aspect-[3/4]"
                          >
                            <img
                              src={item.url}
                              alt={item.title}
                              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                            />

                            {/* Gradient Overlay & Details */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity flex flex-col justify-between p-3">
                              <div className="flex justify-end">
                                <span className="w-6 h-6 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-white/20">
                                  <ZoomIn size={12} />
                                </span>
                              </div>

                              <div>
                                <span className="text-[9px] font-mono uppercase bg-white/20 text-white px-1.5 py-0.5 rounded backdrop-blur-xs font-semibold inline-block mb-1">
                                  {item.tag}
                                </span>
                                <h5 className="text-[11px] font-serif text-white font-medium line-clamp-1">{item.title}</h5>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>

                {/* 2. COLUMN PADRINHOS */}
                <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 md:p-10 shadow-md border border-gray-200 dark:border-zinc-800 flex flex-col justify-between space-y-8">
                  <div className="space-y-8">

                    {/* Header Block */}
                    <div className="flex items-center gap-4 pb-6 border-b border-gray-100 dark:border-zinc-800">
                      <div className="w-12 h-12 rounded-2xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold font-serif text-xl shadow-sm shrink-0">
                        P
                      </div>
                      <div>
                        <h3 className="text-2xl md:text-3xl font-serif text-[var(--foreground)] font-medium leading-tight">
                          {DRESS_CODE_INFO.padrinhos.title}
                        </h3>
                      </div>
                    </div>

                    {/* Mensagem Inicial - Estilo Carta Elegante */}
                    <div className="relative bg-gray-50/80 dark:bg-zinc-800/40 p-6 rounded-r-2xl border-l-4 border-gray-400 dark:border-zinc-600 shadow-xs">
                      <span className="text-xs uppercase font-semibold text-gray-400 tracking-wider block mb-2 font-mono">ORIENTAÇÃO DOS NOIVOS</span>
                      <p className="text-gray-700 dark:text-gray-200 text-base md:text-lg leading-relaxed text-justified-elegant font-sans">
                        {DRESS_CODE_INFO.padrinhos.description} A gravata deverá harmonizar com a cor do vestido do seu par, preservando a harmonia visual da celebração.
                      </p>
                    </div>

                    {/* Diretrizes Principais - Lista Estruturada com Ícones */}
                    <div className="space-y-4">
                      <h4 className="font-serif text-lg font-medium text-[var(--foreground)] flex items-center gap-2 pb-2 border-b border-gray-100 dark:border-zinc-800">
                        <CheckCircle2 size={18} className="text-gray-400" /> Diretrizes dos Padrinhos
                      </h4>

                      <div className="space-y-3 font-sans text-sm">
                        {/* Guideline 1: Terno */}
                        <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-gray-50/50 dark:bg-zinc-800/20 border border-gray-100 dark:border-zinc-800/60">
                          <div className="w-8 h-8 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                            <Shirt size={16} />
                          </div>
                          <div>
                            <span className="font-serif font-semibold text-base text-[var(--foreground)] block">Terno Completo Preto</span>
                            <p className="text-gray-600 dark:text-gray-300 mt-0.5 leading-relaxed text-justified-elegant">
                              Terno social preto clássico (paletó e calça pretos).
                            </p>
                          </div>
                        </div>

                        {/* Guideline 2: Camisa */}
                        <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-gray-50/50 dark:bg-zinc-800/20 border border-gray-100 dark:border-zinc-800/60">
                          <div className="w-8 h-8 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                            <CheckCircle2 size={16} />
                          </div>
                          <div>
                            <span className="font-serif font-semibold text-base text-[var(--foreground)] block">Camisa Social Branca</span>
                            <p className="text-gray-600 dark:text-gray-300 mt-0.5 leading-relaxed text-justified-elegant">
                              Camisa social branca tradicional de manga longa.
                            </p>
                          </div>
                        </div>

                        {/* Guideline 3: Gravata */}
                        <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-gray-50/50 dark:bg-zinc-800/20 border border-gray-100 dark:border-zinc-800/60">
                          <div className="w-8 h-8 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                            <Sparkles size={16} />
                          </div>
                          <div>
                            <span className="font-serif font-semibold text-base text-[var(--foreground)] block">Gravata Harmonizada</span>
                            <p className="text-gray-600 dark:text-gray-300 mt-0.5 leading-relaxed text-justified-elegant">
                              Na mesma cor ou tom harmonizado com o vestido da sua madrinha/par.
                            </p>
                          </div>
                        </div>

                        {/* Guideline 4: Sapatos */}
                        <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-gray-50/50 dark:bg-zinc-800/20 border border-gray-100 dark:border-zinc-800/60">
                          <div className="w-8 h-8 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                            <CheckCircle2 size={16} />
                          </div>
                          <div>
                            <span className="font-serif font-semibold text-base text-[var(--foreground)] block">Sapato Social Preto</span>
                            <p className="text-gray-600 dark:text-gray-300 mt-0.5 leading-relaxed text-justified-elegant">
                              Sapato social preto clássico com meias pretas.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Interactive Harmonizer Widget - Fully Restored & Premium Component */}
                    <div className="bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-white p-6 md:p-8 rounded-3xl shadow-xl border border-zinc-800 space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-zinc-800">
                        <div>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[10px] font-semibold uppercase tracking-widest text-gray-300 backdrop-blur-md mb-2 border border-white/10 font-mono">
                            <Sparkles size={12} className="text-gray-300" /> SIMULADOR INTERATIVO EM TEMPO REAL
                          </span>
                          <h4 className="text-xl md:text-2xl font-serif text-white font-medium">Harmonizador de Trajes do Casal</h4>
                        </div>
                        <span className="text-xs text-gray-400 font-sans">
                          Toque em uma cor para simular
                        </span>
                      </div>

                      {/* Color Palette Selector */}
                      <div>
                        <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-3 font-mono">
                          Selecione a cor do vestido da Madrinha:
                        </p>
                        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5">
                          {DRESS_COLOR_OPTIONS.map((opt) => {
                            const isSelected = selectedHarmonizerColor.id === opt.id;
                            return (
                              <button
                                key={opt.id}
                                type="button"
                                onClick={() => setSelectedHarmonizerColor(opt)}
                                className={`group relative flex flex-col items-center justify-center p-2 rounded-xl border transition-all duration-300 cursor-pointer ${isSelected
                                  ? 'border-white bg-white/15 scale-105 shadow-md'
                                  : 'border-zinc-800 bg-zinc-900/60 hover:border-zinc-600 hover:bg-zinc-800/80'
                                  }`}
                                title={opt.name}
                              >
                                <div
                                  className="w-7 h-7 rounded-full shadow-inner border border-white/20 transition-transform group-hover:scale-110 flex items-center justify-center"
                                  style={{ backgroundColor: opt.hex }}
                                >
                                  {isSelected && <Check size={14} className="text-white drop-shadow-md" />}
                                </div>
                                <span className="text-[10px] text-gray-300 font-sans mt-1.5 line-clamp-1 text-center font-medium">
                                  {opt.name.split('/')[0]}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Visual Live Comparison Preview */}
                      <div className="bg-zinc-900/80 rounded-2xl p-6 border border-zinc-800 flex flex-col sm:flex-row items-center justify-around gap-6">

                        {/* Madrinha Model Preview */}
                        <div className="flex flex-col items-center text-center space-y-3">
                          <span className="text-xs uppercase font-semibold tracking-wider text-gray-400 font-mono">Vestido Madrinha</span>
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={selectedHarmonizerColor.id + '-dress'}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.9 }}
                              transition={{ duration: 0.3 }}
                              className="relative w-28 h-36 rounded-2xl border border-white/20 flex flex-col items-center justify-center shadow-lg p-3 overflow-hidden"
                              style={{ backgroundColor: selectedHarmonizerColor.hex }}
                            >
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-white/20 pointer-events-none"></div>
                              <div className="z-10 text-white flex flex-col items-center">
                                <span className="text-2xl mb-1">👗</span>
                                <span className="text-xs font-serif font-bold text-white drop-shadow-md">LONGO</span>
                                <span className="text-[10px] font-sans text-white/90 drop-shadow-xs uppercase mt-0.5">{selectedHarmonizerColor.name}</span>
                              </div>
                            </motion.div>
                          </AnimatePresence>
                        </div>

                        {/* Harmony Indicator Plus */}
                        <div className="flex flex-col items-center text-gray-500">
                          <span className="text-2xl font-serif text-white/80">+</span>
                          <span className="text-[9px] uppercase tracking-widest text-gray-400 font-mono">Harmonização</span>
                        </div>

                        {/* Padrinho Model Preview */}
                        <div className="flex flex-col items-center text-center space-y-3">
                          <span className="text-xs uppercase font-semibold tracking-wider text-gray-400 font-mono">Terno & Gravata</span>
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={selectedHarmonizerColor.id + '-tie'}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.9 }}
                              transition={{ duration: 0.3 }}
                              className="relative w-28 h-36 bg-zinc-950 rounded-2xl border border-zinc-700 flex flex-col items-center justify-start pt-3 shadow-lg p-3 overflow-hidden"
                            >
                              <div className="w-10 h-5 bg-white rounded-b-sm flex items-center justify-center shadow-xs">
                                <div
                                  className="w-3.5 h-16 rounded-b shadow-md transition-colors duration-500"
                                  style={{ backgroundColor: selectedHarmonizerColor.hex }}
                                ></div>
                              </div>
                              <div className="z-10 mt-auto text-center">
                                <span className="text-[10px] font-bold text-white block uppercase tracking-wider">Terno Preto</span>
                                <span className="text-[10px] font-sans text-gray-300 block">{selectedHarmonizerColor.tieName}</span>
                              </div>
                            </motion.div>
                          </AnimatePresence>
                        </div>
                      </div>

                      {/* Description Footnote */}
                      <div className="pt-3 border-t border-zinc-800/80 text-center">
                        <p className="text-xs text-gray-300 font-sans leading-relaxed">
                          ✨ <strong>Combinação Selecionada:</strong> Vestido <span className="text-white font-semibold">{selectedHarmonizerColor.name}</span> + <span className="text-white font-semibold">{selectedHarmonizerColor.tieName}</span> em Terno Preto Clássico. ({selectedHarmonizerColor.description}).
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
                      className={`p-6 rounded-2xl border transition-all ${ann.isImportant
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
                      : 'Chegada antecedente ao local da celebração para organização e alinhamento.'}
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

        {/* Lightbox Modal for Madrinhas Inspiration Gallery */}
        <AnimatePresence>
          {lightboxItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxItem(null)}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-4xl w-full bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
              >
                {/* Close Button */}
                <button
                  onClick={() => setLightboxItem(null)}
                  className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 text-white hover:bg-white hover:text-black transition-colors flex items-center justify-center cursor-pointer border border-white/20"
                  title="Fechar"
                >
                  <X size={20} />
                </button>

                {/* Image Display */}
                <div className="md:w-3/5 bg-black flex items-center justify-center overflow-hidden">
                  <img
                    src={lightboxItem.url}
                    alt={lightboxItem.title}
                    className="w-full h-full object-cover max-h-[60vh] md:max-h-[85vh]"
                  />
                </div>

                {/* Details Display */}
                <div className="md:w-2/5 p-6 md:p-8 flex flex-col justify-between text-white space-y-6">
                  <div className="space-y-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[10px] uppercase font-semibold tracking-widest text-gray-300 border border-white/15 font-mono">
                      {lightboxItem.tag}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-serif font-medium">{lightboxItem.title}</h3>
                    <p className="text-sm text-gray-300 font-sans leading-relaxed text-justified-elegant">
                      {lightboxItem.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-zinc-800 space-y-3">
                    <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-gray-400 font-sans leading-relaxed">
                      💡 <strong>Lembrete dos Noivos:</strong> Esta imagem é apenas uma referência de modelo e caimento. A escolha da cor e estilo é inteiramente livre para cada madrinha.
                    </div>

                    <button
                      onClick={() => setLightboxItem(null)}
                      className="w-full py-3 bg-white text-black font-semibold rounded-xl text-xs uppercase tracking-wider hover:bg-gray-200 transition-colors cursor-pointer"
                    >
                      Fechar Visualização
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>
    </div>
  );
}
