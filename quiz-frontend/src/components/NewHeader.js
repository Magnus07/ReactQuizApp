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
import { Link } from "react-router-dom";
import { UserContext } from "../userContext";

const pagesLoggedIn = [
  { title: "Quiz", link: "/quiz" },
  { title: "Leaderboard", link: "/leaderboard" },
];

const pagesLoggedOut = [
  { title: "Login", link: "/login" },
  { title: "Register", link: "/register" },
];
const settingsLoggedIn = [
  { title: "Profile", link: "/profile" },
  { title: "Logout", link: "/logout" },
];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const settingMenu = function () {
    return (
      <>
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Tooltip>
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
            onClose={handleCloseUserMenu}
          >
            {settingsLoggedIn.map((setting) => (
              <MenuItem
                key={setting.title}
              >
                <Link key={setting.title} to={setting.link}>{setting.title}</Link>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </>
    );
  };

  return (
    <AppBar position="static" sx={{mb : 5}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <UserContext.Consumer>
            {(context) => (
              <>
                <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="/"
                  sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  ReactQuizApp
                </Typography>

                <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                  >
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
                    }}
                  >
                    {(context.user ? pagesLoggedIn : pagesLoggedOut).map(
                      (page) => (
                        <MenuItem key={page.title}>
                          <Link to={page.link}>
                            {page.title}
                          </Link>
                        </MenuItem>
                      )
                    )}
                  </Menu>
                </Box>
                <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
                <Typography
                  variant="h5"
                  noWrap
                  component="a"
                  href="/"
                  sx={{
                    mr: 2,
                    display: { xs: "flex", md: "none" },
                    flexGrow: 1,
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  ReactQuizApp
                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                  {(context.user ? pagesLoggedIn : pagesLoggedOut).map(
                    (page) => (
                      <Button
                        key={page.title}
                        onClick={() => {
                          window.location.href = page.link;
                        }}
                        sx={{ my: 2, color: "white", display: "block" }}
                      >
                        {page.title}
                      </Button>
                    )
                  )}
                </Box>
                {context.user && settingMenu()}
              </>
            )}
          </UserContext.Consumer>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
