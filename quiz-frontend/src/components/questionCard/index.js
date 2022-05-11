import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { useRef } from "react";
import { LoadingProgress } from "./LoadingProgress";
import { QuestionContainer } from "./QuestionContainer";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../userContext";
import { Navigate } from "react-router-dom";

const QuizResult = function () {
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
        Congratulations! Your grade result is: {result}
        {/* </Typography> */}
      </Container>
    </>
  );
};

export default function QuestionCard() {
  const userContext = useContext(UserContext);
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [questionIndex, setQuestionIndex] = useState(0);
  const isInitialMount = useRef(true);

  const fetchData = async function () {
    setIsLoading(true);
    const res = await fetch("http://localhost:3001/questions/random", {
      credentials: "include",
    });
    const data = await res.json();
    setQuestion(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      fetchData();
    }
  }, []);

  const sendAnswer = async function (answer) {
    setIsLoading(true);
    const res = await fetch("http://localhost:3001/questions/answer", {
      credentials: "include",
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _id: question[0]._id,
        answer: answer,
      }),
    });
    setIsLoading(false);
  };
  // const res = await fetch("http://localhost:3001/questions/answer", {
  //   credentials: "include",
  // });
  // const data = await res.json();
  // setQuestion(data);
  // setIsLoading(false);

  async function changeIndex(e) {
    // console.log(e.target.innerText);
    await sendAnswer(e.target.innerText);
    await fetchData();
    setQuestionIndex(questionIndex + 1);
  }

  if (questionIndex === 10) return <QuizResult />;

  return (
    <React.Fragment>
      {!userContext.user ? <Navigate replace to="/login" /> : ""}
      <CssBaseline />
      <Container maxWidth="sm">
        {!isLoading && (
          <QuestionContainer question={question[0]} changeIndex={changeIndex} />
        )}
        {isLoading && <LoadingProgress />}
      </Container>
    </React.Fragment>
  );
}
