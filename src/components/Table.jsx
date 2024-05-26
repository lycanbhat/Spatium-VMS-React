import React, { useState } from 'react';

const Table = ({ headers, data, onEdit, onDelete }) => {
  const [dropdownIndex, setDropdownIndex] = useState(null);

  const toggleDropdown = (index) => {
    setDropdownIndex(dropdownIndex === index ? null : index);
  };

  return (
    <div>
        <div className=" overflow-auto rounded-t-lg border border-gray-200">
        <table className="min-w-full bg-white rounded-t-lg ">
            <thead>
            <tr>
                {headers.map((header, index) => (
                <th key={index} className="px-4 text-sm py-2 border-b text-left">
                    {header}
                </th>
                ))}
                <th className="px-4 py-2 border-b text-sm"></th>
            </tr>
            </thead>
            <tbody>
            {data.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-100">
                {Object.values(row).map((cell, cellIndex) => (
                    <td key={cellIndex} className="px-4 py-2 border-b">
                    {cell}
                    </td>
                ))}
                <td className="px-4 py-2 border-b relative">
                    <button className="focus:outline-none" onClick={() => toggleDropdown(rowIndex)}>
                    ...
                    </button>
                    {dropdownIndex === rowIndex && (
                    <div className="absolute right-0 w-32 mt-2 bg-white border border-gray-200 rounded shadow-lg shadow-gray-200 z-10">
                        <button
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        onClick={() => {
                            onEdit(row.id);
                            setDropdownIndex(null);
                        }}
                        >
                        Edit
                        </button>
                        <button
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        onClick={() => {
                            onDelete(rowIndex);
                            setDropdownIndex(null);
                        }}
                        >
                        Delete
                        </button>
                    </div>
                    )}
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>

    </div>
  );
};
export default Table