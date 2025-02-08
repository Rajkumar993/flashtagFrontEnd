import React from 'react'
import { HiDotsHorizontal } from "react-icons/hi";
import { Button, Dropdown, Space,ConfigProvider, Flex, Popconfirm  } from 'antd';
import { MdDelete } from "react-icons/md";
import { useSelector } from 'react-redux';
const text = 'Are you sure to delete the post?';
const description = 'Delete the post';
const buttonWidth = 80;
const DeletePost = ({setUserProfileRefetch,fetchpost,post}) => {
    const { user } = useSelector(state => state.userId);  

    const items = [
        {
          key: '1',
          label: (
            <ConfigProvider
            button={{
              style: {
                width: buttonWidth,
                margin: 4,
              },
            }}
          >
            <Flex vertical justify="center" align="center" className="demo">
              <Flex
                justify="center"
                align="center"
                style={{
                  whiteSpace: 'nowrap',
                }}
              >
                <Popconfirm
                  placement="topLeft"
                  title={text}
                  description={description}
                  okText="Yes"
                  onConfirm={()=>handleDelete(post?.PostId)}
                  cancelText="No"
                >
                  <button className='flex items-center'><span>Delete Post</span><MdDelete className='text-red-600 text-[20px]' /></button>
                </Popconfirm>
              
              </Flex>
          
            </Flex>
          </ConfigProvider>
          ),
        },
      ];
   const handleDelete=async(id)=>{
       try {
        const response=await fetch(`${import.meta.env.VITE_BACKEND_URL}/deletPost/${id}`,{
            method:"DELETE",
            credentials:"include",
           
        })
        if(response){
            console.log(response)

            fetchpost(user?.id)
            setUserProfileRefetch(true)
        }
       } catch (error) {
        console.log(error)
       }
   }
  return (
   <>

   <Space direction='vertical'>
 <Space wrap>
 <Dropdown
        menu={{
          items,
        }}
        placement="bottomRight"
      >
        <Button ><HiDotsHorizontal /></Button>
      </Dropdown>

 </Space>
   </Space>
   </>
  )
}

export default DeletePost
