import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoaderState {
  isloading: boolean;
}

const initialState: LoaderState = {
  isloading: typeof window !== "undefined" ? JSON.parse(localStorage.getItem("darkMode")!) || false : false,
};

export const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    loader: (state, action: PayloadAction<boolean>) => {
      state.isloading = action.payload;
      localStorage.setItem("loading", JSON.stringify(state.isloading));
    },
  },
});

export const { loader } = loaderSlice.actions;
export default loaderSlice.reducer;
