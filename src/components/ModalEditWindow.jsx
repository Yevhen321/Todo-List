import React from "react";
import { TodoItem } from "./TodoItem";
import { modalStyle } from "../styles";
import { Modal, Box, Typography } from "@mui/material";

export const ModalEditWindow = ({
  active,
  setActive,
  deleteTodoAsync,
  id,
  listItem,
  addSubTaskToList,
  removeTodo,
  textFromInput,
  updateInputedText,
}) => {
  return (
    <Modal
      open={active}
      onClose={() => setActive(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography variant="h4" gutterBottom component="h4">
          {textFromInput}
        </Typography>
        {!!listItem.subList &&
          listItem.subList.map((todo, index) => {
            return (
              <Box key={index}>
                <TodoItem
                  key={todo.id}
                  text={todo.title}
                  id={todo.id}
                  listItem={todo}
                  deleteTodoAsync={deleteTodoAsync}
                  addSubTaskToList={addSubTaskToList}
                  removeTodo={removeTodo}
                  textFromInput={textFromInput}
                  updateInputedText={updateInputedText}
                />
              </Box>
            );
          })}
      </Box>
    </Modal>
  );
};
