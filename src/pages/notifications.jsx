import React, { useEffect, useState } from "react";
import proImg from "../assets/images/tim-cook.jpeg";
import API from "../Utils/API"

export default function Notifications() {
  const [notifications,setNotifications] = useState([
    // {
    //   person:"Nimith Handa",
    //   position:"Gate 1",
    //   time:"10:32AM",
    //   movement:"entered",
    //   image:proImg
    // },
    // {
    //   person:"Rohit Zakaria",
    //   position:"Gate 1",
    //   time:"10:32AM",
    //   movement:"exited",
    //   image:proImg
    // },
    // {
    //   person:"Nimit Handa",
    //   position:"Gate 1",
    //   time:"11:32AM",
    //   movement:"exited",
    //   image:proImg
    // },
  ])
  const getNotifications = async() => {
    const apicall = API.get('v1/firebase/list/notification')
    const notifs = (await apicall).data
    console.log({notifs});
    setNotifications(notifs.data)
  }
  useEffect(()=>{
    getNotifications()
  },[])
  return (
    <div className=" text-dark-400">
      <header className="flex items-center justify-between">
        <h2 className=" font-semibold text-2xl">Notifications</h2>
      </header>
        <div className=" mt-11 mb-">
          {
            notifications?.map((e,i)=>{
              // return(
              //   <div className="bg-white mb-3 text-[#151515] text-sm h-16 flex items-center rounded-lg px-4">
              //     <div className="grow flex h-full items-center">
              //       <img src={e.image} className=" w-10 h-10 object-cover rounded-md mr-2" alt="" />
              //       <span className="text-primary-500 mr-1">{e.person}</span> has {e.movement} the premises from <span className="mx-1 font-bold">[{e.position}]</span> at <span className="mx-1 font-bold">[{e.time}]</span>
              //     </div>
              //     <div className="text-primary-500 cursor-pointer font-medium underline">
              //       View
              //     </div>
              //   </div>
              // )
              const not = e.message.split('has')
              return(
                <div key={i} className="bg-white mb-3 text-[#151515] text-sm h-16 flex items-center rounded-lg px-4">
                  <div className="grow flex h-full items-center">
                    <img src={e.profilePicture} className=" w-10 h-10 object-cover rounded-md mr-2" alt="" />
                    <span className="text-primary-500 mr-1">{not[0]}</span> 
                    has {not[1]}
                  </div>
                  <div className="text-primary-500 cursor-pointer font-medium underline">
                    View
                  </div>
                </div>
              )
            })
          }
        </div>
    </div>
  );
}
