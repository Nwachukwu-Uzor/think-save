import { useContext } from "react";
import { sidebarContext } from ".";

export const useSidebarContext = () => {
  const context = useContext(sidebarContext);

  if (!context) {
    throw new Error("Sidebar context is not initialized");
  }

  return context;
};
