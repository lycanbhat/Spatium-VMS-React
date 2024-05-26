// redux/auth.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const token = JSON.parse(localStorage.getItem('spacium_admin'));
const INITIAL_STATE = {
  tokens: token !== null ? token : {},
};

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const tokens = JSON.parse(localStorage.getItem('spacium_admin'));
      const response = await axios.post('http://13.200.215.140/api/v1/auth/token/refresh/', {
        refresh: tokens.refresh
      });
      const newToken = response.data.access;
      const updatedTokens = { ...tokens, access: newToken };
      localStorage.setItem('spacium_admin', JSON.stringify(updatedTokens));
      return updatedTokens;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    setToken: (state, action) => {
      const data = {
        ...state.tokens,
        ...action.payload
      };
      localStorage.setItem('spacium_admin', JSON.stringify(data));
      state.tokens = data;
    },
    logout: (state) => {
      state.tokens = {};
      localStorage.removeItem('spacium_admin');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.tokens = action.payload;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.tokens = {}; // Clear tokens on refresh failure
      });
  }
});

export const { setToken, logout } = authSlice.actions;

export default authSlice.reducer;
