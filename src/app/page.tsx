import Link from "next/link";
import { Sparkles } from "lucide-react";
import Hero from "./components/Hero";
import Countdown from "./components/Countdown";
import CoupleCards from "./components/CoupleCards";
import WeddingDetails from "./components/WeddingDetails";
import GuestbookSection from "./components/GuestbookSection";
import GiftList from "./components/GiftList";
import GallerySection from "./components/GallerySection";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)] relative">
      {/* Top Navbar Header */}
      <header className="absolute top-0 left-0 right-0 z-30 p-4 max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 group">
          <img 
            src="/img/LOGO_MARCA.png"
            className="w-10 h-10 object-cover rounded-full border border-gray-300 dark:border-zinc-700 shadow-sm group-hover:scale-105 transition-transform" 
          />
          <span className="font-serif text-zinc-900 dark:text-white font-semibold text-lg md:text-xl tracking-wide">
            Aline e Klécio
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/padrinhos"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black dark:bg-white text-white dark:text-black hover:opacity-90 transition-all hover:scale-105 shadow-sm text-xs md:text-sm font-medium tracking-wide border border-gray-800 dark:border-gray-200"
          >
            <Sparkles size={16} className="text-gray-300 dark:text-gray-700" />
            <span>Acesso ao Cortejo</span>
          </Link>
        </div>
      </header>

      {/* 1. Aline e Klécio (Início) */}
      <Hero />

      {/* 2. Contagem Regressiva */}
      <Countdown />

      {/* 3. Os Noivos */}
      <CoupleCards />

      {/* 4. Nossa História */}
      <section id="historia" className="bg-[var(--background)] py-24 text-center px-4 border-t border-gray-200 dark:border-zinc-800">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="flex flex-col items-center gap-3">
            <img 
              src="/img/LOGO_MARCA.png" 
              alt="Monograma Aline e Klécio" 
              className="w-20 h-20 object-cover rounded-full border border-gray-300 dark:border-zinc-700 shadow-sm mb-2" 
            />
            <h2 className="text-3xl md:text-5xl font-serif text-[var(--foreground)] font-medium tracking-tight">
              Nossa História
            </h2>
            <div className="w-16 h-[1px] bg-gray-300 dark:bg-zinc-700"></div>
          </div>

          <div className="space-y-6 text-left max-w-2xl mx-auto text-base md:text-lg text-[var(--foreground)]/85 font-sans leading-relaxed">
            <p className="font-serif text-xl md:text-2xl text-center font-medium italic text-[var(--foreground)]">
              Algumas histórias começam de forma inesperada!
            </p>

            <blockquote className="my-8 p-6 bg-gray-50 dark:bg-zinc-900 rounded-2xl border-l-4 border-gray-400 dark:border-zinc-500 shadow-sm italic text-center text-lg md:text-xl font-serif text-[var(--foreground)]">
              "Você sabe com quem está falando?"
            </blockquote>

            <p className="text-justified-elegant">
              Só sabe o significado desta frase quem vivenciou o momento, pois essa é a nossa história. Tudo começou numa festa, no dia 24 de dezembro de 2016. Naquele momento, não imaginávamos que aquele encontro tão inesperado e surpreendente, poderia influenciar de maneira a modificar completamente o rumo das nossas vidas.
            </p>

            <p className="text-justified-elegant">
              Alguns meses se passaram e, entre conversas, risadas e a vontade de prolongar cada instante juntos, nasceu uma conexão que crescia a cada dia.
            </p>

            <p className="text-justified-elegant">
              Com o tempo, vivemos e vivenciamos momentos que nos fortaleceram e também nos ensinaram que a vida não é um conto de fadas, e sim inúmeros momentos de realidade. Superamos desafios, celebramos conquistas. Percebemos com certeza que tudo dependeria e depende do que gostaríamos de construir conjuntamente, ou seja, uma história lado a lado. Aprendemos que o amor se fortalece nos pequenos gestos do dia a dia.
            </p>

            <p className="text-justified-elegant">
              Nossa vida é marcada por cumplicidade, respeito, parceria, amor e muita diversão, porque acreditamos que a vida a dois deve ser vivida com intensidade.
            </p>

            <p className="text-justified-elegant">
              Agora, chegou o grande momento: compartilhar com vocês o capítulo mais especial da nossa história. Tudo aconteceu no tempo que Deus preparou para nós.
            </p>

            <p className="text-justified-elegant">
              Estamos muito felizes por celebrar e dividir este dia tão especial com as pessoas que fazem parte da nossa caminhada e que, de alguma forma, contribuíram para que chegássemos até aqui.
            </p>

            <div className="pt-6 text-center space-y-4">
              <p className="font-serif text-xl font-semibold text-[var(--foreground)]">
                Sejam muito bem-vindos ao nosso grande dia!
              </p>
              <p className="text-justified-elegant">
                Esperamos que cada abraço, cada sorriso e cada momento vivido nesta celebração fique guardado para sempre em nossos corações, assim como cada um de vocês faz parte da nossa história.
              </p>
              <p className="font-serif text-xl font-medium pt-2">Obrigado!</p>
              <div className="pt-4 font-serif text-2xl text-[var(--foreground)] italic font-semibold">
                Com amor e carinho,<br />
                <span className="text-2xl not-italic tracking-wide block mt-2">Aline e Klécio</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Local da Cerimônia e Recepção */}
      <WeddingDetails />

      {/* 6. Mensagens aos Noivos */}
      <GuestbookSection />

      {/* 7. Lista de Presentes */}
      <GiftList />

      {/* 8. Galeria */}
      <GallerySection />
      
      {/* 9. Rodapé */}
      <footer className="bg-zinc-950 text-white py-16 text-center space-y-6 border-t border-zinc-800">
        <div className="flex justify-center items-center gap-3">
          <img 
            src="/img/LOGO_MARCA.png" 
            alt="Logo Marca Aline e Klécio" 
            className="w-12 h-12 object-cover rounded-full border border-gray-300/40 shadow-sm" 
          />
          <p className="font-serif text-2xl tracking-wide text-white">Aline e Klécio</p>
        </div>
        <div className="flex flex-wrap justify-center gap-6 text-xs text-gray-400 px-4">
          <Link href="/" className="hover:text-white transition-colors">Início</Link>
          <Link href="#os-noivos" className="hover:text-white transition-colors">Os Noivos</Link>
          <Link href="#historia" className="hover:text-white transition-colors">Nossa História</Link>
          <Link href="#o-grande-dia" className="hover:text-white transition-colors">Local</Link>
          <Link href="#mensagens-noivos" className="hover:text-white transition-colors">Mensagens</Link>
          <Link href="#lista-presentes" className="hover:text-white transition-colors">Lista de Presentes</Link>
          <Link href="#galeria" className="hover:text-white transition-colors">Galeria</Link>
          <Link href="/padrinhos" className="hover:text-white transition-colors font-semibold text-gray-200">Acesso ao Cortejo</Link>
          <Link href="/admin/login" className="hover:text-white transition-colors">Noivos (Admin)</Link>
        </div>
        <p className="text-xs text-gray-500 font-sans tracking-widest uppercase">Com amor, 2027 • Todos os direitos reservados</p>
      </footer>
    </main>
  );
}
