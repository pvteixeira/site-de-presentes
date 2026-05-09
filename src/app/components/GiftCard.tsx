'use client';

import { motion } from 'framer-motion';
import type { Gift } from '../types';

interface GiftCardProps {
  gift: Gift;
  onContribute: (gift: Gift) => void;
}

export default function GiftCard({ gift, onContribute }: GiftCardProps) {
  const progress = Math.min((gift.currentAmount / gift.totalAmount) * 100, 100);
  const isCompleted = progress >= 100;

  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  return (
    <motion.div 
      className="glass-card overflow-hidden flex flex-col h-full bg-white dark:bg-[var(--background)] group relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      {isCompleted && (
        <div className="absolute top-4 right-4 z-10 bg-[var(--color-wedding-gold)] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
          Completo
        </div>
      )}

      <div className="h-48 overflow-hidden relative">
        <img 
          src={gift.imageUrl} 
          alt={gift.name} 
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${isCompleted ? 'grayscale opacity-70' : ''}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-serif text-[var(--foreground)] mb-2 line-clamp-1">{gift.name}</h3>
        <p className="text-sm text-[var(--foreground)]/70 font-sans mb-4 line-clamp-2 flex-grow">
          {gift.description}
        </p>

        <div className="space-y-3 mt-auto">
          <div className="flex justify-between text-sm font-medium font-sans">
            <span className="text-[var(--foreground)]">{formatCurrency(gift.totalAmount)}</span>
            <span className="text-[var(--color-wedding-gold)]">{progress.toFixed(0)}%</span>
          </div>
          
          <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2.5 overflow-hidden">
            <motion.div 
              className="bg-[var(--color-wedding-gold)] h-2.5 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            ></motion.div>
          </div>

          <button 
            onClick={() => !isCompleted && onContribute(gift)}
            disabled={isCompleted}
            className={`w-full py-3 rounded-xl font-sans font-medium transition-all duration-300 ${
              isCompleted 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-500' 
                : 'bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--foreground)]/90 hover:shadow-lg'
            }`}
          >
            {isCompleted ? 'Agradecemos!' : 'Contribuir'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
