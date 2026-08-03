'use client';

import { useState } from 'react';
import { Gift } from '../types';
import { Plus, Edit, Trash2, Save, X, Copy, Check, Users, Gift as GiftIcon, ExternalLink } from 'lucide-react';
import Link from 'next/link';

import { GIFTS_DATA } from '../utils/giftsData';
import { PADRINHOS_ACCOUNTS } from '../data/padrinhosData';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'gifts' | 'padrinhos'>('gifts');
  const [gifts, setGifts] = useState<Gift[]>(GIFTS_DATA);
  const [editingGift, setEditingGift] = useState<Gift | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const totalArrecadado = gifts.reduce((acc, gift) => acc + gift.currentAmount, 0);
  const totalMeta = gifts.reduce((acc, gift) => acc + gift.totalAmount, 0);

  const handleSave = (gift: Gift) => {
    if (editingGift || isAdding) {
      if (isAdding) {
        setGifts([...gifts, { ...gift, id: Date.now().toString() }]);
        setIsAdding(false);
      } else {
        setGifts(gifts.map((g) => (g.id === gift.id ? gift : g)));
        setEditingGift(null);
      }
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este item?')) {
      setGifts(gifts.filter((g) => g.id !== id));
    }
  };

  const copyWhatsAppMessage = (name: string, username: string, pass: string, id: string) => {
    const text = `✨ *Convite Especial - Casamento Aline e Klécio* ✨\n\nOlá *${name}*!\nPreparamos a Área VIP do Nosso Cortejo em nosso site com todas as informações das vestimentas, paleta e recados especiais!\n\n🔗 Acesse em: https://site-de-presentes.vercel.app/padrinhos (ou no nosso site)\n👤 *Usuário:* ${username}\n🔑 *Senha:* ${pass}\n\nCom carinho,\nAline e Klécio 💍`;
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 3000);
  };

  return (
    <div className="min-h-screen bg-[var(--background)] p-4 md:p-8 pt-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-serif text-[var(--foreground)] font-medium">Painel Administrativo</h1>
            <p className="text-xs text-gray-500 font-sans mt-1">Gerenciamento de Lista de Presentes e Credenciais dos Padrinhos</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Link 
              href="/padrinhos" 
              target="_blank"
              className="flex items-center gap-2 bg-white dark:bg-zinc-800 text-[var(--foreground)] border border-gray-300 dark:border-zinc-700 px-4 py-2 rounded-xl text-sm hover:border-gray-400 transition-colors shadow-sm"
            >
              <ExternalLink size={16} /> Ver Área VIP do Cortejo
            </Link>

            {activeTab === 'gifts' && (
              <button 
                onClick={() => setIsAdding(true)}
                className="flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black border border-gray-800 dark:border-gray-200 px-4 py-2 rounded-xl text-sm hover:opacity-90 transition-colors shadow-sm cursor-pointer"
              >
                <Plus size={18} /> Adicionar Presente
              </button>
            )}
          </div>
        </div>

        {/* Tab Selection Navigation */}
        <div className="flex border-b border-gray-200 dark:border-zinc-800 mb-8 gap-4">
          <button
            onClick={() => setActiveTab('gifts')}
            className={`pb-3 px-4 font-serif text-lg flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'gifts'
                ? 'border-black dark:border-white text-[var(--foreground)] font-semibold'
                : 'border-transparent text-gray-500 hover:text-[var(--foreground)]'
            }`}
          >
            <GiftIcon size={20} /> Lista de Presentes ({gifts.length})
          </button>
          <button
            onClick={() => setActiveTab('padrinhos')}
            className={`pb-3 px-4 font-serif text-lg flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'padrinhos'
                ? 'border-black dark:border-white text-[var(--foreground)] font-semibold'
                : 'border-transparent text-gray-500 hover:text-[var(--foreground)]'
            }`}
          >
            <Users size={20} /> Contas dos Padrinhos ({PADRINHOS_ACCOUNTS.length})
          </button>
        </div>

        {activeTab === 'gifts' ? (
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
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Progresso</p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {totalMeta > 0 ? ((totalArrecadado / totalMeta) * 100).toFixed(1) : 0}%
                </p>
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
                            className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-xl transition-colors"
                          >
                            <Edit size={18} />
                          </button>
                          <button 
                            onClick={() => handleDelete(gift.id)}
                            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors"
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
        ) : (
          /* Padrinhos Management Tab */
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
                  {PADRINHOS_ACCOUNTS.map((acc) => (
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
                          onClick={() => copyWhatsAppMessage(acc.name, acc.username, acc.password, acc.id)}
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

      </div>

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
