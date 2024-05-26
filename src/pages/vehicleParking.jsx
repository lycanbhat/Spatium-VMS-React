import React, { useState } from "react";
import Modal from "../components/Modal";
import active_slote from "../assets/images/car_occupied.svg";
import inactive_slote from "../assets/images/car_vacc.svg";

import API from "../Utils/API";

function VehicleParking() {
  const [slotes, setSlotes] = useState([
    {
      no: 1,
      occuppied: true,
    },
    {
      no: 2,
      occuppied: true,
    },
    {
      no: 3,
      occuppied: true,
    },
    {
      no: 4,
      occuppied: true,
    },
    {
      no: 5,
      occuppied: true,
    },
    {
      no: 6,
      occuppied: true,
    },
    {
      no: 7,
      occuppied: false,
    },
    {
      no: 8,
      occuppied: false,
    },
    {
      no: 9,
      occuppied: false,
    },
    {
      no: 10,
      occuppied: false,
    },
    {
      no: 11,
      occuppied: false,
    },
    {
      no: 12,
      occuppied: false,
    },
    {
      no: 13,
      occuppied: false,
    },
    {
      no: 14,
      occuppied: false,
    },
    {
      no: 15,
      occuppied: false,
    },
    {
      no: 16,
      occuppied: false,
    },
    {
      no: 17,
      occuppied: false,
    },
    {
      no: 18,
      occuppied: false,
    },
    {
      no: 19,
      occuppied: false,
    },
    {
      no: 20,
      occuppied: false,
    },
    {
      no: 21,
      occuppied: false,
    },
    {
      no: 22,
      occuppied: false,
    },
    {
      no: 23,
      occuppied: false,
    },
    {
      no: 24,
      occuppied: false,
    },
    {
      no: 25,
      occuppied: false,
    },
    {
      no: 26,
      occuppied: false,
    },
    {
      no: 27,
      occuppied: false,
    },
    {
      no: 28,
      occuppied: false,
    },
    {
      no: 29,
      occuppied: false,
    },
    {
      no: 30,
      occuppied: false,
    },
    {
      no: 31,
      occuppied: false,
    },
    {
      no: 32,
      occuppied: false,
    },
    {
      no: 33,
      occuppied: false,
    },
    {
      no: 34,
      occuppied: false,
    },
    {
      no: 35,
      occuppied: false,
    },
    {
      no: 36,
      occuppied: false,
    },
    {
      no: 37,
      occuppied: false,
    },
    {
      no: 38,
      occuppied: true,
    },
    {
      no: 39,
      occuppied: false,
    },
    {
      no: 40,
      occuppied: false,
    },
  ]);
  return (
    <div className=" text-dark-400">
      <header className="flex items-center justify-between">
        <h2 className=" font-semibold text-2xl">Vehicle parking</h2>
      </header>
      <div className="mt-4">
        <h4 className=" font-medium text-xl">Vehicle movement analysis</h4>
        <p className="text-sm text-dark-100 mt-1">
          Experience efficient vehicle parking and movement with our Vision AI.
          Smartly identify available spaces and track vehicle movement for
          safety. Embrace intelligent solutions for a smoother urban experience.
        </p>
      </div>
      <div className="mt-3 flex gap-2">
        <div className="bg-white w-56 rounded-md p-2">
          <p className="text-md font-bold ">Total parking slots</p>
          <p className="text-4xl font-bold mt-1">45</p>
        </div>
        <div className="bg-white w-56 rounded-md p-2">
          <p className="text-md font-bold ">Available parking</p>
          <p className="text-4xl font-bold mt-1">28</p>
        </div>
        <div className="bg-white w-56 rounded-md p-2">
          <p className="text-md font-bold ">Occupied parking</p>
          <p className="text-4xl font-bold mt-1">17</p>
        </div>
      </div>
      <div className="mt-3 flex gap-x-3 gap-y-6 flex-wrap">
        {slotes &&
          slotes.map((e, i) => {
            return (
              <div key={i} className="relative flex justify-center items-center">
                <img src={e.occuppied?active_slote:inactive_slote} className="h-16" alt="" />
                <p className="absolute text-sm opacity-[0.3]">{e.no}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default VehicleParking;
