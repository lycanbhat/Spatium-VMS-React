import React, { useEffect, useState } from "react";
import check_icon from "../../assets/images/icons/ic_fluent_checkmark_24_regular.svg";
import close_primaryc_icon from "../../assets/images/icons/close_primaryc.svg";
import { makeApiCall } from "../../Utils/api-funcs";
import info_icon from "../../assets/images/icons/ic_fluent_info_24_regular.svg";
import add_icon_n from "../../assets/images/icons/ic_fluent_add_24_filled.svg";

const EmployeeForm = ({
  formData,
  errors,
  handleFormdata,
  submitAction,
  closeAction,
  editFlag,
}) => {
  
  // useEffect(() => {
  //   if (formData?.profile_picture) {
  //     setpreview_img(URL.createObjectURL(formData.profile_picture));
  //   }
  // }, [formData]);
  return (
    <form
      onSubmit={submitAction}
      className="w-[60vw] lg:w-[50vw] 2xl:w-[40vw] px-5 py-2 max-h-[80vh] overflow-auto"
    >
      <div className="w-full flex flex-col gap-2">
        <div className="mt-2 flex flex-col">
          <label
            htmlFor="first_name"
            className="text-sm text-dark-400 font-medium"
          >
            First name
          </label>
          <input
            type="text"
            id="first_name"
            value={formData.first_name || ""}
            onChange={(e) => handleFormdata("first_name", e.target.value)}
            className="mt-2 px-2 border border-[#E0E0E0] outline-dark-500 rounded-md h-10"
          />
          <p className="text-xs text-red-500">{errors.first_name}</p>
        </div>
      </div>
      <div className="w-full flex flex-col gap-2">
        <div className="mt-2 flex flex-col">
          <label
            htmlFor="last_name"
            className="text-sm text-dark-400 font-medium"
          >
            Last name
          </label>
          <input
            type="text"
            id="last_name"
            value={formData.last_name || ""}
            onChange={(e) => handleFormdata("last_name", e.target.value)}
            className="mt-2 px-2 border border-[#E0E0E0] outline-dark-500 rounded-md h-10"
          />
          <p className="text-xs text-red-500">{errors.last_name}</p>
        </div>
      </div>
      <div className="w-full flex flex-col gap-2">
        <div className="mt-2 flex flex-col">
          <label htmlFor="email" className="text-sm text-dark-400 font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={formData.email || ""}
            onChange={(e) => handleFormdata("email", e.target.value)}
            className="mt-2 px-2 border border-[#E0E0E0] outline-dark-500 rounded-md h-10"
          />
          <p className="text-xs text-red-500">{errors.email}</p>
        </div>
      </div>
      <div className="w-full flex flex-col gap-2">
        <div className="mt-2 flex flex-col">
          <label
            htmlFor="phone_number"
            className="text-sm text-dark-400 font-medium"
          >
            Phone number
          </label>
          <input
            type="text"
            id="phone_number"
            value={formData.phone_number || ""}
            onChange={(e) => handleFormdata("phone_number", e.target.value)}
            className="mt-2 px-2 border border-[#E0E0E0] outline-dark-500 rounded-md h-10"
          />
          <p className="text-xs text-red-500">{errors.phone_number}</p>
        </div>
      </div>
      

      {/* <div className="mt-2 flex flex-col">
        <div className="flex gap-1">
          <label htmlFor="" className="text-sm text-dark-400 font-medium">
            Photo upload
          </label>
          <img src={info_icon} className="w-3 cursor-pointer z-20" alt="" />
        </div>
        <p className="text-[13px] text-dark-100">
          We recommend a square JPG image no larger than 200 x 200 pixels.
        </p>
        <label
          className="mt-2 border border-[#E3E3E3] rounded-md h-24 w-24 bg-[#FCFCFC] cursor-pointer relative z-40"
          htmlFor="member_img_add"
        >
          <div className="w-full h-full flex justify-center items-center relative">
            <img
              className=" w-6 h-6 relative z-20 rounded-full bg-[#ffffff66] p-1"
              src={add_icon_n}
              alt=""
            />
            {preview_img ? (
              <img
                src={preview_img}
                className="cursor-pointer z-10 absolute left-0 top-0 w-full h-full object-cover"
                alt=""
              />
            ) : null}
          </div>
        </label>
        <p className=" text-xs text-red-500">{errors.profile_picture}</p>
        <input
          type="file"
          name=""
          hidden
          // ref={fileref}
          onChange={(e) => {
            handleFormdata("profile_picture", e.target.files[0]);
            setpreview_img(URL.createObjectURL(e.target.files[0]));
            // console.log(fileref.current.files);
          }}
          id="member_img_add"
          accept="images/.jpeg,.jpg,.png"
        />
      </div> */}
      <div className="relative pt-3 px-6  flex justify-end items-center h-10 gap-2">
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

export default EmployeeForm;
