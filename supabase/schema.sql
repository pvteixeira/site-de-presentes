-- ==============================================================================
-- SCHEMA SUPABASE: Casamento Aline e Klécio
-- Cole e execute este script no SQL Editor do seu projeto Supabase (supabase.com)
-- ==============================================================================

-- 1. Tabela de Mensagens aos Noivos (Mural Público)
CREATE TABLE IF NOT EXISTS public.guestbook_messages (
    id TEXT PRIMARY KEY,
    author TEXT NOT NULL,
    relation TEXT DEFAULT 'Convidado Especial',
    text TEXT NOT NULL,
    date TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Tabela de Presentes da Lista (com controle de valor arrecadado)
CREATE TABLE IF NOT EXISTS public.gifts (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    category TEXT DEFAULT 'Geral',
    total_amount NUMERIC NOT NULL,
    current_amount NUMERIC DEFAULT 0 NOT NULL,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Tabela de Comprovantes e Pagamentos PIX Recebidos
CREATE TABLE IF NOT EXISTS public.pix_contributions (
    id TEXT PRIMARY KEY,
    gift_id TEXT NOT NULL,
    gift_name TEXT NOT NULL,
    guest_name TEXT NOT NULL,
    amount NUMERIC NOT NULL,
    date TEXT NOT NULL,
    receipt_url TEXT,
    receipt_name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Tabela de Comunicados dos Noivos para os Padrinhos
CREATE TABLE IF NOT EXISTS public.padrinho_announcements (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT DEFAULT 'Aline e Klécio',
    date TEXT NOT NULL,
    is_important BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Tabela de Recados dos Padrinhos para os Noivos
CREATE TABLE IF NOT EXISTS public.padrinho_replies (
    id TEXT PRIMARY KEY,
    author TEXT NOT NULL,
    text TEXT NOT NULL,
    date TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Tabela do Cronograma do Casamento
CREATE TABLE IF NOT EXISTS public.wedding_schedule (
    id TEXT PRIMARY KEY,
    time TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT DEFAULT '',
    order_index INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- POLÍTICAS DE SEGURANÇA (Row Level Security - RLS)
-- Permite leitura e escrita públicas necessárias para o site funcionar fluidamente
-- ==============================================================================

ALTER TABLE public.guestbook_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gifts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pix_contributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.padrinho_announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.padrinho_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wedding_schedule ENABLE ROW LEVEL SECURITY;

-- Políticas de Acesso:
CREATE POLICY "Permitir leitura pública de mensagens" ON public.guestbook_messages FOR SELECT USING (true);
CREATE POLICY "Permitir inserção de mensagens" ON public.guestbook_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir exclusão de mensagens" ON public.guestbook_messages FOR DELETE USING (true);

CREATE POLICY "Permitir leitura de presentes" ON public.gifts FOR SELECT USING (true);
CREATE POLICY "Permitir inserção de presentes" ON public.gifts FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir atualização de presentes" ON public.gifts FOR UPDATE USING (true);
CREATE POLICY "Permitir exclusão de presentes" ON public.gifts FOR DELETE USING (true);

CREATE POLICY "Permitir leitura de comprovantes" ON public.pix_contributions FOR SELECT USING (true);
CREATE POLICY "Permitir envio de comprovantes" ON public.pix_contributions FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir exclusão de comprovantes" ON public.pix_contributions FOR DELETE USING (true);

CREATE POLICY "Permitir leitura de comunicados dos padrinhos" ON public.padrinho_announcements FOR SELECT USING (true);
CREATE POLICY "Permitir inserção de comunicados dos padrinhos" ON public.padrinho_announcements FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir exclusão de comunicados dos padrinhos" ON public.padrinho_announcements FOR DELETE USING (true);

CREATE POLICY "Permitir leitura de recados dos padrinhos" ON public.padrinho_replies FOR SELECT USING (true);
CREATE POLICY "Permitir envio de recados dos padrinhos" ON public.padrinho_replies FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir exclusão de recados dos padrinhos" ON public.padrinho_replies FOR DELETE USING (true);

CREATE POLICY "Permitir leitura de cronograma" ON public.wedding_schedule FOR SELECT USING (true);
CREATE POLICY "Permitir gerenciamento de cronograma" ON public.wedding_schedule FOR ALL USING (true);

-- Habilitar Realtime para as tabelas principais
ALTER PUBLICATION supabase_realtime ADD TABLE public.guestbook_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.gifts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.pix_contributions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.padrinho_announcements;
ALTER PUBLICATION supabase_realtime ADD TABLE public.padrinho_replies;
ALTER PUBLICATION supabase_realtime ADD TABLE public.wedding_schedule;
