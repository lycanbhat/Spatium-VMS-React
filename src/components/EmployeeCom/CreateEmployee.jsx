import React, { useState } from "react";
import Modal from "../Modal";
import API from "../../Utils/API";
import EmployeeForm from "./EmployeeForm";

const CreateEmployeeModal = ({
  closeCreateModal,
  getCompanies,
  company_id,
}) => {
  const [formData, setFormData] = useState({
    company_id,
    purpose_of_visit: "Official work",
    role_id:5,
    is_archive : false
  });
  const [errors, setErrors] = useState({});

  const handleFormdata = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: null }));
  };

  const formCheck = () => {
    const newErrors = {};
    if (!formData.first_name) newErrors.first_name = "First name is required!";
    if (!formData.last_name) newErrors.last_name = "Last name is required!";
    if (!formData.email) newErrors.email = "Email is required!";
    if (!formData.phone_number) newErrors.phone_number = "Phone number is required!";
    // if (!formData.profile_picture) newErrors.profile_picture = "Image is required!";

    return newErrors;
  };

  const createEmployee = async (e) => {
    e.preventDefault();
    // setFormData((prv) => {
    //   return {
    //     ...formData,
    //     company_id,
    //     purpose_of_visit: "Official work",
    //   };
    // });
    const newErrors = formCheck();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      try {
        const response = await API.post(
          `v1/admin/employee/?company_id=${company_id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.status === 201) {
          getCompanies();
          closeCreateModal();
        }
      } catch (error) {
        console.log({});
        setErrors(error.response.data);
      }
    }
  };

  return (
    <Modal closeM={closeCreateModal} title={"Add new employee"}>
      <EmployeeForm
        formData={formData}
        errors={errors}
        handleFormdata={handleFormdata}
        submitAction={createEmployee}
        closeCreateModal={closeCreateModal}
      />
    </Modal>
  );
};

export default CreateEmployeeModal;
