import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Box, CssBaseline, Container } from "@mui/material";
import { addNewTodoAsync, fetchTodos } from "../store/todo/todo-slice";
import { InputField } from "./InputField";
import { TodoList } from "./TodoList";
import { Spinner } from "./Spinner";
import { boxFormStyle } from "../styles";

export const TodoListForm = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const currentUserId = localStorage.getItem("authToken");
  const parsedCurrentUserId = currentUserId
    ? JSON.parse(atob(decodeURIComponent(currentUserId)))
    : [];
  const { userId } = parsedCurrentUserId;

  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  });

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const addTask = () => {
    if (!name) return;
    if (name.trim().length) dispatch(addNewTodoAsync({ name, userId }));
    setName("");
  };

  return (
    <CssBaseline>
      <Container maxWidth="sx">
        <Box sx={boxFormStyle}>
          {loading ? (
            <Spinner />
          ) : (
            <>
              <InputField name={name} setName={setName} addTodo={addTask} />
              <TodoList />
            </>
          )}
        </Box>
      </Container>
    </CssBaseline>
  );
};
