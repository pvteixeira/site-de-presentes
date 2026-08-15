'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

export default function Countdown() {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
  });

  useEffect(() => {
    setMounted(true);
    // Target date: Jan 9, 2027 at 19:30:00 UTC-3 (Brasilia Time)
    const weddingDate = new Date('2027-01-09T19:30:00-03:00');

    const updateTimeLeft = () => {
      const now = new Date();
      const difference = weddingDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
          horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutos: Math.floor((difference / 1000 / 60) % 60),
          segundos: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ dias: 0, horas: 0, minutos: 0, segundos: 0 });
      }
    };

    updateTimeLeft(); // Run immediately on mount
    const interval = setInterval(updateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { label: 'Dias', value: timeLeft.dias },
    { label: 'Horas', value: timeLeft.horas },
    { label: 'Minutos', value: timeLeft.minutos },
    { label: 'Segundos', value: timeLeft.segundos },
  ];

  return (
    <section id="countdown" className="py-20 bg-gradient-to-b from-slate-200/80 via-gray-100 to-slate-200/80 dark:from-zinc-900 dark:via-zinc-900/90 dark:to-zinc-900 border-y border-slate-300 dark:border-zinc-800 shadow-inner">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-5xl font-serif text-[var(--foreground)] mb-4 font-medium">
            Contagem Regressiva
          </h2>
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-16 h-[1px] bg-gray-300 dark:bg-zinc-700"></div>
            <Clock className="w-5 h-5 text-gray-400 dark:text-zinc-500" />
            <div className="w-16 h-[1px] bg-gray-300 dark:bg-zinc-700"></div>
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {timeUnits.map((unit) => (
              <div
                key={unit.label}
                className="flex flex-col items-center justify-center w-24 h-24 md:w-32 md:h-32 rounded-full border border-slate-300 dark:border-zinc-700 bg-white/90 dark:bg-zinc-800/90 shadow-md backdrop-blur-sm"
              >
                <span className="text-3xl md:text-5xl font-serif text-[var(--foreground)] font-medium mb-1">
                  {mounted ? unit.value.toString().padStart(2, '0') : '--'}
                </span>
                <span className="text-[10px] md:text-xs font-sans uppercase tracking-widest text-gray-500 font-medium">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

