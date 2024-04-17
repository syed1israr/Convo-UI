import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, Skeleton, Stack, Typography } from '@mui/material';
import { sampleUsers } from '../../constants/SampleData';
import UserItem from '../Shared/UserItem';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAddMember } from "../../redux/reducers/misc.js"
import { useAvailableFriendsQuery } from '../../redux/api';
import { useAsyncMutation, useErrors } from '../../hooks/hooks';


const AddMemberDialog = ({ addMember, isLoadingAddMember, chatId }) => {
  const dispatch = useDispatch();

  const { isAddMember } = useSelector((state) => state.misc);

  const { isLoading, data, isError, error } = useAvailableFriendsQuery(chatId);

  const [selectedMembers, setSelectedMembers] = useState([]);

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currElement) => currElement !== id)
        : [...prev, id]
    );
  };

  const closeHandler = () => {
    dispatch(setIsAddMember(false));
  };
  const addMemberSubmitHandler = () => {
    addMember("Adding Members...", { members: selectedMembers, chatId });
    closeHandler();
  };

  useErrors([{ isError, error }]);

  return isLoading ?  <Skeleton/> :  (
    <Dialog open={isAddMember} onClose={closeHandler}>
      <Stack p={"2rem"} width={"20rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center"}>Add Member</DialogTitle>
      </Stack>
      <Stack spacing={1}>
        {data?.availableFriends.length > 0 ? data?.availableFriends.map((user) => (
          <UserItem
            key={user._id}
            user={user}
            handler={selectMemberHandler}
            isAdded={selectedMembers.includes(user._id)}
          />
        )) : <Typography textAlign={"center"}>No Friends ;(</Typography>}
      </Stack>
      <Stack marginTop={"1rem"} marginBottom={"1rem"} direction={"row"} alignItems={"center"} justifyContent={"space-evenly"} spacing={"1rem"}>
        <Button color="error" onClick={closeHandler}>Cancel</Button>
        <Button variant="contained" disabled={isLoadingAddMember} onClick={addMemberSubmitHandler}>Submit</Button>
        
      </Stack>
    </Dialog>
  );
};

export default AddMemberDialog;
