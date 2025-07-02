interface CompanyCardProps {
  name: string;
  industry: string;
  description: string;
  logoUrl?: string;
  services?: string[];
}

export default function CompanyCard({
  name,
  industry,
  description,
  logoUrl,
  services,
}: CompanyCardProps) {
  return (
    <div className="p-4 border rounded bg-white shadow flex gap-4">
      {logoUrl ? (
        <img
          src={logoUrl}
          alt={`${name} Logo`}
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/default-logo.png'; // fallback image
          }}
          className="w-24 h-24 object-cover rounded border"
        />
      ) : (
        <div className="w-24 h-24 flex items-center justify-center border rounded bg-gray-100 text-sm text-gray-500">
          No Logo
        </div>
      )}

      <div className="flex-1">
        <h2 className="text-xl font-semibold">{name}</h2>
        <p className="text-sm text-gray-600">{industry}</p>
        <p className="my-2 text-sm">{description}</p>
        {services && services.length > 0 && (
          <p className="text-sm text-gray-700">
            <strong>Services:</strong> {services.join(', ')}
          </p>
        )}
      </div>
    </div>
  );
}
