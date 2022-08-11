import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  CssBaseline,
  Container,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { userLoginAsync } from "../store/auth/auth-slice";
import { AlertMessage } from "./AlertMessage";
import { boxFormStyle } from "../styles";

export const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const history = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const userLogin = (e) => {
    e.preventDefault();
    if (!name || !password) return;
    dispatch(
      userLoginAsync({
        body: { name, password },
        callback: () => history("/todo-list"),
      })
    );
  };

  return (
    <CssBaseline>
      <Container maxWidth="lg">
        <Box sx={boxFormStyle}>
          <Typography variant="h2" gutterBottom component="h2">
            Login Page
          </Typography>
          {status === "rejected" && (
            <AlertMessage severity="error">{error}</AlertMessage>
          )}
          <form onSubmit={userLogin}>
            <TextField
              sx={{ margin: "1rem" }}
              id="username"
              label="Username"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <TextField
              sx={{ margin: "1rem" }}
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <Button
              sx={{ margin: "1rem" }}
              variant="contained"
              color="primary"
              type="submit"
            >
              Login
            </Button>
          </form>
          <Typography variant="p" gutterBottom component="p">
            Don't have an account ? Please
            <Link to="/register"> Register</Link>
          </Typography>
        </Box>
      </Container>
    </CssBaseline>
  );
};
