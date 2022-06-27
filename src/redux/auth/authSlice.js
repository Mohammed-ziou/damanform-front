import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

// get user from local parse
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Register user
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Log out
export const logOut = createAsyncThunk("auth/logout", async () => {
  await authService.logOut();
});

// login user

export const logIn = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.logIn(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = actions.payload;
      })
      .addCase(register.rejected, (state, actions) => {
        state.isLoading = false;
        state.isError = true;
        state.message = actions.payload;
        state.user = null;
      })
      .addCase(logIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logIn.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = actions.payload;
      })
      .addCase(logIn.rejected, (state, actions) => {
        state.isLoading = false;
        state.isError = true;
        state.message = actions.payload;
        state.user = null;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
