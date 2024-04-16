import { AttachFile as AttachFileIcon, SendAndArchiveRounded as SendAndArchiveRoundedIcon } from '@mui/icons-material';
import { IconButton, Skeleton, Stack } from '@mui/material';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../components/Layout/AppLayout';
import MessageComponent from '../components/Shared/MessageComponent';
import { InputBox } from '../components/Styles/StyledComponent';
import FileMenu from '../components/dialogs/FileMenu';
import { CustomeGray, orange } from '../constants/Color';
import { NEW_MESSAGE } from "../constants/events";
import { useErrors, useSocketEvents } from '../hooks/hooks';
import { useChatDetailsQuery, useGetMessagesQuery } from '../redux/api';
import { getSocket } from '../socket';
import { useInfiniteScrollTop } from "6pp"
import { setIsFileMenu } from '../redux/reducers/misc';


const Chat = ({ chatId }) => {
    
   
  const containerref = useRef(null);
  const dispatch=useDispatch()
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setpage] = useState(1);
  const [fileMenuAnchor, setfileMenuAnchor] = useState(null);

  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });

  const  oldMEssagesChunk = useGetMessagesQuery({chatId,page})
  

  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerref,
    oldMEssagesChunk.data?.totalPages,
    page,
    setpage,
    oldMEssagesChunk.data?.messages
  );
  
  const errors = [
    { isError: chatDetails.isError, error: chatDetails.error },
    { isError: oldMEssagesChunk.isError, error: oldMEssagesChunk.error }
  ];
  const members = chatDetails?.data?.chat?.members;

  const { user } = useSelector(state => state.auth);
console.log(user)
  const socket = getSocket();

  const handleFileOpen = (e)=>{
    dispatch(setIsFileMenu(true))
    setfileMenuAnchor(e.currentTarget)
  }
  const submitHandler = (e) => {
    e.preventDefault();
    if (!message.trim()) {
      return;
    }
    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessage("");
  };

  const newMessageListener = (data) => {
    setMessages(prev => [...prev, data.message]);
  };
  
  const eventHandler = {
    [NEW_MESSAGE]: newMessageListener
  };

  useSocketEvents(socket, eventHandler);
  useErrors(errors)


  const allmessages=[...oldMessages,...messages]

  return chatDetails.isLoading ? <Skeleton /> : (
    <>
      <Stack
        ref={containerref}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={CustomeGray}
        height={"90%"}
        sx={{
          overflowX: "hidden",
          overflowY: "auto"
        }}
      >
        {!allmessages.isLoading &&  allmessages.map((i) => (
          <MessageComponent key={i._id} message={i} user={user} />
        ))}
      </Stack>

      <form style={{ height: "10%" }} onSubmit={submitHandler}>
        <Stack direction={"row"} height={"100%"} padding={"1rem"} alignItems={"center"} position={"relative"}>
          <IconButton 
            onClick={handleFileOpen}
          sx={{ position: "absolute", 
          left: "1.5rem", 
          rotate: "90deg" }}>
            <AttachFileIcon />
          </IconButton>
          <InputBox
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder='Type Message Here...'
          />
          <IconButton type='submit' sx={{
            backgroundColor: orange,
            color: "white",
            padding: "0.5rem",
            "&:hover": {
              bgcolor: "error.dark",
            }
          }}>
            <SendAndArchiveRoundedIcon />
          </IconButton>
        </Stack>
        <FileMenu anchorE1={fileMenuAnchor}  chatId={chatId}/>
      </form>
    </>
  );
};

export default AppLayout(Chat);
