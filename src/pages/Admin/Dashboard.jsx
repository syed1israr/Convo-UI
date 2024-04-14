import React from 'react';
import AdminLayout from '../../components/Layout/AdminLayout';
import { Box, Container, Paper, Stack, Typography } from '@mui/material';
import { AdminPanelSettings, Group, GroupOutlined, Message, NotificationAdd, Person, Person3 } from '@mui/icons-material';
import moment from 'moment';
import { CurveButton, SearchField } from '../../components/Styles/StyledComponent';
import { DoughnutChart, LineChart } from '../../components/specific/Charts';

const Dashboard = () => {
  const formattedDate = moment().format('MMMM Do YYYY, h:mm:ss a');

  const Widgets = (
    <Stack
      justifyContent={"space-between"}
      alignItems={"center"}
      margin={"2rem 0"}
      direction={{ xs: "column", sm: "row" }}>
      <Widget title={"users"} value={34} Icon={<Person />} />
      <Widget title={"Chats"} value={3} Icon={<GroupOutlined />} />
      <Widget title={"messages"} value={52436} Icon={<Message />} />
    </Stack>
  );

  const AppBar = (
    <Paper elevation={3} sx={{ padding: "2rem", margin: "2rem 0", borderRadius: "1rem" }}>
      <Stack spacing={"1rem"} direction={"row"} alignItems={"center"}>
        <AdminPanelSettings sx={{ fontSize: "3rem" }} />
        <SearchField />
        <CurveButton>search</CurveButton>
        <Box flexGrow={1} />
        <Typography display={{ xs: "none", lg: "block" }}>{formattedDate}</Typography>
        <NotificationAdd />
      </Stack>
    </Paper>
  );

  return (
    <AdminLayout>
      <Container component={"main"}>
        {AppBar}
        <Stack direction={{
            lg:"row",
            xs:"column"
        }} sx={{
         gap:"2rem"
        }} flexWrap={"wrap"} justifyContent={"center"}>
          <Paper elevation={3} sx={{
            padding: "1rem 1rem",
            borderRadius: "2rem",
            width: { xs: "100%", lg: "50%" },
            position: "relative",
            
          }}>
            <Typography variant={"h5"} margin={"2rem 0rem"}>Last Message</Typography>
            <LineChart value={[1, 2, 3, 4, 5, 4, 3, 2, 1]} />
          </Paper>
          <Paper elevation={3} sx={{
            padding: "1rem",
            borderRadius: "1rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: { xs: "50%", lg: "30%" },
            position: "relative",
          }}>
            <DoughnutChart
              labels={["Single Chats", "Group Chats"]}
              value={[23, 43]}
            />
            <Stack position={"absolute"}
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              spacing={"0.5rem"}
              width={"100%"}
            >
              <Group /><Typography>Vs</Typography>
              <Person3 />
            </Stack>
          </Paper>
        </Stack>
        {Widgets}
      </Container>
    </AdminLayout>
  );
};

const Widget = ({ title, value, Icon }) => (
  <Paper
    elevation={3}
    sx={{
      padding: "1.5rem",
      margin: "2rem 1rem",
      borderRadius: "1.5rem",
      width: "20rem"
    }}>
    <Stack alignItems={"center"} spacing={"1rem"}>
      <Typography
        sx={{
          color: "rgba(0,0,0,0.7)",
          borderRadius: "50%",
          border: "5px solid rgba(0,0,0,0.9)",
          width: "5rem",
          height: "5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >{value}</Typography>
      <Stack
        direction={"row"}
        spacing={"1rem"}
        alignItems={"center"}>
        {Icon}
        <Typography>{title}</Typography>
      </Stack>
    </Stack>
  </Paper>
);

export default Dashboard;
