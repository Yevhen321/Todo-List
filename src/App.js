import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Route, Routes } from "react-router-dom";
import { Register } from "./components/Register";
import { Login } from "./components/Login";
import { Home } from "./components/Home";
import { getUserAsync } from "./store/auth/auth-slice";
import { ListEditorPage } from "./pages/ListEditorPage";
import { TodoListPage } from "./pages/TodoListPage";

export const App = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  useEffect(() => {
    dispatch(
      getUserAsync({
        callbackSuccess: () => history("/todo-list"),
        callbackFail: () => history("/"),
      })
    );
  }, []);

  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/todo-list" element={<TodoListPage />} />
      <Route exact path="/detail-todo/:todoId" element={<ListEditorPage />} />
    </Routes>
  );
};
