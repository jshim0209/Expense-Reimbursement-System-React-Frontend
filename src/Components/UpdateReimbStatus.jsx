import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
} from "@mui/material";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  allStatusesState,
  reimbursementState,
  statusState,
  userState,
} from "../GlobalState";
import { useState } from "react";
import { updateReimbursementStatus } from "../Services/reimbursement";

const UpdateReimbStatus = (props) => {
  const { open, closeDialog, reimbursement } = props;
  const [status, setStatus] = useState({
    id: 1,
    status: "Pending",
  });
  const resetStatus = useSetRecoilState(statusState);
  const user = useRecoilValue(userState);
  const statuses = useRecoilValue(allStatusesState);
  const [reimbursements, setReimbursements] =
    useRecoilState(reimbursementState);

  const handleSubmit = async () => {
    console.log(status);
    const response = await updateReimbursementStatus(
      reimbursement.id,
      status.id,
      user.id
    );
    resetStatus({});
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
            <MenuItem key={status.id} value={status}>
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
