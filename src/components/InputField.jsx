import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export const InputField = ({ name, setName, addTodo }) => {
  return (
    <>
      <TextField
        id="outlined-basic"
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ color: "white", border: "none", background: "white" }}
        size="small"
      />
      <Button
        onClick={addTodo}
        size="normal"
        variant="contained"
        color="primary"
      >
        Add to List
      </Button>
    </>
  );
};
