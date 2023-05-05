import { useRecoilValue, useSetRecoilState } from "recoil";
import Navbar from "../Components/Navbar";
import {
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
import styled from "styled-components";

const Container = styled.div`
  color: #1ba098;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100vh;
`;

const Employee = () => {
  const user = useRecoilValue(userState);
  const setReimbursements = useSetRecoilState(reimbursementState);
  const [open, setOpen] = useState(false);
  const status = useRecoilValue(statusState);
  const type = useRecoilValue(typeState);

  const fullName = user.profile.firstName + " " + user.profile.lastName;

  useEffect(() => {
    const getReimbursementsForUser = async () => {
      const data = await getReimbursementByUserId(user.id, status.id, type.id);
      setReimbursements(data);
    };
    getReimbursementsForUser();
  }, [status, type]);

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
        <Container>
          <h1>Hi {fullName}</h1>
          <ReimbursementTable />
          <Button onClick={openDialog}>Add Reimbursement</Button>
          <AddReimbursement open={open} closeDialog={closeDialog} />
        </Container>
      )}
    </Fragment>
  );
};

export default Employee;
