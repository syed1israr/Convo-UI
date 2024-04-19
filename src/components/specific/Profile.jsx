import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import moment from "moment";
import { Avatar, Skeleton, Stack, Typography } from '@mui/material';
import { CalendarMonth as CalendarIcon, Face as FaceIcon, AlternateEmail as UsernameIcon } from "@mui/icons-material";
{/*
  Hi
*/}
const Profile = () => {
    const [userData, setUserData] = useState(null);
    const { user } = useSelector(state => state.auth); // Assuming `auth` is the slice containing user data

    useEffect(() => {
        if (user && user.data) {
            setUserData(user.data);
        }
    }, [user]);

    if (!userData) {
        return (
            <SkeletonProfile />
        );
    }
    return (
        <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
            <AvatarProfile userData={userData} />
            <ProfileCard heading={"bio"} text={userData.bio} />
            <ProfileCard heading={"Username"} text={userData.username} Icon={UsernameIcon} />
            <ProfileCard heading={"name"} text={userData.name} Icon={FaceIcon} />
            <ProfileCard heading={"Joined"} text={moment(userData.createdAt).fromNow()} Icon={CalendarIcon} />
        </Stack>
    );
};

const AvatarProfile = ({ userData }) => (
    <Avatar src={userData.avatar.url}
        sx={{
            width: 200,
            height: 200,
            objectFit: "contain",
            marginBottom: "1rem",
            border: "5px solid white"
        }} />
);

const ProfileCard = ({ text, Icon, heading }) => (
    <Stack direction={"row"} alignItems={"center"} color={"white"} textAlign={"center"} spacing={"1rem"}>
        {Icon && <Icon />}
        <Stack>
            <Typography variant='body1'>{text}</Typography>
            <Typography color={"grey"} variant='caption'>{heading}</Typography>
        </Stack>
    </Stack>
);

const SkeletonProfile = () => (
    <Stack className="MuiStack-root css-1u4that-MuiStack-root" style={{}}>
        <Skeleton variant="circular" width={200} height={201} />
        {[...Array(4)].map((_, index) => (
            <SkeletonCard key={index} />
        ))}
    </Stack>
);

const SkeletonCard = () => (
    <Stack className="MuiStack-root css-45wm5i-MuiStack-root">
        <Skeleton variant="circular" width={50} height={50} />
        <Stack className="MuiStack-root css-nen11g-MuiStack-root">
            <Skeleton width={100} />
            <Skeleton width={80} />
        </Stack>
    </Stack>
);

export default Profile;
