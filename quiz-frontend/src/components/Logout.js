import { React, useEffect, useContext } from "react";
import { UserContext } from "../userContext";
import { Paper } from "@mui/material";
import { Container } from "@mui/material";
import { Typography } from "@mui/material";

function Logout() {
  const userContext = useContext(UserContext);
  useEffect(function () {
    const logout = async function () {
      const res = await fetch("http://localhost:3001/users/logout", {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      userContext.setUserContext(null);
    };
    logout();
  }, []);
  return (
    <>
      <Container maxWidth="md">
        <Paper elevation={3}>
          <Typography variant="h5" gutterBottom component="div">
            You has been successfully logged out.<a href="/">Return to home</a>
          </Typography>
        </Paper>
      </Container>
    </>
  );
}

export default Logout;
