import React from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { Paper, Typography, Container } from '@mui/material';

const Table = ({ rows, columns, heading, rowheight = 52 }) => { // Fix typo in props
    return (
      <Container
        sx={{
          height: "100vh"
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: "1rem 4rem",
            borderRadius: "1rem",
            margin: "auto",
            width: "100%",
            overflow: "hidden",
            height: "100%",
          }}
        >
          <Typography
            textAlign={"center"}
            variant='h4'
            sx={{
              margin: "2rem",
              textTransform: "uppercase"
            }}
          >
            {heading}
          </Typography>
          <DataGrid
            rows={rows}
            columns={columns}
            sx={{
              border: "none",
              "& .MuiDataGrid-colCell": { // Correct class for header customization
                backgroundColor: "black", // Use camelCase for CSS properties
                color: "white"
              }
            }}
            rowHeight={rowheight}
            style={{
              height: "80%"
            }}
          />
        </Paper>
      </Container>
    )
  }
  
  export default Table;