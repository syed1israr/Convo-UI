import React from 'react';
import { Avatar, Stack, Typography } from '@mui/material';
import { Face as FaceIcon, AlternateEmail as UsernameIcon, CalendarMonth as CalendarIcon } from "@mui/icons-material";
import moment from "moment";
import { transoformImage } from '../../lib/Features'
const Profile = ({user}) => {
    
    return (
        <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
            <Avatar src={ transoformImage(user?.data?.avatar?.url)}
            
            sx={{
                width: 200,
                height: 200,
                objectFit: "contain",
                marginBottom: "1rem",
                border: "5px solid white"
            }} />
            <ProfileCard heading={"bio"} text={user?.data?.bio} />
            <ProfileCard heading={"Username"} text={user?.data?.username} Icon={UsernameIcon} />
            <ProfileCard heading={"name"} text={user?.data?.name} Icon={FaceIcon} />
            <ProfileCard heading={"Joined"} text={moment(user?.data?.createdAt).fromNow()} Icon={CalendarIcon} />
        </Stack>
    );
};

const ProfileCard = ({ text, Icon, heading }) => {
    return (
        <Stack direction={"row"} alignItems={"center"} color={"white"} textAlign={"center"} spacing={"1rem"}>
            {Icon && <Icon />}
            <Stack>
                <Typography variant='body1'>{text}</Typography>
                <Typography color={"grey"} variant='caption'>{heading}</Typography>
            </Stack>
        </Stack>
    );
};

export default Profile;
