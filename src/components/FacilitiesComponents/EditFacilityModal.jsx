import React, { useState } from "react";
import Modal from "../Modal";
import FacilityForm from "./FacilityForm";
import { makeApiCall } from "../../Utils/api-funcs";

const EditFacilityModal = ({ facility, closeEditModal, fetchFacilities }) => {
  const [formData, setFormData] = useState({
    name: facility.name,
    city: facility.city,
    zone: facility.zone,
  });
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

  const updateFacility = async (e) => {
    e.preventDefault();
    const newErrors = formCheck();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      try {
        // Implement the API call to update the facility
        console.log({formData,facility});
        const {status} = await makeApiCall('PUT',`v1/admin/facility/${facility.id}/`, formData);
        fetchFacilities(); // Fetch facilities after updating
        closeEditModal();
      } catch (error) {
        setErrors(error.response.data.errors);
      }
    }
  };

  return (
    <Modal closeM={closeEditModal} title={"Edit Facility"}>
      <FacilityForm
        formData={formData}
        errors={errors}
        handleFormdata={handleFormdata}
        submitAction={updateFacility}
        closeAction={closeEditModal}
      />
    </Modal>
  );
};

export default EditFacilityModal;
