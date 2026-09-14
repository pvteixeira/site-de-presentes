'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, X, ChevronLeft, ChevronRight, Heart, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

interface GalleryImage {
  id: number;
  src: string;
  title: string;
  subtitle: string;
  category: 'casal' | 'infancia';
  objectPosition?: string;
}

const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 1,
    src: '/img/Galeria/01.jpg',
    title: '1 aninho de Klécio',
    subtitle: 'Primeiro aniversário do noivo',
    category: 'infancia',
    objectPosition: 'object-center'
  },
  {
    id: 2,
    src: '/img/Galeria/02.jpg',
    title: '1 aninho de Aline',
    subtitle: 'Primeiros sorrisos da noiva',
    category: 'infancia',
    objectPosition: 'object-center'
  },
  {
    id: 3,
    src: '/img/Galeria/03.jpg',
    title: 'Momento Especial',
    subtitle: 'Mais um capítulo da nossa história',
    category: 'casal',
    objectPosition: 'object-top'
  },
  {
    id: 4,
    src: '/img/Galeria/04.jpg',
    title: 'Celebração de Ano Novo',
    subtitle: 'Brindando ao nosso futuro juntos',
    category: 'casal',
    objectPosition: 'object-top'
  },
  {
    id: 5,
    src: '/img/Galeria/05.jpeg',
    title: 'Elegância e Celebração',
    subtitle: 'Par perfeito prontos para comemorar',
    category: 'casal',
    objectPosition: 'object-top'
  },
  {
    id: 6,
    src: '/img/Galeria/06.jpg',
    title: 'Passeio em Gravatá',
    subtitle: 'Viagens e momentos de lazer',
    category: 'casal',
    objectPosition: 'object-top'
  },
  {
    id: 7,
    src: '/img/Galeria/07.jpg',
    title: 'Passeio no Estádio',
    subtitle: 'Momentos inesquecíveis a dois',
    category: 'casal',
    objectPosition: 'object-center'
  },
  {
    id: 8,
    src: '/img/Galeria/08.jpeg',
    title: 'Ensaio na Floresta',
    subtitle: 'Conexão e leveza em meio à natureza',
    category: 'casal',
    objectPosition: 'object-top'
  },
  {
    id: 9,
    src: '/img/Galeria/09.jpeg',
    title: 'Registros de Viagem',
    subtitle: 'Colecionando memórias pelo mundo',
    category: 'casal',
    objectPosition: 'object-center'
  },
  {
    id: 10,
    src: '/img/Galeria/10.jpeg',
    title: 'Romance sob a Chuva',
    subtitle: 'Amor e cumplicidade em todo clima',
    category: 'casal',
    objectPosition: 'object-top'
  },
  {
    id: 12,
    src: '/img/Galeria/12.jpg',
    title: 'Dia de Praia',
    subtitle: 'Aproveitando o sol e o mar juntos',
    category: 'casal',
    objectPosition: 'object-center'
  },
  {
    id: 13,
    src: '/img/Galeria/13.jpg',
    title: 'Viagem Inesquecível',
    subtitle: 'Novos destinos e boas risadas',
    category: 'casal',
    objectPosition: 'object-top'
  },
  {
    id: 14,
    src: '/img/Galeria/14.jpg',
    title: 'Sintonia e Festa',
    subtitle: 'Celebrando momentos felizes juntos',
    category: 'casal',
    objectPosition: 'object-top'
  },
  {
    id: 15,
    src: '/img/Galeria/15.jpg',
    title: 'Aventura a Dois',
    subtitle: 'Passeio de quadriciclo na praia',
    category: 'casal',
    objectPosition: 'object-center'
  },
  {
    id: 16,
    src: '/img/Galeria/16.jpg',
    title: 'Carnaval em Olinda',
    subtitle: 'Alegria e festa juntos no Camarote',
    category: 'casal',
    objectPosition: 'object-top'
  },
  {
    id: 11,
    src: '/img/Galeria/11.jpeg',
    title: 'Passeio Histórico',
    subtitle: 'Descobrindo novos lugares juntos',
    category: 'casal',
    objectPosition: 'object-center'
  },
];

