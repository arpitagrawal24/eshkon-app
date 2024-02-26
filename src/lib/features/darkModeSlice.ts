import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DarkModeState {
  mode: boolean;
}

const storedDarkMode = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("darkMode") || "false") : false;

const initialState: DarkModeState = {
  mode: storedDarkMode,
};

export const darkModeSlice = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.mode = !state.mode;
      localStorage.setItem("darkMode", JSON.stringify(state.mode));
    },
  },
});

export const { toggleDarkMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;
