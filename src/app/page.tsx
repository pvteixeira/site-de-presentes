import Hero from "./components/Hero";
import Countdown from "./components/Countdown";
import GiftList from "./components/GiftList";
import WeddingDetails from "./components/WeddingDetails";
import CoupleCards from "./components/CoupleCards";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <Hero />
      <Countdown />
      
      <div className="bg-[var(--color-wedding-beige)] py-24 dark:bg-[var(--color-wedding-beige)]/5 text-center px-4">
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
      <CoupleCards />

      <GiftList />
      
      <footer className="bg-[var(--foreground)] text-[var(--background)] py-12 text-center">
        <p className="font-serif text-2xl mb-4 text-[var(--color-wedding-gold)]">Aline & Klécio</p>
        <p className="text-sm opacity-60 font-sans tracking-widest uppercase">Com amor, 2027</p>
      </footer>
    </main>
  );
}
