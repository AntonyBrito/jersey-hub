import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'encomendas.json');

// Função para ler os dados do arquivo
const readData = () => {
  try {
    const jsonData = fs.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(jsonData);
  } catch {
    return [];
  }
};

// Função para escrever os dados no arquivo
const writeData = (data: any) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

export async function GET() {
  const data = readData();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const { nome, modelo } = await request.json();
  const encomendas = readData();
  const novaEncomenda = { nome, modelo };
  encomendas.push(novaEncomenda);
  writeData(encomendas);
  return NextResponse.json(novaEncomenda, { status: 201 });
}
