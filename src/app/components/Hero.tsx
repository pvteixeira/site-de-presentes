'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop")',
        }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
      </div>

      <div className="z-10 text-center px-4 max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <p className="text-white/80 uppercase tracking-[0.3em] text-sm md:text-base mb-6 font-sans">
            Nós vamos casar
          </p>
        </motion.div>

        <motion.h1 
          className="text-5xl md:text-7xl lg:text-8xl text-white mb-6 font-serif"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
        >
          Aline <span className="text-[var(--color-wedding-gold)]">&</span> Klecio
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <p className="text-white/90 text-lg md:text-2xl font-sans font-light max-w-2xl mx-auto mb-12 italic">
            "Para dividir a vida, os sonhos e uma garrafa de vinho."
          </p>
          
          <button 
            onClick={() => {
              document.getElementById('lista-presentes')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group relative inline-flex items-center justify-center px-8 py-4 font-sans font-medium tracking-wide text-white transition-all duration-300 ease-in-out transform bg-[var(--color-wedding-gold)] rounded-full hover:bg-[var(--color-wedding-gold)]/90 hover:scale-105 hover:shadow-lg hover:shadow-[var(--color-wedding-gold)]/30 overflow-hidden"
          >
            <span className="relative z-10">Presentear os Noivos</span>
            <div className="absolute inset-0 h-full w-full bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out"></div>
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 z-10 text-white/70 flex flex-col items-center gap-2 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        onClick={() => document.getElementById('historia')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-xs uppercase tracking-widest font-sans">Deslize</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/70 to-transparent animate-pulse"></div>
      </motion.div>
    </section>
  );
}
