import React, { useEffect, useState } from 'react'
import { FaRegHeart } from "react-icons/fa";
import moment from 'moment'
import { FaUserCircle } from "react-icons/fa";
import { TfiCommentAlt } from "react-icons/tfi";
import { FaHeart } from "react-icons/fa";
import { useSelector } from 'react-redux';
import Commant from '../comment/Commant';
import axios from 'axios';
import Follow from '../followButton/Follow';
import DeletePost from '../deletePost/DeletePost';
import { Link } from 'react-router-dom';

const SinglePost = ({setUserProfileRefetch,fetchpost,post,i,profile}) => {
    const[data,setData]=useState([])
     const {user}=useSelector(state=>state.userId);
     const [likeTrigger,setLikeTrigger]=useState(false)
    const[commentData,setCommentData]=useState([]);
    const [darkmode,setDarkmode]=useState(false)
     const[showcomment,setShowcomment]=useState(false)
     const[postId,setPostId]=useState(null)
    useEffect(()=>{
     axios.get(`${import.meta.env.VITE_BACKEND_URL}/getlikes/${post.PostId}`)
     .then(res=>{
        setData(res.data);
    })
     .catch(err=>console.log(err))
     
    },[post,likeTrigger])

    const handlelike=(postId)=>{
   
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/add-like/${user.id}/${postId}`)
        .then(res=>setLikeTrigger(!likeTrigger))
        .catch(err=>console.log(err))
    }
    const deletelike=(postId)=>{
        axios.delete(`${import.meta.env.VITE_BACKEND_URL}/deletlike/${user.id}/${postId}`)
        .then(res=>setLikeTrigger(!likeTrigger))
        .catch(err=>console.log(err))
    }


    const handleComment=(postId)=>{
      setPostId(postId)
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/getcomment/${postId}`).then(res=>setCommentData(res.data)).catch(console);
     console.log(postId)
    }
    useEffect(()=>{
      const value=JSON.parse(localStorage.getItem("darkmode")||false);
      setDarkmode(value)
    },[])
     
  return (
    <div key={i} className={`${darkmode?"bg-black text-white":"bg-white text-black"} w-full p-5  mt-4 rounded-md`}>
    <div className='top flex justify-between py-2'>
    <div className='  flex items-center '>
     {post?.profile?<img className='h-[30px] w-[30px] rounded-full mr-2 object-cover  ' src={`../../images/${post?.profile}`}/>:<p className='text-[30px] text-gray-400 mr-2'><FaUserCircle/></p>}
    <p>{post?.postAuthorprofile}</p>
    { post?.postUserId===user?.id?<Link state={post?post:null} to={`/user/profile/${post?.postUserId}`} className='mr-3'>You</Link>:<Link state={post?post:null} to={`/user/profile/${post?.postUserId}`} className='mr-3'>{post?.PostAuthor}</Link>}
     <p className='text-gray-400'>{post && moment(post?.time).fromNow()}</p>
     <p className='ml-4'> <Follow post={post}/></p>
    </div>
     {post?.postUserId==user?.id?<div><DeletePost setUserProfileRefetch={setUserProfileRefetch} fetchpost={fetchpost} post={post}/></div>:null}
     </div>
      <div className="bottom py-t">
      <p className='pl-2 pb-2'>{post?.description}</p>
      <img className='w-full py-2 h-[400px] object-center object-contain ' src={`../../images/${post?.post}`} alt="" />
      </div>
      <div className="foot flex items-center py-3 gap-3">
      <button  className='flex items-center gap-1 pl-2'>
    {  data.includes(user.id)?<><FaHeart onClick={()=>deletelike(post?.PostId)} className='text-red-600'/><span>{data.length}{data.length<=1?"like":"likes"}</span></>:<><FaRegHeart  onClick={()=>handlelike(post?.PostId)}/><span>{data.length}{data.length<=1?"like":"likes"}</span></>}
      </button>
      <button onClick={()=>{
        setShowcomment(!showcomment)
        if(!showcomment){
          handleComment(post?.PostId)
        }
        }} className='flex items-center gap-1'>
      <TfiCommentAlt /><span>{commentData.length} {commentData.length<=1?"comment":"comments"}</span>
      </button>
    
      </div>
      { showcomment ?<div>
        <Commant darkmode={darkmode} profile={profile} handleComment={handleComment} post={post} commentData={commentData}/>
      </div>:null}
    </div> 
  )
}

export default SinglePost
