'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
  });

  useEffect(() => {
    // Target date: Jan 9, 2027 at 19:30:00 UTC-3 (Brasilia Time)
    const weddingDate = new Date('2027-01-09T19:30:00-03:00');
    
    const interval = setInterval(() => {
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
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { label: 'Dias', value: timeLeft.dias },
    { label: 'Horas', value: timeLeft.horas },
    { label: 'Minutos', value: timeLeft.minutos },
    { label: 'Segundos', value: timeLeft.segundos },
  ];

  return (
    <section id="historia" className="py-20 bg-white dark:bg-[var(--background)]">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-5xl font-serif text-[var(--foreground)] mb-4">
            Contagem Regressiva
          </h2>
          <p className="text-lg text-[var(--foreground)]/70 font-sans max-w-2xl mx-auto mb-12">
            Estamos preparando tudo com muito carinho para celebrar nosso amor com as pessoas que mais amamos.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {timeUnits.map((unit, index) => (
              <div 
                key={unit.label}
                className="flex flex-col items-center justify-center w-24 h-24 md:w-32 md:h-32 rounded-full border border-[var(--color-wedding-gold)]/30 bg-[var(--color-wedding-beige)] dark:bg-[var(--color-wedding-beige)]/10 shadow-sm"
              >
                <span className="text-3xl md:text-5xl font-serif text-[var(--color-wedding-gold)] mb-1">
                  {unit.value.toString().padStart(2, '0')}
                </span>
                <span className="text-xs md:text-sm font-sans uppercase tracking-widest text-[var(--foreground)]/60">
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
