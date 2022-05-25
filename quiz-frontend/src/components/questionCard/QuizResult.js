import * as React from "react";
import Container from "@mui/material/Container";
import { useRef } from "react";
import { useEffect, useState } from "react";
import { Paper, Typography } from "@mui/material";

export function QuizResult() {
  const [result, setResult] = useState("");
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      const fetchData = async function () {
        const res = await fetch("http://localhost:3001/questions/result", {
          credentials: "include",
        });
        setResult(await res.json());
      };
      fetchData();
    }
  }, []);

  return (
    <>
      <Container maxWidth="md">
        <Paper elevation={3}>
          <Typography variant="h5" component="div">
            Congratulations!Your grade result is: {result}
          </Typography>
        </Paper>
      </Container>
    </>
  );
}
