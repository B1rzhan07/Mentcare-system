import React from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from "@mui/icons-material/Login";
import { useSelector } from "react-redux";
import Modal from "./Modal/Modal";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useDispatch } from "react-redux";
import {
  setDataPatients,
  setDataDoctors,
} from "../Redux/Slices/userSlice";
import axios from "axios";

const drawerWidth = 300;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(
    ["margin", "width"],
    {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }
  ),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(
      ["margin", "width"],
      {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }
    ),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const Header = () => {
  const dispatch = useDispatch();
  if (localStorage.getItem("token")) {
  }
  const { isAuth, type } = useSelector(
    (state) => state.user
  );
  const typeUser = localStorage.getItem("type");
  const [user, setUser] = React.useState();
  React.useEffect(() => {
    try {
      axios
        .get(
          `http://localhost:8800/api/myPage/${typeUser}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(
                "token"
              )}`,
            },
          }
        )
        .then((response) => {
          setUser(response.data);
          if (typeUser === "doctor") {
            dispatch(setDataDoctors(response.data));
          }
          if (typeUser === "patient") {
            dispatch(setDataPatients(response.data));
          }
        });
    } catch (err) {
      console.log(err.message);
    }
  }, [localStorage.getItem("type")]);
  console.log(user);

  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [active, setActive] = React.useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("type");
    window.location.reload();
    window.location.replace("/");
  };
  const logged = localStorage.getItem("token");

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="static" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              mr: 2,
              ...(open && { display: "none" }),
            }}>
            {localStorage.getItem("token") && <MenuIcon />}
          </IconButton>

          <Typography
            component={"div"}
            to="/"
            variant="h6"
            sx={{ flexGrow: 1 }}>
            LinkDenSis.Me
          </Typography>
          {console.log(isAuth, logged)}
          {logged ? (
            <div>
              <h4>
                {localStorage.getItem("email")}
                <LogoutIcon onClick={logout} />
              </h4>
            </div>
          ) : (
            <span>
              <LoginIcon />
              <Button
                onClick={() => setActive(true)}
                color="inherit">
                Login
              </Button>
              {active ? (
                <Modal
                  active={active}
                  setActive={setActive}
                />
              ) : null}
            </span>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {type}
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : null}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {/* {[
            "Get Patients",
            "Get Doctors",
            "Register a Patient",
            "Register a Doctor",
          ].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))} */}

          <ListItem key={"get"} disablePadding>
            <ListItemButton>
              {localStorage.type === "admin" && (
                <ListItemText
                  primary={"Personal Information"}
                  onClick={() => navigate("/personalAdmin")}
                />
              )}
              {localStorage.type === "doctor" && (
                <ListItemText
                  primary={"Personal Information"}
                  onClick={() =>
                    navigate(`/doctor/${user.id}`)
                  }
                />
              )}

              {localStorage.type === "patient" && (
                <ListItemText
                  primary={"Personal Information"}
                  onClick={() =>
                    navigate(`/patient/${user.id}`)
                  }
                />
              )}
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default Header;
