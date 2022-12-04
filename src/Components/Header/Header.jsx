import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useSelector, useDispatch } from "react-redux";
import axios from "../../api/axios";
import { fetchUsers } from "../../Redux/Slices/userSlice";
import { fetchDepartments } from "../../Redux/Slices/departmentSlice";
import { fetchServices } from "../../Redux/Slices/serviceSlice";
import { setAppointments } from "../../Redux/Slices/appointmentSlice";
import {
  setDataPatients,
  setDataDoctors,
} from "../../Redux/Slices/userSlice";
import classes from "./Header.module.scss";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Modal from "../Modal/Modal";
import LoginIcon from "@mui/icons-material/Login";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

const pages = [
  "Personal Information",
  "My messages",
  "My appointments",
];
const settings = ["Logout"];

const Header = () => {
  const [anchorElNav, setAnchorElNav] =
    React.useState(null);
  const [anchorElUser, setAnchorElUser] =
    React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const dispatch = useDispatch();
  const { type } = useSelector((state) => state.user);

  React.useEffect(() => {
    dispatch(fetchDepartments());
    dispatch(fetchServices());
  }, []);
  const [user, setUser] = React.useState(null);
  console.log(user);
  const typeUser = localStorage.getItem("type");

  React.useEffect(() => {
    if (typeUser === "patient") {
      try {
        axios
          .get("/myPage/patient/appointment", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(
                "token"
              )}`,
            },
          })
          .then((res) => {
            dispatch(setAppointments(res.data));
          });
      } catch (error) {
        console.log(error);
      }
    }
  }, [typeUser]);
  React.useEffect(() => {
    if (typeUser === "doctor") {
      try {
        axios
          .get("/myPage/doctor/appointment", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(
                "token"
              )}`,
            },
          })
          .then((res) => {
            dispatch(setAppointments(res.data));
          });
      } catch (error) {
        console.log(error);
      }
    }
  }, [typeUser]);

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
    navigate("/");
    localStorage.clear();
  };
  const logged = localStorage.getItem("token");
  if (logged === "admin") {
    fetchUsers();
  }
  const handleCloseNavMenu = (page) => {
    setAnchorElNav(null);
    if (
      page === "Personal Information" &&
      localStorage.getItem("type")
    ) {
      if (type === "patient") {
        navigate(`/patient/${user[0].id}`);
      }
      if (type === "doctor") {
        navigate(`/doctor/${user[0].id}`);
      }
      if (type == "admin") {
        navigate("/personalAdmin");
      }
    }
    if (
      page === "My messages" &&
      localStorage.getItem("type")
    ) {
      navigate("/messeges");
    }
    if (
      page === "My appointments" &&
      localStorage.getItem("type")
    ) {
      if (type === "patient") {
        navigate("/history");
      }
      if (type === "doctor") {
        navigate("/appoinments");
      }
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <LocalHospitalIcon
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
            }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => navigate("/")}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}>
            DenSis.Me
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
            }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}>
              {pages.map((page) => (
                <Button
                  disabled={
                    localStorage.getItem("type")
                      ? false
                      : true
                  }
                  key={page}
                  onClick={() => handleCloseNavMenu(page)}
                  sx={{
                    my: 2,
                    color: "black",
                    display: "block",
                  }}>
                  {page}
                </Button>
              ))}
            </Menu>
          </Box>
          <LocalHospitalIcon
            sx={{
              display: { xs: "flex", md: "none" },
              mr: 1,
            }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            onClick={() => navigate("/")}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}>
            DenSis.Me
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
            }}>
            {pages.map((page) => (
              <Button
                disabled={
                  localStorage.getItem("type")
                    ? false
                    : true
                }
                key={page}
                onClick={() => handleCloseNavMenu(page)}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                }}>
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }} display={"flex"}>
            {logged ? (
              <div className={classes.login}>
                <span className={classes.login}>
                  {localStorage.getItem("email")}{" "}
                </span>
              </div>
            ) : (
              <span>
                <LoginIcon />
                <Button
                  onClick={() => setActive(true)}
                  color="inherit">
                  Login
                </Button>
              </span>
            )}
            {active ? (
              <Modal
                active={active}
                setActive={setActive}
              />
            ) : null}

            {typeUser === "patient" ||
            typeUser === "admin" ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton
                    onClick={handleOpenUserMenu}
                    sx={{ p: 0 }}>
                    <Avatar
                      className={classes.avatar}
                      alt="Remy Sharp"
                      src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                    />
                  </IconButton>
                </Tooltip>
              </>
            ) : null}
            {typeUser === "doctor" ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton
                    onClick={handleOpenUserMenu}
                    sx={{ p: 0 }}>
                    {user !== null && (
                      <Avatar
                        className={classes.avatar}
                        alt="Remy Sharp"
                        src={`http://localhost:8800/${user[0].photo}`}
                      />
                    )}
                  </IconButton>
                </Tooltip>
              </>
            ) : null}
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}>
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={handleCloseUserMenu}>
                  <Typography
                    textAlign="center"
                    onClick={logout}>
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
