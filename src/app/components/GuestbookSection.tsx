'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Send, Heart, CheckCircle2, Trash2 } from 'lucide-react';

interface MessageItem {
  id: string;
  author: string;
  relation: string;
  text: string;
  date: string;
}

const INITIAL_GUESTBOOK: MessageItem[] = [
  {
    id: '1',
    author: 'Maria Clara e João',
    relation: 'Amigos dos Noivos',
    text: 'Que a união de vocês seja sempre guiada pelo amor, cumplicidade e muitas alegrias. Estamos ansiosos para celebrar este dia tão inesquecível ao lado de vocês!',
    date: '28/07/2026'
  },
  {
    id: '2',
    author: 'Tia Luciana e Família',
    relation: 'Família',
    text: 'Aline e Klécio, acompanhar essa trajetória linda enche nosso coração de orgulho. Que Deus abençoe ricamente essa nova família que se inicia.',
    date: '30/07/2026'
  },
  {
    id: '3',
    author: 'Carlos e Débora',
    relation: 'Padrinhos',
    text: 'É uma honra imensa sermos padrinhos deste amor tão verdadeiro. Podem contar conosco para sempre!',
    date: '01/08/2026'
  }
];

export default function GuestbookSection() {
  const [messages, setMessages] = useState<MessageItem[]>(INITIAL_GUESTBOOK);
  const [author, setAuthor] = useState('');
  const [relation, setRelation] = useState('');
  const [text, setText] = useState('');
  const [success, setSuccess] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(localStorage.getItem('admin_logged_in') === 'true');

    const stored = localStorage.getItem('guestbook_messages');
    if (stored) {
      try {
        setMessages(JSON.parse(stored));
      } catch (e) {
        console.error(e);
      }
    } else {
      localStorage.setItem('guestbook_messages', JSON.stringify(INITIAL_GUESTBOOK));
    }
  }, []);

  const handleDeleteMessage = (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta mensagem?')) {
      const updated = messages.filter(m => m.id !== id);
      setMessages(updated);
      localStorage.setItem('guestbook_messages', JSON.stringify(updated));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !text.trim()) return;

    const newMsg: MessageItem = {
      id: Date.now().toString(),
      author: author.trim(),
      relation: relation.trim() || 'Convidado Especial',
      text: text.trim(),
      date: new Date().toLocaleDateString('pt-BR')
    };

    const updated = [newMsg, ...messages];
    setMessages(updated);
    localStorage.setItem('guestbook_messages', JSON.stringify(updated));

    setAuthor('');
    setRelation('');
    setText('');
    setSuccess(true);
    setTimeout(() => setSuccess(false), 4000);
  };

  return (
    <section id="mensagens-noivos" className="py-24 bg-[var(--background)] border-t border-gray-200 dark:border-zinc-800">
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
            <MessageSquare size={14} className="text-gray-400" /> Mensagens aos Noivos
          </div>
          <div className="flex items-center justify-center gap-3">
            <div className="w-16 h-[1px] bg-gray-300 dark:bg-zinc-700"></div>
            <MessageSquare className="w-5 h-5 text-gray-400 dark:text-zinc-500" />
            <div className="w-16 h-[1px] bg-gray-300 dark:bg-zinc-700"></div>
          </div>
          <p className="text-sm md:text-base text-[var(--foreground)]/80 font-sans leading-relaxed text-justified-elegant text-center max-w-2xl mx-auto">
            Deixe seu recado, desejo de felicidades ou uma lembrança especial para guardar para sempre no coração de Aline e Klécio.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Message Form */}
          <div className="lg:col-span-5 bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm">
            <h3 className="text-xl font-serif text-[var(--foreground)] font-medium mb-2 flex items-center gap-2">
              <Heart size={20} className="text-gray-400" /> Escreva sua Mensagem
            </h3>
            <p className="text-xs text-gray-500 font-sans mb-6">
              Sua mensagem aparecerá em tempo real no mural abaixo!
            </p>

            {success && (
              <div className="bg-green-500/10 border border-green-500/30 text-green-600 dark:text-green-400 p-3 rounded-xl text-xs mb-4 flex items-center gap-2">
                <CheckCircle2 size={16} /> Mensagem enviada com sucesso! Obrigado pelo carinho.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">Seu Nome</label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Ex: Antonieta"
                  required
                  className="w-full p-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-transparent text-sm focus:outline-none focus:border-black dark:focus:border-white transition-all font-sans"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">Sua Mensagem de Carinho</label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Escreva seus votos para os noivos..."
                  rows={4}
                  required
                  className="w-full p-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-transparent text-sm focus:outline-none focus:border-black dark:focus:border-white transition-all font-sans"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-black dark:bg-white text-white dark:text-black py-3.5 rounded-xl font-semibold uppercase tracking-wider text-xs shadow-sm border border-gray-800 dark:border-gray-200 hover:opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send size={16} /> Publicar Mensagem
              </button>
            </form>
          </div>

          {/* Messages Feed */}
          <div className="lg:col-span-7 space-y-4 max-h-[600px] overflow-y-auto pr-2 hide-scrollbar">
            {messages.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm hover:border-gray-400 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-serif text-lg text-[var(--foreground)] font-medium">{item.author}</h4>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400 font-mono">{item.date}</span>
                    {isAdmin && (
                      <button
                        onClick={() => handleDeleteMessage(item.id)}
                        className="p-1.5 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                        title="Excluir mensagem (Administrador)"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 font-sans leading-relaxed text-justified-elegant">
                  "{item.text}"
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
