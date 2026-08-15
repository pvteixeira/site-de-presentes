'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, X, ChevronLeft, ChevronRight, Heart, Sparkles, Users, ChevronDown, ChevronUp } from 'lucide-react';

interface GalleryImage {
  id: number;
  src: string;
  title: string;
  subtitle: string;
  category: 'casal' | 'infancia' | 'familia';
  objectPosition?: string;
}

const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 1,
    src: '/img/Galeria/ALINEEKLECIOCHUVA.jpeg',
    title: 'Romance sob a Chuva',
    subtitle: 'Amor e cumplicidade em todo clima',
    category: 'casal',
    objectPosition: 'object-top'
  },
  {
    id: 2,
    src: '/img/Galeria/ALINEEKLECIOFLORESTA.jpeg',
    title: 'Ensaio na Floresta',
    subtitle: 'Conexão e leveza em meio à natureza',
    category: 'casal',
    objectPosition: 'object-top'
  },
  {
    id: 3,
    src: '/img/Galeria/ALINEEKLECIOFORMAL.jpeg',
    title: 'Elegância e Celebração',
    subtitle: 'Par perfeito prontos para comemorar',
    category: 'casal',
    objectPosition: 'object-top'
  },
  {
    id: 4,
    src: '/img/Galeria/ALINEEKLECIOTORRE.jpeg',
    title: 'Registros de Viagem',
    subtitle: 'Colecionando memórias pelo mundo',
    category: 'casal',
    objectPosition: 'object-center'
  },
  {
    id: 5,
    src: '/img/Galeria/Fotos Studio.jpg',
    title: 'Ensaio em Estúdio',
    subtitle: 'Olhares e sorrisos inesquecíveis',
    category: 'casal',
    objectPosition: 'object-top'
  },
  {
    id: 6,
    src: '/img/Galeria/Gratava.jpg',
    title: 'Passeio em Gravatá',
    subtitle: 'Viagens e momentos de lazer',
    category: 'casal',
    objectPosition: 'object-top'
  },
  {
    id: 7,
    src: '/img/Galeria/Ano novo.jpg',
    title: 'Celebração de Ano Novo',
    subtitle: 'Brindando ao nosso futuro juntos',
    category: 'casal',
    objectPosition: 'object-top'
  },
  {
    id: 8,
    src: '/img/Galeria/1 foto.jpg',
    title: 'Momento Especial',
    subtitle: 'Mais um capítulo da nossa história',
    category: 'casal',
    objectPosition: 'object-top'
  },
  {
    id: 9,
    src: '/img/Galeria/Consegue melhorar essa foto_.jpg',
    title: 'Registro de Carinho',
    subtitle: 'Memórias guardadas no coração',
    category: 'casal',
    objectPosition: 'object-top'
  },
  {
    id: 10,
    src: '/img/Galeria/ALINEEKLECIOBB.jpeg',
    title: 'Aline e Klécio Pequeninos',
    subtitle: 'Nossas infâncias e os primeiros passos',
    category: 'infancia',
    objectPosition: 'object-center'
  },
  {
    id: 11,
    src: '/img/Galeria/Aline 1 ano.jpg',
    title: 'Aline 1 Aninho',
    subtitle: 'Primeiros sorrisos da noiva',
    category: 'infancia',
    objectPosition: 'object-center'
  },
  {
    id: 12,
    src: '/img/Galeria/KLECIOBB.jpeg',
    title: 'Klécio Bebê',
    subtitle: 'Infância inesquecível do noivo',
    category: 'infancia',
    objectPosition: 'object-top'
  },
  {
    id: 13,
    src: '/img/Galeria/Klecio 1 Ano foto presentes.jpg',
    title: 'Klécio 1 Aninho',
    subtitle: 'Primeiro aniversário do noivo',
    category: 'infancia',
    objectPosition: 'object-center'
  },
  {
    id: 14,
    src: '/img/Galeria/Klecio baby.jpg',
    title: 'Klécio Pequenino',
    subtitle: 'Fofura dos primeiros anos',
    category: 'infancia',
    objectPosition: 'object-center'
  },
  {
    id: 15,
    src: '/img/Galeria/Klecio rosa papel.jpg',
    title: 'Klécio na Infância',
    subtitle: 'Lembranças da infância',
    category: 'infancia',
    objectPosition: 'object-top'
  },
  {
    id: 16,
    src: '/img/Galeria/Carlos e Débora crianças.jpg',
    title: 'Carlos e Débora Crianças',
    subtitle: 'Recordações especiais da família',
    category: 'infancia',
    objectPosition: 'object-center'
  },
  {
    id: 17,
    src: '/img/Galeria/Carlos e Débora.jpg',
    title: 'Carlos e Débora',
    subtitle: 'Momentos especiais em família',
    category: 'familia',
    objectPosition: 'object-top'
  },
  {
    id: 18,
    src: '/img/Galeria/Kassio é Lu.jpg',
    title: 'Kássio e Lu',
    subtitle: 'Pessoas queridas ao nosso lado',
    category: 'familia',
    objectPosition: 'object-top'
  },
  {
    id: 19,
    src: '/img/Galeria/Mauri e Íris.jpg',
    title: 'Mauri e Íris',
    subtitle: 'Amor e inspiração para nossa união',
    category: 'familia',
    objectPosition: 'object-top'
  },
];

