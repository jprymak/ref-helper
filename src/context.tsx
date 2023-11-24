import React, { useState, useContext } from "react";
import links, { LinkObject } from "./Data/sublinks";

import { Mode } from "./Data/sublinks";

export interface IAppContext {
  isSidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  isSubmenuOpen: boolean;
  openSubmenu: (text: string, coordinates: any) => void;
  closeSubmenu: () => void;
  page: { page: string; modes: Mode[] };
  location: Record<string, any>;
}

type PageType = Pick<LinkObject, "page" | "modes">;

const AppContext = React.createContext<IAppContext | null>(null);

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const [page, setPage] = useState<PageType>({
    page: "",
    modes: [],
  });
  const [location, setLocation] = useState({});
  const openSidebar = () => {
    setIsSidebarOpen(true);
  };
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  const openSubmenu = (text: string, coordinates: any) => {
    const page = links.find((link) => link.page === text);
    if (!page) return;
    else {
      setPage(page);
      setLocation(coordinates);
      setIsSubmenuOpen(true);
    }
  };
  const closeSubmenu = () => {
    setIsSubmenuOpen(false);
  };

  return (
    <AppContext.Provider
      value={{
        isSidebarOpen,
        openSidebar,
        closeSidebar,
        isSubmenuOpen,
        openSubmenu,
        closeSubmenu,
        page,
        location,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  const appContext = useContext(AppContext);
  if (!appContext) {
    throw "Missing appContext data!";
  }
  return appContext;
};

export { AppContext, AppProvider };
