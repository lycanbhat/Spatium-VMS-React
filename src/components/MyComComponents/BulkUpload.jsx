import React from "react";
import Modal from "../Modal";
import sampleBulkImg from "../../assets/images/sampleBulk.png";
import download_icon from "../../assets/images/icons/download.png";
import FileUpload from "./FileUpload";

export default function BulkUpload({ closeBulkModal,getCompanies }) {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/sample.xlsx"; // Path to the file in the public directory
    link.download = "sample.xlsx"; // Name for the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <>
      <Modal title={"Bulk Upload"} closeM={closeBulkModal}>
        <div className="w-[50vw] px-6 mt-2">
          <p className="text-[#606060] text-[0.81rem]">
            Here is a sample template visual containing all the necessary data
            for bulk uploading employee information. Click the button below to
            download the CSV file.
          </p>
          <img src={sampleBulkImg} className="w-full mt-2" alt="sample" />
          {/* <a className='appearance-none' download="Employee-data-template.xlsx" href="/Employee-data-template.xlsx"> */}
          <button
            onClick={handleDownload}
            className="bg-[#ECE8EF] rounded-md px-3 py-1 flex items-center gap-2 mt-3 text-primary-500"
          >
            <img src={download_icon} className="w-3" alt="download icon" />
            Download template
          </button>
          {/* </a> */}
          <div>
            <div className=" mt-8 mb-8 border-b border-[#EAEAEA]"></div>
            <FileUpload closeBulkModal={closeBulkModal} getCompanies={getCompanies} />
            
          </div>
        </div>
      </Modal>
    </>
  );
}
