import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IconButton, TextField, Box, ListItem, Tooltip } from "@mui/material";
import {
  List,
  Delete,
  Add,
  ArrowDropDown,
  ArrowRight,
} from "@mui/icons-material";
import { listStyle } from "../styles";

export const TodoItem = ({
  listItem,
  addSubTaskToList,
  updateListAsync,
  deleteTodoAsync,
  removeTodo,
  updateInputedTextAsync,
}) => {
  const { id, title } = listItem;
  const [textFromInput, setTextFromInput] = useState(title);
  const [visibleSublist, setVisibleSublist] = useState(false);

  const [name, setName] = useState("");

  const dispatch = useDispatch();
  const history = useNavigate();

  const handleAddSubTask = () => {
    if (!name) return;
    if (name.trim().length) dispatch(addSubTaskToList({ name, id }));
    setName("");
  };

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
      <ListItem sx={listStyle}>
        {!listItem.parentId
          ? null
          : listItem?.subList?.length > 0 && (
              <Tooltip title="expand">
                <IconButton
                  variant="text"
                  onClick={() => setVisibleSublist(!visibleSublist)}
                >
                  {visibleSublist ? <ArrowRight /> : <ArrowDropDown />}
                </IconButton>
              </Tooltip>
            )}
        <TextField
          variant="standard"
          sx={{ background: "inherit", border: "none" }}
          type="text"
          value={textFromInput}
          onChange={(e) => setTextFromInput(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" &&
            dispatch(updateInputedTextAsync({ textFromInput, id }))
          }
        />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {listItem.parentId ? null : (
            <Tooltip title="To Sublist">
              <IconButton onClick={() => history(`/detail-todo/${id}`)}>
                <List />
              </IconButton>
            </Tooltip>
          )}
          {!listItem.parentId ? null : (
            <Tooltip title="Add">
              <IconButton onClick={handleAddSubTask}>
                <Add />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title="Delete">
            <IconButton onClick={handleDelete}>
              <Delete />
            </IconButton>
          </Tooltip>
          {!listItem.parentId ? null : (
            <TextField
              sx={{ background: "white" }}
              size="small"
              variant="outlined"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
        </Box>
      </ListItem>
      {!listItem.parentId
        ? null
        : listItem.subList &&
          visibleSublist &&
          listItem.subList.map((todo, index) => {
            return (
              <TodoItem
                key={todo.id}
                listItem={todo}
                deleteTodoAsync={deleteTodoAsync}
                addSubTaskToList={addSubTaskToList}
                removeTodo={removeTodo}
                updateInputedTextAsync={updateInputedTextAsync}
              />
            );
          })}
      {/* <ModalEditWindow
        active={active}
        setActive={setActive}
        id={id}
        text={text}
        listItem={listItem}
        deleteTodoAsync={deleteTodoAsync}
        addSubTaskToList={addSubTaskToList}
        removeTodo={removeTodo}
        textFromInput={textFromInput}
        updateInputedText={updateInputedText}
      /> */}
    </>
  );
};
