import React, { useState, useEffect, useContext, createContext } from "react";
import Storage from "@react-native-async-storage/async-storage";

import { light } from "../constants";

export const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [theme, setTheme] = useState(light);
  const [countPendings, setCountPendings] = useState(0);

  const contextValue = {
    theme,
    setTheme,
    countPendings,
    setCountPendings,
  };

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
