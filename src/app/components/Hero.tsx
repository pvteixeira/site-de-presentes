'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
      {/* Colocar a imagem de fundo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 opacity-80"
        style={{
          backgroundImage: 'url("")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 backdrop-blur-[2px]"></div>
      </div>

      <div className="z-10 text-center px-4 max-w-4xl w-full flex flex-col items-center">
        {/* Monogram Logo Emblem */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="mb-6 p-2 rounded-full border border-white/30 bg-black/40 backdrop-blur-md shadow-2xl"
        >
          <img
            src="/LOGO_MARCA.jpg"
            alt="Logo Marca Aline e Klécio"
            className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full border border-white/20 shadow-lg"
          />
        </motion.div>


        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl text-white mb-4 font-serif font-medium tracking-tight drop-shadow-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
        >
          Aline <span className="text-gray-300 font-serif">e</span> Klécio
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <p className="text-white/90 uppercase tracking-[0.25em] text-sm md:text-base mb-8 font-sans font-light">
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
            className="group relative inline-flex items-center justify-center px-8 py-4 font-sans font-medium tracking-wide text-black transition-all duration-300 ease-in-out transform bg-white rounded-full hover:bg-gray-100 hover:scale-105 hover:shadow-xl hover:shadow-white/10 overflow-hidden cursor-pointer"
          >
            <span className="relative z-10 font-semibold uppercase tracking-wider text-xs">Presentear os Noivos</span>
            <div className="absolute inset-0 h-full w-full bg-black/10 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out"></div>
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 z-10 text-white/70 flex flex-col items-center gap-2 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        onClick={() => document.getElementById('historia')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-xs uppercase tracking-widest font-sans font-light">Deslize</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-white/80 to-transparent animate-pulse"></div>
      </motion.div>
    </section>
  );
}
