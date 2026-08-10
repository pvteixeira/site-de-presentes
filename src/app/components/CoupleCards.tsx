'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function CoupleCards() {
  return (
    <section id="os-noivos" className="py-24 bg-[var(--background)] border-t border-gray-200 dark:border-zinc-800">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-[var(--foreground)] mb-4 font-medium">
            Os Noivos
          </h2>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-16 h-[1px] bg-gray-300 dark:bg-zinc-700"></div>
            <Heart className="w-5 h-5 text-gray-400 dark:text-zinc-500" />
            <div className="w-16 h-[1px] bg-gray-300 dark:bg-zinc-700"></div>
          </div>
          <p className="text-base md:text-lg text-[var(--foreground)]/80 font-sans max-w-xl mx-auto leading-relaxed text-justified-elegant text-center">
            Com a bênção de Deus e de nossos pais, convidamos você para celebrar a cerimônia religiosa do nosso casamento.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
          {/* Card Noiva */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-card bg-white dark:bg-zinc-900 p-6 sm:p-8 md:p-10 flex flex-col items-center text-center border border-gray-200 dark:border-zinc-800 shadow-sm rounded-2xl"
          >
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif text-[var(--foreground)] mb-6 font-medium whitespace-nowrap">
              Aline Teixeira Bruno Silva
            </h3>

            <div className="w-12 h-[1px] bg-gray-300 dark:bg-zinc-700 mb-6"></div>

            <p className="text-xs uppercase tracking-widest text-gray-400 mb-3 font-sans font-medium">
              Pais
            </p>

            <div className="space-y-1 text-base text-[var(--foreground)]/80 font-sans leading-relaxed">
              <p>Abdias José da Silva Filho</p>
              <p>Ana Paula Teixeira Bruno Silva</p>
            </div>
          </motion.div>

          {/* Card Noivo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glass-card bg-white dark:bg-zinc-900 p-6 sm:p-8 md:p-10 flex flex-col items-center text-center border border-gray-200 dark:border-zinc-800 shadow-sm rounded-2xl"
          >
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif text-[var(--foreground)] mb-6 font-medium whitespace-nowrap">
              Klécio Rodolfo Felix de Lima
            </h3>

            <div className="w-12 h-[1px] bg-gray-300 dark:bg-zinc-700 mb-6"></div>

            <p className="text-xs uppercase tracking-widest text-gray-400 mb-3 font-sans font-medium">
              Pais
            </p>

            <div className="space-y-1 text-base text-[var(--foreground)]/80 font-sans leading-relaxed">
              <p>Lenildo Felix de Lima <em className="italic font-serif text-sm text-gray-500">(in memoriam)</em></p>
              <p>Lucidalva Correia de Lima</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
