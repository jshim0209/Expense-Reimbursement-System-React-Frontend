import { Fragment, useEffect } from "react";
import Navbar from "../Components/Navbar";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  allStatusesState,
  allTypesState,
  reimbursementState,
  statusState,
  typeState,
  userState,
} from "../GlobalState";
import { Navigate } from "react-router-dom";
import { getAllReimbursements } from "../Services/reimbursement";
import ReimbursementTable from "../Components/ReimbursementTable";

const Manager = () => {
  const user = useRecoilValue(userState);
  const setReimbursements = useSetRecoilState(reimbursementState);
  const [status, setStatus] = useRecoilState(statusState);
  const [type, setType] = useRecoilState(typeState);
  const [statuses, setStatuses] = useRecoilState(allStatusesState);
  const [types, setTypes] = useRecoilState(allTypesState);

  useEffect(() => {
    const getReimbursements = async () => {
      const data = await getAllReimbursements(status.id, type.id);
      setReimbursements(data);
    };
    getReimbursements();
  }, [status, setType]);

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
