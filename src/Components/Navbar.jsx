import { useRecoilState, useSetRecoilState } from "recoil";
import {
  allTypesState,
  allStatusesState,
  userState,
  reimbursementState,
  errorState,
  typeState,
  statusState,
} from "../GlobalState";
import { AppBar, Button, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const history = useNavigate();
  const [user, setUser] = useRecoilState(userState);
  const setStatuses = useSetRecoilState(allStatusesState);
  const setTypes = useSetRecoilState(allTypesState);
  const setError = useSetRecoilState(errorState);
  const setType = useSetRecoilState(typeState);
  const setStatus = useSetRecoilState(statusState);
  const setReimbursement = useSetRecoilState(reimbursementState);

  const handleLogout = () => {
    setUser({});
    setError({});
    setReimbursement([]);
    setTypes([]);
    setStatuses([]);
    setType({});
    setStatus({});
    localStorage.clear();
    history("/");
  };

  return (
    <div>
      {user.isLoggedIn ? (
        <AppBar position="static">
          <Toolbar
            variant="dense"
            style={{
              width: "calc(100% - 5px)",
              background: "#c2ddf0",
              display: "flex",
              justifyContent: "space-between",
              border: "none",
              padding: "0",
            }}
          >
            <div>
              <Button onClick={handleLogout}>Logout</Button>
            </div>
          </Toolbar>
        </AppBar>
      ) : (
        <AppBar>
          <Toolbar
            variant="dense"
            style={{
              width: "calc(100% - 5px)",
              background: "#c2ddf0",
              display: "flex",
              justifyContent: "space-between",
              border: "none",
              padding: "0",
            }}
          >
            <div>
              <Button>Login</Button>
            </div>
          </Toolbar>
        </AppBar>
      )}
    </div>
  );
};

export default Navbar;
