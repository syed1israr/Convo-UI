import { Add as AddIcCallRoundedIcon,RemoveCircle as RemoveCircleOutlineIcon } from '@mui/icons-material';
import { Avatar, IconButton, ListItem, Stack, Typography } from '@mui/material';
import React, { memo } from 'react';
import { transoformImage} from "../../lib/Features"
const UserItem = ({ user, handler, handlerisLoading,isAdded=false ,styling={} }) => {
  const { name, _id, avatar  } = user;

  return (
    <ListItem>
      <Stack direction="row" alignItems="center" spacing={1} width="100%"
      {...styling}>
        <Avatar  src={transoformImage(avatar)}/>
        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}
        >
          {name}
        </Typography>
        <IconButton
          size="small"
          sx={{
            bgcolor: isAdded ?  "error.main":  "primary.main",
            color: "white",
            "&:hover": {
              bgcolor:  isAdded ?  "error.dark":  "primary.main"
            }
          }}
          onClick={() => handler(_id)} 
          disabled={handlerisLoading}
        >{
            isAdded ?  <RemoveCircleOutlineIcon/> :  <AddIcCallRoundedIcon />
        }
         
        </IconButton>
      </Stack>
    </ListItem>
  );
};

export default memo(UserItem);
