import { Fragment, useEffect } from "react";
import Navbar from "../Components/Navbar";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  reimbursementState,
  statusState,
  typeState,
  userState,
} from "../GlobalState";
import { Navigate } from "react-router-dom";
import { getAllReimbursements } from "../Services/reimbursement";
import ReimbursementTable from "../Components/ReimbursementTable";
import styled from "styled-components";

const Container = styled.div`
  color: #1ba098;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100vh;
`;

const Manager = () => {
  const user = useRecoilValue(userState);
  const setReimbursements = useSetRecoilState(reimbursementState);
  const status = useRecoilValue(statusState);
  const type = useRecoilValue(typeState);

  const fullName = user.profile.firstName + " " + user.profile.lastName;

  useEffect(() => {
    const getReimbursements = async () => {
      const data = await getAllReimbursements(status.id, type.id);
      setReimbursements(data);
    };
    getReimbursements();
  }, [status, type]);

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
        </Container>
      )}
    </Fragment>
  );
};

export default Manager;
