import { useRecoilState } from "recoil";
import { userState } from "../GlobalState";
import { Button, Input } from "@mui/material";
import { Fragment, useState } from "react";
import { login } from "../Services/authentication";
import { Navigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

const Login = () => {
  const [user, setUser] = useRecoilState(userState);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleKeyPress = (event) => {
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
  return (
    <div>
      <Navbar />
      {!user.isLoggedIn ? (
        <Fragment>
          <div>
            <h1>Hi</h1>
            <h2>This is login page</h2>
          </div>
          <Input
            onChange={(e) => setUsername(e.target.value)}
            id="username"
            label="Username"
            placeholder="username"
            type="text"
            required
            onKeyPress={handleKeyPress}
          />
          <Input
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            label="Password"
            placeholder="password"
            type="password"
            required
            onKeyPress={handleKeyPress}
          />
          <Button onClick={handleLogin}>Login</Button>
        </Fragment>
      ) : user.manager ? (
        <Navigate replace to="/manager" />
      ) : (
        <Navigate replace to="/employee" />
      )}
    </div>
  );
};

export default Login;
