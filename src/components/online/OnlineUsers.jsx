import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const OnlineUsers = ({darkmode}) => {
    const [followedUser,setFollowedUser]=useState([]);
    const{user}=useSelector(state=>state.userId)
    useEffect(()=>{
      // console.log(post?.PostId,"from follow componets")
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/online/${user?.id}`).then(res=>setFollowedUser(res.data)).catch(err=>console.log(err))
  },[user]);
  console.log(followedUser,"online")
  return (
    <div className={`md:w-[350px] xl:w-[470px] [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-300
  dark:[&::-webkit-scrollbar-thumb]:bg-blue-300 rounded-md px-3 py-2 overflow-y-scroll h-[200px] max-h-[200px] ${darkmode?"bg-black text-white":"bg-white text-black"}  fixed right-2 flexl flex-col  bottom-3`}>
     <div className='heading mb-3'>
      <h1>Online Friends</h1>
      </div>
    <ul className="online-users flex flex-col gap-3">
 {followedUser?.length>0?followedUser.map(user=>{
  return(
    <Link to={`/user/profile/${user.id}`} key={user.id} className='relative flex items-center justify-between'>
    <li className='flex text-xl items-center'>{user.profiePic?<img className='w-8 h-8 rounded-full mr-2 object-cover'  src={`../../images/${user.profiePic}`}/>:<FaUserCircle className=' text-gray-400 mr-2 text-[30px]'/>} {user.username}</li>
    <p className='absolute top-0 w-3 h-3 ml-5 rounded-full bg-green-500 '></p>
    <li className='text-green-500'>Online</li>
    </Link>
  )
 }):<div className="flex flex-col items-center text-gray-500 mt-5">
 <span className="ml-2 animate-bounce">🌍</span>
 <span className='mt-2'>Friends currently out exploring the world...</span>
</div>}
  


    </ul>
    </div>
  )
}

export default OnlineUsers
