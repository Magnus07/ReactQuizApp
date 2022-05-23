import { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

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

  const continueWithXHandler = function (link) {
    window.location.href = link;
  };

  return (
    <>
      <form onSubmit={Register}>
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" name="submit" value="Login" />
        <label>{error}</label>
      </form>
      <Stack spacing={2} direction="row">
        <Button
          variant="contained"
          onClick={() => {
            continueWithXHandler("http://localhost:3001/passport/auth/google");
          }}
        >
          Continue with Google
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            continueWithXHandler("http://localhost:3001/passport/auth/github");
          }}
        >
          Continue with Github
        </Button>
      </Stack>
    </>
  );
}

export default Register;
