import React from "react";
import add_icon from "../../assets/images/icons/ic_fluent_add_white.svg";

const FacilitiesHeader = ({ openCreateModal }) => (
  <header className="flex items-center justify-between">
    <h2 className="font-semibold text-2xl">Facilities</h2>
    <button
      onClick={openCreateModal}
      className="h-8 bg-primary-500 text-sm flex items-center gap-2 px-3 rounded-md text-white"
    >
      <img className="w-3" src={add_icon} alt="Add Icon" />
      Add new facility
    </button>
  </header>
);

export default FacilitiesHeader;
