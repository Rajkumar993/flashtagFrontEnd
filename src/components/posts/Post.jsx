import React, { useEffect, useState } from 'react'

import axios from 'axios';

import SinglePost from './SinglePost';
const Post = ({setUserProfileRefetch,fetchpost,username,data,profile}) => {
    const [post,setPost]=useState([]);
    const[users,setUsers]=useState([])

    useEffect(()=>{
      setPost(data)
      console.log("post",post)
    },[data])
   
  return (
   <>
     <div className='pb-10 '>
      {post.map((p,i)=>{
        return (
        <SinglePost setUserProfileRefetch={setUserProfileRefetch} profile={profile} fetchpost={fetchpost} key={i} post={p} i={i}/>
        )
      })}
 
     </div>
   </>
  )
}

export default Post
