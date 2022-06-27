import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";

const initialState = {
  users: [],
  user: { name: "" },
  isError: false,
  isSuccess: false,
  isLoading: false,
  isUpdated: false,
  message: "",
};

// delete user
export const deleteUser = createAsyncThunk(
  "user/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await userService.deleteUser(id, token);
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

// get all users
export const getUsers = createAsyncThunk("user/getall", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    // console.log(token);
    return await userService.getUsers(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// get user by id
export const getForm = createAsyncThunk("doc/getone", async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await userService.getForm(id, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// update a user by it's id
export const updateUser = createAsyncThunk(
  "user/updateOne",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await userService.updateUser(data, token);
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

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = state.users.filter(
          (user) => user._id !== action.payload.id
        );
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getForm.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getForm.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.doc = action.payload;
      })
      .addCase(getForm.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.isUpdated = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isUpdated = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = userSlice.actions;

export default userSlice.reducer;
