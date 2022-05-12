import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/material";
import { Typography } from "@mui/material";
import { format } from "date-fns";

export default function BasicTable() {
  const [data, setData] = React.useState("");
  const isInitialMount = React.useRef(true);

  const fetchData = async function () {
    const res = await fetch("http://localhost:3001/gamesessions/leaderboard", {
      credentials: "include",
    });
    const data = await res.json();
    setData(data);
  };

  React.useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      fetchData();
    }
  }, []);

  return (
    <Container>
      <Typography variant="h3" component="div" gutterBottom>
        Leaderboad
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 425 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell align="right">Score</TableCell>
              <TableCell align="right">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.player}
                  </TableCell>
                  <TableCell align="right">{row.score}</TableCell>
                  <TableCell align="right">
                    {format(new Date(row.date), "d MMM Y H:m")}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
