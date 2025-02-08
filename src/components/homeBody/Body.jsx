import React, { useEffect, useState } from 'react'
import Story from '../stories/Story'
import AddPost from '../addpost/AddPost'
import Post from '../posts/Post'
const Body = ({setUserProfileRefetch,fetchpost,userId,username,data,profile}) => {
   console.log(data,"from body")
     const [darkmode,setDarkmode]=useState(false)
       useEffect(()=>{
             const value=JSON.parse(localStorage.getItem("darkmode")|| false);
             setDarkmode(value)
           },[])
  return (
  <>
  <div className={`HomeBody  w-full min-h-screen ${darkmode?"bg-[#333333] text-white":"bg-gray-200"}  -z-20`}>
    <div className="content flex flex-col items-center    ml-[350px] pt-[65px]  w-[650px] h-full">
      {/* <div className="story w-full ">
      <Story/>
      </div> */}
      <div className="addPost w-full">
        <AddPost fetchpost={fetchpost} profile={profile} userId={userId}/>
        
      </div>
      <div className="post w-full">
        <Post setUserProfileRefetch={setUserProfileRefetch} profile={profile} fetchpost={fetchpost} username={username} data={data}/>
      </div>
    </div>
  </div>
  </>
  )
}

export default Body
