import { CalendarMonth as CalendarIcon, Face as FaceIcon, AlternateEmail as UsernameIcon } from "@mui/icons-material";
import { Avatar, Skeleton, Stack, Typography } from '@mui/material';
import moment from "moment";
import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const { user } = useSelector(state => state.auth); // Assuming `auth` is the slice containing user data

    useEffect(() => {
        if (user && user.data) {
            setUserData(user.data);
        }
    }, [user]);

    if (!userData) {
     
        return(<div style={{
           
            paddingBottom:"9px"
        }}>
         <Skeleton sx={{
                     width: 250,
                    height: 400,
                    objectFit: "contain",
                    marginLeft:"50px",
                    marginBottom: "1rem",
                    borderRadius:"100%"
        }}/>

        <Skeleton sx={{
            marginTop:"-70px" ,
            marginBottom:"80px",
            height:"50px",
            width: "100px",
            marginLeft:"130px"
            }}/>
        <Skeleton  sx={{
            marginTop:"-20px" ,
            marginBottom:"20px",
            height:"50px",
            width: "100px",
            marginLeft:"130px"
            }} />
        <Skeleton  sx={{
            marginTop:"-20px" ,
            marginBottom:"20px",
            height:"50px",
            width: "100px",
            marginLeft:"130px"
            }}/>
        <Skeleton  sx={{
            marginTop:"-20px" ,
            marginBottom:"20px",
            height:"50px",
            width: "100px",
            marginLeft:"130px"
            }}/>
        </div>);
    }

    return (
        <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
            <Avatar src={userData.avatar.url}
                sx={{
                    width: 200,
                    height: 200,
                    objectFit: "contain",
                    marginBottom: "1rem",
                    border: "5px solid white"
                }} />
            <ProfileCard heading={"bio"} text={userData.bio} />
            <ProfileCard heading={"Username"} text={userData.username} Icon={UsernameIcon} />
            <ProfileCard heading={"name"} text={userData.name} Icon={FaceIcon} />
            <ProfileCard heading={"Joined"} text={moment(userData.createdAt).fromNow()} Icon={CalendarIcon} />
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
