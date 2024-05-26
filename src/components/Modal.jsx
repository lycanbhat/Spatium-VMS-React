import React from "react";
import closeIcon from '../assets/images/icons/ic_fluent_dismiss_24_regular.svg'

export default function Modal({children,title,closeM}) {
  const preventClose = (e) =>{
    e.stopPropagation()
  }
  return (
    <div className="absolute z-30 overflow-y-auto top-0 left-0 w-full h-screen bg-[#00000064] flex items-center" onClick={closeM}>
        <div className="bg-white max-w-[70%] mx-auto" onClick={preventClose}>
            <header className="px-6 h-12 flex items-center text-dark-400 text-xl font-medium justify-between border-b">{title} <img className="w-3 cursor-pointer" onClick={closeM} src={closeIcon} alt="" /></header>
            <section className="py-3">
                {children}
            </section>
        </div>
    </div>
  );
}
