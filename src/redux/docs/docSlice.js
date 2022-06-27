import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import docService from "./docService";

const initialState = {
  docs: [],
  doc: { title: "" },
  count: 0,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// create new form
export const createForm = createAsyncThunk(
  "doc/new",
  async (form, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await docService.createForm(form, token);
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

// delete form
export const deleteForm = createAsyncThunk(
  "doc/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await docService.deleteForm(id, token);
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

// get all forms
export const getForms = createAsyncThunk(
  "doc/getall",
  async (querys, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      console.log(querys);
      return await docService.getForms(token, querys);
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
// get forms count
export const getFormsCount = createAsyncThunk(
  "doc/count",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await docService.getFormsCount(token);
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

// get form by id
export const getForm = createAsyncThunk("doc/getone", async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await docService.getForm(id, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// update a form by it's id
export const updateForm = createAsyncThunk(
  "doc/updateOne",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await docService.updateForm(data.form, data.id, token);
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

const docSlice = createSlice({
  name: "docs",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createForm.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createForm.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.docs.push(action.payload);
      })
      .addCase(createForm.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getForms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getForms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.docs = action.payload;
      })
      .addCase(getForms.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteForm.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteForm.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.docs = state.docs.filter((doc) => doc._id !== action.payload.id);
      })
      .addCase(deleteForm.rejected, (state, action) => {
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
      .addCase(updateForm.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateForm.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.doc = action.payload;
      })
      .addCase(updateForm.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getFormsCount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFormsCount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.count = action.payload;
      })
      .addCase(getFormsCount.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = docSlice.actions;

export default docSlice.reducer;
