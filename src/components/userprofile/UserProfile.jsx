import React, { useEffect, useState } from 'react'
import Navbar from '../navBar/Navbar'
import SideBar from '../sideBar/SideBar'
import Suggestion from '../suggestion/Suggestion'
import Activities from '../latest activities/Activities'
import { useDispatch, useSelector } from 'react-redux'
import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'
import { FaUserCircle } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { addUser } from '../../slice/userId'
import image from '../../../public/images/nature.jpg'
import AddPost from '../addpost/AddPost'
import EditUser from './EditUser'
import axios from 'axios'
import Post from '../posts/Post'
import coverpic from '../../../public/images/userBackground.jpg'
import { addUserProfile } from '../../slice/userDetails'
import OnlineUsers from '../online/OnlineUsers'
const UserProfile = ({userProfileRefetch,setUserProfileRefetch,fetchpost,data:posts,profile}) => {
    const { user } = useSelector(state => state.userId);  

 
    const{id}=useParams();
    const[data,setData]=useState([]);
    const[userDetail,setUserDetail]=useState([])
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [darkmode,setDarkmode]=useState(false)
    useEffect(()=>{
      fetchpost(user?.id)
    },[user]);
       
           useEffect(()=>{
                 const value=JSON.parse(localStorage.getItem("darkmode")|| false);
                 setDarkmode(value)
               },[])
   useEffect(()=>{
   
      const token=Cookies.get('accesstoken');
      if(!token){
        navigate('/login') 
      }else{
        const decoded=jwtDecode(token);
         dispatch(addUser(decoded))
      }
   },[])
   useEffect(()=>{
    console.log(id,"id")
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/userProfile/${id}`,{withCredentials:true}).then(res=>{
    console.log(res,"rse")
    setData(res.data.posts);
    setUserDetail(res.data.userdetails);
    window.scrollTo({
      "behavior":"smooth",
      top:0
    })
  }).catch(err=>console.log(err));

   },[id,userProfileRefetch,dispatch,posts,profile])


  return (
    <div className={` w-full  min-h-screen pb-10 ${darkmode?"bg-[#333333] text-white ":"bg-gray-200 text-black"}  -z-20`}>
      <Navbar profile={profile} username={user?.name}/>
      <SideBar profile={profile} username={user?.name}/>
      <Suggestion  />
      <Activities/>
      <OnlineUsers darkmode={darkmode}/>
      <div className="coverpic  pt-20 flex flex-col items-center w-full  bg-inherit">
        <div className='img   w-[700px] h-[260px]  mr-[160px] bg-white'>
        { userDetail[0]?.coverPic!==null?<img src={`../../images/${userDetail[0]?.coverPic}`} alt=""  className=' h-full w-full  object-top object-cover  '/>:<img src={coverpic} alt=""  className=' w-full h-full object-top object-cover '/>}
        </div>
        <div className="profilepic">
        <div className='img  rounded-full flex flex-col justify-center  items-center absolute right-[790px] bottom-0 mb-[300px] '>
        { userDetail[0]?.profiePic!==null?<img src={`../../images/${userDetail[0]?.profiePic}`} alt=""  className=' border-2 rounded-full w-[105px] h-[105px] object-cover  '/>:<p className='text-[105px] text-gray-400 bg-white border-2 rounded-full  object-cover  '><FaUserCircle/></p>}
        <p className='text-xl'>{userDetail[0]?.username}</p>
        </div>
        </div>
     </div>
        <div className='content flex flex-col   ml-[360px]   w-[650px] h-full'>
            <EditUser darkmode={darkmode} setUserProfileRefetch={setUserProfileRefetch} fetchpost={fetchpost} userProfileRefetch={userProfileRefetch} data={userDetail[0]} id={id} />
            {id==user?.id?    <div className="addPost ">
        <AddPost fetchpost={fetchpost} userId={user?.id}/>
        
      </div>:null}

            <Post  fetchpost={fetchpost}setUserProfileRefetch={setUserProfileRefetch} data={data}/>
        </div>
        
    </div>
  )
}

export default UserProfile
