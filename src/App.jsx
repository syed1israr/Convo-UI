import axios from "axios";
import React, { Suspense, lazy, useEffect } from 'react';
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { userExists, userNotExists } from "../src/redux/reducers/auth.js";
import ProtectRoute from './components/Auth/ProtectRoute';
import { LayoutLoader } from './components/Layout/Loaders';
import { server } from "./constants/config.js";
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Chat = lazy(() => import("./pages/Chat"));
const Groups = lazy(() => import("./pages/Groups"));
const NotFound=lazy(()=> import("./pages/NotFound"));
const  AdminLogin=lazy(()=> import("./pages/Admin/AdminLogin"))
const UserManagement =lazy(()=> import("./pages/Admin/UserManagement"))
const ChatManagement=lazy(()=> import("./pages/Admin/ChatManagement"))
const MessageManagement=lazy(()=> import("./pages/Admin/MessageManagement"))
const Dashboard=lazy(()=> import("./pages/Admin/Dashboard"))


const App = () => {
const dispatch= useDispatch()
 const { user, loader } = useSelector((state) => state.auth);
  useEffect(()=>{
    console.log(server)
    axios.get(`${server}/user/userprofile`,{withCredentials:true})
    .then(({data})=>{
      console.log(data)
      dispatch(userExists(data.user))
    })
    .catch((err)=>dispatch(userNotExists()))
    
  },[dispatch])
  return loader ? <LayoutLoader/> : (
    <BrowserRouter>
     <Suspense fallback={<div><LayoutLoader/></div>}>
     <Routes>
        <Route element={<ProtectRoute user={user}/>}>
          <Route path='/' element={<Home />} />
          <Route path='/chat/:chatId' element={<Chat />} />
          <Route path='/groups' element={<Groups />} />
        </Route>
        <Route path='/login' element={<ProtectRoute user={!user} redirect='/'><Login /></ProtectRoute>} />
     
      <Route path='/admin' element={<AdminLogin/>}/>
      <Route path='/admin/dashboard' element={<Dashboard/>}/>
      <Route path='/admin/user-management' element={<UserManagement/>}/>
      <Route path='/admin/chat-management' element={<ChatManagement/>}/>
      <Route path='/admin/message-management' element={<MessageManagement/>}/>

      
      <Route path='*' element={<NotFound/>}/>
      </Routes>
     </Suspense>
     <Toaster position="bottom-center"/>
    </BrowserRouter>
  );
}

export default App;
