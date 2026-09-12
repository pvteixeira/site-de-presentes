'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  highlight?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Início', href: '#inicio' },
  { label: 'Os Noivos', href: '#os-noivos' },
  { label: 'História', href: '#historia' },
  { label: 'Local', href: '#o-grande-dia' },
  { label: 'Confirmar Presença', href: '#confirmar-presenca', highlight: true },
  { label: 'Mensagens', href: '#mensagens-noivos' },
  { label: 'Lista de Presentes', href: '#lista-presentes' },
  { label: 'Galeria', href: '#galeria' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasRsvp, setHasRsvp] = useState(false);

  useEffect(() => {
    setHasRsvp(Boolean(document.getElementById('confirmar-presenca')));
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = NAV_ITEMS.filter(item => item.href !== '#confirmar-presenca' || hasRsvp);

  // Previne scroll no body quando menu mobile está aberto
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md shadow-xs border-b border-gray-200/70 dark:border-zinc-800/70 py-2.5'
            : 'bg-white/40 dark:bg-zinc-950/40 backdrop-blur-xs py-3.5 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-end xl:justify-center relative">
          {/* Desktop Navigation Links (Centralizados) */}
          <nav className="hidden xl:flex items-center justify-center gap-7">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`text-xs font-sans font-medium uppercase tracking-wider transition-colors cursor-pointer ${
                  item.highlight
                    ? 'text-emerald-600 dark:text-emerald-400 font-semibold hover:text-emerald-700'
                    : 'text-[var(--foreground)]/70 hover:text-[var(--foreground)]'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 xl:absolute xl:right-6">
            {/* Direct Padrinhos Button (Desktop & Tablet) */}
            <Link
              href="/padrinhos"
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-slate-200 via-gray-200 to-slate-300 dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-800 hover:from-slate-300 hover:to-slate-400 text-slate-900 dark:text-slate-100 transition-all hover:scale-105 shadow-xs text-xs font-medium tracking-wide border border-slate-300 dark:border-zinc-600"
            >
              <Sparkles size={14} className="text-slate-600 dark:text-slate-300 shrink-0" />
              <span className="hidden sm:inline">Padrinhos e Madrinhas</span>
              <span className="sm:hidden text-[11px]">Padrinhos</span>
            </Link>

            {/* Mobile / Tablet Menu Button (touch target min 44x44) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white/90 dark:bg-zinc-900/90 border border-gray-200 dark:border-zinc-700 text-[var(--foreground)] hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer shadow-xs"
              aria-label={mobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs xl:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-xs bg-white dark:bg-zinc-950 border-l border-gray-200 dark:border-zinc-800 shadow-2xl p-6 flex flex-col space-y-6 overflow-y-auto xl:hidden"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                  <img
                    src="/img/LOGO_MARCA.png"
                    alt="Logo Aline e Klécio"
                    className="w-7 h-7 rounded-full border border-gray-200 dark:border-zinc-700 object-contain"
                  />
                  <span className="font-signature text-2xl text-[var(--foreground)]">Aline e Klécio</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-400 hover:text-[var(--foreground)] hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col space-y-1">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-sans font-medium transition-all cursor-pointer ${
                      item.highlight
                        ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 font-semibold border border-emerald-200 dark:border-emerald-800/40'
                        : 'text-[var(--foreground)] hover:bg-gray-50 dark:hover:bg-zinc-900'
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.highlight && (
                      <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-emerald-600 text-white">
                        Confirmar
                      </span>
                    )}
                  </a>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
