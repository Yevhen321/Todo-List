import React from "react";
import { TodoItem } from "./TodoItem";
import { useSelector } from "react-redux";
import { List } from "@mui/material";
import {
  deleteTodoAsync,
  updateListAsync,
  updateInputedTextAsync,
  addSubTaskToList,
  removeTodo,
} from "../store/todo/todo-slice";

export const TodoList = () => {
  const todos = useSelector((state) => state.todos.todos);
  const currentUserId = localStorage.getItem("authToken");
  const parsedCurrentUserId = currentUserId
    ? JSON.parse(atob(decodeURIComponent(currentUserId)))
    : [];
  const { userId } = parsedCurrentUserId;

  return (
    <List>
      {todos &&
        todos.length > 0 &&
        todos.map((todo) =>
          todo.userId === userId ? (
            <TodoItem
              key={todo.id}
              listItem={todo}
              updateListAsync={updateListAsync}
              updateInputedTextAsync={updateInputedTextAsync}
              addSubTaskToList={addSubTaskToList}
              removeTodo={removeTodo}
              deleteTodoAsync={deleteTodoAsync}
            />
          ) : null
        )}
    </List>
  );
};
