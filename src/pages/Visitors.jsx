import React, { useEffect, useState, useCallback } from "react";
import add_icon from "../assets/images/icons/ic_fluent_add_white.svg";
import arrow_down_icon from "../assets/images/icons/arrow-down.svg";

import API from "../Utils/API";
import { useSelector } from "react-redux";
import { makeApiCall } from "../Utils/api-funcs";
import Modal from "../components/Modal";

export default function Visitors() {
  const [pageTitle] = useState("Visitors");
  const [tableHeaders] = useState([
    { label: "Name", key: "name" },
    { label: "Company name", key: "company_name" },
    { label: "Coming From", key: "from_company" },
    { label: "Purpose of visit", key: "purpose_of_visit_name" },
    { label: "Date and time", key: "created_at" },
  ]);

  const [allVisitors, setAllVisitors] = useState([]);
  const [filteredVisitors, setFilteredVisitors] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedFacility, setSelectedFacility] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [nextpage, setNextpage] = useState(null);

  const { tokens } = useSelector((state) => state.auth);

  const fetchVisitors = async () => {
    setLoading(true);
    try {
      const { data } = await makeApiCall("GET", "v1/vms/visitor/?page_size=20");
      console.log("Fetched visitors:", data.results);
      setAllVisitors(data.results);
      setFilteredVisitors(data.results);
      setNextpage(data.next);
    } catch (error) {
      console.error("Error fetching visitors:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    // Load more logic
    if (nextpage) {
      const { data } = await makeApiCall("GET", nextpage);
      setNextpage(data.next);
      const d = data?.results;
      setData_((prv) => [...prv, ...d]);
    }
  };

  const fetchCompanies = async () => {
    try {
      const { data } = await makeApiCall("GET", "v1/admin/company/?page_size=10");
      console.log("Fetched companies:", data.results);
      setCompanies(data.results);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  const fetchFacilities = async () => {
    try {
      const { data } = await makeApiCall("GET", "v1/admin/facility/?page_size=10");
      console.log("Fetched facilities:", data.results);
      setFacilities(data.results);
    } catch (error) {
      console.error("Error fetching facilities:", error);
    }
  };

  useEffect(() => {
    fetchVisitors();
    fetchCompanies();
    fetchFacilities();
  }, []);

  const filterVisitors = useCallback(() => {
    console.log("Filtering visitors with:", { selectedCompany, selectedFacility, selectedDate });
    let result = allVisitors;
    
    if (selectedCompany) {
      result = result.filter(visitor => {
        console.log("Visitor company:", visitor.company_name, "Selected company:", selectedCompany);
        return visitor.company_name === selectedCompany || visitor.company_id === selectedCompany;
      });
    }
    
    if (selectedFacility) {
      result = result.filter(visitor => {
        console.log("Visitor facility:", visitor.facility_name, "Selected facility:", selectedFacility);
        return visitor.facility_name === selectedFacility || visitor.facility_id === selectedFacility;
      });
    }
    
    if (selectedDate) {
      result = result.filter(visitor => {
        const visitorDate = new Date(visitor.created_at).toISOString().split('T')[0];
        console.log("Visitor date:", visitorDate, "Selected date:", selectedDate);
        return visitorDate === selectedDate;
      });
    }
    
    console.log("Filtered visitors:", result);
    setFilteredVisitors(result);
  }, [allVisitors, selectedCompany, selectedFacility, selectedDate]);

  useEffect(() => {
    filterVisitors();
  }, [filterVisitors, selectedCompany, selectedFacility, selectedDate]);

  const handleCompanyChange = (e) => {
    const companyName = e.target.options[e.target.selectedIndex].text;
    console.log("Company changed to:", companyName);
    setSelectedCompany(companyName);
  };

  const handleFacilityChange = (e) => {
    const facilityName = e.target.options[e.target.selectedIndex].text;
    console.log("Facility changed to:", facilityName);
    setSelectedFacility(facilityName);
  };

  const handleDateChange = (e) => {
    console.log("Date changed to:", e.target.value);
    setSelectedDate(e.target.value);
  };

  return (
    <div className="text-dark-400">
      <header className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-2xl">{pageTitle}</h2>
        <div className="flex items-center space-x-4">
          {tokens.is_superuser && <select
            value={selectedCompany}
            onChange={handleCompanyChange}
            className="border border-gray-300 rounded-md p-2"
          >
            <option value="">Select Company</option>
            {companies.map(c => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
          </select>}
          {/* {tokens.is_superuser && <select
            value={selectedFacility}
            onChange={handleFacilityChange}
            className="border border-gray-300 rounded-md p-2"
          >
            <option value="">Select Facility</option>
            {facilities.map(f => (
              <option key={f.id} value={f.id}>{f.name}</option>
            ))}
          </select>} */}
          
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="border border-gray-300 rounded-md p-2"
          />
        </div>
      </header>

      <div className="bg-white mt-6 rounded-lg">
        <table className="w-full">
          <thead className="text-dark-400 w-full h-10">
            <tr>
              {tableHeaders.map((header, index) => (
                <th key={index} className="text-sm pl-2 text-left">
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="mt-3 text-[#4B4B4B] text-sm">
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : filteredVisitors.length ? (
              filteredVisitors.map((r, i) => (
                <TRow key={i} data={r} />
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  No visitors found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {/* <div className="h-10 bg-white flex justify-center items-center">
          <div
            onClick={loadMore}
            disabled={!nextpage}
            className={`flex text-primary-500 gap-2 text-sm cursor-pointer ${
              !nextpage ? " opacity-25" : ""
            }`}
          >
            <img src={arrow_down_icon} className="w-[10px]" alt="" />
            Load more <img className="w-[10px]" src={arrow_down_icon} alt="" />
          </div>
        </div> */}
      </div>
    </div>
  );
}

const TRow = ({ data }) => {
  const [detailTrigger, setDetailTrigger] = useState(null);
  const openDetail = () => setDetailTrigger(true);
  const closeDetail = () => setDetailTrigger(false);
  const [date_, setDate] = useState('');

  function convertDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', options).replace(',', '').toUpperCase();
  }

  useEffect(() => {
    const d = convertDate(data.created_at);
    setDate(d);
  }, [data.created_at]);

  return (
    <>
      <tr className="border-t border-b border-dark-200 h-10 mx-1 hover:bg-light-500">
        <td className="pl-2 text-primary-500 font-semibold cursor-pointer" onClick={openDetail}>
          {data.name}
        </td>
        <td className="pl-2">{data.company_name}</td>
        <td className="pl-2">{data.from_company ? data.from_company : "-"}</td>
        <td className="pl-2">{data.purpose_of_visit_name}</td>
        <td className="pl-2">{date_}</td>
      </tr>
      {detailTrigger && (
        <Modal title={"Visitor detail"} closeM={closeDetail}>
           <div className="w-[30rem] px-8">
            <div className="mb-6 flex ">
              <img className="h-32 w-32 object-cover rounded-md" src={data.image} alt="Visitor" />
            </div>
            <table className="w-full border-collapse border border-gray-300">
              <tbody>
                <tr>
                  <td className="w-1/3 py-2 px-3 font-semibold border border-gray-300">Name</td>
                  <td className="py-2 px-3 border border-gray-300">{data.name}</td>
                </tr>
                <tr>
                  <td className="w-1/3 py-2 px-3 font-semibold border border-gray-300">Email</td>
                  <td className="py-2 px-3 break-words border border-gray-300">{data.email}</td>
                </tr>
                <tr>
                  <td className="w-1/3 py-2 px-3 font-semibold border border-gray-300">Phone</td>
                  <td className="py-2 px-3 border border-gray-300">{data.phone_number}</td>
                </tr>
                <tr>
                  <td className="w-1/3 py-2 px-3 font-semibold border border-gray-300">Company coming from</td>
                  <td className="py-2 px-3 border border-gray-300">{data.from_company ? data.from_company : '-'}</td>
                </tr>
                <tr>
                  <td className="w-1/3 py-2 px-3 font-semibold border border-gray-300">Visiting company</td>
                  <td className="py-2 px-3 border border-gray-300">{data.company_name}</td>
                </tr>
                <tr>
                  <td className="w-1/3 py-2 px-3 font-semibold border border-gray-300">Visiting contact</td>
                  <td className="py-2 px-3 border border-gray-300">{data.user_name}</td>
                </tr>
                <tr>
                  <td className="w-1/3 py-2 px-3 font-semibold border border-gray-300">Purpose of visit</td>
                  <td className="py-2 px-3 border border-gray-300">{data.purpose_of_visit_name}</td>
                </tr>
                <tr>
                  <td className="w-1/3 py-2 px-3 font-semibold border border-gray-300">Date and time</td>
                  <td className="py-2 px-3 border border-gray-300">{convertDate(data.created_at)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Modal>
      )}
    </>
  );
};