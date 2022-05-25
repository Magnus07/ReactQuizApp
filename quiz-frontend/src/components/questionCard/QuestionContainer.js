import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

export function QuestionContainer(props) {
  const { _id, question, answers } = props.question;

  return (
    <>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" component="div" dangerouslySetInnerHTML={{ __html: question }} >
          </Typography>
        </CardContent>
        <CardActions>
          <Stack spacing={2} sx={{ width: "100%" }}>
            {answers.map((answer, index) => {
              return (
                <Button key={index} size="large" variant="contained" fullWidth onClick={props.changeIndex}>
                  {answer}
                </Button>
              );
            })}
          </Stack>
        </CardActions>
      </Card>
    </>
  );
}
