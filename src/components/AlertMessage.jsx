import * as React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

export const AlertMessage = ({ severity, children }) => {
  return (
    <>
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Alert variant="filled" severity={severity}>
          {children}
        </Alert>
      </Stack>
    </>
  );
};
