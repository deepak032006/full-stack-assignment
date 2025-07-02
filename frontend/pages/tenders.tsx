import { useEffect, useState } from 'react';
import axios from '../lib/api';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import TenderCard from '@/components/TenderCard';

interface Tender {
  id: number;
  title: string;
  description: string;
  deadline: string;
  budget: number;
  company: {
    name: string;
  };
}

export default function TendersPage() {
  const router = useRouter();
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [selectedTender, setSelectedTender] = useState<Tender | null>(null);
  const [proposal, setProposal] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('/tenders').then((res) => setTenders(res.data));
  }, []);

  const handleApply = async () => {
    const token = localStorage.getItem('token');
    if (!token || !selectedTender) return;

    try {
      const res = await axios.post(
        '/applications',
        {
          proposal,
          tenderId: selectedTender.id,
          companyId: 2 // 🔁 Replace with actual logged-in user's companyId
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setMessage('Application submitted!');
      setSelectedTender(null);
      setProposal('');
    } catch (err) {
      setMessage('Failed to submit proposal');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Available Tenders</h1>
      <Navbar />
      <TenderCard
  title="Build Website"
  description="Create a responsive company site"
  deadline="2025-07-20"
  budget={10000}
  companyName="TechFirm"
  onApply={() => setSelectedTender(tender)}
/>


      {message && <p className="mb-4 text-green-600">{message}</p>}

      <div className="grid gap-4">
        {tenders.map((tender) => (
          <div key={tender.id} className="border rounded p-4 bg-white shadow">
            <h2 className="text-lg font-semibold">{tender.title}</h2>
            <p className="text-sm text-gray-600 mb-1">By: {tender.company?.name || 'Unknown'}</p>
            <p className="text-sm">Budget: ${tender.budget} | Deadline: {new Date(tender.deadline).toLocaleDateString()}</p>
            <p className="text-sm mt-2">{tender.description}</p>

            <button
              className="mt-3 text-sm bg-blue-600 text-white px-3 py-1 rounded"
              onClick={() => setSelectedTender(tender)}
            >
              Apply
            </button>
          </div>
        ))}
      </div>

      {selectedTender && (
        <div className="mt-6 bg-gray-100 p-4 rounded">
          <h2 className="text-lg font-bold mb-2">Apply to: {selectedTender.title}</h2>
          <textarea
            placeholder="Write your proposal..."
            className="w-full p-2 border mb-2"
            rows={4}
            value={proposal}
            onChange={(e) => setProposal(e.target.value)}
          />
          <button
            onClick={handleApply}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Submit Proposal
          </button>
          <button
            className="ml-2 text-sm text-gray-600"
            onClick={() => setSelectedTender(null)}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
