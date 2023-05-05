import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
} from "@mui/material";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { allStatusesState, statusState } from "../GlobalState";

const UpdateReimbStatus = (props) => {
  const { open, closeDialog, currentStatus } = props;
  const [status, setStatus] = useState(statusState);
  const [statuses, setStatuses] = useRecoilState(allStatusesState);

  const handleSubmit = async () => {
    console.log(status);

    closeDialog();
  };
  return (
    <Dialog
      open={open}
      onClose={closeDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>{"Approve or Reject the reimbursement request"}</DialogTitle>
      <DialogContent>
        <Select
          sx={{
            boxShadow: "none",
            ".MuiOutlinedInput-notchedOutline": { border: 0 },
          }}
          labelId="type-select-label"
          id="type-select"
          value={status}
          label="Type"
          onChange={(e) => {
            setStatus(e.target.value);
          }}
        >
          {statuses.map((status) => (
            <MenuItem key={status.id} value={status.status}>
              {status.status}
            </MenuItem>
          ))}
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateReimbStatus;
