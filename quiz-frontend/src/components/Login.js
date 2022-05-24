import { useContext, useState } from "react";
import { UserContext } from "../userContext";
import { Navigate } from "react-router-dom";
import SocialLogin from "./SocialLogin";
import { TextField, Button, Paper, Container, Stack } from "@mui/material";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const userContext = useContext(UserContext);

  async function Login(e) {
    e.preventDefault();
    const res = await fetch("http://localhost:3001/users/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const data = await res.json();
    if (data._id !== undefined) {
      userContext.setUserContext(data);
    } else {
      setUsername("");
      setPassword("");
      setError("Invalid username or password");
    }
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={3}>
        <form onSubmit={Login}>
          <Stack spacing={2}>
            {userContext.user ? <Navigate replace to="/" /> : ""}
            <TextField
              id="outlined-basic"
              label="Username"
              variant="outlined"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" variant="contained">
              Login
            </Button>
            <label>{error}</label>
          </Stack>
        </form>
        <SocialLogin />
      </Paper>
    </Container>
  );
}

export default Login;
