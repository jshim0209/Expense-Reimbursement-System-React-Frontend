import { useRecoilState } from "recoil";
import { userState } from "../GlobalState";
import { Fragment, useState } from "react";
import { login } from "../Services/authentication";
import { Navigate } from "react-router-dom";
import SignInSignUpOverlay from "../Components/SignInSignUpOverlay";
import styled from "styled-components";
import { signUp } from "../Services/user";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Login = () => {
  const [user, setUser] = useRecoilState(userState);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    email: "",
  });
  const handleKeyPressLogin = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    if (username.trim() === "" || password.trim() === "") {
      setError({ isError: true, message: "Please fill out all fields" });
      return;
    }
    const response = await login({
      username: username,
      password: password,
    }).catch((err) => {
      setError({ isError: true, message: "Invalid username or password" });
    });
    if (!response) {
      setError({ isError: true, message: "No response from server..." });
    } else if (response) {
      setError({ isError: false, message: "" });
      setUser({
        isLoggedIn: true,
        id: response.id,
        profile: response.profile,
        manager: response.manager,
      });
    }
  };

  const handleKeyPressSignUp = (event) => {
    if (event.key === "Enter") {
      handleSignUp();
    }
  };

  const handleSignUp = async () => {
    console.log(userInfo);
    const response = await signUp({
      credentials: {
        username: userInfo.username,
        password: userInfo.password,
      },
      profile: {
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
      },
    });
    console.log(response);
    setUserInfo({
      username: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      email: "",
    });
  };

  return (
    <Fragment>
      {!user.isLoggedIn ? (
        <Container>
          <SignInSignUpOverlay
            setUsername={setUsername}
            setPassword={setPassword}
            handleLogin={handleLogin}
            handleKeyPressLogin={handleKeyPressLogin}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            handleSignUp={handleSignUp}
            handleKeyPressSignUp={handleKeyPressSignUp}
          />
        </Container>
      ) : user.manager ? (
        <Navigate replace to="/manager" />
      ) : (
        <Navigate replace to="/employee" />
      )}
    </Fragment>
  );
};

export default Login;
