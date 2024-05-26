import React, { useState } from "react";
import editIcon from "../assets/images/icons/edit.svg";
import deleteIcon from "../assets/images/icons/delete.svg";
import { makeApiCall } from "../Utils/api-funcs";

const TableComponent = ({ headers, rows, link, getData, list1=[], list2=[], list1_api, list2_api }) => {
  const [editRowIndex, setEditRowIndex] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [deleteRowIndex, setDeleteRowIndex] = useState(null);

  const handleInputChange = (headerId, value) => {
    setEditValues({
      ...editValues,
      [headerId]: value,
    });
  };

  const editFn = async (id) => {
    // Handle edit functionality
    const {status} = await makeApiCall('PUT',`${link}${id}/`,editValues)
    if(status == 'success') getData()
    setEditRowIndex(null);
  };

  const deleteFn = async (id) => {
    // Handle delete functionality
    const {status} = await makeApiCall('DELETE',`${link}${id}`)
    if(status == 'success') {
      getData()
    }
    
    setDeleteRowIndex(null);
  };

  const returnName = (list,id) =>{
    const data = list.findLast(x=>x.id == id)
    return data?.name
  }

  return (
    <div className="overflow-x-auto rounded-lg border shadow-md h-[75vh] flex flex-col">
      <table className="min-w-full">
        <thead className="border-b">
          <tr>
            {headers.map((header) => (
              <th
                key={header.headerId}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header.headerText}
              </th>
            ))}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-primary-100">
              {headers.map((header) => (
                <td key={header.headerId} className="px-6 py-4 whitespace-nowrap">
                  {editRowIndex === rowIndex ? (
                    !header.list?
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded outline-none px-1 text-xs h-6"
                      value={editValues[header.headerId] || row[header.headerId]}
                      onChange={(e) =>
                        handleInputChange(header.headerId, e.target.value)
                      }
                    />:
                    <select 
                    className="text-xs w-16 rounded-md p-1"
                    value={editValues[header.headerId]}
                    onChange={(e) =>
                      handleInputChange(header.headerId, e.target.value)
                    }
                    >
                      {(header.listname == 'list1'?list1:list2)?.map(e=>{
                        return <option value={e.id}>{e.name}</option>
                      })}
                    </select>
                  ) : (
                    header.list?(header.listname == 'list1'?returnName(list1,row[header.headerId]):returnName(list2,row[header.headerId]))
                    :row[header.headerId]
                  )}
                </td>
              ))}
              <td className="px-6 py-4 whitespace-nowrap">
                {editRowIndex !== rowIndex && deleteRowIndex !== rowIndex ? (
                  <div className="flex gap-1">
                    <span
                      onClick={() => {
                        setEditRowIndex(rowIndex);
                        setEditValues(row);
                      }}
                      className="p-1 aspect-square rounded-md hover:bg-gray-300 hover:cursor-pointer"
                    >
                      <img src={editIcon} className="h-4" alt="Edit" />
                    </span>
                    <span
                      onClick={() => setDeleteRowIndex(rowIndex)}
                      className="p-1 aspect-square rounded-md bg-red-300 hover:cursor-pointer"
                    >
                      <img src={deleteIcon} className="h-4" alt="Delete" />
                    </span>
                  </div>
                ) : editRowIndex === rowIndex ? (
                  <div className="flex gap-1">
                    <span
                      onClick={()=>editFn(row.id)}
                      className="h-6 flex justify-center items-center p-1 aspect-square rounded-md bg-green-200 text-green-500 cursor-pointer"
                    >
                      &#x2714;
                    </span>
                    <span
                      onClick={() => setEditRowIndex(null)}
                      className="h-6 flex justify-center items-center aspect-square rounded-md hover:bg-gray-300 cursor-pointer"
                    >
                      <span className="text-[1.4rem]">&times;</span>
                    </span>
                  </div>
                ) : deleteRowIndex === rowIndex ? (
                  <div className="flex gap-1">
                    <span
                      onClick={()=>deleteFn(row.id)}
                      className="h-6 flex justify-center items-center p-1 aspect-square rounded-md bg-green-200 text-green-500 cursor-pointer"
                    >
                      &#x2714;
                    </span>
                    <span
                      onClick={() => setDeleteRowIndex(null)}
                      className="h-6 flex justify-center items-center aspect-square rounded-md hover:bg-gray-300 cursor-pointer"
                    >
                      <span className="text-[1.4rem]">&times;</span>
                    </span>
                  </div>
                ) : (
                  <div className="flex gap-1">
                    <span
                      onClick={() => {
                        setEditRowIndex(rowIndex);
                        setEditValues(row);
                      }}
                      className="p-1 aspect-square rounded-md hover:bg-gray-300 hover:cursor-pointer"
                    >
                      <img src={editIcon} className="h-4" alt="Edit" />
                    </span>
                    <span
                      onClick={() => setDeleteRowIndex(rowIndex)}
                      className="p-1 aspect-square rounded-md bg-red-300 hover:cursor-pointer"
                    >
                      <img src={deleteIcon} className="h-4" alt="Delete" />
                    </span>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
