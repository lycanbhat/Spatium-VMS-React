import React, { useEffect, useState } from "react";
import searchIco from "../assets/images/icons/searchIco.svg";
import addIcoW from "../assets/images/icons/ic_fluent_add_white.svg";
import editIcon from "../assets/images/icons/edit.svg";
import uploadIcon from "../assets/images/icons/upload.svg";
import deleteIcon from "../assets/images/icons/delete.svg";
import API from '../Utils/API';
import { makeApiCall } from "../Utils/api-funcs";

export default function Companies() {
  const [createTr, setCreateTr] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [data_, setData] = useState();
  const [facilities, setFacilities] = useState([]);
  const [logoPreview, setLogoPreview] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    spoc_name: "",
    spoc_email: "",
    spoc_phone_number: "",
    gstin: "",
    facility: "",
    logo: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setLogoPreview(URL.createObjectURL(file));
      setFormData((prev) => ({ ...prev, logo: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitData = new FormData();
    for (const key in formData) {
      if (key === "logo" && formData[key] && typeof formData[key] === "string") {
        continue;
      }
      submitData.append(key, formData[key]);
    }

    if (typeof formData.logo === "string") {
      submitData.append("logo_url", formData.logo);
    } else if (formData.logo) {
      submitData.append("logo", formData.logo);
    }

    try {
      if (isEditing) {
        await API.put(`v1/admin/company/${editId}/`, submitData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await API.post("v1/admin/company/", submitData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      getData(currentPage);
      setCreateTr(false);
      setIsEditing(false);
      setFormData({
        name: "",
        address: "",
        spoc_name: "",
        spoc_email: "",
        spoc_phone_number: "",
        gstin: "",
        facility: "",
        logo: null,
      });
      setLogoPreview(null);
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };

  const search = async(text) => {
    const {data} = await makeApiCall('GET',`v1/admin/company/?search=${text}&page_size=10`)
    setData(data)
  }

  const getFacilities = async () => {
    const { data } = await API.get("v1/admin/facility/?page_size=500");
    setFacilities(data.results);
  };

  const getData = async (page = 1) => {
    const { data } = await API.get(`v1/admin/company/?page_size=10&page=${page}`);
    setData(data);
  };

  const createFn = () => {
    setCreateTr((prev) => !prev);
    setIsEditing(false);
    setFormData({
      name: "",
      address: "",
      spoc_name: "",
      spoc_email: "",
      spoc_phone_number: "",
      gstin: "",
      facility: "",
      logo: null,
    });
    setLogoPreview(null);
  };

  const handleEdit = (company) => {
    setCreateTr(true);
    setIsEditing(true);
    setEditId(company.id);
    setFormData({
      name: company.name,
      address: company.address,
      spoc_name: company.spoc_name,
      spoc_email: company.spoc_email,
      spoc_phone_number: company.spoc_phone_number,
      gstin: company.gstin,
      facility: company.facility,
      logo: company.logo,
    });
    setLogoPreview(company.logo);
  };

  useEffect(() => {
    getData(currentPage);
    getFacilities();
  }, [currentPage]);

  const Pagination = ({ currentPage, totalCount, pageSize, onPageChange }) => {
    const totalPages = Math.ceil(totalCount / pageSize);
  
    if (totalPages === 1) return null;
  
    const renderPages = () => {
      const pages = [];
  
      if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        if (currentPage > 3) {
          pages.push("...");
        }
  
        const startPage = Math.max(2, currentPage - 1);
        const endPage = Math.min(totalPages - 1, currentPage + 1);
  
        for (let i = startPage; i <= endPage; i++) {
          pages.push(i);
        }
  
        if (currentPage < totalPages - 2) {
          pages.push("...");
        }
  
        pages.push(totalPages);
      }
  
      return pages;
    };
  
    return (
      <div className="flex justify-center space-x-2 mt-4">
        {renderPages().map((page, index) => (
          <React.Fragment key={index}>
            {page === "..." ? (
              <span className="px-4 py-2">...</span>
            ) : (
              <button
                onClick={() => onPageChange(page)}
                className={`px-4 py-2 rounded-full ${page === currentPage ? "bg-primary-500 text-white cursor-not-allowed" : "bg-gray-200"}`}
                disabled={page === currentPage}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };
  

  return (
    <div>
      <div className="flex pt-2 h-10 mb-3">
        <div className="flex w-full gap-1 overflow-x-hidden transition-all duration-300">
          <div className="grow flex h-full overflow-hidden">
            <input
              type="text"
              className="w-full h-full border border-gray-300 rounded outline-none px-1 text-xs"
              placeholder="Search.."
              onChange={(e)=>search(e.target.value)}
            />
          </div>
          <button className="aspect-square p-1 border border-primary-500 rounded">
            <img src={searchIco} alt="search" />
          </button>
          <button
            onClick={createFn}
            className="aspect-square p-1 bg-gray-500 rounded flex justify-center items-center"
          >
            <img src={addIcoW} alt="add" />
          </button>
        </div>
      </div>
      {data_ && !createTr && (
        <div className="overflow-x-auto rounded-lg border shadow-md h-[75vh] flex flex-col">
          <table className="min-w-full">
            <thead className="border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SPOC Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SPOC Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data_ &&
                data_.results.map((e, i) => (
                  <tr className="hover:bg-primary-100" key={i}>
                    <td className="text-center px-6 py-4 whitespace-nowrap">{e.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{e.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{e.spoc_email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{e.spoc_phone_number}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-1">
                        <span
                          onClick={() => handleEdit(e)}
                          className="p-1 aspect-square rounded-md hover:bg-gray-300 hover:cursor-pointer"
                        >
                          <img src={editIcon} className="h-4" alt="Edit" />
                        </span>
                        <span
                          onClick={() => {}}
                          className="p-1 aspect-square rounded-md bg-red-300 hover:cursor-pointer"
                        >
                          <img src={deleteIcon} className="h-4" alt="Delete" />
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="flex justify-end pr-3">
            <Pagination
              currentPage={currentPage}
              totalCount={data_.count}
              pageSize={10}
              onPageChange={setCurrentPage}
            />

          </div>
        </div>
      )}
      {createTr && (
        <div className="border rounded-lg p-4 shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Logo</label>
              <div className="flex items-center">
                <button
                  type="button"
                  className="w-16 h-16 bg-gray-100 flex justify-center items-center border-2 border-dashed border-gray-400 rounded-md"
                >
                  <label htmlFor="logo-upload" className="cursor-pointer flex flex-col items-center justify-center">
                    {logoPreview ? (
                      <img src={logoPreview} alt="Logo Preview" className="h-full" />
                    ) : (
                      <>
                        <img src={uploadIcon} alt="Upload Icon" className="h-8 w-8" />
                        <span className="text-xs mt-1">Upload Logo</span>
                      </>
                    )}
                    <input
                      type="file"
                      id="logo-upload"
                      accept="image/*"
                      className="sr-only"
                      onChange={handleLogoUpload}
                    />
                  </label>
                </button>
                {logoPreview && (
                  <button
                    type="button"
                    onClick={() => {
                      setLogoPreview(null);
                      setFormData((prev) => ({ ...prev, logo: null }));
                    }}
                    className="ml-2 text-red-500 text-xs underline"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
            {[
              { label: "Name", name: "name", type: "text" },
              { label: "Address", name: "address", type: "text" },
              { label: "SPOC Name", name: "spoc_name", type: "text" },
              { label: "SPOC Email", name: "spoc_email", type: "email" },
              { label: "SPOC Phone Number", name: "spoc_phone_number", type: "text" },
              { label: "GSTIN", name: "gstin", type: "text" },
            ].map((field) => (
              <div key={field.name} className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded px-2 py-1 w-full"
                />
              </div>
            ))}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Facility</label>
              <select
                name="facility"
                value={formData.facility}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-2 py-1 w-full"
              >
                <option value="">Select Facility</option>
                {facilities.map((facility) => (
                  <option key={facility.id} value={facility.id}>
                    {facility.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setCreateTr(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button type="submit" className="bg-primary-500 text-white px-4 py-2 rounded">
                {isEditing ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
