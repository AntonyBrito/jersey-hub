import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'encomendas.json');

interface Encomenda {
  id: number;
  nome: string;
  modelo: string;
  status: 'Pendente' | 'Concluído' | 'Cancelado';
  dataCriacao: string;
}

const readData = (): Encomenda[] => {
  try {
    const jsonData = fs.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(jsonData);
  } catch {
    return [];
  }
};

const writeData = (data: Encomenda[]) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

export async function GET() {
  const data = readData();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const { nome, modelo } = await request.json();
  const encomendas = readData();
  const novaEncomenda: Encomenda = {
    id: Date.now(),
    nome,
    modelo,
    status: 'Pendente',
    dataCriacao: new Date().toISOString(),
  };
  encomendas.push(novaEncomenda);
  writeData(encomendas);
  return NextResponse.json(novaEncomenda, { status: 201 });
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  let encomendas = readData();
  const index = encomendas.findIndex(e => e.id === id);
  if (index === -1) {
    return NextResponse.json({ message: 'Encomenda não encontrada' }, { status: 404 });
  }
  encomendas = encomendas.filter(e => e.id !== id);
  writeData(encomendas);
  return NextResponse.json({ message: 'Encomenda removida' }, { status: 200 });
}

export async function PUT(request: Request) {
  const { id, nome, modelo, status } = await request.json();
  let encomendas = readData();
  const index = encomendas.findIndex(e => e.id === id);
  if (index === -1) {
    return NextResponse.json({ message: 'Encomenda não encontrada' }, { status: 404 });
  }
  encomendas[index] = { ...encomendas[index], nome, modelo, status };
  writeData(encomendas);
  return NextResponse.json(encomendas[index], { status: 200 });
}

export async function PATCH(request: Request) {
  const { id, status } = await request.json();
  let encomendas = readData();
  const index = encomendas.findIndex(e => e.id === id);
  if (index === -1) {
    return NextResponse.json({ message: 'Encomenda não encontrada' }, { status: 404 });
  }
  encomendas[index].status = status;
  writeData(encomendas);
  return NextResponse.json(encomendas[index], { status: 200 });
}
