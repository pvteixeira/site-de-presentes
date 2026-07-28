'use client';

import { motion } from 'framer-motion';

export default function CoupleCards() {
  return (
    <section id="os-noivos" className="py-24 bg-[var(--color-wedding-beige)] dark:bg-zinc-900/60 border-t border-gray-200 dark:border-zinc-800">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-[var(--foreground)] mb-6 font-medium">
            Os Noivos
          </h2>
          <p className="text-lg text-[var(--foreground)]/70 font-sans max-w-2xl mx-auto">
            Com a bênção de Deus e de nossos queridos pais, daremos início à nossa própria família.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
          {/* Card Noiva */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-card bg-white dark:bg-zinc-900 p-8 md:p-10 flex flex-col items-center text-center border border-gray-200 dark:border-zinc-800 shadow-sm"
          >
            <span className="text-xs uppercase tracking-[0.2em] font-sans font-semibold text-[var(--foreground)] px-4 py-1.5 rounded-full border border-gray-300 dark:border-zinc-700 bg-gray-100 dark:bg-zinc-800 mb-6">
              Noiva
            </span>
            
            <h3 className="text-2xl md:text-3xl font-serif text-[var(--foreground)] mb-6 font-medium">
              Aline Teixeira Bruno Silva
            </h3>
            
            <div className="w-12 h-[1px] bg-black dark:bg-white opacity-30 mb-6"></div>
            
            <p className="text-xs uppercase tracking-widest text-[var(--foreground)]/50 mb-3 font-sans">
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
            className="glass-card bg-white dark:bg-zinc-900 p-8 md:p-10 flex flex-col items-center text-center border border-gray-200 dark:border-zinc-800 shadow-sm"
          >
            <span className="text-xs uppercase tracking-[0.2em] font-sans font-semibold text-[var(--foreground)] px-4 py-1.5 rounded-full border border-gray-300 dark:border-zinc-700 bg-gray-100 dark:bg-zinc-800 mb-6">
              Noivo
            </span>
            
            <h3 className="text-2xl md:text-3xl font-serif text-[var(--foreground)] mb-6 font-medium">
              Klécio Rodolfo Felix de Lima
            </h3>
            
            <div className="w-12 h-[1px] bg-black dark:bg-white opacity-30 mb-6"></div>
            
            <p className="text-xs uppercase tracking-widest text-[var(--foreground)]/50 mb-3 font-sans">
              Pais
            </p>
            
            <div className="space-y-1 text-base text-[var(--foreground)]/80 font-sans leading-relaxed">
              <p>Lenildo Felix de Lima</p>
              <p>Lucidalva Correia de Lima</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
