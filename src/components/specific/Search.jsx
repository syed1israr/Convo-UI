import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  ListItem,
  Stack,
  TextField
} from '@mui/material';
import { SearchRounded } from '@mui/icons-material';
import UserItem from '../Shared/UserItem';
import { sampleUsers } from '../../constants/SampleData';

const Search = () => {
  const [searchValue, setSearchValue] = useState('');
  const [users, setUsers] = useState(sampleUsers);
  const [isLoadingSendFriendRequest, setIsLoadingSendFriendRequest] = useState(false);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    // Here you might want to filter users based on the search input
  };

  const addFriendHandler = (id) => {
    console.log(id);
    // Add logic for adding a friend
  };

  return (
    <Dialog open>
      <Stack padding={'2rem'} width={'25rem'} direction={'column'}>
        <DialogTitle textAlign={'center'}>Find People</DialogTitle>
        <TextField
          label=""
          value={searchValue}
          onChange={handleSearchChange}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRounded />
              </InputAdornment>
            )
          }}
        />
        <List>
          {users.map((user) => (
            <UserItem
              key={user._id}
              user={user}
              handler={addFriendHandler}
              handlerIsLoading={isLoadingSendFriendRequest}
            />
          ))}
        </List>
      </Stack>
    </Dialog>
  );
};

export default Search;
