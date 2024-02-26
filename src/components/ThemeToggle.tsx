import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleDarkMode } from "@/lib/features/darkModeSlice";

interface RootState {
  darkmode: {
    mode: boolean;
  };
}

const ThemeToggle: React.FC = () => {
  const { mode } = useSelector((state: RootState) => state.darkmode);
  const dispatch = useDispatch();

  return (
    <div
      onClick={() => dispatch(toggleDarkMode())}
      style={
        mode ? { backgroundColor: "white" } : { backgroundColor: "#0f172a" }
      }
    >
      {mode ? (
        <FaMoon width={14} height={14} />
      ) : (
        <FaSun />
      )}
    </div>
  );
};

export default ThemeToggle;