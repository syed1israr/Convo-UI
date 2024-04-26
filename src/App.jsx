import axios from "axios";
import React, { Suspense, lazy, useEffect } from 'react';
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { userExists, userNotExists } from "../src/redux/reducers/auth.js";
import ProtectRoute from './components/Auth/ProtectRoute';
import { LayoutLoader } from './components/Layout/Loaders';
import { SocketProvider} from "./socket.jsx"
import { server } from "./constants/config.js";


const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Chat = lazy(() => import("./pages/Chat"));
const Groups = lazy(() => import("./pages/Groups"));
const NotFound=lazy(()=> import("./pages/NotFound"));
const AdminLogin=lazy(()=> import("./pages/Admin/AdminLogin"))
const UserManagement =lazy(()=> import("./pages/Admin/UserManagement"))
const ChatManagement=lazy(()=> import("./pages/Admin/ChatManagement"))
const MessageManagement=lazy(()=> import("./pages/Admin/MessageManagement"))
const Dashboard=lazy(()=> import("./pages/Admin/Dashboard"))





const App = () => {
const dispatch= useDispatch()
 const { user, loader } = useSelector((state) => state.auth);
 useEffect(() => {
  axios
    .get(`${server}/user/userprofile`, { withCredentials: true })
    .then(({ data }) => dispatch(userExists(data)))
    .catch((err) => dispatch(userNotExists()));
}, [dispatch]);

  return loader ? <LayoutLoader/> : (
  
    <BrowserRouter>
     <Suspense fallback={<div><LayoutLoader/></div>}>
     <Routes>
        <Route element={<SocketProvider>
          <ProtectRoute user={user}/>
        </SocketProvider>}>
          <Route path='/' element={<Home/>} />
          <Route path='/chat/:chatId' element={<Chat/>} />
          <Route path='/groups' element={<Groups/>} />
        </Route>
        <Route path='/login' element={<ProtectRoute user={!user} redirect='/'><Login/></ProtectRoute>} />
     
      <Route path='/admin' element={<AdminLogin/>}/>
      <Route path='/admin/dashboard' element={<Dashboard/>}/>
      <Route path='/admin/users' element={<UserManagement/>}/>
      <Route path='/admin/chats' element={<ChatManagement/>}/>
      <Route path='/admin/messages' element={<MessageManagement/>}/>

      
      <Route path='*' element={<NotFound/>}/>
      </Routes>
     </Suspense>
     <Toaster position="bottom-center"/>
    </BrowserRouter>
   
  );
}

export default App;
