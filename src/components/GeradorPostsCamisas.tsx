"use client";
import React, { useState } from 'react';
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
  const [templatesSelecionados, setTemplatesSelecionados] = useState('todos');

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

  const templates = [
    {
      nome: "Por que é diferente?",
      categoria: 'informativo',
      gerar: (dados: FormData) => `Por que nossa camisa do ${dados.nomeClube} é diferente?

✓ Tecido Premium 1.1 (respirável e durável)
✓ Personalização sem custo extra
✓ Garantia em todas as compras
✓ Vários modelos em um só anúncio

Vale cada centavo: ${dados.link}`
    },
    {
      nome: "Personalização GRÁTIS",
      categoria: 'promocional',
      gerar: (dados: FormData) => `⚡ Personalização GRÁTIS na camisa do ${dados.nomeClube}!

Coloque seu nome, número do seu ídolo ou crie a sua própria.
${dados.modelos.includes('edicao-especial') ? 'Edição especial exclusiva!' :
          dados.modelos === 'home' ? 'Modelo Home disponível!' :
            dados.modelos === 'away' ? 'Modelo Away disponível!' :
              dados.modelos === 'third' ? 'Modelo Third disponível!' :
                dados.modelos === 'home-away' ? 'Modelos Home e Away disponíveis!' :
                  dados.modelos === 'goleiro' ? 'Modelo exclusivo de goleiro!' :
                    dados.modelos === 'retro' ? 'Modelo retrô clássico!' :
                      dados.modelos === 'treino' ? 'Modelo de treino oficial!' :
                        dados.modelos === 'pre-jogo' ? 'Modelo de pré-jogo!' :
                          'Vários modelos disponíveis - Home, Away e Third!'}

📦 Entrega rápida
🔒 Compra protegida

Garanta a sua: ${dados.link}`
    },
    {
      nome: "Qual você prefere?",
      categoria: 'interativo',
      gerar: (dados: FormData) => {
        let opcoes = '';
        if (dados.modelos === 'home') opcoes = `${dados.cor1} Home clássica`;
        else if (dados.modelos === 'away') opcoes = `${dados.cor2} Away moderna`;
        else if (dados.modelos === 'third') opcoes = `${dados.cor3} Third ousada`;
        else if (dados.modelos === 'home-away') opcoes = `${dados.cor1} Home clássica\n${dados.cor2} Away moderna`;
        else if (dados.modelos === 'home-away-third') opcoes = `${dados.cor1} Home clássica\n${dados.cor2} Away moderna\n${dados.cor3} Third ousada`;
        else if (dados.modelos === 'edicao-especial') opcoes = `✨ Edição Especial Limitada`;
        else if (dados.modelos === 'goleiro') opcoes = `🧤 Modelo Exclusivo de Goleiro`;
        else if (dados.modelos === 'retro') opcoes = `⏰ Retrô Clássica`;
        else if (dados.modelos === 'treino') opcoes = `💪 Treino Oficial`;
        else opcoes = `🔥 Modelo Pré-Jogo`;

        return `Qual camisa do ${dados.nomeClube} você prefere? 💭

${opcoes}

Todas disponíveis para personalizar!
Garantia + Qualidade Premium 1.1

Escolha a sua: ${dados.link}`;
      }
    },
    {
      nome: "Formato Elegante",
      categoria: 'informativo',
      gerar: (dados: FormData) => `🏆 | ${dados.nomeClube.toUpperCase()} ${dados.temporada} | 🏆

━━━━━━━━━━━━━━━
${dados.cor1} Coleção Completa
⭐ Premium Quality 1.1
✍️ Personalização Free
🛡️ Garantia Inclusa
━━━━━━━━━━━━━━━

GARANTA: ${dados.link}`
    },
    {
      nome: "Presente Perfeito",
      categoria: 'emocional',
      gerar: (dados: FormData) => `🎁 Presente perfeito para o torcedor do ${dados.nomeClube}!

Surpreenda com a camisa oficial ${dados.temporada}
Nome personalizado deixa ainda mais especial

💙 Qualidade Premium 1.1 garantida
📏 Todos os tamanhos disponíveis
${dados.modelos.includes('edicao-especial') ? '✨ Edição especial limitada' :
          dados.modelos === 'home-away-third' ? '🎨 3 modelos para escolher' :
            '🎨 Modelos exclusivos'}

Presenteie agora: ${dados.link}`
    },
    {
      nome: "Urgência/Escassez",
      categoria: 'urgencia',
      gerar: (dados: FormData) => `🚨 ATENÇÃO, torcedor do ${dados.nomeClube}!

${dados.modelos.includes('edicao-especial') ? 'Edição ESPECIAL com estoque super limitado!' : `Estoque limitado da coleção ${dados.temporada}`}
Os modelos mais procurados estão saindo rápido

✅ Qualidade Premium 1.1
✅ Todos os tamanhos disponíveis (por enquanto!)
✅ Personalização incluída

Não perca: ${dados.link}`
    },
    {
      nome: "Review/Depoimento",
      categoria: 'emocional',
      gerar: (dados: FormData) => `"A qualidade surpreendeu!" ⭐⭐⭐⭐⭐

Camisa ${dados.nomeClube} ${dados.temporada} chegando nos torcedores!
Tecido premium, acabamento impecável e personalização top.

Você também pode ter a sua:
🔹 Escolha o modelo
🔹 Personalize como quiser
🔹 Receba em casa

Peça aqui: ${dados.link}`
    },
    {
      nome: "Tradição/Emocional",
      categoria: 'emocional',
      gerar: (dados: FormData) => `${dados.cor1} A tradição do ${dados.nomeClube} merece estar no seu armário!

Reviva a emoção com a nova camisa ${dados.temporada}.
Perfeita para torcer, jogar ou usar no dia a dia.

✨ Personalização incluída
🛡️ Garantia + Qualidade Premium 1.1
🎯 ${dados.modelos === 'home-away-third' ? 'Três modelos exclusivos' :
          dados.modelos.includes('edicao-especial') ? 'Edição limitada exclusiva' :
            'Modelos oficiais'}

👉 ${dados.link}`
    },
    {
      nome: "Call to Action Direto",
      categoria: 'promocional',
      gerar: (dados: FormData) => `⚽ CAMISA ${dados.nomeClube.toUpperCase()} ${dados.temporada} ⚽

${dados.modelos === 'home' ? '✓ Modelo Home Oficial' :
          dados.modelos === 'away' ? '✓ Modelo Away Oficial' :
            dados.modelos === 'third' ? '✓ Modelo Third Oficial' :
              dados.modelos === 'home-away' ? '✓ Modelos Home e Away' :
                dados.modelos === 'home-away-third' ? '✓ Home | Away | Third' :
                  dados.modelos === 'edicao-especial' ? '✓ EDIÇÃO ESPECIAL LIMITADA' :
                    dados.modelos === 'goleiro' ? '✓ Modelo Goleiro Exclusivo' :
                      dados.modelos === 'retro' ? '✓ Modelo Retrô Clássico' :
                        dados.modelos === 'treino' ? '✓ Modelo Treino Oficial' :
                          '✓ Modelo Pré-Jogo'}
✓ Tecido Premium 1.1
✓ Personalização Free
✓ Garantia Total

🔥 COMPRE AGORA: ${dados.link}`
    },
    {
      nome: "Minimalista Pro",
      categoria: 'informativo',
      gerar: (dados: FormData) => `${dados.nomeClube} ${dados.temporada}

Premium 1.1 | Personalização Free | Garantia

${dados.link}`
    },
    {
      nome: "Dia de Jogo",
      categoria: 'emocional',
      gerar: (dados: FormData) => `⚽ DIA DE JOGO DO ${dados.nomeClube.toUpperCase()}!

Vista as cores do seu time com orgulho!
${dados.modelos.includes('edicao-especial') ? 'Edição especial para verdadeiros torcedores' : `Camisa oficial ${dados.temporada}`}

🔥 Tecido que não desbota
💪 Conforto para torcer o jogo todo
✍️ Coloque seu nome ou do craque

Seja parte da torcida: ${dados.link}`
    },
    {
      nome: "Comparação Vantagens",
      categoria: 'informativo',
      gerar: (dados: FormData) => `❌ Camisas genéricas
✅ Camisa oficial ${dados.nomeClube}

❌ Tecido comum
✅ Premium 1.1 respirável

❌ Sem garantia
✅ Garantia em todas as compras

❌ Personalização cara
✅ Personalização GRÁTIS

A escolha é óbvia: ${dados.link}`
    },
    {
      nome: "Edição Limitada Especial",
      categoria: 'urgencia',
      gerar: (dados: FormData) => `⚠️ EDIÇÃO LIMITADA ${dados.nomeClube.toUpperCase()} ⚠️

${dados.modelos.includes('edicao-especial') || dados.modelos.includes('retro') ?
          '🎯 Poucas unidades disponíveis!\n🔥 Modelo exclusivo que vai esgotar' :
          '🎯 Coleção especial disponível\n🔥 Aproveite enquanto tem estoque'}

✨ Qualidade Premium 1.1
✨ Personalização incluída
✨ Entrega garantida

GARANTA A SUA: ${dados.link}`
    },
    {
      nome: "Antes/Depois",
      categoria: 'emocional',
      gerar: (dados: FormData) => `ANTES: Querer a camisa do ${dados.nomeClube}
DEPOIS: Ter a camisa personalizada na sua casa!

Como? É simples:
1️⃣ Clica no link
2️⃣ Escolhe o modelo
3️⃣ Personaliza do seu jeito
4️⃣ Recebe em casa

${dados.modelos.includes('edicao-especial') ? '✨ Edição especial disponível!' : `✅ Premium 1.1 | ${dados.temporada}`}

Realize agora: ${dados.link}`
    },
    {
      nome: "Para Verdadeiros Torcedores",
      categoria: 'emocional',
      gerar: (dados: FormData) => `💚 PARA VERDADEIROS TORCEDORES DO ${dados.nomeClube.toUpperCase()}

${dados.jogadorDestaque ? `Use o número do ${dados.jogadorDestaque}!\n` : ''}Mostre sua paixão com a camisa oficial
${dados.modelos.includes('edicao-especial') ? 'Edição especial para os apaixonados' : `Temporada ${dados.temporada}`}

⚡ Material Premium 1.1
⚡ Personalização sem custo
⚡ Garantia total

Seu time, sua camisa: ${dados.link}`
    },
    {
      nome: "Lista de Benefícios Completa",
      categoria: 'informativo',
      gerar: (dados: FormData) => `✅ CHECKLIST DA CAMISA PERFEITA ${dados.nomeClube}

✓ Tecido Premium 1.1 respirável
✓ Cores vibrantes que não desbotam
✓ Tamanhos PP ao GG disponíveis
✓ Personalização gratuita incluída
✓ Garantia em todas as compras
✓ Entrega rápida e rastreável
${dados.modelos.includes('edicao-especial') ? '✓ Edição LIMITADA especial' : `✓ Coleção ${dados.temporada} oficial`}

TUDO ISSO: ${dados.link}`
    },
    {
      nome: "Investimento que Vale",
      categoria: 'promocional',
      gerar: (dados: FormData) => `💰 Investir na camisa do ${dados.nomeClube} VALE A PENA!

Por quê?
🎯 Dura muito (Premium 1.1)
🎯 Usa em várias ocasiões
🎯 Personalização já inclusa
🎯 Garantia de qualidade
${dados.preco ? `🎯 Apenas ${dados.preco}` : '🎯 Preço justo'}

Invista no seu time: ${dados.link}`
    },
    {
      nome: "Perguntas e Respostas",
      categoria: 'interativo',
      gerar: (dados: FormData) => `❓ DÚVIDAS SOBRE A CAMISA DO ${dados.nomeClube}?

✅ É original? Premium 1.1 de alta qualidade
✅ Posso personalizar? SIM, grátis!
✅ Tem garantia? Sim, em todas as compras
✅ Qual modelo? ${dados.modelos === 'home-away-third' ? 'Home, Away e Third' :
          dados.modelos.includes('edicao-especial') ? 'Edição Especial' :
            'Vários modelos disponíveis'}
✅ Entrega rápida? Sim, com rastreio

Todas as respostas aqui: ${dados.link}`
    },
    {
      nome: "Storytelling Torcida",
      categoria: 'emocional',
      gerar: (dados: FormData) => `📖 Cada torcedor tem sua história com o ${dados.nomeClube}

Qual é a sua?
Aquele gol inesquecível? O título histórico?
${dados.jogadorDestaque ? `Os dribles do ${dados.jogadorDestaque}?\n` : ''}
Vista a camisa que representa tudo isso!

${dados.modelos.includes('edicao-especial') ? '✨ Edição especial para momentos especiais' : `🏆 Temporada ${dados.temporada}`}
💙 Premium 1.1 + Personalização

Sua história: ${dados.link}`
    },
    {
      nome: "Combo Benefícios",
      categoria: 'promocional',
      gerar: (dados: FormData) => `🎁 COMBO COMPLETO ${dados.nomeClube}!

Ao comprar você recebe:
🔹 Camisa Premium 1.1
🔹 Personalização grátis
🔹 Garantia de qualidade
🔹 Entrega rastreada
${dados.modelos.includes('edicao-especial') ? '🔹 Edição ESPECIAL limitada' : `🔹 Coleção ${dados.temporada}`}

Tudo isso em um só lugar: ${dados.link}`
    },
    {
      nome: "Últimas Unidades",
      categoria: 'urgencia',
      gerar: (dados: FormData) => `⏰ ÚLTIMAS UNIDADES! ${dados.nomeClube}

${dados.modelos.includes('edicao-especial') || dados.modelos.includes('retro') ?
          '🚨 Edição limitada acabando!\n⚠️ Quando acabar, acabou mesmo!' :
          `🚨 Estoque da ${dados.temporada} indo embora!\n⚠️ Reposição incerta!`}

Não fique de fora:
✓ Premium 1.1 qualidade
✓ Personalização free
✓ Garantia inclusa

CORRE: ${dados.link}`
    }
  ];

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

  const copyToClipboard = (text: string, index: any) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const copyAllPosts = () => {
    const templatesFiltrados = templatesSelecionados === 'todos'
      ? templates
      : templates.filter(t => t.categoria === templatesSelecionados);

    const todosOsPosts = templatesFiltrados
      .map((template, index) => `=== POST ${index + 1}: ${template.nome} ===\n\n${template.gerar(formData)}\n\n`)
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
                const postContent = template.gerar(formData);
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
