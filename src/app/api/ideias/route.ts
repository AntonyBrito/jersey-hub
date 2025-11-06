import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'ideias.json');

interface Idea {
  id: number;
  text: string;
  createdAt: string;
}

const readData = (): Idea[] => {
  try {
    const jsonData = fs.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(jsonData);
  } catch {
    return [];
  }
};

const writeData = (data: Idea[]) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

export async function GET() {
  const data = readData();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const { text } = await request.json();
  const ideas = readData();
  const newIdea: Idea = {
    id: Date.now(),
    text,
    createdAt: new Date().toISOString(),
  };
  ideas.push(newIdea);
  writeData(ideas);
  return NextResponse.json(newIdea, { status: 201 });
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  let ideas = readData();
  const index = ideas.findIndex(i => i.id === id);
  if (index === -1) {
    return NextResponse.json({ message: 'Ideia não encontrada' }, { status: 404 });
  }
  ideas = ideas.filter(i => i.id !== id);
  writeData(ideas);
  return NextResponse.json({ message: 'Ideia removida' }, { status: 200 });
}
