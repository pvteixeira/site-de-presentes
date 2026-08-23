'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem('admin_logged_in', 'true');
        router.push('/admin');
      } else {
        setErrorMessage(data.message || 'Senha incorreta!');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Erro de conexão com o servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-zinc-900 w-full max-w-md rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-zinc-800 text-center">
        <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 text-[var(--foreground)] border border-gray-300 dark:border-zinc-700 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
          <Lock size={28} />
        </div>
        
        <h1 className="text-2xl font-serif text-[var(--foreground)] mb-2 font-medium">Acesso Restrito</h1>
        <p className="text-xs text-gray-500 mb-8 font-sans">
          Área administrativa exclusiva para Aline e Klécio.
        </p>

        <form onSubmit={handleLogin} className="space-y-6">
          {errorMessage && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 rounded-xl text-xs font-sans">
              {errorMessage}
            </div>
          )}

          <div>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite a senha" 
              required
              className="w-full px-4 py-3.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-transparent text-center text-xl tracking-widest focus:outline-none focus:border-black dark:focus:border-white transition-all"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-black dark:bg-white text-white dark:text-black py-3.5 rounded-xl font-semibold uppercase tracking-wider text-xs border border-gray-800 dark:border-gray-200 hover:opacity-90 disabled:opacity-50 transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-2"
          >
            {isLoading ? 'Verificando...' : 'Acessar Painel'}
          </button>
        </form>
      </div>
    </div>
  );
}
