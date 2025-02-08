import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';


const Activities = () => {
      const [darkmode,setDarkmode]=useState(false);
      const{user}=useSelector(state=>state.userId)
       useEffect(()=>{
              const value=JSON.parse(localStorage.getItem("darkmode")|| false);
              setDarkmode(value)
            },[])
  return (
   <>
    <div className={`activities fixed flex flex-col h-[250px] py-3  rounded-md gap-2 ml-6 right-0 p-3 md:w-[350px] xl:w-[470px] ${darkmode?"bg-black text-white":"bg-white text-black"}  mr-2 top-[249px]`}>
        <p>Latest Activities</p>
        <div className="users flex justify-between ">
            <div className="left flex items-center">
                <img src="" alt="" />
                <p>{user?.name}</p>
                <p className='text-sm'>Changed their cover pic </p>
            </div>
           <div className="right flex items-center">
            <p className='text-sm'>1 min ago</p>
           </div>
        </div>
        <div className="users flex justify-between ">
            <div className="left flex items-center">
                <img src="" alt="" />
                <p>{user?.name}</p>
                <p className='text-sm'>Changed their cover pic </p>
            </div>
           <div className="right flex items-center">
            <p className='text-sm'>1 min ago</p>
           </div>
        </div>
        <div className="users flex justify-between ">
            <div className="left flex items-center">
                <img src="" alt="" />
                <p>{user?.name}</p>
                <p className='text-sm'>Changed their cover pic </p>
            </div>
           <div className="right flex items-center">
            <p className='text-sm'>1 min ago</p>
           </div>
        </div>
        <div className="users flex justify-between ">
            <div className="left flex items-center">
                <img src="" alt="" />
                <p>{user?.name}</p>
                <p className='text-sm'>Changed their cover pic </p>
            </div>
           <div className="right flex items-center">
            <p className='text-sm'>1 min ago</p>
           </div>
        </div>
        <div className="users flex justify-between ">
            <div className="left flex items-center">
                <img src="" alt="" />
                <p>{user?.name}</p>
                <p className='text-sm'>Changed their cover pic </p>
            </div>
           <div className="right flex items-center">
            <p className='text-sm'>1 min ago</p>
           </div>
        </div>
        <div className="users flex justify-between ">
            <div className="left flex items-center">
                <img src="" alt="" />
                <p>{user?.name}</p>
                <p className='text-sm'>Changed their cover pic </p>
            </div>
           <div className="right flex items-center">
            <p className='text-sm'>1 min ago</p>
           </div>
        </div>
 
    </div>
   </>
  )
}

export default Activities
