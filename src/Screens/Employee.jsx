import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Navbar from "../Components/Navbar";
import {
  allStatusesState,
  allTypesState,
  reimbursementState,
  statusState,
  typeState,
  userState,
} from "../GlobalState";
import { Navigate } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import ReimbursementTable from "../Components/ReimbursementTable";
import { getReimbursementByUserId } from "../Services/reimbursement";
import { Button } from "@mui/material";
import AddReimbursement from "../Components/AddReimbursement";

const Employee = () => {
  const user = useRecoilValue(userState);
  const setReimbursements = useSetRecoilState(reimbursementState);
  const [open, setOpen] = useState(false);
  const [types, setTypes] = useRecoilState(allTypesState);
  const [type, setType] = useRecoilState(typeState);
  const [statuses, setStatuses] = useRecoilState(allStatusesState);
  const [status, setStatus] = useRecoilState(statusState);

  useEffect(() => {
    const getReimbursementsForUser = async () => {
      const data = await getReimbursementByUserId(user.id);
      setReimbursements(data);
    };
    getReimbursementsForUser();
  }, []);

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <div>
        <Navbar />
      </div>
      {!user.isLoggedIn ? (
        <Navigate replace to="/" />
      ) : (
        <div>
          <h1>Hi</h1>
          <h2>This is employee screen</h2>
          <ReimbursementTable />
          <Button onClick={openDialog}>Add Reimbursement</Button>
          <AddReimbursement
            open={open}
            closeDialog={closeDialog}
            types={types}
            setTypes={setTypes}
          />
        </div>
      )}
    </Fragment>
  );
};

export default Employee;
