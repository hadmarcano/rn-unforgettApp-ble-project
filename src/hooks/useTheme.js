import React, { createContext, useContext } from "react";

import { light } from "../constants/";

export const ThemeContext = createContext({
  theme: light,
  setTheme: () => {},
});

export const ThemeProvider = ({
  children,
  theme = light,
  setTheme = () => {},
}) => {
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default function useTheme() {
  const { theme } = useContext(ThemeContext);
  return theme;
}
