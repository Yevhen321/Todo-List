import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Box,
  CssBaseline,
  Container,
  List,
  ListItem,
  TextField,
  Tooltip,
  IconButton,
} from "@mui/material";
import { Upload, Add, Delete } from "@mui/icons-material";
import {
  updateInputedTextAsync,
  getListAsync,
  addSubTaskToList,
} from "../store/todo/todo-slice";
import { updateListAsync } from "../store/todo/todo-slice";
import { removeTodo, deleteTodoAsync } from "../store/todo/todo-slice";
import { TodoItem } from "./TodoItem";
import { boxFormStyle } from "../styles";

export const ListEditor = () => {
  const dispatch = useDispatch();
  const { todoId } = useParams();
  const list = useSelector((state) => state.todos.todos);
  const listItem = list.find((list) => list.id === todoId);
  console.log("list", listItem);

  const [name, setName] = useState("");
  const [textFromInput, setTextFromInput] = useState(listItem?.title || "");

  const handleAddSubTask = () => {
    if (!name) return;
    if (name.trim().length)
      dispatch(addSubTaskToList({ name, id: listItem.id }));
    setName("");
  };

  useEffect(() => {
    if (!todoId || listItem) return;
    dispatch(getListAsync({ todoId }));
  }, [dispatch, todoId, listItem]);

  const handleDelete = () =>
    !listItem.parentId
      ? dispatch(
          deleteTodoAsync({
            id: listItem.id,
            parentId: listItem.parentId,
          })
        )
      : dispatch(
          removeTodo({
            id: listItem.id,
            parentId: listItem.parentId,
          })
        );

  return (
    <>
      <CssBaseline>
        <Container maxWidth="sx">
          <Box sx={boxFormStyle}>
            <TextField
              variant="standard"
              sx={{ background: "inherit", border: "none" }}
              type="text"
              value={textFromInput}
              onChange={(e) => setTextFromInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" &&
                dispatch(
                  updateInputedTextAsync({ textFromInput, id: listItem.id })
                )
              }
            />
            <Tooltip title="Save">
              <IconButton
                onClick={() => dispatch(updateListAsync({ id: listItem.id }))}
              >
                <Upload />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton onClick={handleDelete}>
                <Delete />
              </IconButton>
            </Tooltip>
            <List>
              <ListItem>
                <Box>
                  <TextField
                    sx={{
                      color: "white",
                      border: "none",
                      background: "white",
                    }}
                    size="small"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Tooltip title="Add Sublist">
                    <IconButton onClick={handleAddSubTask}>
                      <Add />
                    </IconButton>
                  </Tooltip>
                </Box>
              </ListItem>
            </List>
            {listItem?.subList &&
              listItem.subList.length > 0 &&
              listItem.subList.map((todo, index) => {
                return (
                  <Box key={index}>
                    <TodoItem
                      key={todo.id}
                      listItem={todo}
                      deleteTodoAsync={deleteTodoAsync}
                      addSubTaskToList={addSubTaskToList}
                      removeTodo={removeTodo}
                      updateInputedTextAsync={updateInputedTextAsync}
                    />
                  </Box>
                );
              })}
          </Box>
        </Container>
      </CssBaseline>
    </>
  );
};
