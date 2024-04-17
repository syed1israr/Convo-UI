import { Drawer, Grid, Skeleton } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { useErrors, useSocketEvents } from '../../hooks/hooks.jsx';
import { useMyChatsQuery } from '../../redux/api.js';
import { setIsDeleteMenu, setIsMobile, setSelectedDeleteChat } from '../../redux/reducers/misc.js';
import { getSocket } from '../../socket.jsx';

import { NEW_MESSAGE_ALERT, NEW_REQUEST_ALERT, ONLINE_USERS, REFETCH_CHATS } from "../../constants/events.js";
import { getOrSaveFromStorage } from "../../lib/Features.js";
import { incrementNotification, setNewMessagesAlert } from "../../redux/reducers/chat.js";
import Title from '../Shared/Title';
import DeleteChatMenu from "../dialogs/DeleteChatMenu.jsx";
import ChatList from '../specific/ChatList';
import Profile from '../specific/Profile';
import Header from './Header';

const AppLayout = (WrappedComponent) => {
    const AppLayoutComponent = (props) => {

        const socket = getSocket();
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const [onlineUsers, setOnlineUsers] = useState([]);
       
        const params = useParams();
        const chatId = params.chatId;
        const deleteMenuAnchor = useRef(null);


        const { isMobile } = useSelector(state => state.misc);
        const { user } = useSelector(state => state.auth);
        const { newMessagesAlert } = useSelector((state) => state.chat);
       
       
        const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");
              
        
        useEffect(() => {
            getOrSaveFromStorage({ key: NEW_MESSAGE_ALERT, value: newMessagesAlert });
          }, [newMessagesAlert]);
        
       
        

        // Handler for deleting a chat
        const handleDeleteChat = (e, chatId, groupChat) => {
            dispatch(setIsDeleteMenu(true));
            dispatch(setSelectedDeleteChat({ chatId, groupChat }));
            deleteMenuAnchor.current = e.currentTarget;
          };

        // Handler for closing the mobile drawer
        const handleMobileClose = () => {
            dispatch(setIsMobile(false));
        };


        const newMessageAlertListener=useCallback((data)=>{
            
            if(data.chatId===chatId){
                return
            }
            dispatch(setNewMessagesAlert(data))
            
        },[chatId])
        

        const newRequestAlertListener=useCallback(()=>{
            dispatch(incrementNotification())
        },[dispatch])


        const onlineUsersListener = useCallback((data) => {
            setOnlineUsers(data);
          }, [data]);
        

        const refetchListener = useCallback(() => {
            refetch();
            navigate("/");
          }, [refetch, navigate]);


        const eventHandlers = {
            [NEW_MESSAGE_ALERT]: newMessageAlertListener,
            [NEW_REQUEST_ALERT]: newRequestAlertListener,
            [REFETCH_CHATS]: refetchListener,
            [ONLINE_USERS]: onlineUsersListener,
          };
        
          useSocketEvents(socket, eventHandlers);
          useErrors([{ isError, error }]);
        return (
            <>
                <Title />
                <Header />

                <DeleteChatMenu
                dispatch={dispatch}
                deleteMenuAnchor={deleteMenuAnchor}

             />

                {isLoading ? (
                    <Skeleton />
                ) : (
                    <Drawer open={isMobile} onClose={handleMobileClose}>
                        <ChatList
                            w="70vw"
                            chats={data?.chats}
                            chatId={chatId}
                            onlineUsers={onlineUsers}
                            newMessagesAlert={newMessagesAlert}
                            handleDeleteChat={handleDeleteChat}
                            
                        />
                    </Drawer>
                )}

                <Grid container style={{ height: "calc(100vh - 4rem)" }}>
                    <Grid item sm={4} md={3} sx={{ display: { xs: "none", sm: "block" } }} height={"100%"}>
                        {isLoading ? (
                            <Skeleton />
                        ) : (
                            <ChatList
                                chats={data?.chats}
                                chatId={chatId}
                                onlineUsers={onlineUsers}
                                handleDeleteChat={handleDeleteChat}
                                newMessagesAlert={newMessagesAlert}
                            />
                        )}
                    </Grid>
                    <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
                        <WrappedComponent {...props} chatId={chatId} user={user} />
                    </Grid>
                    <Grid
                        item
                        md={4}
                        lg={3}
                        sx={{ display: { xs: "none", md: "block" }, padding: "2rem", bgcolor: "rgba(0,0,0,0.85)" }}
                        height={"100%"}
                    >
                    <Profile user={user} />
                    </Grid>
                </Grid>
            </>
        );
    };

    return AppLayoutComponent;
};

export default AppLayout;
