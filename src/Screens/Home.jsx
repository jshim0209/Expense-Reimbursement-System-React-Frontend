import { useRecoilValue } from "recoil";
import { userState } from "../GlobalState";
import { Navigate } from "react-router-dom";
import { Fragment } from "react";
import Navbar from "../Components/Navbar";

const Home = () => {
  const user = useRecoilValue(userState);
  return (
    <Fragment>
      {!user.isLoggedIn ? (
        <Navigate replace to="/login" />
      ) : !user.isManager ? (
        <Navigate replace to="/employee" />
      ) : (
        <Navigate replace to="/manager" />
      )}
    </Fragment>
  );
};

export default Home;
