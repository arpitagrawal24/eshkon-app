import { configureStore } from "@reduxjs/toolkit";
import darkModeReducer from "./features/darkModeSlice";
import loaderReducer from "./features/loaderSlice"

export const store = configureStore({
  reducer: {
    darkmode: darkModeReducer,
    loader: loaderReducer,
  },
});
