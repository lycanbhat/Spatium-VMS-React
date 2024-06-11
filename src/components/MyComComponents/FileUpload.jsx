import React, { useState } from "react";
// import FileUploadIco from './FileUpload';
import upload_icon from "../../assets/images/icons/upload.svg";
import API from "../../Utils/API";
import { useSelector } from "react-redux";

const FileUpload = ({ closeBulkModal, getCompanies }) => {
  const [dragging, setDragging] = useState(false);
  const [errorTrigger, setErrorTrigger] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [file_, setFile_] = useState();
  const { tokens } = useSelector((state) => state.auth);

  const handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDragging(true);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      // Handle file files
      setFile_(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    setFile_(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (file_) {
      try {
        const formdata = new FormData();
        formdata.append("role_id", 5);
        formdata.append("company_id", tokens?.company_id);
        formdata.append("file", file_);
        console.log({ tokens });
        const apicall = await API.post(
          "v1/admin/bulk-employee-upload/",
          formdata,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (apicall.data?.failures?.length) {
          setErrorTrigger(true);
          setErrorMsg(apicall.data?.failures);
          setTimeout(() => {
              closeBulkModal();
            setErrorTrigger(false);

          }, 5000);
        }else{

            closeBulkModal();
        }
        getCompanies();
      } catch (error) {
        console.log({ error });
        setErrorTrigger(true);
        setErrorMsg(error?.response?.data?.detail);
        setTimeout(() => {
          setErrorTrigger(false);
        }, 5000);
      }
    }
  };

  return (
    <>
    <label htmlFor="uploadExcel">

      <div
        className={`border-dashed border rounded border-primary-500 p-10 text-center text-[#482163] text-sm cursor-pointer ${
          dragging ? "bg-gray-200" : ""
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
      >
        <p className="flex gap-2">
          <img src={upload_icon} className="w-3" alt="" />
          Upload by clicking here / Drag and drop the file here
        </p>
        <input
          onChange={handleFileChange}
          type="file"
          id="uploadExcel"
          className="hidden"
        />
      </div>
    </label>
      <div className="my-2 flex justify-between items-center">
        <p className="text-sm text-primary-500">{file_?.name}</p>
        <button
          onClick={handleUpload}
          className="px-3 py-1 bg-primary-500 text-white rounded-md"
        >
          Upload
        </button>
      </div>
      {errorTrigger && (
        <div className="bg-gray-100 text-sm shadow-md rounded-md text-red-500 absolute z-50 right-2 top-2 min-w-[16rem] max-w-[24rem] px-3 py-2">
          {errorMsg}
        </div>
      )}
    </>
  );
};

export default FileUpload;
