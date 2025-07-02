import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setAuthenticated(!!token);
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  if (!authenticated) return null;

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center">
      <div className="font-bold text-lg">TenderPlatform</div>
      <div className="space-x-4">
        <Link href="/dashboard" className="hover:underline">Dashboard</Link>
        <Link href="/tenders" className="hover:underline">Tenders</Link>
        <Link href="/search" className="hover:underline">Search</Link>
        <button onClick={logout} className="bg-white text-blue-600 px-2 py-1 rounded">Logout</button>
      </div>
    </nav>
  );
}
