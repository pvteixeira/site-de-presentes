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
  Trash2,
  Heart,
  ChevronRight,
  Info
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
  { id: 'rose', name: 'Rosê Gold', hex: '#D4A373', description: 'Harmonização calorosa, romântica e elegante' },
  { id: 'terracota', name: 'Terracota', hex: '#C86446', description: 'Tom terroso sofisticado para a noite' },
  { id: 'verde-oliva', name: 'Verde Oliva', hex: '#4A6B5D', description: 'Natural, marcante e refinado' },
  { id: 'serenity', name: 'Azul Serenity', hex: '#7A9A9E', description: 'Suavidade clássica e atemporal' },
  { id: 'marsala', name: 'Marsala / Vinho', hex: '#6B2D46', description: 'Elegância intensa para cerimônias noturnas' },
  { id: 'lavanda', name: 'Lavanda', hex: '#9E88B2', description: 'Delicadeza e frescor romântico' },
  { id: 'azul-marinho', name: 'Azul Marinho', hex: '#1E293B', description: 'Profundo, nobre e altamente formal' },
  { id: 'esmeralda', name: 'Verde Esmeralda', hex: '#1B4D3E', description: 'Suntuosidade clássica de gala' },
];

export default function PadrinhosPortal() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedUser, setLoggedUser] = useState<PadrinhoAccount | null>(null);
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'padrinhos' | 'mensagens' | 'cronograma'>('padrinhos');

  // Interactive Harmonizer state
  const [selectedHarmonizerColor, setSelectedHarmonizerColor] = useState(DRESS_COLOR_OPTIONS[0]);
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  // Messages state
  const [announcements] = useState<PadrinhoMessage[]>(INITIAL_ANNOUNCEMENTS);
  const [newReply, setNewReply] = useState('');
  const [padrinhoReplies, setPadrinhoReplies] = useState<{ id: string; author: string; text: string; date: string }[]>([]);
  const [replySuccess, setReplySuccess] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check stored session on mount
  useEffect(() => {
    setIsAdmin(localStorage.getItem('admin_logged_in') === 'true');

    const savedUser = localStorage.getItem('padrinho_session');
    if (savedUser) {
      try {
        const parsed: PadrinhoAccount = JSON.parse(savedUser);
        const match = PADRINHOS_ACCOUNTS.find(a => a.id === parsed.id);
        if (match) {
          setLoggedUser(match);
          setActiveTab('padrinhos');
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

  const handleDeleteReply = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este recado?')) {
      const updated = padrinhoReplies.filter(r => r.id !== id);
      setPadrinhoReplies(updated);
      localStorage.setItem('padrinho_replies', JSON.stringify(updated));
    }
  };

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
      setActiveTab('padrinhos');
    } else {
      setLoginError('Usuário ou senha incorretos. Por favor, verifique com os noivos.');
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
        {/* Soft Ambient Background Elements */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-slate-100 dark:bg-zinc-900 rounded-full blur-3xl pointer-events-none opacity-60"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-slate-100 dark:bg-zinc-900 rounded-full blur-3xl pointer-events-none opacity-60"></div>

        <header className="max-w-6xl w-full mx-auto flex items-center justify-between z-10 py-3">
          <Link href="/" className="flex items-center gap-2 text-xs md:text-sm text-[var(--foreground)]/70 hover:text-[var(--foreground)] transition-colors">
            <ArrowLeft size={16} /> Voltar ao site principal
          </Link>
          <div className="flex items-center gap-2.5">
            <img src="/img/LOGO_MARCA.png" alt="Logo Marca Aline e Klécio" className="w-8 h-8 rounded-full border border-gray-200 dark:border-zinc-700 object-contain shadow-xs" />
            <span className="font-signature text-2xl md:text-3xl text-[var(--foreground)]">Aline e Klécio</span>
          </div>
        </header>

        <div className="flex-1 flex items-center justify-center my-8 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-zinc-900/95 backdrop-blur-xl w-full max-w-md rounded-3xl p-8 md:p-10 shadow-xl border border-gray-200/90 dark:border-zinc-800"
          >
            <div className="w-20 h-20 p-2 rounded-full border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-850 shadow-inner flex items-center justify-center mx-auto mb-6">
              <img src="/img/LOGO_MARCA.png" alt="Logo Marca Aline e Klécio" className="w-full h-full object-contain rounded-full" />
            </div>

            <div className="text-center space-y-1.5 mb-6">
              <span className="font-signature text-2xl md:text-3xl text-gray-500 dark:text-gray-400 block">
                Área Exclusiva
              </span>
              <h1 className="text-2xl md:text-3xl font-serif text-[var(--foreground)] font-medium">
                Padrinhos e Madrinhas
              </h1>
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-sans leading-relaxed pt-1 max-w-xs mx-auto">
                Digite seu usuário e senha fornecidos pelos noivos para acessar suas orientações.
              </p>
            </div>

            {loginError && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 p-3.5 rounded-2xl text-xs mb-5 flex items-center gap-2.5 font-sans"
              >
                <AlertTriangle size={16} className="shrink-0" />
                <span>{loginError}</span>
              </motion.div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-medium font-sans">
                  Usuário ou E-mail
                </label>
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Ex: debora.carlos ou cleber"
                    required
                    className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 dark:border-zinc-700 bg-gray-50/50 dark:bg-zinc-800/40 text-[var(--foreground)] text-sm focus:outline-none focus:border-black dark:focus:border-white focus:bg-white dark:focus:bg-zinc-850 transition-all font-sans"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-medium font-sans">
                  Senha de Acesso
                </label>
                <div className="relative">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Digite sua senha"
                    required
                    className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 dark:border-zinc-700 bg-gray-50/50 dark:bg-zinc-800/40 text-[var(--foreground)] text-sm focus:outline-none focus:border-black dark:focus:border-white focus:bg-white dark:focus:bg-zinc-850 transition-all font-sans"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-black dark:bg-white text-white dark:text-black py-3.5 rounded-2xl font-medium tracking-wide text-xs md:text-sm shadow-md hover:opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer font-sans"
              >
                <Lock size={15} /> Entrar no Portal
              </button>
            </form>

            <div className="mt-8 pt-5 border-t border-gray-100 dark:border-zinc-800 text-center">
              <p className="text-xs text-gray-400 font-sans">
                Em caso de dúvidas, consulte diretamente Aline ou Klécio.
              </p>
            </div>
          </motion.div>
        </div>

        <footer className="text-center text-xs text-gray-400 py-3 font-sans z-10">
          Aline e Klécio • Casamento dos Sonhos • 09 de Janeiro de 2027
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col">
      {/* Top Fixed Header */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border-b border-gray-200 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-gray-400 hover:text-[var(--foreground)] transition-colors p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-800" title="Voltar à Home">
              <ArrowLeft size={18} />
            </Link>
            <div className="flex items-center gap-2.5">
              <img src="/img/LOGO_MARCA.png" alt="Logo" className="w-8 h-8 rounded-full border border-gray-200 dark:border-zinc-700 object-contain" />
              <div>
                <span className="font-serif font-medium text-base md:text-lg text-[var(--foreground)] block leading-tight">
                  Padrinhos e Madrinhas
                </span>
                <span className="text-[11px] font-sans text-gray-400 hidden sm:block">Aline e Klécio 2027</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <span className="text-xs text-gray-400 block font-sans">Conectado como</span>
              <p className="text-sm font-serif font-medium text-[var(--foreground)] leading-tight">{loggedUser.name}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-sans font-medium bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer"
            >
              <LogOut size={13} /> Sair
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
          className="relative rounded-3xl p-6 md:p-10 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-gray-100 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-850 text-[var(--foreground)] shadow-md border border-gray-200 dark:border-zinc-800"
        >
          <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl md:text-5xl font-serif font-medium text-[var(--foreground)] tracking-tight">
              Olá, {loggedUser.name}!
            </h1>

            <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg font-sans leading-relaxed text-justified-elegant">
              {loggedUser.customMessage || 'Vocês são essenciais em nossas vidas e é um presente ter vocês ao nosso lado neste momento inesquecível!'}
            </p>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 dark:border-zinc-800 gap-2 md:gap-3 overflow-x-auto hide-scrollbar pb-px">
          <button
            onClick={() => setActiveTab('padrinhos')}
            className={`pb-3.5 px-4 font-serif text-base md:text-lg flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${activeTab === 'padrinhos'
              ? 'border-black dark:border-white text-[var(--foreground)] font-semibold'
              : 'border-transparent text-gray-400 hover:text-[var(--foreground)]'
              }`}
          >
            <Users size={18} /> Padrinhos e Madrinhas
          </button>

          <button
            onClick={() => setActiveTab('mensagens')}
            className={`pb-3.5 px-4 font-serif text-base md:text-lg flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${activeTab === 'mensagens'
              ? 'border-black dark:border-white text-[var(--foreground)] font-semibold'
              : 'border-transparent text-gray-400 hover:text-[var(--foreground)]'
              }`}
          >
            <MessageSquare size={18} /> Mural & Avisos
          </button>

          <button
            onClick={() => setActiveTab('cronograma')}
            className={`pb-3.5 px-4 font-serif text-base md:text-lg flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${activeTab === 'cronograma'
              ? 'border-black dark:border-white text-[var(--foreground)] font-semibold'
              : 'border-transparent text-gray-400 hover:text-[var(--foreground)]'
              }`}
          >
            <Calendar size={18} /> Cronograma do Dia
          </button>
        </div>

        {/* Tab Contents */}
        <AnimatePresence mode="wait">

          {/* TAB 1: PADRINHOS E MADRINHAS */}
          {activeTab === 'padrinhos' && (
            <motion.div
              key="padrinhos"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-10"
            >
              {/* Introduction Banner */}
              <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 md:p-8 shadow-sm border border-gray-200 dark:border-zinc-800">
                <div className="max-w-3xl space-y-2">
                  <span className="text-xs uppercase tracking-widest text-gray-400 font-sans font-semibold">
                    Dress Code Oficial
                  </span>
                  <h2 className="text-2xl md:text-4xl font-serif text-[var(--foreground)] font-medium">
                    Guia de Trajes & Orientações do Cortejo
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 font-sans text-sm md:text-base leading-relaxed text-justified-elegant">
                    Preparamos todas as orientações sobre vestimentas, cores e detalhes para que todos estejamos em perfeita harmonia no altar.
                  </p>
                </div>
              </div>

              {/* Seção Exclusiva da Daminha (Exibida somente se a conta possuir daminha vinculada) */}
              {loggedUser.daminha && (
                <div className="bg-gradient-to-br from-rose-50/70 via-white to-pink-50/40 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-850 rounded-3xl p-6 md:p-9 shadow-sm border border-rose-200/70 dark:border-zinc-800 space-y-6">
                  <div className="flex items-center gap-3.5 pb-4 border-b border-rose-100 dark:border-zinc-800">
                    <div className="w-11 h-11 rounded-2xl bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center justify-center font-serif font-bold text-2xl border border-rose-200 dark:border-rose-900/40 shrink-0">
                      🌸
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-widest text-rose-600 dark:text-rose-400 font-sans font-medium">Orientações Especiais</span>
                      <h3 className="text-2xl md:text-3xl font-serif text-[var(--foreground)] font-medium leading-tight">
                        Traje da Daminha ({loggedUser.daminha})
                      </h3>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 font-sans text-sm leading-relaxed text-justified-elegant">
                    Como pais da nossa querida daminha <strong>{loggedUser.daminha}</strong>, preparamos as seguintes orientações para o grande dia:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans text-sm">
                    <div className="p-4.5 rounded-2xl bg-white dark:bg-zinc-800/40 border border-rose-100 dark:border-zinc-800 shadow-2xs space-y-1.5">
                      <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-serif font-semibold text-base">
                        <Sparkles size={16} />
                        <span>Vestidinho</span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed text-justified-elegant">
                        Vestido infantil clássico de daminha em tons claros / off-white com detalhes delicados e corte confortável.
                      </p>
                    </div>

                    <div className="p-4.5 rounded-2xl bg-white dark:bg-zinc-800/40 border border-rose-100 dark:border-zinc-800 shadow-2xs space-y-1.5">
                      <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-serif font-semibold text-base">
                        <Smile size={16} />
                        <span>Calçado & Acessórios</span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed text-justified-elegant">
                        Sapatinho confortável para caminhada graciosa e leve até o altar, com acessório de cabelo delicado (tiara ou laço).
                      </p>
                    </div>

                    <div className="p-4.5 rounded-2xl bg-white dark:bg-zinc-800/40 border border-rose-100 dark:border-zinc-800 shadow-2xs space-y-1.5">
                      <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-serif font-semibold text-base">
                        <Clock size={16} />
                        <span>Horário & Fotos</span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed text-justified-elegant">
                        Chegada às <strong>18h</strong> com os pais ao local da cerimônia para se arrumarem sem pressa e registrarem as primeiras fotos.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Madrinhas & Padrinhos Cards Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

                {/* 1. COLUMN MADRINHAS */}
                <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 md:p-9 shadow-sm border border-gray-200 dark:border-zinc-800 flex flex-col justify-between space-y-8">
                  <div className="space-y-7">

                    {/* Header Block */}
                    <div className="flex items-center gap-3.5 pb-5 border-b border-gray-100 dark:border-zinc-800">
                      <div className="w-11 h-11 rounded-2xl bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 flex items-center justify-center font-serif font-semibold text-xl border border-rose-200 dark:border-rose-900/40 shrink-0">
                        M
                      </div>
                      <div>
                        <span className="text-xs uppercase tracking-widest text-gray-400 font-sans font-medium">Orientações Femininas</span>
                        <h3 className="text-2xl md:text-3xl font-serif text-[var(--foreground)] font-medium leading-tight">
                          {DRESS_CODE_INFO.madrinhas.title}
                        </h3>
                      </div>
                    </div>

                    {/* Mensagem Inicial */}
                    <div className="bg-gray-50/80 dark:bg-zinc-800/40 p-5 rounded-2xl border-l-3 border-gray-400 dark:border-zinc-600">
                      <p className="text-gray-700 dark:text-gray-200 text-sm md:text-base leading-relaxed text-justified-elegant font-sans">
                        {DRESS_CODE_INFO.madrinhas.description} A paleta de cores será livre, para que possam escolher o tom e estilo que mais combinem com vocês, com vestidos longos e elegantes para a cerimônia.
                      </p>
                    </div>

                    {/* Diretrizes Principais */}
                    <div className="space-y-3.5">
                      <h4 className="font-serif text-lg font-medium text-[var(--foreground)] flex items-center gap-2 pb-1 border-b border-gray-100 dark:border-zinc-800">
                        <Sparkles size={16} className="text-gray-400" /> Diretrizes das Madrinhas
                      </h4>

                      <div className="space-y-3 font-sans text-sm">
                        {/* Guideline 1 */}
                        <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-gray-50/50 dark:bg-zinc-800/20 border border-gray-100 dark:border-zinc-800">
                          <div className="w-8 h-8 rounded-xl bg-gray-100 dark:bg-zinc-800 text-[var(--foreground)] flex items-center justify-center shrink-0 mt-0.5 border border-gray-200 dark:border-zinc-700">
                            <Scissors size={15} />
                          </div>
                          <div>
                            <span className="font-serif font-semibold text-base text-[var(--foreground)] block">Comprimento Obrigatório</span>
                            <p className="text-gray-600 dark:text-gray-300 mt-0.5 leading-relaxed text-justified-elegant">
                              Vestidos estritamente <strong className="text-[var(--foreground)]">LONGOS</strong> e sofisticados, adequados à solenidade da celebração às 19h.
                            </p>
                          </div>
                        </div>

                        {/* Guideline 2 */}
                        <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-gray-50/50 dark:bg-zinc-800/20 border border-gray-100 dark:border-zinc-800">
                          <div className="w-8 h-8 rounded-xl bg-gray-100 dark:bg-zinc-800 text-[var(--foreground)] flex items-center justify-center shrink-0 mt-0.5 border border-gray-200 dark:border-zinc-700">
                            <Palette size={15} />
                          </div>
                          <div>
                            <span className="font-serif font-semibold text-base text-[var(--foreground)] block">Paleta Livre</span>
                            <p className="text-gray-600 dark:text-gray-300 mt-0.5 leading-relaxed text-justified-elegant">
                              Cores inteiramente <strong className="text-[var(--foreground)]">LIVRES</strong> — escolha a tonalidade que faz você se sentir mais linda e confiante.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Restricted Alert */}
                    <div className="bg-amber-500/10 dark:bg-amber-950/20 border-l-3 border-amber-500 rounded-2xl p-4.5 space-y-1.5">
                      <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-semibold font-serif text-sm">
                        <AlertTriangle size={16} className="shrink-0" />
                        <span>Atenção Exclusiva</span>
                      </div>
                      <p className="text-xs md:text-sm text-amber-900/90 dark:text-amber-200/90 font-sans leading-relaxed text-justified-elegant">
                        Não será permitido o uso de vestidos nas cores <strong>branco, off-white e champanhe</strong> (reservadas exclusivamente à noiva).
                      </p>
                    </div>

                    {/* Grupo do WhatsApp das Madrinhas */}
                    <div className="bg-[#25D366]/10 dark:bg-[#25D366]/15 border border-[#25D366]/30 dark:border-[#25D366]/20 rounded-2xl p-5 md:p-6 flex flex-col items-center text-center space-y-3">
                      <div className="space-y-1 max-w-md mx-auto">
                        <h4 className="text-base md:text-lg font-serif font-medium text-emerald-950 dark:text-emerald-100">
                          Grupo das Madrinhas
                        </h4>
                        <p className="text-xs text-emerald-900/80 dark:text-emerald-300/80 font-sans">
                          Tire dúvidas e alinhe os preparativos no WhatsApp exclusivo das madrinhas.
                        </p>
                      </div>

                      <a
                        href="https://chat.whatsapp.com/DzTUJcujovC9foT8p6SWJU?mode=gi_t"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#128C7E] text-white font-medium text-xs shadow-sm transition-all hover:scale-[1.02] cursor-pointer font-sans"
                      >
                        <WhatsAppIcon className="w-4 h-4 shrink-0" />
                        <span>Entrar no Grupo WhatsApp</span>
                      </a>
                    </div>

                    {/* Inspirações para Madrinhas */}
                    <div className="space-y-4 pt-3 border-t border-gray-100 dark:border-zinc-800">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xl font-serif text-[var(--foreground)] font-medium flex items-center gap-2">
                            <Sparkles size={16} className="text-gray-400" /> Inspirações de Modelagens
                          </h4>
                          <span className="text-[11px] bg-gray-100 dark:bg-zinc-800 text-gray-500 px-2.5 py-0.5 rounded-full font-sans font-medium">8 referências</span>
                        </div>
                        <p className="text-xs text-gray-500 font-sans leading-relaxed text-justified-elegant">
                          As imagens abaixo servem como inspiração de cortes e caimentos elegantes. A cor e o tecido são de livre escolha de cada madrinha.
                        </p>
                      </div>

                      {/* Responsive Image Grid */}
                      <div className="grid grid-cols-2 gap-3">
                        {MADRINHAS_GALLERY_ITEMS.map((item) => (
                          <div
                            key={item.id}
                            onClick={() => setLightboxItem(item)}
                            className="group relative rounded-2xl overflow-hidden border border-gray-200 dark:border-zinc-700/60 shadow-2xs cursor-pointer bg-zinc-900 aspect-[3/4]"
                          >
                            <img
                              src={item.url}
                              alt={item.title}
                              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity flex flex-col justify-between p-3">
                              <div className="flex justify-end">
                                <span className="w-6 h-6 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-white/20">
                                  <ZoomIn size={12} />
                                </span>
                              </div>

                              <div>
                                <span className="text-[10px] uppercase font-sans tracking-wide bg-white/20 text-white px-2 py-0.5 rounded-full backdrop-blur-xs font-medium inline-block mb-1">
                                  {item.tag}
                                </span>
                                <h5 className="text-xs font-serif text-white font-medium line-clamp-1">{item.title}</h5>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>

                {/* 2. COLUMN PADRINHOS */}
                <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 md:p-9 shadow-sm border border-gray-200 dark:border-zinc-800 flex flex-col justify-between space-y-8">
                  <div className="space-y-7">

                    {/* Header Block */}
                    <div className="flex items-center gap-3.5 pb-5 border-b border-gray-100 dark:border-zinc-800">
                      <div className="w-11 h-11 rounded-2xl bg-slate-100 dark:bg-zinc-800 text-slate-900 dark:text-white flex items-center justify-center font-serif font-semibold text-xl border border-slate-300 dark:border-zinc-700 shrink-0">
                        P
                      </div>
                      <div>
                        <span className="text-xs uppercase tracking-widest text-gray-400 font-sans font-medium">Orientações Masculinas</span>
                        <h3 className="text-2xl md:text-3xl font-serif text-[var(--foreground)] font-medium leading-tight">
                          {DRESS_CODE_INFO.padrinhos.title}
                        </h3>
                      </div>
                    </div>

                    {/* Mensagem Inicial */}
                    <div className="bg-gray-50/80 dark:bg-zinc-800/40 p-5 rounded-2xl border-l-3 border-gray-400 dark:border-zinc-600">
                      <p className="text-gray-700 dark:text-gray-200 text-sm md:text-base leading-relaxed text-justified-elegant font-sans">
                        {DRESS_CODE_INFO.padrinhos.description}
                      </p>
                    </div>

                    {/* Diretrizes Principais */}
                    <div className="space-y-3.5">
                      <h4 className="font-serif text-lg font-medium text-[var(--foreground)] flex items-center gap-2 pb-1 border-b border-gray-100 dark:border-zinc-800">
                        <CheckCircle2 size={16} className="text-gray-400" /> Diretrizes dos Padrinhos
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-sans text-sm">
                        {/* Guideline 1: Terno */}
                        <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-gray-50/50 dark:bg-zinc-800/20 border border-gray-100 dark:border-zinc-800">
                          <div className="w-8 h-8 rounded-xl bg-black text-white flex items-center justify-center shrink-0 mt-0.5">
                            <Shirt size={15} />
                          </div>
                          <div>
                            <span className="font-serif font-semibold text-base text-[var(--foreground)] block">Terno Preto</span>
                            <p className="text-gray-600 dark:text-gray-300 text-xs mt-0.5 leading-relaxed">
                              Social completo clássico (paletó e calça pretos).
                            </p>
                          </div>
                        </div>

                        {/* Guideline 2: Gravata */}
                        <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-gray-50/50 dark:bg-zinc-800/20 border border-gray-100 dark:border-zinc-800">
                          <div className="w-8 h-8 rounded-xl bg-slate-300 text-slate-800 flex items-center justify-center shrink-0 mt-0.5 border border-slate-400/50">
                            <Sparkles size={15} />
                          </div>
                          <div>
                            <span className="font-serif font-semibold text-base text-[var(--foreground)] block">Gravata Prata</span>
                            <p className="text-gray-600 dark:text-gray-300 text-xs mt-0.5 leading-relaxed">
                              Gravata social clássica na cor prata.
                            </p>
                          </div>
                        </div>

                        {/* Guideline 3: Sapato */}
                        <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-gray-50/50 dark:bg-zinc-800/20 border border-gray-100 dark:border-zinc-800">
                          <div className="w-8 h-8 rounded-xl bg-black text-white flex items-center justify-center shrink-0 mt-0.5">
                            <CheckCircle2 size={15} />
                          </div>
                          <div>
                            <span className="font-serif font-semibold text-base text-[var(--foreground)] block">Sapato Preto</span>
                            <p className="text-gray-600 dark:text-gray-300 text-xs mt-0.5 leading-relaxed">
                              Sapato social preto com meias pretas.
                            </p>
                          </div>
                        </div>

                        {/* Guideline 4: Camisa */}
                        <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-gray-50/50 dark:bg-zinc-800/20 border border-gray-100 dark:border-zinc-800">
                          <div className="w-8 h-8 rounded-xl bg-white text-black flex items-center justify-center shrink-0 mt-0.5 border border-gray-300">
                            <CheckCircle2 size={15} />
                          </div>
                          <div>
                            <span className="font-serif font-semibold text-base text-[var(--foreground)] block">Camisa Branca</span>
                            <p className="text-gray-600 dark:text-gray-300 text-xs mt-0.5 leading-relaxed">
                              Social branca de manga longa tradicional.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Orientação para Pajens */}
                      <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/25 border border-blue-100 dark:border-blue-900/40 mt-3">
                        <div className="w-8 h-8 rounded-xl bg-blue-900 dark:bg-blue-300 text-white dark:text-blue-950 flex items-center justify-center shrink-0 mt-0.5 font-serif font-semibold text-sm">
                          P
                        </div>
                        <div>
                          <span className="font-serif font-semibold text-base text-[var(--foreground)] block">Traje dos Pajens</span>
                          <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm mt-0.5 leading-relaxed text-justified-elegant font-sans">
                            Para os pajens: traje social infantil em <strong className="text-[var(--foreground)]">Azul Marinho ou Preto</strong>.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Interactive Harmonizer Widget */}
                    <div className="bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-white p-6 md:p-7 rounded-3xl shadow-xl border border-zinc-800 space-y-5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 border-b border-zinc-800">
                        <div>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[10px] font-sans font-medium uppercase tracking-widest text-gray-300 backdrop-blur-md mb-1.5 border border-white/10">
                            <Sparkles size={11} className="text-gray-300" /> Simulador do Casal no Altar
                          </span>
                          <h4 className="text-xl font-serif text-white font-medium">Harmonia Visual no Altar</h4>
                        </div>
                        <span className="text-xs text-gray-400 font-sans">
                          Selecione um tom para visualizar
                        </span>
                      </div>

                      {/* Color Palette Selector */}
                      <div>
                        <p className="text-xs uppercase tracking-wider text-gray-400 font-medium mb-2.5 font-sans">
                          Cor do vestido da Madrinha:
                        </p>
                        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
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
                                  className="w-6 h-6 rounded-full shadow-inner border border-white/20 transition-transform group-hover:scale-110 flex items-center justify-center"
                                  style={{ backgroundColor: opt.hex }}
                                >
                                  {isSelected && <Check size={12} className="text-white drop-shadow-md" />}
                                </div>
                                <span className="text-[10px] text-gray-300 font-sans mt-1 line-clamp-1 text-center font-medium">
                                  {opt.name.split('/')[0]}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Visual Live Comparison Preview */}
                      <div className="bg-zinc-900/80 rounded-2xl p-5 border border-zinc-800 flex flex-col sm:flex-row items-center justify-around gap-5">

                        {/* Madrinha Model Preview */}
                        <div className="flex flex-col items-center text-center space-y-2">
                          <span className="text-xs uppercase font-medium tracking-wider text-gray-400 font-sans">Vestido Madrinha</span>
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={selectedHarmonizerColor.id + '-dress'}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.9 }}
                              transition={{ duration: 0.3 }}
                              className="relative w-28 h-32 rounded-2xl border border-white/20 flex flex-col items-center justify-center shadow-lg p-3 overflow-hidden"
                              style={{ backgroundColor: selectedHarmonizerColor.hex }}
                            >
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-white/20 pointer-events-none"></div>
                              <div className="z-10 text-white flex flex-col items-center">
                                <span className="text-xl mb-0.5">👗</span>
                                <span className="text-xs font-serif font-bold text-white drop-shadow-md">LONGO</span>
                                <span className="text-[10px] font-sans text-white/90 drop-shadow-xs uppercase mt-0.5">{selectedHarmonizerColor.name}</span>
                              </div>
                            </motion.div>
                          </AnimatePresence>
                        </div>

                        {/* Harmony Indicator Plus */}
                        <div className="flex flex-col items-center text-gray-400">
                          <span className="text-xl font-serif text-white/80">+</span>
                          <span className="text-[10px] uppercase tracking-widest text-gray-400 font-sans">Combinação</span>
                        </div>

                        {/* Padrinho Model Preview */}
                        <div className="flex flex-col items-center text-center space-y-2">
                          <span className="text-xs uppercase font-medium tracking-wider text-gray-400 font-sans">Traje Padrinho</span>
                          <div className="relative w-28 h-32 bg-zinc-950 rounded-2xl border border-zinc-700 flex flex-col items-center justify-start pt-2.5 shadow-lg p-3 overflow-hidden">
                            <div className="w-10 h-5 bg-white rounded-b-sm flex items-center justify-center shadow-xs">
                              <div
                                className="w-3 h-14 rounded-b shadow-md bg-slate-300 border-x border-slate-400"
                                style={{ backgroundColor: '#D1D5DB' }}
                              ></div>
                            </div>
                            <div className="z-10 mt-auto text-center">
                              <span className="text-[10px] font-bold text-white block uppercase tracking-wider">Terno Preto</span>
                              <span className="text-[10px] font-sans text-slate-300 block">Gravata Prata</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Description Footnote */}
                      <div className="pt-2 border-t border-zinc-800/80 text-center">
                        <p className="text-xs text-gray-300 font-sans leading-relaxed">
                          ✨ O Terno Preto com Gravata Prata e Camisa Branca compõe um visual atemporal que harmoniza perfeitamente com o vestido <span className="text-white font-semibold">{selectedHarmonizerColor.name}</span> da Madrinha!
                        </p>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* TAB 2: MURAL E AVISOS */}
          {activeTab === 'mensagens' && (
            <motion.div
              key="mensagens"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 md:p-8 shadow-sm border border-gray-200 dark:border-zinc-800">
                <span className="text-xs uppercase tracking-widest text-gray-400 font-sans font-semibold">Comunicados</span>
                <h2 className="text-2xl md:text-3xl font-serif text-[var(--foreground)] font-medium mb-6 flex items-center gap-2">
                  <Sparkles size={20} className="text-gray-400" /> Recados e Avisos dos Noivos
                </h2>

                <div className="space-y-4">
                  {announcements.map((ann) => (
                    <div
                      key={ann.id}
                      className={`p-6 rounded-2xl border transition-all ${ann.isImportant
                        ? 'bg-slate-50/80 dark:bg-zinc-800/80 border-slate-300 dark:border-zinc-700 shadow-2xs'
                        : 'bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800'
                        }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--foreground)] font-sans">
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
              <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 md:p-8 shadow-sm border border-gray-200 dark:border-zinc-800">
                <h3 className="text-xl font-serif text-[var(--foreground)] mb-1 flex items-center gap-2 font-medium">
                  <MessageSquare size={18} className="text-gray-400" /> Deixar Recado para Aline e Klécio
                </h3>
                <p className="text-xs text-gray-500 font-sans mb-6">
                  Escreva um recado especial, tire dúvidas ou envie um carinho para os noivos.
                </p>

                {replySuccess && (
                  <div className="bg-green-500/10 border border-green-500/30 text-green-600 p-3.5 rounded-2xl text-xs md:text-sm mb-4 flex items-center gap-2 font-sans">
                    <CheckCircle2 size={16} /> Recado enviado com sucesso para os noivos!
                  </div>
                )}

                <form onSubmit={handleSendReply} className="space-y-4">
                  <textarea
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                    placeholder="Digite sua mensagem aqui com carinho..."
                    rows={4}
                    required
                    className="w-full p-4 rounded-2xl border border-gray-200 dark:border-zinc-700 bg-gray-50/50 dark:bg-zinc-800/40 text-[var(--foreground)] focus:outline-none focus:border-black dark:focus:border-white focus:bg-white dark:focus:bg-zinc-850 font-sans text-sm transition-all"
                  />
                  <button
                    type="submit"
                    className="flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-2xl font-medium text-xs md:text-sm hover:opacity-90 transition-colors shadow-sm cursor-pointer font-sans"
                  >
                    <Send size={15} /> Enviar Mensagem aos Noivos
                  </button>
                </form>

                {padrinhoReplies.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-gray-100 dark:border-zinc-800">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 font-sans mb-4">Seus Recados Enviados:</h4>
                    <div className="space-y-3">
                      {padrinhoReplies.map((r) => (
                        <div key={r.id} className="bg-gray-50 dark:bg-zinc-800/40 p-4 rounded-2xl text-sm font-sans border border-gray-100 dark:border-zinc-700/50">
                          <div className="flex justify-between items-center text-xs text-gray-400 mb-1">
                            <span className="font-bold text-[var(--foreground)]">{r.author}</span>
                            <div className="flex items-center gap-2">
                              <span>{r.date}</span>
                              {isAdmin && (
                                <button
                                  onClick={() => handleDeleteReply(r.id)}
                                  className="p-1 text-red-500 hover:bg-red-500/10 rounded transition-colors cursor-pointer"
                                  title="Excluir recado (ADM)"
                                >
                                  <Trash2 size={13} />
                                </button>
                              )}
                            </div>
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
              className="bg-white dark:bg-zinc-900 rounded-3xl p-6 md:p-8 shadow-sm border border-gray-200 dark:border-zinc-800"
            >
              <div className="space-y-1 mb-8">
                <span className="text-xs uppercase tracking-widest text-gray-400 font-sans font-semibold">Organização</span>
                <h2 className="text-2xl md:text-3xl font-serif text-[var(--foreground)] font-medium flex items-center gap-2">
                  <Calendar size={20} className="text-gray-400" /> Cronograma do Grande Dia
                </h2>
                <p className="text-xs text-gray-500 font-sans">
                  Horários planejados com carinho para aproveitarmos juntos cada instante da celebração.
                </p>
              </div>

              <div className="relative border-l-2 border-slate-200 dark:border-zinc-700 pl-6 md:pl-8 space-y-8 ml-2">

                <div className="relative">
                  <div className="absolute -left-[31px] md:-left-[39px] top-1 w-4 h-4 rounded-full bg-black dark:bg-white border-4 border-white dark:border-zinc-900 shadow-xs"></div>
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider block font-sans">18h00</span>
                  <h3 className="text-lg font-serif text-[var(--foreground)] font-semibold">
                    Chegada do Cortejo (Padrinhos, Madrinhas e Daminhas)
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-sans mt-1 text-justified-elegant">
                    Chegada antecipada ao local da celebração para alinhamento do cortejo, organização e fotos oficiais com os noivos.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[31px] md:-left-[39px] top-1 w-4 h-4 rounded-full bg-black dark:bg-white border-4 border-white dark:border-zinc-900 shadow-xs"></div>
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider block font-sans">19h00</span>
                  <h3 className="text-lg font-serif text-[var(--foreground)] font-semibold">Início Solene da Cerimônia Religiosa</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-sans mt-1 text-justified-elegant">
                    Momento sagrado da celebração do casamento e troca de votos de Aline e Klécio.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[31px] md:-left-[39px] top-1 w-4 h-4 rounded-full bg-black dark:bg-white border-4 border-white dark:border-zinc-900 shadow-xs"></div>
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider block font-sans">20h15</span>
                  <h3 className="text-lg font-serif text-[var(--foreground)] font-semibold">Sessão de Fotos Oficiais no Altar</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-sans mt-1 text-justified-elegant">
                    Registro de fotos carinhosas no altar com padrinhos, madrinhas, daminhas e familiares.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[31px] md:-left-[39px] top-1 w-4 h-4 rounded-full bg-black dark:bg-white border-4 border-white dark:border-zinc-900 shadow-xs"></div>
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider block font-sans">22h00 em diante</span>
                  <h3 className="text-lg font-serif text-[var(--foreground)] font-semibold">Recepção, Brinde e Festa</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-sans mt-1 text-justified-elegant">
                    Abertura da pista de dança, buffet e celebração inesquecível da nossa união!
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
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-4xl w-full bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
              >
                {/* Close Button */}
                <button
                  onClick={() => setLightboxItem(null)}
                  className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 text-white hover:bg-white hover:text-black transition-colors flex items-center justify-center cursor-pointer border border-white/20"
                  title="Fechar"
                >
                  <X size={18} />
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
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[10px] uppercase font-sans font-medium tracking-widest text-gray-300 border border-white/15">
                      {lightboxItem.tag}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-serif font-medium">{lightboxItem.title}</h3>
                    <p className="text-sm text-gray-300 font-sans leading-relaxed text-justified-elegant">
                      {lightboxItem.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-zinc-800 space-y-3">
                    <div className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-xs text-gray-400 font-sans leading-relaxed">
                      💡 <strong>Lembrete dos Noivos:</strong> Esta imagem é apenas uma referência de caimento. A cor e o tecido são de livre escolha de cada madrinha.
                    </div>

                    <button
                      onClick={() => setLightboxItem(null)}
                      className="w-full py-3 bg-white text-black font-medium rounded-2xl text-xs uppercase tracking-wider hover:bg-gray-200 transition-colors cursor-pointer font-sans"
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
