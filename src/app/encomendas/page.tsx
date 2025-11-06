"use client";
import { useState, useEffect } from 'react';
import EditModal from '../../components/EditModal';

interface Encomenda {
  id: number;
  nome: string;
  modelo: string;
  status: 'Pendente' | 'Concluído' | 'Cancelado';
  dataCriacao: string;
}

export default function Encomendas() {
  const [encomendas, setEncomendas] = useState<Encomenda[]>([]);
  const [nome, setNome] = useState('');
  const [modelo, setModelo] = useState('');
  const [filtro, setFiltro] = useState('');
  const [statusFiltro, setStatusFiltro] = useState<'all' | 'Pendente' | 'Concluído' | 'Cancelado'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [encomendaAtual, setEncomendaAtual] = useState<Encomenda | null>(null);

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

  const handleDelete = async (id: number) => {
    const res = await fetch('/api/encomendas', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      setEncomendas(encomendas.filter(e => e.id !== id));
    }
  };

  const handleEdit = (encomenda: Encomenda) => {
    setEncomendaAtual(encomenda);
    setIsModalOpen(true);
  };

  const handleSave = async (id: number, nome: string, modelo: string, status: 'Pendente' | 'Concluído' | 'Cancelado') => {
    const res = await fetch('/api/encomendas', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, nome, modelo, status }),
    });

    if (res.ok) {
      const encomendaAtualizada = await res.json();
      setEncomendas(encomendas.map(e => e.id === id ? encomendaAtualizada : e));
      setIsModalOpen(false);
      setEncomendaAtual(null);
    }
  };

  const handleStatusChange = async (id: number, status: 'Pendente' | 'Concluído' | 'Cancelado') => {
    const res = await fetch('/api/encomendas', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });

    if (res.ok) {
      const encomendaAtualizada = await res.json();
      setEncomendas(encomendas.map(e => e.id === id ? encomendaAtualizada : e));
    }
  };

  const filteredEncomendas = encomendas.filter(e => {
    const searchMatch = e.nome.toLowerCase().includes(filtro.toLowerCase()) || e.modelo.toLowerCase().includes(filtro.toLowerCase());
    const statusMatch = statusFiltro === 'all' || e.status === statusFiltro;
    return searchMatch && statusMatch;
  });

  return (
    <div className="bg-gray-900 min-h-screen text-white p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Gerenciamento de Encomendas</h1>

        <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">Adicionar Nova Encomenda</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-gray-300 mb-2">Nome do Cliente (@)</label>
              <input id="nome" type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="@exemplo" className="w-full px-4 py-2 bg-gray-700 border-2 border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none" />
            </div>
            <div>
              <label htmlFor="modelo" className="block text-sm font-medium text-gray-300 mb-2">Modelo da Camisa</label>
              <input id="modelo" type="text" value={modelo} onChange={(e) => setModelo(e.target.value)} placeholder="Ex: Camisa Real Madrid Home 23/24" className="w-full px-4 py-2 bg-gray-700 border-2 border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none" />
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">Adicionar à Lista</button>
          </form>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Lista de Encomendas</h2>
            <div className="flex gap-4">
              <input type="text" value={filtro} onChange={(e) => setFiltro(e.target.value)} placeholder="Pesquisar..." className="px-4 py-2 bg-gray-700 border-2 border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none" />
              <select value={statusFiltro} onChange={(e) => setStatusFiltro(e.target.value as any)} className="px-4 py-2 bg-gray-700 border-2 border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none">
                <option value="all">Todos os Status</option>
                <option value="Pendente">Pendente</option>
                <option value="Concluído">Concluído</option>
                <option value="Cancelado">Cancelado</option>
              </select>
            </div>
          </div>
          <div className="space-y-4">
            {filteredEncomendas.length > 0 ? (
              filteredEncomendas.map((encomenda) => (
                <div key={encomenda.id} className={`bg-gray-700 p-4 rounded-lg flex justify-between items-center ${encomenda.status === 'Concluído' ? 'opacity-50' : ''}`}>
                  <div>
                    <p className="font-semibold text-white">{encomenda.nome}</p>
                    <p className="text-gray-400">{encomenda.modelo}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      encomenda.status === 'Pendente' ? 'bg-yellow-500 text-gray-900' :
                      encomenda.status === 'Concluído' ? 'bg-green-500 text-gray-900' :
                      'bg-red-500 text-white'
                    }`}>{encomenda.status}</span>
                  </div>
                  <div className="flex space-x-2">
                    <button onClick={() => handleEdit(encomenda)} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded-lg transition-colors">Editar</button>
                    <button onClick={() => handleDelete(encomenda.id)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-lg transition-colors">Excluir</button>
                    <select
                      value={encomenda.status}
                      onChange={(e) => handleStatusChange(encomenda.id, e.target.value as any)}
                      className="bg-gray-600 text-white rounded-lg px-2 py-1 focus:outline-none"
                    >
                      <option value="Pendente">Pendente</option>
                      <option value="Concluído">Concluído</option>
                      <option value="Cancelado">Cancelado</option>
                    </select>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400">Nenhuma encomenda encontrada.</p>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && encomendaAtual && (
        <EditModal
          encomenda={encomendaAtual}
          onSave={(id, nome, modelo, status) => handleSave(id, nome, modelo, status as any)}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
