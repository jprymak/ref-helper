import React, { useContext } from "react";

export interface IAppContext {}

const AppContext = React.createContext<IAppContext | null>(null);

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};

export const useGlobalContext = () => {
  const appContext = useContext(AppContext);
  if (!appContext) {
    throw "Missing appContext data!";
  }
  return appContext;
};

export { AppContext, AppProvider };
