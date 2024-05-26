import React, { useEffect, useState } from "react";
import FacilitiesHeader from "../components/FacilitiesComponents/FacilitiesHeader";
import FacilitiesTable from "../components/FacilitiesComponents/FacilitiesTable";
import CreateFacilityModal from "../components/FacilitiesComponents/CreateFacilityModal";
import API from "../Utils/API";

export default function Facilities() {
  const [createTrigger, setCreateTrigger] = useState(false);
  const [facilities, setFacilities] = useState([]);

  const [nextpage, setNextpage] = useState();
  
  useEffect(() => {
    fetchFacilities();
  }, []);

  const fetchFacilities = async () => {
    try {
      const response = await API.get("v1/admin/facility/?page_size=10");
      setFacilities(response.data.results);
      setNextpage(response.data.next);
    } catch (error) {
      console.error("Error fetching facilities:", error);
    }
  };
  const loadMoreData = async () => {
    try {
      const response = await API.get(nextpage);
      const data = response.data.results
      setFacilities(prv=>{
        return [...prv,...data]
      });
      setNextpage(response.data.next);
    } catch (error) {
      console.error("Error fetching facilities:", error);
    }
  };
  const openCreateModal = () => setCreateTrigger(true);
  const closeCreateModal = () => setCreateTrigger(false);

  return (
    <div className="text-dark-400">
      <FacilitiesHeader openCreateModal={openCreateModal} />
      <FacilitiesTable facilities={facilities} loadMoreData={loadMoreData}/>
      {createTrigger && (
        <CreateFacilityModal
          closeCreateModal={closeCreateModal}
          fetchFacilities={fetchFacilities}
        />
      )}
    </div>
  );
}
