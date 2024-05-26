import React, { useEffect, useState } from "react";
import TableComponent from "../components/TableComponent";
import Table from "../components/Table";
import { makeApiCall } from "../Utils/api-funcs";

import searchIco from "../assets/images/icons/searchIco.svg";
import searchIcoW from "../assets/images/icons/searchIcoW.svg";
import addIco from "../assets/images/icons/ic_fluent_add_24_filled.svg";
import addIcoW from "../assets/images/icons/ic_fluent_add_white.svg";

function Facilitie({ addOn }) {
  const [data, setData] = useState();
  const [zoneList, setZoneList] = useState([]);
  const [cityList, setCityList] = useState([]);
  //   add sec
  const [addT, setAddT] = useState(false);
  const [name, setName] = useState("");
  const [supporter, setSupporter] = useState("");
  const [supporter2, setSupporter2] = useState("");
  const api = "v1/admin/facility/";

  const search = async(text) => {
    const {data} = await makeApiCall('GET',`${api}?search=${text}`)
    setData(data)
  }

  const getZones = async () => {
    const { status, data } = await makeApiCall(
      "GET",
      `v1/admin/zone/?page_size=500`
    );
    if (status == "success") {
      setZoneList(data?.results);
    }
  };
  const getCities = async () => {
    const { status, data } = await makeApiCall(
      "GET",
      `v1/admin/city/?page_size=500`
    );
    if (status == "success") {
      setCityList(data?.results);
    }
  };


  const create = async () => {
    var formdata = {};
    formdata={
        name,
        city:supporter,
        zone:supporter2
    }

    const { status, data } = await makeApiCall("POST", `${api}`, formdata);
    if (status == "success") {
      setName("");
      getData();
      setSupporter('')
      setSupporter2('')
      // toast("Added successfully!!",{
      //   type:"success"
      // })
    } else {
      // toast("Something went wtong!!",{
      //   type:"warning"
      // })
    }
  };

  //   /add-sec

  const getData = async () => {
    const { data, status } = await makeApiCall(
      "GET",
      "v1/admin/facility/?page_size=10"
    );
    console.log({ data });
    setData(data);
  };
  const handleEdit = async(id) =>{
    console.log({id});
  }
  const handleDelete = async(id) =>{
    console.log({id});

  }

  const headers = ['ID','Name', 'Email', 'Membership No.', 'Member since'];
  const data_ = [
    { id:1,Name: 'Nimit Handa', Email: 'aryashbhatt@metaverse.com', 'Membership No.': '774598', 'Member since': '10-01-1949' },
    { id:3,Name: 'Girish Prabhu', Email: 'mody.ehsaan@yahoo.com', 'Membership No.': '730891', 'Member since': '21-06-1987' },
    {id:3, Name: 'Jagruthi Ramachandran', Email: 'gurbani.moitram@company.com', 'Membership No.': '797463', 'Member since': '01-06-1941' },
    { id:3,Name: 'Liza Bath', Email: 'advikkelkar@symbol.com', 'Membership No.': '176213', 'Member since': '18-12-1994' },
    { id:3,Name: 'Samar Jain', Email: 'sueveerpujar@century.org', 'Membership No.': '370093', 'Member since': '31-07-1985' },
  ];


  useEffect(() => {
    getData();
    getZones();
    getCities()
  }, []);
  return (
    <div>
      <div className="flex pt-2 h-10 mb-3">
        <div
          className={`flex gap-1 overflow-x-hidden transition-all duration-300 ${
            !addT ? "w-full px-1" : "w-0"
          } `}
        >
          <div
            className={`grow flex h-full overflow-hidden ${
              !addT ? "w-full" : "w-0"
            }`}
          >
            <input
              type="text"
              className="w-full h-full border border-gray-300 rounded outline-none px-1 text-xs"
              placeholder="Search.."
              onChange={(e)=>search(e.target.value)}
            />
          </div>
          <button className=" aspect-square p-1 border border-primary-500 rounded">
            <img src={searchIco} alt="" />
          </button>
          <button
            onClick={() => setAddT(true)}
            className={`  aspect-square p-1 bg-gray-500 rounded flex justify-center items-center`}
          >
            <img src={addIcoW} alt="" />
          </button>
        </div>

        <div
          className={`flex gap-1 overflow-x-hidden transition-all duration-300 ${
            addT ? "w-full px-1" : "w-0"
          }`}
        >
          <div
            className={`grow flex gap-1 overflow-hidden ${
              addT ? "w-full" : "w-0"
            }`}
          >
            <input
              type="text"
              className="w-full h-full border border-gray-3 00 rounded outline-none px-1 text-xs"
              placeholder={`Enter Facility name`}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <select
              value={supporter}
              onChange={(e) => setSupporter(e.target.value)}
              className="w-24 md:w-56 text-xs rounded border border-gray-500"
            >
              <option value="" selected disabled>{`Select City`}</option>
              {cityList?.map((e) => (
                <option value={e.id}>{e.name}</option>
              ))}
            </select>
            <select
              value={supporter2}
              onChange={(e) => setSupporter2(e.target.value)}
              className="w-24 md:w-56 text-xs rounded border border-gray-500"
            >
              <option value="" selected disabled>{`Select Zone`}</option>
              {zoneList?.map((e) => (
                <option value={e.id}>{e.name}</option>
              ))}
            </select>
            
          </div>
          <button
            onClick={create}
            className={` aspect-square p-1 rounded border border-primary-500 flex justify-center items-center`}
          >
            <img src={addIco} alt="" className="w-[70%]" />
          </button>
          <button
            onClick={() => setAddT(false)}
            className=" aspect-square p-1 border bg-gray-500 rounded"
          >
            <img src={searchIcoW} alt="" />
          </button>
        </div>
      </div>
      {data && (
        // <TableComponent
        //   headers={[
        //     { headerId: "id", headerText: "ID" },
        //     { headerId: "name", headerText: "Name" },
        //     { headerId: "city", headerText: "City", list:true, listname:'list1' },
        //     { headerId: "zone", headerText: "Zone", list:true, listname:'list2' },
        //   ]}
        //   rows={data?.results}
        //   link={'v1/admin/facility/'}
        //   getData={getData}
        //   list1={cityList}
        //   list2={zoneList}
        //   list1_api={'v1/admin/city/'}
        //   list2_api={'v1/admin/zone/'}
        // />
        
        <Table headers={headers} data={data_} onEdit={handleEdit} onDelete={handleDelete} />
      )}
    </div>
  );
}

export default Facilitie;
