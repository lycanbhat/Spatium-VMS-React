import React, { useState } from "react";
import Modal from "../Modal";
import API from "../../Utils/API";
import CompanyForm from "./CompanyForm";

const CreateCompanyModal = ({ closeCreateModal, fetchFacilities }) => {
  const [formData, setFormData] = useState({});
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

  const createFacility = async (e) => {
    e.preventDefault();
    const newErrors = formCheck();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      try {
        const response = await API.post("v1/admin/company/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (response.status === 201) {
          fetchFacilities();
          closeCreateModal();
        }
      } catch (error) {
        setErrors(error.response.data.errors);
      }
    }
  };

  return (
    <Modal closeM={closeCreateModal} title={"Add new company"}>
      <CompanyForm
        formData={formData}
        errors={errors}
        handleFormdata={handleFormdata}
        submitAction={createFacility}
        closeCreateModal={closeCreateModal}
        closeAction={closeCreateModal}
      />
    </Modal>
  );
};

export default CreateCompanyModal;
