import React, { useEffect, useState } from 'react';
import Navbar from './navBar/Navbar';
import SideBar from './sideBar/SideBar';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Corrected import
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../slice/userId';
import { useNavigate } from 'react-router-dom';
import Suggestion from './suggestion/Suggestion';
import Activities from './latest activities/Activities';
import Body from './homeBody/Body';
import OnlineUsers from './online/OnlineUsers';

const Home = ({data,profile,fetchpost,setUserProfileRefetch}) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.userId);  // Use selector to get user from Redux
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [darkmode,setDarkmode]=useState(false)
 const navigate=useNavigate()


  useEffect(() => {
   const hi=async()=>{
    const token =await Cookies.get("accesstoken");
    if (token) {
      try {
        const decoded = await jwtDecode(token);
        await dispatch(addUser(decoded));  // Add user to Redux store
          fetchpost(decoded.id)
      } catch (error) {
        console.error('Invalid token:', error);
        navigate("/login")
      }
    } else {
      navigate("/login")
    }
   }
   hi()
  }, [dispatch,navigate]);

  useEffect(() => {
    if (user) {
      setUserId(user.id)
      setUsername(user.name);  // Set username from Redux store
    }
  }, [user]);
    useEffect(()=>{
          const value=JSON.parse(localStorage.getItem("darkmode")||false);
          setDarkmode(value)
        },[])
  return (
    <div className='w-full h-full '>
      <Navbar username={username} profile={profile} />
      <SideBar username={username} profile={profile} />
       <Suggestion/>
      <Activities/>
      <OnlineUsers darkmode={darkmode}/>
      <Body  profile={profile} setUserProfileRefetch={setUserProfileRefetch} fetchpost={fetchpost} userId={userId} username={username} data={data}/>

     
    </div>
  );
};

export default Home;
