import Button from "@mui/material/Button";
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import TextField from "@mui/material/TextField";
import React from "react";

interface AddPasswordDialogProps {
  open: boolean,
  onClose: () => void
}

export const AddPasswordDialog: React.FunctionComponent<AddPasswordDialogProps> = ({open, onClose}) => {

  const handleAddDialog = () => {
    //Do something

    onClose();
  }

  return (
      <Dialog open={open} onClose={() => onClose}>
        <DialogTitle>
          Add a new password
        </DialogTitle>
        <DialogContent>
          <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              fullWidth
          />
          <TextField
              autoFocus
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
          />
          <TextField
              autoFocus
              margin="dense"
              id="note"
              label="Note"
              type="text"
              fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddDialog} color="primary">
            Add
          </Button>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
  )
}