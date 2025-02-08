import React, { useRef, useState } from 'react'
import Follow from '../followButton/Follow'
import { FaFacebook } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { CiGlobe } from "react-icons/ci";
import { IoIosMail } from "react-icons/io";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Button, Dropdown, Space,ConfigProvider, Flex, Popconfirm , Modal, Input } from 'antd';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Alert } from 'antd';
const EditUser = ({darkmode,id,data,setUserProfileRefetch,userProfileRefetch,fetchpost}) => {
  const [open, setOpen] = useState(false);
  const {user}=useSelector(state=>state.userId);
  const[cover,setCover]=useState('')
  const[profile,setProfile]=useState('')
  const [openResponsive, setOpenResponsive] = useState(false);
  const coverRef=useRef(null);
  const profileRef=useRef(null);

  const items = [
        {
          key: '1',
          label:<button onClick={()=>{
            setOpenResponsive(true)
          }
         
          }
            
            >Edit Profile</button>,
        },
      ];

      const updateUser=(e)=>{
        e.preventDefault();
        console.log(data?.coverPic, data?.profilePic);
    
        const formData = new FormData();
        
        if (cover) {
            formData.append("coverPic", cover);
        }
        if (profile) {
            formData.append("profilePic", profile);
        }
    
        axios.put(`${import.meta.env.VITE_BACKEND_URL}/update/user/${user?.id}`, formData, { withCredentials: true })
            .then(res=>{
              console.log(res)
              setUserProfileRefetch(!userProfileRefetch);
              setCover('');
              setProfile('');
              fetchpost(user?.id)
              if(profileRef.current) profileRef.current.value='';
              if(coverRef.current) coverRef.current.value=''
            })
            .catch(console);
           
        setOpenResponsive(false);
      }
  return (
    <>
    <form className={`flex text-xl  justify-between pt-28 px-6 ${darkmode?"bg-black text-white":"bg-white text-black"}  w-full  mt-4 h-[200px]  rounded-md`}>
      <div className='icons flex gap-2 jusstify-center'>
      <FaFacebook className='cursor-pointer'/>
      <FaSquareInstagram className='cursor-pointer'/>
      <FaTwitter className='cursor-pointer'/>
      <FaLinkedin className='cursor-pointer'/>
      <FaPinterest className='cursor-pointer'/>
      </div>
      <div className='follow flex  flex-col gap-4 mr-[115px]'>
       <div className='flex gap-5 ml-5 text-sm w-full'>
       <p className='flex items-center'><FaLocationDot className='cursor-pointer'/> INDIA</p>
     <p className='flex items-center'>  <CiGlobe className='cursor-pointer'/>Rk dev</p>
       </div>
   <div className='ml-8 '>
   <Follow userId={id}/>
   </div>
      </div>
      <div className='flex gap-3 '>
      <IoIosMail  className='cursor-pointer'/>
      
        { id==user?.id?<Space direction='vertical'>
       <Space wrap>
       <Dropdown
              menu={{
                items,
              }}
              placement="bottomRight"
            >
            <HiOutlineDotsVertical  className='cursor-pointer mb-1'/>
            </Dropdown>
      
       </Space>
         </Space>:""}
         <Flex vertical gap="middle" align="flex-start">
         <Modal
        title="Edit Mode"
        centered
        open={openResponsive}
        onOk={updateUser}
        onCancel={() => setOpenResponsive(false)}
        width={{
          xs: '90%',
          sm: '80%',
          md: '70%',
          lg: '60%',
          xl: '50%',
          xxl: '40%',
        }}
      >
      <form onSubmit={updateUser} className='flex flex-col gap-3'>
  <div className='flex flex-col gap-2
'>
  <label htmlFor="cover ">Cover Picture </label>
  <Alert message="For Cover Picture Please Select 1920*1080 Size File For Better View" type="warning" showIcon closable />
  <Input ref={coverRef} accept='image/*' type="file" id='cover' onChange={(e)=>setCover(e.target.files[0])} />
  </div>
       <div className='flex flex-col gap-2'>
       <label htmlFor="profile ">Profile Picture</label>
       <Input ref={profileRef} accept='image/*'  type="file" id='profile' onChange={(e)=>setProfile(e.target.files[0])} />
       </div>
      </form>
      </Modal>
      </Flex>
      </div>
    </form>
    </>
  )
}

export default EditUser
