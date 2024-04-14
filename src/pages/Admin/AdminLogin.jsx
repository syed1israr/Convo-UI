import React, { useState } from 'react';
import { Container, Paper, TextField, Typography, Button } from '@mui/material';
import { useInputValidation, useFileHandler } from '6pp'; // Assuming these are correct imports
import { Navigate } from 'react-router-dom';


const isAdmin=false;
const AdminLogin = () => {
  const [isLogin, setIsLogin] = useState(true);
  const secretKey = useInputValidation('');
  
  const handleLogin = (e) => {
    e.preventDefault();
 
  };
  if(isAdmin ){
    return <Navigate to={"/admin/dashboard"}/>
  }
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <>
          <Typography variant="h5"> Admin Login</Typography>
          <form style={{ width: '100%', marginTop: '1rem' }} onSubmit={handleLogin}>

            <TextField
              required
              fullWidth
              label="Secret Key"
              type="password"
              margin="normal"
              variant="outlined"
              value={secretKey.value}
              onChange={secretKey.changeHandler}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              sx={{
                marginTop: '1rem'
              }}
            >
              Login
            </Button>

          </form>
        </>
      </Paper>
    </Container>
  );
};

export default AdminLogin;
