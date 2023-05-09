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
import {
  AppBar,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
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
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: { xs: "none", sm: "block" } }}></Box>
            <List
              style={{ textAlign: "center" }}
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                marginRight: "2rem",
              }}
            >
              <ListItem key={"logout"} sx={{}}>
                <ListItemButton sx={{}} onClick={handleLogout}>
                  <ListItemText
                    style={{ color: "#fff" }}
                    primaryTypographyProps={{
                      fontSize: "1.5em",
                    }}
                    primary="Logout"
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </Toolbar>
        </AppBar>
      ) : (
        <AppBar position="static">
          <Toolbar
            variant="dense"
            style={{
              width: "calc(100% - 5px)",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: { xs: "none", sm: "block" } }}></Box>
            <List
              style={{ textAlign: "center" }}
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                marginRight: "2rem",
              }}
            >
              <ListItem key={"signUp"} sx={{}}>
                <ListItemButton sx={{}}>
                  <ListItemText
                    style={{ color: "#fff" }}
                    primaryTypographyProps={{
                      fontSize: "1.5em",
                    }}
                    primary="Sign Up"
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </Toolbar>
        </AppBar>
      )}
    </div>
  );
};

export default Navbar;
