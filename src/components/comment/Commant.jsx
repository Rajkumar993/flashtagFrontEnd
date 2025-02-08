import React, { useEffect, useMemo, useState } from 'react'
import { FaUserCircle } from "react-icons/fa";
import { BsSend } from "react-icons/bs";
import axios from 'axios';
import moment from 'moment';
import { MdEmojiEmotions } from "react-icons/md";
import { useSelector } from 'react-redux';
import Emoji from '../emoji/Emoji';
const Commant = ({darkmode,commentData,post,handleComment,profile}) => {
    const[showSend,setShowSend]=useState(true);
    const {user}=useSelector(state=>state.userId);
    const[message,setShowMessage]=useState('');
    const {data} =useSelector(state=>state.userDetails);
    const[emoji,setEmoji]=useState(false)
    const show=useMemo(()=>{
        console.log("rendered")
      return false
  
    },[showSend]);

const handleComments=(e)=>{
    e.preventDefault();
    setEmoji(false)
if(message!=''){
  axios.post(`${import.meta.env.VITE_BACKEND_URL}/postcomment/${user?.id}/${post?.PostId}`,{content:message}).then(res=>handleComment(post?.PostId)).catch(err=>console.log(err))
  setShowSend(true)
  setShowMessage("");
}else{
  alert("Type your thoughts to post")
}
    
}

  return (
 <>
   <div className='w-full mt-4'>
     <form onSubmit={handleComments} className="input flex py-2 items-center rounded-full px-2 border">
       { profile?.profiePic?<img className='h-[30px] w-[30px] rounded-full mr-2 object-cover  ' src={`../../images/${profile?.profiePic}`} alt=""/>:<p className='text-[30px] text-gray-400 mr-2'><FaUserCircle/></p>}
      <input  value={message} onChange={(e)=>{
       setShowSend(show)
setEmoji(false)
       setShowMessage(e.target.value)
      }} 
      placeholder='Add Comment...'
       className={`flex-1 rounded-full px-2 outline-none ${darkmode?"bg-black text-white":"text-black bg-white"} `}
        type="text" />
  <div className='relative'>
  <button type='button' onClick={()=>setEmoji(!emoji)} ><MdEmojiEmotions className={`text-2xl mt-1 ${darkmode?"text-yellow-300":"text-black"} `}/></button>
        
        <button type='submit' hidden={showSend} className={`px-2 ${darkmode?"text-white":"text-black"}  text-xl text-center rounded-full` }><BsSend/></button>
      <div className='absolute bottom-0 left-8'>
      <Emoji setShowSend={setShowSend} setValue={setShowMessage} emoji={emoji} />
      </div>
  
  </div>
     </form>
     <div className='py-4 pl-2 max-h-[350px] overflow-y-auto'>
        {commentData?.map((comment,i)=>{
            return (
          
               <div key={comment.userId} className='mb-2'>
               <div className="user flex items-center">
              { comment.commenterprofile?<img className='h-[30px] w-[30px] rounded-full mr-2 object-cover  ' src={`../../images/${comment.commenterprofile}`} alt="" />:<p className='text-[30px] text-gray-400 mr-2'><FaUserCircle/></p>}
              { comment.userId==user?.id?<p className='mr-3'>You</p>:<p className='mr-3'>{comment.commenter}</p>}
               < p className='text-gray-500'>  {moment(comment.createdAt).fromNow()}</p>
               </div>
               <div className="comm flex pl-9 text-md w-[90%]">
               <p>{comment.content}</p>
               </div>
               </div>
        
            )
        })}
     </div>
   </div>
 </>
  )
}

export default Commant
