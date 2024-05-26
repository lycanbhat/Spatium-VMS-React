import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import analytics_ico from "../assets/images/icons/ic_fluent_board_split_24_regular.svg";
import analytics_active_ico from "../assets/images/icons/Group 64280.svg";

import members_ico from "../assets/images/icons/ic_fluent_premium_person_24_regular-1.svg";
import members_active_ico from "../assets/images/icons/Group 64302.svg";

import guests_ico from "../assets/images/icons/ic_fluent_person_swap_24_regular.svg";
import guests_active_ico from "../assets/images/icons/ic_fluent_person_swap_24_filled.svg";

import employee_ico from "../assets/images/icons/ic_fluent_person_accounts_24_regular.svg";
import employee_active_ico from "../assets/images/icons/Group 64429.svg";

import notification_ico from "../assets/images/icons/ic_fluent_alert_24_regular.svg";
import notification_active_ico from "../assets/images/icons/Group 64351.svg";

import configuration_ico from "../assets/images/icons/ic_fluent_settings_24_regular.svg";

import vehicleParking_active_ico from "../assets/images/icons/parking_active.svg";
import vehicleParking_inactive_ico from "../assets/images/icons/parking_inactive.svg";


export default function Sidebar() {
  let location = useLocation();
  const { tokens } = useSelector((state) => state.auth);
  // const pathf = useSelector((state) => state.pathf);

  const sidebar = [
    // {
    //   name: "Analytics",
    //   path: "/analytics/",
    //   icon: analytics_ico,
    //   active: analytics_active_ico,
    // },
    {
      name: "Visitors",
      path: "/visitors/",
      icon: analytics_ico,
      active: analytics_active_ico,
    },
    {
      name: "Location Meta data",
      path: "/location-meta/",
      icon: analytics_ico,
      active: analytics_active_ico,
    },

    {
      name: "Facilities ",
      path: "/facilities/",
      icon: analytics_ico,
      active: analytics_active_ico,
    },
    {
      name: "Companies ",
      path: "/companies/",
      icon: analytics_ico,
      active: analytics_active_ico,
    },
  ];

  const spocSidebar = [
    {
      name: "My Company",
      path: "/mycompany/",
      icon: analytics_ico,
      active: analytics_active_ico,
    },
  ]
  return (
    <div className=" shadow-[4px_0_10px_#79797908] shadow-[#79797908] h-full bg-white w-full relative">
      {
        tokens.is_superuser?
        sidebar.map((e, i) => {
        return (
          <Link to={e.path} key={i}>
            <div
              key={i}
              className={`px-7 h-16 flex border-r-2 ${
                location.pathname == e.path
                  ? "bg-primary-100 cursor-default border-primary-500"
                  : "cursor-pointer border-transparent"
              }`}
            >
              <div className="flex items-center gap-5 box-border">
                <div className="">
                  <img
                    className="w-4 h-4 min-[1rem]"
                    src={location.pathname == e.path ? e.active : e.icon}
                    alt=""
                  />
                </div>
                <div
                  className={`text-sm  text-dark-500 ${
                    location.pathname == e.path
                      ? "font-semibold"
                      : "font-normal"
                  }`}
                >
                  {e.name}
                  {/* <Link to={e.path}>{e.name}</Link> */}
                </div>
              </div>
            </div>
          </Link>
        );
      })
      :(
        tokens.role_id == 4?
        spocSidebar.map((e,i)=>{
          return (
            <Link to={e.path} key={i}>
              <div
                key={i}
                className={`px-7 h-16 flex border-r-2 ${
                  location.pathname == e.path
                    ? "bg-primary-100 cursor-default border-primary-500"
                    : "cursor-pointer border-transparent"
                }`}
              >
                <div className="flex items-center gap-5 box-border">
                  <div className="">
                    <img
                      className="w-4 h-4 min-[1rem]"
                      src={location.pathname == e.path ? e.active : e.icon}
                      alt=""
                    />
                  </div>
                  <div
                    className={`text-sm  text-dark-500 ${
                      location.pathname == e.path
                        ? "font-semibold"
                        : "font-normal"
                    }`}
                  >
                    {e.name}
                    {/* <Link to={e.path}>{e.name}</Link> */}
                  </div>
                </div>
              </div>
            </Link>
          );
        })
        :null
      )
    }

      <div className="absolute bottom-0 flex justify-center w-full pb-2">
        <p className="text-xs text-[#A5A5A5] w-64 text-center">
          {/* footer sidebar text  */}
        </p>
      </div>
    </div>
  );
}
