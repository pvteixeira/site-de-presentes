'use client';

import { useState } from 'react';
import GiftCard from './GiftCard';
import ContributionModal from './ContributionModal';
import { triggerConfetti } from './Confetti';
import type { Gift } from '../types';

import { GIFTS_DATA } from '../utils/giftsData';

const CATEGORIES = ['Todas', 'Cozinha', 'Eletrodomésticos', 'Quarto e Banho', 'Tecnologia', 'Experiências', 'Casa'];

export default function GiftList() {
  const [gifts, setGifts] = useState<Gift[]>(GIFTS_DATA);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);

  const filteredGifts = selectedCategory === 'Todas' 
    ? gifts 
    : gifts.filter(gift => gift.category === selectedCategory);

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
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-[var(--foreground)] mb-6">
            Lista de Presentes
          </h2>
          <p className="text-lg text-[var(--foreground)]/70 font-sans max-w-2xl mx-auto">
            A sua presença é o nosso maior presente! Mas se desejar nos presentear com algo mais,
            sugerimos algumas cotas para a nossa lua de mel e montagem do nosso lar.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-sans text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                selectedCategory === category
                  ? 'bg-black dark:bg-white text-white dark:text-black shadow-md'
                  : 'bg-gray-100 dark:bg-zinc-800 text-[var(--foreground)]/80 hover:bg-gray-200 dark:hover:bg-zinc-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGifts.map((gift) => (
            <GiftCard
              key={gift.id}
              gift={gift}
              onContribute={handleContribute}
            />
          ))}
        </div>
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
