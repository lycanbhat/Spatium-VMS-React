import React, { useState } from "react";
import Modal from "../Modal";
import FacilityForm from "./FacilityForm";
import API from '../../Utils/API'

const CreateFacilityModal = ({ closeCreateModal, fetchFacilities }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleFormdata = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: null }));
  };

  const formCheck = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required!";
    if (!formData.city) newErrors.city = "City is required!";
    if (!formData.zone) newErrors.zone = "Zone is required!";
    return newErrors;
  };

  const createFacility = async (e) => {
    e.preventDefault();
    const newErrors = formCheck();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      try {
        const response = await API.post("v1/admin/facility/", formData);
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
    <Modal closeM={closeCreateModal} title={"Add new facility"}>
      <FacilityForm
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

export default CreateFacilityModal;
