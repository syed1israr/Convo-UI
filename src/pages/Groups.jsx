import { Add as AddIcon, Delete as DeleteIcon, Done, Edit as EditIcon, KeyboardBackspaceOutlined, Menu } from '@mui/icons-material';
import { Backdrop, Box, Button, Drawer, Grid, IconButton, Skeleton, Stack, TextField, Tooltip, Typography } from '@mui/material';
import React, { Suspense, lazy, memo, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AvatarCard from '../components/Shared/AvatarCard';
import { StyledLink } from '../components/Styles/StyledComponent';

import UserItem from '../components/Shared/UserItem';


import { useDispatch, useSelector } from 'react-redux';
import { LayoutLoader } from "../components/Layout/Loaders.jsx";
import { useAsyncMutation, useErrors } from "../hooks/hooks.jsx";
import { useAddGroupMembersMutation, useChatDetailsQuery, useDeleteChatMutation, useMyGroupsQuery, useRemoveGroupMemberMutation, useRenameGroupMutation } from "../redux/api.js";
import { setIsAddMember } from "../redux/reducers/misc.js";

const ConfirmDeleteDialoge=lazy(()=>import("../components/dialogs/ConfirmDeleteDialoge"))
const AddMemberDialoge=lazy(()=>import("../components/dialogs/AddMemberDialoge"))

const Groups = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const { isAddMember } = useSelector( state =>state.misc)

  const navigateBack = () => {
    navigate("/");
  };
  const chatId = useSearchParams()[0].get("group");


  const myGroups=useMyGroupsQuery("")
  const groupDetails=useChatDetailsQuery({chatId,populate:true}
  ,{skip:!chatId})
  const [ updatedGroup , isLoadingGroupName ]=useAsyncMutation(useRenameGroupMutation)
  const [ removeMember , isLoadingremoveMember]=useAsyncMutation(useRemoveGroupMemberMutation)
  const [ addMembers ,  isLoadingaddMembers ]=useAsyncMutation(useAddGroupMembersMutation)
  const [ deleteGroup ,  isLoadingdeleteGroup ]=useAsyncMutation(useDeleteChatMutation)


  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEdit, setisEdit] = useState(false);
  const [groupname,setgroupname]=useState("");
  const [groupnameUpdatedValue,setgroupnameUpdatedValue]=useState("");
  const [confirmDeletedialoge,setconfirmDeletedialoge]=useState(false)
  
  const [members,setmembers]=useState([])
  const errors=[
   {
    isError:myGroups.isError,
    error:myGroups.error
   },
   {
    isError:groupDetails.isError,
    error:groupDetails.error
   },

  ]
  useErrors(errors)

  useEffect(()=>{
    if(groupDetails.data){
      setgroupname(groupDetails.data.chat.name)
      setgroupnameUpdatedValue(groupDetails.data.chat.name)
      setmembers(groupDetails?.data?.chat?.members)
    }
    return ()=>{
      setgroupname("")
      setgroupnameUpdatedValue("")
      setmembers([])
      setisEdit(false)
    }
  },[groupDetails])

  const handleMobile = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  const handleMobileClose = () => {
    setIsMobileMenuOpen(false);
  };

  const updateGroupNamehandler = () => {
    updatedGroup("updating Group name",{
      chatId,
      name:groupnameUpdatedValue,
    })
    setisEdit(false);
    
  };
  
  const openconfirmDeleteHandler=()=>{
    setconfirmDeletedialoge(true)
    
  }

  const closeconfirmDeleteHandler=()=>{
    setconfirmDeletedialoge(false)
   
  }
  const deletehandler=()=>{
    deleteGroup("Deleting Group ..." , chatId)
    closeconfirmDeleteHandler()
    navigateBack()
  }
   
  const OpenAddMember=()=>{
    dispatch(setIsAddMember(true))
  }
  
  const ButtonGroup=<Stack direction={{
    sm:"row",
    xs:"column-reverse",
  }}
  spacing={"1rem"}
  p={{
    xs:"0",
    sm:"1rem",
  
    md:"1rem 4rem"
  }}>
    <Button size='large' color='error' variant='outlined'
    startIcon={<DeleteIcon/>}
    onClick={openconfirmDeleteHandler}
    >Delete Group</Button>
    <Button
    startIcon={<AddIcon/>}
    onClick={OpenAddMember}
    size='large' variant='outlined'>Add member</Button>
  </Stack>
  useEffect(() => {
    if(chatId){
      setgroupname(`${chatId}`);
      setgroupnameUpdatedValue(`${chatId}`);
    }
    return () => {
      setgroupname("");
      setgroupnameUpdatedValue("");
      setisEdit(false);
    };
  }, [chatId]);


  const removeMemberHandler=(id)=>{
    removeMember("Removing Member...", { chatId, userId:id})
  }

  const GroupName = (
    <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} spacing={"1rem"} padding={"3rem"}>
      {isEdit ? (
        <>
          <TextField  value={groupnameUpdatedValue}  onChange={e => setgroupnameUpdatedValue(e.target.value)} />
          <IconButton
          disabled={isLoadingGroupName}
          onClick={updateGroupNamehandler}><Done /></IconButton>
        </>
      ) : (
        <>
          <Typography variant='h4'>{groupname}</Typography>
          <IconButton disabled={isLoadingGroupName}  onClick={() => setisEdit(true)}><EditIcon /></IconButton>
        </>
      )}
    </Stack>
  );

  const iconBtn = (
    <Stack direction="row" alignItems="center">
      <Box sx={{
        display: {
          xs: "block",
          sm: "none",
          position: "fixed",
          right: "1rem",
          top: "1rem"
        }
      }}>
        <IconButton onClick={handleMobile}>
          <Menu />
        </IconButton>
      </Box>
      <Tooltip title="back">
        <IconButton
          sx={{
            position: 'absolute',
            top: '2rem',
            left: '2rem',
            bgcolor: 'rgba(0,0,0,0.8)',
            color: 'white',
            "&:hover": {
              bgcolor: "rgba(0,0,0,0.6)",
            }
          }}
          onClick={navigateBack}
        >
          <KeyboardBackspaceOutlined />
        </IconButton>
      </Tooltip>
    </Stack>
  );

  return myGroups.isLoading? <LayoutLoader/> :  (
    <Grid container style={{ height: '100vh'}}>
     <Grid
        item
        sm={4}
        sx={{
          display: {
            xs: 'none',
            sm: 'block',
          },
        }}
      >
        <GroupList myGroups={ myGroups?.data?.groups} chatId={chatId} />
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          position: 'relative',
          padding: '1rem 3rem',
        }}
      >
        {iconBtn}
        {groupname && (
          <>
            {GroupName}
            <Typography margin={"2rem"} alignSelf={"flex-start"} variant='body1'>Members</Typography>
            <Stack
              maxWidth={"45rem"}
              width={"100%"}
              boxSizing={"border-box"}
              padding={{
                sm: "1rem",
                xs: "0",
                md: "1rem 4rem",
              }}
              spacing={"2rem"}
             
              height={"50vh"}
              overflow={"auto"}
            >
              { isLoadingremoveMember? <Skeleton/>: 
                members.map((user)=>(
                  <UserItem user={user} key={user._id} isAdded
                  styling={{
                    boxShadow:"0 0 0.8rem rgba(0,0,0,0.2) ",
                    padding:"1rem 2rem",
                    borderRadius:"1rem"

                  }}
                  handler={removeMemberHandler}
                   />
                ))
              }
            </Stack>
            {ButtonGroup}
          </>
        )}
      </Grid>
              {
                isAddMember && ( <Suspense fallback={<Backdrop open/>}>
                    <AddMemberDialoge addMember={addMembers} isLoadingAddMember={isLoadingaddMembers}
                    chatId={chatId}
                    />
                </Suspense> )
              }
      {
        confirmDeletedialoge && <>
        <Suspense fallback={<Backdrop open={true}/>}><ConfirmDeleteDialoge
        open={confirmDeletedialoge} handleclose={closeconfirmDeleteHandler}
        deletehandler={deletehandler}
        /></Suspense>
        </>
      }
      <Drawer open={isMobileMenuOpen} onClose={handleMobileClose}>
        <GroupList myGroups={myGroups?.data?.groups} w={"50vw"} />
      </Drawer>
    </Grid>
  );
};

const GroupList = ({ w = "100%", myGroups = [], chatId }) => (
  <Stack width={w} overflowY={"auto"}>
    {myGroups.length > 0 ? myGroups.map((group) => <GroupListItem group={group} chatId={chatId} key={group._id} />) : <Typography textAlign="center" padding="1rem">No Groups</Typography>}
  </Stack>
);

const GroupListItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;
  const handleClick = (e) => {
    if (chatId === _id) {
      e.preventDefault();
    }
  };

  return (
    <StyledLink to={`?group=${_id}`} onClick={handleClick}>
      <Stack direction="row" spacing="1rem" alignItems="center">
        <AvatarCard avatar={avatar} />
        <Typography>{name}</Typography>
      </Stack>
    </StyledLink>
  );
});

export default Groups;
