import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function GenerateLink() {
  const [emp, setEmp] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');

  const navigate = useNavigate();

  const handleGenerateLink = () => {
    // Implement link generation logic here
    const link = `https://example.com/invite?emp=${emp}&date=${date}&time=${time}`;
    setGeneratedLink(link);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-primary-500 hover:text-primary-600"
      >
        &larr; Back
      </button>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Generate Link</h2>
        
        <div className="flex justify-between items-end mb-4">
          <div className="grid grid-cols-3 gap-4 flex-grow mr-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="emp">
                Employee
              </label>
              <input
                type="text"
                id="emp"
                value={emp}
                onChange={(e) => setEmp(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="date">
                Date
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="time">
                Time
              </label>
              <input
                type="time"
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <button
            onClick={handleGenerateLink}
            className="bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600 transition duration-300 h-10"
          >
            Generate Link
          </button>
        </div>

        

        {generatedLink && (
            
          <div className="mt-4">
            <hr className="my-6 border-t border-gray-300" />
            <label className="block text-sm font-medium mb-1" htmlFor="generatedLink">
              Generated Link
            </label>
            <div className="flex">
              <input
                type="text"
                id="generatedLink"
                value={generatedLink}
                readOnly
                className="w-full p-2 border border-gray-300 rounded-l-md"
              />
              <button
                onClick={handleCopyLink}
                className="bg-gray-200 px-4 py-2 rounded-r-md hover:bg-gray-300 transition duration-300"
              >
                Copy
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}