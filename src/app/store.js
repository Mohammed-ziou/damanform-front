import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/auth/authSlice";
import docReducer from "../redux/docs/docSlice";
import userReducer from "../redux/users/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    docs: docReducer,
    users: userReducer,
  },
});
