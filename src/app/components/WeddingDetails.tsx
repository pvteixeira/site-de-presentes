'use client';

import { motion } from 'framer-motion';
import { Clock, MapPin, Heart } from 'lucide-react';

function PaperRoseIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Geometric minimal paper/origami rose */}
      <path d="M12 3c-3.5 0-6 2.5-6 6 0 4 3 6.5 6 9 3-2.5 6-5 6-9 0-3.5-2.5-6-6-6z" />
      <path d="M12 7c-1.5 0-2.5 1-2.5 2.5 0 1.5 1 2.5 2.5 3.5 1.5-1 2.5-2 2.5-3.5C14.5 8 13.5 7 12 7z" />
      <path d="M12 18v3" />
      <path d="M10 20.5c1 0 2-.8 2-.8s1 .8 2 .8" />
    </svg>
  );
}

export default function WeddingDetails() {
  return (
    <section id="o-grande-dia" className="py-24 bg-[var(--background)] border-t border-gray-200 dark:border-zinc-800">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 flex flex-col items-center"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-[var(--foreground)] mb-4 font-medium">
          Cerimônia Religiosa e Recepção
          </h2>

          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-16 h-[1px] bg-gray-300 dark:bg-zinc-700"></div>
            <MapPin className="w-5 h-5 text-gray-400 dark:text-zinc-500" />
            <div className="w-16 h-[1px] bg-gray-300 dark:bg-zinc-700"></div>
          </div>

          <p className="text-base md:text-lg text-[var(--foreground)]/80 font-sans max-w-2xl mx-auto leading-relaxed text-justified-elegant text-center">
            É com muita alegria que compartilhamos com vocês os locais escolhidos para celebrar este momento tão especial.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Card Cerimônia */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-card bg-white dark:bg-zinc-900/90 p-8 md:p-10 flex flex-col justify-between h-full border border-gray-200 dark:border-zinc-800 shadow-sm rounded-2xl"
          >
            <div>
              <h3 className="text-2xl font-serif text-[var(--foreground)] mb-6 pb-2 border-b border-gray-200 dark:border-zinc-800 font-semibold text-center">
                Cerimônia Religiosa
              </h3>
              <h4 className="text-xl font-sans font-semibold text-[var(--foreground)] mb-6 text-center">
                Igreja do Bom Jesus do Bonfim
              </h4>

              <ul className="space-y-4 font-sans text-base text-[var(--foreground)]/80 mb-8">
                <li className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gray-400 shrink-0" />
                  <div>
                    <span className="font-semibold text-[var(--foreground)] text-lg">19h</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                  <div>
                    <span>R. Bonfim/Tv do Bonfim, Carmo, Olinda – PE</span>
                  </div>
                </li>
              </ul>
            </div>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Igreja+do+Bom+Jesus+do+Bonfim+Olinda+PE"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 font-sans font-semibold tracking-wider text-slate-900 dark:text-slate-100 uppercase text-xs transition-all duration-300 bg-slate-200 hover:bg-slate-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-xl hover:scale-[1.01] shadow-sm border border-slate-300 dark:border-zinc-700 cursor-pointer"
            >
              <MapPin className="w-4 h-4 shrink-0 text-slate-600 dark:text-slate-300" />
              <span>Ver localização</span>
            </a>
          </motion.div>

          {/* Card Recepção */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glass-card bg-white dark:bg-zinc-900/90 p-8 md:p-10 flex flex-col justify-between h-full border border-gray-200 dark:border-zinc-800 shadow-sm rounded-2xl"
          >
            <div>
              <h3 className="text-2xl font-serif text-[var(--foreground)] mb-6 pb-2 border-b border-gray-200 dark:border-zinc-800 font-semibold text-center">
                Recepção
              </h3>
              <h4 className="text-xl font-sans font-semibold text-[var(--foreground)] mb-6 text-center">
                Dayse Nogueira Recepções
              </h4>

              <ul className="space-y-4 font-sans text-base text-[var(--foreground)]/80 mb-8">
                <li className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gray-400 shrink-0" />
                  <div>
                    <span className="font-semibold text-[var(--foreground)] text-lg">22h</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                  <div>
                    <span>Av. Carlos de Lima Cavalcante, 2499</span>
                    <br />
                    <span>Casa Caiada, Olinda – PE</span>
                  </div>
                </li>
              </ul>
            </div>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Dayse+Nogueira+Recepcoes+Av+Carlos+de+Lima+Cavalcante+2499+Olinda"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 font-sans font-semibold tracking-wider text-slate-900 dark:text-slate-100 uppercase text-xs transition-all duration-300 bg-slate-200 hover:bg-slate-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-xl hover:scale-[1.01] shadow-sm border border-slate-300 dark:border-zinc-700 cursor-pointer"
            >
              <MapPin className="w-4 h-4 shrink-0 text-slate-600 dark:text-slate-300" />
              <span>Ver localização</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
