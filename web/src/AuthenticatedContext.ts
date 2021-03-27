import { createContext } from "react";
const defaultStateValue = {
  isAuthenticated: false,
  setIsAuthenticated: (state: any) => {},
};
export const AuthenticatedContext = createContext(defaultStateValue);
