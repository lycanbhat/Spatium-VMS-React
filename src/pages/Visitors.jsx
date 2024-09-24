import React, { useEffect, useRef, useState } from "react";
import add_icon from "../assets/images/icons/ic_fluent_add_white.svg";
import dots_icon from "../assets/images/icons/ic_fluent_more_vertical_24_filled.svg";
import arrow_down_icon from "../assets/images/icons/arrow-down.svg";

import Modal from "../components/Modal";

import API from "../Utils/API";
import { useSelector } from "react-redux";
import { makeApiCall } from "../Utils/api-funcs";
import CreateFacilityModal from "../components/FacilitiesComponents/CreateFacilityModal";
import EditFacilityModal from "../components/FacilitiesComponents/EditFacilityModal";

export default function Visitors() {
  const [createTrigger, setCreateTrigger] = useState(false);
  const { tokens } = useSelector((state) => state.auth);

  const [pageTitle, setPageTitle] = useState("Visitors");
  const [tableHeaders, setTableHeaders] = useState([
      { label: "Name", key: "email" },
      { label: "Company name", key: "memberSince" },
      { label: "Coming From", key: "memberSince" },
      { label: "Purpose of visit", key: "memberSince" },
      { label: "Date and time", key: "username" },
  ]);

  const [data_, setData_] = useState([]);
  const fileref = useRef(null);
  const [nextpage, setNextpage] = useState(null);

  const formCheck = () => {
    // Validation logic
  };

  const fetchFacilities = async () => {
    // Fetch logic
    const { data } = await makeApiCall("GET", "v1/vms/visitor/");
    setData_(data.results);
    setNextpage(data.next);
  };

  const fetchvisitorById = async () => {
    const { data } = await makeApiCall("GET", `v1/admin/company-visitor/?company_id=${tokens.company_id}`);
    setData_(data.results);
    setNextpage(data.next);
  }

  const fetchVisitor= async () => {
    if(tokens.is_superuser){
      fetchFacilities();
    } else {
      fetchvisitorById();
    }
  }

  const openCreateModal = () => {
    setCreateTrigger(true);
  };
  const closeCreateModal = () => {
    setCreateTrigger(false);
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

  useEffect(() => {
   fetchVisitor();
  }, []);

  return (
    <div className="text-dark-400">
      <header className="flex items-center justify-between">
        <h2 className="font-semibold text-2xl">{pageTitle}</h2>
        {/* <button
          onClick={openCreateModal}
          className="h-8 bg-primary-500 text-sm flex items-center gap-2 px-3 rounded-md text-white"
        >
          <img className="w-3" src={add_icon} alt="" />
          Add new facility
        </button> */}
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
            {/* Table rows */}
            {data_.length ? (
              data_.map((r, i) => {
                return <TRow data={r} fetchFacilities={fetchFacilities} />;
              })
            ) : (
              <tr>
                <td colSpan={4} className="text-center">
                  Loading...
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="h-10 bg-white flex justify-center items-center">
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
        </div>
      </div>
      {/* Modals */}
      {createTrigger && (
        <CreateFacilityModal
          closeCreateModal={closeCreateModal}
          fetchFacilities={fetchFacilities}
        />
      )}
    </div>
  );
}

const TRow = ({ data, fetchFacilities }) => {
  const [detailTrigger, setDetailTrigger] = useState(null);
  const openDetail = () => setDetailTrigger(true);
  const closeDetail = () => setDetailTrigger(false);
  const [date_,setDate] = useState('')
  const { tokens } = useSelector((state) => state.auth);
  function convertDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', options).replace(',', '').toUpperCase();
  }
  useEffect(()=>{
    // debugger
    const d = convertDate(data.created_at)
    setDate(d)
  },[])
  return (
    <>
      <tr className="border-t border-b border-dark-200 h-10 mx-1 hover:bg-light-500">
        {/* <td className="pl-2">
          <div className="flex text-sm gap-2 items-center">
            <p className=" text-primary-500">{data.id}</p>
          </div>
        </td> */}
        <td className="pl-2 text-primary-500 font-semibold cursor-pointer" onClick={openDetail}>
          {data.name}
        </td>
        {/* {tokens.is_superuser && <td className="pl-2">{data.company_name}</td>} */}
        <td className="pl-2">{data.company_name}</td>
        <td className="pl-2">{data.from_company ? data.from_company : "-"}</td>
        <td className="pl-2">{data.purpose_of_visit_name}</td>
        <td className="pl-2">{date_}</td>
        {/* <td className="relative">
          <div
            onClick={() => setOptionTrigger((prv) => !prv)}
            className="cursor-pointer w-6 h-6 bg-primary-100 flex justify-center items-center rounded-md"
          >
            <img src={dots_icon} alt="" />
          </div>
          {optionTrigger ? (
            <div className="absolute z-10 right-8 top-8 py-4 px-3 bg-white shadow-[0_3px_6px_#0000001F] w-36">
              <div className="cursor-pointer" onClick={openEdit}>
                Edit
              </div>
              <div className="cursor-pointer" onClick={openDelete}>
                Delete
              </div>
            </div>
          ) : null}
        </td> */}
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
