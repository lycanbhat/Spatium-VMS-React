import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/images/spatium.png";
import user from "../assets/images/Group 64421.svg";
import alert from "../assets/images/icons/alert_primary.svg";
import arrow_d from "../assets/images/icons/ic_fluent_chevron_down_24_regular.svg";
import { logout} from '../redux/auth'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Navbar({ title }) {
  const dropdownRef = useRef(null);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [triggerDropdown,setTriggerDropdown] = useState(false)
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setTriggerDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  return (
    <nav className="h-14 bg-white shadow-md shadow-[#00000008] relative">
      <div className="h-full flex items-center px-5 justify-between">
        <div className="flex gap-2 items-center">
          <img className="w-20" src={logo} alt="" />
          <h3 className=" text-xl font-bold">{title}</h3>
        </div>
        <div className="flex gap-4 items-center">
          {/* <div className="w-8 h-8 bg-primary-100 rounded-md flex justify-center items-center">
            <img src={alert} alt="" />
          </div> */}
          <div className="flex items-center gap-1 font-medium">
            <img
              src={user}
              className=" rounded-full w-8 h-8 object-cover"
              alt=""
            />
            ADMIN
          </div>
          <div className="mr-4 relative" ref={dropdownRef}>
            <img className="w-3 cursor-pointer" src={arrow_d} alt="" onClick={()=>{setTriggerDropdown((prv)=>!prv)}} />
            <div className={`absolute px-1 text-dark-400 overflow-hidden text-center w-32 bg-white z-20 shadow-[0_3px_6px_#0000001F] transition-all duration-100 right-0 top-5 font-medium text-sm ${triggerDropdown?'h-10 py-2':'h-0'}`}>
              <p className=" cursor-pointer" onClick={()=>{
                localStorage.removeItem('spacium_admin')
                dispatch(logout())
                navigate('/login/')
              }}>Logout</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
