import React, { useEffect } from 'react';
import { Drawer, Grid, Skeleton } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useMyChatsQuery } from '../../redux/api.js';
import { setIsMobile } from '../../redux/reducers/misc.js';
import Title from '../Shared/Title';
import ChatList from '../specific/ChatList';
import Profile from '../specific/Profile';
import Header from './Header';
import toast from 'react-hot-toast';
import { useErrors } from '../../hooks/hooks.jsx';
import { getSocket } from '../../socket.jsx';
import { sampleChats } from '../../constants/SampleData.js';

const AppLayout = (WrappedComponent) => {
    const AppLayoutComponent = (props) => {
        const params = useParams();
        const chatId = params.chatId;
        const dispatch = useDispatch();
        const { isMobile } = useSelector(state => state.misc);
        const { user } = useSelector(state => state.auth);
        const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");
        

        console.log("usemyChats ke Baad",data)
        useErrors([{ isError, error }]);
        const socket=getSocket()
        console.log(socket.id)
        const handleDeleteChat = (e, _id, groupchat) => {
            e.preventDefault();
            console.log("delete Chat", _id, groupchat);
        }

        const handleMobileClose = () => {
            dispatch(setIsMobile(false));
        }

        return (
            <>
                <Title />
                <Header />

                {isLoading ? <Skeleton /> : (
                    <Drawer open={isMobile} onClose={handleMobileClose}>
                        <ChatList
                            w="70vw"
                            chats={data?.chats} chatId={chatId} handleDeletChat={handleDeleteChat} />
                    </Drawer>
                )}

                <Grid container style={{ height: "calc(100vh - 4rem)" }}>
                    <Grid item sm={4} md={3} sx={{ display: { xs: "none", sm: "block" } }} height={"100%"}>
                        {isLoading ? (<Skeleton />) : (
                            <ChatList chats={data?.chats}  chatId={chatId} handleDeletChat={handleDeleteChat} />
                        )}
                    </Grid>
                    <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
                        <WrappedComponent {...props} />
                    </Grid>
                    <Grid item md={4} lg={3} sx={{ display: { xs: "none", md: "block" }, padding: "2rem", bgcolor: "rgba(0,0,0,0.85)" }} height={"100%"}>
                        <Profile user={user} />
                    </Grid>
                </Grid>
            </>
        );
    };

    return AppLayoutComponent;
};

export default AppLayout;
