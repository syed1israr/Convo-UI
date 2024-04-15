import { Drawer, Grid, Skeleton } from "@mui/material";
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useErrors } from '../../hooks/hooks.jsx';
import { useMyChatsQuery } from '../../redux/api.js';
import { setIsMobile } from '../../redux/reducers/misc.js';
import { getSocket } from '../../socket.jsx';

import Title from '../Shared/Title';
import ChatList from '../specific/ChatList';
import Profile from '../specific/Profile';
import Header from './Header';

const AppLayout = (WrappedComponent) => {
    const AppLayoutComponent = (props) => {
        const dispatch = useDispatch();
        const { isMobile } = useSelector(state => state.misc);
        const { user } = useSelector(state => state.auth);
        const params = useParams();
        const chatId = params.chatId;
        
        // Fetching chats
        const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");
        
        // Error handling
        useErrors([{ isError, error }]);
        
        // Socket initialization
        const socket = getSocket();
        console.log(socket.id);
        
        // Handler for deleting a chat
        const handleDeleteChat = (e, _id, groupchat) => {
            e.preventDefault();
            console.log("delete Chat", _id, groupchat);
        };

        // Handler for closing the mobile drawer
        const handleMobileClose = () => {
            dispatch(setIsMobile(false));
        };

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
                            />
                        )}
                    </Grid>
                    <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
                        <WrappedComponent {...props} chatId={chatId} />
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
