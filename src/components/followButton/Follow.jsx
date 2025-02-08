import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
const Follow = ({userId,post}) => {
    const [followedUser,setFollowedUser]=useState([])
    const {user}=useSelector(state=>state.userId);
    const[unfollow,setUnfollow]=useState(false)
    useEffect(()=>{
        // console.log(post?.PostId,"from follow componets")
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/getfollowers/${userId || post?.postUserId}`).then(res=>setFollowedUser(res.data)).catch(err=>console.log(err))
    },[post,unfollow,userId]);
    console.log(followedUser,"followers list")
    function handlefollow(id){
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/follow/${id}/${userId || post?.postUserId}`).then(res=>{
        //  setIsFollowed(true)
         window.location.reload()
        setUnfollow(false)
        console.log(res)
        }).catch(err=>console.log(err))
      }
      function handleUnfollow(id){
        axios.delete(`${import.meta.env.VITE_BACKEND_URL}/unfollow/${id}/${userId || post?.postUserId}`).then(res=>{
        //  setIsFollowed(true)
        //  window.location.reload()
        setUnfollow(true)
        console.log(res)
        }).catch(err=>console.log(err))
      }
  return (

    <>
  {followedUser.includes(user?.id)?<button className='bg-gray-200 px-2 py-1 text-black rounded-md' onClick={()=>handleUnfollow(user?.id)}>Following</button>: post?.postUserId ==user?.id ||userId ==user?.id?null:<button className='bg-[#E11D48] text-white px-5 rounded-md py-1' onClick={()=>handlefollow(user?.id)}>Follow</button>}
    </>
    
  )
}

export default Follow
