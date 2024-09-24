import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import analytics_ico from "../assets/images/icons/building.svg";
import analytics_active_ico from "../assets/images/icons/building-active.svg";

import visitor_ico from "../assets/images/icons/visitors.svg";
import visitor_active_ico from "../assets/images/icons/visitors-active.svg";

import company_ico from "../assets/images/icons/company.svg";
import company_active_ico from "../assets/images/icons/company-active.svg";

import location_ico from "../assets/images/icons/location.svg";
import location_active_ico from "../assets/images/icons/location-active.svg";



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
      icon: visitor_ico,
      active: visitor_active_ico,
    },
    {
      name: "Location Meta data",
      path: "/location-meta/",
      icon: location_ico,
      active: location_active_ico,
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
      icon: company_ico,
      active: company_active_ico,
    },
  ];

  const spocSidebar = [
    {
      name: tokens?.company_name?tokens?.company_name:"My company",
      path: "/mycompany/",
      icon: company_ico,
      active: company_active_ico,
    },
     {
      name: "Visitors",
      path: "/visitors/",
      icon: visitor_ico,
      active: visitor_active_ico,
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
                    className="w-5 h-5 min-[1rem]"
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
