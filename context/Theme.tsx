"use client";

import React from "react";

import {
  ThemeProviderProps,
  ThemeProvider as NextThemesProvider,
} from "next-themes";

const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};

export default ThemeProvider;
