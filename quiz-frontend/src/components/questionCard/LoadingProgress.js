import * as React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export const LoadingProgress = function () {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    </>
  );
};
