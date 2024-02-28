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
      className={`w-10 h-10 flex items-center justify-center rounded-full cursor-pointer ${
        mode ? "bg-white" : "bg-[#0f172a]"
      }`}
    >
      {mode ? <FaMoon width={14} height={14} /> : <FaSun />}
    </div>
  );
};

export default ThemeToggle;
