import React from "react";
import closeIcon from "../assets/images/icons/ic_fluent_dismiss_24_regular.svg";

export default function SideModal({ children, headerContent, close, open }) {
  const preventClose = (e) => {
    e.stopPropagation();
  };
  return (
    <>
      {open && (
        <div
          className="absolute overflow-y-auto top-0 left-0 w-full h-screen flex items-end justify-end"
          onClick={close}
        >
          <div
            className="bg-white shadow-md shadow-[#00000008] h-[calc(100vh-3.5rem)] w-[20rem]"
            onClick={preventClose}
          >{children}
            {/* <header className="px-6 h-12 flex items-center text-dark-400 text-xl font-medium justify-between border-b">
              {headerContent}
              <img
                className="w-3 cursor-pointer"
                onClick={close}
                src={closeIcon}
                alt=""
              />
            </header>
            <section className="py-3">{children}</section> */}
          </div>
        </div>
      )}
    </>
  );
}
