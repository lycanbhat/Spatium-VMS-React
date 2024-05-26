import React, { useEffect, useState } from "react";
import searchIco from "../../assets/images/icons/searchIco.svg";
import searchIcoW from "../../assets/images/icons/searchIcoW.svg";
import addIco from "../../assets/images/icons/ic_fluent_add_24_filled.svg";
import addIcoW from "../../assets/images/icons/ic_fluent_add_white.svg";
import editIcon from "../../assets/images/icons/edit.svg";
import deleteIcon from "../../assets/images/icons/delete.svg";
import { makeApiCall } from "../../Utils/api-funcs";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export default function LocationCard({ title, addOn, api, support_api }) {
  const [addT, setAddT] = useState(false);

  const [data, setData] = useState([]);
  const [list, setList] = useState([]);

  const [name, setName] = useState("");
  const [supporter, setSupporter] = useState("");
  const search = async(text) => {
    const {data} = await makeApiCall('GET',`${api}?search=${text}`)
    setData(data.results)
  }
  const create = async () => {
    var formdata = {};
    if (addOn) {
      formdata["name"] = name;
      formdata[addOn.name] = supporter;

      const { status, data } = await makeApiCall("POST", `${api}`, formdata);
      if (status == "success") {
        setName("");
        getPrimaryData();
        // toast("Added successfully!!",{
        //   type:"success"
        // })
      } else {
        // toast("Something went wtong!!",{
        //   type:"warning"
        // })
      }
    } else {
      const { status, data } = await makeApiCall("POST", `${api}`, { name });
      if (status == "success") {
        setName("");
        getPrimaryData();
        // toast("Added successfully!!",{
        //   type:"success"
        // })
      } else {
        // toast("Something went wtong!!",{
        //   type:"warning"
        // })
      }
    }
  };
  const getPrimaryData = async () => {
    const { status, data } = await makeApiCall("GET", `${api}?page_size=100`);
    if (status == "success") {
      setData(data.results);
    }
  };
  const getSecondaryData = async () => {
    const { status, data } = await makeApiCall(
      "GET",
      `${support_api}?page_size=100`
    );
    if (status == "success") {
      setList(data.results);
    }
  };
  useEffect(() => {
    getPrimaryData();
    if (support_api) {
      getSecondaryData();
    }
  }, []);

  return (
    <div className="rounded-lg bg-white px-[12px] h-[75vh] flex flex-col">
      <div className="border-b py-2">
        <h3 className="text-center text-sm font-bold uppercase">{title}</h3>
      </div>
      <div className="flex pt-2">
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
          <button className=" w-6 aspect-square p-1 border border-primary-500 rounded">
            <img src={searchIco} alt="" />
          </button>
          <button
            onClick={() => setAddT(true)}
            className={` w-6 aspect-square p-1 bg-gray-500 rounded flex justify-center items-center`}
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
              placeholder={`Enter ${title}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {addOn ? (
              <select
                value={supporter}
                onChange={(e) => setSupporter(e.target.value)}
                className="w-24 text-xs rounded border border-gray-500"
              >
                <option value="" disabled>{`Select ${addOn.name}`}</option>
                {list?.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                ))}
              </select>
            ) : null}
          </div>
          <button
            onClick={create}
            className={` w-6 aspect-square p-1 rounded border border-primary-500 flex justify-center items-center`}
          >
            <img src={addIco} alt="" />
          </button>
          <button
            onClick={() => setAddT(false)}
            className=" w-6 aspect-square p-1 border bg-gray-500 rounded"
          >
            <img src={searchIcoW} alt="" />
          </button>
        </div>
      </div>
      <div className="pt-2 overflow-y-auto">
        {data.map((e, i) => {
          return (
            <CardItem
              key={i}
              item={e}
              link={`${api}${e?.id}/`}
              getPrimaryData={getPrimaryData}
              list={list.length ? list : []}
            />
          );
        })}
      </div>
    </div>
  );
}

export function CardItem({ item, link, list, getPrimaryData }) {
  console.log({ list });
  const [edit, setEdit] = useState(false);
  const [_delete,setDelete] = useState(false)

  const [value, setValue] = useState();
  const [selectedSupport, setSelectedSupport] = useState([]);
  const editFn = async () => {
    var data;
    if (list.length) {
      data = {
        name: value,
        state: selectedSupport,
      };
    } else {
      data = {
        name: value,
      };
    }
    const { status } = await makeApiCall("PUT", link, data);
    if (status == "success") {
      getPrimaryData();
      setEdit(false);
    }
  };
  const deleteFn = async()=>{
    const { status } = await makeApiCall("DELETE", link);
    if (status == "success") {
      getPrimaryData();
      setDelete(false);
    }
  }
  useEffect(() => {
    setValue(item.name);
    if (list.length) {
      setSelectedSupport(item?.state);
    }
  }, []);
  return (
    <div className="border-b border-gray-300 hover:bg-[#ebebeb] px-2 py-1 flex justify-between items-center">
      <span className="h-6">
        {!edit ? (
          item.name
        ) : (
          <div className="flex h-full gap-1">
            <input
              type="text"
              className="w-full h-full border border-gray-300 rounded outline-none px-1 text-xs"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
            {list.length ? (
              <select
                value={selectedSupport}
                onChange={(e) => setSelectedSupport(e.target.value)}
                className="text-xs w-16 rounded-md p-1"
              >
                {list.map((e, i) => {
                  return (
                    <option value={e.id} key={i}>
                      {e.name}
                    </option>
                  );
                })}
              </select>
            ) : null}
          </div>
        )}
      </span>
      <span className="p-1 h-6 flex justify-center items-center ">
        {!edit && !_delete ? (
          <div className="flex gap-1">
            <span
              onClick={() => setEdit((prv) => !prv)}
              className="p-1 aspect-square rounded-md hover:bg-gray-300 hover:cursor-pointer"
            >
              <img src={editIcon} className="h-4" alt="" />
            </span>
            <span
              onClick={() => setDelete(prv=>!prv)}
              className="p-1 aspect-square rounded-md bg-red-300 hover:cursor-pointer"
            >
              <img src={deleteIcon} className="h-4" alt="" />
            </span>
          </div>
        ) : 
        edit?
        (
          <div className="flex gap-1">
            <span
              onClick={editFn}
              className=" h-6 flex justify-center items-center p-1 aspect-square rounded-md bg-green-200 text-green-500 cursor-pointer"
            >
              &#x2714;
            </span>
            <span
              onClick={() => setEdit((prv) => !prv)}
              className=" h-6 flex justify-center items-center aspect-square rounded-md hover:bg-gray-300 cursor-pointer"
            >
              <span className="text-[1.4rem]">&times;</span>
            </span>
          </div>
        ):
        (
          <div className="flex gap-1">
            <span
              onClick={deleteFn}
              className=" h-6 flex justify-center items-center p-1 aspect-square rounded-md bg-green-200 text-green-500 cursor-pointer"
            >
              &#x2714;
            </span>
            <span
              onClick={() => setDelete((prv) => !prv)}
              className=" h-6 flex justify-center items-center aspect-square rounded-md hover:bg-gray-300 cursor-pointer"
            >
              <span className="text-[1.4rem]">&times;</span>
            </span>
          </div>
        )
      }
      </span>
    </div>
  );
}
