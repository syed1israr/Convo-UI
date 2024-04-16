import { useInputValidation } from '6pp';
import {
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserItem from '../Shared/UserItem';



import toast from 'react-hot-toast';
import { useAsyncMutation, useErrors } from '../../hooks/hooks';
import { useAvailableFriendsQuery, useNewGroupMutation } from '../../redux/api.js';
import { setIsNewGroup } from '../../redux/reducers/misc.js';


const NewGroups = () => {
  const groupName = useInputValidation("");
  const [selectedMembers, setSelectedMembers] = useState([]);

  const { isNewGroup } = useSelector(state=>state.misc)

  const dispatch=useDispatch()
  const {isError, isLoading , error,data} =useAvailableFriendsQuery()
  const [ newGroup , newGroupLoading ]= useAsyncMutation(useNewGroupMutation)

  const errors=[
    {
      isError,
      error
    }
  ]
  useErrors(errors)
  
  const selectMemberHandler = (id) => {

    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((currentId) => currentId !== id) : [...prev, id]
    );
  };
  const submitHandler = () => {
    // Add your logic for submitting the form here
    if(groupName.value){
      toast.error("Group Name is required")
    }
    if(selectedMembers.length < 2){
      toast.error("Please select Atleast 3 Members")
    }
    
    //create Group
    newGroup("Creating New Group...",{name:groupName.value , members:selectedMembers })

    CloseHandler()
  };
  const CloseHandler=()=>{
    dispatch(setIsNewGroup(false))
  }

  return (
    <Dialog open={true} onClose={CloseHandler} > 
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
          { isLoading? <Skeleton/> : data.friends.map((user) => (
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
          <Button variant="outlined" color="error" size="large"
          onClick={CloseHandler}
          >
            Cancel
          </Button>
          <Button variant="outlined" color="primary" onClick={submitHandler}
          disabled={newGroupLoading}
          >
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroups;
