'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Send, Heart, CheckCircle2, Trash2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface MessageItem {
  id: string;
  author: string;
  relation: string;
  text: string;
  date: string;
}

const INITIAL_GUESTBOOK: MessageItem[] = [];

export default function GuestbookSection() {
  const [messages, setMessages] = useState<MessageItem[]>(INITIAL_GUESTBOOK);
  const [author, setAuthor] = useState('');
  const [relation, setRelation] = useState('');
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchMessages = useCallback(async () => {
    try {
      const res = await fetch('/api/guestbook');
      const data = await res.json();
      if (data.success && Array.isArray(data.messages) && data.messages.length > 0) {
        setMessages(data.messages);
        localStorage.setItem('guestbook_messages', JSON.stringify(data.messages));
      } else {
        // Fallback local se a API estiver vazia ou offline
        const stored = localStorage.getItem('guestbook_messages');
        if (stored) {
          try {
            const parsed: MessageItem[] = JSON.parse(stored);
            const filtered = parsed.filter(m => m.id !== '1' && m.id !== '2' && m.id !== '3');
            setMessages(filtered);
          } catch (e) {
            console.error(e);
          }
        }
      }
    } catch (err) {
      console.error('Erro ao carregar mensagens:', err);
    }
  }, []);

  useEffect(() => {
    setIsAdmin(localStorage.getItem('admin_logged_in') === 'true');
    fetchMessages();

    // Inscrição em tempo real com Supabase
    if (supabase) {
      const client = supabase;
      const channel = client
        .channel('realtime_guestbook')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'guestbook_messages' },
          () => {
            fetchMessages();
          }
        )
        .subscribe();

      return () => {
        client.removeChannel(channel);
      };
    }
  }, [fetchMessages]);

  const handleDeleteMessage = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta mensagem?')) {
      const updated = messages.filter(m => m.id !== id);
      setMessages(updated);
      localStorage.setItem('guestbook_messages', JSON.stringify(updated));

      try {
        await fetch(`/api/guestbook?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
      } catch (err) {
        console.error('Erro ao excluir mensagem via API:', err);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !text.trim() || isSubmitting) return;

    setIsSubmitting(true);

    const newMsg: MessageItem = {
      id: Date.now().toString(),
      author: author.trim(),
      relation: relation.trim() || 'Convidado Especial',
      text: text.trim(),
      date: new Date().toLocaleDateString('pt-BR')
    };

    // Atualização otimista imediata na UI
    const updated = [newMsg, ...messages];
    setMessages(updated);
    localStorage.setItem('guestbook_messages', JSON.stringify(updated));

    try {
      await fetch('/api/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          author: author.trim(),
          relation: relation.trim() || 'Convidado Especial',
          text: text.trim()
        })
      });
      fetchMessages();
    } catch (err) {
      console.error('Erro ao salvar mensagem no servidor:', err);
    } finally {
      setIsSubmitting(false);
      setAuthor('');
      setRelation('');
      setText('');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    }
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
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-[var(--foreground)] mb-4 font-medium">
            Mensagens aos Noivos
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="w-16 h-[1px] bg-gray-300 dark:bg-zinc-700"></div>
            <MessageSquare className="w-5 h-5 text-gray-400 dark:text-zinc-500" />
            <div className="w-16 h-[1px] bg-gray-300 dark:bg-zinc-700"></div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Message Form */}
          <div className="lg:col-span-5 bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm">
            <h3 className="text-xl font-serif text-[var(--foreground)] font-medium mb-2 flex items-center gap-2">
              <Heart size={20} className="text-gray-400" /> Escreva sua Mensagem
            </h3>
            <p className="text-xs text-gray-500 font-sans mb-6">
              Sua mensagem aparecerá em tempo real no mural ao lado para todos os convidados e noivos!
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
                disabled={isSubmitting}
                className="w-full bg-black dark:bg-white text-white dark:text-black py-3.5 rounded-xl font-semibold uppercase tracking-wider text-xs shadow-sm border border-gray-800 dark:border-gray-200 hover:opacity-90 disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Publicando...
                  </>
                ) : (
                  <>
                    <Send size={16} /> Publicar Mensagem
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Messages Feed */}
          <div className="lg:col-span-7 space-y-4 max-h-[600px] overflow-y-auto pr-2 hide-scrollbar">
            {messages.length === 0 ? (
              <div className="text-center py-12 px-6 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800">
                <p className="text-sm text-gray-500 dark:text-gray-400 font-sans">
                  Seja o primeiro a deixar uma mensagem de carinho para os noivos!
                </p>
              </div>
            ) : (
              messages.map((item) => (
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
              ))
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
