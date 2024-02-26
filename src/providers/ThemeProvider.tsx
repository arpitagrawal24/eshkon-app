"use client"

import React, { useEffect, useState, ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "@/lib/store";

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (mounted) {
    return <Provider store={store}>{children}</Provider>;
  }

  return null;
};

export default ThemeProvider;
