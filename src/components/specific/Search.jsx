import { useInputValidation } from "6pp";
import { Search as SearchIcon } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAsyncMutation } from "../../hooks/hooks.jsx";
import {
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
} from "../../redux/api.js";
import { setIsSearch } from "../../redux/reducers/misc.js";
import UserItem from "../Shared/UserItem.jsx";

const Search = () => {
  const { isSearch } = useSelector((state) => state.misc);
  const { user } = useSelector((state) => state.auth); // Corrected the syntax

  const [searchUser] = useLazySearchUserQuery();

  const [sendFriendRequest, isLoadingSendFriendRequest] = useAsyncMutation(
    useSendFriendRequestMutation
  );

  const dispatch = useDispatch();

  const search = useInputValidation("");

  const [users, setUsers] = useState([]);

  const addFriendHandler = async (id) => {
    await sendFriendRequest({ userId: id }); // Removed loading message
  };

  const searchCloseHandler = () => dispatch(setIsSearch(false));


  return (
    <Dialog
      open={isSearch}
      onClose={searchCloseHandler}
      maxWidth="xs"
      fullWidth
    >
      <Stack p={"2rem"} direction={"column"} width={"100%"}>
        <DialogTitle textAlign={"center"}>Find People</DialogTitle>
        <TextField
          label=""
          value={search.value}
          onChange={search.onChange} // Changed to search.onChange
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          fullWidth
          margin="normal"
        />

        {search.value === "" ? ( // Changed condition to check if search value is empty
          <Typography sx={{ marginLeft: "1rem", marginTop: "1rem" }}>
            Start Typing to See List
          </Typography>
        ) : (
          <List>
            {users
              .filter(u => u._id !== (user?._id || user?.data?._id)) 
              .map((i) => (
                <UserItem
                  user={i}
                  key={i._id}
                  handler={addFriendHandler}
                  handlerIsLoading={isLoadingSendFriendRequest}
                />
              ))}
          </List>
        )}
      </Stack>
    </Dialog>
  );
};

export default Search;
