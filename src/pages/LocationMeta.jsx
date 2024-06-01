import React, { useEffect, useState } from "react";
import LocationCard from "../components/LocationMetaCom/LocationCard";
import { makeApiCall } from "../Utils/api-funcs";

export default function LocationMeta() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
      <LocationCard title={"State"} api={'v1/admin/state/'}/>
      <LocationCard title={"City"} addOn={{ name: "state" }} api={'v1/admin/city/'} support_api={'v1/admin/state/'} />
      <LocationCard title={"Zone"} api={'v1/admin/zone/'} />
    </div>
  );
}
