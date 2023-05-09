import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
} from "@mui/material";
import {
  Container,
  Form,
  GhostButton,
  LeftOverlayPanel,
  Overlay,
  OverlayContainer,
  Paragraph,
  RightOverlayPanel,
  SignInContainer,
  SignUpContainer,
  Title,
} from "./SignInSignUpOverlay.style";
import { useState } from "react";
import { SignUpForm } from "./SignUpForm";

const btnStyle = {
  margin: "28px 0",
};

const SignInSignUpOverlay = (props) => {
  const {
    setUsername,
    setPassword,
    handleLogin,
    handleKeyPressLogin,

    userInfo,
    setUserInfo,
    handleSignUp,
    handlekeyPressSignUp,
  } = props;
  const [signIn, toggle] = useState(true);

  return (
    <Container>
      <SignUpContainer signinIn={signIn}>
        <Form>
          <Grid align="center">
            <h2>Sign Up</h2>
          </Grid>
          {SignUpForm.map((input) => (
            <TextField
              key={input.name}
              {...input}
              value={userInfo[input.name]}
              onChange={(e) => {
                setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
              }}
              onKeyPress={handlekeyPressSignUp}
              fullWidth
              required
            />
          ))}
          <Button
            onClick={() => {
              handleSignUp();
              toggle(true);
            }}
            color="primary"
            fullWidth
            variant="contained"
            style={btnStyle}
          >
            Sign Up
          </Button>
        </Form>
      </SignUpContainer>

      <SignInContainer signinIn={signIn}>
        <Form>
          <Grid align="center">
            <h2>Sign In</h2>
          </Grid>
          <TextField
            id="username"
            label="Username"
            placeholder="Enter username"
            type="text"
            variant="standard"
            fullWidth
            required
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={handleKeyPressLogin}
          />
          <TextField
            id="password"
            label="Password"
            placeholder="Enter password"
            type="password"
            variant="standard"
            fullWidth
            required
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPressLogin}
          />
          <FormControlLabel
            control={<Checkbox name="checkedB" color="primary" />}
            label="Remember me"
          />
          <Button
            onClick={handleLogin}
            color="primary"
            fullWidth
            variant="contained"
            style={btnStyle}
          >
            Login
          </Button>
        </Form>
      </SignInContainer>

      <OverlayContainer signinIn={signIn}>
        <Overlay signinIn={signIn}>
          <LeftOverlayPanel signinIn={signIn}>
            <Title>Welcome Back!</Title>
            <Paragraph>
              To keep connected with us please login with your personal info
            </Paragraph>
            <GhostButton onClick={() => toggle(true)}>Sign In</GhostButton>
          </LeftOverlayPanel>

          <RightOverlayPanel signinIn={signIn}>
            <Title>Hello, stranger!</Title>
            <Paragraph>Do you need to create an account?</Paragraph>
            <GhostButton
              variant="outlined"
              color="warning"
              onClick={() => toggle(false)}
            >
              Sigin Up
            </GhostButton>
          </RightOverlayPanel>
        </Overlay>
      </OverlayContainer>
    </Container>
  );
};

export default SignInSignUpOverlay;
