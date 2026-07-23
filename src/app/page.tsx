import Link from "next/link";
import { Sparkles, Heart } from "lucide-react";
import Hero from "./components/Hero";
import Countdown from "./components/Countdown";
import GiftList from "./components/GiftList";
import WeddingDetails from "./components/WeddingDetails";
import CoupleCards from "./components/CoupleCards";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)] relative">
      {/* Top Navbar Header */}
      <header className="absolute top-0 left-0 right-0 z-30 p-4 max-w-7xl mx-auto flex justify-between items-center">
        <span className="font-serif text-white font-bold text-lg md:text-xl drop-shadow-md">
          Aline & Klécio
        </span>

        <Link
          href="/padrinhos"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/40 text-white text-xs md:text-sm font-medium tracking-wide transition-all hover:scale-105 shadow-lg"
        >
          <Sparkles size={16} className="text-[var(--color-wedding-gold)]" />
          <span>Área dos Padrinhos</span>
        </Link>
      </header>

      <Hero />
      <Countdown />
      
      <div id="historia" className="bg-[var(--color-wedding-beige)] py-24 dark:bg-[var(--color-wedding-beige)]/5 text-center px-4">
        <h2 className="text-3xl md:text-4xl font-serif text-[var(--color-wedding-gold)] mb-6">
          Nossa História
        </h2>
        <p className="max-w-3xl mx-auto text-lg text-[var(--foreground)]/80 font-sans leading-relaxed">
          Nossa história começou há alguns anos, com um encontro inesperado e uma conexão instantânea. 
          Desde então, compartilhamos sorrisos, desafios, sonhos e, acima de tudo, muito amor. 
          Agora, estamos prontos para dar o próximo grande passo em nossas vidas e construir nossa própria família. 
          E não poderíamos fazer isso sem a presença das pessoas que mais amamos!
        </p>
      </div>

      <WeddingDetails />

      {/* Special Padrinhos Banner Section */}
      <section className="bg-gradient-to-r from-[var(--color-wedding-beige)] via-white to-[var(--color-wedding-beige)] dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 py-16 px-4 border-y border-[var(--color-wedding-gold)]/20 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="w-12 h-12 bg-[var(--color-wedding-gold)]/10 text-[var(--color-wedding-gold)] rounded-2xl flex items-center justify-center mx-auto">
            <Heart size={24} />
          </span>
          <h2 className="text-3xl font-serif text-[var(--foreground)]">É Padrinho, Madrinha ou Daminha?</h2>
          <p className="text-gray-600 dark:text-gray-300 font-sans max-w-xl mx-auto text-sm md:text-base">
            Preparamos um portal exclusivo para você consultar todas as regras do traje, cores permitidas, harmonização e avisos importantes dos noivos.
          </p>
          <div className="pt-2">
            <Link
              href="/padrinhos"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[var(--color-wedding-gold)] text-white font-medium hover:bg-[var(--color-wedding-gold)]/90 transition-all hover:scale-105 shadow-lg shadow-[var(--color-wedding-gold)]/20"
            >
              <Sparkles size={18} /> Entrar na Área dos Padrinhos
            </Link>
          </div>
        </div>
      </section>

      <CoupleCards />

      <GiftList />
      
      <footer className="bg-[var(--foreground)] text-[var(--background)] py-12 text-center space-y-4">
        <p className="font-serif text-2xl text-[var(--color-wedding-gold)]">Aline & Klécio</p>
        <div className="flex justify-center gap-6 text-xs text-white/70">
          <Link href="/" className="hover:text-white transition-colors">Início</Link>
          <Link href="/padrinhos" className="hover:text-white transition-colors">Área dos Padrinhos</Link>
          <Link href="/admin/login" className="hover:text-white transition-colors">Noivos (Admin)</Link>
        </div>
        <p className="text-xs opacity-50 font-sans tracking-widest uppercase">Com amor, 2027</p>
      </footer>
    </main>
  );
}
