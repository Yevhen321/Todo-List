import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const registerNewUserAsync = createAsyncThunk(
  "users/registerNewUserAsync",
  async function (action, { rejectWithValue, dispatch }) {
    const {
      body: { name, password, userId },
      callback,
    } = action;
    try {
      const user = {
        id: userId,
        name: name,
        password: password,
      };
      const response = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error("Can not add new user");
      }

      const data = await response.json();
      dispatch(registerNewUser(data));
      callback();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const userLoginAsync = createAsyncThunk(
  "users/userLoginAsync",
  async function (action, { rejectWithValue }) {
    const {
      body: { name, password },
      callback,
    } = action;
    try {
      const response = await fetch("http://localhost:3001/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Can not login!");
      }
      const users = await response.json();

      const currentUser = users.find(
        (user) => user.name === name && user.password === password
      );
      if (!currentUser) {
        throw new Error(`User ${name} does not exist`);
      }
      const userToken = {
        userId: currentUser.id,
        name: name,
      };

      localStorage.setItem("authToken", btoa(JSON.stringify(userToken)));
      callback();
      return currentUser;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUserAsync = createAsyncThunk(
  "users/getUserAsync",
  async function (action, { rejectWithValue, dispatch }) {
    const { callbackSuccess, callbackFail } = action;
    const token = localStorage.getItem("authToken");
    if (!token) {
      callbackFail();
      return;
    }
    try {
      const response = await fetch(`http://localhost:3001/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Can not login!");
      }
      const users = await response.json();
      const parsedJwt = atob(decodeURIComponent(token));
      const parsedJwt1 = JSON.parse(parsedJwt);
      const currentUser = users.find((user) => user.id === parsedJwt1.userId);
      if (!currentUser) {
        callbackFail();
        throw new Error("User does not exist!!!");
      }
      callbackSuccess();
      return currentUser;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    auth: [],
    status: null,
    error: null,
  },
  reducers: {
    registerNewUser(state, action) {
      state.auth.push(action.payload);
    },
    getUser(state, action) {
      state.auth.push(action.payload);
    },
  },
  extraReducers: {
    [userLoginAsync.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [userLoginAsync.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.error = action.payload;
    },
    [userLoginAsync.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
  },
});

export const { registerNewUser, getUser } = authSlice.actions;

export default authSlice.reducer;