const CATEGORIES = [
  { id: 'todas', label: 'Todas as Fotos', icon: ImageIcon },
  { id: 'casal', label: 'O Casal', icon: Heart },
  { id: 'infancia', label: 'Nossa Infância', icon: Sparkles },
] as const;

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 250 : -250,
    opacity: 0,
    scale: 0.95
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: 'spring' as const, stiffness: 320, damping: 30 },
      opacity: { duration: 0.2 }
    }
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -250 : 250,
    opacity: 0,
    scale: 0.95,
    transition: {
      x: { type: 'spring' as const, stiffness: 320, damping: 30 },
      opacity: { duration: 0.15 }
    }
  })
};

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<'todas' | 'casal' | 'infancia'>('todas');
  const [visibleCount, setVisibleCount] = useState<number>(6);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [lightboxDirection, setLightboxDirection] = useState<number>(1);
  const [activeMobileIndex, setActiveMobileIndex] = useState<number>(0);

  const carouselRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const filteredImages = activeCategory === 'todas'
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter(img => img.category === activeCategory);

  const displayedImages = filteredImages.slice(0, visibleCount);
  const hasMore = visibleCount < filteredImages.length;

  const handlePrev = () => {
    if (selectedIndex === null || filteredImages.length === 0) return;
    setLightboxDirection(-1);
    setSelectedIndex((selectedIndex - 1 + filteredImages.length) % filteredImages.length);
  };

  const handleNext = () => {
    if (selectedIndex === null || filteredImages.length === 0) return;
    setLightboxDirection(1);
    setSelectedIndex((selectedIndex + 1) % filteredImages.length);
  };

  // Keyboard navigation for Lightbox modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'Escape') {
        setSelectedIndex(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, filteredImages.length]);

  // Reset mobile carousel to beginning when category changes
  const handleCategoryChange = (cat: 'todas' | 'casal' | 'infancia') => {
    setActiveCategory(cat);
    setVisibleCount(6);
    setSelectedIndex(null);
    setActiveMobileIndex(0);
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  // Track mobile carousel scroll position
  const handleMobileScroll = () => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const scrollLeft = container.scrollLeft;
    const itemWidth = container.clientWidth * 0.82;
    const newIndex = Math.round(scrollLeft / (itemWidth + 16));
    if (newIndex >= 0 && newIndex < filteredImages.length) {
      setActiveMobileIndex(newIndex);
    }
  };

  const scrollToMobileIndex = (index: number) => {
    if (!carouselRef.current) return;
    const clampedIndex = Math.max(0, Math.min(index, filteredImages.length - 1));
    const container = carouselRef.current;
    const items = container.querySelectorAll<HTMLElement>('[data-carousel-item]');
    if (items[clampedIndex]) {
      items[clampedIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      setActiveMobileIndex(clampedIndex);
    }
  };

  // Mobile modal touch gesture handlers
  const handleModalTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleModalTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const currentEndX = e.changedTouches[0].clientX;
    const currentEndY = e.changedTouches[0].clientY;
    const diffX = touchStartX.current - currentEndX;
    const diffY = touchStartY.current - currentEndY;

    // Primarily horizontal swipe with minimum threshold of 35px
    if (Math.abs(diffX) > 35 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        handleNext(); // Arrasta para a esquerda -> avança para a próxima foto
      } else {
        handlePrev(); // Arrasta para a direita -> volta para a foto anterior
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <section id="galeria" className="py-24 bg-gray-50/50 dark:bg-zinc-900/40 border-t border-gray-200 dark:border-zinc-800 overflow-hidden">
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
        </motion.div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id as typeof activeCategory)}
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

        {/* 1. VERSÃO CELULAR: Carrossel com passar de dedo suave, setas e indicador de bolinhas */}
        <div className="sm:hidden relative">
          {/* Botão Seta Esquerda Mobile */}
          {activeMobileIndex > 0 && (
            <button
              onClick={() => scrollToMobileIndex(activeMobileIndex - 1)}
              className="absolute left-1 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/90 dark:bg-zinc-900/90 text-gray-800 dark:text-white flex items-center justify-center shadow-lg border border-gray-200 dark:border-zinc-700 backdrop-blur-sm cursor-pointer active:scale-95 transition-transform"
              aria-label="Foto anterior"
            >
              <ChevronLeft size={20} />
            </button>
          )}

          {/* Botão Seta Direita Mobile */}
          {activeMobileIndex < filteredImages.length - 1 && (
            <button
              onClick={() => scrollToMobileIndex(activeMobileIndex + 1)}
              className="absolute right-1 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/90 dark:bg-zinc-900/90 text-gray-800 dark:text-white flex items-center justify-center shadow-lg border border-gray-200 dark:border-zinc-700 backdrop-blur-sm cursor-pointer active:scale-95 transition-transform"
              aria-label="Próxima foto"
            >
              <ChevronRight size={20} />
            </button>
          )}

          {/* Trilho Deslizável com o Dedo no Celular */}
          <div
            ref={carouselRef}
            onScroll={handleMobileScroll}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none px-4 py-2 -mx-4"
          >
            {filteredImages.map((img, index) => (
              <div
                key={img.id}
                data-carousel-item
                onClick={() => {
                  setSelectedIndex(index);
                  setLightboxDirection(1);
                }}
                className="w-[82vw] max-w-[320px] snap-center shrink-0 group relative h-[360px] rounded-2xl overflow-hidden cursor-pointer border border-gray-200 dark:border-zinc-800 shadow-md bg-zinc-900 active:scale-[0.98] transition-transform"
              >
                <Image
                  src={img.src}
                  alt={`Foto ${img.id}`}
                  fill
                  sizes="85vw"
                  quality={85}
                  priority={index < 2}
                  className={`object-cover ${img.objectPosition || 'object-top'}`}
                />
              </div>
            ))}
          </div>

          {/* Indicador de Swipe e Bolinhas de Paginação no Celular */}
          <div className="mt-4 flex flex-col items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 font-sans">
              <span>👉 Deslize com o dedo para passar as fotos</span>
              <span className="px-2 py-0.5 rounded-full bg-gray-200 dark:bg-zinc-800 text-[11px] font-mono font-semibold text-gray-700 dark:text-gray-300">
                {activeMobileIndex + 1} / {filteredImages.length}
              </span>
            </div>

            {/* Linha de Bolinhas (Dots) */}
            <div className="flex items-center justify-center gap-1.5 max-w-full overflow-x-auto py-1 px-2 hide-scrollbar">
              {filteredImages.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => scrollToMobileIndex(dotIdx)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    dotIdx === activeMobileIndex
                      ? 'w-6 h-2 bg-black dark:bg-white'
                      : 'w-2 h-2 bg-gray-300 dark:bg-zinc-700 hover:bg-gray-400'
                  }`}
                  aria-label={`Ir para foto ${dotIdx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 2. VERSÃO DESKTOP: Grid clássico com botão Ver Mais */}
        <div className="hidden sm:block">
          <motion.div
            layout
            className="grid grid-cols-2 lg:grid-cols-3 gap-6"
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
                  onClick={() => {
                    const realIndex = filteredImages.findIndex(f => f.id === img.id);
                    setSelectedIndex(realIndex !== -1 ? realIndex : index);
                    setLightboxDirection(1);
                  }}
                  className="group relative h-[380px] md:h-[420px] rounded-2xl overflow-hidden cursor-pointer border border-gray-200 dark:border-zinc-800 shadow-md bg-zinc-900"
                >
                  <Image
                    src={img.src}
                    alt={`Foto ${img.id}`}
                    fill
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    quality={85}
                    priority={index < 6}
                    loading={index < 6 ? 'eager' : 'lazy'}
                    className={`object-cover ${img.objectPosition || 'object-top'} transition-transform duration-700 group-hover:scale-105`}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Ver Mais / Ver Menos Button (Desktop) */}
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

      </div>

      {/* 3. LIGHTBOX FULLSCREEN: Com suporte a deslizar com o dedo (touch swipe) no celular */}
      <AnimatePresence>
        {selectedIndex !== null && filteredImages[selectedIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onTouchStart={handleModalTouchStart}
            onTouchEnd={handleModalTouchEnd}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 select-none touch-pan-y"
          >
            {/* Botão Fechar */}
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/80 hover:text-white p-2 sm:p-2.5 rounded-full bg-white/10 backdrop-blur-md cursor-pointer z-30"
              aria-label="Fechar"
            >
              <X size={20} className="sm:w-6 sm:h-6" />
            </button>

            {/* Setas de navegação */}
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-4 md:left-6 text-white/80 hover:text-white p-2 sm:p-3 rounded-full bg-white/10 backdrop-blur-md cursor-pointer z-30"
              aria-label="Foto anterior"
            >
              <ChevronLeft size={22} className="sm:w-7 sm:h-7" />
            </button>

            {/* Container da Imagem com Animação Direcional e Arrastar com Dedo */}
            <div className="w-full max-w-4xl flex flex-col items-center text-center px-8 sm:px-12 my-auto">
              <AnimatePresence initial={false} custom={lightboxDirection} mode="wait">
                <motion.div
                  key={selectedIndex}
                  custom={lightboxDirection}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.4}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -40 || info.velocity.x < -300) {
                      handleNext();
                    } else if (info.offset.x > 40 || info.velocity.x > 300) {
                      handlePrev();
                    }
                  }}
                  className="relative w-full h-[65vh] sm:h-[75vh] md:h-[80vh] flex items-center justify-center cursor-grab active:cursor-grabbing touch-pan-y"
                >
                  <Image
                    src={filteredImages[selectedIndex].src}
                    alt={`Foto ${filteredImages[selectedIndex].id}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 1200px"
                    quality={90}
                    priority
                    className="object-contain rounded-xl shadow-2xl pointer-events-none select-none"
                  />
                </motion.div>
              </AnimatePresence>
              <p className="text-gray-400 font-mono text-xs mt-3">
                {selectedIndex + 1} de {filteredImages.length}
              </p>
            </div>

            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-4 md:right-6 text-white/80 hover:text-white p-2 sm:p-3 rounded-full bg-white/10 backdrop-blur-md cursor-pointer z-30"
              aria-label="Próxima foto"
            >
              <ChevronRight size={22} className="sm:w-7 sm:h-7" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}

