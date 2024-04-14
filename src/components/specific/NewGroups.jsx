import React, { useState } from 'react';
import { sampleUsers } from '../../constants/SampleData';
import {
  Button,
  Dialog,
  DialogTitle,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import UserItem from '../Shared/UserItem';
import { useInputValidation } from '6pp';

const NewGroups = () => {
  const groupName = useInputValidation("");

  const [members, setMembers] = useState(sampleUsers);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const selectMemberHandler = (id) => {
     


    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((currentId) => currentId !== id) : [...prev, id]
    );
  };
  
  console.log(selectedMembers);

  const submitHandler = () => {
    // Add your logic for submitting the form here
  };
  const CloseHandler=()=>{

  }

  return (
    <Dialog open onClose={CloseHandler} > 
      <Stack p={{ xs: "1rem", sm: "3rem" }} width="25rem" spacing={"2rem"}>
        <DialogTitle textAlign={"center"} variant="h4">New Group</DialogTitle>
        <TextField
          fullWidth
          variant="outlined"
          label="Group Name"
          value={groupName.value}
          onChange={groupName.changeHandler}
          
        />
        <Typography variant="body1" mt={2} mb={1}>
          Members
        </Typography>
        <Stack spacing={1}>
          {members.map((user) => (
            <UserItem
              key={user._id}
              user={user}
              handler={selectMemberHandler}
              isAdded={
                selectedMembers.includes(user._id)
              }
            />
          ))}
        </Stack>
        <Stack direction="row" justifyContent="space-evenly" mt={3} spacing={2}>
          <Button variant="outlined" color="error" size="large">
            Cancel
          </Button>
          <Button variant="outlined" color="primary" onClick={submitHandler}>
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroups;
