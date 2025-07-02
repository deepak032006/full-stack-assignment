import { useState } from 'react';
import axios from '../lib/api';

interface Props {
  onUpload: (url: string) => void;
}

export default function LogoUploader({ onUpload }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
    }
  };

  const uploadImage = async () => {
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await axios.post('/upload/logo', formData);
      onUpload(res.data.url); // Pass URL to parent
    } catch (err) {
      console.error('Upload failed', err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mb-4">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {preview && (
        <div className="mt-2">
          <img src={preview} alt="Preview" className="w-28 h-28 rounded border object-cover" />
        </div>
      )}
      <button
        onClick={uploadImage}
        disabled={!file || uploading}
        className="mt-2 bg-blue-600 text-white px-3 py-1 rounded disabled:opacity-50"
      >
        {uploading ? 'Uploading...' : 'Upload Logo'}
      </button>
    </div>
  );
}
