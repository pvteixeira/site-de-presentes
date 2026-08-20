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
      className="glass-card overflow-hidden flex flex-col h-full bg-white dark:bg-zinc-900 group relative rounded-2xl shadow-sm border border-gray-200 dark:border-zinc-800"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {isCompleted && (
        <div className="absolute top-4 right-4 z-10 bg-black dark:bg-white text-white dark:text-black text-[10px] font-bold px-3 py-1 rounded-xl shadow-sm uppercase tracking-wider border border-gray-300 dark:border-zinc-700">
          Concluído
        </div>
      )}

      <div className="h-48 overflow-hidden relative">
        <img 
          src={gift.imageUrl} 
          alt={gift.name} 
          loading="lazy"
          decoding="async"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (!target.src.endsWith('/img/aline_e_klecio.jpg')) {
              target.src = '/img/aline_e_klecio.jpg';
            }
          }}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${isCompleted ? 'grayscale opacity-70' : ''}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-40"></div>
      </div>

      <div className="p-6 flex flex-col flex-grow bg-white dark:bg-zinc-900 justify-between">
        <h3 className="text-xl font-serif text-[var(--foreground)] mb-6 line-clamp-1 font-medium">{gift.name}</h3>

        <div className="mt-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[var(--foreground)] font-semibold text-base">{formatCurrency(gift.totalAmount)}</span>
            <span className="text-xs font-bold text-gray-500 font-mono">{progress.toFixed(0)}%</span>
          </div>
          
          <div className="w-full bg-gray-100 dark:bg-zinc-800 rounded-full h-2 overflow-hidden mb-6 border border-gray-200 dark:border-zinc-700">
            <motion.div 
              className="bg-black dark:bg-white h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            ></motion.div>
          </div>

          <button 
            onClick={() => !isCompleted && onContribute(gift)}
            disabled={isCompleted}
            className={`w-full py-3.5 rounded-xl font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-300 border cursor-pointer ${
              isCompleted 
                ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed dark:bg-zinc-800 dark:text-zinc-500 dark:border-zinc-700' 
                : 'bg-black dark:bg-white text-white dark:text-black border-gray-800 dark:border-gray-200 hover:bg-gray-800 dark:hover:bg-gray-100 shadow-sm'
            }`}
          >
            {isCompleted ? 'Agradecemos!' : 'Contribuir'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
