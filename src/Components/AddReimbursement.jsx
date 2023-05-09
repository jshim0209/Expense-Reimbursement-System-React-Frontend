import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { createReimbursement } from "../Services/reimbursement";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  allTypesState,
  reimbursementState,
  typeState,
  userState,
} from "../GlobalState";
import { getTypes } from "../Services/type";

const AddReimbursement = (props) => {
  const { open, closeDialog } = props;
  const [amount, setAmount] = useState(0.0);
  const [description, setDescription] = useState("");
  const [type, setType] = useRecoilState(typeState);
  const [types, setTypes] = useRecoilState(allTypesState);
  const user = useRecoilValue(userState);
  const [reimbursements, setReimbursements] =
    useRecoilState(reimbursementState);

  useEffect(() => {
    const getAllTypes = async () => {
      const data = await getTypes();
      setTypes(data);
    };
    getAllTypes();
  }, []);

  const handleSubmit = async () => {
    console.log(type.type);
    const response = await createReimbursement(user.id, {
      amount: amount,
      description: description,
      type: type,
    });
    setReimbursements([...reimbursements, response]);
    setType({});
    closeDialog();
  };

  return (
    <Dialog
      open={open}
      onClose={closeDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>{"Add new reimbursement request"}</DialogTitle>
      <DialogContent>
        <TextField
          placeholder="Amount"
          onChange={(e) => setAmount(e.target.value)}
        />
        <TextField
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <Select
          sx={{
            boxShadow: "none",
            ".MuiOutlinedInput-notchedOutline": { border: 0 },
          }}
          labelId="type-select-label"
          id="type-select"
          value={type.type}
          label="Type"
          defaultValue={type.type}
          onChange={(e) => {
            setType(e.target.value);
          }}
        >
          {types.map((type) => (
            <MenuItem key={type.id} value={type}>
              {type.type}
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

export default AddReimbursement;
