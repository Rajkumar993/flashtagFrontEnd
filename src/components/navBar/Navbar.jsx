import React, { useEffect, useState } from 'react'
import { IoHomeOutline } from "react-icons/io5";
import { IoMoonOutline } from "react-icons/io5";
import { CgMenuRound } from "react-icons/cg";
import { BsFillSearchHeartFill } from "react-icons/bs";
import { GrMapLocation } from "react-icons/gr";
import { CiLogout } from "react-icons/ci";
import { Dropdown, Space,Button } from 'antd';
import { IoIosMail } from "react-icons/io";
import { CiLight } from "react-icons/ci";
import Cookies from 'js-cookie'
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoSearchOutline } from "react-icons/io5";
import { BsEmojiFrown } from "react-icons/bs";
import axios from 'axios';
import { useSelector } from 'react-redux';
const Navbar = ({username,profile}) => {
  const [search,setSearch]=useState('');
  const[close,setClose]=useState(false);
  const{user:id}=useSelector(state=>state.userId)
  const navigate=useNavigate();
  const[usersList,setUserList]=useState([])
  const [darkmode,setDarkmode]=useState(false)
  const [open, setOpen] = useState(false);

  const handleOpenChange = (nextOpen, info) => {
    if (info.source === 'trigger' || nextOpen) {
      setOpen(nextOpen);
    }
  };
  const items = [
    {
      label:<button onClick={()=>changeMood()}  className='flex items-center gap-2'><IoMoonOutline/>Dark Mode</button> ,
      key: '1',
    },
    {
      label: <button className='flex items-center gap-2' onClick={()=>lightMode()}><CiLight/> Light Mode </button>,
      key: '2',
    },
 
  ];
  const handleLogout=()=>{
    console.log("clicked")
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/logout/${id?.id}`,{},{withCredentials:true}).then(res=>{
                   
      alert(res.data.message)
      navigate('/login')
     }).catch(err=>console.log(err))
  }
  const items2 = [
    {
      key: '1',
      label: (
        <button className='flex items-center justify-between  w-full gap-2' onClick={handleLogout}>
          <span>Logout</span>
          <span className='text-2xl'><CiLogout/></span>
        </button>
      ),
    },
    {
      key: '2',
      label: (
        <Link className='flex items-center w-full justify-between gap-2' to={`/user/profile/${id?.id}`}>
        <span> View Profile</span>
        <span className='text-2xl'><FaUserCircle/></span>
        </Link>
      ),
    },
   
  ];

  
  const handleSearch=()=>{
    setUserList([])
    if(search){
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/search?value=`+search).then(res=>{
         setUserList(res.data)
         setSearch('')
        }).catch(err=>console.log(err))
   
    }
  }

    useEffect(()=>{
          const value=JSON.parse(localStorage.getItem("darkmode")||false);
          setDarkmode(value)
        },[])

  const changeMood=()=>{
    JSON.stringify(localStorage.setItem('darkmode',true))
    window.location.reload()
  }
  const lightMode=()=>{
    JSON.stringify(localStorage.setItem('darkmode',false))
    window.location.reload()
  }

  return (
    <div  className={`flex z-10 fixed ${darkmode?"bg-black text-white":"bg-white text-black"}  left-0 right-0 justify-between border-b-2 px-4 p-2`}>
      <div className="left gap-6  text-xl flex items-center flex-1  ">
        <div className="medianame text-blue-400 font-bold">
        <p>Flash Tag</p>
        </div>
       <div className="icons flex gap-3 items-center">
       <Link to={'/'}><IoHomeOutline/></Link>
       <div>

       <Dropdown
       
      menu={{
        items,
      }}
      onOpenChange={handleOpenChange}
      open={open}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space  > 
        {darkmode? <IoMoonOutline/>:<CiLight/>}
        </Space>
      </a>
    </Dropdown>
       
       </div>
        <p><CgMenuRound/></p>
        
       </div>
       <div className="search border relative  md:w-1/2 rounded-full px-3 py-1 flex items-center bg-white text-black gap-2">
           
            <input value={search} onChange={(e)=>setSearch(e.target.value)} className='outline-none flex-1' type="text" placeholder='Search...' />
           { close?<button onClick={()=>setClose(false)} className='text-2xl'><IoCloseOutline />
            </button>:<button  onClick={()=>{
              handleSearch();
              setClose(true)
            }} className='cursor-pointer text-2xl'><IoSearchOutline/></button>}
           { close!=false &&usersList.length>0 ?<div className='absolute w-full min-h-[55px] max-h-[200px] overflow-y-auto  [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-300
  dark:[&::-webkit-scrollbar-thumb]:bg-blue-300  bg-gray-100 top-11 z-40 rounded-md '>
           {usersList?.filter(user=>user.id!=id?.id).map((user)=>{
            return(
             <Link to={`/user/profile/${user.id}`} key={user.id} className='flex items-center gap-2 hover:bg-gray-200 pl-6 py-3 active:bg-blue-600 cursor-pointer  active:text-white'>
              {user.profiePic?<img className='h-[30px] w-[30px] rounded-full mr-2 object-cover  ' src={`../../images/${user.profiePic}`} alt=''/>:<p className='text-[30px] text-gray-400 object-cover  '><FaUserCircle/></p>}
              <p>{user.username}</p>
              </Link >
            )
           })}
           


     
            </div>:close!=false &&<p className='absolute top-11 flex justify-center items-center  z-40 rounded-md bg-gray-100 w-[] h-[59px] '>No result found...  <BsEmojiFrown /></p>}
        </div>
      </div>
      <div className="right   text-xl flex ">
    <div className="icons flex items-center  gap-3">
    <p><GrMapLocation/></p>
    <p><IoIosMail/></p>
            <p><IoIosNotificationsOutline/></p>
            <Dropdown 
            menu={{items:items2}}
            placement="bottomRight"
            arrow={{
              pointAtCenter: true,
            }}
            >
                {profile?.profiePic?
               
             <img  src={`../../images/${profile?.profiePic}`} className='w-8 h-8 object-cover rounded-full' alt="" />
               
           
                  
                  
                  :<p className='text-[30px] text-gray-400 bg-white border-2 rounded-full  object-cover  '><FaUserCircle/></p>}
             </Dropdown>
          {/* <p>{username}</p> */}
    </div>
      </div>
    </div>
  )
}

export default Navbar
