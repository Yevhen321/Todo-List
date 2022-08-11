import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./../store/todo/todo-slice";
import authReducer from "./../store/auth/auth-slice";

export default configureStore({
  reducer: {
    todos: todoReducer,
    auth: authReducer,
  },
});
