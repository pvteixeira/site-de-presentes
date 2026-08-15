'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPass = password.trim();
    if (cleanPass === 'Linocaeklecio2026' || cleanPass.toLowerCase() === 'linocaeklecio2026') {
      localStorage.setItem('admin_logged_in', 'true');
      router.push('/admin');
    } else {
      alert('Senha incorreta!');
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
          <div>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite a senha" 
              className="w-full px-4 py-3.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-transparent text-center text-xl tracking-widest focus:outline-none focus:border-black dark:focus:border-white transition-all"
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-black dark:bg-white text-white dark:text-black py-3.5 rounded-xl font-semibold uppercase tracking-wider text-xs border border-gray-800 dark:border-gray-200 hover:opacity-90 transition-colors shadow-sm cursor-pointer"
          >
            Acessar Painel
          </button>
        </form>
      </div>
    </div>
  );
}
