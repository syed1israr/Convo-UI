import React, { Suspense, lazy, memo, useEffect, useState } from 'react';
import { Backdrop, Box, Button, Drawer, Grid, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { useNavigate ,useSearchParams } from 'react-router-dom';
import { Add as AddIcon, Delete as DeleteIcon, Done, Edit as EditIcon, KeyboardBackspaceOutlined, Menu } from '@mui/icons-material';
import { StyledLink } from '../components/Styles/StyledComponent';
import AvatarCard from '../components/Shared/AvatarCard';
import { sampleChats, sampleUsers } from '../constants/SampleData';
import UserItem from '../components/Shared/UserItem';
const ConfirmDeleteDialoge=lazy(()=>import("../components/dialogs/ConfirmDeleteDialoge"))
const AddMemberDialoge=lazy(()=>import("../components/dialogs/AddMemberDialoge"))
const Groups = () => {
  const navigate = useNavigate();
  const navigateBack = () => {
    navigate("/");
  };

  const chatId = useSearchParams()[0].get("group");

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEdit, setisEdit] = useState(false);
  const [groupname,setgroupname]=useState("");
  const [groupnameUpdatedValue,setgroupnameUpdatedValue]=useState("");
  const [confirmDeletedialoge,setconfirmDeletedialoge]=useState(false)
  const [ismember, setismember] = useState(false)

  const handleMobile = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  const handleMobileClose = () => {
    setIsMobileMenuOpen(false);
  };

  const updateGroupNamehandler = () => {
    setgroupname(groupnameUpdatedValue);

    setisEdit(false);
    console.log("Group name updated", groupnameUpdatedValue);
  };
  
  const openconfirmDeleteHandler=()=>{
    setconfirmDeletedialoge(true)
    console.log("confirmDeleteHandler ")
  }
  const closeconfirmDeleteHandler=()=>{
    setconfirmDeletedialoge(false)
    console.log("confirmDeleteHandler ")
  }
  const deletehandler=()=>{
    console.log("deleted Handler")
  }
  
  const OpenAddMember=()=>{
    console.log("OpenAddMember ")
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
    console.log("removed Member",id)
  }

  const GroupName = (
    <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} spacing={"1rem"} padding={"3rem"}>
      {isEdit ? (
        <>
          <TextField  value={groupnameUpdatedValue}  onChange={e => setgroupnameUpdatedValue(e.target.value)} />
          <IconButton onClick={updateGroupNamehandler}><Done /></IconButton>
        </>
      ) : (
        <>
          <Typography variant='h4'>{groupname}</Typography>
          <IconButton onClick={() => setisEdit(true)}><EditIcon /></IconButton>
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

  return (
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
        <GroupList myGroups={sampleChats} chatId={chatId} />
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
              {
                sampleUsers.map((user)=>(
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
                ismember && ( <Suspense fallback={<Backdrop open/>}>
                    <AddMemberDialoge/>
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
        <GroupList myGroups={sampleChats} w={"50vw"} />
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
