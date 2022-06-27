import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import resService from "./resService";

const initialState = {
  users: [],
  user: { name: "" },
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// get all users
export const downloadRes = createAsyncThunk(
  "download/responses",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await resService.downloadResponses(id, token);
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

const resSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(downloadRes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(downloadRes.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(downloadRes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = resSlice.actions;

export default resSlice.reducer;
