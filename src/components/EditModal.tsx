"use client";
import { useState } from 'react';

interface Encomenda {
  id: number;
  nome: string;
  modelo: string;
  status: 'Pendente' | 'Concluído' | 'Cancelado';
}

interface EditModalProps {
  encomenda: Encomenda;
  onSave: (id: number, nome: string, modelo: string, status: 'Pendente' | 'Concluído' | 'Cancelado') => void;
  onClose: () => void;
}

export default function EditModal({ encomenda, onSave, onClose }: EditModalProps) {
  const [nome, setNome] = useState(encomenda.nome);
  const [modelo, setModelo] = useState(encomenda.modelo);
  const [status, setStatus] = useState(encomenda.status);

  const handleSave = () => {
    onSave(encomenda.id, nome, modelo, status);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-8 shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6">Editar Encomenda</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="edit-nome" className="block text-sm font-medium text-gray-300 mb-2">Nome do Cliente (@)</label>
            <input
              id="edit-nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border-2 border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="edit-modelo" className="block text-sm font-medium text-gray-300 mb-2">Modelo da Camisa</label>
            <input
              id="edit-modelo"
              type="text"
              value={modelo}
              onChange={(e) => setModelo(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border-2 border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="edit-status" className="block text-sm font-medium text-gray-300 mb-2">Status</label>
            <select
              id="edit-status"
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="w-full px-4 py-2 bg-gray-700 border-2 border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none"
            >
              <option value="Pendente">Pendente</option>
              <option value="Concluído">Concluído</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </div>
        </div>
        <div className="mt-8 flex justify-end space-x-4">
          <button onClick={onClose} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
            Cancelar
          </button>
          <button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
