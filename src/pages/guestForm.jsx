import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function GuestForm() {
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [employee, setEmployee] = useState('');
  const [puposeofVisit, setPurposeOfVisit] = useState('');
  const [fromCompany, setFromCompany] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setEmployee(searchParams.get('emp') || '');
    setDate(searchParams.get('date') || '');
    setTime(searchParams.get('time') || '');
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement form submission logic here
    console.log('Form submitted', { guestName, guestPhone, guestEmail, employee, date, time });
    // You would typically make an API call here to save the guest information
  };

  return (
    <div className="flex h-screen">
      {/* Left side - Company Branding */}
      <div className="w-1/2 bg-primary-500 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-white">Your Company Logo</h1>
      </div>

      {/* Right side - Guest Form */}
      <div className="w-1/2 p-8 overflow-auto">
        <h2 className="text-2xl font-semibold mb-6">Guest Information</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="guestName">
              Name
            </label>
            <input
              type="text"
              id="guestName"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="guestPhone">
              Phone Number
            </label>
            <input
              type="tel"
              id="guestPhone"
              value={guestPhone}
              onChange={(e) => setGuestPhone(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="guestEmail">
              Email
            </label>
            <input
              type="email"
              id="guestEmail"
              value={guestEmail}
              onChange={(e) => setGuestEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="guestEmail">
              Purpose of Visit
            </label>
            <input
              type="email"
              id="purposeOfVisit"
              value={puposeofVisit}
              onChange={(e) => setPurposeOfVisit(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="guestEmail">
              From Company
            </label>
            <input
              type="email"
              id="fromCompany"
              value={fromCompany}
              onChange={(e) => setFromCompany(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <p><strong>Employee:</strong> {employee}</p>
            <p><strong>Date:</strong> {date}</p>
            <p><strong>Time:</strong> {time}</p>
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600 transition duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}