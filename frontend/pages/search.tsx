import { useState } from 'react';
import axios from '../lib/api';
import Navbar from '@/components/Navbar';
import CompanyCard from '@/components/CompanyCard';

interface Company {
  id: number;
  name: string;
  industry: string;
  description: string;
  logoUrl?: string;
  services: { name: string }[];
}

export default function SearchPage() {
  const [query, setQuery] = useState({ name: '', industry: '', service: '' });
  const [results, setResults] = useState<Company[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery({ ...query, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    const params = new URLSearchParams();
    if (query.name) params.append('name', query.name);
    if (query.industry) params.append('industry', query.industry);
    if (query.service) params.append('service', query.service);

    try {
      const res = await axios.get(`/search?${params.toString()}`);
      setResults(res.data);
    } catch (err) {
      console.error('Search error', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Search Companies</h1>
      <Navbar />
      <CompanyCard
  name="SoftDev Inc."
  industry="IT Services"
  description="Building modern web apps"
  logoUrl="https://..."
  services={["React", "Node", "UI/UX"]}
/>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          name="name"
          placeholder="Search by name"
          value={query.name}
          onChange={handleChange}
          className="border p-2"
        />
        <input
          name="industry"
          placeholder="Search by industry"
          value={query.industry}
          onChange={handleChange}
          className="border p-2"
        />
        <input
          name="service"
          placeholder="Search by service"
          value={query.service}
          onChange={handleChange}
          className="border p-2"
        />
      </div>

      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-6"
      >
        Search
      </button>

      <div className="space-y-4">
        {results.map((company) => (
          <div key={company.id} className="p-4 border rounded bg-white shadow">
            <h2 className="text-xl font-semibold">{company.name}</h2>
            <p className="text-sm text-gray-600 mb-1">{company.industry}</p>
            <p className="mb-2">{company.description}</p>
            {company.logoUrl && (
              <img src={company.logoUrl} alt="Logo" className="w-28 h-28 object-cover rounded" />
            )}
            {company.services.length > 0 && (
              <p className="text-sm text-gray-700">
                Services: {company.services.map((s) => s.name).join(', ')}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
