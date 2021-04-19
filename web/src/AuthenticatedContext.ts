import React, { createContext } from "react";
interface defaultStateValue {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}
export const AuthenticatedContext = createContext<defaultStateValue>(
  {} as defaultStateValue
);
