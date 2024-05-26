import React, { useEffect, useState } from "react";
import check_icon from "../../assets/images/icons/ic_fluent_checkmark_24_regular.svg";
import close_primaryc_icon from "../../assets/images/icons/close_primaryc.svg";
import { makeApiCall } from "../../Utils/api-funcs";
import info_icon from "../../assets/images/icons/ic_fluent_info_24_regular.svg";
import add_icon_n from "../../assets/images/icons/ic_fluent_add_24_filled.svg";


const CompanyForm = ({
  formData,
  errors,
  handleFormdata,
  submitAction,
  closeAction,
}) => {
  const [facilities, setFacilities] = useState([]);
  const [preview_img,setpreview_img] = useState(null)
  // const removeImage = () => {
  //   setpreview_img(null);
  //   setFormdata({
  //     ...formdata,
  //     image: null,
  //   });
  //   // Clear the file input value
  //   if (fileref.current) {
  //     fileref.current.value = null;
  //   }
  // };
  useEffect(() => {
    const getFacilities = async () => {
      const { data } = await makeApiCall(
        "GET",
        "v1/admin/facility/?page_size=500"
      );
      setFacilities(data?.results);
    };
    getFacilities();
    
  }, []);
  useEffect(()=>{
    if(formData?.logo){
      setpreview_img(URL.createObjectURL(formData.logo))
    }
  },[formData])
  return (
    <form
      onSubmit={submitAction}
      className="w-[60vw] lg:w-[50vw] 2xl:w-[40vw] px-5 py-2 h-[80vh] overflow-auto"
    >
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
      </div>
      <div className="w-full flex flex-col gap-2">
        <div className="mt-2 flex flex-col">
          <label
            htmlFor="address"
            className="text-sm text-dark-400 font-medium"
          >
            Address
          </label>
          <textarea
            type="text"
            id="address"
            value={formData.address || ""}
            onChange={(e) => handleFormdata("address", e.target.value)}
            className="mt-2 px-2 border border-[#E0E0E0] outline-dark-500 rounded-md h-20"
          />
          <p className="text-xs text-red-500">{errors.address}</p>
        </div>
      </div>
      <div className="w-full flex flex-col gap-2">
        <div className="mt-2 flex flex-col">
          <label
            htmlFor="spoc_name"
            className="text-sm text-dark-400 font-medium"
          >
            Spoc Name
          </label>
          <input
            type="text"
            id="spoc_name"
            value={formData.spoc_name || ""}
            onChange={(e) => handleFormdata("spoc_name", e.target.value)}
            className="mt-2 px-2 border border-[#E0E0E0] outline-dark-500 rounded-md h-10"
          />
          <p className="text-xs text-red-500">{errors.spoc_name}</p>
        </div>
      </div>
      <div className="w-full flex flex-col gap-2">
        <div className="mt-2 flex flex-col">
          <label
            htmlFor="spoc_name"
            className="text-sm text-dark-400 font-medium"
          >
            Spoc Email
          </label>
          <input
            type="email"
            id="spoc_email"
            value={formData.spoc_email || ""}
            onChange={(e) => handleFormdata("spoc_email", e.target.value)}
            className="mt-2 px-2 border border-[#E0E0E0] outline-dark-500 rounded-md h-10"
          />
          <p className="text-xs text-red-500">{errors.spoc_name}</p>
        </div>
      </div>
      <div className="w-full flex flex-col gap-2">
        <div className="mt-2 flex flex-col">
          <label
            htmlFor="spoc_name"
            className="text-sm text-dark-400 font-medium"
          >
            Spoc Phone
          </label>
          <input
            type="phone"
            id="spoc_phone_number"
            value={formData.spoc_phone_number || ""}
            onChange={(e) =>
              handleFormdata("spoc_phone_number", e.target.value)
            }
            className="mt-2 px-2 border border-[#E0E0E0] outline-dark-500 rounded-md h-10"
          />
          <p className="text-xs text-red-500">{errors.spoc_phone_number}</p>
        </div>
      </div>
      <div className="w-full flex flex-col gap-2">
        <div className="mt-2 flex flex-col">
          <label htmlFor="gstin" className="text-sm text-dark-400 font-medium">
            GSTIN
          </label>
          <input
            type="text"
            id="gstin"
            value={formData.gstin || ""}
            onChange={(e) => handleFormdata("gstin", e.target.value)}
            className="mt-2 px-2 border border-[#E0E0E0] outline-dark-500 rounded-md h-10"
          />
          <p className="text-xs text-red-500">{errors.gstin}</p>
        </div>
      </div>
      <div className="w-full flex flex-col gap-2">
        <div className="mt-2 flex flex-col">
          <label
            htmlFor="facility"
            className="text-sm text-dark-400 font-medium"
          >
            Facility
          </label>
          <select
            id="facility"
            value={formData.facility || ""}
            onChange={(e) => handleFormdata("facility", e.target.value)}
            className="mt-2 px-2 border border-[#E0E0E0] outline-dark-500 rounded-md h-10"
          >
            <option value="" disabled>
              Select Facility
            </option>
            {facilities.map((city, index) => (
              <option key={index} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
          <p className="text-xs text-red-500">{errors.facility}</p>
        </div>
      </div>
      <div className="mt-2 flex flex-col">
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
        <p className=" text-xs text-red-500">{errors.profilePicture}</p>
        <input
          type="file"
          name=""
          hidden
          // ref={fileref}
          onChange={(e) => {
            handleFormdata("logo", e.target.files[0]);
            setpreview_img(URL.createObjectURL(e.target.files[0]));
            // console.log(fileref.current.files);
          }}
          id="member_img_add"
          accept="images/.jpeg,.jpg,.png"
        />
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

export default CompanyForm;
