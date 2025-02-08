import React , { useState } from 'react'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import UserProfile from './components/userprofile/UserProfile'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addUserProfile } from './slice/userDetails'
function App() {
  const [data,setData]=useState([]);
  const[userProfileRefetch,setUserProfileRefetch]=useState(false);
  const[profile,setProfile]=useState([]);
  const dispatch=useDispatch()
   const fetchpost=(userid)=>{
   console.log("fromm delete",userid)
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/gethome/${userid}`, { withCredentials: true })
    .then(res => {
      setData(res.data.data)
      setProfile(res.data.profile)
      dispatch(addUserProfile(res.data.profile))
    })
    .catch(err =>{ 
      console.error('Error fetching home data:', err);
      navigate("/login")
    });
  }
  console.log(data,"data",profile)
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route  path='/' element={<Home data={data} profile={profile[0]} setUserProfileRefetch={setUserProfileRefetch} fetchpost={fetchpost}/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/user/profile/:id' element={<UserProfile profile={profile[0]}  setUserProfileRefetch={setUserProfileRefetch} userProfileRefetch={userProfileRefetch} data={data} fetchpost={fetchpost} />}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
