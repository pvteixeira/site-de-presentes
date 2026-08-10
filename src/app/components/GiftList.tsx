'use client';

import { useState } from 'react';
import { Search, ArrowUpDown, Gift as GiftIcon } from 'lucide-react';
import GiftCard from './GiftCard';
import ContributionModal from './ContributionModal';
import { triggerConfetti } from './Confetti';
import type { Gift } from '../types';

import { GIFTS_DATA } from '../utils/giftsData';

const CATEGORIES = ['Todas', 'Cozinha', 'Cama e Banho', 'Eletrodomésticos', 'Experiências', 'Outros'];

export default function GiftList() {
  const [gifts, setGifts] = useState<Gift[]>(GIFTS_DATA);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | 'default'>('default');
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);

  let filteredGifts = gifts.filter(gift => {
    const matchesCategory = selectedCategory === 'Todas' || gift.category === selectedCategory;
    const matchesSearch = gift.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          gift.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (sortOrder === 'asc') {
    filteredGifts = [...filteredGifts].sort((a, b) => a.totalAmount - b.totalAmount);
  } else if (sortOrder === 'desc') {
    filteredGifts = [...filteredGifts].sort((a, b) => b.totalAmount - a.totalAmount);
  }

  const handleContribute = (gift: Gift) => {
    setSelectedGift(gift);
  };

  const handleSuccess = (amount: number) => {
    if (selectedGift) {
      setGifts(gifts.map(g =>
        g.id === selectedGift.id
          ? { ...g, currentAmount: g.currentAmount + amount }
          : g
      ));
    }
    setSelectedGift(null);
    triggerConfetti();
  };

  return (
    <section id="lista-presentes" className="py-24 bg-[var(--background)]">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif text-[var(--foreground)] mb-4 font-medium">
            Lista de Presentes
          </h2>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-16 h-[1px] bg-gray-300 dark:bg-zinc-700"></div>
            <GiftIcon className="w-5 h-5 text-gray-400 dark:text-zinc-500" />
            <div className="w-16 h-[1px] bg-gray-300 dark:bg-zinc-700"></div>
          </div>
          <p className="text-base md:text-lg text-[var(--foreground)]/80 font-sans max-w-xl mx-auto leading-relaxed text-justified-elegant text-center">
            A sua presença e o seu carinho são os nossos maiores presentes! No entanto, caso deseje nos abençoar com um gesto de carinho extra, disponibilizamos opções delicadas de cotas para a nossa lua de mel e montagem do nosso novo lar.
          </p>
        </div>

        {/* Search & Sort Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <div className="relative w-full sm:w-80">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar presente..."
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:border-black dark:focus:border-white transition-all font-sans"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <span className="text-xs text-gray-400 font-sans font-medium">
              {filteredGifts.length} {filteredGifts.length === 1 ? 'item' : 'itens'}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs font-semibold uppercase tracking-wider text-[var(--foreground)] hover:border-gray-400 transition-colors cursor-pointer"
              >
                <ArrowUpDown size={14} /> {sortOrder === 'asc' ? 'Menor Valor' : sortOrder === 'desc' ? 'Maior Valor' : 'Ordenar Por Valor'}
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-12">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-xl font-sans text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                selectedCategory === category
                  ? 'bg-black dark:bg-white text-white dark:text-black shadow-sm border border-gray-800 dark:border-gray-200'
                  : 'bg-gray-50 dark:bg-zinc-800/60 text-[var(--foreground)]/80 hover:bg-gray-100 dark:hover:bg-zinc-700 border border-gray-200 dark:border-zinc-700/60'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gift Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGifts.map((gift) => (
            <GiftCard
              key={gift.id}
              gift={gift}
              onContribute={handleContribute}
            />
          ))}
        </div>

        {filteredGifts.length === 0 && (
          <div className="text-center py-16 text-gray-500 font-sans">
            Nenhum presente encontrado para a sua busca. Tente buscar por outro termo.
          </div>
        )}
      </div>

      {selectedGift && (
        <ContributionModal
          gift={selectedGift}
          onClose={() => setSelectedGift(null)}
          onSuccess={handleSuccess}
        />
      )}
    </section>
  );
}
