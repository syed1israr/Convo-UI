import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, Stack, Typography } from '@mui/material';
import { sampleUsers } from '../../constants/SampleData';
import UserItem from '../Shared/UserItem';

const AddMemberDialog = ({ addMember, isLoadingAddMember, chatId }) => {
  const [members, setMembers] = useState(sampleUsers);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((currentId) => currentId !== id) : [...prev, id]
    );
  };

  const addMemberSubmitHandler = () => {
    console.log("addMemberSubmitHandler");
    closeHandler();
  };

  const closeHandler = () => {
    setSelectedMembers([]);
    setMembers([])
    console.log("closeHandler");
  };

  return (
    <Dialog open onClose={closeHandler}>
      <Stack p={"2rem"} width={"20rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center"}>Add Member</DialogTitle>
      </Stack>
      <Stack spacing={1}>
        {members.length > 0 ? members.map((user) => (
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
