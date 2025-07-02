import { useEffect, useState } from 'react';
import axios from '../lib/api';
import { useRouter } from 'next/router';
import LogoUploader from '../components/LogoUploader';
import Navbar from '../components/Navbar';

interface Company {
  id: number;
  name: string;
  industry: string;
  description: string;
  logoUrl?: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: '',
    industry: '',
    description: '',
    logoUrl: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
      localStorage.clear();
      router.push('/');
      return;
    }

    // Fetch company
    axios
      .get('/company', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        const comp = res.data?.[0];
        if (comp) {
          setCompany(comp);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setError('');

    const trimmedForm = {
      name: form.name.trim(),
      industry: form.industry.trim(),
      description: form.description.trim(),
      logoUrl: form.logoUrl
    };

    if (!trimmedForm.name || !trimmedForm.industry || !trimmedForm.description) {
      setError('All fields are required');
      return;
    }

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
      setError('Session expired. Please login again.');
      localStorage.clear();
      router.push('/');
      return;
    }

    try {
      const res = await axios.post(
        '/company',
        {
          ...trimmedForm,
          userId: parseInt(userId, 10)
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setCompany(res.data);
    } catch (err: any) {
      const message = err.response?.data?.message || 'Something went wrong';
      setError(message);
    }
  };

  if (loading) return <p className="text-center p-8">Loading...</p>;

  return (
    <>
      <Navbar />

      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

        {company ? (
          <div className="bg-white rounded shadow p-4 mb-6">
            <h2 className="text-xl font-semibold mb-2">{company.name}</h2>
            <p className="text-gray-600 mb-1">{company.industry}</p>
            <p className="mb-3">{company.description}</p>
            {company.logoUrl ? (
              <img
                src={company.logoUrl}
                alt="Company Logo"
                className="w-32 h-32 object-cover rounded border"
              />
            ) : (
              <p className="text-sm italic text-gray-400">No logo uploaded</p>
            )}
          </div>
        ) : (
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-3">Create Company</h2>

            <input
              name="name"
              placeholder="Company Name"
              onChange={handleChange}
              className="w-full p-2 border mb-2"
              value={form.name}
            />
            <input
              name="industry"
              placeholder="Industry"
              onChange={handleChange}
              className="w-full p-2 border mb-2"
              value={form.industry}
            />
            <textarea
              name="description"
              placeholder="Description"
              onChange={handleChange}
              className="w-full p-2 border mb-2"
              value={form.description}
            />

            <LogoUploader onUpload={(url) => setForm({ ...form, logoUrl: url })} />

            {error && <p className="text-sm text-red-600 mb-2">{error}</p>}

            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Create Company
            </button>
          </div>
        )}
      </div>
    </>
  );
}
