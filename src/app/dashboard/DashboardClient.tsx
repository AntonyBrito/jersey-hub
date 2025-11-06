"use client";
import { useState, useEffect } from 'react';

interface Encomenda {
  id: number;
  nome: string;
  modelo: string;
  status: 'Pendente' | 'Concluído' | 'Cancelado';
  dataCriacao: string;
}

interface Post {
  id: number;
  content: string;
  createdAt: string;
}

export default function DashboardClient() {
  const [encomendas, setEncomendas] = useState<Encomenda[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch('/api/encomendas')
      .then(res => res.json())
      .then(data => setEncomendas(data));

    const storedPosts = JSON.parse(localStorage.getItem('postsGerados') || '[]');
    setPosts(storedPosts);
  }, []);

  const totalEncomendas = encomendas.length;
  const encomendasPendentes = encomendas.filter(e => e.status === 'Pendente').length;
  const totalPostsGerados = posts.length;

  const ultimosPosts = posts.slice(0, 5);

  const timesMaisPostados = posts.reduce((acc, post) => {
    const match = post.content.match(/camisa do (.*?)\s/);
    if (match) {
      const time = match[1];
      acc[time] = (acc[time] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const sortedTimes = Object.entries(timesMaisPostados).sort(([, a], [, b]) => b - a);

  return (
    <div className="bg-gray-900 min-h-screen text-white p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg text-center">
            <h2 className="text-2xl font-bold">{totalEncomendas}</h2>
            <p className="text-gray-400">Total de Encomendas</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg text-center">
            <h2 className="text-2xl font-bold">{encomendasPendentes}</h2>
            <p className="text-gray-400">Encomendas Pendentes</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg text-center">
            <h2 className="text-2xl font-bold">{totalPostsGerados}</h2>
            <p className="text-gray-400">Total de Posts Gerados</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Últimos Posts Gerados</h2>
            <div className="space-y-4">
              {ultimosPosts.length > 0 ? (
                ultimosPosts.map(post => (
                  <div key={post.id} className="bg-gray-700 p-4 rounded-lg">
                    <p className="whitespace-pre-wrap truncate">{post.content}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">Nenhum post gerado ainda.</p>
              )}
            </div>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Times Mais Postados</h2>
            {sortedTimes.length > 0 ? (
              <ul className="space-y-2">
                {sortedTimes.map(([time, count]) => (
                  <li key={time} className="flex justify-between">
                    <span>{time}</span>
                    <span>{count}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">Nenhum post gerado ainda.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
