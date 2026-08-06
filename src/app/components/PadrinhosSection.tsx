'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Clock, 
  Shirt, 
  Sparkles, 
  Camera, 
  CheckCircle2, 
  Lock, 
  Heart,
  Users,
  AlertTriangle
} from 'lucide-react';

export default function PadrinhosSection() {
  return (
    <section id="padrinhos-madrinhas" className="py-24 bg-[var(--background)] border-t border-gray-200 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-900 text-xs uppercase tracking-widest text-[var(--foreground)] font-semibold">
            <Users size={14} className="text-gray-400" /> Nossos Padrinhos e Madrinhas
          </div>
          <h2 className="text-3xl md:text-5xl font-serif text-[var(--foreground)] font-medium">
            Padrinhos e Madrinhas
          </h2>
          <div className="w-16 h-[1px] bg-gray-300 dark:bg-zinc-700 mx-auto"></div>
          <p className="text-sm md:text-base text-[var(--foreground)]/80 font-sans leading-relaxed text-justified-elegant text-center max-w-2xl mx-auto">
            Vocês foram escolhidos a dedo para testemunhar e abençoar nosso amor. Preparamos este guia completo com todas as orientações para o nosso grande dia!
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Card 1: Horário de Chegada */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between hover:border-gray-400 transition-colors"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-zinc-800 text-[var(--foreground)] flex items-center justify-center mb-6 border border-gray-200 dark:border-zinc-700">
                <Clock size={24} />
              </div>
              <span className="text-xs uppercase tracking-wider font-semibold text-gray-400 block mb-1">Pontualidade no Altar</span>
              <h3 className="text-xl font-serif text-[var(--foreground)] font-medium mb-3">Horário de Chegada</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 font-sans leading-relaxed text-justified-elegant">
                Pedimos a gentileza de chegar às <strong className="text-[var(--foreground)]">18:00h</strong> (30 minutos antes do início da cerimônia). Isso permite a organização do cortejo com a cerimonialista e os alinhamentos iniciais com tranquilidade.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-zinc-800 text-xs font-mono text-gray-400">
              📍 Local: Igreja do Bom Jesus do Bonfim, Olinda
            </div>
          </motion.div>

          {/* Card 2: Dress Code Madrinhas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between hover:border-gray-400 transition-colors"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-zinc-800 text-[var(--foreground)] flex items-center justify-center mb-6 border border-gray-200 dark:border-zinc-700">
                <Shirt size={24} />
              </div>
              <span className="text-xs uppercase tracking-wider font-semibold text-gray-400 block mb-1">Traje das Madrinhas</span>
              <h3 className="text-xl font-serif text-[var(--foreground)] font-medium mb-3">Vestidos Longos</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 font-sans leading-relaxed text-justified-elegant">
                Vestidos estritamente <strong className="text-[var(--foreground)]">LONGOS</strong> e elegantes. A paleta de cores é totalmente livre para sua escolha. Apenas pedimos que evitem tons brancos ou off-white.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-zinc-800 text-xs text-red-600 dark:text-red-400 font-medium flex items-center gap-1.5">
              <AlertTriangle size={14} /> Proibido Branco e Off-White
            </div>
          </motion.div>

          {/* Card 3: Dress Code Padrinhos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between hover:border-gray-400 transition-colors"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-zinc-800 text-[var(--foreground)] flex items-center justify-center mb-6 border border-gray-200 dark:border-zinc-700">
                <Sparkles size={24} />
              </div>
              <span className="text-xs uppercase tracking-wider font-semibold text-gray-400 block mb-1">Traje dos Padrinhos</span>
              <h3 className="text-xl font-serif text-[var(--foreground)] font-medium mb-3">Terno Preto Clássico</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 font-sans leading-relaxed text-justified-elegant">
                Terno completo <strong className="text-[var(--foreground)]">PRETO</strong> (paletó e calça), camisa social branca e sapato preto. A gravata deve harmonizar com a cor do vestido da sua madrinha/par.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-zinc-800 text-xs text-gray-500 font-sans">
              👔 Gravata combinando com a Madrinha
            </div>
          </motion.div>

          {/* Card 4: Orientações para a Cerimônia */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between hover:border-gray-400 transition-colors"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-zinc-800 text-[var(--foreground)] flex items-center justify-center mb-6 border border-gray-200 dark:border-zinc-700">
                <Heart size={24} />
              </div>
              <span className="text-xs uppercase tracking-wider font-semibold text-gray-400 block mb-1">Cortejo Solene</span>
              <h3 className="text-xl font-serif text-[var(--foreground)] font-medium mb-3">Orientações de Entrada</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 font-sans leading-relaxed text-justified-elegant">
                Entrada em pares com caminhada pausada, postura elegante e sorrisos abertos. No altar, permaneçam atentos à cerimônia e ao carinho dos noivos.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-zinc-800 text-xs text-gray-500 font-sans">
              ✨ Cerimonialista orientará cada casal
            </div>
          </motion.div>

          {/* Card 5: Fotos Oficiais */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between hover:border-gray-400 transition-colors"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-zinc-800 text-[var(--foreground)] flex items-center justify-center mb-6 border border-gray-200 dark:border-zinc-700">
                <Camera size={24} />
              </div>
              <span className="text-xs uppercase tracking-wider font-semibold text-gray-400 block mb-1">Registros Inesquecíveis</span>
              <h3 className="text-xl font-serif text-[var(--foreground)] font-medium mb-3">Sessão de Fotos</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 font-sans leading-relaxed text-justified-elegant">
                Logo após o encerramento da bênção, realizaremos a sessão oficial de fotos com cada casal de padrinhos no altar e backdrop. Aguardem a chamada da equipe de fotografia.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-zinc-800 text-xs text-gray-500 font-sans">
              📸 Fotos individuais e em grupo
            </div>
          </motion.div>

          {/* Card 6: Recomendações Importantes & Acesso VIP */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-white p-8 rounded-2xl border border-zinc-800 shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-white/10 text-white flex items-center justify-center mb-6 border border-white/20">
                <Lock size={24} />
              </div>
              <span className="text-xs uppercase tracking-wider font-semibold text-gray-400 block mb-1">Área Restrita</span>
              <h3 className="text-xl font-serif text-white font-medium mb-3">Portal VIP do Padrinho</h3>
              <p className="text-sm text-gray-300 font-sans leading-relaxed text-justified-elegant mb-4">
                Acessem seu portal exclusivo com login e senha fornecidos para consultar recados dos noivos, detalhes do cronograma e enviar mensagens diretas.
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-zinc-800">
              <Link
                href="/padrinhos"
                className="w-full inline-flex items-center justify-center gap-2 bg-white text-black py-3 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-gray-100 transition-all shadow-sm cursor-pointer border border-gray-300"
              >
                <Lock size={14} /> Entrar na Área dos Padrinhos
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
