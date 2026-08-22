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
  Trash2,
  Heart,
  ChevronRight,
  Info,
  Plus,
  Edit2,
  RotateCcw,
  Crown,
  ExternalLink,
  Save
} from 'lucide-react';
import {
  PADRINHOS_ACCOUNTS,
  PadrinhoAccount,
  INITIAL_ANNOUNCEMENTS,
  PadrinhoMessage,
  INITIAL_SCHEDULE,
  ScheduleItem,
  DRESS_CODE_INFO
} from '../data/padrinhosData';

function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}

export default function PadrinhosPortal() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedUser, setLoggedUser] = useState<PadrinhoAccount | null>(null);
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'padrinhos' | 'mensagens' | 'cronograma'>('padrinhos');

  // Messages & Announcements state
  const [announcements, setAnnouncements] = useState<PadrinhoMessage[]>(INITIAL_ANNOUNCEMENTS);
  const [newReply, setNewReply] = useState('');
  const [padrinhoReplies, setPadrinhoReplies] = useState<{ id: string; author: string; text: string; date: string }[]>([]);
  const [replySuccess, setReplySuccess] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Noivos Announcement creation form
  const [showAddAnnouncement, setShowAddAnnouncement] = useState(false);
  const [annTitle, setAnnTitle] = useState('');
  const [annContent, setAnnContent] = useState('');
  const [annImportant, setAnnImportant] = useState(false);

  // Schedule state & Noivos Schedule editing
  const [schedule, setSchedule] = useState<ScheduleItem[]>(INITIAL_SCHEDULE);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [editingScheduleItem, setEditingScheduleItem] = useState<ScheduleItem | null>(null);
  const [schTime, setSchTime] = useState('');
  const [schTitle, setSchTitle] = useState('');
  const [schDescription, setSchDescription] = useState('');

  // Strict check: only true if the logged user is Aline e Klécio (role: 'noivos')
  const isNoivos = loggedUser?.role === 'noivos';

  // Check stored session and data on mount
  useEffect(() => {
    const savedAnnouncements = localStorage.getItem('padrinho_announcements');
    if (savedAnnouncements) {
      try {
        setAnnouncements(JSON.parse(savedAnnouncements));
      } catch (e) {
        console.error(e);
      }
    }

    const savedSchedule = localStorage.getItem('wedding_schedule_items');
    if (savedSchedule) {
      try {
        setSchedule(JSON.parse(savedSchedule));
      } catch (e) {
        console.error(e);
      }
    }

    const savedUser = localStorage.getItem('padrinho_session');
    if (savedUser) {
      try {
        const parsed: PadrinhoAccount = JSON.parse(savedUser);
        const match = PADRINHOS_ACCOUNTS.find(a => a.id === parsed.id);
        if (match) {
          setLoggedUser(match);
          if (match.role === 'noivos') {
            setIsAdmin(true);
            localStorage.setItem('admin_logged_in', 'true');
          } else {
            setIsAdmin(false);
            localStorage.removeItem('admin_logged_in');
          }
          setActiveTab('padrinhos');
        } else {
          setLoggedUser(null);
          setIsAdmin(false);
          localStorage.removeItem('padrinho_session');
          localStorage.removeItem('admin_logged_in');
        }
      } catch (e) {
        console.error(e);
      }
    } else {
      setIsAdmin(false);
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

  const handleAddAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle.trim() || !annContent.trim()) return;

    const newAnn: PadrinhoMessage = {
      id: 'ann-' + Date.now(),
      title: annTitle.trim(),
      content: annContent.trim(),
      author: 'Aline e Klécio',
      date: new Date().toLocaleDateString('pt-BR'),
      isImportant: annImportant
    };

    const updated = [newAnn, ...announcements];
    setAnnouncements(updated);
    localStorage.setItem('padrinho_announcements', JSON.stringify(updated));
    setAnnTitle('');
    setAnnContent('');
    setAnnImportant(false);
    setShowAddAnnouncement(false);
  };

  const handleDeleteAnnouncement = (id: string) => {
    if (confirm('Deseja realmente remover este comunicado do mural?')) {
      const updated = announcements.filter(a => a.id !== id);
      setAnnouncements(updated);
      localStorage.setItem('padrinho_announcements', JSON.stringify(updated));
    }
  };

  const handleOpenAddSchedule = () => {
    setEditingScheduleItem(null);
    setSchTime('');
    setSchTitle('');
    setSchDescription('');
    setShowScheduleModal(true);
  };

  const handleOpenEditSchedule = (item: ScheduleItem) => {
    setEditingScheduleItem(item);
    setSchTime(item.time);
    setSchTitle(item.title);
    setSchDescription(item.description);
    setShowScheduleModal(true);
  };

  const handleSaveScheduleItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!schTime.trim() || !schTitle.trim()) return;

    let updated: ScheduleItem[];
    if (editingScheduleItem) {
      updated = schedule.map(item => item.id === editingScheduleItem.id ? {
        ...item,
        time: schTime.trim(),
        title: schTitle.trim(),
        description: schDescription.trim()
      } : item);
    } else {
      const newItem: ScheduleItem = {
        id: 'sch-' + Date.now(),
        time: schTime.trim(),
        title: schTitle.trim(),
        description: schDescription.trim()
      };
      updated = [...schedule, newItem];
    }

    setSchedule(updated);
    localStorage.setItem('wedding_schedule_items', JSON.stringify(updated));
    setShowScheduleModal(false);
    setEditingScheduleItem(null);
    setSchTime('');
    setSchTitle('');
    setSchDescription('');
  };

  const handleDeleteScheduleItem = (id: string) => {
    if (confirm('Deseja realmente excluir este horário do cronograma?')) {
      const updated = schedule.filter(s => s.id !== id);
      setSchedule(updated);
      localStorage.setItem('wedding_schedule_items', JSON.stringify(updated));
    }
  };

  const handleResetSchedule = () => {
    if (confirm('Deseja restaurar o cronograma padrão original?')) {
      setSchedule(INITIAL_SCHEDULE);
      localStorage.setItem('wedding_schedule_items', JSON.stringify(INITIAL_SCHEDULE));
    }
  };

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
      return matchUsername && (acc.password === cleanPass || (acc.role === 'noivos' && acc.password.toLowerCase() === cleanPass.toLowerCase()));
    });

    if (userMatch) {
      setLoggedUser(userMatch);
      localStorage.setItem('padrinho_session', JSON.stringify(userMatch));
      if (userMatch.role === 'noivos') {
        setIsAdmin(true);
        localStorage.setItem('admin_logged_in', 'true');
      } else {
        setIsAdmin(false);
        localStorage.removeItem('admin_logged_in');
      }
      setActiveTab('padrinhos');
    } else {
      setLoginError('Usuário ou senha incorretos. Por favor, verifique com os noivos.');
    }
  };

  const handleLogout = () => {
    setLoggedUser(null);
    setIsAdmin(false);
    localStorage.removeItem('padrinho_session');
    localStorage.removeItem('admin_logged_in');
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
            <div className="w-20 h-20 p-1.5 rounded-full border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-md flex items-center justify-center overflow-hidden mx-auto mb-6">
              <img
                src="/img/LOGO_MARCA.png"
                alt="Logo Marca Aline e Klécio"
                className="w-full h-full object-contain rounded-full"
              />
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
                  Usuário
                </label>
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Digite seu usuário"
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
                <div className="flex items-center gap-2">
                  <span className="font-serif font-medium text-base md:text-lg text-[var(--foreground)] block leading-tight">
                    Padrinhos e Madrinhas
                  </span>
                  {isNoivos && (
                    <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-sans font-semibold bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                      <Crown size={11} /> Noivos
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isNoivos && (
              <Link
                href="/admin"
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-sans font-medium bg-gray-100 dark:bg-zinc-800 text-[var(--foreground)] hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
                title="Acessar painel geral de presentes e mensagens"
              >
                <ExternalLink size={13} /> Painel Geral
              </Link>
            )}

            <div className="hidden sm:block text-right">
              <span className="text-xs text-gray-400 block font-sans">Conectado como</span>
              <p className="text-sm font-serif font-medium text-[var(--foreground)] leading-tight flex items-center justify-end gap-1">
                {isNoivos && <Crown size={13} className="text-amber-500" />} {loggedUser.name}
              </p>
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
            <div className="flex items-center gap-2">
              <h1 className="text-3xl md:text-5xl font-serif font-medium text-[var(--foreground)] tracking-tight">
                Olá, {loggedUser.name}!
              </h1>
              {isNoivos && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-sans font-semibold bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                  <Crown size={13} /> Espaço dos Noivos
                </span>
              )}
            </div>

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
            {announcements.length > 0 && (
              <span className="text-xs bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full font-sans font-medium">
                {announcements.length}
              </span>
            )}
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

          {/* TAB 1: PADRINHOS & MADRINHAS GUIDELINES */}
          {activeTab === 'padrinhos' && (
            <motion.div
              key="padrinhos"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              {/* Daminha Alert */}
              {loggedUser.daminha && (
                <div className="bg-gradient-to-r from-rose-50/80 to-purple-50/80 dark:from-zinc-800/60 dark:to-zinc-800/40 p-6 rounded-3xl border border-rose-200/80 dark:border-zinc-700/80 shadow-xs">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-2xl bg-rose-100 dark:bg-zinc-700 text-rose-600 dark:text-rose-300 flex items-center justify-center shrink-0">
                      <Flower2 size={20} />
                    </div>
                    <div>
                      <h4 className="font-serif text-lg font-medium text-[var(--foreground)]">
                        Orientações Especiais para a Daminha ({loggedUser.daminha})
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm mt-0.5 leading-relaxed text-justified-elegant font-sans">
                        Vestido infantil em tom suave (off-white ou bege claro) com laço e calçado confortável para conduzir as alianças com graciosidade.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Pajem Alert */}
              {loggedUser.pajem && (
                <div className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-zinc-800/60 dark:to-zinc-800/40 p-6 rounded-3xl border border-blue-200/80 dark:border-zinc-700/80 shadow-xs">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-zinc-700 text-blue-600 dark:text-blue-300 flex items-center justify-center shrink-0">
                      <Sparkles size={20} />
                    </div>
                    <div>
                      <h4 className="font-serif text-lg font-medium text-[var(--foreground)]">
                        Orientações Especiais para o Pajem ({loggedUser.pajem})
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm mt-0.5 leading-relaxed text-justified-elegant font-sans">
                        Como pais do nosso querido pajem <strong>{loggedUser.pajem}</strong>: traje social infantil em <strong className="text-[var(--foreground)]">Azul Marinho ou Preto</strong> com camisa social branca e calçado confortável para conduzir esse momento especial até o altar.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Madrinhas & Padrinhos Cards Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                {/* 1. COLUMN MADRINHAS */}
                <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 md:p-9 shadow-sm border border-gray-200 dark:border-zinc-800 space-y-7">
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
                </div>

                {/* 2. COLUMN PADRINHOS */}
                <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 md:p-9 shadow-sm border border-gray-200 dark:border-zinc-800 space-y-7">
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

                  {/* Diretrizes Principais dos Padrinhos */}
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
              {/* Noivos Announcement Creation Card */}
              {isNoivos && (
                <div className="bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent dark:from-amber-950/20 dark:via-zinc-900 dark:to-zinc-900 rounded-3xl p-6 md:p-8 border border-amber-500/30 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div>
                      <span className="text-xs uppercase tracking-widest text-amber-700 dark:text-amber-400 font-sans font-semibold flex items-center gap-1.5">
                        <Crown size={14} /> Espaço dos Noivos
                      </span>
                      <h3 className="text-xl md:text-2xl font-serif text-[var(--foreground)] font-medium">
                        Publicar Comunicado no Mural
                      </h3>
                    </div>
                    <button
                      onClick={() => setShowAddAnnouncement(!showAddAnnouncement)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black dark:bg-white text-white dark:text-black text-xs font-sans font-medium shadow-sm hover:opacity-90 transition-all cursor-pointer w-fit"
                    >
                      {showAddAnnouncement ? <X size={15} /> : <Plus size={15} />}
                      <span>{showAddAnnouncement ? 'Fechar Formulário' : 'Novo Comunicado'}</span>
                    </button>
                  </div>

                  {showAddAnnouncement && (
                    <motion.form
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      onSubmit={handleAddAnnouncement}
                      className="space-y-4 pt-4 border-t border-amber-500/20"
                    >
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-sans font-medium mb-1.5">
                          Título do Aviso
                        </label>
                        <input
                          type="text"
                          value={annTitle}
                          onChange={(e) => setAnnTitle(e.target.value)}
                          placeholder="Ex: Horário do ensaio definido, Dica de transporte..."
                          required
                          className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-[var(--foreground)] text-sm font-sans focus:outline-none focus:border-black dark:focus:border-white transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-sans font-medium mb-1.5">
                          Conteúdo do Comunicado
                        </label>
                        <textarea
                          value={annContent}
                          onChange={(e) => setAnnContent(e.target.value)}
                          placeholder="Escreva as instruções ou recado detalhado para os padrinhos e cortejo..."
                          rows={4}
                          required
                          className="w-full p-4 rounded-2xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-[var(--foreground)] text-sm font-sans focus:outline-none focus:border-black dark:focus:border-white transition-all"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="annImportant"
                          checked={annImportant}
                          onChange={(e) => setAnnImportant(e.target.checked)}
                          className="w-4 h-4 rounded accent-black dark:accent-white cursor-pointer"
                        />
                        <label htmlFor="annImportant" className="text-xs font-sans text-[var(--foreground)] cursor-pointer">
                          📌 Marcar como <strong>Aviso Importante / Destaque</strong>
                        </label>
                      </div>

                      <div className="flex justify-end gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => setShowAddAnnouncement(false)}
                          className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 text-xs font-sans text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                        >
                          Cancelar
                        </button>
                        <button
                          type="submit"
                          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-black dark:bg-white text-white dark:text-black text-xs font-sans font-medium shadow-sm hover:opacity-90 transition-all cursor-pointer"
                        >
                          <Send size={14} /> Publicar no Mural
                        </button>
                      </div>
                    </motion.form>
                  )}
                </div>
              )}

              {/* Announcements List */}
              <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 md:p-8 shadow-sm border border-gray-200 dark:border-zinc-800">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-gray-400 font-sans font-semibold">Comunicados</span>
                    <h2 className="text-2xl md:text-3xl font-serif text-[var(--foreground)] font-medium flex items-center gap-2">
                      <Sparkles size={20} className="text-gray-400" /> Recados e Avisos dos Noivos
                    </h2>
                  </div>
                </div>

                <div className="space-y-4">
                  {announcements.map((ann) => (
                    <div
                      key={ann.id}
                      className="p-6 rounded-2xl border transition-all bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--foreground)] font-sans">
                          {ann.author}
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-gray-400 font-sans">{ann.date}</span>
                          {isNoivos && (
                            <button
                              onClick={() => handleDeleteAnnouncement(ann.id)}
                              className="p-1.5 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                              title="Excluir comunicado"
                            >
                              <Trash2 size={15} />
                            </button>
                          )}
                        </div>
                      </div>
                      <h3 className="text-xl font-serif text-[var(--foreground)] mb-2 font-medium">{ann.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 font-sans text-sm md:text-base leading-relaxed text-justified-elegant">
                        {ann.content}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Reply Section */}
                <div className="mt-12 pt-8 border-t border-gray-100 dark:border-zinc-800">
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
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 font-sans mb-4">
                        {isNoivos ? 'Todos os Recados Recebidos dos Padrinhos:' : 'Seus Recados Enviados:'}
                      </h4>
                      <div className="space-y-3">
                        {padrinhoReplies.map((r) => (
                          <div key={r.id} className="bg-gray-50 dark:bg-zinc-800/40 p-4 rounded-2xl text-sm font-sans border border-gray-100 dark:border-zinc-700/50">
                            <div className="flex justify-between items-center text-xs text-gray-400 mb-1">
                              <span className="font-bold text-[var(--foreground)]">{r.author}</span>
                              <div className="flex items-center gap-2">
                                <span>{r.date}</span>
                                {isNoivos && (
                                  <button
                                    onClick={() => handleDeleteReply(r.id)}
                                    className="p-1 text-red-500 hover:bg-red-500/10 rounded transition-colors cursor-pointer"
                                    title="Excluir recado"
                                  >
                                    <Trash2 size={14} />
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
              </div>
            </motion.div>
          )}

          {/* TAB 3: CRONOGRAMA */}
          {activeTab === 'cronograma' && (
            <motion.div
              key="cronograma"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white dark:bg-zinc-900 rounded-3xl p-6 md:p-8 shadow-sm border border-gray-200 dark:border-zinc-800 space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100 dark:border-zinc-800">
                <div className="space-y-1">
                  <span className="text-xs uppercase tracking-widest text-gray-400 font-sans font-semibold">Organização</span>
                  <h2 className="text-2xl md:text-3xl font-serif text-[var(--foreground)] font-medium flex items-center gap-2">
                    <Calendar size={20} className="text-gray-400" /> Cronograma do Grande Dia
                  </h2>
                  <p className="text-xs text-gray-500 font-sans">
                    Horários planejados com carinho para aproveitarmos juntos cada instante da celebração.
                  </p>
                </div>

                {isNoivos && (
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={handleResetSchedule}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-gray-200 dark:border-zinc-700 text-xs font-sans text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                      title="Restaurar cronograma padrão original"
                    >
                      <RotateCcw size={13} /> Restaurar Padrão
                    </button>
                    <button
                      onClick={handleOpenAddSchedule}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-black dark:bg-white text-white dark:text-black text-xs font-sans font-medium shadow-sm hover:opacity-90 transition-all cursor-pointer"
                    >
                      <Plus size={14} /> Adicionar Horário
                    </button>
                  </div>
                )}
              </div>

              {/* Schedule Timeline */}
              <div className="relative border-l-2 border-slate-200 dark:border-zinc-700 pl-6 md:pl-8 space-y-8 ml-2 pt-2">
                {schedule.map((item) => (
                  <div key={item.id} className="relative group">
                    <div className="absolute -left-[31px] md:-left-[39px] top-1 w-4 h-4 rounded-full bg-black dark:bg-white border-4 border-white dark:border-zinc-900 shadow-xs"></div>
                    
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider block font-sans">
                          {item.time}
                        </span>
                        <h3 className="text-lg font-serif text-[var(--foreground)] font-semibold">
                          {item.title}
                        </h3>
                        {item.description && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 font-sans mt-1 text-justified-elegant">
                            {item.description}
                          </p>
                        )}
                      </div>

                      {isNoivos && (
                        <div className="flex items-center gap-1.5 shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleOpenEditSchedule(item)}
                            className="p-1.5 text-gray-500 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
                            title="Editar horário"
                          >
                            <Edit2 size={15} />
                          </button>
                          <button
                            onClick={() => handleDeleteScheduleItem(item.id)}
                            className="p-1.5 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                            title="Excluir horário"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

        </AnimatePresence>

        {/* Schedule Add/Edit Modal */}
        <AnimatePresence>
          {showScheduleModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowScheduleModal(false)}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-lg w-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl p-6 md:p-8 shadow-2xl space-y-5"
              >
                <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-zinc-800">
                  <h3 className="text-xl font-serif font-medium text-[var(--foreground)] flex items-center gap-2">
                    <Calendar size={18} className="text-gray-400" />
                    {editingScheduleItem ? 'Editar Evento do Cronograma' : 'Adicionar Evento ao Cronograma'}
                  </h3>
                  <button
                    onClick={() => setShowScheduleModal(false)}
                    className="p-1.5 text-gray-400 hover:text-[var(--foreground)] rounded-lg cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>

                <form onSubmit={handleSaveScheduleItem} className="space-y-4 font-sans">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-medium mb-1.5">
                      Horário
                    </label>
                    <input
                      type="text"
                      value={schTime}
                      onChange={(e) => setSchTime(e.target.value)}
                      placeholder="Ex: 18h00, 19h30, 22h00 em diante..."
                      required
                      className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-zinc-700 bg-gray-50/50 dark:bg-zinc-800/50 text-[var(--foreground)] text-sm focus:outline-none focus:border-black dark:focus:border-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-medium mb-1.5">
                      Título do Evento
                    </label>
                    <input
                      type="text"
                      value={schTitle}
                      onChange={(e) => setSchTitle(e.target.value)}
                      placeholder="Ex: Cerimônia Religiosa, Sessão de Fotos, Recepção..."
                      required
                      className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-zinc-700 bg-gray-50/50 dark:bg-zinc-800/50 text-[var(--foreground)] text-sm focus:outline-none focus:border-black dark:focus:border-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-medium mb-1.5">
                      Descrição / Detalhes (Opcional)
                    </label>
                    <textarea
                      value={schDescription}
                      onChange={(e) => setSchDescription(e.target.value)}
                      placeholder="Detalhes ou orientações sobre este momento..."
                      rows={3}
                      className="w-full p-4 rounded-2xl border border-gray-200 dark:border-zinc-700 bg-gray-50/50 dark:bg-zinc-800/50 text-[var(--foreground)] text-sm focus:outline-none focus:border-black dark:focus:border-white transition-all"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-3 border-t border-gray-100 dark:border-zinc-800">
                    <button
                      type="button"
                      onClick={() => setShowScheduleModal(false)}
                      className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 text-xs font-sans text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-black dark:bg-white text-white dark:text-black text-xs font-sans font-medium shadow-sm hover:opacity-90 transition-all cursor-pointer"
                    >
                      <Save size={14} /> Salvar Horário
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>
    </div>
  );
}
