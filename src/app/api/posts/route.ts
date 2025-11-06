import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'posts.json');

interface Post {
  id: number;
  content: string;
  createdAt: string;
}

const readData = (): Post[] => {
  try {
    const jsonData = fs.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(jsonData);
  } catch {
    return [];
  }
};

const writeData = (data: Post[]) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

export async function GET() {
  const data = readData();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const posts = await request.json();
  const storedPosts = readData();
  const updatedPosts = [...posts, ...storedPosts];
  writeData(updatedPosts);
  return NextResponse.json({ message: 'Posts salvos com sucesso' }, { status: 201 });
}
