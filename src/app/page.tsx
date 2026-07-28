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
        <Link href="/" className="flex items-center gap-3 group">
          <img 
            src="/LOGO_MARCA.jpg" 
            alt="Logo Marca Aline e Klécio" 
            className="w-10 h-10 object-cover rounded-full border border-white/40 shadow-md group-hover:scale-105 transition-transform" 
          />
          <span className="font-serif text-white font-semibold text-lg md:text-xl drop-shadow-md tracking-wide">
            Aline & Klécio
          </span>
        </Link>

        <Link
          href="/padrinhos"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/40 text-white text-xs md:text-sm font-medium tracking-wide transition-all hover:scale-105 shadow-lg"
        >
          <Sparkles size={16} className="text-gray-200" />
          <span>Área dos Padrinhos</span>
        </Link>
      </header>

      <Hero />
      <Countdown />
      
      {/* History Section */}
      <section id="historia" className="bg-[var(--color-wedding-beige)] py-24 dark:bg-zinc-900/60 text-center px-4 border-y border-gray-200 dark:border-zinc-800">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex flex-col items-center gap-3">
            <img 
              src="/LOGO_MARCA.jpg" 
              alt="Monograma Aline & Klécio" 
              className="w-20 h-20 object-cover rounded-full border border-gray-300 dark:border-zinc-700 shadow-md mb-2" 
            />
            <h2 className="text-3xl md:text-5xl font-serif text-[var(--foreground)] font-medium tracking-tight">
              Nossa História
            </h2>
            <div className="w-16 h-[1px] bg-black dark:bg-white opacity-30"></div>
          </div>

          <div className="space-y-6 text-left max-w-3xl mx-auto text-base md:text-lg text-[var(--foreground)]/80 font-sans leading-relaxed">
            <p className="font-serif text-xl md:text-2xl text-center font-medium italic text-[var(--foreground)]">
              Algumas histórias começam de forma inesperada!
            </p>

            <blockquote className="my-6 p-4 md:p-6 bg-white dark:bg-zinc-800/80 rounded-2xl border-l-4 border-black dark:border-white shadow-sm italic text-center text-lg md:text-xl font-serif text-[var(--foreground)]">
              "Você sabe com quem está falando?"
            </blockquote>

            <p>
              Só sabe o significado desta frase quem vivenciou o momento, pois essa é a nossa história. Tudo começou numa festa, no dia 24 de dezembro de 2016. Naquele momento, não imaginávamos que aquele encontro tão inesperado e surpreendente, poderia influenciar de maneira a modificar completamente o rumo das nossas vidas.
            </p>

            <p>
              Alguns meses se passaram e, entre conversas, risadas e a vontade de prolongar cada instante juntos, nasceu uma conexão que crescia a cada dia.
            </p>

            <p>
              Com o tempo, vivemos e vivenciamos momentos que nos fortaleceram e também nos ensinaram que a vida não é um conto de fadas, e sim inúmeros momentos de realidade. Superamos desafios, celebramos conquistas. Percebemos com certeza que tudo dependeria e depende do que gostaríamos de construir conjuntamente, ou seja, uma história lado a lado. Aprendemos que o amor se fortalece nos pequenos gestos do dia a dia.
            </p>

            <p>
              Nossa vida é marcada por cumplicidade, respeito, parceria, amor e muita diversão, porque acreditamos que a vida a dois deve ser vivida com intensidade.
            </p>

            <p>
              Agora, chegou o grande momento: compartilhar com vocês o capítulo mais especial da nossa história. Tudo aconteceu no tempo que Deus preparou para nós.
            </p>

            <p>
              Estamos muito felizes por celebrar e dividir este dia tão especial com as pessoas que fazem parte da nossa caminhada e que, de alguma forma, contribuíram para que chegássemos até aqui.
            </p>

            <div className="pt-4 text-center space-y-4">
              <p className="font-serif text-xl font-semibold text-[var(--foreground)]">
                Sejam muito bem-vindos ao nosso grande dia!
              </p>
              <p>
                Esperamos que cada abraço, cada sorriso e cada momento vivido nesta celebração fique guardado para sempre em nossos corações, assim como cada um de vocês faz parte da nossa história.
              </p>
              <p className="font-serif text-xl font-medium pt-2">Obrigado!</p>
              <div className="pt-4 font-serif text-2xl text-[var(--foreground)] italic font-semibold">
                Com amor e carinho,<br />
                <span className="text-2xl not-italic tracking-wide block mt-2">Aline e Klecio</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WeddingDetails />

      {/* Special Padrinhos Banner Section */}
      <section className="bg-zinc-900 text-white py-16 px-4 border-y border-zinc-800 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-4 relative z-10">
          <span className="w-12 h-12 bg-white/10 text-white rounded-2xl flex items-center justify-center mx-auto border border-white/20 shadow-md">
            <Heart size={24} />
          </span>
          <h2 className="text-3xl font-serif text-white">É Padrinho, Madrinha ou Daminha?</h2>
          <p className="text-gray-300 font-sans max-w-xl mx-auto text-sm md:text-base">
            Preparamos um portal exclusivo para você consultar todas as regras do traje, fotos de exemplo, harmonização e avisos importantes dos noivos.
          </p>
          <div className="pt-2">
            <Link
              href="/padrinhos"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-all hover:scale-105 shadow-xl uppercase tracking-wider text-xs"
            >
              <Sparkles size={18} /> Entrar na Área dos Padrinhos
            </Link>
          </div>
        </div>
      </section>

      <CoupleCards />

      <GiftList />
      
      <footer className="bg-black text-white py-16 text-center space-y-6 border-t border-zinc-800">
        <div className="flex justify-center items-center gap-3">
          <img 
            src="/LOGO_MARCA.jpg" 
            alt="Logo Marca Aline e Klécio" 
            className="w-12 h-12 object-cover rounded-full border border-white/30 shadow-lg" 
          />
          <p className="font-serif text-2xl tracking-wide text-white">Aline & Klécio</p>
        </div>
        <div className="flex justify-center gap-6 text-xs text-gray-400">
          <Link href="/" className="hover:text-white transition-colors">Início</Link>
          <Link href="/padrinhos" className="hover:text-white transition-colors">Área dos Padrinhos</Link>
          <Link href="/admin/login" className="hover:text-white transition-colors">Noivos (Admin)</Link>
        </div>
        <p className="text-xs text-gray-500 font-sans tracking-widest uppercase">Com amor, 2027</p>
      </footer>
    </main>
  );
}
