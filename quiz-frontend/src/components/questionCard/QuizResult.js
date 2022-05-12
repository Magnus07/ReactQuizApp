import * as React from "react";
import Container from "@mui/material/Container";
import { useRef } from "react";
import { useEffect, useState } from "react";

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
      <Container>
        {/* <Typography> */}
        Congratulations!Your grade result is: {result}
        {/* </Typography> */}
      </Container>
    </>
  );
}
