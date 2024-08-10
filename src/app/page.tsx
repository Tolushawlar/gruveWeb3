"use client";
import { useState } from 'react';
import AuthButton from './components/AuthButton';

export default function HomePage() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files?.[0] || null);
  };

  const uploadFile = async () => {
    if (!file) {
      alert('Please select a file first.');
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('https://api.akord.com/files', {
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'Api-Key': `${process.env.NEXT_PUBLIC_ARWEAVE_API_KEY}` || '',
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('File upload failed');
      }

      const result = await response.json();
      alert('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold">Welcome to the Home Page</h1>
      <p>You are successfully signed up and logged in.</p>
      <AuthButton />
      <input
        type="file"
        onChange={handleFileChange}
        className="mt-4 p-5 cursor-pointer"
      />
      <button
        onClick={uploadFile}
        className={`mt-4 px-4 py-2 bg-blue-500 text-white rounded ${isUploading ? 'opacity-50' : ''}`}
        disabled={isUploading}
      >
        {isUploading ? 'Uploading...' : 'Upload File'}
      </button>
    </div>
  );
}
