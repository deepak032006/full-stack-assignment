interface TenderCardProps {
  title: string;
  description: string;
  deadline: string;
  budget: number;
  companyName?: string;
  onApply?: () => void;
}

export default function TenderCard({
  title,
  description,
  deadline,
  budget,
  companyName,
  onApply,
}: TenderCardProps) {
  return (
    <div className="border p-4 rounded shadow bg-white">
      <h3 className="text-lg font-semibold">{title}</h3>
      {companyName && <p className="text-sm text-gray-500">By: {companyName}</p>}
      <p className="text-sm mb-1">Deadline: {new Date(deadline).toLocaleDateString()}</p>
      <p className="text-sm mb-2">Budget: ${budget}</p>
      <p className="text-sm text-gray-700 mb-2">{description}</p>
      {onApply && (
        <button
          className="bg-blue-600 text-white px-3 py-1 text-sm rounded"
          onClick={onApply}
        >
          Apply
        </button>
      )}
    </div>
  );
}
