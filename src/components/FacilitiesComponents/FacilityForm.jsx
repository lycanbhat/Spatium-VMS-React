import React, { useEffect, useState } from "react";
import check_icon from "../../assets/images/icons/ic_fluent_checkmark_24_regular.svg";
import close_primaryc_icon from "../../assets/images/icons/close_primaryc.svg";
import { makeApiCall } from "../../Utils/api-funcs";

const FacilityForm = ({ formData, errors, handleFormdata, submitAction, closeAction }) => {
  const [cities,setCities] = useState([])
  const [zones,setZones] = useState([])
  useEffect(()=>{
    const getCities = async() => {
      const {data} =await makeApiCall('GET','v1/admin/city/?page_size=500')
      setCities(data.results)
    }
    const getZones = async() => {
      const {data} =await makeApiCall('GET','v1/admin/zone/?page_size=500')
      setZones(data.results)
    }
    getCities()
    getZones()
  },[])
  return (
    <form onSubmit={submitAction} className="w-[60vw] lg:w-[50vw] 2xl:w-[40vw] px-5 py-2">
      <div className="w-full flex flex-col gap-2">
        <div className="mt-2 flex flex-col">
          <label htmlFor="name" className="text-sm text-dark-400 font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name || ""}
            onChange={(e) => handleFormdata("name", e.target.value)}
            className="mt-2 px-2 border border-[#E0E0E0] outline-dark-500 rounded-md h-10"
          />
          <p className="text-xs text-red-500">{errors.name}</p>
        </div>
        <div className="mt-2 flex flex-col">
          <label htmlFor="city" className="text-sm text-dark-400 font-medium">
            City
          </label>
          <select
            id="city"
            value={formData.city || ""}
            onChange={(e) => handleFormdata("city", e.target.value)}
            className="mt-2 px-2 border border-[#E0E0E0] outline-dark-500 rounded-md h-10"
          >
            <option value="" disabled>
              Select City
            </option>
            {cities.map((city, index) => (
              <option key={index} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
          <p className="text-xs text-red-500">{errors.city}</p>
        </div>
        <div className="mt-2 flex flex-col">
          <label htmlFor="zone" className="text-sm text-dark-400 font-medium">
            Zone
          </label>
          <select
            id="zone"
            value={formData.zone || ""}
            onChange={(e) => handleFormdata("zone", e.target.value)}
            className="mt-2 px-2 border border-[#E0E0E0] outline-dark-500 rounded-md h-10"
          >
            <option value="" disabled>
              Select Zone
            </option>
            {zones.map((zone, index) => (
              <option key={index} value={zone.id}>
                {zone.name}
              </option>
            ))}
          </select>
          <p className="text-xs text-red-500">{errors.zone}</p>
        </div>
      </div>
      <div className="relative pt-3 px-6 border-t border-[#EFEFEF] flex justify-end items-center h-10 gap-2">
        <button
          type="submit"
          className="h-8 bg-primary-500 text-sm flex items-center gap-2 px-3 rounded-md text-white border border-transparent"
        >
          <img src={check_icon} alt="Check Icon" />
          Save
        </button>
        <button
          type="button"
          onClick={closeAction}
          className="h-8 text-primary-500 border border-[#585858] text-sm flex items-center gap-2 px-3 rounded-md"
        >
          <img src={close_primaryc_icon} alt="Close Icon" />
          Cancel
        </button>
      </div>
    </form>
  );
};

export default FacilityForm;
