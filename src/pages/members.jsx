import React, { useEffect, useRef, useState } from "react";
import add_icon from "../assets/images/icons/ic_fluent_add_white.svg";
import dots_icon from "../assets/images/icons/ic_fluent_more_vertical_24_filled.svg";
import arrow_down_icon from "../assets/images/icons/arrow-down.svg";
import info_icon from "../assets/images/icons/ic_fluent_info_24_regular.svg";
import add_icon_n from "../assets/images/icons/ic_fluent_add_24_filled.svg";
import check_icon from "../assets/images/icons/ic_fluent_checkmark_24_regular.svg";
import close_primaryc_icon from "../assets/images/icons/close_primaryc.svg";
import members_ico from "../assets/images/icons/ic_fluent_premium_person_24_regular-1.svg";
import user from "../assets/images/tim-cook.jpeg";
import Modal from "../components/Modal";

import API from "../Utils/API";

export default function Members() {
  const [createTrigger, setCreateTrigger] = useState(false);
  const [optionTrigger, setOptionTrigger] = useState(null);

  const [preview_img, setpreview_img] = useState(null);
  const [users, setUsers] = useState([]);
  const [formdata, setFormdata] = useState({});
  const [errors, setErrors] = useState({});

  const fileref = useRef(null);
 
  const formCheck = () => {
    let err = {};
    if (!formdata.username || formdata.username == "") {
      err = {
        ...err,
        username: "Name is required!",
      };
    }
    if (!formdata.email || formdata.email == "") {
      err = {
        ...err,
        email: "Email is required!",
      };
    }
    if (!formdata.password || formdata.password == "") {
      err = {
        ...err,
        password: "Password is required!",
      };
    }
    // if (!formdata.membership_number || formdata.membership_number == "") {
    //   err = {
    //     ...err,
    //     membership_number: "Membership number is required!",
    //   };
    // }
    if (!formdata.profilePicture || formdata.profilePicture == "") {
      err = {
        ...err,
        profilePicture: "Image is required!",
      };
    }
    return err;
  };

  const openCreateModal = () => {
    setCreateTrigger(true);
  };
  const closeCreateModal = () => {
    setFormdata({});
    setErrors({});
    setCreateTrigger(false);
  };


  const handleFormdata = (key, value) => {
    console.log(key,value);
    setFormdata((prv) => {
      return {
        ...prv,
        [key]: value,
      };
    });
    if (!!errors[key])
    setErrors({
        ...errors,
        [key]: null,
      });
  };

  const removeImage = () => {
    setpreview_img(null);
    setFormdata({
      ...formdata,
      image: null,
    });
    // Clear the file input value
    if (fileref.current) {
      fileref.current.value = null;
    }
  };

  const openOptions = (it) => {
    if (optionTrigger >= 0) {
      // debugger
      if (optionTrigger == it) {
        setOptionTrigger(null);
      } else {
        setOptionTrigger(it);
      }
    } else {
      setOptionTrigger(it);
    }
  };

  const fetchMembers = async () => {
    const apicall = await API.get("v1/manage/user/by-role/MEMBER");
    const data = apicall.data;
    console.log({ data });
    setUsers(data.data);
  };

  const createUser = async (e) => {
    e.preventDefault();
    const newErrors = formCheck();
    if(Object.keys(newErrors).length > 0){
      console.log({newErrors},{formdata});
      setErrors(newErrors);
    }
    else{
      const formData = new FormData();
      formData.append("username", formdata.username);
      formData.append("email", formdata.email);
      formData.append("password", formdata.password);
      formData.append("role", "MEMBER");
      formData.append("profilePicture", formdata.profilePicture);
      try {
        const apicall = await API.post("v1/manage/user/add", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if(apicall.status == 201){
          fetchMembers()
          closeCreateModal()
        }
      } catch (error) {
        const errors = error.response.data.errors
        // const errorkeys = Object.keys(e.response.data.errors)
        // const err = {}
        // errorkeys.map(e=>{
        //   err[e] = error[e]
        // })
        setErrors(errors)
      }
      
    }
  };

  var memberid_start = 774598;

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div className=" text-dark-400">
      <header className="flex items-center justify-between">
        <h2 className=" font-semibold text-2xl">Members</h2>
        <button
          onClick={openCreateModal}
          className="h-8 bg-primary-500 text-sm flex items-center gap-2 px-3 rounded-md text-white"
        >
          <img className="w-3" src={add_icon} alt="" />
          Add new member
        </button>
      </header>

      <div className="mt-4">
        <h4 className=" font-medium text-xl">Premium members of CCI</h4>
        <p className="text-sm text-dark-100 mt-1">
          Meet the elite: Premium Lifetime Members of CCI. Unrivaled access to
          all amenities and sports facilities at the Cricket Club of India.
        </p>
      </div>

      <div className="bg-white mt-6 rounded-lg">
        <table className="w-full">
          <thead className=" text-dark-400 w-full h-10">
            <tr>
              <th className="text-sm pl-2">
                <div className="flex gap-5">
                  <img className="w-4" src={members_ico} alt="" />
                  Name
                </div>
              </th>
              <th className="text-sm text-left">Email</th>
              {/* <th className="text-sm text-left">Membership No.</th> */}
              <th className="text-sm text-left">Member since</th>
              <th className="text-sm text-left"></th>
            </tr>
          </thead>
          <tbody className="mt-3 text-[#4B4B4B] text-sm">
            {
              users.length?

            users.map((e,i) => {
              return (
                <tr key={i} className="border-t border-b border-dark-200 h-10 mx-1 hover:bg-light-500">
                  <td className="pl-2">
                    <div className="flex text-sm gap-2 items-center">
                      <img className="w-8 h-8 object-cover rounded-md" src={e.profilePicture} alt="" />
                      <p className=" text-primary-500">{e.username}</p>
                    </div>
                  </td>
                  <td>{e.email}</td>
                  {/* <td>{memberid_start++}</td> */}
                  <td>10-01-1949</td>
                  <td className="relative">
                    <div
                      onClick={() => openOptions(i)}
                      className="cursor-pointer w-6 h-6 bg-primary-100 flex justify-center items-center rounded-md"
                    >
                      <img src={dots_icon} alt="" />
                    </div>
                    {optionTrigger == i ? (
                      <div className="absolute z-10 right-8 top-8 py-4 px-3 bg-white shadow-[0_3px_6px_#0000001F] w-36">
                        <div className="cursor-pointer">Edit</div>
                        <div className="cursor-pointer">Delete</div>
                      </div>
                    ) : null}
                  </td>
                </tr>
              );
            })
            :
            <tr>
                <th colSpan={4}>No records found</th>
              </tr>
          }

           
          </tbody>
        </table>
        <div className=" h-10 bg-white flex justify-center items-center">
          <div className="flex text-primary-500 gap-2 text-sm cursor-pointer">
            <img src={arrow_down_icon} className="w-[10px]" alt="" />
            Load more <img className="w-[10px]" src={arrow_down_icon} alt="" />
          </div>
        </div>
      </div>
      {createTrigger ? (
        <Modal closeM={closeCreateModal} title={"Add new member"}>
          <form
            onSubmit={createUser}
            className="w-[60vw] lg:w-[50vw] 2xl:w-[35vw]"
          >
            <div className="pb-6 px-6">
              <div className="flex gap-2 items-start">
                <img className="w-4 mt-1" src={info_icon} alt="" />
                <div className="text-dark-100 leading-4">
                  Admins can add members with ease by entering name, email, and
                  membership number. Members receive an email to set their
                  password for CCI’s mobile app.
                </div>
              </div>
              <div className="mt-2 flex flex-col">
                <label htmlFor="" className="text-sm text-dark-400 font-medium">
                  Name
                </label>
                <input
                  type="text"
                  onChange={(e) => handleFormdata("username", e.target.value)}
                  className=" mt-2 px-2 border border-[#E0E0E0] outline-dark-500 rounded-md h-10"
                />
                <p className=" text-xs text-red-500">{errors.username}</p>
              </div>
              <div className="mt-2 flex flex-col">
                <label htmlFor="" className="text-sm text-dark-400 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  // autoComplete="false"
                  value={formdata.email||""}
                  onChange={(e) => handleFormdata("email", e.target.value)}
                  className="!text-dark-400 mt-2 px-2 border border-[#E0E0E0] outline-dark-500 rounded-md h-10"
                />
                <p className=" text-xs text-red-500">{errors.email}</p>
              </div>
              <div className="mt-2 flex flex-col">
                <label htmlFor="" className="text-sm text-dark-400 font-medium">
                  Password
                </label>
                <input
                  type="password"
                  onChange={(e) => handleFormdata("password", e.target.value)}
                  className=" mt-2 px-2 border border-[#E0E0E0] outline-dark-500 rounded-md h-10"
                />
                <p className=" text-xs text-red-500">{errors.password}</p>
              </div>
              {/* <div className="mt-2 flex flex-col">
                <label htmlFor="" className="text-sm text-dark-400 font-medium">
                  Membership number
                </label>
                <input
                  type="number"
                  onChange={(e) =>
                    handleFormdata("membership_number", e.target.value)
                  }
                  className=" mt-2 px-2 border border-[#E0E0E0] outline-dark-500 rounded-md h-10"
                />
                <p className=" text-xs text-red-500">{errors.membership_number}</p>
              </div> */}
              <div className="mt-2 flex flex-col">
                <div className="flex gap-1">
                  <label
                    htmlFor=""
                    className="text-sm text-dark-400 font-medium"
                  >
                    Photo upload
                  </label>
                  <img
                    src={info_icon}
                    className="w-3 cursor-pointer z-20"
                    alt=""
                  />
                </div>
                <p className="text-[13px] text-dark-100">
                  We recommend a square JPG image no larger than 200 x 200
                  pixels.
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
                  ref={fileref}
                  onChange={(e) => {
                    handleFormdata("profilePicture", e.target.files[0]);
                    setpreview_img(URL.createObjectURL(e.target.files[0]));
                    // console.log(fileref.current.files);
                  }}
                  id="member_img_add"
                  accept="images/.jpeg,.jpg,.png"
                />
              </div>
              <div className="mt-2 flex gap-2">
                <label htmlFor="member_img_add">
                  <div className="cursor-pointer h-8 bg-primary-500 text-sm flex items-center gap-2 px-3 rounded-md text-white border border-transparent">
                    Change
                  </div>
                </label>
                <button
                  onClick={removeImage}
                  className="h-8 border border-[#585858] text-sm flex items-center gap-2 px-3 rounded-md text-[#585858]"
                >
                  Remove
                </button>
              </div>
            </div>
            <div className="relative pt-3 px-6 border-t border-[#EFEFEF] flex justify-end items-center h-10 gap-2">
              <button className="h-8 bg-primary-500 text-sm flex items-center gap-2 px-3 rounded-md text-white border border-transparent">
                <img src={check_icon} alt="" />
                Add
              </button>
              <button onClick={()=>closeCreateModal()} type="button" className="h-8 text-primary-500 border border-[#585858] text-sm flex items-center gap-2 px-3 rounded-md">
                <img src={close_primaryc_icon} alt="" />
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      ) : (
        <></>
      )}
    </div>
  );
}
