import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeApiCall } from '../Utils/api-funcs';

export default function PreInviteGuest() {
  const [pageTitle] = useState("Private Guest");
  const [employeeName, setEmployeeName] = useState('');
  const [employeeList, setEmployeeList] = useState([]);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [puposeofVisit, setPurposeOfVisit] = useState('');
  const [fromCompany, setFromCompany] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Generate Link Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [linkEmp, setLinkEmp] = useState('');
  const [linkDate, setLinkDate] = useState('');
  const [linkTime, setLinkTime] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');

  const { tokens } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await makeApiCall("GET", "v1/admin/employees/");
      console.log("Fetched employees:", response);
      setEmployeeList(response.data || []);
    } catch (error) {
      console.error("Error fetching employees:", error);
      setError("Failed to fetch employees. Please try again later.");
      setEmployeeList([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await makeApiCall("POST", "v1/vms/pre-invite/", {
        employee_name: employeeName,
        visit_date: date,
        visit_time: time,
        guest_name: guestName,
        guest_phone: guestPhone,
        guest_email: guestEmail,
        purpose_of_visit: puposeofVisit,
        from_company: fromCompany
      });
      console.log("Pre-invite guest created:", response);
      alert("Invite sent successfully!");
      resetForm();
    } catch (error) {
      console.error("Error creating pre-invite guest:", error);
      setError("Failed to send invite. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmployeeName('');
    setDate('');
    setTime('');
    setGuestName('');
    setGuestPhone('');
    setGuestEmail('');
    setSearchTerm('');
  };

   const handleGenerateLink = () => {
    const link = `http://localhost:3000/guest-form?emp=${encodeURIComponent(linkEmp)}&date=${encodeURIComponent(linkDate)}&time=${encodeURIComponent(linkTime)}`;
    setGeneratedLink(link);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    alert('Link copied to clipboard!');
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setGeneratedLink('');
    setLinkEmp('');
    setLinkDate('');
    setLinkTime('');
  };

  const filteredEmployees = employeeList.filter(employee => 
    employee && employee.name && employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  return (
    <div className="text-dark-400">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-2xl">{pageTitle}</h2>
        <button
          onClick={openModal}
          className="bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600 transition duration-300"
        >
          Generate Link
        </button>
      </div>

      <div className="bg-white mt-6 rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-wrap -mx-2">
            <div className="w-full md:w-1/2 px-2 mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="employeeName">
                Employee Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Search employees..."
                />
                {searchTerm && (
                  <ul className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-md max-h-60 overflow-auto">
                    {filteredEmployees.map((employee) => (
                      <li
                        key={employee.id}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setEmployeeName(employee.name);
                          setSearchTerm(employee.name);
                        }}
                      >
                        {employee.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="w-full md:w-1/4 px-2 mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="date">
                Date
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="w-full md:w-1/4 px-2 mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="time">
                Time
              </label>
              <input
                type="time"
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-2">
            <div className="w-full md:w-1/2 px-2 mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="guestName">
                Guest Name
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
            <div className="w-full md:w-1/2 px-2 mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="guestPhone">
                Guest Phone Number
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
          </div>

          <div className="flex flex-wrap -mx-2">
            <div className="w-full md:w-1/2 px-2 mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="guestName">
                Purpose of Visit
              </label>
              <input
                type="text"
                id="purposeOfVisit"
                value={puposeofVisit}
                onChange={(e) => setPurposeOfVisit(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="w-full md:w-1/2 px-2 mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="guestPhone">
                From Company
              </label>
              <input
                type="tel"
                id="fromCompany"
                value={fromCompany}
                onChange={(e) => setFromCompany(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          <div className="w-full mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="guestEmail">
              Guest Email
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

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600 transition duration-300"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Invite'}
            </button>
          </div>
        </form>
      </div>

      {/* Generate Link Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-md p-6 w-3/4 max-w-2xl">
            <h2 className="text-2xl font-semibold mb-4">Generate Link</h2>
            
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="linkEmp">
                  Employee
                </label>
                <input
                  type="text"
                  id="linkEmp"
                  value={linkEmp}
                  onChange={(e) => setLinkEmp(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="linkDate">
                  Date
                </label>
                <input
                  type="date"
                  id="linkDate"
                  value={linkDate}
                  onChange={(e) => setLinkDate(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="linkTime">
                  Time
                </label>
                <input
                  type="time"
                  id="linkTime"
                  value={linkTime}
                  onChange={(e) => setLinkTime(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="flex justify-end mb-6">
              <button
                onClick={handleGenerateLink}
                className="bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600 transition duration-300"
              >
                Generate Link
              </button>
            </div>

            <hr className="my-6 border-t border-gray-300" />

            {generatedLink && (
              <div className="mt-4">
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

            <div className="mt-6 flex justify-end">
              <button
                onClick={closeModal}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}