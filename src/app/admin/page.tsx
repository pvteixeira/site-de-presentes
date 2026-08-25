'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Gift } from '../types';
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Copy,
  Check,
  Users,
  Gift as GiftIcon,
  ExternalLink,
  MessageSquare,
  LogOut,
  Heart,
  CreditCard,
  Eye,
  Download,
  CheckCircle2,
  FileText
} from 'lucide-react';
import Link from 'next/link';

import { GIFTS_DATA } from '../utils/giftsData';
import { PadrinhoAccount } from '../data/padrinhosData';

interface GuestbookMessage {
  id: string;
  author: string;
  relation: string;
  text: string;
  date: string;
}

interface PadrinhoReply {
  id: string;
  author: string;
  text: string;
  date: string;
}

interface PixContribution {
  id: string;
  giftId: string;
  giftName: string;
  guestName: string;
  amount: number;
  date: string;
  receiptUrl?: string;
  receiptName?: string;
}

const INITIAL_GUESTBOOK: GuestbookMessage[] = [];

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'gifts' | 'pix' | 'padrinhos' | 'guestbook' | 'mural'>('gifts');
  const [gifts, setGifts] = useState<Gift[]>(GIFTS_DATA);
  const [editingGift, setEditingGift] = useState<Gift | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isSyncingGifts, setIsSyncingGifts] = useState(false);

  // Messages, Pix & Padrinhos state
  const [guestbookMessages, setGuestbookMessages] = useState<GuestbookMessage[]>(INITIAL_GUESTBOOK);
  const [padrinhoReplies, setPadrinhoReplies] = useState<PadrinhoReply[]>([]);
  const [pixContributions, setPixContributions] = useState<PixContribution[]>([]);
  const [selectedReceipt, setSelectedReceipt] = useState<PixContribution | null>(null);
  const [padrinhosAccounts, setPadrinhosAccounts] = useState<PadrinhoAccount[]>([]);

  const loadAllAdminData = async () => {
    // 1. Load Gifts
    try {
      const res = await fetch('/api/gifts');
      const data = await res.json();
      if (data.success && Array.isArray(data.gifts) && data.gifts.length > 0) {
        setGifts(data.gifts);
      }
    } catch (e) {
      console.error('Erro ao buscar presentes:', e);
    }

    // 2. Load Guestbook Messages
    try {
      const res = await fetch('/api/guestbook');
      const data = await res.json();
      if (data.success && Array.isArray(data.messages)) {
        setGuestbookMessages(data.messages);
        localStorage.setItem('guestbook_messages', JSON.stringify(data.messages));
      }
    } catch (e) {
      console.error('Erro ao buscar mensagens do mural:', e);
    }

    // 3. Load Pix Contributions
    try {
      const res = await fetch('/api/pix');
      const data = await res.json();
      if (data.success && Array.isArray(data.contributions)) {
        setPixContributions(data.contributions);
        localStorage.setItem('pix_contributions', JSON.stringify(data.contributions));
      }
    } catch (e) {
      console.error('Erro ao buscar comprovantes PIX:', e);
    }

    // 4. Load Padrinho Replies
    try {
      const res = await fetch('/api/padrinhos/mural');
      const data = await res.json();
      if (data.success && Array.isArray(data.replies)) {
        setPadrinhoReplies(data.replies);
        localStorage.setItem('padrinho_replies', JSON.stringify(data.replies));
      }
    } catch (e) {
      console.error('Erro ao buscar recados dos padrinhos:', e);
    }

    // 5. Load Padrinhos Accounts via Secure Server API
    try {
      const res = await fetch('/api/admin/padrinhos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminSecret: 'Linocaeklecio2026' })
      });
      const data = await res.json();
      if (data.success && data.accounts) {
        setPadrinhosAccounts(data.accounts);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Check login & Load data
  useEffect(() => {
    const isLogged = localStorage.getItem('admin_logged_in') === 'true';
    if (!isLogged) {
      router.replace('/admin/login');
      return;
    }
    setIsAuthenticated(true);
    loadAllAdminData();
  }, [router]);

  const totalArrecadado = gifts.reduce((acc, gift) => acc + gift.currentAmount, 0);
  const totalMeta = gifts.reduce((acc, gift) => acc + gift.totalAmount, 0);
  const totalPixValor = pixContributions.reduce((acc, item) => acc + (item.amount || 0), 0);

  const handleSyncGiftsToSupabase = async () => {
    if (!confirm('Deseja sincronizar a lista padrão completa de presentes para o Supabase?')) return;
    setIsSyncingGifts(true);
    try {
      const res = await fetch('/api/gifts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'seed', giftsList: GIFTS_DATA })
      });
      const data = await res.json();
      if (data.success) {
        alert('Presentes sincronizados com sucesso no banco de dados!');
        loadAllAdminData();
      } else {
        alert('Aviso: ' + (data.message || 'Erro ao sincronizar presentes.'));
      }
    } catch (err) {
      console.error(err);
      alert('Erro de conexão ao sincronizar presentes.');
    } finally {
      setIsSyncingGifts(false);
    }
  };

  const handleSave = async (gift: Gift) => {
    if (editingGift || isAdding) {
      const targetGift = isAdding
        ? { ...gift, id: Date.now().toString() }
        : gift;

      if (isAdding) {
        setGifts([...gifts, targetGift]);
        setIsAdding(false);
      } else {
        setGifts(gifts.map((g) => (g.id === gift.id ? targetGift : g)));
        setEditingGift(null);
      }

      try {
        await fetch('/api/gifts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ gift: targetGift })
        });
        loadAllAdminData();
      } catch (err) {
        console.error('Erro ao salvar presente no Supabase:', err);
      }
    }
  };

  const handleDeleteGift = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir este presente da lista?')) {
      setGifts(gifts.filter((g) => g.id !== id));
      try {
        await fetch(`/api/gifts?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
        loadAllAdminData();
      } catch (err) {
        console.error('Erro ao excluir presente:', err);
      }
    }
  };

  const handleDeletePixContribution = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir este comprovante PIX?')) {
      const updated = pixContributions.filter((p) => p.id !== id);
      setPixContributions(updated);
      localStorage.setItem('pix_contributions', JSON.stringify(updated));

      try {
        await fetch(`/api/pix?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
        loadAllAdminData();
      } catch (err) {
        console.error('Erro ao excluir comprovante:', err);
      }
    }
  };

  const handleDeleteAllPixContributions = async () => {
    if (confirm('ATENÇÃO: Tem certeza que deseja apagar TODOS os comprovantes PIX recebidos?')) {
      setPixContributions([]);
      localStorage.setItem('pix_contributions', JSON.stringify([]));

      try {
        await fetch('/api/pix?all=true', { method: 'DELETE' });
        loadAllAdminData();
      } catch (err) {
        console.error('Erro ao limpar comprovantes:', err);
      }
    }
  };

  const handleDeleteGuestbookMessage = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta mensagem do mural aos noivos?')) {
      const updated = guestbookMessages.filter((m) => m.id !== id);
      setGuestbookMessages(updated);
      localStorage.setItem('guestbook_messages', JSON.stringify(updated));

      try {
        await fetch(`/api/guestbook?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
        loadAllAdminData();
      } catch (err) {
        console.error('Erro ao excluir mensagem:', err);
      }
    }
  };

  const handleDeleteAllGuestbookMessages = async () => {
    if (confirm('ATENÇÃO: Tem certeza que deseja apagar TODAS as mensagens enviadas aos noivos?')) {
      setGuestbookMessages([]);
      localStorage.setItem('guestbook_messages', JSON.stringify([]));

      for (const msg of guestbookMessages) {
        try {
          await fetch(`/api/guestbook?id=${encodeURIComponent(msg.id)}`, { method: 'DELETE' });
        } catch (e) {}
      }
      loadAllAdminData();
    }
  };

  const handleDeletePadrinhoReply = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir este recado dos padrinhos?')) {
      const updated = padrinhoReplies.filter((r) => r.id !== id);
      setPadrinhoReplies(updated);
      localStorage.setItem('padrinho_replies', JSON.stringify(updated));

      try {
        await fetch(`/api/padrinhos/mural?type=reply&id=${encodeURIComponent(id)}`, { method: 'DELETE' });
        loadAllAdminData();
      } catch (err) {
        console.error('Erro ao excluir recado:', err);
      }
    }
  };

  const handleDeleteAllPadrinhoReplies = async () => {
    if (confirm('ATENÇÃO: Tem certeza que deseja apagar TODOS os recados dos padrinhos?')) {
      setPadrinhoReplies([]);
      localStorage.setItem('padrinho_replies', JSON.stringify([]));

      try {
        await fetch('/api/padrinhos/mural?type=reply&all=true', { method: 'DELETE' });
        loadAllAdminData();
      } catch (err) {
        console.error('Erro ao limpar recados:', err);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_logged_in');
    router.push('/admin/login');
  };

  const copyWhatsAppMessage = (name: string, username: string, pass: string, id: string) => {
    const text = `✨ *Convite Especial - Casamento Aline e Klécio* ✨\n\nOlá *${name}*!\nPreparamos a Área VIP do Nosso Cortejo em nosso site com todas as informações das vestimentas, paleta e recados especiais!\n\n🔗 Acesse em: https://site-de-presentes.vercel.app/padrinhos (ou no nosso site)\n👤 *Usuário:* ${username}\n🔑 *Senha:* ${pass}\n\nCom carinho,\nAline e Klécio 💍`;
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 3000);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center p-4">
        <div className="w-10 h-10 border-2 border-slate-300 border-t-slate-800 dark:border-zinc-700 dark:border-t-zinc-200 rounded-full animate-spin mb-4"></div>
        <p className="text-xs text-gray-500 font-sans tracking-wide">Verificando autorização...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] p-4 md:p-8 pt-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-serif text-[var(--foreground)] font-medium">Painel Administrativo</h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/30">
                ADM Ativo
              </span>
            </div>
            <p className="text-xs text-gray-500 font-sans mt-1">Gerenciamento completo da lista de presentes, comprovantes PIX, credenciais e murais</p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-2 bg-white dark:bg-zinc-800 text-[var(--foreground)] border border-gray-300 dark:border-zinc-700 px-4 py-2 rounded-xl text-sm hover:border-gray-400 transition-colors shadow-sm"
            >
              <ExternalLink size={16} /> Ver Site Principal
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/30 px-4 py-2 rounded-xl text-sm hover:bg-red-500/20 transition-colors shadow-sm cursor-pointer"
            >
              <LogOut size={16} /> Sair do ADM
            </button>

            {activeTab === 'gifts' && (
              <>
                <button
                  onClick={handleSyncGiftsToSupabase}
                  disabled={isSyncingGifts}
                  className="flex items-center gap-2 bg-slate-100 dark:bg-zinc-800 text-[var(--foreground)] border border-gray-300 dark:border-zinc-700 px-4 py-2 rounded-xl text-sm hover:bg-slate-200 dark:hover:bg-zinc-700 transition-colors shadow-sm cursor-pointer disabled:opacity-50"
                  title="Enviar lista padrão de presentes para o Supabase"
                >
                  <Save size={16} /> {isSyncingGifts ? 'Sincronizando...' : 'Sincronizar com Supabase'}
                </button>

                <button
                  onClick={() => setIsAdding(true)}
                  className="flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black border border-gray-800 dark:border-gray-200 px-4 py-2 rounded-xl text-sm hover:opacity-90 transition-colors shadow-sm cursor-pointer"
                >
                  <Plus size={18} /> Adicionar Presente
                </button>
              </>
            )}
          </div>
        </div>

        {/* Tab Selection Navigation */}
        <div className="flex flex-wrap border-b border-gray-200 dark:border-zinc-800 mb-8 gap-2 md:gap-4">
          <button
            onClick={() => setActiveTab('gifts')}
            className={`pb-3 px-4 font-serif text-base md:text-lg flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'gifts'
                ? 'border-black dark:border-white text-[var(--foreground)] font-semibold'
                : 'border-transparent text-gray-500 hover:text-[var(--foreground)]'
            }`}
          >
            <GiftIcon size={18} /> Presentes ({gifts.length})
          </button>

          <button
            onClick={() => setActiveTab('pix')}
            className={`pb-3 px-4 font-serif text-base md:text-lg flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'pix'
                ? 'border-black dark:border-white text-[var(--foreground)] font-semibold'
                : 'border-transparent text-gray-500 hover:text-[var(--foreground)]'
            }`}
          >
            <CreditCard size={18} className="text-green-600 dark:text-green-400" /> Comprovantes PIX ({pixContributions.length})
          </button>

          <button
            onClick={() => setActiveTab('padrinhos')}
            className={`pb-3 px-4 font-serif text-base md:text-lg flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'padrinhos'
                ? 'border-black dark:border-white text-[var(--foreground)] font-semibold'
                : 'border-transparent text-gray-500 hover:text-[var(--foreground)]'
            }`}
          >
            <Users size={18} /> Contas Padrinhos ({padrinhosAccounts.length})
          </button>

          <button
            onClick={() => setActiveTab('guestbook')}
            className={`pb-3 px-4 font-serif text-base md:text-lg flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'guestbook'
                ? 'border-black dark:border-white text-[var(--foreground)] font-semibold'
                : 'border-transparent text-gray-500 hover:text-[var(--foreground)]'
            }`}
          >
            <Heart size={18} /> Mensagens Noivos ({guestbookMessages.length})
          </button>

          <button
            onClick={() => setActiveTab('mural')}
            className={`pb-3 px-4 font-serif text-base md:text-lg flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'mural'
                ? 'border-black dark:border-white text-[var(--foreground)] font-semibold'
                : 'border-transparent text-gray-500 hover:text-[var(--foreground)]'
            }`}
          >
            <MessageSquare size={18} /> Mural Padrinhos ({padrinhoReplies.length})
          </button>
        </div>

        {/* TAB 1: PRESENTES */}
        {activeTab === 'gifts' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-zinc-800">
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Total Arrecadado</p>
                <p className="text-3xl font-bold text-[var(--foreground)]">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalArrecadado)}
                </p>
              </div>
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-zinc-800">
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Meta Geral</p>
                <p className="text-3xl font-bold text-[var(--foreground)]">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalMeta)}
                </p>
              </div>
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-zinc-800">
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Comprovantes Recebidos</p>
                <button
                  onClick={() => setActiveTab('pix')}
                  className="text-2xl font-bold text-green-600 dark:text-green-400 hover:underline flex items-center gap-2 cursor-pointer"
                >
                  <CreditCard size={22} /> {pixContributions.length} comprovantes
                </button>
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-gray-200 dark:border-zinc-800 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-zinc-800/50 border-b border-gray-200 dark:border-zinc-800">
                    <th className="p-4 font-medium text-xs uppercase tracking-wider text-gray-500">Item</th>
                    <th className="p-4 font-medium text-xs uppercase tracking-wider text-gray-500">Meta</th>
                    <th className="p-4 font-medium text-xs uppercase tracking-wider text-gray-500">Arrecadado</th>
                    <th className="p-4 font-medium text-xs uppercase tracking-wider text-gray-500 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {gifts.map((gift) => (
                    <tr key={gift.id} className="border-b border-gray-100 dark:border-zinc-800 hover:bg-gray-50/50 dark:hover:bg-zinc-800/20">
                      <td className="p-4 flex items-center gap-4">
                        <img src={gift.imageUrl} alt={gift.name} className="w-12 h-12 rounded-xl object-cover border border-gray-200 dark:border-zinc-700" />
                        <div>
                          <p className="font-medium text-[var(--foreground)] text-sm">{gift.name}</p>
                          <p className="text-xs text-gray-500 truncate max-w-xs">{gift.description}</p>
                        </div>
                      </td>
                      <td className="p-4 text-[var(--foreground)] text-sm font-medium">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(gift.totalAmount)}
                      </td>
                      <td className="p-4 text-[var(--foreground)] text-sm font-medium">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(gift.currentAmount)}
                      </td>
                      <td className="p-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => setEditingGift(gift)}
                            className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-xl transition-colors cursor-pointer"
                            title="Editar Presente"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteGift(gift.id)}
                            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors cursor-pointer"
                            title="Excluir Presente"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* TAB: COMPROVANTES PIX */}
        {activeTab === 'pix' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-200 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-xl font-serif text-[var(--foreground)] font-medium flex items-center gap-2">
                  <CreditCard size={22} className="text-green-600 dark:text-green-400" /> Comprovantes e Pagamentos PIX Recebidos
                </h2>
                <p className="text-xs text-gray-500 font-sans mt-1">
                  Confira o nome de quem enviou o PIX, presente escolhido e abra o comprovante completo anexado pelo convidado.
                </p>
              </div>

              {pixContributions.length > 0 && (
                <button
                  onClick={handleDeleteAllPixContributions}
                  className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-red-700 transition-colors cursor-pointer shadow-sm"
                >
                  <Trash2 size={16} /> Limpar Histórico de PIX
                </button>
              )}
            </div>

            {pixContributions.length === 0 ? (
              <div className="bg-white dark:bg-zinc-900 p-12 rounded-2xl border border-gray-200 dark:border-zinc-800 text-center text-gray-400 font-sans">
                Nenhum comprovante PIX enviado até o momento.
              </div>
            ) : (
              <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-gray-200 dark:border-zinc-800 overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-zinc-800/50 border-b border-gray-200 dark:border-zinc-800">
                      <th className="p-4 font-medium text-xs uppercase tracking-wider text-gray-500">Nome do Convidado</th>
                      <th className="p-4 font-medium text-xs uppercase tracking-wider text-gray-500">Presente Escolhido</th>
                      <th className="p-4 font-medium text-xs uppercase tracking-wider text-gray-500">Valor Pago</th>
                      <th className="p-4 font-medium text-xs uppercase tracking-wider text-gray-500">Data / Hora</th>
                      <th className="p-4 font-medium text-xs uppercase tracking-wider text-gray-500 text-right">Comprovante PIX</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pixContributions.map((contrib) => (
                      <tr key={contrib.id} className="border-b border-gray-100 dark:border-zinc-800 hover:bg-gray-50/50 dark:hover:bg-zinc-800/20">
                        <td className="p-4">
                          <p className="font-semibold text-[var(--foreground)] text-sm font-serif">{contrib.guestName}</p>
                          <span className="text-[10px] uppercase font-bold text-green-600 dark:text-green-400 tracking-wider">
                            ✓ PIX Realizado
                          </span>
                        </td>
                        <td className="p-4 font-medium text-sm text-[var(--foreground)]">
                          {contrib.giftName}
                        </td>
                        <td className="p-4 text-sm font-bold text-green-600 dark:text-green-400">
                          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(contrib.amount)}
                        </td>
                        <td className="p-4 font-mono text-xs text-gray-500">
                          {contrib.date}
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end items-center gap-2">
                            <button
                              onClick={() => setSelectedReceipt(contrib)}
                              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/30 hover:bg-blue-500/20 transition-colors cursor-pointer"
                            >
                              <Eye size={14} /> Ver Comprovante
                            </button>
                            <button
                              onClick={() => handleDeletePixContribution(contrib.id)}
                              className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors cursor-pointer"
                              title="Excluir Registro"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PADRINHOS CONTAS */}
        {activeTab === 'padrinhos' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-200 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-xl font-serif text-[var(--foreground)] font-medium">Contas e Senhas dos Padrinhos</h2>
                <p className="text-xs text-gray-500 font-sans mt-1">
                  Lista completa de credenciais criadas para cada padrinho, madrinha e daminha entrar em <strong>/padrinhos</strong>.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-gray-200 dark:border-zinc-800 overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[650px]">
                <thead>
                  <tr className="bg-gray-50 dark:bg-zinc-800/50 border-b border-gray-200 dark:border-zinc-800">
                    <th className="p-4 font-medium text-xs uppercase tracking-wider text-gray-500">Padrinho(s) / Papel</th>
                    <th className="p-4 font-medium text-xs uppercase tracking-wider text-gray-500">Usuário</th>
                    <th className="p-4 font-medium text-xs uppercase tracking-wider text-gray-500">Senha</th>
                    <th className="p-4 font-medium text-xs uppercase tracking-wider text-gray-500 text-right">Enviar no WhatsApp</th>
                  </tr>
                </thead>
                <tbody>
                  {padrinhosAccounts.map((acc) => (
                    <tr key={acc.id} className="border-b border-gray-100 dark:border-zinc-800 hover:bg-gray-50/50 dark:hover:bg-zinc-800/20">
                      <td className="p-4">
                        <p className="font-medium font-serif text-[var(--foreground)] text-sm">{acc.name}</p>
                        <span className="inline-block px-2.5 py-0.5 text-[10px] font-semibold rounded-full bg-gray-100 dark:bg-zinc-800 text-[var(--foreground)] border border-gray-200 dark:border-zinc-700 capitalize mt-1">
                          {acc.role === 'casal' ? 'Casal de Padrinhos' : acc.role}
                        </span>
                      </td>
                      <td className="p-4 font-mono text-sm text-gray-700 dark:text-gray-300">
                        {acc.username}
                      </td>
                      <td className="p-4 font-mono text-sm font-bold text-[var(--foreground)]">
                        {acc.password}
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => copyWhatsAppMessage(acc.name, acc.username, acc.password || '', acc.id)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/30 hover:bg-green-500/20 transition-colors cursor-pointer"
                        >
                          {copiedId === acc.id ? (
                            <>
                              <Check size={14} /> Mensagem Copiada!
                            </>
                          ) : (
                            <>
                              <Copy size={14} /> Copiar Convite WhatsApp
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: MENSAGENS AOS NOIVOS (GUESTBOOK) */}
        {activeTab === 'guestbook' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-200 dark:border-zinc-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-serif text-[var(--foreground)] font-medium flex items-center gap-2">
                  <Heart size={20} className="text-red-500" /> Mensagens aos Noivos (Mural Público)
                </h2>
                <p className="text-xs text-gray-500 font-sans mt-1">
                  Gerencie ou remova qualquer recado deixado pelos convidados na página principal.
                </p>
              </div>

              {guestbookMessages.length > 0 && (
                <button
                  onClick={handleDeleteAllGuestbookMessages}
                  className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-red-700 transition-colors cursor-pointer shadow-sm"
                >
                  <Trash2 size={16} /> Apagar Todas as Mensagens
                </button>
              )}
            </div>

            {guestbookMessages.length === 0 ? (
              <div className="bg-white dark:bg-zinc-900 p-12 rounded-2xl border border-gray-200 dark:border-zinc-800 text-center text-gray-400 font-sans">
                Nenhuma mensagem publicada no momento.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {guestbookMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h4 className="font-serif text-lg font-medium text-[var(--foreground)]">{msg.author}</h4>
                          <span className="text-xs text-gray-400 font-sans">{msg.relation}</span>
                        </div>
                        <span className="text-xs text-gray-400 font-mono">{msg.date}</span>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 font-sans leading-relaxed my-4 italic">
                        "{msg.text}"
                      </p>
                    </div>

                    <div className="pt-4 border-t border-gray-100 dark:border-zinc-800 flex justify-end">
                      <button
                        onClick={() => handleDeleteGuestbookMessage(msg.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/30 hover:bg-red-500/20 transition-colors cursor-pointer"
                      >
                        <Trash2 size={14} /> Excluir Mensagem
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: MURAL DOS PADRINHOS */}
        {activeTab === 'mural' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-200 dark:border-zinc-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-serif text-[var(--foreground)] font-medium flex items-center gap-2">
                  <MessageSquare size={20} className="text-blue-500" /> Recados dos Padrinhos para os Noivos
                </h2>
                <p className="text-xs text-gray-500 font-sans mt-1">
                  Gerencie as mensagens enviadas exclusivamente pelos padrinhos e madrinhas dentro do portal <strong>/padrinhos</strong>.
                </p>
              </div>

              {padrinhoReplies.length > 0 && (
                <button
                  onClick={handleDeleteAllPadrinhoReplies}
                  className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-red-700 transition-colors cursor-pointer shadow-sm"
                >
                  <Trash2 size={16} /> Apagar Todos os Recados
                </button>
              )}
            </div>

            {padrinhoReplies.length === 0 ? (
              <div className="bg-white dark:bg-zinc-900 p-12 rounded-2xl border border-gray-200 dark:border-zinc-800 text-center text-gray-400 font-sans">
                Nenhum recado de padrinho enviado até o momento.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {padrinhoReplies.map((r) => (
                  <div
                    key={r.id}
                    className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h4 className="font-serif text-lg font-medium text-[var(--foreground)]">{r.author}</h4>
                          <span className="text-xs text-blue-500 font-sans font-semibold">Padrinho / Madrinha</span>
                        </div>
                        <span className="text-xs text-gray-400 font-mono">{r.date}</span>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 font-sans leading-relaxed my-4">
                        {r.text}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-gray-100 dark:border-zinc-800 flex justify-end">
                      <button
                        onClick={() => handleDeletePadrinhoReply(r.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/30 hover:bg-red-500/20 transition-colors cursor-pointer"
                      >
                        <Trash2 size={14} /> Excluir Recado
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

      {/* Modal Lightbox para Visualização do Comprovante PIX */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-white dark:bg-zinc-900 w-full max-w-2xl rounded-2xl p-6 shadow-2xl relative border border-gray-200 dark:border-zinc-800 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedReceipt(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-white p-2 rounded-full bg-gray-100 dark:bg-zinc-800 transition-colors cursor-pointer"
              title="Fechar"
            >
              <X size={20} />
            </button>

            <div className="mb-6">
              <span className="text-xs uppercase font-semibold tracking-wider text-green-600 dark:text-green-400 block mb-1">
                ✓ Comprovante de Pagamento PIX Recebido
              </span>
              <h3 className="text-2xl font-serif text-[var(--foreground)] font-medium">
                {selectedReceipt.guestName}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 font-sans mt-1">
                Presente Escolhido: <strong className="text-[var(--foreground)] font-semibold">{selectedReceipt.giftName}</strong> ({new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(selectedReceipt.amount)})
              </p>
              <p className="text-xs text-gray-400 font-mono mt-0.5">
                Data do Pagamento: {selectedReceipt.date}
              </p>
            </div>

            {selectedReceipt.receiptUrl ? (
              <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 flex items-center justify-center min-h-[300px]">
                <img
                  src={selectedReceipt.receiptUrl}
                  alt={`Comprovante PIX de ${selectedReceipt.guestName}`}
                  className="max-w-full max-h-[60vh] object-contain rounded-lg shadow-lg"
                />
              </div>
            ) : (
              <div className="bg-gray-50 dark:bg-zinc-800/50 p-12 rounded-xl text-center text-gray-400 font-sans border border-gray-200 dark:border-zinc-700">
                <FileText className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                <p>Nenhuma imagem de comprovante anexada.</p>
                <p className="text-xs mt-1 font-mono">Arquivo: {selectedReceipt.receiptName || 'Sem anexo'}</p>
              </div>
            )}

            <div className="mt-6 flex justify-between items-center pt-4 border-t border-gray-100 dark:border-zinc-800">
              {selectedReceipt.receiptUrl && (
                <a
                  href={selectedReceipt.receiptUrl}
                  download={selectedReceipt.receiptName || `comprovante_${selectedReceipt.guestName}.png`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black dark:bg-white text-white dark:text-black text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-colors shadow-sm cursor-pointer"
                >
                  <Download size={14} /> Baixar Comprovante
                </a>
              )}
              <button
                onClick={() => setSelectedReceipt(null)}
                className="px-4 py-2.5 rounded-xl bg-gray-200 dark:bg-zinc-800 text-[var(--foreground)] text-xs font-semibold uppercase tracking-wider hover:bg-gray-300 dark:hover:bg-zinc-700 transition-colors cursor-pointer ml-auto"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit/Add Gift Modal */}
      {(editingGift || isAdding) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-900 w-full max-w-lg rounded-2xl p-6 shadow-xl relative border border-gray-200 dark:border-zinc-800">
            <button
              onClick={() => { setEditingGift(null); setIsAdding(false); }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1"
            >
              <X size={20} />
            </button>
            <h2 className="text-2xl font-serif text-[var(--foreground)] mb-6 font-medium">
              {isAdding ? 'Novo Presente' : 'Editar Presente'}
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                handleSave({
                  id: editingGift?.id || '',
                  name: formData.get('name') as string,
                  description: formData.get('description') as string,
                  category: formData.get('category') as string || 'Geral',
                  totalAmount: Number(formData.get('totalAmount')),
                  currentAmount: Number(formData.get('currentAmount')),
                  imageUrl: formData.get('imageUrl') as string,
                });
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">Nome do Item</label>
                <input required name="name" defaultValue={editingGift?.name} className="w-full p-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-transparent text-sm" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">Descrição</label>
                <textarea required name="description" defaultValue={editingGift?.description} className="w-full p-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-transparent text-sm" rows={3} />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">Categoria</label>
                <input required name="category" defaultValue={editingGift?.category} className="w-full p-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-transparent text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">Meta (R$)</label>
                  <input required type="number" name="totalAmount" defaultValue={editingGift?.totalAmount} className="w-full p-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-transparent text-sm" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">Já Arrecadado (R$)</label>
                  <input required type="number" name="currentAmount" defaultValue={editingGift?.currentAmount || 0} className="w-full p-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-transparent text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">URL da Imagem</label>
                <input required name="imageUrl" defaultValue={editingGift?.imageUrl} className="w-full p-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-transparent text-sm" placeholder="https://..." />
              </div>

              <button type="submit" className="w-full flex items-center justify-center gap-2 bg-black dark:bg-white text-white dark:text-black py-3.5 rounded-xl font-semibold uppercase tracking-wider text-xs border border-gray-800 dark:border-gray-200 hover:opacity-90 transition-colors mt-6 cursor-pointer">
                <Save size={18} /> Salvar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
