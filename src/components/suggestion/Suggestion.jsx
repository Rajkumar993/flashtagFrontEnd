import axios from 'axios'
import React, { useEffect, useState } from 'react'
import UserList from './UserList'
import { useSelector } from 'react-redux'

const Suggestion = () => {
  const[users,setUsers]=useState([])
  const {user}=useSelector(state=>state.userId);
  const[isfollowed,setIsFollowed]=useState(false);
  const [darkmode,setDarkmode]=useState(false)
  useEffect(()=>{
        const value=JSON.parse(localStorage.getItem("darkmode")|| false);
        setDarkmode(value)
      },[])
  useEffect(()=>{
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/getusers/${user?.id}`)
    .then(res=>{
      setUsers(res.data)
      console.log(users)
    })
    .catch(err=>console.log(err))
 
  },[isfollowed,user])
  return (
    <>
    <div className={`suggestion fixed flex flex-col   gap-2 ml-6 right-0 px-3 h-[150px] rounded-md max-h-[150px] md:w-[350px] xl:w-[470px]  py-2 overflow-y-scroll [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-300
  dark:[&::-webkit-scrollbar-thumb]:bg-blue-300 ${darkmode?"bg-black text-white":"bg-white text-black"}  mr-2 top-20`}>
    <p>Suggestion for you</p>
      {users.length>0? users.filter(u=>u.id!=user?.id).slice(0,5).map(user=>{
        return (
          <div key={user.id} className="user  flex justify-between">

            <UserList setIsFollowed={setIsFollowed} user={user}/>
          </div>
      )
      }):<div className="flex flex-col items-center text-gray-500 mt-5">
      <span className="text-xl animate-bounce">📭</span>
      <p className="mt-2 text-sm">No more suggestions! You've made so many friends! 🎉</p>
    </div>}

    </div>
    </>
  )
}

export default Suggestion
