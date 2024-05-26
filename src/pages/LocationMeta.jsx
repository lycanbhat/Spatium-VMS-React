import React, { useEffect, useState } from "react";
import LocationCard from "../components/LocationMetaCom/LocationCard";
import { makeApiCall } from "../Utils/api-funcs";

export default function LocationMeta() {
  const [states, setStates] = useState([]);
  // const getState = async () => {
  //   const apicall = await makeApiCall('GET','v1/admin/state/?page_size=10')
  //   setStates([
  //     {
  //       id: 1,
  //       name: "Karnataka",
  //       is_archive: false,
  //       created_at: "2024-04-06T18:51:10.222101+05:30",
  //       modified_at: "2024-04-06T18:51:10.222113+05:30",
  //     },
  //     {
  //       id: 2,
  //       name: "Kerala",
  //       is_archive: false,
  //       created_at: "2024-05-15T01:24:51.363611+05:30",
  //       modified_at: "2024-05-15T01:24:51.363630+05:30",
  //     },
  //   ]);
  // };
  useEffect(() => {
    // getState();
  }, []);
  return (
    <div className="grid grid-cols-3 gap-2">
      <LocationCard title={"State"} api={'v1/admin/state/'}/>
      <LocationCard title={"City"} addOn={{ name: "state" }} api={'v1/admin/city/'} support_api={'v1/admin/state/'} />
      <LocationCard title={"Zone"} api={'v1/admin/zone/'} />
    </div>
  );
}
