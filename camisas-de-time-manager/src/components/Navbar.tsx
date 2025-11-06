"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-4xl mx-auto flex justify-center space-x-4">
        <Link href="/" className={`px-3 py-2 rounded-md text-sm font-medium ${pathname === '/' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}>
          Gerador de Posts
        </Link>
        <Link href="/encomendas" className={`px-3 py-2 rounded-md text-sm font-medium ${pathname === '/encomendas' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}>
          Encomendas
        </Link>
      </div>
    </nav>
  );
}
