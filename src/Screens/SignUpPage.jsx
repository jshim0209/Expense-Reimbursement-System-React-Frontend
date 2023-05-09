import { Button, Input, Link, TextField, Typography } from "@mui/material";

const SignUpPage = () => {
  return (
    <div>
      <TextField
        label="Username"
        placeholder="Enter username"
        variant="standard"
        fullWidth
        required
      />
      <TextField
        label="Password"
        placeholder="Enter password"
        type="password"
        variant="standard"
        fullWidth
        required
      />
      <TextField
        label="First Name"
        placeholder="Enter first name"
        variant="standard"
        fullWidth
        required
      />
      <TextField
        label="Last Name"
        placeholder="Enter last name"
        variant="standard"
        fullWidth
        required
      />
      <TextField
        label="Email"
        placeholder="Enter email"
        variant="standard"
        fullWidth
        required
      />
      <Typography>Make user admin?</Typography>
      <Button fullWidth variant="contained">
        Sign Up
      </Button>
    </div>
  );
};

export default SignUpPage;
