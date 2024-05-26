import React, { useEffect } from "react";
import { makeApiCall } from "../Utils/api-funcs";
import { useSelector } from "react-redux";

export default function Mycompany() {
  const { tokens } = useSelector((state) => state.auth);
  const getCompanies = async () => {
    const { data } = await makeApiCall("GET", `v1/admin/company-user/?company_id=${tokens.company_id}`);
    console.log({ data });
  };
  useEffect(() => {
    getCompanies();
  }, []);
  return <div>Mycompanys</div>;
}
