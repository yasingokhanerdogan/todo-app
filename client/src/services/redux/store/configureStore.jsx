import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { AuthSlice, TodoSlice, mySlice } from "../index";

export const store = configureStore({
  reducer: {
    mySlice,
    AuthSlice,
    TodoSlice,
  },
  devTools: false,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
