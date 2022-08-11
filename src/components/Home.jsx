import React from "react";
import { Link } from "react-router-dom";
import { Typography, Box } from "@mui/material";

export const Home = () => {
  return (
    <Box sx={{ textAlign: "center", marginTop: "100px" }}>
      <Typography variant="h3" gutterBottom component="h3">
        It seem's like you are not logged in
      </Typography>
      <Typography variant="h4" gutterBottom component="h4">
        If you have an account, then please <Link to="/login">Login</Link>
      </Typography>
      <Typography variant="h4" gutterBottom component="h4">
        Don't have an account, then please
        <Link to="/register"> Register</Link>
      </Typography>
    </Box>
  );
};
