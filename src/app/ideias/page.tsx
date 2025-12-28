"use client";
import { useState, useEffect } from 'react';

interface Idea {
  id: number;
  text: string;
  createdAt: string;
}

export default function Ideias() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [newIdea, setNewIdea] = useState('');

  useEffect(() => {
    fetch('/api/ideias')
      .then(res => res.json())
      .then(data => setIdeas(data));
  }, []);

  const handleAddIdea = async () => {
    if (newIdea.trim() === '') return;

    const res = await fetch('/api/ideias', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: newIdea }),
    });

    if (res.ok) {
      const newIdeaFromServer = await res.json();
      setIdeas([...ideas, newIdeaFromServer]);
      setNewIdea('');
    }
  };

  const handleDeleteIdea = async (id: number) => {
    const res = await fetch('/api/ideias', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      setIdeas(ideas.filter(idea => idea.id !== id));
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Banco de Ideias</h1>
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">Adicionar Nova Ideia</h2>
          <div className="flex gap-4">
            <input
              type="text"
              value={newIdea}
              onChange={(e) => setNewIdea(e.target.value)}
              placeholder="Digite sua ideia aqui..."
              className="w-full px-4 py-2 bg-gray-700 border-2 border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none"
            />
            <button
              onClick={handleAddIdea}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
              Adicionar
            </button>
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Suas Ideias</h2>
          {ideas.length > 0 ? (
            <div className="space-y-4">
              {ideas.map(idea => (
                <div key={idea.id} className="bg-gray-700 p-4 rounded-lg flex justify-between items-center">
                  <p>{idea.text}</p>
                  <button
                    onClick={() => handleDeleteIdea(idea.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-lg transition-colors"
                  >
                    Excluir
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center">Nenhuma ideia cadastrada ainda.</p>
          )}
        </div>
      </div>
    </div>
  );
}
