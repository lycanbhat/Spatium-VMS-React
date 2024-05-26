import React, { useState } from "react";
import FacilityRow from "./FacilityRow";

// import  from "../assets/images/icons/ic_fluent_building_24_regular.svg";
import arrow_down_icon from "../../assets/images/icons/arrow-down.svg";

const FacilitiesTable = ({ facilities, loadMoreData }) => {
  return (
    <div className="bg-white mt-6 rounded-lg max-h-[70vh] overflow-auto">
      <table className="w-full">
        <thead className="text-dark-400 w-full h-10">
          <tr>
            <th className="text-sm pl-2">
              <div className="flex gap-5">
                {/* <img className="w-4" src={} alt="Facilities Icon" /> */}
                Name
              </div>
            </th>
            <th className="text-sm text-left">City</th>
            <th className="text-sm text-left">Zone</th>
            <th className="text-sm text-left"></th>
          </tr>
        </thead>
        <tbody className="mt-3 text-[#4B4B4B] text-sm">
          {facilities.length ? (
            facilities.map((facility, index) => (
              <FacilityRow key={index} facility={facility} index={index} />
            ))
          ) : (
            <tr>
              <th colSpan={4}>No records found</th>
            </tr>
          )}
        </tbody>
      </table>
      <div className="h-10 bg-white flex justify-center items-center">
        <div className="flex text-primary-500 gap-2 text-sm cursor-pointer" onClick={loadMoreData}>
          <img src={arrow_down_icon} className="w-[10px]" alt="Arrow Down Icon" />
          Load more <img className="w-[10px]" src={arrow_down_icon} alt="Arrow Down Icon" />
        </div>
      </div>
    </div>
  );
};

export default FacilitiesTable;
