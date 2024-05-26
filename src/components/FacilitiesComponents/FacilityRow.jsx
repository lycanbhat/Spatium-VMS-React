import React, { useState } from "react";
import dots_icon from "../../assets/images/icons/ic_fluent_more_vertical_24_filled.svg";
import EditFacilityModal from "./EditFacilityModal";

const FacilityRow = ({ facility, index }) => {
  const [optionTrigger, setOptionTrigger] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const toggleOptions = () => {
    setOptionTrigger(optionTrigger === index ? null : index);
  };
  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen);
  };
  return (
    <>
      <tr className="border-t border-b border-dark-200 h-10 mx-1 hover:bg-light-500">
        <td className="pl-2">
          <div className="flex text-sm gap-2 items-center">
            <p className="text-primary-500">{facility.name}</p>
          </div>
        </td>
        <td>{facility.city}</td>
        <td>{facility.zone}</td>
        <td className="relative">
          <div
            onClick={toggleOptions}
            className="cursor-pointer w-6 h-6 bg-primary-100 flex justify-center items-center rounded-md"
          >
            <img src={dots_icon} alt="Options Icon" />
          </div>
          {optionTrigger === index && (
            <div className="absolute z-10 right-8 top-8 py-4 px-3 bg-white shadow-[0_3px_6px_#0000001F] w-36">
              <div className="cursor-pointer" onClick={toggleEditModal}>
                Edit
              </div>
              <div className="cursor-pointer">Delete</div>
            </div>
          )}
        </td>
      </tr>
      {editModalOpen && (
        <EditFacilityModal
          facility={facility}
          closeEditModal={toggleEditModal}
        
        />
      )}
    </>
  );
};

export default FacilityRow;