const CATEGORIES = [
  { id: 'todas', label: 'Todas as Fotos', icon: ImageIcon },
  { id: 'casal', label: 'O Casal', icon: Heart },
  { id: 'infancia', label: 'Nossa Infância', icon: Sparkles },
  { id: 'familia', label: 'Família & Padrinhos', icon: Users },
] as const;

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<'todas' | 'casal' | 'infancia' | 'familia'>('todas');
  const [visibleCount, setVisibleCount] = useState<number>(6);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filteredImages = activeCategory === 'todas'
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter(img => img.category === activeCategory);

  const displayedImages = filteredImages.slice(0, visibleCount);
  const hasMore = visibleCount < filteredImages.length;

  const handlePrev = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + displayedImages.length) % displayedImages.length);
  };

  const handleNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % displayedImages.length);
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
          className="text-center max-w-3xl mx-auto mb-12 space-y-4"
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
            Registros inesquecíveis da nossa caminhada, infância, família e cumplicidade ao longo dos anos.
          </p>
        </motion.div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id as typeof activeCategory);
                  setVisibleCount(6);
                  setSelectedIndex(null);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs md:text-sm font-medium transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-black dark:bg-white text-white dark:text-black shadow-md scale-105'
                    : 'bg-white dark:bg-zinc-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700 border border-gray-200 dark:border-zinc-700'
                }`}
              >
                <Icon size={16} />
                <span>{cat.label}</span>
                {cat.id !== 'todas' && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                    isActive ? 'bg-white/20 dark:bg-black/20' : 'bg-gray-100 dark:bg-zinc-700 text-gray-500 dark:text-gray-400'
                  }`}>
                    {GALLERY_IMAGES.filter(i => i.category === cat.id).length}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {displayedImages.map((img, index) => (
              <motion.div
                layout
                key={img.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedIndex(index)}
                className="group relative h-[420px] rounded-2xl overflow-hidden cursor-pointer border border-gray-200 dark:border-zinc-800 shadow-md bg-zinc-900"
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className={`w-full h-full object-cover ${img.objectPosition || 'object-top'} transition-transform duration-700 group-hover:scale-105`}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                  <h3 className="font-serif text-lg font-medium text-white mb-0.5">{img.title}</h3>
                  <p className="text-xs text-gray-300 font-sans">{img.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Ver Mais / Ver Menos Button */}
        {filteredImages.length > 6 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mt-12"
          >
            <button
              onClick={() => {
                if (hasMore) {
                  setVisibleCount(filteredImages.length);
                } else {
                  setVisibleCount(6);
                  document.getElementById('galeria')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-slate-200 via-gray-100 to-slate-200 dark:from-zinc-800 dark:via-zinc-850 dark:to-zinc-800 text-slate-800 dark:text-slate-100 font-sans text-xs md:text-sm font-semibold uppercase tracking-wider shadow-md hover:shadow-lg border border-slate-300 dark:border-zinc-700 hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <span>{hasMore ? 'Ver Mais Fotos' : 'Ver Menos Fotos'}</span>
              {hasMore ? (
                <ChevronDown size={18} className="text-gray-600 dark:text-gray-300 group-hover:translate-y-0.5 transition-transform" />
              ) : (
                <ChevronUp size={18} className="text-gray-600 dark:text-gray-300 group-hover:-translate-y-0.5 transition-transform" />
              )}
            </button>
          </motion.div>
        )}

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && filteredImages[selectedIndex] && (
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
                src={filteredImages[selectedIndex].src}
                alt={filteredImages[selectedIndex].title}
                className="max-w-full max-h-[70vh] object-contain rounded-xl shadow-2xl border border-white/10"
              />
              <p className="text-white font-serif text-xl mt-4 font-medium">
                {filteredImages[selectedIndex].title}
              </p>
              <p className="text-gray-300 font-sans text-sm mt-1">
                {filteredImages[selectedIndex].subtitle}
              </p>
              <p className="text-gray-400 font-mono text-xs mt-2">
                {selectedIndex + 1} de {filteredImages.length}
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

