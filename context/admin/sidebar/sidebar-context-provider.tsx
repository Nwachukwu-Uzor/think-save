"use client"
import React, { useState } from "react";
import { sidebarContext } from ".";

export const SidebarContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  const handleToggleOpen = () => {
    setOpen((opened) => !opened);
  };
  return (
    <sidebarContext.Provider value={{ open, handleToggleOpen }}>
      {children}
    </sidebarContext.Provider>
  );
};
