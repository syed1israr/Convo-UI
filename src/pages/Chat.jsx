import { useInfiniteScrollTop } from "6pp";
import { AttachFile as AttachFileIcon, SendAndArchiveRounded as SendAndArchiveRoundedIcon } from '@mui/icons-material';
import { IconButton, Skeleton, Stack } from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import AppLayout from '../components/Layout/AppLayout';
import { TypingLoader } from "../components/Layout/Loaders";
import MessageComponent from '../components/Shared/MessageComponent';
import { InputBox } from '../components/Styles/StyledComponent';
import FileMenu from '../components/dialogs/FileMenu';
import { CustomeGray, orange } from '../constants/Color';
import { ALERT, CHAT_JOINED, CHAT_LEAVED, NEW_MESSAGE, START_TYPING, STOP_TYPING } from "../constants/events";
import { useErrors, useSocketEvents } from '../hooks/hooks';
import { useChatDetailsQuery, useGetMessagesQuery } from '../redux/api';
import { removeNewMessagesAlert } from '../redux/reducers/chat';
import { setIsFileMenu } from '../redux/reducers/misc';
import { getSocket } from '../socket';


const Chat = ({ chatId }) => {
  const { user } = useSelector(state => state.auth);
  const socket = getSocket();
  const containerref = useRef(null);
  const bottomRef = useRef(null);
  const dispatch=useDispatch()
  const navigate= useNavigate()
  
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setpage] = useState(1);
  const [fileMenuAnchor, setfileMenuAnchor] = useState(null);
 

  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });
  const  oldMEssagesChunk = useGetMessagesQuery({chatId,page})

  const [IamTyping, setIamTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const typingTimeout = useRef(null);

  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerref,
    oldMEssagesChunk.data?.totalPages,
    page,
    setpage,
    oldMEssagesChunk.data?.messages
  );

  const errors = [
    { isError: chatDetails.isError, error: chatDetails.error },
    { isError: oldMEssagesChunk.isError, error: oldMEssagesChunk.error },
  ];

  const members = chatDetails?.data?.chat?.members;

  const messageOnChange = (e) => {
    setMessage(e.target.value);

    if (!IamTyping) {
      socket.emit(START_TYPING, { members, chatId });
      setIamTyping(true);
    }

    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
      socket.emit(STOP_TYPING, { members, chatId });
      setIamTyping(false);
    }, [2000]);
  }

  const handleFileOpen = (e) => {
    dispatch(setIsFileMenu(true));
    setfileMenuAnchor(e.currentTarget);
  };


  const submitHandler = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessage("");
  };
    
    useEffect(() => {
    socket.emit(CHAT_JOINED, { userId: user?.data?._id, members });
   
    dispatch(removeNewMessagesAlert(chatId));

    return () => {
      setMessages([]);
      setMessage("");
      setOldMessages([]);
      setpage(1);
      socket.emit(CHAT_LEAVED, { userId: user?.data?._id, members });
    };
    }, [chatId]);

  
  useEffect(() => {
    if (bottomRef.current)
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (chatDetails.isError) return navigate("/");
  }, [chatDetails.isError]);
   
  
  const newMessagesListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;

      setMessages((prev) => [...prev, data.message]);
    },
    [chatId]
  );

  const startTypingListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;

      setUserTyping(true);
    },
    [chatId]
  );

  const stopTypingListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      setUserTyping(false);
    },
    [chatId]
  );

  const alertListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      const messageForAlert = {
        content: data.message,
        sender: {
          _id: "djasdhajksdhasdsadasdas",
          name: "Admin",
        },
        chat: chatId,
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, messageForAlert]);
    },
    [chatId]
  );

 

  
  const eventHandler = {
    [ALERT]: alertListener,
    [NEW_MESSAGE]: newMessagesListener,
    [START_TYPING]: startTypingListener,
    [STOP_TYPING]: stopTypingListener,
  };
  
  useSocketEvents(socket, eventHandler);
  useErrors(errors);
  const allMessages = [...oldMessages, ...messages];
  console.log("oldMessages",oldMessages)
  console.log("messages",messages)
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
          overflowY: "auto",
          backgroundSize: "cover",
          "&::-webkit-scrollbar": {
            display: "none", 
          },
          scrollbarWidth: "none", 
        }}
      >
        {!allMessages.isLoading &&  allMessages.map((i) => (
          <MessageComponent key={i._id} message={i} />
        ))}
        {userTyping && <TypingLoader />}
        <div ref={bottomRef} />

      </Stack>

      <form style={{ height: "10%" }} onSubmit={submitHandler}

      >
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
            onChange={messageOnChange}
            placeholder='Type Message Here...'
          />
          <IconButton type='submit' sx={{
            backgroundColor: orange,
            color: "white",
            padding: "0.5rem",
            "&:hover": {
              bgcolor: "rgba(0,0,0,0.85)",
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
