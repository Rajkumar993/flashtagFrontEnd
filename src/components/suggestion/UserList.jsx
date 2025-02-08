import axios from 'axios';
import React from 'react'
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
const UserList = ({user,setIsFollowed}) => {
  const navigate=useNavigate()
      const {user:currentId}=useSelector(state=>state.userId);
   function handlefollow(id){
     axios.post(`${import.meta.env.VITE_BACKEND_URL}/follow/${currentId.id}/${id}`).then(res=>{
      setIsFollowed(true)
      window.location.reload()
     }).catch(err=>console.log(err))
   }
  return (
<>
  
<div className="left flex">
  { user?.profiePic?<img src={`../../images/${user?.profiePic}`} className='w-8 h-8 rounded-full object-cover mr-2'/>: <p className='text-[30px] text-gray-400 mr-2'><FaUserCircle/></p>}
    <Link to={`/user/profile/${user.id}`}>{user.username}</Link>
    </div>
    <div className="right flex gap-2">
     <button onClick={()=>handlefollow(user.id)} className='bg-red-600 px-2 py-1 text-white rounded-md'>Follow</button>
     <button onClick={()=>navigate(`/user/profile/${user.id}`)} className='bg-violet-600 px-2 py-1 text-white rounded-md'>View Profile</button>
    </div>
</> 

  )
}

export default UserList
