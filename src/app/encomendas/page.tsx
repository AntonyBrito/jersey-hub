"use client";
import { useState, useEffect } from 'react';

interface Encomenda {
  nome: string;
  modelo: string;
}

export default function Encomendas() {
  const [encomendas, setEncomendas] = useState<Encomenda[]>([]);
  const [nome, setNome] = useState('');
  const [modelo, setModelo] = useState('');
  const [filtro, setFiltro] = useState('');

  useEffect(() => {
    fetch('/api/encomendas')
      .then(res => res.json())
      .then(data => setEncomendas(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || !modelo) return;

    const res = await fetch('/api/encomendas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, modelo }),
    });

    if (res.ok) {
      const novaEncomenda = await res.json();
      setEncomendas([...encomendas, novaEncomenda]);
      setNome('');
      setModelo('');
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Lista de Encomendas</h1>

        <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">Adicionar Nova Encomenda</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-gray-300 mb-2">Nome do Cliente (@)</label>
              <input
                id="nome"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="@exemplo"
                className="w-full px-4 py-2 bg-gray-700 border-2 border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="modelo" className="block text-sm font-medium text-gray-300 mb-2">Modelo da Camisa</label>
              <input
                id="modelo"
                type="text"
                value={modelo}
                onChange={(e) => setModelo(e.target.value)}
                placeholder="Ex: Camisa Real Madrid Home 23/24"
                className="w-full px-4 py-2 bg-gray-700 border-2 border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none"
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
              Adicionar à Lista
            </button>
          </form>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Encomendas Pendentes</h2>
            <input
              type="text"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              placeholder="Pesquisar..."
              className="px-4 py-2 bg-gray-700 border-2 border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div className="space-y-4">
            {encomendas.length > 0 ? (
              encomendas
                .filter(e => e.nome.toLowerCase().includes(filtro.toLowerCase()) || e.modelo.toLowerCase().includes(filtro.toLowerCase()))
                .map((encomenda, index) => (
                  <div key={index} className="bg-gray-700 p-4 rounded-lg flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-white">{encomenda.nome}</p>
                      <p className="text-gray-400">{encomenda.modelo}</p>
                    </div>
                  </div>
                ))
            ) : (
              <p className="text-gray-400">Nenhuma encomenda pendente.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
