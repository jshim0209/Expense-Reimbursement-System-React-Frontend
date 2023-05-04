import { useRecoilState, useSetRecoilState } from "recoil";
import { typeState, userState } from "../GlobalState";
import { AppBar, Button, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const history = useNavigate();
  const [user, setUser] = useRecoilState(userState);
  const setTypes = useSetRecoilState(typeState);

  const handleLogout = () => {
    setUser({});
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
              <Button
                onClick={() => {
                  setUser({});
                  setTypes([]);
                  localStorage.clear();
                  history("/");
                }}
              >
                Logout
              </Button>
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
