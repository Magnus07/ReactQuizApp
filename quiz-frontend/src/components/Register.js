import { useState } from "react";
import SocialLogin from "./SocialLogin";
import { TextField, Button, Paper, Container, Stack } from "@mui/material";

function Register() {
  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState([]);
  const [email, setEmail] = useState([]);
  const [error, setError] = useState([]);

  async function Register(e) {
    e.preventDefault();
    const res = await fetch("http://localhost:3001/users", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        username: username,
        password: password,
      }),
    });
    const data = await res.json();
    if (data._id !== undefined) {
      window.location.href = "/";
    } else {
      setUsername("");
      setPassword("");
      setEmail("");
      setError("Registration failed");
    }
  }

  return (
    <>
      <Container maxWidth="md">
        <Paper elevation={3}>
          <form onSubmit={Register}>
            <Stack spacing={2}>
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                name="email"
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
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
                Register
              </Button>
              <label>{error}</label>
            </Stack>
          </form>
          <SocialLogin />
        </Paper>
      </Container>
    </>
  );
}

export default Register;
