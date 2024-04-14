import React from 'react';
import { Avatar, Stack, Typography } from '@mui/material';
import { Face as FaceIcon, AlternateEmail as UsernameIcon, CalendarMonth as CalendarIcon } from "@mui/icons-material";
import moment from "moment";

const Profile = () => {
    return (
        <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
            <Avatar sx={{
                width: 200,
                height: 200,
                objectFit: "contain",
                marginBottom: "1rem",
                border: "5px solid white"
            }} />
            <ProfileCard heading={"bio"} text={"Full Stack Web Developer"} />
            <ProfileCard heading={"Username"} text={"syed_fara.z"} Icon={UsernameIcon} />
            <ProfileCard heading={"name"} text={"Syed Israr Ahmed"} Icon={FaceIcon} />
            <ProfileCard heading={"Joined"} text={moment('2023-11-04T18:30:00.000Z').fromNow()} Icon={CalendarIcon} />
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
