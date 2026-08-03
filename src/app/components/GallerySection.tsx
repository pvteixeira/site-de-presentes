'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, X, ChevronLeft, ChevronRight } from 'lucide-react';

const GALLERY_IMAGES = [
  { id: 1, src: '/img/1.jpg', title: 'Momentos Especiais' },
  { id: 2, src: '/img/2.jpg', title: 'Sorrisos e Cúmplices' },
  { id: 3, src: '/img/3.jpg', title: 'Aline e Klécio' },
  { id: 4, src: '/img/4.jpg', title: 'História de Amor' },
  { id: 5, src: '/img/5.jpg', title: 'Ensaio Pré-Wedding' },
  { id: 6, src: '/img/6.jpg', title: 'Caminho até o Altar' },
  { id: 7, src: '/img/7.jpg', title: 'Gratos a Deus' },
  { id: 8, src: '/img/8.jpg', title: 'Amor Infinito' },
  { id: 9, src: '/img/9.jpg', title: 'Nossa Jornada' },
  { id: 10, src: '/img/10.jpg', title: 'Rumo a 2027' },
  { id: 11, src: '/img/11.jpg', title: 'Felicidade Compartilhada' },
  { id: 12, src: '/img/12.jpg', title: 'Sempre Juntos' },
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs uppercase tracking-widest text-[var(--foreground)] font-semibold shadow-sm">
            <ImageIcon size={14} className="text-gray-400" /> Nossas Memórias
          </div>
          <h2 className="text-3xl md:text-5xl font-serif text-[var(--foreground)] font-medium">
            Galeria de Fotos
          </h2>
          <div className="w-16 h-[1px] bg-gray-300 dark:bg-zinc-700 mx-auto"></div>
          <p className="text-sm md:text-base text-[var(--foreground)]/80 font-sans leading-relaxed text-justified-elegant text-center max-w-2xl mx-auto">
            Registros inesquecíveis da nossa caminhada, amizade e cumplicidade ao longo dos anos.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {GALLERY_IMAGES.map((img, index) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              onClick={() => setSelectedIndex(index)}
              className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer border border-gray-200 dark:border-zinc-800 shadow-sm bg-zinc-900"
            >
              <img
                src={img.src}
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-xs font-serif text-white font-medium">{img.title}</span>
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

            <div className="max-w-4xl max-h-[85vh] flex flex-col items-center">
              <img
                src={GALLERY_IMAGES[selectedIndex].src}
                alt={GALLERY_IMAGES[selectedIndex].title}
                className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl border border-white/10"
              />
              <p className="text-white font-serif text-lg mt-4 font-medium">
                {GALLERY_IMAGES[selectedIndex].title}
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
