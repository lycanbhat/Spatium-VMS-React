import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import CompanyForm from "./CompanyForm";
import { makeApiCall } from "../../Utils/api-funcs";
import API from '../../Utils/API'

const EditCompanyModal = ({ company, closeEditModal, fetchFacilities }) => {
  async function imageUrlToFile(imageUrl) {
    try {
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const blob = await response.blob();
      const filename = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
      const file = new File([blob], filename, { type: blob.type });

      return file;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      throw error;
    }
  }
  const [formData, setFormData] = useState({
    // name: company.name,
    // address: company.address,
    // spoc_name: company.spoc_name,
    // spoc_email: company.spoc_email,
    // spoc_phone_number: company.spoc_phone_number,
    // gstin: company.gstin,
    // facility: company.facility,
  });
  useEffect(() => {
    const fillImage = async () => {
      const logo = await imageUrlToFile(company.logo);
      setFormData((prv) => {
        return {
          ...prv,
          name: company.name,
          address: company.address,
          spoc_name: company.spoc_name,
          spoc_email: company.spoc_email,
          spoc_phone_number: company.spoc_phone_number,
          gstin: company.gstin,
          facility: company.facility,
          logo: logo,
        };
      });
    };
    fillImage();
  }, []);
  const [errors, setErrors] = useState({});

  const handleFormdata = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: null }));
  };

  const formCheck = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required!";
    if (!formData.address) newErrors.address = "Address is required!";
    if (!formData.spoc_name) newErrors.spoc_name = "Spoc name is required!";
    if (!formData.spoc_email) newErrors.spoc_email = "Spoc email is required!";
    if (!formData.spoc_phone_number)
      newErrors.spoc_phone_number = "Spoc phone is required!";
    if (!formData.gstin) newErrors.gstin = "GSTIN is required!";
    if (!formData.facility) newErrors.facility = "Facility is required!";
    return newErrors;
  };

  const updateFacility = async (e) => {
    e.preventDefault();
    const newErrors = formCheck();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      try {
        // Implement the API call to update the facility
        // const { status } = await makeApiCall(
        //   "PUT",
        //   `v1/admin/company/${company.id}/`,
        //   formData
        // );
        await API.put(`v1/admin/company/${company.id}/`,formData,{
            headers:{
                "Content-Type":"multipart/form-data"
            }
        })
        fetchFacilities(); // Fetch facilities after updating
        closeEditModal();
      } catch (error) {
        setErrors(error.response.data.errors);
      }
    }
  };

  return (
    <Modal closeM={closeEditModal} title={"Edit Facility"}>
      <CompanyForm
        formData={formData}
        errors={errors}
        handleFormdata={handleFormdata}
        submitAction={updateFacility}
        closeAction={closeEditModal}
      />
    </Modal>
  );
};

export default EditCompanyModal;
