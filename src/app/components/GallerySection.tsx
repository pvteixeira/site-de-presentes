'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, X, ChevronLeft, ChevronRight } from 'lucide-react';

const GALLERY_IMAGES = [
  {
    id: 1,
    src: '/img/Galeria/ALINEEKLECIOBB.jpeg',
    title: 'Aline e Klécio Pequeninos',
    subtitle: 'Nossas infâncias e os primeiros passos'
  },
  {
    id: 2,
    src: '/img/Galeria/ALINEEKLECIOCHUVA.jpeg',
    title: 'Romance sob a Chuva',
    subtitle: 'Amor e cumplicidade em todo clima'
  },
  {
    id: 3,
    src: '/img/Galeria/ALINEEKLECIOFLORESTA.jpeg',
    title: 'Ensaio na Floresta',
    subtitle: 'Conexão e leveza em meio à natureza'
  },
  {
    id: 4,
    src: '/img/Galeria/ALINEEKLECIOFORMAL.jpeg',
    title: 'Elegância e Celebração',
    subtitle: 'Par perfeito prontos para comemorar'
  },
  {
    id: 5,
    src: '/img/Galeria/ALINEEKLECIOTORRE.jpeg',
    title: 'Registros de Viagem',
    subtitle: 'Colecionando memórias pelo mundo'
  },
  {
    id: 6,
    src: '/img/Galeria/KLECIOBB.jpeg',
    title: 'Klécio Bebê',
    subtitle: 'Infância inesquecível do noivo'
  },
];

export default function GallerySection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handlePrev = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
  };

  const handleNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % GALLERY_IMAGES.length);
  };

  return (
    <section id="galeria" className="py-24 bg-gray-50/50 dark:bg-zinc-900/40 border-t border-gray-200 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto px-4">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <h2 className="text-3xl md:text-5xl font-serif text-[var(--foreground)] font-medium">
            Galeria de Fotos
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="w-16 h-[1px] bg-gray-300 dark:bg-zinc-700"></div>
            <ImageIcon className="w-5 h-5 text-gray-400 dark:text-zinc-500" />
            <div className="w-16 h-[1px] bg-gray-300 dark:bg-zinc-700"></div>
          </div>
          <p className="text-sm md:text-base text-[var(--foreground)]/80 font-sans leading-relaxed text-justified-elegant text-center max-w-2xl mx-auto">
            Registros inesquecíveis da nossa caminhada, amizade e cumplicidade ao longo dos anos.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_IMAGES.map((img, index) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              onClick={() => setSelectedIndex(index)}
              className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer border border-gray-200 dark:border-zinc-800 shadow-md bg-zinc-900"
            >
              <img
                src={img.src}
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                <h3 className="font-serif text-lg font-medium text-white mb-0.5">{img.title}</h3>
                <p className="text-xs text-gray-300 font-sans">{img.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-6 right-6 text-white/80 hover:text-white p-2 rounded-full bg-white/10 backdrop-blur-md cursor-pointer"
            >
              <X size={24} />
            </button>

            <button
              onClick={handlePrev}
              className="absolute left-6 text-white/80 hover:text-white p-3 rounded-full bg-white/10 backdrop-blur-md cursor-pointer"
            >
              <ChevronLeft size={28} />
            </button>

            <div className="max-w-4xl max-h-[85vh] flex flex-col items-center text-center">
              <img
                src={GALLERY_IMAGES[selectedIndex].src}
                alt={GALLERY_IMAGES[selectedIndex].title}
                className="max-w-full max-h-[70vh] object-contain rounded-xl shadow-2xl border border-white/10"
              />
              <p className="text-white font-serif text-xl mt-4 font-medium">
                {GALLERY_IMAGES[selectedIndex].title}
              </p>
              <p className="text-gray-300 font-sans text-sm mt-1">
                {GALLERY_IMAGES[selectedIndex].subtitle}
              </p>
            </div>

            <button
              onClick={handleNext}
              className="absolute right-6 text-white/80 hover:text-white p-3 rounded-full bg-white/10 backdrop-blur-md cursor-pointer"
            >
              <ChevronRight size={28} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
