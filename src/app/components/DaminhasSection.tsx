'use client';

import { motion } from 'framer-motion';
import { 
  Heart, 
  Clock, 
  Sparkles, 
  Smile, 
  HelpCircle,
  Flower2
} from 'lucide-react';

export default function DaminhasSection() {
  return (
    <section id="daminhas" className="py-24 bg-gray-50/50 dark:bg-zinc-900/40 border-t border-gray-200 dark:border-zinc-800">
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
            <Flower2 size={14} className="text-gray-400" /> Nossas Daminhas de Honra
          </div>
          <h2 className="text-3xl md:text-5xl font-serif text-[var(--foreground)] font-medium">
            Área das Daminhas
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="w-16 h-[1px] bg-gray-300 dark:bg-zinc-700"></div>
            <Flower2 className="w-5 h-5 text-gray-400 dark:text-zinc-500" />
            <div className="w-16 h-[1px] bg-gray-300 dark:bg-zinc-700"></div>
          </div>
          <p className="text-sm md:text-base text-[var(--foreground)]/80 font-sans leading-relaxed text-justified-elegant text-center max-w-2xl mx-auto">
            Um cantinho especial preparado com muito carinho para as nossas queridas <strong className="text-[var(--foreground)] font-serif italic text-lg">Luna e Julia</strong>, que encherão nosso altar de doçura, beleza e alegria!
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
              <span className="text-xs uppercase tracking-wider font-semibold text-gray-400 block mb-1">Tranquilidade e Preparação</span>
              <h3 className="text-xl font-serif text-[var(--foreground)] font-medium mb-3">Horário de Chegada</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 font-sans leading-relaxed text-justified-elegant">
                Recomendamos a chegada das daminhas às <strong className="text-[var(--foreground)]">18:00h</strong> ao local da cerimônia para vestir a roupinha com calma, ajeitar o cabelo e se acostumar com o ambiente sem correria.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-zinc-800 text-xs text-gray-400 font-sans">
              👑 Tempo para Fotos antes da Cerimônia
            </div>
          </motion.div>

          {/* Card 2: Vestimenta */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between hover:border-gray-400 transition-colors"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-zinc-800 text-[var(--foreground)] flex items-center justify-center mb-6 border border-gray-200 dark:border-zinc-700">
                <Sparkles size={24} />
              </div>
              <span className="text-xs uppercase tracking-wider font-semibold text-gray-400 block mb-1">Traje Festivo Infantil</span>
              <h3 className="text-xl font-serif text-[var(--foreground)] font-medium mb-3">Vestimenta e Sapatos</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 font-sans leading-relaxed text-justified-elegant">
                Vestidinhos brancos ou em tons suaves e delicados, confeccionados com tecidos leves. Recomendamos sapatinhos confortáveis para que Luna e Julia se sintam totalmente à vontade.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-zinc-800 text-xs text-gray-500 font-sans">
              ✨ Prioridade máxima para conforto e bem-estar
            </div>
          </motion.div>

          {/* Card 3: Orientações Especiais */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between hover:border-gray-400 transition-colors"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-zinc-800 text-[var(--foreground)] flex items-center justify-center mb-6 border border-gray-200 dark:border-zinc-700">
                <Smile size={24} />
              </div>
              <span className="text-xs uppercase tracking-wider font-semibold text-gray-400 block mb-1">Entrada Especial</span>
              <h3 className="text-xl font-serif text-[var(--foreground)] font-medium mb-3">Orientações com Carinho</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 font-sans leading-relaxed text-justified-elegant">
                A entrada das daminhas trazendo a flor/alianças é um momento de pura alegria e leveza. Não há qualquer pressão por perfeição: o espontâneo e a doçura das crianças tornam tudo único!
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-zinc-800 text-xs text-gray-500 font-sans">
              🤍 Acompanhamento dos pais a poucos passos
            </div>
          </motion.div>

          {/* Card 4: Fotos & Momentos Especiais */}
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
              <span className="text-xs uppercase tracking-wider font-semibold text-gray-400 block mb-1">Memórias com Aline e Klécio</span>
              <h3 className="text-xl font-serif text-[var(--foreground)] font-medium mb-3">Fotos com os Noivos</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 font-sans leading-relaxed text-justified-elegant">
                Logo após a cerimônia, faremos retratos carinhosos e divertidos de Luna e Julia com Aline e Klécio no altar. Em seguida, estarão liberadas para aproveitar os docinhos na festa!
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-zinc-800 text-xs text-gray-500 font-sans">
              🍰 Cantinho de doces e festa liberados
            </div>
          </motion.div>

          {/* Card 5: Contato para Dúvidas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between hover:border-gray-400 transition-colors lg:col-span-2"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-zinc-800 text-[var(--foreground)] flex items-center justify-center mb-6 border border-gray-200 dark:border-zinc-700">
                <HelpCircle size={24} />
              </div>
              <span className="text-xs uppercase tracking-wider font-semibold text-gray-400 block mb-1">Suporte das Famílias</span>
              <h3 className="text-xl font-serif text-[var(--foreground)] font-medium mb-3">Dúvidas ou Alinhamentos das Daminhas</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 font-sans leading-relaxed text-justified-elegant">
                Caso os pais tenham qualquer dúvida sobre tamanhos, horários de chegada ou detalhes da flor/aliança, a cerimonialista e a noiva Aline estão totalmente à disposição para auxiliar com todo o carinho!
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-zinc-800 text-xs text-gray-400 font-mono">
              📞 Contato direto com Aline e Klécio e Cerimonial do Casamento
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
