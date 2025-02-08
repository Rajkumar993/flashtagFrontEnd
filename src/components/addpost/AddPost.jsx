import React, { useEffect, useRef, useState } from 'react'
import image from '../../../public/images/1.jpg'
import axios from 'axios';
import { BiSolidImageAdd } from "react-icons/bi";
import { FaImage } from "react-icons/fa";
import { MdEmojiEmotions } from "react-icons/md";
import Emoji from '../emoji/Emoji';
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from 'react-redux';
const AddPost = ({fetchpost,userId,profile}) => {
  const [value,setValue]=useState('');
  const [file,setFile]=useState('');
  const {user} =useSelector(state=>state.userId)
  const [emoji,setEmoji]=useState(false);
  const[showSend,setShowSend]=useState(false)
  const inputRef=useRef(null);
  const[isposted,setIsPosted]=useState(false)  
  const [darkmode,setDarkmode]=useState(false)
    useEffect(()=>{
          const value=JSON.parse(localStorage.getItem("darkmode")|| false);
          setDarkmode(value)
        },[])
const handleSubmit=async(e)=>{
  e.preventDefault()
   console.log(file)
    if(file !=''){
       setIsPosted(true)
      const form =new FormData();
    form.append('image',file)
    form.append('userId',userId)
    form.append('desc',value)
     console.log(form)
    try {
        const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/addpost`,form,{
          withCredentials:true,
          headersheaders: { 'Content-Type': 'multipart/form-data' }
        })
     if(response){
      fetchpost(userId)
      console.log("fetch called",userId)
      setValue("")
      setFile('')
     setIsPosted(false)
     }
   
    } catch (error) {
       console.log(error)
    } 
 
    }else{
      alert("select file to post")
    }
}

  return (
    <>
    <form onSubmit={handleSubmit} className={`flex flex-col justify-between mt-4 h-[150px] px-2 py-2 ${darkmode?"bg-black text-white":"bg-white text-black"}  rounded-md`}>
     <div className="top flex gap-2 items-center pt-3  pl-2 ">
    {profile?.profiePic?<img className='h-[30px] w-[30px] rounded-full mr-2 object-cover  ' src={`../../images/${profile?.profiePic}`}  alt=''/>:<p className='text-[30px] text-gray-400 mr-2'><FaUserCircle/></p>}
     <input value={value} placeholder='type something...' className={`w-full rounded-full px-2 outline-none ${darkmode?"bg-black text-white":"bg-white text-black"}`} onChange={e=>{
      setEmoji(false)
      setValue(e.target.value)
      }} type="text" />
 {   file&&  <img className='w-[60px] h-[50px] overflow-hidden rounded-full object-cover object-top' src={URL.createObjectURL(file)} alt="" />}
     </div>
     <div className="bottom flex justify-between px-2 py-2">
     <div className='flex items-center gap-2'>
      <div className='flex items-center gap-2'>
 
     <label htmlFor="add"><BiSolidImageAdd  className='text-2xl text-sky-500 '/></label>
      <input  type='file' accept="image/*" ref={inputRef} onChange={e=>{
        setFile(e.target.files[0])
        }} className='px-2 hidden bg-green-600 text-white'/>
      <button type='button' id='add' onClick={()=>inputRef.current.click()}>Add Image</button>
   
    
      </div>
      {/* <button type='button'  className='px-2 bg-blue-600 text-white'>Add place</button>
      <button  type='button' className='px-2 bg-yellow-600 text-white'>Tag friends</button> */}
       <div className='relative '>
   <button type='button' onClick={()=>setEmoji(!emoji)} ><MdEmojiEmotions className={`text-2xl mt-1 ${darkmode?"text-yellow-300":"text-black"} `}/></button>
   <div className='absolute  top-0 left-8 '>
      <Emoji setShowSend={setShowSend}  setValue={setValue} emoji={emoji}/>
   </div>
      </div>
     </div>
     <div>
      <button disabled={isposted}  type='submit' className={`px-2 ${isposted?"opacity-15":""} py-1 rounded-md bg-red-600 text-white`}>Add post</button>
     </div>
     </div>
    </form>
    </>
  )
}

export default AddPost
