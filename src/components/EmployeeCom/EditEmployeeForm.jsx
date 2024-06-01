import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import EmployeeForm from "./EmployeeForm";
import { makeApiCall } from "../../Utils/api-funcs";
import API from "../../Utils/API";

const EditEmployeeModal = ({ employee, closeEditModal, getCompanies, company_id }) => {
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
  const [formData, setFormData] = useState({});
  useEffect(() => {
    const fillImage = async () => {
      const logo = await imageUrlToFile(employee.profile_picture);
      setFormData((prv) => {
        return {
          ...prv,
          id: employee.id,
          phone_number: employee.phone_number,
          role_id: employee.role_id,
          company_id: employee.company_id,
          facility_id: employee.facility_id,
          // zone_id: employee.zone_id,
          // password: employee.password,
          // is_superuser: false,
          email: employee.email,
          first_name: employee.first_name,
          last_name: employee.last_name,
          is_archive: false,
          profile_picture:logo,
          // created_at: "2024-05-28T22:33:34.936930+05:30",
          // modified_at: "2024-05-28T22:33:34.936961+05:30",
          role: 5,
          company: 28,
          // facility: null,
          // zone: null,
          // groups: [],
          // user_permissions: [],
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
    if (!formData.first_name) newErrors.first_name = "First name is required!";
    if (!formData.last_name) newErrors.last_name = "Last name is required!";
    if (!formData.email) newErrors.email = "Email is required!";
    // if (!formData.password) newErrors.password = "Password is required!";
    if (!formData.profile_picture) newErrors.profile_picture = "Image is required!";;
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
        await API.put(`v1/admin/employee/${employee.id}/?company_id=${company_id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        getCompanies(); // Fetch facilities after updating
        closeEditModal();
      } catch (error) {
        setErrors(error.response.data.errors);
      }
    }
  };

  return (
    <Modal closeM={closeEditModal} title={"Edit employee"}>
      <EmployeeForm
        formData={formData}
        errors={errors}
        handleFormdata={handleFormdata}
        submitAction={updateFacility}
        closeAction={closeEditModal}
        editFlag={true}
      />
    </Modal>
  );
};

export default EditEmployeeModal;
