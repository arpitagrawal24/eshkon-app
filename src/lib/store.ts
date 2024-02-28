import { configureStore } from "@reduxjs/toolkit";
import darkModeReducer from "./features/darkModeSlice";
import loaderReducer from "./features/loaderSlice"
import chartReducer from "./features/chartSlice";

export const store = configureStore({
  reducer: {
    darkmode: darkModeReducer,
    loader: loaderReducer,
    chart: chartReducer,
  },
});
