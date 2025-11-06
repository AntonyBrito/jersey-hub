"use client";
import { useState, useEffect } from 'react';

interface Post {
  id: number;
  content: string;
  createdAt: string;
}

export default function Historico() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen text-white p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Histórico de Posts Gerados</h1>
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          {posts.length > 0 ? (
            <div className="space-y-4">
              {posts.map(post => (
                <div key={post.id} className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-sm text-gray-400 mb-2">{new Date(post.createdAt).toLocaleString()}</p>
                  <p className="whitespace-pre-wrap">{post.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center">Nenhum post gerado ainda.</p>
          )}
        </div>
      </div>
    </div>
  );
}
