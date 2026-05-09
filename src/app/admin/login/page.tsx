'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'alineeklecio2026') {
      router.push('/admin');
    } else {
      alert('Senha incorreta! (Dica: alineeklecio2026)');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-zinc-900 w-full max-w-md rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-zinc-800 text-center">
        <div className="w-16 h-16 bg-[var(--color-wedding-gold)]/10 text-[var(--color-wedding-gold)] rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock size={32} />
        </div>
        
        <h1 className="text-2xl font-serif text-[var(--foreground)] mb-2">Acesso Restrito</h1>
        <p className="text-sm text-gray-500 mb-8 font-sans">
          Área administrativa exclusiva para os noivos.
        </p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite a senha" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-transparent text-center text-xl tracking-widest focus:outline-none focus:border-[var(--color-wedding-gold)] focus:ring-1 focus:ring-[var(--color-wedding-gold)] transition-all"
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-[var(--color-wedding-gold)] text-white py-3 rounded-xl font-medium hover:bg-[var(--color-wedding-gold)]/90 transition-colors"
          >
            Acessar Painel
          </button>
        </form>
      </div>
    </div>
  );
}
