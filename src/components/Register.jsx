import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Typography,
  Box,
  CssBaseline,
  Container,
} from "@mui/material";
import { registerNewUserAsync } from "../store/auth/auth-slice";
import { boxFormStyle } from "../styles";
import uniqid from "uniqid";

export const Register = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (!name || !password) return;
    const userId = uniqid();
    dispatch(
      registerNewUserAsync({
        body: { name, password, userId },
        callback: () => history("/login"),
      })
    );
    setName("");
    setPassword("");
  };

  return (
    <CssBaseline>
      <Container maxWidth="lg">
        <Box sx={boxFormStyle}>
          <Typography variant="h2" gutterBottom component="h2">
            Register Page
          </Typography>
          <form noValidate autoComplete="off" onSubmit={handleRegister}>
            <TextField
              sx={{ margin: "1rem" }}
              id="username"
              label="Username"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <TextField
              sx={{ margin: "1rem" }}
              id="password"
              label="Password"
              type="password"
              required
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
              Register
            </Button>
          </form>
          <Typography variant="p" gutterBottom component="p">
            Already have an account ? Please <Link to="/login">Login</Link>
          </Typography>
        </Box>
      </Container>
    </CssBaseline>
  );
};
