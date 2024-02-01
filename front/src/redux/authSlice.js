import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for verifying the token and getting the user
export const verifyTokenToGetUser = createAsyncThunk(
  "auth/verifyTokenToGetUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:3001/api/auth/verify",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apisecret: process.env.REACT_APP_APISECRET,
          },
        }
      );
      localStorage.setItem("user", JSON.stringify(response.data.user));
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  isLoading: true,
  isAuthenticated: Boolean(localStorage.getItem("token")),
  user: JSON.parse(localStorage.getItem("user")) || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyTokenToGetUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyTokenToGetUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(verifyTokenToGetUser.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      });
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
