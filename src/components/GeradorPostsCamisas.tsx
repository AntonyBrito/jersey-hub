"use client";
import React, { useState, useEffect } from 'react';
import { Copy, Check, Sparkles, Download } from 'lucide-react';

interface FormData {
  nomeClube: string;
  temporada: string;
  modelos: string;
  link: string;
  cor1: string;
  cor2: string;
  cor3: string;
  jogadorDestaque: string;
  preco: string;
}

interface Template {
  nome: string;
  categoria: string;
  template: string;
}

interface Wildcards {
  [key: string]: string[];
}

const GeradorPostsCamisas = () => {
  const [formData, setFormData] = useState<FormData>({
    nomeClube: '',
    temporada: '2025/26',
    modelos: 'home-away-third',
    link: '',
    cor1: '🔵',
    cor2: '⚪',
    cor3: '🟡',
    jogadorDestaque: '',
    preco: ''
  });

  const [postGerado, setPostGerado] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | string | null>(null);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [wildcards, setWildcards] = useState<Wildcards>({});
  const [templatesSelecionados, setTemplatesSelecionados] = useState('todos');

  useEffect(() => {
    fetch('/templates.json')
      .then(response => response.json())
      .then(data => setTemplates(data));

    fetch('/wildcards.json')
      .then(response => response.json())
      .then(data => setWildcards(data));
  }, []);

  const modelosOptions: { [key: string]: string } = {
    'home': 'Home',
    'away': 'Away',
    'third': 'Third',
    'home-away': 'Home e Away',
    'home-away-third': 'Home, Away e Third',
    'edicao-especial': 'Edição Especial',
    'goleiro': 'Goleiro',
    'retro': 'Retrô/Vintage',
    'treino': 'Treino',
    'pre-jogo': 'Pré-Jogo'
  };

  const categoriasTemplates: { [key: string]: string } = {
    'todos': 'Todos os Templates',
    'promocional': 'Promocionais',
    'emocional': 'Emocionais',
    'informativo': 'Informativos',
    'urgencia': 'Urgência/Escassez',
    'interativo': 'Interativos'
  };

  const getRandomWildcard = (key: string) => {
    const wildcardArray = wildcards[key];
    if (!wildcardArray || wildcardArray.length === 0) {
      return '';
    }
    return wildcardArray[Math.floor(Math.random() * wildcardArray.length)];
  };

  const processDynamicContent = (content: string, dados: FormData): string => {
    const dynamicRegex = /\${(.*?)}/g;
    let processedContent = content;

    // First, replace simple placeholders like ${dados.nomeClube}
    Object.keys(dados).forEach(key => {
      const regex = new RegExp(`\\\${dados.${key}}`, 'g');
      processedContent = processedContent.replace(regex, (dados as any)[key]);
    });

    // Then, evaluate more complex expressions
    processedContent = processedContent.replace(dynamicRegex, (match, expression) => {
      try {
        // A safer way to evaluate expressions without exposing global scope
        const func = new Function('dados', `return ${expression}`);
        return func(dados);
      } catch (error) {
        // If it fails, it might be a wildcard, so return the match
        return match;
      }
    });

    return processedContent;
  };

  const gerarConteudoTemplate = (template: Template, dados: FormData) => {
    let content = template.template;

    // Process all dynamic content and placeholders
    content = processDynamicContent(content, dados);

    // Replace wildcards
    content = content.replace(/\${saudacoes}/g, getRandomWildcard('saudacoes'));
    content = content.replace(/\${despedidas}/g, getRandomWildcard('despedidas'));

    // Finally, replace newline characters for correct rendering
    content = content.replace(/\\n/g, '\n');

    return content;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const gerarPosts = () => {
    if (!formData.nomeClube || !formData.link) {
      alert('Por favor, preencha o nome do clube e o link!');
      return;
    }
    setPostGerado('gerando');
  };

  const copyToClipboard = async (text: string, index: any) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);

    const postToSave = {
      id: Date.now(),
      content: text,
      createdAt: new Date().toISOString(),
    };

    await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([postToSave]),
    });

    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const copyAllPosts = () => {
    const templatesFiltrados = templatesSelecionados === 'todos'
      ? templates
      : templates.filter(t => t.categoria === templatesSelecionados);

    const todosOsPosts = templatesFiltrados
      .map((template, index) => `=== POST ${index + 1}: ${template.nome} ===\n\n${gerarConteudoTemplate(template, formData)}\n\n`)
      .join('━━━━━━━━━━━━━━━━━━━\n\n');

    navigator.clipboard.writeText(todosOsPosts);
    setCopiedIndex('todos');
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const limparFormulario = () => {
    setFormData({
      nomeClube: '',
      temporada: '2025/26',
      modelos: 'home-away-third',
      link: '',
      cor1: '🔵',
      cor2: '⚪',
      cor3: '🟡',
      jogadorDestaque: '',
      preco: ''
    });
    setPostGerado('');
  };

  const templatesFiltrados = templatesSelecionados === 'todos'
    ? templates
    : templates.filter(t => t.categoria === templatesSelecionados);

  return (
    <div className="bg-gray-900 min-h-screen text-white p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Gerador de Posts para Camisas</h1>
          <p className="text-gray-400">Crie posts profissionais e variados para suas camisas de time • {templates.length} templates diferentes</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Nome do Clube *</label>
                <input
                  type="text"
                  name="nomeClube"
                  value={formData.nomeClube}
                  onChange={handleInputChange}
                  placeholder="Ex: Chelsea, Real Madrid, Flamengo..."
                  className="w-full px-4 py-2 bg-gray-700 border-2 border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Temporada</label>
                <input
                  type="text"
                  name="temporada"
                  value={formData.temporada}
                  onChange={handleInputChange}
                  placeholder="Ex: 2025/26"
                  className="w-full px-4 py-2 bg-gray-700 border-2 border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Tipo de Modelo</label>
                <select
                  name="modelos"
                  value={formData.modelos}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-700 border-2 border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none"
                >
                  {Object.entries(modelosOptions).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Link da Shopee *</label>
                <input
                  type="text"
                  name="link"
                  value={formData.link}
                  onChange={handleInputChange}
                  placeholder="https://s.shopee.com.br/..."
                  className="w-full px-4 py-2 bg-gray-700 border-2 border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Jogador Destaque (Opcional)</label>
                <input
                  type="text"
                  name="jogadorDestaque"
                  value={formData.jogadorDestaque}
                  onChange={handleInputChange}
                  placeholder="Ex: Neymar, CR7, Messi..."
                  className="w-full px-4 py-2 bg-gray-700 border-2 border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Preço (Opcional)</label>
                <input
                  type="text"
                  name="preco"
                  value={formData.preco}
                  onChange={handleInputChange}
                  placeholder="Ex: R$ 89,90"
                  className="w-full px-4 py-2 bg-gray-700 border-2 border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">Emojis das Cores (Opcional - para alguns templates)</label>
            <div className="grid grid-cols-3 gap-4">
              <input
                type="text"
                name="cor1"
                value={formData.cor1}
                onChange={handleInputChange}
                placeholder="🔵"
                className="w-full px-4 py-2 bg-gray-700 border-2 border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none text-center"
              />
              <input
                type="text"
                name="cor2"
                value={formData.cor2}
                onChange={handleInputChange}
                placeholder="⚪"
                className="w-full px-4 py-2 bg-gray-700 border-2 border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none text-center"
              />
              <input
                type="text"
                name="cor3"
                value={formData.cor3}
                onChange={handleInputChange}
                placeholder="🟡"
                className="w-full px-4 py-2 bg-gray-700 border-2 border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none text-center"
              />
            </div>
          </div>
          <div className="flex gap-4 mt-6">
            <button
              onClick={gerarPosts}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Sparkles size={20} />
              Gerar Posts
            </button>
            <button
              onClick={limparFormulario}
              className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Limpar
            </button>
          </div>
        </div>

        {postGerado && (
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">📱 Posts Gerados</h2>
              <div className="flex gap-2">
                <select
                  value={templatesSelecionados}
                  onChange={(e) => setTemplatesSelecionados(e.target.value)}
                  className="px-4 py-2 bg-gray-700 border-2 border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none text-sm"
                >
                  {Object.entries(categoriasTemplates).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label} {value === 'todos' ? `(${templates.length})` : `(${templates.filter(t => t.categoria === value).length})`}
                    </option>
                  ))}
                </select>
                <button
                  onClick={copyAllPosts}
                  className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-semibold"
                >
                  {copiedIndex === 'todos' ? (
                    <>
                      <Check size={16} />
                      Todos Copiados!
                    </>
                  ) : (
                    <>
                      <Download size={16} />
                      Copiar Todos ({templatesFiltrados.length})
                    </>
                  )}
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templatesFiltrados.map((template, index) => {
                const postContent = gerarConteudoTemplate(template, formData);
                return (
                  <div key={index} className="bg-gray-700 rounded-lg shadow-md p-4 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-white">{templates.indexOf(template) + 1}. {template.nome}</h3>
                        <span className="text-xs bg-gray-600 text-gray-300 px-2 py-1 rounded-full">{categoriasTemplates[template.categoria]}</span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(postContent, index)}
                        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg transition-colors text-sm font-semibold"
                      >
                        {copiedIndex === index ? (
                          <>
                            <Check size={16} />
                            Copiado!
                          </>
                        ) : (
                          <>
                            <Copy size={16} />
                            Copiar
                          </>
                        )}
                      </button>
                    </div>
                    <div className="text-sm text-gray-300 whitespace-pre-wrap flex-grow">
                      {postContent}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GeradorPostsCamisas;
