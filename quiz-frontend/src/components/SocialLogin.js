import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function SocialLogin() {
  const continueWithXHandler = function (link) {
    window.location.href = link;
  };

  return (
    <Stack spacing={2} direction="column">
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
  );
}
