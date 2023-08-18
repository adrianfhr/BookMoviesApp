import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';


const ConfirmDialog = (props) => {
  const { title, subTittle, onConfirm, confirmDialog, setConfirmDialog } = props;

  const handleClose = () => {
    setConfirmDialog({ ...confirmDialog, isOpen: false });
  };

  const handleConfirm = () => {
    onConfirm();
    handleClose();
  };

  return (
    <Dialog open={confirmDialog.isOpen} onClose={handleClose}>
      <DialogTitle className="bg-background text-white">
        <Typography variant="h6">{title}</Typography>
      </DialogTitle>
      <DialogContent className="bg-background text-textColor">
        <Typography className='my-2' variant="subtitle2">{subTittle}</Typography>
      </DialogContent>
      <DialogActions className="bg-background">
        <Button onClick={handleClose} color="primary">
          No
        </Button>
        <Button onClick={handleConfirm} color="primary" autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
