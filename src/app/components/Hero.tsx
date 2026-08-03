'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-white text-[var(--foreground)]">
      {/* Background subtle luxury gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/80 via-white to-gray-50/50 pointer-events-none z-0"></div>

      <div className="z-10 text-center px-4 max-w-4xl w-full flex flex-col items-center">
        {/* Monogram Logo Emblem with silver border */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="mb-6 p-1.5 rounded-full border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-md flex items-center justify-center overflow-hidden"
        >
          <img
            src="/img/LOGO_MARCA.png"
            alt="Logo Marca Aline e Klécio"
            className="w-24 h-24 md:w-32 md:h-32 object-contain rounded-full"
          />
        </motion.div>

        <motion.h1
          className="text-6xl md:text-8xl lg:text-9xl text-zinc-900 dark:text-white mb-4 font-script tracking-normal font-normal py-2"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
        >
          Aline e Klécio
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <p className="text-gray-500 dark:text-gray-400 uppercase tracking-[0.25em] text-xs md:text-sm mb-8 font-sans font-light">
            09 de janeiro de 2027
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col items-center"
        >
          <button
            onClick={() => {
              document.getElementById('lista-presentes')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group relative inline-flex items-center justify-center px-8 py-4 font-sans font-semibold tracking-wider text-white dark:text-black transition-all duration-300 ease-in-out transform bg-black dark:bg-white rounded-xl hover:bg-zinc-800 dark:hover:bg-gray-100 hover:scale-[1.02] border border-zinc-800 dark:border-gray-200 shadow-md overflow-hidden cursor-pointer uppercase text-xs"
          >
            <span className="relative z-10">Lista de Presentes</span>
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 z-10 text-gray-400 hover:text-black dark:hover:text-white flex flex-col items-center gap-2 cursor-pointer transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        onClick={() => document.getElementById('historia')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-[10px] uppercase tracking-widest font-sans font-medium text-gray-400">Deslize</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-gray-400 to-transparent animate-pulse"></div>
      </motion.div>
    </section>
  );
}
