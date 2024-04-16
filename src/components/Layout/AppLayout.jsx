import { Drawer, Grid, Skeleton } from "@mui/material";
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { useErrors, useSocketEvents } from '../../hooks/hooks.jsx';
import { useMyChatsQuery } from '../../redux/api.js';
import { setIsMobile } from '../../redux/reducers/misc.js';
import { getSocket } from '../../socket.jsx';

import Title from '../Shared/Title';
import ChatList from '../specific/ChatList';
import Profile from '../specific/Profile';
import Header from './Header';
import { NEW_MESSAGE_ALERT, NEW_REQUEST_ALERT, REFETCH_CHATS } from "../../constants/events.js";
import { incrementNotification, setNewMessagesAlert } from "../../redux/reducers/chat.js";
import { getOrSaveFromStorage } from "../../lib/Features.js";

const AppLayout = (WrappedComponent) => {
    const AppLayoutComponent = (props) => {
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const { isMobile } = useSelector(state => state.misc);
        const { user } = useSelector(state => state.auth);
        const { newMessagesAlert } = useSelector((state) => state.chat);
        console.log(newMessagesAlert)
        const params = useParams();
        const chatId = params.chatId;
        console.log("chatId applayout wala ",chatId)
            console.log("Nes Message ALer",newMessagesAlert)
        // Fetching chats
        const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");
        
        // Error handling
        useErrors([{ isError, error }]);
        useEffect(() => {
            getOrSaveFromStorage({ key: NEW_MESSAGE_ALERT, value: newMessagesAlert });
          }, [newMessagesAlert]);
        // Socket initialization
        const socket = getSocket();
        

        // Handler for deleting a chat
        const handleDeleteChat = (e, _id, groupchat) => {
            e.preventDefault();
            console.log("delete Chat", _id, groupchat);
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


        const refetchListener = useCallback(() => {
            refetch();
            navigate("/");
          }, [refetch, navigate]);


        const eventHandlers = {
            [NEW_MESSAGE_ALERT]: newMessageAlertListener,
            [NEW_REQUEST_ALERT]: newRequestAlertListener,
            [REFETCH_CHATS]: refetchListener,
          };
        
          useSocketEvents(socket, eventHandlers);
          
          
          
        return (
            <>
                <Title />
                <Header />

                {isLoading ? (
                    <Skeleton />
                ) : (
                    <Drawer open={isMobile} onClose={handleMobileClose}>
                        <ChatList
                            w="70vw"
                            chats={data?.chats}
                            chatId={chatId}
                            handleDeletChat={handleDeleteChat}
                            newMessagesAlert={newMessagesAlert}
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
                                handleDeletChat={handleDeleteChat}
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
