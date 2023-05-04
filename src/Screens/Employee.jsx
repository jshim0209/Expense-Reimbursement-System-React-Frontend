import { useRecoilValue } from "recoil";
import Navbar from "../Components/Navbar";
import { userState } from "../GlobalState";
import { Navigate } from "react-router-dom";
import { Fragment } from "react";

const Employee = () => {
  const user = useRecoilValue(userState);

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
        </div>
      )}
    </Fragment>
  );
};

export default Employee;
