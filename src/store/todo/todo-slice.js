import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import uniqid from "uniqid";
import {
  addSubTaskToListRecursive,
  deleteTaskRecursive,
  updateInputedTextRecursive,
} from "../../utils/utils";

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async function (_, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch(`http://localhost:3001/todos`);
      if (!response.ok) {
        throw new Error("Response from server is not OK");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTodoAsync = createAsyncThunk(
  "todos/deleteTodoAsync",
  async function (action, { rejectWithValue, dispatch }) {
    const { id } = action;
    try {
      const response = await fetch(`http://localhost:3001/todos/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Can not delete todo");
      }
      dispatch(removeTodo({ id }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// export const toggleStatusAsync = createAsyncThunk(
//   "todos/toggleStatusAsync",
//   async function (id, { rejectWithValue, dispatch, getState }) {
//     const todo = getState().todos.todos.find((todo) => todo.id === id);
//     try {
//       const response = await fetch(`http://localhost:3001/todos/${id}`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           completed: !todo.completed,
//         }),
//       });
//       if (!response.ok) {
//         throw new Error("Can not toggle todo status");
//       }
//       dispatch(toggleTodoComplete({ id }));
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

export const addNewTodoAsync = createAsyncThunk(
  "todos/addNewTodoAsync",
  async function (action, { rejectWithValue, dispatch }) {
    const { name, userId } = action;
    try {
      const todo = {
        id: uniqid(),
        title: name,
        userId: userId,
        completed: false,
        subList: [],
        parentId: null,
      };
      const response = await fetch("http://localhost:3001/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });
      if (!response.ok) {
        throw new Error("Can not add new todo!");
      }
      const data = await response.json();
      dispatch(addTodo(data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateListAsync = createAsyncThunk(
  "todos/updateListAsync",
  async function ({ id }, { rejectWithValue, dispatch, getState }) {
    const todo = getState().todos.todos.find((todo) => todo.id === id);
    try {
      const response = await fetch(`http://localhost:3001/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });
      if (!response.ok) {
        throw new Error("Can not add new todo!");
      }
      // const data = await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getListAsync = createAsyncThunk(
  "todos/getListAsync",
  async function (action, { rejectWithValue, dispatch, getState }) {
    const { todoId } = action;
    try {
      const response = await fetch(`http://localhost:3001/todos/${todoId}`);
      if (!response.ok) {
        throw new Error("dsd!");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateInputedTextAsync = createAsyncThunk(
  "todos/updateInputedTextAsync",
  async function (action, { rejectWithValue, dispatch, getState }) {
    const { textFromInput, id } = action;
    const list = getState().todos.todos.find((todo) => todo.id === id);
    const input = {
      ...list,
      ...{ title: textFromInput },
    };
    try {
      const response = await fetch(`http://localhost:3001/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });
      if (!response.ok) {
        throw new Error("dsd!");
      }
      const data = await response.json();
      dispatch(updateInputedText(data));
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    status: null,
    error: null,
  },
  reducers: {
    addTodo(state, action) {
      state.todos.push(action.payload);
    },
    removeTodo(state, action) {
      const { id, parentId } = action.payload;
      state.todos = deleteTaskRecursive(state.todos, id, parentId);
    },
    addSubTaskToList(state, action) {
      // console.log("act", action.payload);
      // const { parentId } = action.payload;
      const { name, id } = action.payload;
      const newTodo = {
        id: uniqid(),
        title: name,
        parentId: id,
        completed: false,
        subList: [],
      };
      state.todos = addSubTaskToListRecursive(state.todos, newTodo, id);
    },
    updateInputedText(state, action) {
      // const { textFromInput, id } = action.payload;
      const { title, id } = action.payload;
      state.todos = updateInputedTextRecursive(state.todos, title, id);
    },
  },
  extraReducers: {
    [fetchTodos.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchTodos.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.todos = action.payload;
    },
    [fetchTodos.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
  },
});

export const {
  addTodo,
  removeTodo,
  toggleTodoComplete,
  addSubTaskToList,
  updateInputedText,
} = todoSlice.actions;

export default todoSlice.reducer;
