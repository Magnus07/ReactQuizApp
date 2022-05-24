import { useContext, useEffect, useState } from "react";
import { UserContext } from "../userContext";
import { Navigate } from "react-router-dom";
import { Container, Paper, Typography } from "@mui/material";

function Profile() {
  const userContext = useContext(UserContext);
  const [profile, setProfile] = useState({});

  useEffect(function () {
    const getProfile = async function () {
      const res = await fetch("http://localhost:3001/users/profile", {
        credentials: "include",
      });
      const data = await res.json();
      setProfile(data);
    };
    getProfile();
  }, []);

  return (
    <>
      {!userContext.user ? <Navigate replace to="/login" /> : ""}
      <Container maxWidth="md">
        <Paper elevation={3}>
          <Typography
            variant="h3"
            gutterBottom
            component="div"
            textAlign="center"
          >
            Here's your profile info:
          </Typography>
          <Typography variant="h5" gutterBottom component="div">
            User profile
          </Typography>
          <Typography variant="h5" gutterBottom component="div">
            Username: {profile.username}
          </Typography>
          <Typography variant="h5" gutterBottom component="div">
            Email: {profile.email}
          </Typography>
        </Paper>
      </Container>
    </>
  );
}

export default Profile;
