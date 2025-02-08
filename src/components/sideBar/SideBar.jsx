import React, { useEffect, useState } from 'react'
import image from '../../../public/images/1.jpg'
import image2 from '../../../public/images/events.png'
import image3 from '../../../public/images/friends.png'
import { IoGameController } from "react-icons/io5";
import { RiMemoriesFill } from "react-icons/ri";
import { FaSwatchbook } from "react-icons/fa";
import { SiGooglemarketingplatform } from "react-icons/si";
import { GiThreeFriends } from "react-icons/gi";
import { MdOutlineOndemandVideo } from "react-icons/md";
import image4 from '../../../public/images/gallery.png'
import image5 from '../../../public/images/gaming.png'
import image6 from '../../../public/images/memories.png'
import image7 from '../../../public/images/shop.png'
import image8 from '../../../public/images/video.png'
import image9 from '../../../public/images/watch.png'
import image0 from '../../../public/images/group.png'
import { SiDiscourse } from "react-icons/si";

import { BsCalendar4Event } from "react-icons/bs";
import { MdGroups3 } from "react-icons/md";
import { RiRefund2Fill } from "react-icons/ri";
import { GrGallery } from "react-icons/gr";
import { FaUserCircle } from "react-icons/fa";
import { IoVideocamOutline } from "react-icons/io5";
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { MdEmail } from "react-icons/md";
const SideBar = ({username,profile}) => {
  const {user}=useSelector(state=>state.userId)
   const [darkmode,setDarkmode]=useState(false)
      useEffect(()=>{
         const value=JSON.parse(localStorage.getItem("darkmode")|| false);
         setDarkmode(value)
       },[])

  return (
    <div className={ `fixed top-[55px] py-4 flex flex-col ${darkmode?"bg-black text-white ":"bg-white"}  gap-3 pl-4 bottom-0 h-full w-80 border-r` }>
      <ul className='profile flex flex-col gap-2'>
        <Link to={`/user/profile/${user?.id}`}  className='flex items-center gap-1 cursor-pointer'>
            {/* <img src={image} className='w-8 h-8 object-cover rounded-full' alt="" /> */}
             {profile?.profiePic?<img className='h-[30px] w-[30px] rounded-full mr-2 object-cover  ' src={`../../images/${profile?.profiePic}`}/>:<p className='text-[30px] text-gray-400 mr-1'><FaUserCircle/></p>}
           <span>{username}</span>
        </Link>
        <li className='flex items-center gap-2'>
            {/* <img src={image3} className='w-8 h-8 object-cover rounded-full' alt="" /> */}
            <GiThreeFriends className='w-8 h-8 object-cover text-[#9D174D]'/>
        <span>Friends</span>
        </li>
        <li className='flex items-center gap-2'>
            {/* <img src={image0} className='w-8 h-8 object-cover rounded-full' alt="" /> */}
            <MdGroups3 className='w-8 h-8 object-cover text-[#374151]'/>
        <span>Groups</span>
        </li>
        <li className='flex items-center gap-2'>
            {/* <img src={image7} className='w-8 h-8 object-cover rounded-full' alt="" /> */}
            <SiGooglemarketingplatform className='w-8 h-8 object-cover text-[#0D9488]' />
        <span>Marketplace</span>
        </li>
        <li className='flex items-center gap-2'>
            {/* <img src={image9} className='w-8 h-8 object-cover rounded-full' alt="" /> */}
            <FaSwatchbook className='w-8 h-8 object-cover text-[#C026D3]'/>
        <span>Watch</span>
        </li>
        <li className='flex items-center gap-2'>
            {/* <img src={image6} className='w-8 h-8 object-cover rounded-full' alt="" /> */}
            <RiMemoriesFill className='w-8 h-8 object-cover text-sky-600'/>
        <span>Memories</span>
        </li>
      </ul>
      <ul className='shortcuts flex flex-col gap-2'>
        <p>Shortcuts</p>
      <p className='flex items-center gap-2'>
            {/* <img src={image2} className='w-8 h-8 object-cover rounded-full' alt="" /> */}
            <BsCalendar4Event className='w-8 h-8 object-cover text-red-300'/>
        <span>Events</span>
        </p>
        <p className='flex items-center gap-2'>
            {/* <img src={image5} className='w-8 h-8 object-cover rounded-full' alt="" /> */}
            <IoGameController className='w-8 h-8 object-cover text-green-500'/>
        <span>Gaming</span>
        </p>
        <p className='flex items-center gap-2'>
            {/* <img src={image4} className='w-8 h-8 object-cover rounded-full' alt="" /> */}
            <GrGallery className='w-8 h-8 object-cover text-blue-600'/>
        <span>Gallery</span>
        </p>
        <p className='flex items-center gap-2'>
           {/*<img src={image8} className='w-8 h-8 object-cover rounded-full' alt="" />*/}
           <IoVideocamOutline className='w-8 h-8 object-cover text-red-600'/>
        <span>Videos</span>
        </p>
        <p className='flex items-center gap-2'>
            <MdEmail className='w-8 h-8 object-cover text-yellow-600'/>
        <span>Message</span>
        </p>
      </ul>
      <ul className='others flex flex-col gap-2'>
        <p>Others</p>
      <p className='flex items-center gap-2'>
            {/* <img src={image} className='w-8 h-8 object-cover rounded-full' alt="" /> */}
            <RiRefund2Fill className='w-8 h-8 object-cover text-[#65A30D]'/>
        <span>Fudraiser</span>
        </p>
        <p className='flex items-center gap-2'>
            {/* <img src={image} className='w-8 h-8 object-cover rounded-full' alt="" /> */}
            <MdOutlineOndemandVideo className='w-8 h-8 object-cover text-[#BE123C]'/>
        <span>Tutorials</span>
        </p>
        <p className='flex items-center gap-2'>
            {/* <img src={image} className='w-8 h-8 object-cover rounded-full' alt="" /> */}
            <SiDiscourse className='w-8 h-8 object-cover text-[#BE490C]'/>
        <span>Courses</span>
        </p>
     
      </ul>
    </div>
  )
}

export default SideBar
