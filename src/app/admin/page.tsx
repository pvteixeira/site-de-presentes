'use client';

import { useState } from 'react';
import { Gift } from '../types';
import { Plus, Edit, Trash2, CheckCircle, Save, X } from 'lucide-react';

import { GIFTS_DATA } from '../utils/giftsData';

export default function AdminPage() {
  const [gifts, setGifts] = useState<Gift[]>(GIFTS_DATA);
  const [editingGift, setEditingGift] = useState<Gift | null>(null);
  const [isAdding, setIsAdding] = useState(false);

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

  return (
    <div className="min-h-screen bg-[var(--background)] p-4 md:p-8 pt-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif text-[var(--foreground)]">Painel Administrativo</h1>
          <button 
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 bg-[var(--color-wedding-gold)] text-white px-4 py-2 rounded-lg hover:bg-[var(--color-wedding-gold)]/90 transition-colors"
          >
            <Plus size={20} /> Adicionar Presente
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800">
            <p className="text-sm text-gray-500 font-medium mb-1">Total Arrecadado</p>
            <p className="text-3xl font-bold text-[var(--color-wedding-gold)]">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalArrecadado)}
            </p>
          </div>
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800">
            <p className="text-sm text-gray-500 font-medium mb-1">Meta Geral</p>
            <p className="text-3xl font-bold text-[var(--foreground)]">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalMeta)}
            </p>
          </div>
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800">
            <p className="text-sm text-gray-500 font-medium mb-1">Progresso</p>
            <p className="text-3xl font-bold text-green-500">
              {totalMeta > 0 ? ((totalArrecadado / totalMeta) * 100).toFixed(1) : 0}%
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-zinc-800/50 border-b border-gray-100 dark:border-zinc-800">
                <th className="p-4 font-medium text-gray-500">Item</th>
                <th className="p-4 font-medium text-gray-500">Meta</th>
                <th className="p-4 font-medium text-gray-500">Arrecadado</th>
                <th className="p-4 font-medium text-gray-500 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {gifts.map((gift) => (
                <tr key={gift.id} className="border-b border-gray-100 dark:border-zinc-800 hover:bg-gray-50/50 dark:hover:bg-zinc-800/20">
                  <td className="p-4 flex items-center gap-4">
                    <img src={gift.imageUrl} alt={gift.name} className="w-12 h-12 rounded-lg object-cover" />
                    <div>
                      <p className="font-medium text-[var(--foreground)]">{gift.name}</p>
                      <p className="text-sm text-gray-500 truncate max-w-xs">{gift.description}</p>
                    </div>
                  </td>
                  <td className="p-4 text-[var(--foreground)]">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(gift.totalAmount)}
                  </td>
                  <td className="p-4 text-[var(--foreground)]">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(gift.currentAmount)}
                  </td>
                  <td className="p-4">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => setEditingGift(gift)}
                        className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(gift.id)}
                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
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
      </div>

      {/* Edit/Add Modal */}
      {(editingGift || isAdding) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-900 w-full max-w-lg rounded-2xl p-6 shadow-xl relative">
            <button 
              onClick={() => { setEditingGift(null); setIsAdding(false); }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
            <h2 className="text-2xl font-serif text-[var(--foreground)] mb-6">
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
                <label className="block text-sm font-medium mb-1">Nome do Item</label>
                <input required name="name" defaultValue={editingGift?.name} className="w-full p-2 rounded border border-gray-200 dark:border-zinc-700 bg-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Descrição</label>
                <textarea required name="description" defaultValue={editingGift?.description} className="w-full p-2 rounded border border-gray-200 dark:border-zinc-700 bg-transparent" rows={3} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Categoria</label>
                <input required name="category" defaultValue={editingGift?.category} className="w-full p-2 rounded border border-gray-200 dark:border-zinc-700 bg-transparent" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Meta (R$)</label>
                  <input required type="number" name="totalAmount" defaultValue={editingGift?.totalAmount} className="w-full p-2 rounded border border-gray-200 dark:border-zinc-700 bg-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Já Arrecadado (R$)</label>
                  <input required type="number" name="currentAmount" defaultValue={editingGift?.currentAmount || 0} className="w-full p-2 rounded border border-gray-200 dark:border-zinc-700 bg-transparent" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">URL da Imagem</label>
                <input required name="imageUrl" defaultValue={editingGift?.imageUrl} className="w-full p-2 rounded border border-gray-200 dark:border-zinc-700 bg-transparent" placeholder="https://..." />
              </div>
              
              <button type="submit" className="w-full flex items-center justify-center gap-2 bg-[var(--color-wedding-gold)] text-white py-3 rounded-xl hover:bg-[var(--color-wedding-gold)]/90 transition-colors mt-6">
                <Save size={20} /> Salvar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
