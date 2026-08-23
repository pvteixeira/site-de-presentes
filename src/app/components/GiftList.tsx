'use client';

import { useState, useEffect } from 'react';
import { Search, ArrowUpDown, Gift as GiftIcon, ChevronDown } from 'lucide-react';
import GiftCard from './GiftCard';
import ContributionModal from './ContributionModal';
import { triggerConfetti } from './Confetti';
import type { Gift } from '../types';

import { GIFTS_DATA } from '../utils/giftsData';

const CATEGORIES = ['Todas', 'Cozinha', 'Cama e Banho', 'Eletrodomésticos', 'Experiências', 'Outros'];
const INITIAL_ITEMS_COUNT = 12;
const ITEMS_PER_LOAD = 12;

export default function GiftList() {
  const [gifts, setGifts] = useState<Gift[]>(GIFTS_DATA);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | 'default'>('default');
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_ITEMS_COUNT);

  // Reset pagination when filters or sort change
  useEffect(() => {
    setVisibleCount(INITIAL_ITEMS_COUNT);
  }, [selectedCategory, searchQuery, sortOrder]);

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

  const visibleGifts = filteredGifts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredGifts.length;

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + ITEMS_PER_LOAD);
  };

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
          <div className="flex items-center justify-center gap-3">
            <div className="w-16 h-[1px] bg-gray-300 dark:bg-zinc-700"></div>
            <GiftIcon className="w-5 h-5 text-gray-400 dark:text-zinc-500" />
            <div className="w-16 h-[1px] bg-gray-300 dark:bg-zinc-700"></div>
          </div>
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
              Mostrando {visibleGifts.length} de {filteredGifts.length} {filteredGifts.length === 1 ? 'item' : 'itens'}
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
          {visibleGifts.map((gift) => (
            <GiftCard
              key={gift.id}
              gift={gift}
              onContribute={handleContribute}
            />
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="mt-12 text-center">
            <button
              onClick={handleLoadMore}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-300 ease-in-out transform bg-gradient-to-r from-slate-300 via-gray-100 to-slate-300 hover:from-slate-400 hover:via-gray-200 hover:to-slate-400 dark:from-zinc-700 dark:via-zinc-600 dark:to-zinc-700 dark:hover:from-zinc-600 dark:hover:to-zinc-600 text-slate-900 dark:text-slate-100 border border-slate-400/80 dark:border-zinc-500 shadow-md hover:shadow-lg hover:scale-105 cursor-pointer"
            >
              <span>Ver mais presentes</span>
              <ChevronDown size={16} className="text-slate-700 dark:text-slate-200" />
            </button>
          </div>
        )}

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
