import React, { useEffect, useRef, useState } from "react";
import add_icon from "../assets/images/icons/ic_fluent_add_white.svg";
import dots_icon from "../assets/images/icons/ic_fluent_more_vertical_24_filled.svg";
import arrow_down_icon from "../assets/images/icons/arrow-down.svg";
import { makeApiCall } from "../Utils/api-funcs";
import { useSelector } from "react-redux";
import CreateEmployeeModal from "../components/EmployeeCom/CreateEmployee";
import EditEmployeeModal from "../components/EmployeeCom/EditEmployeeForm";
import Modal from "../components/Modal";

export default function Mycompany() {
  const { tokens } = useSelector((state) => state.auth);
  const [createTrigger, setCreateTrigger] = useState(false);

  const [pageTitle, setPageTitle] = useState(tokens?.company_name?tokens?.company_name:"My company");
  const [tableHeaders, setTableHeaders] = useState([
    // { label: "ID", key: "username" },
    { label: "First name" },
    { label: "Last Name" },
    { label: "Email" },
    { label: "Phone" },
    { label: "", key: "actions" },
  ]);

  const [data_, setData_] = useState([]);
  const fileref = useRef(null);
  const [nextpage, setNextpage] = useState(null);

  const formCheck = () => {
    // Validation logic
  };
  const getCompanies = async () => {
    const { data } = await makeApiCall(
      "GET",
      `v1/admin/employee/?company_id=${tokens.company_id}`
    );
    setData_(data.results);
    setNextpage(data.next);
  };
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
    getCompanies();
  }, []);
  return (
    <div className="text-dark-400">
      <header className="flex items-center justify-between">
        <h2 className="font-semibold text-2xl">{pageTitle}</h2>
        <button
          onClick={openCreateModal}
          className="h-8 bg-primary-500 text-sm flex items-center gap-2 px-3 rounded-md text-white"
        >
          <img className="w-3" src={add_icon} alt="" />
          Add new employee
        </button>
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
                return <TRow company_id={tokens.company_id} data={r} getCompanies={getCompanies} />;
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
        <CreateEmployeeModal
          closeCreateModal={closeCreateModal}
          getCompanies={getCompanies}
          company_id={tokens.company_id}
        />
      )}
    </div>
  );
}

const TRow = ({ data, getCompanies, company_id }) => {
  const [optionTrigger, setOptionTrigger] = useState(null);
  const [editTrigger, setEditTrigger] = useState(false);
  const [delteTrigger, setDelteTrigger] = useState(false);
  const openEdit = () => setEditTrigger(true);
  const closeEdit = () => setEditTrigger(false);
  const openDelete = () => setDelteTrigger(true);
  const closeDelete = () => setDelteTrigger(false);

  const deleteFac = async () => {
    try {
      await makeApiCall("DELETE", `v1/admin/employee/${data.id}/?company_id=${company_id}`);
      getCompanies();
      closeDelete();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <tr className="border-t border-b border-dark-200 h-10 mx-1 hover:bg-light-500">
        {/* <td className="pl-2">
          <div className="flex text-sm gap-2 items-center">
            <p className=" text-primary-500">{data.id}</p>
          </div>
        </td> */}
        <td className="pl-2">
          <div className="flex gap-1 items-center">
            {
              data.profile_picture && 
            <img
              src={data.profile_picture}
              className="w-8 rounded-full object-cover aspect-square"
              alt=""
            />
            }
            {data.first_name}
          </div>
        </td>
        <td className="pl-2">{data.last_name}</td>
        <td className="pl-2">{data.email}</td>
        <td className="pl-2">{data.phone_number}</td>
        <td className="relative">
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
        </td>
      </tr>
      {editTrigger && (
        <EditEmployeeModal
          employee={data}
          company_id={company_id}
          closeEditModal={closeEdit}
          getCompanies={getCompanies}
        />
      )}
      {delteTrigger && (
        <Modal closeM={closeDelete} title={"Confirm Delete?"}>
          <div className="px-6 w-[20rem] flex gap-2 justify-end py-3">
            <button
              onClick={deleteFac}
              className="h-8 bg-red-600 text-sm flex items-center gap-2 px-3 rounded-md text-white border border-transparent"
            >
              Delete
            </button>
            <button onClick={closeDelete}>Cancel</button>
          </div>
        </Modal>
      )}
    </>
  );
};
