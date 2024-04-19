import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';
import React from 'react';
{/*
  Hi
*/}
const ConfirmDeleteDialoge = ({ open, handleclose, deletehandler }) => {
  return (
    <Dialog open={open} onClose={handleclose}>
      <DialogContent>
        <DialogContentText>Confirm Delete</DialogContentText>
        <DialogContentText>Are you sure you want to delete?</DialogContentText>

      </DialogContent>
      <DialogActions>
        <Button onClick={handleclose}>NO</Button>
        <Button color='error' onClick={deletehandler}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteDialoge;
