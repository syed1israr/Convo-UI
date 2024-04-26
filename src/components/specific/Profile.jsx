import React from "react";
import { Avatar, Stack, Typography } from "@mui/material";
import {
  Face as FaceIcon,
  AlternateEmail as UserNameIcon,
  CalendarMonth as CalendarIcon,
} from "@mui/icons-material";
import moment from "moment";
import { useSelector } from "react-redux";


const Profile = () => {
    const { user } =  useSelector(state => state.auth)
    
  return (
    <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
      <Avatar
        src={(user?.data?.avatar?.url) ||(user?.avatar?.url) }
        sx={{
          width: 200,
          height: 200,
          objectFit: "contain",
          marginBottom: "1rem",
          border: "5px solid white",
        }}
      />
      <ProfileCard heading={"Bio"} text={(user?.bio) || (user?.data?.bio) } />
      <ProfileCard
        heading={"Username"}
        text={(user?.username) ||(user?.data?.username) }
        Icon={<UserNameIcon />}
      />
      <ProfileCard heading={"Name"} text={(user?.name) || (user?.data?.name)} Icon={<FaceIcon />} />
      <ProfileCard
        heading={"Joined"}
        text={moment((user?.createdAt) || (user?.data?.createdAt)).fromNow()}
        Icon={<CalendarIcon />}
      />
    </Stack>
  );
};

const ProfileCard = ({ text, Icon, heading }) => (
  <Stack
    direction={"row"}
    alignItems={"center"}
    spacing={"1rem"}
    color={"white"}
    textAlign={"center"}
  >
    {Icon && Icon}

    <Stack>
      <Typography variant="body1">{text}</Typography>
      <Typography color={"gray"} variant="caption">
        {heading}
      </Typography>
    </Stack>
  </Stack>
);

export default Profile;