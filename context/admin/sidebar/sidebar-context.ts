"use client";
import React from "react";

export const sidebarContext = React.createContext({
  open: false,
  handleToggleOpen: () => {},
});
