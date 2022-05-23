import { useContext, useState } from "react";
import { UserContext } from "../userContext";
import { Navigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const userContext = useContext(UserContext);

  const continueWithXHandler = function (link) {
    window.location.href = link;
  };

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
    <form onSubmit={Login}>
      {userContext.user ? <Navigate replace to="/" /> : ""}
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
      <input type="submit" name="submit" value="Log in" />
      <label>{error}</label>
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
    </form>
  );
}

export default Login;
