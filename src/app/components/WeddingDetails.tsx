'use client';

import { motion } from 'framer-motion';
import { Clock, MapPin, Heart } from 'lucide-react';

export default function WeddingDetails() {
  return (
    <section id="o-grande-dia" className="py-24 bg-[var(--background)]">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 flex flex-col items-center"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-[var(--foreground)] mb-4 font-medium">
            O Grande Dia
          </h2>

          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-[1px] bg-black dark:bg-white opacity-30"></div>
            <Heart className="w-3.5 h-3.5 fill-[var(--foreground)] text-[var(--foreground)]" />
            <div className="w-12 h-[1px] bg-black dark:bg-white opacity-30"></div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Card Cerimônia */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-card bg-white dark:bg-[var(--background)] p-8 md:p-10 flex flex-col justify-between h-full border border-gray-200 dark:border-gray-800 shadow-sm"
          >
            <div>
              <h3 className="text-2xl font-serif text-[var(--foreground)] mb-6 pb-2 border-b border-gray-200 dark:border-zinc-800 font-semibold">
                Cerimônia
              </h3>
              <h4 className="text-xl font-sans font-semibold text-[var(--foreground)] mb-6">
                Igreja do Bom Jesus do Bonfim
              </h4>

              <ul className="space-y-4 font-sans text-base text-[var(--foreground)]/80 mb-8">
                <li className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gray-500 shrink-0" />
                  <div>
                    <span className="font-medium text-[var(--foreground)]">19h00</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" />
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
              className="inline-flex items-center justify-center gap-2 w-full py-4 px-6 font-sans font-semibold tracking-wide text-white dark:text-black uppercase text-xs transition-all duration-300 bg-black dark:bg-white rounded-xl hover:opacity-90 hover:scale-[1.02] shadow-md"
            >
              <MapPin className="w-4 h-4 shrink-0" />
              <span>Ver localização</span>
            </a>
          </motion.div>

          {/* Card Recepção */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glass-card bg-white dark:bg-[var(--background)] p-8 md:p-10 flex flex-col justify-between h-full border border-gray-200 dark:border-gray-800 shadow-sm"
          >
            <div>
              <h3 className="text-2xl font-serif text-[var(--foreground)] mb-6 pb-2 border-b border-gray-200 dark:border-zinc-800 font-semibold">
                Recepção
              </h3>
              <h4 className="text-xl font-sans font-semibold text-[var(--foreground)] mb-6">
                Dayse Nogueira Recepções
              </h4>

              <ul className="space-y-4 font-sans text-base text-[var(--foreground)]/80 mb-8">
                <li className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gray-500 shrink-0" />
                  <div>
                    <span className="font-medium text-[var(--foreground)]">22h00</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" />
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
              className="inline-flex items-center justify-center gap-2 w-full py-4 px-6 font-sans font-semibold tracking-wide text-white dark:text-black uppercase text-xs transition-all duration-300 bg-black dark:bg-white rounded-xl hover:opacity-90 hover:scale-[1.02] shadow-md"
            >
              <MapPin className="w-4 h-4 shrink-0" />
              <span>Ver localização</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
