import { useContext, useEffect, useState } from "react";
import { UserContext } from "../userContext";
import User from "./User";
import { Paper } from "@mui/material";
import { Container } from "@mui/material";
import { Typography } from "@mui/material";

function Users() {
  const userContext = useContext(UserContext);
  const [users, setUsers] = useState([]);
  useEffect(function () {
    const getUsers = async function () {
      const res = await fetch("http://localhost:3001/users", {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      setUsers(data);
    };
    getUsers();
  }, []);

  return (
    <Container maxWidth="md">
      <Paper elevation={3}>
        <div>
          {!users.error && (
            <Typography
              variant="h4"
              gutterBottom
              component="div"
              textAlign="center"
            >
              Click on 'quiz' to start quiz, 'leaderboard' to show leaderboard.
            </Typography>
          )}
          <Typography variant="h5" gutterBottom component="div">
            Registered users:
          </Typography>
          <ul>
            {users.error === "Unauthorized!"
              ? "Authorize to see the list of users!"
              : users?.map((user) => <User user={user} key={user._id}></User>)}
          </ul>
          {users.error && (
            <Typography
              variant="h4"
              gutterBottom
              component="div"
              textAlign="center"
            >
              Login or register to see the whole content.
            </Typography>
          )}
        </div>
      </Paper>
    </Container>
  );
}

export default Users;
