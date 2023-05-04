import { Fragment, useEffect } from "react";
import Navbar from "../Components/Navbar";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { reimbursementState, userState } from "../GlobalState";
import { Navigate } from "react-router-dom";
import { getAllReimbursements } from "../Services/reimbursement";
import ReimbursementTable from "../Components/ReimbursementTable";

const Manager = () => {
  const user = useRecoilValue(userState);
  const setReimbursements = useSetRecoilState(reimbursementState);

  useEffect(() => {
    const getReimbursements = async () => {
      const data = await getAllReimbursements();
      setReimbursements(data);
    };
    getReimbursements();
  }, []);

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
          <h2>This is Manager Screen</h2>
          <ReimbursementTable />
        </div>
      )}
    </Fragment>
  );
};

export default Manager;
