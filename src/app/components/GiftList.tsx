'use client';

import { useState } from 'react';
import GiftCard from './GiftCard';
import ContributionModal from './ContributionModal';
import { triggerConfetti } from './Confetti';
import type { Gift } from '../types';

const MOCK_GIFTS: Gift[] = [
  {
    id: '1',
    name: 'Passagens para a Lua de Mel',
    description: 'Ajude-nos a chegar ao nosso destino dos sonhos nas Maldivas!',
    totalAmount: 5000,
    currentAmount: 1500,
    imageUrl: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: '2',
    name: 'Jantar Romântico',
    description: 'Um jantar inesquecível na nossa primeira noite como casados.',
    totalAmount: 400,
    currentAmount: 400,
    imageUrl: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: '3',
    name: 'Geladeira Inox',
    description: 'Para manter nossa água gelada e as comidas frescas.',
    totalAmount: 3500,
    currentAmount: 500,
    imageUrl: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: '4',
    name: 'Jogo de Copos de Cristal',
    description: 'Para os nossos brindes em dias especiais.',
    totalAmount: 250,
    currentAmount: 100,
    imageUrl: 'https://images.unsplash.com/photo-1599824672688-29bf18408f65?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: '5',
    name: 'Passeio de Barco',
    description: 'Um passeio incrível durante nossa viagem de lua de mel.',
    totalAmount: 800,
    currentAmount: 0,
    imageUrl: 'https://images.unsplash.com/photo-1544333323-16786ee65684?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: '6',
    name: 'Máquina de Café',
    description: 'Para o nosso café da manhã em família.',
    totalAmount: 600,
    currentAmount: 200,
    imageUrl: 'https://images.unsplash.com/photo-1495474472207-464a8d9cb592?q=80&w=1000&auto=format&fit=crop',
  }
];

export default function GiftList() {
  const [gifts, setGifts] = useState<Gift[]>(MOCK_GIFTS);
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {gifts.map((gift) => (
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
